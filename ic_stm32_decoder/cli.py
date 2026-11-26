"""Command-line interface for ic-stm32-decoder (Python 3)."""

from __future__ import annotations

import json
import re
import sys
from typing import Any

from .date_code import (
    decode_date_code,
    decode_national_six_week,
    decode_onsemi_two_letter,
)
from .stm32 import decode_stm32
from .cross_ref import lookup_cross_reference
from .top_marking import lookup_top_marking

HELP_TEXT = """ic-stm32-decoder — Zero-dependency IC Date Code & STM32 Part Number Decoder

Usage:
  python3 -m ic_stm32_decoder <code-or-mpn> [options]
  python3 -m ic_stm32_decoder date <code-or-marking> [--century 2000|1900] [--scheme auto|numeric|onsemi|nsc] [--ref-year YYYY] [--json]
  python3 -m ic_stm32_decoder onsemi <2-letter-code> [--ref-year YYYY] [--json]
  python3 -m ic_stm32_decoder nsc <4-digit-code> [--century 2000|1900] [--ref-year YYYY] [--json]
  python3 -m ic_stm32_decoder stm32 <part-number> [--json]
  python3 -m ic_stm32_decoder marking <top-mark-or-mpn> [--json]
  python3 -m ic_stm32_decoder crossref <mpn> [--json]

Examples:
  python3 -m ic_stm32_decoder 2243
  python3 -m ic_stm32_decoder 24366 --json
  python3 -m ic_stm32_decoder GJ
  python3 -m ic_stm32_decoder nsc 0012
  python3 -m ic_stm32_decoder STM32F103C8T6
  python3 -m ic_stm32_decoder STM32G030F6P6TR

Interactive Web Tools (No Sign-up):
  IC Top Marking Lookup:    https://www.partvane.com/tools/ic-marking-decoder/
  IC Cross-Reference Tool:  https://www.partvane.com/tools/cross-reference/
  IC Date Code Decoder:     https://www.partvane.com/tools/date-code-decoder/
  Marking Formats Guide:    https://www.partvane.com/tools/date-code-formats/
  STM32 Part Decoder:       https://www.partvane.com/tools/stm32-part-number-decoder/
  IC MSL Bake Calculator:   https://www.partvane.com/tools/msl-calculator/
  AEC-Q100 Suffix Decoder:  https://www.partvane.com/tools/aec-q100-grade-decoder/"""


def _parse_args(argv: list[str]) -> dict[str, Any]:
    opts: dict[str, Any] = {
        "mode": "auto",
        "target": None,
        "century": 2000,
        "scheme": "auto",
        "reference_year": None,
        "json": False,
        "help": False,
    }
    positional: list[str] = []
    i = 0
    while i < len(argv):
        arg = argv[i]
        if arg in ("-h", "--help"):
            opts["help"] = True
        elif arg in ("-j", "--json"):
            opts["json"] = True
        elif arg == "--century" and i + 1 < len(argv):
            i += 1
            opts["century"] = int(argv[i])
        elif arg.startswith("--century="):
            opts["century"] = int(arg.split("=", 1)[1])
        elif arg == "--scheme" and i + 1 < len(argv):
            i += 1
            opts["scheme"] = argv[i]
        elif arg.startswith("--scheme="):
            opts["scheme"] = arg.split("=", 1)[1]
        elif arg == "--ref-year" and i + 1 < len(argv):
            i += 1
            opts["reference_year"] = int(argv[i])
        elif arg.startswith("--ref-year="):
            opts["reference_year"] = int(arg.split("=", 1)[1])
        else:
            positional.append(arg)
        i += 1

    if len(positional) >= 2 and positional[0].lower() in ("date", "stm32", "onsemi", "nsc", "marking", "crossref"):
        opts["mode"] = positional[0].lower()
        opts["target"] = " ".join(positional[1:]) if opts["mode"] == "marking" else "".join(positional[1:])
    elif len(positional) >= 1:
        opts["target"] = "".join(positional)

    return opts


def _detect_mode(target: str) -> str:
    clean = re.sub(r"[\s\-_./]", "", target.upper())
    if re.match(r"^STM(32|8)", clean) or re.match(r"^[FGLHUC]\d[0-9A-Z]{2}[A-Z][0-9A-Z]", clean):
        return "stm32"
    return "date"


def _format_date_result(res: dict[str, Any]) -> str:
    lines = [f"Input: {res['input']}"]
    if not res["ok"]:
        lines.append("Status: INVALID")
        lines.append(f"Error:  {res.get('error', '')}")
        return "\n".join(lines)

    count = len(res["readings"])
    lines.append(f"Status: VALID ({count} candidate reading{'s' if count > 1 else ''})")
    for r in res["readings"]:
        lines.append("")
        fmt = r["format"]
        if fmt == "ONSEMI_AND8002_2LETTER":
            lines.append(f"[{fmt}] {r['source']}")
            lines.append(f"  Work Week: W{r['workWeek']:02d} (Half {r['halfOfYear']}, weeks {r['halfRangeWeeks']})")
            lines.append("  12-Year Cycle Candidates:")
            for c in r["cycleCandidates"]:
                tag = " [future]" if c["isFuture"] else ""
                lines.append(f"    - {c['year']} W{c['workWeek']:02d}: {c['startDate']} to {c['endDate']}{tag}")
        elif fmt == "NSC_SNOA039C_6WEEK":
            lines.append(f"[{fmt}] {r['source']}")
            lines.append(
                f"  Assembly Period: Weeks {r['weeksCovered']} (2-digit '{r['twoDigitPeriodCode']}' / 1-digit '{r['oneDigitPeriodCode']}')"
            )
            for c in r["centuryCandidates"]:
                tag = " [future]" if c["isFuture"] else ""
                lines.append(f"    - {c['year']}: {c['startDate']} to {c['endDate']}{tag}")
            for n in r["notes"]:
                lines.append(f"  Note: {n}")
        elif fmt == "YYDDD":
            lines.append(f"[{fmt}] {r['label']}")
            lines.append(
                f"  Primary ({res['century']}s): {r['date']} (Day {r['dayOfYear']}, ISO {r['isoYear']}-W{r['isoWeek']:02d}: {r['isoCalendarRange']})"
            )
            alt = r["centuryCandidates"][1]
            alt_text = alt["date"] if alt["validOrdinalDay"] else f"Invalid (non-leap year {alt['year']})"
            lines.append(f"  Alternate ({alt['century']}s): {alt_text}")
        elif fmt == "YYMM":
            lines.append(f"[{fmt}] {r['label']}")
            lines.append(f"  Primary ({res['century']}s): {r['year']}-{r['month']:02d} ({r['monthName']}, {r['calendarRange']})")
            alt = r["centuryCandidates"][1]
            lines.append(f"  Alternate ({alt['century']}s): {alt['year']}-{alt['month']:02d} ({alt['startDate']} to {alt['endDate']})")
        elif fmt == "YY_PLUS":
            lines.append(f"[{fmt}] {r['label']}")
            lines.append(f"  Meaning: {r['year']} or later")
            lines.append(f"  Note: {r['note']}")
        elif fmt == "YWW":
            lines.append(f"[{fmt}] {r['label']}")
            lines.append(f"  Assumed Decade: {r['year']}-W{r['workWeek']:02d} ({r['isoCalendarRange']})")
            cycles = ", ".join(
                f"{c['year']} ({c['startDate']}..{c['endDate']})"
                for c in r["decadeCandidates"]
                if c["validIsoWeek"]
            )
            lines.append(f"  10-Year Cycle:  {cycles}")
        else:
            warn_tag = " [WARNING: future year]" if r.get("warning") else ""
            lines.append(f"[{fmt}] {r['label']}{warn_tag}")
            lines.append(f"  Primary ({res['century']}s): {r['year']}-W{r['workWeek']:02d} ({r['isoCalendarRange']})")
            alt = r["centuryCandidates"][1]
            alt_str = (
                f"{alt['year']}-W{alt['workWeek']:02d} ({alt['startDate']} to {alt['endDate']})"
                if alt["validIsoWeek"]
                else f"No ISO W{alt['workWeek']} in {alt['year']}"
            )
            lines.append(f"  Alternate ({alt['century']}s): {alt_str}")

    mfr = res.get("manufacturerSpecific") or {}
    nsc = mfr.get("nscSnoa039c")
    if nsc and nsc.get("ok") and res["readings"][0]["format"] != "NSC_SNOA039C_6WEEK":
        p = nsc["primaryCandidate"]
        lines.append("")
        lines.append("[NSC_SNOA039C_6WEEK] National Semiconductor 6-Week Period Candidate")
        lines.append(f"  If marked on LM/LF/LMC/DS/ADC parts: {p['year']} weeks {nsc['weeksCovered']} ({p['startDate']} to {p['endDate']})")
        lines.append(f"  Warning: Plain YYWW understates date by up to {nsc['maxPlainYywwUnderstatementWeeks']} weeks.")

    if res.get("shareUrl"):
        lines.append("")
        lines.append(f"Web Link: {res['shareUrl']}")
    return "\n".join(lines)


def _format_stm32_result(res: dict[str, Any]) -> str:
    lines = [f"Part Number: {res['input'] or '(empty)'}"]
    if res.get("err"):
        lines.append("Status:      INVALID")
        lines.append(f"Error:       {res['err']}")
        return "\n".join(lines)

    ver_label = f"Verified: {res['family']['doc']}" if res["verified"] and res["family"] else "Generic fallback"
    lines.append(f"Status:      {'VALID' if res['ok'] else 'INVALID FIELD(S)'} ({ver_label})")
    if res.get("family"):
        lines.append(f"Family/Core: {res['family']['name']}")
        lines.append(f"Datasheet:   {res['family']['doc']} ({res['family']['url']})")
    if res.get("summary"):
        lines.append(f"Summary:     {res['summary']}")
    lines.append("")
    lines.append("Fields:")
    for f in res["fields"]:
        badge = "OK" if f["st"] == "ok" else f["st"].upper()
        lines.append(f"  - {f['f']:<18} [{f['c']:<5}] : {f['v']} ({badge})")
    if res.get("packing") and not res["packing"]["code"]:
        lines.append(f"  - {'Packing':<18} [none ] : {res['packing']['value']}")
    for n in res["notes"]:
        lines.append(f"Note: {n}")
    lines.append(f"Web Link: {res['shareUrl']}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    opts = _parse_args(sys.argv[1:] if argv is None else argv)
    if opts["help"] or not opts["target"]:
        print(HELP_TEXT)
        return 0 if opts["help"] else 1

    mode = _detect_mode(opts["target"]) if opts["mode"] == "auto" else opts["mode"]
    if mode == "crossref":
        out = lookup_cross_reference(opts["target"])
        if opts["json"]:
            print(json.dumps(out, indent=2, ensure_ascii=False))
        elif not out["ok"]:
            print(f"Input: {out['input']}\nStatus: NOT IN VERIFIED CROSS-REF TABLE\nWeb Link: {out['shareUrl']}")
        else:
            print(f"Input: {out['input']}\nCross-Ref Matches: {len(out['matches'])}")
            for m in out["matches"]:
                print(f"  - {m['src']} -> {m['alt']} [{m['verdict']}] ({m['pkg']})\n    Note: {m['note']}\n    Web: {m['srcUrl'] or out['shareUrl']}")
            print(f"Web Link: {out['shareUrl']}")
        return 0 if out["ok"] else 1
    if mode == "marking":
        out = lookup_top_marking(opts["target"])
        if opts["json"]:
            print(json.dumps(out, indent=2, ensure_ascii=False))
        elif not out["ok"]:
            print(f"Input: {out['input']}\nStatus: NOT IN VERIFIED TABLE\nWeb Link: {out['shareUrl']}")
        else:
            print(f"Input: {out['input']}\nMatches: {len(out['matches'])}")
            for m in out["matches"]:
                print(f"  - [{m['mark']}] -> {m['mpn']} ({m['mfr']}, {m['pkg']})\n    Trap: {m['trap']}\n    Source: {m['src']} | {m['pageUrl']}")
            if out["dateTokens"]:
                print(f"Companion Date Token(s): {', '.join(out['dateTokens'])}")
            print(f"Web Link: {out['shareUrl']}")
        return 0 if out["ok"] else 1
    if mode == "stm32":
        out = decode_stm32(opts["target"])
        print(json.dumps(out, indent=2, ensure_ascii=False) if opts["json"] else _format_stm32_result(out))
        return 0 if (out["ok"] and not out.get("err")) else 1
    if mode == "onsemi":
        onsemi = decode_onsemi_two_letter(opts["target"], reference_year=opts["reference_year"])
        wrapped = decode_date_code(opts["target"], scheme="onsemi", reference_year=opts["reference_year"])
        print(json.dumps(onsemi, indent=2, ensure_ascii=False) if opts["json"] else _format_date_result(wrapped))
        return 0 if onsemi["ok"] else 1
    if mode == "nsc":
        nsc = decode_national_six_week(
            opts["target"],
            century=opts["century"],
            reference_year=opts["reference_year"],
        )
        wrapped = decode_date_code(
            opts["target"],
            scheme="nsc",
            century=opts["century"],
            reference_year=opts["reference_year"],
        )
        print(json.dumps(nsc, indent=2, ensure_ascii=False) if opts["json"] else _format_date_result(wrapped))
        return 0 if nsc["ok"] else 1

    out = decode_date_code(
        opts["target"],
        century=opts["century"],
        scheme=opts["scheme"],
        reference_year=opts["reference_year"],
    )
    print(json.dumps(out, indent=2, ensure_ascii=False) if opts["json"] else _format_date_result(out))
    return 0 if out["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
