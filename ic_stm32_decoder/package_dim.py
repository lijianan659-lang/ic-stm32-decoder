"""JEDEC / EIAJ / TI SMD IC Package Dimensions & Footprint Trap Lookup (Python 3)."""

from __future__ import annotations

import re
from typing import Any
from urllib.parse import quote

VERIFIED_PACKAGE_DIMENSIONS: list[dict[str, Any]] = [{'id': 'soic8-n',
  'family': 'soic',
  'name': 'SOIC-8 Narrow (150-mil)',
  'standard': 'JEDEC MS-012AA / SOT96-1',
  'codes': 'TI D, Microchip -SN, onsemi D/DR2G, ST D/M',
  'pins': '8',
  'pitch': '1.27 mm (50 mil)',
  'body': '4.90 x 3.90 mm',
  'leadSpan': '6.00 mm',
  'maxHeight': '1.75 mm max',
  'trap': 'Do NOT confuse with 208-mil EIAJ SOP-8 (5.30 mm body, 7.80 mm span, e.g. Winbond '
          'W25Q128JVSIQ or TI PS suffix) or wide isolation DWV (11.5 mm span).',
  'examples': 'LM358DR, NE5532DR, 24LC128-I/SN, SN65HVD230DR, MCP2551-I/SN'},
 {'id': 'sop8-208',
  'family': 'soic',
  'name': 'SOP-8 / SOIC-8 Medium (208-mil EIAJ)',
  'standard': 'EIAJ EDR-7320 / JEITA',
  'codes': 'TI PS/PSR, Winbond SIQ/SSIQ (208-mil), Toshiba SOP8',
  'pins': '8',
  'pitch': '1.27 mm (50 mil)',
  'body': '5.20-6.20 x 5.28-5.30 mm',
  'leadSpan': '7.80-7.90 mm',
  'maxHeight': '2.00 mm max',
  'trap': '1.8 mm wider toe-to-toe than standard 150-mil JEDEC SOIC-8! A 208-mil SPI Flash '
          '(W25Q64JVSSIQ / W25Q128JVSIQ) overhangs a 150-mil SOIC-8 pad unless elongated dual pads '
          'are drawn.',
  'examples': 'W25Q128JVSIQ, W25Q64JVSSIQ, SN75176BPSR, TL072CPSR'},
 {'id': 'soic8-dwv',
  'family': 'soic',
  'name': 'SOIC-8 Stretched Isolation (DWV)',
  'standard': 'TI DWV High-Creepage SOIC-8',
  'codes': 'TI DWV / DWVR (8.5 mm creepage)',
  'pins': '8',
  'pitch': '1.27 mm (50 mil)',
  'body': '5.85 x 7.50 mm',
  'leadSpan': '11.50 mm',
  'maxHeight': '2.80 mm max',
  'trap': 'Reinforced-isolation 8-pin package with 11.5 mm lead span (>8 mm creepage/clearance). '
          'Physically incompatible with both 3.9 mm (D) and 7.5 mm standard DW footprints.',
  'examples': 'AMC1200BDWVR, AMC1301DWVR, UCC5350MCQDWVRQ1'},
 {'id': 'soic14-n',
  'family': 'soic',
  'name': 'SOIC-14 Narrow (150-mil)',
  'standard': 'JEDEC MS-012AB / SOT108-1',
  'codes': 'TI D/DR, onsemi D/DR2G, Nexperia D',
  'pins': '14',
  'pitch': '1.27 mm (50 mil)',
  'body': '8.65 x 3.90 mm',
  'leadSpan': '6.00 mm',
  'maxHeight': '1.75 mm max',
  'trap': 'Check TI narrow D (3.9 mm) vs EIAJ NS (5.3 mm) vs TSSOP-14 PW (4.4 mm, 0.65 mm pitch) — '
          'shared top markings like HCS74Q appear across multiple 14-pin outlines.',
  'examples': 'LM324ADR, LM2902DR, SN74HC08DR, SN65LBC180DR'},
 {'id': 'soic16-n',
  'family': 'soic',
  'name': 'SOIC-16 Narrow (150-mil)',
  'standard': 'JEDEC MS-012AC / SOT109-1',
  'codes': 'TI D/DR, Nexperia D (74HC595D), WCH SOP-16 (CH340G)',
  'pins': '16',
  'pitch': '1.27 mm (50 mil)',
  'body': '9.90 x 3.90 mm',
  'leadSpan': '6.00 mm',
  'maxHeight': '1.75 mm max',
  'trap': 'Critical 16-pin trap: Narrow SOIC-16 (D, 3.90 mm body / 6.00 mm span) is completely '
          'incompatible with Wide SOIC-16 (DW, 7.50 mm body / 10.30 mm span)!',
  'examples': '74HC595D, AM26LS31CDR, AM26LS32ACDR, UCC2818DTR, TL494IDR, CH340G'},
 {'id': 'soic16-w',
  'family': 'soic',
  'name': 'SOIC-16 Wide (300-mil)',
  'standard': 'JEDEC MS-013AA / SOT162-1',
  'codes': 'TI DW/DWR/U, ADI RWZ (ADuM1200/ADM2483), onsemi DW/DWR2G',
  'pins': '16 (also 18/20/24/28 in MS-013)',
  'pitch': '1.27 mm (50 mil)',
  'body': '10.30 x 7.50 mm',
  'leadSpan': '10.30 mm',
  'maxHeight': '2.65 mm max',
  'trap': '300-mil wide body used for digital isolators, gate drivers, industrial PWM/PFC '
          'controllers and 16-bit DACs. Will NOT fit a 150-mil narrow SOIC-16 footprint; often MSL '
          '2 or MSL 3.',
  'examples': 'ISO7240CDW, UCC21750QDWRQ1, ISO1042QDWRQ1, UC2854DW, XTR101AU, DAC714U'},
 {'id': 'msop8-dgk',
  'family': 'tssop',
  'name': 'MSOP-8 / VSSOP-8 (3.0 mm Body)',
  'standard': 'JEDEC MO-187AA',
  'codes': 'TI DGK/DGKR, ADI RM/RMZ, Microchip MS',
  'pins': '8 (also 10-pin DGS @ 0.50 mm pitch)',
  'pitch': '0.65 mm (8-pin) / 0.50 mm (10-pin DGS)',
  'body': '3.00 x 3.00 mm',
  'leadSpan': '4.90 mm',
  'maxHeight': '1.10 mm max',
  'trap': 'Trap #1: 8-pin DGK is 0.65 mm pitch, whereas 10-pin VSSOP (DGS, e.g. ADS1115IDGSR) '
          'shrinks to 0.50 mm pitch in the same 3.0x3.0 mm body! Trap #2: Never substitute 4.4 mm '
          'TSSOP-8 (PW) onto a 3.0 mm DGK footprint.',
  'examples': 'ADS1115IDGSR (10-pin DGS 0.5mm), ADS1015IDGSR, INA828IDGKR'},
 {'id': 'vssop8-dcu',
  'family': 'tssop',
  'name': 'VSSOP-8 Ultra-Small (DCU / SOT-505)',
  'standard': 'JEITA / SOT505-2',
  'codes': 'TI DCU/DCUR, Nexperia DP',
  'pins': '8',
  'pitch': '0.50 mm',
  'body': '2.00 x 2.30 mm',
  'leadSpan': '3.10 mm',
  'maxHeight': '0.90 mm max',
  'trap': 'TI calls BOTH 3.0x3.0 mm (0.65 mm pitch, DGK) and 2.0x2.3 mm (0.50 mm pitch, DCU) '
          "'VSSOP' in marketing tables! Always match the 3-letter code (DGK vs DCU).",
  'examples': 'SN74LVC2G07DCUR, TXS0102DCUR'},
 {'id': 'tssop8-pw',
  'family': 'tssop',
  'name': 'TSSOP-8 / TSSOP-14 / TSSOP-16 / TSSOP-20 (4.4 mm Body)',
  'standard': 'JEDEC MO-153 (AA/AB/AC)',
  'codes': 'TI PW/PWR, ST TSSOP, onsemi DT/PW, NXP DP/PW',
  'pins': '8 / 14 / 16 / 20 / 24 / 28',
  'pitch': '0.65 mm',
  'body': '3.0-9.7 x 4.40 mm',
  'leadSpan': '6.40 mm',
  'maxHeight': '1.20 mm max',
  'trap': 'Standard 4.40 mm body width (6.40 mm span). Do NOT mix with 3.00 mm MSOP (DGK, 4.90 mm '
          'span), 3.90 mm QSOP (DBQ, 0.635 mm pitch) or 5.30 mm wide SSOP (DB)!',
  'examples': 'TXS0108EPWR, AM26LS32ACPWR, SN74HC245PWR, INA240A1QPWRQ1'},
 {'id': 'qsop16-dbq',
  'family': 'tssop',
  'name': 'SSOP-16 / QSOP-16 (150-mil, 25-mil Pitch)',
  'standard': 'JEDEC MO-137AB (QSOP)',
  'codes': 'TI DBQ/DBQR, Maxim/ADI E/EE, Microchip SS (check pitch)',
  'pins': '16 / 20 / 24 / 28',
  'pitch': '0.635 mm (25 mil)',
  'body': '4.90 x 3.90 mm (16-pin)',
  'leadSpan': '6.00 mm',
  'maxHeight': '1.75 mm max',
  'trap': 'Fits 16 pins into the exact length of an 8-pin SOIC (4.90 x 3.90 mm) using imperial '
          '0.635 mm (25-mil) pitch — NOT metric 0.65 mm TSSOP-16 (PW, 5.00 x 4.40 mm)!',
  'examples': 'ADS7843E, ISO1212DBQR'},
 {'id': 'ssop-db',
  'family': 'tssop',
  'name': 'SSOP Wide (208-mil Body, 0.65 mm Pitch)',
  'standard': 'EIAJ SSOP / JEDEC MO-150',
  'codes': 'TI DB/DBR, Microchip SS (5.3 mm)',
  'pins': '14 / 16 / 20 / 28',
  'pitch': '0.65 mm',
  'body': '6.2-10.2 x 5.30 mm',
  'leadSpan': '7.80 mm',
  'maxHeight': '2.00 mm max',
  'trap': '5.30 mm body / 7.80 mm span — 1.4 mm wider than TSSOP (PW, 6.40 mm span). Ordering '
          'ADS1256IDBR (DB-28) or DAC7621E (DB-20) vs a TSSOP PW footprint will not solder.',
  'examples': 'ADS1256IDBR, DAC7621E, AM26LS31CDBR'},
 {'id': 'sot23-dbv',
  'family': 'sot',
  'name': 'SOT-23-3 / SOT-23-5 / SOT-23-6',
  'standard': 'JEDEC TO-236 / SOT23',
  'codes': 'TI DBV/DBVR, National M5, ST SOT23-6L, onsemi SN/LT1G',
  'pins': '3 / 5 / 6',
  'pitch': '0.95 mm (5/6-pin) / 1.90 mm (3-pin)',
  'body': '2.90 x 1.60 mm',
  'leadSpan': '2.80 mm',
  'maxHeight': '1.15-1.45 mm max',
  'trap': 'Do NOT mix SOT-23-5 (TI DBV / National M5, 2.9x1.6 mm, 0.95 mm pitch) with SC-70-5 (TI '
          'DCK / National M7, 2.0x1.25 mm, 0.65 mm pitch) or thin SOT-23-THN (TI DDC, 0.80 mm '
          'pitch on 6-pin)!',
  'examples': 'TPS2553DBVR, USBLC6-2SC6, AO3400A, BSS138, LMV7219M5/NOPB'},
 {'id': 'sc70-dck',
  'family': 'sot',
  'name': 'SC-70-5 / SC-70-6 (SOT-353 / SOT-363)',
  'standard': 'EIAJ SC-70 / JEDEC MO-203',
  'codes': 'TI DCK/DCKR, National M7, Nexperia GW/GV',
  'pins': '5 / 6',
  'pitch': '0.65 mm',
  'body': '2.00 x 1.25 mm',
  'leadSpan': '2.10 mm',
  'maxHeight': '1.10 mm max',
  'trap': '30% smaller footprint than SOT-23! In National/TI MPNs, M5 = SOT-23-5 (mark C14A) '
          'whereas M7 = SC-70-5 (mark C15 on LMV7219M7/NOPB).',
  'examples': 'LMV7219M7/NOPB, SN74LVC1G08DCKR'},
 {'id': 'sot563-drl',
  'family': 'sot',
  'name': 'SOT-5X3 / SOT-563 (Flat-Lead Sub-Miniature)',
  'standard': 'JEDEC MO-293 / TI DRL',
  'codes': 'TI DRL/DRLR',
  'pins': '6 / 8',
  'pitch': '0.50 mm',
  'body': '1.60 x 1.20 mm',
  'leadSpan': '1.60 mm (flush flat leads)',
  'maxHeight': '0.60 mm max',
  'trap': 'Ultra-tiny 1.6x1.2 mm non-gullwing flat-lead outline (0.50 mm pitch). Requires '
          'precision stencil aperture control and cannot fit SOT-23 or SC-70 pads.',
  'examples': 'TPS61023DRLR'},
 {'id': 'qfn-vqfn',
  'family': 'qfn',
  'name': 'QFN / VQFN / WQFN / TQFN / LFCSP (Leadless + Exposed Pad)',
  'standard': 'JEDEC MO-220 (var. pitch & EP)',
  'codes': 'TI RGT/RGY/RTV/RHS/RSA, ADI ACPZ/BCPZ/ATP+, Espressif QFN',
  'pins': '16 / 20 / 24 / 32 / 40 / 48+',
  'pitch': '0.40 mm / 0.50 mm / 0.65 mm',
  'body': '3x3, 4x4, 5x5, 6x6, 7x7 mm',
  'leadSpan': 'Flush leadless (check QW wettable flanks)',
  'maxHeight': '0.75-1.00 mm',
  'trap': 'NEVER assume two QFN-16 or QFN-32 ICs share a footprint! Body size, pin pitch, center '
          'thermal pad (EP) dimensions/net (GND vs V- vs floating), MSL (often Level 2 or 3) and '
          'wettable flanks (QW) vary per datasheet.',
  'examples': 'DS90UB913QSQ/NOPB (WQFN-32 5x5 MSL 3), SN65LBC180RSAR (QFN-16 4x4), MAX31865ATP+, '
              'TPS62130RGTR'},
 {'id': 'plcc-pdip',
  'family': 'legacy',
  'name': 'PLCC-20 / PLCC-28 / PLCC-44 & PDIP Through-Hole',
  'standard': 'JEDEC MS-018 (PLCC) / MS-001 (PDIP)',
  'codes': 'TI FN (PLCC), N/P/PG (PDIP 100-mil)',
  'pins': 'PLCC 20/28/44; PDIP 8/14/16/20/28/40',
  'pitch': '1.27 mm J-lead (PLCC) / 2.54 mm (100-mil PDIP)',
  'body': 'J-leaded square SMD/socket or 300/600-mil DIP',
  'leadSpan': 'Socket or through-hole',
  'maxHeight': '3.5-5.1 mm',
  'trap': 'Widespread 2025-2026 Obsolete/NRND status across TI & onsemi (e.g. PLCC-28 DAC7724NB, '
          'PDIP-8 DAC7611P/INA118P, PDIP-16 TL494IN). Watch 300-mil skinny DIP vs 600-mil wide DIP '
          'and PLCC MSL 3 baking rules!',
  'examples': 'DAC7724NB, TLC2543IFN, DAC7611P, INA118P, TL494IN, DAC714P'}]


def lookup_package_dimensions(raw_query: str = "", family: str = "all") -> dict[str, Any]:
    q = str(raw_query or "").strip()
    fam = (str(family or "all").strip().lower()) or "all"
    tokens = [t for t in re.split(r"\s+", q.lower()) if t]

    matches: list[dict[str, Any]] = []
    for p in VERIFIED_PACKAGE_DIMENSIONS:
        if fam != "all" and p["family"] != fam:
            continue
        if not tokens:
            matches.append(dict(p))
            continue
        hay = (
            f"{p['id']} {p['name']} {p['standard']} {p['codes']} {p['pins']}-pin "
            f"{p['pitch']} {p['body']} {p['leadSpan']} {p['trap']} {p['examples']}"
        ).lower()
        if all(t in hay for t in tokens):
            matches.append(dict(p))

    params: list[str] = []
    if q:
        params.append(f"q={quote(q, safe='')}")
    if fam and fam != "all":
        params.append(f"fam={quote(fam, safe='')}")
    qs = f"?{'&'.join(params)}" if params else ""

    return {
        "query": q,
        "family": fam,
        "ok": len(matches) > 0,
        "count": len(matches),
        "matches": matches,
        "shareUrl": f"https://www.partvane.com/tools/ic-package-dimensions/{qs}",
    }
