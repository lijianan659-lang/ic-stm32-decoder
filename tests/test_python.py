from __future__ import annotations

import json
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ic_stm32_decoder import (  # noqa: E402
    NSC_SNOA039C_PERIODS,
    ONSEMI_AND8002_TABLE,
    decode_date_code,
    decode_national_six_week,
    decode_onsemi_two_letter,
    decode_stm32,
    iso_week_range,
    iso_weeks_in_year,
)


class TestIcStm32Decoder(unittest.TestCase):
    def test_iso_week_helpers(self) -> None:
        self.assertEqual(iso_weeks_in_year(2020), 53)
        self.assertEqual(iso_weeks_in_year(2021), 52)
        self.assertEqual(iso_weeks_in_year(2026), 53)
        self.assertEqual(
            iso_week_range(2020, 53),
            {
                "startDate": "2020-12-28",
                "endDate": "2021-01-03",
                "formatted": "2020-12-28 to 2021-01-03",
            },
        )
        self.assertIsNone(iso_week_range(2021, 53))
        self.assertIsNone(iso_week_range(2024, 54))
        self.assertIsNone(iso_week_range(2024, 0))

    def test_3digit_yww(self) -> None:
        res = decode_date_code("415", reference_year=2026)
        self.assertTrue(res["ok"])
        self.assertEqual(res["readings"][0]["format"], "YWW")
        self.assertEqual(res["readings"][0]["year"], 2024)
        self.assertEqual(res["readings"][0]["startDate"], "2024-04-08")
        self.assertEqual(res["readings"][0]["endDate"], "2024-04-14")

        rolled = decode_date_code("812", reference_year=2026)
        self.assertTrue(rolled["ok"])
        self.assertEqual(rolled["readings"][0]["year"], 2018)

        self.assertFalse(decode_date_code("454", reference_year=2026)["ok"])
        self.assertFalse(decode_date_code("153", reference_year=2026)["ok"])
        self.assertTrue(decode_date_code("053", reference_year=2026)["ok"])

    def test_4digit_parallel_and_rejections(self) -> None:
        ambig = decode_date_code("2410", century=2000, reference_year=2026)
        self.assertTrue(ambig["ok"])
        self.assertTrue(ambig["ambiguous"])
        self.assertEqual([r["format"] for r in ambig["readings"]], ["YYWW", "WWYY", "YYMM"])
        self.assertEqual(ambig["readings"][0]["startDate"], "2024-03-04")
        self.assertEqual(ambig["readings"][0]["endDate"], "2024-03-10")
        self.assertEqual([c["year"] for c in ambig["readings"][0]["centuryCandidates"]], [2024, 1924])

        illegal = decode_date_code("5454", reference_year=2026)
        self.assertFalse(illegal["ok"])

        w53_2021 = decode_date_code("2153", century=2000, reference_year=2026)
        self.assertNotIn("YYWW", [r["format"] for r in w53_2021["readings"]])
        self.assertTrue(any(r["format"] == "YYWW" for r in w53_2021["rejectedReadings"]))

    def test_5digit_julian(self) -> None:
        leap = decode_date_code("24366", century=2000, reference_year=2026)
        self.assertTrue(leap["ok"])
        self.assertEqual(leap["readings"][0]["date"], "2024-12-31")

        non_leap = decode_date_code("23366", century=2000, reference_year=2026)
        self.assertFalse(non_leap["ok"])

        day_367 = decode_date_code("24367", century=2000, reference_year=2026)
        self.assertFalse(day_367["ok"])

        y2k = decode_date_code("00366", century=2000, reference_year=2026)
        self.assertTrue(y2k["ok"])
        self.assertFalse(y2k["readings"][0]["centuryCandidates"][1]["validOrdinalDay"])

        y1900 = decode_date_code("00366", century=1900, reference_year=2026)
        self.assertFalse(y1900["ok"])

    def test_onsemi_two_letter(self) -> None:
        gj = decode_onsemi_two_letter("GJ", reference_year=2026)
        self.assertTrue(gj["ok"])
        self.assertEqual(gj["workWeek"], 10)
        self.assertEqual([c["year"] for c in gj["cycleCandidates"]], [1993, 2005, 2017, 2029])

        sl = decode_onsemi_two_letter("SL", reference_year=2026)
        self.assertTrue(sl["ok"])
        self.assertEqual(sl["workWeek"], 12)
        self.assertIn(2010, [c["year"] for c in sl["cycleCandidates"]])

        for row in ONSEMI_AND8002_TABLE:
            h1 = decode_onsemi_two_letter(row["weeks1To26"][:2], reference_year=2026)
            h2 = decode_onsemi_two_letter(row["weeks27To52"][3:5], reference_year=2026)
            self.assertEqual(h1["workWeek"], 1)
            self.assertEqual(h2["workWeek"], 52)
            self.assertIn(row["year"], [c["year"] for c in h1["cycleCandidates"]])

        self.assertFalse(decode_onsemi_two_letter("OA")["ok"])
        self.assertFalse(decode_onsemi_two_letter("QA")["ok"])
        self.assertEqual(decode_onsemi_two_letter("AO")["workWeek"], 15)
        self.assertEqual(decode_onsemi_two_letter("AQ")["workWeek"], 17)

    def test_national_six_week(self) -> None:
        self.assertEqual(len(NSC_SNOA039C_PERIODS), 9)
        p0012 = decode_national_six_week("0012", century=2000, reference_year=2026)
        self.assertTrue(p0012["ok"])
        self.assertEqual(p0012["oneDigitPeriodCode"], "2")
        self.assertEqual(p0012["weeksCovered"], "12 - 17")
        self.assertEqual(p0012["maxPlainYywwUnderstatementWeeks"], 5)

        p2252 = decode_national_six_week("2252", century=2000, reference_year=2026)
        self.assertTrue(p2252["ok"])
        self.assertTrue(p2252["wrapsIntoNextYear"])
        self.assertEqual(p2252["primaryCandidate"]["endYear"], 2023)

        self.assertFalse(decode_national_six_week("0014", century=2000, reference_year=2026)["ok"])

    def test_stm32_decoder(self) -> None:
        f103 = decode_stm32("STM32F103C8T6")
        self.assertTrue(f103["ok"])
        self.assertTrue(f103["verified"])
        self.assertEqual(f103["family"]["doc"], "DS5319 Rev 20")
        self.assertEqual(f103["pinCount"]["value"], "48 pins")
        self.assertEqual(f103["flashSize"]["value"], "64 KB")
        self.assertEqual(f103["package"]["value"], "LQFP")
        self.assertEqual(f103["temperatureRange"]["value"], "-40 to 85 °C ambient")

        g030 = decode_stm32("STM32G030F6P6TR")
        self.assertTrue(g030["ok"])
        self.assertEqual(g030["family"]["doc"], "DS12991 Rev 6")
        self.assertEqual(g030["pinCount"]["value"], "20 pins")
        self.assertEqual(g030["flashSize"]["value"], "32 KB")
        self.assertEqual(g030["package"]["value"], "TSSOP")
        self.assertEqual(g030["packing"]["value"], "Tape and reel")

        h743 = decode_stm32("STM32H743VIT6")
        self.assertTrue(h743["ok"])
        self.assertEqual(h743["family"]["doc"], "DS12110 Rev 11")
        self.assertEqual(h743["pinCount"]["value"], "100 pins")
        self.assertEqual(h743["flashSize"]["value"], "2 MB")
        self.assertEqual(h743["package"]["value"], "LQFP")

        generic = decode_stm32("STM32U575RIT6")
        self.assertTrue(generic["ok"])
        self.assertFalse(generic["verified"])

        self.assertFalse(decode_stm32("STM8S103F3P6")["ok"])
        self.assertFalse(decode_stm32("STM32WB55CCU6")["ok"])

    def test_cross_language_json_parity_and_cli(self) -> None:
        cases = [
            ["STM32F103C8T6", "--json"],
            ["STM32G030F6P6TR", "--json"],
            ["STM32H743VIT6", "--json"],
            ["date", "2410", "--ref-year", "2026", "--json"],
            ["date", "0012", "--ref-year", "2026", "--json"],
            ["date", "24366", "--ref-year", "2026", "--json"],
            ["onsemi", "GJ", "--ref-year", "2026", "--json"],
            ["nsc", "9948", "--century", "1900", "--ref-year", "2026", "--json"],
        ]
        node_bin = ROOT / "bin" / "ic-stm32-decoder.js"
        for args in cases:
            py_run = subprocess.run(
                [sys.executable, "-m", "ic_stm32_decoder", *args],
                cwd=ROOT,
                capture_output=True,
                text=True,
                check=True,
            )
            node_run = subprocess.run(
                ["node", str(node_bin), *args],
                cwd=ROOT,
                capture_output=True,
                text=True,
                check=True,
            )
            self.assertEqual(
                json.loads(py_run.stdout),
                json.loads(node_run.stdout),
                msg=f"Parity mismatch for args={args}",
            )

        bad_run = subprocess.run(
            [sys.executable, "-m", "ic_stm32_decoder", "24367"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(bad_run.returncode, 1)


if __name__ == "__main__":
    unittest.main()
