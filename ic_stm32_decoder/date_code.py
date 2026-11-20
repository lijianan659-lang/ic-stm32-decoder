"""Zero-dependency IC Date Code & Lot Marking Decoder (Python 3).

Covers:
1. Numeric markings: 3-digit (YWW), 4-digit parallel readings (YYWW, WWYY, YYMM),
   5-digit Julian/ordinal dates (YYDDD), and supplier notation (YY+).
2. onsemi 12-year repeating two-letter date codes per AND8002/D Rev. 13 (Sep 2023), Tables 3 & 4.
3. National Semiconductor (TI) 6-week assembly period codes per SNOA039C (May 2004, rev. Jul 2005), Tables 1-6.
"""

from __future__ import annotations

import calendar
from datetime import date, datetime, timedelta, timezone
import re
from typing import Any
from urllib.parse import quote

MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

ONSEMI_FIRST_LETTERS = "ABCDEFGHIJKLMNPRSTUVWXYZ"

ONSEMI_AND8002_TABLE: list[dict[str, Any]] = [
    {"year": 2006, "weeks1To26": "IA-IZ", "weeks27To52": "JA-JZ"},
    {"year": 2007, "weeks1To26": "KA-KZ", "weeks27To52": "LA-LZ"},
    {"year": 2008, "weeks1To26": "MA-MZ", "weeks27To52": "NA-NZ"},
    {"year": 2009, "weeks1To26": "PA-PZ", "weeks27To52": "RA-RZ"},
    {"year": 2010, "weeks1To26": "SA-SZ", "weeks27To52": "TA-TZ"},
    {"year": 2011, "weeks1To26": "UA-UZ", "weeks27To52": "VA-VZ"},
    {"year": 2012, "weeks1To26": "WA-WZ", "weeks27To52": "XA-XZ"},
    {"year": 2013, "weeks1To26": "YA-YZ", "weeks27To52": "ZA-ZZ"},
    {"year": 2014, "weeks1To26": "AA-AZ", "weeks27To52": "BA-BZ"},
    {"year": 2015, "weeks1To26": "CA-CZ", "weeks27To52": "DA-DZ"},
    {"year": 2016, "weeks1To26": "EA-EZ", "weeks27To52": "FA-FZ"},
    {"year": 2017, "weeks1To26": "GA-GZ", "weeks27To52": "HA-HZ"},
    {"year": 2018, "weeks1To26": "IA-IZ", "weeks27To52": "JA-JZ"},
    {"year": 2019, "weeks1To26": "KA-KZ", "weeks27To52": "LA-LZ"},
    {"year": 2020, "weeks1To26": "MA-MZ", "weeks27To52": "NA-NZ"},
    {"year": 2021, "weeks1To26": "PA-PZ", "weeks27To52": "RA-RZ"},
    {"year": 2022, "weeks1To26": "SA-SZ", "weeks27To52": "TA-TZ"},
    {"year": 2023, "weeks1To26": "UA-UZ", "weeks27To52": "VA-VZ"},
    {"year": 2024, "weeks1To26": "WA-WZ", "weeks27To52": "XA-XZ"},
    {"year": 2025, "weeks1To26": "YA-YZ", "weeks27To52": "ZA-ZZ"},
    {"year": 2026, "weeks1To26": "AA-AZ", "weeks27To52": "BA-BZ"},
    {"year": 2027, "weeks1To26": "CA-CZ", "weeks27To52": "DA-DZ"},
    {"year": 2028, "weeks1To26": "EA-EZ", "weeks27To52": "FA-FZ"},
    {"year": 2029, "weeks1To26": "GA-GZ", "weeks27To52": "HA-HZ"},
    {"year": 2030, "weeks1To26": "IA-IZ", "weeks27To52": "JA-JZ"},
]

NSC_SNOA039C_PERIODS: list[dict[str, Any]] = [
    {"twoDigitCode": "52", "oneDigitCode": "9", "startWeek": 52, "endWeek": 5, "wrapsIntoNextYear": True, "weeksCovered": "52 - 5 (wraps into the next year)"},
    {"twoDigitCode": "06", "oneDigitCode": "1", "startWeek": 6, "endWeek": 11, "wrapsIntoNextYear": False, "weeksCovered": "6 - 11"},
    {"twoDigitCode": "12", "oneDigitCode": "2", "startWeek": 12, "endWeek": 17, "wrapsIntoNextYear": False, "weeksCovered": "12 - 17"},
    {"twoDigitCode": "18", "oneDigitCode": "3", "startWeek": 18, "endWeek": 23, "wrapsIntoNextYear": False, "weeksCovered": "18 - 23"},
    {"twoDigitCode": "24", "oneDigitCode": "4", "startWeek": 24, "endWeek": 29, "wrapsIntoNextYear": False, "weeksCovered": "24 - 29"},
    {"twoDigitCode": "30", "oneDigitCode": "5", "startWeek": 30, "endWeek": 35, "wrapsIntoNextYear": False, "weeksCovered": "30 - 35"},
    {"twoDigitCode": "36", "oneDigitCode": "6", "startWeek": 36, "endWeek": 41, "wrapsIntoNextYear": False, "weeksCovered": "36 - 41"},
    {"twoDigitCode": "42", "oneDigitCode": "7", "startWeek": 42, "endWeek": 47, "wrapsIntoNextYear": False, "weeksCovered": "42 - 47"},
    {"twoDigitCode": "48", "oneDigitCode": "8", "startWeek": 48, "endWeek": 51, "wrapsIntoNextYear": False, "weeksCovered": "48 - 51"},
]


def is_leap_year(year: int) -> bool:
    return calendar.isleap(year)


def iso_weeks_in_year(year: int) -> int:
    jan1_weekday = date(year, 1, 1).weekday()  # Monday=0 .. Thursday=3, Wednesday=2
    return 53 if (jan1_weekday == 3 or (jan1_weekday == 2 and is_leap_year(year))) else 52


def iso_week_range(year: int, week: int) -> dict[str, str] | None:
    if not isinstance(year, int) or not isinstance(week, int) or isinstance(year, bool) or isinstance(week, bool):
        return None
    if week < 1 or week > iso_weeks_in_year(year):
        return None
    mon = date.fromisocalendar(year, week, 1)
    sun = date.fromisocalendar(year, week, 7)
    start_str = mon.isoformat()
    end_str = sun.isoformat()
    return {
        "startDate": start_str,
        "endDate": end_str,
        "formatted": f"{start_str} to {end_str}",
    }


def _normalize_century(century: int | str | None) -> int:
    try:
        c = int(2000 if century is None else century)
    except (TypeError, ValueError):
        return 2000
    return 1900 if c == 1900 else 2000


def _normalize_reference_year(reference_year: int | None) -> int:
    if reference_year is not None:
        try:
            y = int(reference_year)
            if 1970 <= y <= 2100:
                return y
        except (TypeError, ValueError):
            pass
    return datetime.now(timezone.utc).year


def _century_pair(yy: int, preferred_century: int | None) -> list[int]:
    base = _normalize_century(preferred_century)
    other = 1900 if base == 2000 else 2000
    return [base + yy, other + yy]


def decode_onsemi_two_letter(raw: str, *, reference_year: int | None = None) -> dict[str, Any]:
    inp = str(raw or "").strip().upper()
    ref_year = _normalize_reference_year(reference_year)
    base_result: dict[str, Any] = {
        "input": inp,
        "ok": False,
        "scheme": "ONSEMI_AND8002_2LETTER",
        "source": "onsemi AND8002/D Rev. 13 (September 2023), Tables 3 & 4",
        "referenceUrl": "https://www.partvane.com/tools/date-code-formats/",
    }

    if not re.fullmatch(r"[A-Z]{2}", inp):
        return {
            **base_result,
            "error": "onsemi two-letter date codes must be exactly two letters A-Z (e.g. GJ, SL, WA).",
        }

    first, second = inp[0], inp[1]
    if first in ("O", "Q"):
        return {
            **base_result,
            "error": (
                f"First character '{first}' is not valid in onsemi AND8002/D: letters O and Q are skipped "
                "so the remaining 24 letters form a 12-year cycle (2 letters per year)."
            ),
        }

    idx1 = ONSEMI_FIRST_LETTERS.index(first)
    year_offset = idx1 // 2
    half = (idx1 % 2) + 1
    week_in_half = ord(second) - ord("A") + 1
    work_week = (0 if half == 1 else 26) + week_in_half

    cycle_bases = [1990, 2002, 2014, 2026]
    cycle_candidates = []
    for cycle_start in cycle_bases:
        yr = cycle_start + year_offset
        wk_range = iso_week_range(yr, work_week)
        assert wk_range is not None
        cycle_candidates.append(
            {
                "year": yr,
                "workWeek": work_week,
                "startDate": wk_range["startDate"],
                "endDate": wk_range["endDate"],
                "inAnd8002Rev13Table": 2006 <= yr <= 2030,
                "isFuture": yr > ref_year,
            }
        )

    years_str = ", ".join(str(c["year"]) for c in cycle_candidates)
    return {
        **base_result,
        "ok": True,
        "firstLetter": first,
        "secondLetter": second,
        "halfOfYear": half,
        "halfRangeWeeks": "1-26" if half == 1 else "27-52",
        "weekInHalf": week_in_half,
        "workWeek": work_week,
        "cycleLengthYears": 12,
        "cycleCandidates": cycle_candidates,
        "notes": [
            f"Only 24 first-position letters are used (O and Q skipped), so '{inp}' repeats every 12 years ({years_str}, W{work_week:02d}).",
            "Scope: onsemi ECLinPS and clock/data small packages per AND8002/D. Device-specific datasheet marking diagrams take precedence where they differ.",
        ],
    }


def lookup_national_period(period_code: str | int) -> dict[str, Any] | None:
    s = str(period_code if period_code is not None else "").strip()
    if re.fullmatch(r"[0-9]{2}", s):
        return next((p for p in NSC_SNOA039C_PERIODS if p["twoDigitCode"] == s), None)
    if re.fullmatch(r"[1-9]", s):
        return next((p for p in NSC_SNOA039C_PERIODS if p["oneDigitCode"] == s), None)
    return None


def decode_national_six_week(
    raw: str,
    *,
    century: int = 2000,
    reference_year: int | None = None,
) -> dict[str, Any]:
    inp = str(raw or "").strip().upper()
    cent = _normalize_century(century)
    ref_year = _normalize_reference_year(reference_year)
    base_result: dict[str, Any] = {
        "input": inp,
        "ok": False,
        "scheme": "NSC_SNOA039C_6WEEK",
        "source": "National Semiconductor SNOA039C (May 2004, revised July 2005), Tables 1-6",
        "referenceUrl": "https://www.partvane.com/tools/date-code-formats/",
    }

    if not re.fullmatch(r"[0-9]{4}", inp):
        return {
            **base_result,
            "error": (
                "National Semiconductor 4-digit date codes must be 4 digits YYPP where PP is one of the "
                "9 legal six-week period codes (06, 12, 18, 24, 30, 36, 42, 48, 52)."
            ),
        }

    yy = int(inp[:2])
    pp = inp[2:]
    period = lookup_national_period(pp)
    if period is None:
        return {
            **base_result,
            "error": (
                f"Week digits '{pp}' are not a legal National Semiconductor SNOA039C period code. "
                "Only 06, 12, 18, 24, 30, 36, 42, 48, and 52 can appear."
            ),
        }

    candidate_years = _century_pair(yy, cent)
    century_candidates = []
    for yr in candidate_years:
        start_range = iso_week_range(yr, period["startWeek"])
        end_year = yr + 1 if period["wrapsIntoNextYear"] else yr
        end_range = iso_week_range(end_year, period["endWeek"])
        assert start_range is not None and end_range is not None
        century_candidates.append(
            {
                "century": (yr // 100) * 100,
                "year": yr,
                "startWeek": period["startWeek"],
                "endWeek": period["endWeek"],
                "endYear": end_year,
                "wrapsIntoNextYear": period["wrapsIntoNextYear"],
                "startDate": start_range["startDate"],
                "endDate": end_range["endDate"],
                "isFuture": yr > ref_year,
            }
        )

    max_understatement = 3 if period["twoDigitCode"] == "48" else 5
    return {
        **base_result,
        "ok": True,
        "yearDigits": inp[:2],
        "twoDigitPeriodCode": period["twoDigitCode"],
        "oneDigitPeriodCode": period["oneDigitCode"],
        "startWeek": period["startWeek"],
        "endWeek": period["endWeek"],
        "wrapsIntoNextYear": period["wrapsIntoNextYear"],
        "weeksCovered": period["weeksCovered"],
        "maxPlainYywwUnderstatementWeeks": max_understatement,
        "primaryCandidate": century_candidates[0],
        "centuryCandidates": century_candidates,
        "notes": [
            f"On National Semiconductor parts (LM, LF, LMC, DS, ADC prefixes), '{pp}' is the starting week of assembly period '{period['weeksCovered']}' (1-digit code '{period['oneDigitCode']}'), not a single work week.",
            f"Reading '{inp}' as plain YYWW understates the assembly date by up to {max_understatement} weeks.",
            "Caution (SNOA039C): On small packages (SOT-23, SOT-223, SC70, SC90), the top 4 characters are device ID + grade, NOT a date code (their date code is on the package underside).",
        ],
    }


def decode_date_code(
    raw: str,
    *,
    century: int = 2000,
    reference_year: int | None = None,
    scheme: str = "auto",
) -> dict[str, Any]:
    inp = str(raw or "").strip().upper()
    cent = _normalize_century(century)
    ref_year = _normalize_reference_year(reference_year)
    sch = str(scheme or "auto").lower()

    if not inp:
        return {
            "input": "",
            "ok": False,
            "century": cent,
            "referenceYear": ref_year,
            "readings": [],
            "rejectedReadings": [],
            "manufacturerSpecific": None,
            "error": "Empty date code input.",
        }

    if sch == "onsemi":
        onsemi = decode_onsemi_two_letter(inp, reference_year=ref_year)
        res: dict[str, Any] = {
            "input": inp,
            "ok": onsemi["ok"],
            "century": cent,
            "referenceYear": ref_year,
            "readings": [{"format": "ONSEMI_AND8002_2LETTER", **onsemi}] if onsemi["ok"] else [],
            "rejectedReadings": [] if onsemi["ok"] else [{"format": "ONSEMI_AND8002_2LETTER", "reason": onsemi["error"]}],
            "manufacturerSpecific": {"onsemiAnd8002": onsemi},
            "shareUrl": "https://www.partvane.com/tools/date-code-formats/",
        }
        if not onsemi["ok"]:
            res["error"] = onsemi["error"]
        return res

    if sch == "nsc":
        nsc = decode_national_six_week(inp, century=cent, reference_year=ref_year)
        res = {
            "input": inp,
            "ok": nsc["ok"],
            "century": cent,
            "referenceYear": ref_year,
            "readings": [{"format": "NSC_SNOA039C_6WEEK", **nsc}] if nsc["ok"] else [],
            "rejectedReadings": [] if nsc["ok"] else [{"format": "NSC_SNOA039C_6WEEK", "reason": nsc["error"]}],
            "manufacturerSpecific": {"nscSnoa039c": nsc},
            "shareUrl": "https://www.partvane.com/tools/date-code-formats/",
        }
        if not nsc["ok"]:
            res["error"] = nsc["error"]
        return res

    if sch == "auto" and re.fullmatch(r"[A-Z]{2}", inp):
        onsemi = decode_onsemi_two_letter(inp, reference_year=ref_year)
        res = {
            "input": inp,
            "ok": onsemi["ok"],
            "century": cent,
            "referenceYear": ref_year,
            "readings": [{"format": "ONSEMI_AND8002_2LETTER", **onsemi}] if onsemi["ok"] else [],
            "rejectedReadings": [] if onsemi["ok"] else [{"format": "ONSEMI_AND8002_2LETTER", "reason": onsemi["error"]}],
            "manufacturerSpecific": {"onsemiAnd8002": onsemi},
            "shareUrl": "https://www.partvane.com/tools/date-code-formats/",
        }
        if not onsemi["ok"]:
            res["error"] = onsemi["error"]
        return res

    share_url = f"https://www.partvane.com/tools/date-code-decoder/?c={quote(inp, safe='')}&century={cent}"

    if re.fullmatch(r"[0-9]{2}\+", inp):
        yy = int(inp[:2])
        candidates = _century_pair(yy, cent)
        return {
            "input": inp,
            "ok": True,
            "century": cent,
            "referenceYear": ref_year,
            "readings": [
                {
                    "format": "YY_PLUS",
                    "label": "Supplier year notation (not a package marking standard)",
                    "year": candidates[0],
                    "centuryCandidates": [
                        {"century": (yr // 100) * 100, "year": yr, "meaning": f"{yr} or newer"}
                        for yr in candidates
                    ],
                    "warning": candidates[0] > ref_year,
                    "note": f"Suppliers use '{inp}' on stock lists to mean {candidates[0]} or later. Confirm actual lot date codes before purchase.",
                }
            ],
            "rejectedReadings": [],
            "manufacturerSpecific": None,
            "shareUrl": share_url,
        }

    readings: list[dict[str, Any]] = []
    rejected_readings: list[dict[str, Any]] = []
    manufacturer_specific: dict[str, Any] | None = None

    if re.fullmatch(r"[0-9]{3}", inp):
        y = int(inp[0])
        ww = int(inp[1:])
        if ww < 1 or ww > 53:
            rejected_readings.append(
                {
                    "format": "YWW",
                    "reason": f"Work week {ww:02d} is outside the valid ISO week range (01-53).",
                }
            )
        else:
            current_decade = (ref_year // 10) * 10
            assumed_year = current_decade - 10 + y if current_decade + y > ref_year else current_decade + y
            decade_years = [assumed_year, assumed_year - 10, assumed_year - 20, assumed_year - 30]
            decade_candidates = []
            for yr in decade_years:
                rng = iso_week_range(yr, ww)
                decade_candidates.append(
                    {
                        "year": yr,
                        "workWeek": ww,
                        "validIsoWeek": rng is not None,
                        "startDate": rng["startDate"] if rng else None,
                        "endDate": rng["endDate"] if rng else None,
                        "isoWeeksInYear": iso_weeks_in_year(yr),
                    }
                )
            primary_range = iso_week_range(assumed_year, ww)
            if primary_range is None:
                valid_alt_years = [str(c["year"]) for c in decade_candidates if c["validIsoWeek"]]
                suffix = f" Earlier 10-year cycle year(s) with week 53: {', '.join(valid_alt_years)}." if valid_alt_years else ""
                rejected_readings.append(
                    {
                        "format": "YWW",
                        "reason": f"{assumed_year} has only {iso_weeks_in_year(assumed_year)} ISO weeks (no ISO week 53).{suffix}",
                        "decadeCandidates": decade_candidates,
                    }
                )
            else:
                readings.append(
                    {
                        "format": "YWW",
                        "label": "Single-digit year then work week",
                        "year": assumed_year,
                        "workWeek": ww,
                        "startDate": primary_range["startDate"],
                        "endDate": primary_range["endDate"],
                        "isoCalendarRange": primary_range["formatted"],
                        "decadeCandidates": decade_candidates,
                        "warning": False,
                        "note": f"Single-digit year '{y}' repeats every 10 years ({', '.join(str(x) for x in decade_years[:3])}).",
                    }
                )
    elif re.fullmatch(r"[0-9]{4}", inp):
        first_two = int(inp[:2])
        last_two = int(inp[2:])

        # 1) YYWW
        if last_two < 1 or last_two > 53:
            rejected_readings.append(
                {
                    "format": "YYWW",
                    "reason": f"Work week {last_two:02d} is outside the valid ISO week range (01-53).",
                }
            )
        else:
            ys = _century_pair(first_two, cent)
            century_candidates = []
            for yr in ys:
                rng = iso_week_range(yr, last_two)
                century_candidates.append(
                    {
                        "century": (yr // 100) * 100,
                        "year": yr,
                        "workWeek": last_two,
                        "validIsoWeek": rng is not None,
                        "isoWeeksInYear": iso_weeks_in_year(yr),
                        "startDate": rng["startDate"] if rng else None,
                        "endDate": rng["endDate"] if rng else None,
                        "isFuture": yr > ref_year,
                    }
                )
            primary = century_candidates[0]
            if not primary["validIsoWeek"]:
                rejected_readings.append(
                    {
                        "format": "YYWW",
                        "reason": f"{primary['year']} has no ISO week {last_two} ({primary['year']} has {primary['isoWeeksInYear']} ISO weeks).",
                        "centuryCandidates": century_candidates,
                    }
                )
            else:
                readings.append(
                    {
                        "format": "YYWW",
                        "label": "Year then work week",
                        "year": primary["year"],
                        "workWeek": last_two,
                        "startDate": primary["startDate"],
                        "endDate": primary["endDate"],
                        "isoCalendarRange": f"{primary['startDate']} to {primary['endDate']}",
                        "centuryCandidates": century_candidates,
                        "warning": primary["isFuture"],
                        "note": (
                            f"Gives future year {primary['year']} under {cent}s assumption (alternate century: {century_candidates[1]['year']})."
                            if primary["isFuture"]
                            else f"Two year digits do not carry a century: '{inp}' can also represent {century_candidates[1]['year']} under 1900-1999 / 2000-2099 ambiguity."
                        ),
                    }
                )

        # 2) WWYY
        if first_two < 1 or first_two > 53:
            rejected_readings.append(
                {
                    "format": "WWYY",
                    "reason": f"Leading digits {first_two:02d} are outside the valid ISO week range (01-53).",
                }
            )
        else:
            ys = _century_pair(last_two, cent)
            century_candidates = []
            for yr in ys:
                rng = iso_week_range(yr, first_two)
                century_candidates.append(
                    {
                        "century": (yr // 100) * 100,
                        "year": yr,
                        "workWeek": first_two,
                        "validIsoWeek": rng is not None,
                        "isoWeeksInYear": iso_weeks_in_year(yr),
                        "startDate": rng["startDate"] if rng else None,
                        "endDate": rng["endDate"] if rng else None,
                        "isFuture": yr > ref_year,
                    }
                )
            primary = century_candidates[0]
            if not primary["validIsoWeek"]:
                rejected_readings.append(
                    {
                        "format": "WWYY",
                        "reason": f"{primary['year']} has no ISO week {first_two} ({primary['year']} has {primary['isoWeeksInYear']} ISO weeks).",
                        "centuryCandidates": century_candidates,
                    }
                )
            else:
                readings.append(
                    {
                        "format": "WWYY",
                        "label": "Work week then year",
                        "year": primary["year"],
                        "workWeek": first_two,
                        "startDate": primary["startDate"],
                        "endDate": primary["endDate"],
                        "isoCalendarRange": f"{primary['startDate']} to {primary['endDate']}",
                        "centuryCandidates": century_candidates,
                        "warning": primary["isFuture"],
                        "note": (
                            f"Gives future year {primary['year']}; unlikely unless reading 19xx stock ({century_candidates[1]['year']})."
                            if primary["isFuture"]
                            else "Used on some commercial components and bare PCBs. Ambiguous with YYWW when both halves are 01-52."
                        ),
                    }
                )

        # 3) YYMM
        if last_two < 1 or last_two > 12:
            rejected_readings.append(
                {
                    "format": "YYMM",
                    "reason": f"Trailing digits {last_two:02d} are outside the valid month range (01-12).",
                }
            )
        else:
            ys = _century_pair(first_two, cent)
            month_name = MONTH_NAMES[last_two - 1]
            century_candidates = []
            for yr in ys:
                last_day = calendar.monthrange(yr, last_two)[1]
                century_candidates.append(
                    {
                        "century": (yr // 100) * 100,
                        "year": yr,
                        "month": last_two,
                        "monthName": month_name,
                        "startDate": f"{yr}-{last_two:02d}-01",
                        "endDate": f"{yr}-{last_two:02d}-{last_day:02d}",
                        "isFuture": yr > ref_year,
                    }
                )
            primary = century_candidates[0]
            readings.append(
                {
                    "format": "YYMM",
                    "label": "Year then month",
                    "year": primary["year"],
                    "month": last_two,
                    "monthName": month_name,
                    "startDate": primary["startDate"],
                    "endDate": primary["endDate"],
                    "calendarRange": f"{primary['startDate']} to {primary['endDate']}",
                    "centuryCandidates": century_candidates,
                    "warning": primary["isFuture"],
                    "note": "Applies only when the manufacturer explicitly documents a YYMM marking format (e.g. certain passives and connectors).",
                }
            )

        if sch == "auto":
            nsc = decode_national_six_week(inp, century=cent, reference_year=ref_year)
            if nsc["ok"]:
                manufacturer_specific = {"nscSnoa039c": nsc}
    elif re.fullmatch(r"[0-9]{5}", inp):
        yy = int(inp[:2])
        ddd = int(inp[2:])
        if ddd < 1 or ddd > 366:
            rejected_readings.append(
                {
                    "format": "YYDDD",
                    "reason": f"Ordinal day {ddd:03d} is outside the valid Julian day range (001-366).",
                }
            )
        else:
            ys = _century_pair(yy, cent)
            century_candidates = []
            for yr in ys:
                max_day = 366 if is_leap_year(yr) else 365
                if ddd > max_day:
                    century_candidates.append(
                        {
                            "century": (yr // 100) * 100,
                            "year": yr,
                            "dayOfYear": ddd,
                            "validOrdinalDay": False,
                            "isLeapYear": is_leap_year(yr),
                            "date": None,
                            "isoWeek": None,
                            "isFuture": yr > ref_year,
                        }
                    )
                else:
                    dt = date(yr, 1, 1) + timedelta(days=ddd - 1)
                    iso_cal = dt.isocalendar()
                    wk_range = iso_week_range(iso_cal.year, iso_cal.week)
                    century_candidates.append(
                        {
                            "century": (yr // 100) * 100,
                            "year": yr,
                            "dayOfYear": ddd,
                            "validOrdinalDay": True,
                            "isLeapYear": is_leap_year(yr),
                            "date": dt.isoformat(),
                            "isoYear": iso_cal.year,
                            "isoWeek": iso_cal.week,
                            "isoWeekRange": wk_range["formatted"] if wk_range else None,
                            "isFuture": yr > ref_year,
                        }
                    )
            primary = century_candidates[0]
            if not primary["validOrdinalDay"]:
                rejected_readings.append(
                    {
                        "format": "YYDDD",
                        "reason": f"Day {ddd} does not exist in non-leap year {primary['year']}.",
                        "centuryCandidates": century_candidates,
                    }
                )
            else:
                readings.append(
                    {
                        "format": "YYDDD",
                        "label": "Julian (ordinal) date",
                        "year": primary["year"],
                        "dayOfYear": ddd,
                        "date": primary["date"],
                        "startDate": primary["date"],
                        "endDate": primary["date"],
                        "isoYear": primary["isoYear"],
                        "isoWeek": primary["isoWeek"],
                        "isoCalendarRange": primary["isoWeekRange"],
                        "centuryCandidates": century_candidates,
                        "warning": primary["isFuture"],
                        "note": "5-digit Julian date specifies an exact ordinal day of the year (001-365, or 366 in leap years).",
                    }
                )
    else:
        return {
            "input": inp,
            "ok": False,
            "century": cent,
            "referenceYear": ref_year,
            "readings": [],
            "rejectedReadings": [],
            "manufacturerSpecific": None,
            "shareUrl": share_url,
            "error": (
                "Unsupported date code pattern. Supported inputs: 3-digit (YWW), 4-digit "
                "(YYWW/WWYY/YYMM or National Semi SNOA039C), 5-digit (YYDDD Julian), YY+, or 2-letter onsemi (AND8002/D)."
            ),
        }

    if not readings:
        error_msg = " | ".join(f"{r['format']}: {r['reason']}" for r in rejected_readings) or (
            f"No standard numeric reading of '{inp}' produces a valid calendar week, month, or ordinal day."
        )
        return {
            "input": inp,
            "ok": False,
            "century": cent,
            "referenceYear": ref_year,
            "readings": [],
            "rejectedReadings": rejected_readings,
            "manufacturerSpecific": manufacturer_specific,
            "shareUrl": share_url,
            "error": error_msg,
        }

    return {
        "input": inp,
        "ok": True,
        "century": cent,
        "referenceYear": ref_year,
        "ambiguous": len(readings) > 1,
        "readings": readings,
        "rejectedReadings": rejected_readings,
        "manufacturerSpecific": manufacturer_specific,
        "shareUrl": share_url,
        "disclaimer": (
            "ISO calendar dates are a reference, not a verified manufacturer production interval. "
            "A plausible date code never authenticates a component."
        ),
    }
