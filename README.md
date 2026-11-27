# ic-stm32-decoder

**Zero-dependency IC Top Marking & SMD Code Lookup, IC Date Code / Lot Marking Decoder & Datasheet-Backed STM32 Ordering Part Number Decoder** — shipped with 100% parity in both **Node.js (ES Module)** and **Python 3 (Standard Library)**.

Built for hardware engineers, incoming quality control (IQC) inspectors, EMS procurement teams, and BOM auditing scripts.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18%20ESM-339933)](./package.json)
[![Python](https://img.shields.io/badge/Python-%3E%3D3.9%20stdlib-3776AB)](./pyproject.toml)
[![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](./package.json)

---

## Live Interactive Browser Tools (Free, No Sign-Up)

Need an instant visual breakdown or a shareable deep link for a BOM review, Slack message, or supplier email? Use the companion browser tools maintained by PartVane:

| Online Engineering Tool | Direct URL & Shareable Deep-Link Example | What It Does |
|---|---|---|
| **Live IC Top Marking & SMD Code Lookup** | https://www.partvane.com/tools/ic-marking-decoder/<br>Example: [`?m=UB913SQ+2418`](https://www.partvane.com/tools/ic-marking-decoder/?m=UB913SQ+2418) | Match **210** datasheet-verified cryptic SOT-23/SC-70/VQFN/WSON/SOIC package markings (`UB913SQ`, `C15`, `ZAKX`, `PTSI`, `1M3Q`, `LB176Q`, `BL180`, `UCC21750Q`, `ISO1042Q1`, `NV7344-3`) + incoming-inspection traps |
| **Live IC Cross-Reference & Trap Checker** | https://www.partvane.com/tools/cross-reference/<br>Example: [`?pn=DS90UB913QSQ%2FNOPB`](https://www.partvane.com/tools/cross-reference/?pn=DS90UB913QSQ%2FNOPB) | Verify **48** datasheet-backed drop-in vs conditional crosses (`DS90UB913Q` 10 MHz vs `913A-Q1` 25 MHz PCLK, `AMC1200B` 8.0 vs `AMC1301` 8.2 gain, `UCC2818` 10.5 V vs `UCC2817` 16 V UVLO, `XTR115` 2.5 V vs `XTR116` 4.096 V VREF) |
| **SMD IC Package Dimensions & Trap Checker** | https://www.partvane.com/tools/ic-package-dimensions/<br>Example: [`?q=SOIC-8&fam=soic`](https://www.partvane.com/tools/ic-package-dimensions/?q=SOIC-8&fam=soic) | Compare **16** JEDEC vs EIAJ SMD IC outlines: SOIC-8 3.9 mm (`D`) vs 5.3 mm 208-mil (`PS`/`SIQ`) vs 11.5 mm `DWV`, Narrow vs Wide SOIC-16 (`D` vs `DW`), MSOP (`DGK`) vs TSSOP (`PW`), SOT-23 (`DBV`) vs SC-70 (`DCK`) |
| **Live IC Date Code Decoder** | https://www.partvane.com/tools/date-code-decoder/<br>Example: [`?c=2243&century=2000`](https://www.partvane.com/tools/date-code-decoder/?c=2243&century=2000) | Parallel decoding of `YWW`, `YYWW`, `WWYY`, `YYMM`, `YYDDD` Julian, and `YY+` markings into ISO week calendar ranges |
| **Manufacturer Date Code Formats Reference** | https://www.partvane.com/tools/date-code-formats/ | Full reference tables for **onsemi `AND8002/D`** 12-year two-letter codes and **National Semiconductor `SNOA039C`** 6-week periods |
| **Live STM32 Part Number Decoder** | https://www.partvane.com/tools/stm32-part-number-decoder/<br>Example: [`?pn=STM32F103C8T6`](https://www.partvane.com/tools/stm32-part-number-decoder/?pn=STM32F103C8T6) | Field-by-field STM32 order code breakdown backed by 19 STMicroelectronics datasheet ordering tables |
| **IC MSL Floor-Life & Baking Calculator** | https://www.partvane.com/tools/msl-calculator/<br>Example: [`?msl=3&thk=t1&car=tr`](https://www.partvane.com/tools/msl-calculator/?msl=3&thk=t1&car=tr) | IPC/JEDEC **J-STD-020** floor-life limits (MSL 1–6) and **J-STD-033 Table 4-1** baking schedules at 125 °C, 90 °C & 40 °C by carrier thermal rating |
| **AEC-Q100 Grade & Automotive Suffix Decoder** | https://www.partvane.com/tools/aec-q100-grade-decoder/<br>Example: [`?pn=TPS22965NQWDSGRQ1&g=g1`](https://www.partvane.com/tools/aec-q100-grade-decoder/?pn=TPS22965NQWDSGRQ1&g=g1) | Decode **AEC-Q100 Grades 0–4** (`-40..+150 °C`) and TI `-Q1` / `QW` wettable flanks, onsemi `NCV`/`SZ`, Nexperia `-Q100` & Microchip `-VAO` substitution traps |

---

## Features

1. **IC Date Code & Lot Marking Decoder (`decodeDateCode` / `decode_date_code`)**
   - **Parallel Numeric Decoding**: Evaluates 3-digit (`YWW`), 4-digit (`YYWW`, `WWYY`, `YYMM`), and 5-digit (`YYDDD` Julian ordinal day) markings without guessing a single answer when multiple interpretations are valid.
   - **Strict ISO 8601 Calendar Validation**: Computes exact Monday–Sunday date ranges for every valid ISO week, accounts for 52-week vs. 53-week ISO years (e.g., accepts `2053` for 2020, rejects `2153` for 2021), validates leap-year ordinal day `366` (including the 2000 leap vs. 1900 non-leap century edge case on `00366`), and rejects illegal weeks (`W00`, `W54+`) or ordinal days (`000`, `367+`).
   - **onsemi `AND8002/D` (Rev. 13) 12-Year Two-Letter Decoder**: Resolves small-package 2-letter date codes (e.g., `GJ`, `SL`, `WA`) across 12-year cycles while rejecting skipped first-position letters (`O` and `Q`).
   - **National Semiconductor (now TI) `SNOA039C` 6-Week Period Decoder**: Resolves the 9 legal six-week assembly period codes (`06`, `12`, `18`, `24`, `30`, `36`, `42`, `48`, `52`) used on `LM`/`LF`/`LMC`/`DS`/`ADC` families and flags the up-to-5-week understatement caused by naive `YYWW` readings.
2. **STM32 Ordering Part Number Decoder (`decodeStm32` / `decode_stm32`)**
   - Splits full or shorthand STM32 order codes (`STM32F103C8T6`, `STM32G030F6P6TR`, `STM32H743VIT6`, `STM32G564RET6QTR`) into **Family / Arm Core**, **Pin Count**, **Flash Size**, **Package**, **Temperature Range**, **Option Suffix**, and **Packing** (`TR` / `TT` / tray-or-tube).
   - Uses per-family ordering tables transcribed directly from 19 STMicroelectronics datasheets, catching family-specific overrides (such as SMPS pinout `Q`, BOR-disabled `D`, or junction vs. ambient temperature ratings on `STM32H7P`).

---

## Quick Start

### Command-Line Interface (CLI)

Clone this repository and run directly with either **Node.js (>= 18)** or **Python (>= 3.9)** — no `npm install` or `pip install` required:

```bash
# Decode an STM32 ordering code (auto-detected)
node ./bin/ic-stm32-decoder.js STM32G030F6P6TR
python3 -m ic_stm32_decoder STM32H743VIT6

# Decode a 4-digit IC date code (parallel YYWW / WWYY / YYMM + NSC 6-week check)
node ./bin/ic-stm32-decoder.js 0012
python3 -m ic_stm32_decoder 2410

# Decode a 5-digit Julian date code (YYDDD)
node ./bin/ic-stm32-decoder.js 24366

# Decode an onsemi AND8002/D 2-letter code or National Semi SNOA039C 6-week code
node ./bin/ic-stm32-decoder.js onsemi GJ
python3 -m ic_stm32_decoder nsc 9948 --century 1900

# Machine-readable JSON output for CI / BOM scripts
node ./bin/ic-stm32-decoder.js STM32F103C8T6 --json
python3 -m ic_stm32_decoder date 2243 --json
```

Example CLI output for `STM32G030F6P6TR`:

```text
Part Number: STM32G030F6P6TR
Status:      VALID (Verified: DS12991 Rev 6)
Family/Core: STM32G030 (Arm Cortex-M0+)
Datasheet:   DS12991 Rev 6 (https://www.st.com/resource/en/datasheet/stm32g030c8.pdf)
Summary:     20 pins, 32 KB flash, TSSOP, -40 to 85 °C ambient (105 °C junction), Tape and reel

Fields:
  - Device family      [STM32] : Arm-based 32-bit microcontroller (OK)
  - Product type       [G    ] : General-purpose (mainstream) (OK)
  - Device subfamily   [030  ] : STM32G030 (Arm Cortex-M0+) (OK)
  - Pin count          [F    ] : 20 pins (OK)
  - Flash memory       [6    ] : 32 KB (OK)
  - Package            [P    ] : TSSOP (OK)
  - Temperature range  [6    ] : -40 to 85 °C ambient (105 °C junction) (OK)
  - Packing            [TR   ] : Tape and reel (OK)
Web Link: https://www.partvane.com/tools/stm32-part-number-decoder/?pn=STM32G030F6P6TR
```

### Node.js / ES Module API

```javascript
import {
  decodeDateCode,
  decodeOnsemiTwoLetter,
  decodeNationalSixWeek,
  decodeStm32,
} from './src/index.js';

// 1. Parallel 4-digit IC date code decoding
const dc = decodeDateCode('2410', { century: 2000 });
console.log(dc.readings.map((r) => `${r.format}: ${r.startDate}..${r.endDate}`));
// -> [ 'YYWW: 2024-03-04..2024-03-10', 'WWYY: 2010-06-14..2010-06-20', 'YYMM: 2024-10-01..2024-10-31' ]

// 2. onsemi AND8002/D 2-letter lookup (12-year cycle)
const onsemi = decodeOnsemiTwoLetter('SL');
console.log(onsemi.workWeek, onsemi.cycleCandidates.map((c) => c.year));
// -> 12 [ 1998, 2010, 2022, 2034 ]

// 3. National Semiconductor SNOA039C 6-week period lookup
const nsc = decodeNationalSixWeek('0012');
console.log(nsc.weeksCovered, nsc.primaryCandidate);
// -> '12 - 17' { century: 2000, year: 2000, startWeek: 12, endWeek: 17, ... }

// 4. STM32 ordering part number decoding
const mcu = decodeStm32('STM32H743VIT6');
console.log(mcu.family.core, mcu.pinCount.value, mcu.flashSize.value, mcu.package.value);
// -> 'Arm Cortex-M7, 480 MHz' '100 pins' '2 MB' 'LQFP'
```

### Python 3 API

```python
from ic_stm32_decoder import (
    decode_date_code,
    decode_onsemi_two_letter,
    decode_national_six_week,
    decode_stm32,
)

dc = decode_date_code("24366", century=2000)
print(dc["readings"][0]["date"])  # '2024-12-31'

onsemi = decode_onsemi_two_letter("GJ")
print(onsemi["workWeek"], [c["year"] for c in onsemi["cycleCandidates"]])
# 10 [1993, 2005, 2017, 2029]

mcu = decode_stm32("STM32F103C8T6")
print(mcu["family"]["doc"], mcu["summary"])
# 'DS5319 Rev 20' '48 pins, 64 KB flash, LQFP, -40 to 85 °C ambient'
```

---

## Engineering Reference: IC Date Code Pitfalls in IQC & Aged-Stock Inspection

Four digits on an IC top marking never prove authenticity on their own, and reading every 4-digit code as plain `YYWW` causes both false rejections and missed remarking anomalies.

| Pitfall / Scenario | Example Marking | Naive `YYWW` Reading | Actual Meaning / Engineering Check |
|---|---|---|---|
| **`YYWW` vs. `WWYY` Ambiguity** | `2410` | 2024, Week 10 (`2024-03-04` to `03-10`) | Could equally be **Week 24 of 2010** (`WWYY`) or **Oct 2024** (`YYMM`). If a supplier quotes "2024+" on a long-EOL part and the chip reads `2410`, check whether the brand marks `WWYY` (making it 14-year-old 2010 stock). When one pair exceeds `53` (e.g., `2243` in 2026), `WWYY` gives future year `2043` and self-eliminates. |
| **Nonexistent ISO Week `53` / `54+`** | `2153` / `2254` | "Late 2021" / "Late 2022" | **2021 only had 52 ISO weeks** (`2020` and `2026` have 53). `W54+` never exists in ISO 8601. On remarked counterfeits, random digits frequently produce invalid week `53` in a 52-week year or `54–99` (unless the brand uses plant/lot digits in those positions). |
| **Non-Leap Julian Day `366`** | `23366` / `00366` | Day 366 of 2023 / 1900 | `2023` was not a leap year (max day `365`). `00366` is valid for **2000-12-31** (leap year) but invalid for **1900** (divisible by 100, not 400). |
| **National Semi 6-Week Period (`SNOA039C`)** | `0012` / `0014` | 2000, Week 12 / Week 14 | On legacy National parts (`LM`, `LF`, `LMC`, `DS`, `ADC`), week digits denote the **start of a 6-week assembly period** (`0012` = Weeks **12–17**, understating assembly date by up to 5 weeks). Only 9 codes (`06, 12, 18, 24, 30, 36, 42, 48, 52`) are legal — `0014` is **not** a National date code at all. |
| **Small-Package Topside Device Code Misread as Date** | 4-char SOT-23 top code | Misread as `YYWW` | Per `SNOA039C`, on SOT-23, SOT-223, SC70, and SC90 packages, the top 4 characters are **device type + ID + grade**, *not* a date code (the date code is a single character on the package underside). |
| **onsemi 12-Year Two-Letter Cycle (`AND8002/D`)** | `GJ` / `IA` | Cannot be read numerically | Repeats every **12 years**: `GJ` is Week 10 of **2005**, **2017**, and **2029**; `IA` is Week 1 of **2006**, **2018**, and **2030**. Critical when distinguishing 2-year-old stock from 14-year-old stock. |
| **Reel Label vs. Package Marking / PCN Mismatch** | Reel says `DC 2318`, chip says `1944` | Overlooked if only scanning barcode | Always cross-check: (1) outer reel/moisture-barrier bag label vs. actual chip top marking, and (2) date code vs. the manufacturer's PCN / EOL final-production date. |

> Interactive cross-checking with shareable links: **[Live IC Date Code Decoder](https://www.partvane.com/tools/date-code-decoder/)** · **[Manufacturer Date Code Formats](https://www.partvane.com/tools/date-code-formats/)**

---

## Reference Tables

### 1. onsemi Two-Letter Date Code Summary (`AND8002/D`, Rev. 13, Tables 3 & 4)

- **First letter** selects both the **year** and **half-year** (`Weeks 1–26` vs. `Weeks 27–52`). Only **24 letters** are used (`O` and `Q` are skipped), so the cycle repeats every **12 years** (`24 / 2 = 12`).
- **Second letter** (`A`–`Z`, all 26 letters) selects the week inside that half (`A` = 1st week of the half, `Z` = 26th week of the half).

| Cycle Years (12-Year Repeat) | Weeks 1–26 (H1) | Weeks 27–52 (H2) | Worked Example |
|---|---|---|---|
| 1994 · **2006** · **2018** · **2030** | `IA`–`IZ` | `JA`–`JZ` | `IA` = W01, `JZ` = W52 |
| 1995 · **2007** · **2019** | `KA`–`KZ` | `LA`–`LZ` | `KA` = W01, `LA` = W27 |
| 1996 · **2008** · **2020** | `MA`–`MZ` | `NA`–`NZ` | `MA` = W01, `NZ` = W52 |
| 1997 · **2009** · **2021** *(skips O, Q)* | `PA`–`PZ` | `RA`–`RZ` | `PA` = W01, `RA` = W27 |
| 1998 · **2010** · **2022** | `SA`–`SZ` | `TA`–`TZ` | `SL` = W12 (`AND8002/D` example) |
| 1999 · **2011** · **2023** | `UA`–`UZ` | `VA`–`VZ` | `UA` = W01, `VZ` = W52 |
| 2000 · **2012** · **2024** | `WA`–`WZ` | `XA`–`XZ` | `WA` = W01, `XZ` = W52 |
| 2001 · **2013** · **2025** | `YA`–`YZ` | `ZA`–`ZZ` | `YA` = W01, `ZZ` = W52 |
| 2002 · **2014** · **2026** | `AA`–`AZ` | `BA`–`BZ` | `AA` = W01, `BZ` = W52 |
| 2003 · **2015** · **2027** | `CA`–`CZ` | `DA`–`DZ` | `CA` = W01, `DZ` = W52 |
| 2004 · **2016** · **2028** | `EA`–`EZ` | `FA`–`FZ` | `EA` = W01, `FZ` = W52 |
| 2005 · **2017** · **2029** | `GA`–`GZ` | `HA`–`HZ` | `GJ` = W10 (`AND8002/D` example) |

### 2. National Semiconductor 6-Week Period Codes (`SNOA039C`, Tables 1–6)

| 2-Digit Period Code | 1-Digit Code | Calendar Weeks Covered | Notes |
|---|---|---|---|
| `52` | `9` | `52 – 5` | Wraps across year-end into Week 5 of the next year |
| `06` | `1` | `6 – 11` | e.g., `0006` covers Weeks 6–11 of 2000 |
| `12` | `2` | `12 – 17` | e.g., `0012` marks a part assembled in Week 14 of 2000 |
| `18` | `3` | `18 – 23` | 6-week window |
| `24` | `4` | `24 – 29` | 6-week window |
| `30` | `5` | `30 – 35` | e.g., `0130` marks a part assembled in Week 32 of 2001 |
| `36` | `6` | `36 – 41` | 6-week window |
| `42` | `7` | `42 – 47` | 6-week window |
| `48` | `8` | `48 – 51` | 4-week window before period `52` (`9948` = 1999 Weeks 48–51) |

---

### 3. STM32 Ordering Code Suffix Quick-Reference & Family Pitfalls

Positional anatomy (example `STM32F103C8T6TR`):

`STM32` (32-bit Arm MCU) + `F` (Product Type) + `103` (Subfamily) + `C` (Pin Count) + `8` (Flash Size) + `T` (Package) + `6` (Temperature Grade) + `TR` (Option / Packing).

| Field | Common Cross-Family Codes | Family-Specific Overrides & Substitution Pitfalls |
|---|---|---|
| **Pin Count** | `J`=8, `F`=20, `G`=28, `K`=32, `T`=36, `C`=48 (or 48/49), `R`=64, `V`=100, `Z`=144, `I`=176 | `H`=40 & `M`=80 on `STM32G5`; `Q`=128 on `STM32G5`/`H7P`; `O`=90 on `STM32F405/F407`; `A`=169 & `X`=240+25 balls on `STM32H742/H743`; `Y`=18 balls on `STM32G031`; `D`=12 pins on `STM32C011` |
| **Flash Size** | `4`=16 KB, `6`=32 KB, `8`=64 KB, `B`=128 KB, `C`=256 KB, `D`=384 KB, `E`=512 KB, `G`=1 MB, `I`=2 MB | Moving up in flash (e.g., `STM32F103CBT6` 128 KB replacing `C8T6` 64 KB) is usually drop-in safe; moving down requires checking binary size |
| **Package** | `T`=LQFP, `P`=TSSOP, `U`=UFQFPN/VFQFPN (QFN), `Y`=WLCSP, `M`=SO8N | `H` is BGA (`F103`), UFBGA (`F401/F411/F407`), or TFBGA (`H743/H7P/L051`); `I` vs `K` on `H743` selects **0.5 mm vs 0.65 mm UFBGA pitch**; `Z` on `G5`/`H7P` adds an **exposed pad** (`LQFP-EP`) |
| **Temperature** | `6` = -40 to 85 °C, `7` = -40 to 105 °C, `3` = -40 to 125 °C | Ambient on most families, **but `STM32H7P` (`DS15208`) specifies `6` and `3` as junction temperature (`Tj`)**, which is a stricter limit |
| **Option / Packing** | `TR` = Tape and reel; omitted = Tray or tube | `Q` on `STM32G5`/`STM32H7P` = **SMPS power pinout** (NOT pin-compatible with non-`Q`!); `D` on `STM32L051`/`L151` = **BOR disabled**; `A` on `H743` = 480 MHz VOS1 mission profile; `TT` on `F401` = WLCSP tape & reel (`PCN9547`) |

**Verified STMicroelectronics Datasheets Built Into `ic-stm32-decoder` (19 Tables):**
`STM32F030` (`DS9773 Rev 5`), `STM32F103x4/6` (`DocID15060 Rev 7`), `STM32F103x8/B` (`DS5319 Rev 20`), `STM32F103xC/D/E` (`DS5792 Rev 13`), `STM32F401xB/C` (`DS9716 Rev 11`), `STM32F401xD/E` (`DS10086 Rev 5`), `STM32F411` (`DS10314 Rev 8`), `STM32F405/F407` (`DS8626 Rev 12`), `STM32G030` (`DS12991 Rev 6`), `STM32G031` (`DS12992 Rev 4`), `STM32G070` (`DS12766 Rev 3`), `STM32G563/G564` (`DS14920 Rev 1`), `STM32G553/G554` (`DS15237 Rev 1`), `STM32H7P4/H7P5` (`DS15208 Rev 1`), `STM32H742/H743` (`DS12110 Rev 11`), `STM32L051` (`DS10184 Rev 10`), `STM32L151/L152-A` (`DocID024330 Rev 5`), `STM32L431` (`DS11453 Rev 3`), and `STM32C011` (`DS13866 Rev 5`).

> Interactive field-by-field lookup: **[Live STM32 Part Number Decoder](https://www.partvane.com/tools/stm32-part-number-decoder/)**

---

## Running Unit Tests

Both test suites use built-in standard test runners (`node:test` and Python `unittest`) with cross-language JSON parity assertions:

```bash
# Run Node.js test suite
npm test

# Run Python 3 test suite (includes Node <-> Python JSON parity tests)
npm run test:py

# Run both suites
npm run test:all
```

---

## 中文说明（Chinese Guide）

`ic-stm32-decoder` 是一个**零外部依赖、Node.js (ES Module) 与 Python 3 双语言 100% 对齐**的元器件工程开源工具包，适用于硬件工程师选型、BOM 尾缀核对以及 IQC 来料批次（Date Code）检验。

### 核心能力

1. **IC 日期码与原厂批次码解析（`decodeDateCode` / `decode_date_code`）**
   - **3/4/5 位数字日期码并行解析**：同时计算 `YWW`、`YYWW`、`WWYY`、`YYMM`、`YYDDD`（儒略日/年积日）及供应商报价记法 `YY+` 的全部合法读法、ISO 8601 日历周起止日期（周一至周日）以及 `19xx` / `20xx` 世纪候选，不武断输出唯一答案；严格拦截 `W54`、平年 `366` 天、无第 53 周的年份（如 `2153`）等非法日期码。
   - **onsemi（安森美）`AND8002/D` 12 年循环双字母日期码**：内置原厂 Rev. 13 规则（首字母跳过 `O` 与 `Q`，24 个字母每半年一进位，12 年一循环，如 `GJ` 同时对应 2005 / 2017 / 2029 年第 10 周），帮助采购与品控识别呆滞老料周期重叠。
   - **National Semiconductor（美国国家半导体 / TI）`SNOA039C` 6 周周期码**：内置 `LM`/`LF`/`LMC`/`DS`/`ADC` 系列仅有的 9 个合法双位周期码（`06, 12, 18, 24, 30, 36, 42, 48, 52`），提示按普通 `YYWW` 误读会低估最多 5 周生产时间，并预警 SOT-23/SC70 顶面 4 字符为器件识别码而非日期码。
2. **STM32 订货料号尾缀解码（`decodeStm32` / `decode_stm32`）**
   - 严格对齐 19 份 ST 官方数据手册 `Ordering information` 原表，支持输入 `STM32F103C8T6`、`STM32G030F6P6TR`、`STM32H743VIT6` 等料号，精确输出系列/内核（Arm Cortex）、引脚数、Flash 容量、封装、温度等级、特殊功能尾缀（如 `Q` SMPS 电源引脚、`D` 关闭 BOR）及包装方式（`TR` 编带 / 托盘管装）。

### 免登录在线交互版

- **在线芯片丝印与 SMD 顶标反查器（194 条原厂丝印）**：https://www.partvane.com/tools/ic-marking-decoder/
- **在线 IC 料号替代与 Pin-to-Pin 陷阱核对器（32 组对照）**：https://www.partvane.com/tools/cross-reference/
- **在线 IC 日期码解码器**：https://www.partvane.com/tools/date-code-decoder/
- **原厂特殊日期码格式速查表（onsemi & National Semi）**：https://www.partvane.com/tools/date-code-formats/
- **在线 STM32 料号尾缀解码器**：https://www.partvane.com/tools/stm32-part-number-decoder/
- **IC 潮敏等级 MSL 烘烤时间计算器（J-STD-020 / J-STD-033）**：https://www.partvane.com/tools/msl-calculator/
- **AEC-Q100 车规等级与后缀解码器**：https://www.partvane.com/tools/aec-q100-grade-decoder/

---

## Disclaimer & License

- **Disclaimer**: Calendar ranges and decoded fields are engineering references transcribed from public manufacturer documentation (`onsemi AND8002/D Rev. 13`, `National Semiconductor SNOA039C`, and the cited STMicroelectronics datasheets). Always verify critical ratings, pinouts, and marking diagrams against the latest official manufacturer document. **A plausible date code or valid-looking ordering code never authenticates a semiconductor device.** PartVane is an independent electronic component distributor and is not an authorized distributor of the manufacturers referenced herein; all product names and trademarks belong to their respective owners.
- **License**: Released under the [MIT License](./LICENSE).

## Obsolete & NRND Industrial Migration Guides

- [Discontinued PLCC & Through-Hole PDIP Industrial ICs Sourcing Guide (DAC7724NB, TLC2543IFN, MC33153PG, MC34152PG, TPIC6B595N)](https://www.partvane.com/obsolete/plcc-pdip-discontinued-industrial-ics/)
- [MCP2551 NRND Replacement Guide: Pin 5 VREF vs SPLIT vs VIO Traps Across MCP2561, MCP2562, TCAN1057A & NCV7356](https://www.partvane.com/blog/mcp2551-vs-mcp2561-vs-tcan1057a-can-replacement/)
- [Industrial NRND & Obsolete Tube Guide: TI TLK110PT EtherCAT PHY, DS90CR286 LVDS, ISO7240CDW & UC2846DWTR](https://www.partvane.com/blog/tlk110pt-nrnd-industrial-ethernet-lvds-sourcing/)
