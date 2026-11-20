"""Zero-dependency STM32 Ordering Part Number Decoder (Python 3).

Every family ordering table below is strictly aligned with the verified STMicroelectronics
datasheet "Ordering information" tables maintained in PartVane's STM32 decoder dataset.
"""

from __future__ import annotations

import re
from typing import Any
from urllib.parse import quote

T6_AMBIENT = {
    "6": "-40 to 85 °C ambient",
    "7": "-40 to 105 °C ambient",
    "3": "-40 to 125 °C ambient",
}

STM32_FAMILIES: list[dict[str, Any]] = [
    {
        "keyPattern": re.compile(r"^F030$"),
        "name": "STM32F030 value line (Arm Cortex-M0)",
        "core": "Arm Cortex-M0",
        "doc": "DS9773 Rev 5",
        "url": "https://www.st.com/resource/en/datasheet/stm32f030f4.pdf",
        "pin": {"F": "20 pins", "K": "32 pins", "C": "48 pins", "R": "64 pins"},
        "fl": {"4": "16 KB", "6": "32 KB", "8": "64 KB", "C": "256 KB"},
        "pk": {"P": "TSSOP", "T": "LQFP"},
        "tp": {"6": "-40 to 85 °C ambient"},
    },
    {
        "keyPattern": re.compile(r"^F103$"),
        "flashPattern": re.compile(r"^[46]$"),
        "name": "STM32F103 performance line, low-density (Arm Cortex-M3)",
        "core": "Arm Cortex-M3",
        "doc": "DocID15060 Rev 7",
        "url": "https://www.st.com/resource/en/datasheet/stm32f103c6.pdf",
        "pin": {"T": "36 pins", "C": "48 pins", "R": "64 pins"},
        "fl": {"4": "16 KB", "6": "32 KB"},
        "pk": {"H": "BGA", "T": "LQFP", "U": "VFQFPN or UFQFPN"},
        "tp": {"6": T6_AMBIENT["6"], "7": T6_AMBIENT["7"]},
        "op": {"A": 'internal code "A"'},
    },
    {
        "keyPattern": re.compile(r"^F103$"),
        "flashPattern": re.compile(r"^[8B]$"),
        "name": "STM32F103 performance line, medium-density (Arm Cortex-M3)",
        "core": "Arm Cortex-M3",
        "doc": "DS5319 Rev 20",
        "url": "https://www.st.com/resource/en/datasheet/stm32f103c8.pdf",
        "pin": {"T": "36 pins", "C": "48 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"8": "64 KB", "B": "128 KB"},
        "pk": {"H": "BGA", "I": "UFBGA", "T": "LQFP", "U": "VFQFPN or UFQFPN"},
        "tp": {"6": T6_AMBIENT["6"], "7": T6_AMBIENT["7"]},
        "op": {"R": "customer dedicated code"},
    },
    {
        "keyPattern": re.compile(r"^F103$"),
        "flashPattern": re.compile(r"^[CDE]$"),
        "name": "STM32F103 performance line, high-density (Arm Cortex-M3)",
        "core": "Arm Cortex-M3",
        "doc": "DS5792 Rev 13",
        "url": "https://www.st.com/resource/en/datasheet/stm32f103rc.pdf",
        "pin": {"R": "64 pins", "V": "100 pins", "Z": "144 pins"},
        "fl": {"C": "256 KB", "D": "384 KB", "E": "512 KB"},
        "pk": {"H": "BGA", "T": "LQFP", "Y": "WLCSP64"},
        "tp": {"6": T6_AMBIENT["6"], "7": T6_AMBIENT["7"]},
    },
    {
        "keyPattern": re.compile(r"^F401$"),
        "flashPattern": re.compile(r"^[BC]$"),
        "name": "STM32F401 (Arm Cortex-M4 with FPU)",
        "core": "Arm Cortex-M4 with FPU",
        "doc": "DS9716 Rev 11",
        "url": "https://www.st.com/resource/en/datasheet/stm32f401cc.pdf",
        "pin": {"C": "48/49 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"B": "128 KB", "C": "256 KB"},
        "pk": {"H": "UFBGA", "T": "LQFP", "U": "UFQFPN", "Y": "WLCSP"},
        "tp": T6_AMBIENT,
    },
    {
        "keyPattern": re.compile(r"^F401$"),
        "flashPattern": re.compile(r"^[DE]$"),
        "name": "STM32F401 (Arm Cortex-M4 with FPU)",
        "core": "Arm Cortex-M4 with FPU",
        "doc": "DS10086 Rev 5",
        "url": "https://www.st.com/resource/en/datasheet/stm32f401re.pdf",
        "pin": {"C": "48/49 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"D": "384 KB", "E": "512 KB"},
        "pk": {"H": "UFBGA", "T": "LQFP", "U": "UFQFPN", "Y": "WLCSP"},
        "tp": {"6": T6_AMBIENT["6"]},
    },
    {
        "keyPattern": re.compile(r"^F411$"),
        "name": "STM32F411 (Arm Cortex-M4 with FPU)",
        "core": "Arm Cortex-M4 with FPU",
        "doc": "DS10314 Rev 8",
        "url": "https://www.st.com/resource/en/datasheet/stm32f411ce.pdf",
        "pin": {"C": "48/49 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"C": "256 KB", "E": "512 KB"},
        "pk": {"H": "UFBGA", "T": "LQFP", "U": "UFQFPN", "Y": "WLCSP"},
        "tp": T6_AMBIENT,
    },
    {
        "keyPattern": re.compile(r"^F40[57]$"),
        "name": "STM32F405/F407 (Arm Cortex-M4 with FPU)",
        "core": "Arm Cortex-M4 with FPU",
        "doc": "DS8626 Rev 12",
        "url": "https://www.st.com/resource/en/datasheet/stm32f405rg.pdf",
        "sub": {
            "405": "connectivity line",
            "407": "connectivity line with camera interface and Ethernet",
        },
        "pin": {"R": "64 pins", "O": "90 pins", "V": "100 pins", "Z": "144 pins", "I": "176 pins"},
        "fl": {"E": "512 KB", "G": "1024 KB"},
        "pk": {"T": "LQFP", "H": "UFBGA", "Y": "WLCSP"},
        "tp": {"6": T6_AMBIENT["6"], "7": T6_AMBIENT["7"]},
    },
    {
        "keyPattern": re.compile(r"^G030$"),
        "name": "STM32G030 (Arm Cortex-M0+)",
        "core": "Arm Cortex-M0+",
        "doc": "DS12991 Rev 6",
        "url": "https://www.st.com/resource/en/datasheet/stm32g030c8.pdf",
        "pin": {"J": "8 pins", "F": "20 pins", "K": "32 pins", "C": "48 pins"},
        "fl": {"6": "32 KB", "8": "64 KB"},
        "pk": {"T": "LQFP", "P": "TSSOP", "M": "SO8N"},
        "tp": {"6": "-40 to 85 °C ambient (105 °C junction)"},
    },
    {
        "keyPattern": re.compile(r"^G031$"),
        "name": "STM32G031 (Arm Cortex-M0+)",
        "core": "Arm Cortex-M0+",
        "doc": "DS12992 Rev 4",
        "url": "https://www.st.com/resource/en/datasheet/stm32g031g8.pdf",
        "pin": {"J": "8 pins", "Y": "18 balls (WLCSP18)", "F": "20 pins", "G": "28 pins", "K": "32 pins", "C": "48 pins"},
        "fl": {"4": "16 KB", "6": "32 KB", "8": "64 KB"},
        "pk": {"T": "LQFP", "U": "UFQFPN", "Y": "WLCSP", "P": "TSSOP", "M": "SO8N"},
        "tp": {
            "6": "-40 to 85 °C ambient (105 °C junction)",
            "7": "-40 to 105 °C ambient (125 °C junction)",
            "3": "-40 to 125 °C ambient (130 °C junction)",
        },
    },
    {
        "keyPattern": re.compile(r"^G070$"),
        "name": "STM32G070 (Arm Cortex-M0+)",
        "core": "Arm Cortex-M0+",
        "doc": "DS12766 Rev 3",
        "url": "https://www.st.com/resource/en/datasheet/stm32g070cb.pdf",
        "pin": {"K": "32 pins", "C": "48 pins", "R": "64 pins"},
        "fl": {"B": "128 KB"},
        "pk": {"T": "LQFP"},
        "tp": {"6": "-40 to 85 °C ambient (105 °C junction)"},
    },
    {
        "keyPattern": re.compile(r"^G56[34]$"),
        "name": "STM32G56x mixed-signal, with cryptography (Arm Cortex-M33)",
        "core": "Arm Cortex-M33",
        "doc": "DS14920 Rev 1",
        "url": "https://www.st.com/resource/en/datasheet/stm32g564re.pdf",
        "sub": {
            "564": "STM32G564, with high-resolution timer (HRTIM)",
            "563": "STM32G563, without HRTIM",
        },
        "pin": {"H": "40 pins", "C": "48 pins", "R": "64 pins", "M": "80 pins", "V": "100 pins", "P": "121 balls", "Q": "128 pins"},
        "fl": {"B": "128 KB", "C": "256 KB", "E": "512 KB"},
        "pk": {"I": "UFBGA", "T": "LQFP", "Z": "TQFP-EP / LQFP-EP (exposed pad)", "U": "UFQFPN"},
        "tp": {
            "7": "-40 to 105 °C ambient (140 °C junction)",
            "6": "-40 to 85 °C ambient (140 °C junction)",
            "3": "-40 to 125 °C ambient (140 °C junction)",
        },
        "op": {"Q": "dedicated pinout supporting the SMPS step-down converter"},
    },
    {
        "keyPattern": re.compile(r"^G55[34]$"),
        "name": "STM32G55x mixed-signal, no AES crypto (Arm Cortex-M33)",
        "core": "Arm Cortex-M33",
        "doc": "DS15237 Rev 1",
        "url": "https://www.st.com/resource/en/datasheet/stm32g554re.pdf",
        "sub": {
            "554": "STM32G554, with high-resolution timer (HRTIM)",
            "553": "STM32G553, without HRTIM",
        },
        "pin": {"H": "40 pins", "C": "48 pins", "R": "64 pins", "M": "80 pins", "V": "100 pins", "P": "121 balls", "Q": "128 pins"},
        "fl": {"B": "128 KB", "C": "256 KB", "E": "512 KB"},
        "pk": {"I": "UFBGA", "T": "LQFP", "Z": "TQFP-EP / LQFP-EP (exposed pad)", "U": "UFQFPN"},
        "tp": {
            "7": "-40 to 105 °C ambient (140 °C junction)",
            "6": "-40 to 85 °C ambient (140 °C junction)",
            "3": "-40 to 125 °C ambient (140 °C junction)",
        },
        "op": {"Q": "dedicated pinout supporting the SMPS step-down converter"},
    },
    {
        "keyPattern": re.compile(r"^H7P[45]$"),
        "name": "STM32H7P (Arm Cortex-M7, 520 MHz)",
        "core": "Arm Cortex-M7, 520 MHz",
        "doc": "DS15208 Rev 1 (prerelease)",
        "url": "https://www.st.com/resource/en/datasheet/stm32h7p5vi.pdf",
        "sub": {
            "7P4": "with hardware signal processor (HSP)",
            "7P5": "with Neural-ART Accelerator NPU and HSP",
        },
        "pin": {"I": "176 pins", "Z": "144 pins", "Q": "128 pins", "V": "100 pins"},
        "fl": {"I": "2048 KB", "G": "1024 KB"},
        "pk": {"T": "LQFP", "K": "UFBGA", "H": "TFBGA", "Z": "LQFP with exposed pad"},
        "tp": {
            "3": "-40 °C < Tj < +125 °C (junction)",
            "6": "-40 °C < Tj < +85 °C (junction)",
        },
        "op": {"Q": "SMPS version"},
    },
    {
        "keyPattern": re.compile(r"^H74[23]$"),
        "name": "STM32H742/H743 (Arm Cortex-M7, 480 MHz)",
        "core": "Arm Cortex-M7, 480 MHz",
        "doc": "DS12110 Rev 11",
        "url": "https://www.st.com/resource/en/datasheet/stm32h743vi.pdf",
        "pin": {
            "V": "100 pins",
            "Z": "144 pins",
            "A": "169 balls",
            "I": "176 pins / 176+25 balls",
            "B": "208 pins",
            "X": "240+25 balls",
        },
        "fl": {"G": "1 MB", "I": "2 MB"},
        "pk": {"T": "LQFP", "K": "UFBGA, 0.65 mm pitch", "I": "UFBGA, 0.5 mm pitch", "H": "TFBGA"},
        "tp": {"6": "-40 to 85 °C"},
        "op": {"A": "advanced mission profile (VOS1, 480 MHz)"},
    },
    {
        "keyPattern": re.compile(r"^L051$"),
        "name": "STM32L051 ultra-low-power access line (Arm Cortex-M0+)",
        "core": "Arm Cortex-M0+",
        "doc": "DS10184 Rev 10",
        "url": "https://www.st.com/resource/en/datasheet/stm32l051c8.pdf",
        "pin": {"K": "32 pins", "T": "36 pins", "C": "48/49 pins", "R": "64 pins"},
        "fl": {"6": "32 KB", "8": "64 KB"},
        "pk": {"T": "LQFP", "H": "TFBGA", "U": "UFQFPN", "Y": "WLCSP (standard)", "F": "WLCSP (thin)"},
        "tp": T6_AMBIENT,
        "op": {"D": "VDD 1.65 to 3.6 V with BOR disabled"},
    },
    {
        "keyPattern": re.compile(r"^L15[12]$"),
        "name": 'STM32L151/L152 ultra-low-power, Cat. 1/2 "A" devices (Arm Cortex-M3)',
        "core": "Arm Cortex-M3",
        "doc": "DocID024330 Rev 5",
        "url": "https://www.st.com/resource/en/datasheet/stm32l151c8-a.pdf",
        "sub": {"151": "without LCD", "152": "with LCD"},
        "pin": {"C": "48 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"6": "32 KB", "8": "64 KB", "B": "128 KB"},
        "pk": {"H": "BGA", "T": "LQFP", "U": "UFQFPN"},
        "tp": {"6": T6_AMBIENT["6"], "7": T6_AMBIENT["7"]},
        "op": {
            "A": "device generation A",
            "D": "VDD 1.65 to 3.6 V with BOR disabled",
            "AD": "device generation A; VDD 1.65 to 3.6 V with BOR disabled",
        },
    },
    {
        "keyPattern": re.compile(r"^L431$"),
        "name": "STM32L431 ultra-low-power (Arm Cortex-M4 with FPU)",
        "core": "Arm Cortex-M4 with FPU",
        "doc": "DS11453 Rev 3",
        "url": "https://www.st.com/resource/en/datasheet/stm32l431cc.pdf",
        "pin": {"K": "32 pins", "C": "48 pins", "R": "64 pins", "V": "100 pins"},
        "fl": {"B": "128 KB", "C": "256 KB"},
        "pk": {"T": "LQFP", "U": "QFN", "I": "UFBGA", "Y": "CSP"},
        "tp": {
            "6": "-40 to 85 °C ambient (105 °C junction)",
            "7": "-40 to 105 °C ambient (125 °C junction)",
            "3": "-40 to 125 °C ambient (130 °C junction)",
        },
    },
    {
        "keyPattern": re.compile(r"^C011$"),
        "name": "STM32C011 (Arm Cortex-M0+)",
        "core": "Arm Cortex-M0+",
        "doc": "DS13866 Rev 5",
        "url": "https://www.st.com/resource/en/datasheet/stm32c011f6.pdf",
        "pin": {"J": "8 pins", "D": "12 pins", "F": "20 pins"},
        "fl": {"4": "16 KB", "6": "32 KB"},
        "pk": {"U": "UFQFPN", "Y": "WLCSP", "P": "TSSOP", "M": "SO8N"},
        "tp": {
            "6": "-40 to 85 °C ambient (105 °C junction)",
            "7": "-40 to 105 °C ambient (125 °C junction)",
            "3": "-40 to 125 °C ambient (130 °C junction)",
        },
    },
]

STM32_GENERIC_TABLE: dict[str, dict[str, str]] = {
    "pin": {
        "J": "8 pins",
        "F": "20 pins",
        "G": "28 pins",
        "K": "32 pins",
        "T": "36 pins",
        "C": "48 pins (48/49 in some families)",
        "R": "64 pins",
        "V": "100 pins",
        "Z": "144 pins",
        "I": "176 pins",
    },
    "fl": {
        "4": "16 KB",
        "6": "32 KB",
        "8": "64 KB",
        "B": "128 KB",
        "C": "256 KB",
        "D": "384 KB",
        "E": "512 KB",
        "G": "1024 KB",
        "I": "2048 KB",
    },
    "pk": {
        "T": "LQFP",
        "P": "TSSOP",
        "U": "UFQFPN / VFQFPN (QFN)",
        "Y": "WLCSP",
        "H": "BGA (TFBGA or UFBGA, varies by family)",
    },
    "tp": T6_AMBIENT,
}

STM32_PRODUCT_TYPES: dict[str, str] = {
    "F": "General-purpose (mainstream / performance)",
    "G": "General-purpose (mainstream)",
    "L": "Low-power / ultra-low-power",
    "H": "High performance",
    "U": "Ultra-low-power",
    "C": "General-purpose (entry level)",
}


def clean_stm32_input(raw: str) -> str:
    return re.sub(r"[\s\-_./]", "", str(raw or "").upper())


def decode_stm32(raw: str) -> dict[str, Any]:
    s = clean_stm32_input(raw)
    result: dict[str, Any] = {
        "input": s,
        "ok": False,
        "verified": False,
        "family": None,
        "productType": None,
        "subfamily": None,
        "pinCount": None,
        "flashSize": None,
        "package": None,
        "temperatureRange": None,
        "option": None,
        "packing": None,
        "fields": [],
        "notes": [],
        "summary": "",
        "shareUrl": "",
    }

    if not s:
        result["err"] = "empty"
        return result
    if s.startswith("STM8"):
        result["err"] = "STM8 is ST's 8-bit family and uses a different ordering scheme. This tool decodes STM32 codes only."
        return result
    if re.match(r"^STM32(W|MP|N|A)", s):
        result["err"] = (
            "STM32W (wireless), STM32MP, STM32N and STM32A codes use a different field layout. "
            "Open the ordering information section of that device's datasheet."
        )
        return result
    if not s.startswith("STM32"):
        if re.match(r"^[FGLHUC]\d", s):
            s = "STM32" + s
            result["input"] = s
        else:
            result["err"] = 'An STM32 order code starts with "STM32", for example STM32F103C8T6.'
            return result

    m = re.match(r"^STM32([FGLHUC])(\d[0-9A-Z]{2})([A-Z])?([0-9A-Z])?([A-Z])?([0-9])?([A-Z0-9]*)$", s)
    if not m:
        result["err"] = "This does not follow the STM32 + type + subfamily + pins + flash + package + temperature pattern. Check for a typo."
        return result

    ty, sub, pin, fl, pk, tp, rest = m.groups()
    rest = rest or ""
    key = ty + sub

    fam = None
    key_has_density_split = False
    for entry in STM32_FAMILIES:
        if entry["keyPattern"].match(key):
            if "flashPattern" in entry:
                key_has_density_split = True
            if "flashPattern" not in entry or (fl and entry["flashPattern"].match(fl)):
                fam = entry
                break

    if fam is None and not fl:
        for entry in STM32_FAMILIES:
            if entry["keyPattern"].match(key) and "flashPattern" in entry:
                fam = entry
                result["notes"].append(
                    "Flash code missing, so the exact datasheet cannot be chosen; showing the first matching table."
                )
                break

    tab = fam or STM32_GENERIC_TABLE
    result["verified"] = fam is not None
    result["family"] = (
        {
            "name": fam["name"],
            "core": fam["core"],
            "doc": fam["doc"],
            "url": fam["url"],
        }
        if fam
        else None
    )

    if fam is None:
        if key_has_density_split and fl:
            result["notes"].append(
                f'Flash code "{fl}" does not match any verified STM32{key} density datasheet table; showing generic fallback codes.'
            )
        else:
            result["notes"].append(
                f"STM32{key} is not in this tool's verified list. The reading below uses only the codes that mean the same in every datasheet checked; confirm with the ordering information in the device datasheet."
            )

    result["fields"].append(
        {
            "c": "STM32",
            "f": "Device family",
            "v": "Arm-based 32-bit microcontroller",
            "st": "ok",
        }
    )

    type_val = STM32_PRODUCT_TYPES.get(ty, "Unknown")
    type_st = "ok" if ty in STM32_PRODUCT_TYPES else "bad"
    result["productType"] = {"code": ty, "value": type_val, "status": type_st}
    result["fields"].append({"c": ty, "f": "Product type", "v": type_val, "st": type_st})

    sub_val = (
        fam["sub"][sub]
        if fam and "sub" in fam and sub in fam["sub"]
        else (fam["name"] if fam else f"Subfamily STM32{key} (not in verified list)")
    )
    sub_st = "ok" if fam else "warn"
    result["subfamily"] = {"code": sub, "value": sub_val, "status": sub_st}
    result["fields"].append({"c": sub, "f": "Device subfamily", "v": sub_val, "st": sub_st})

    def add_field(code: str | None, label: str, mapping: dict[str, str]) -> dict[str, Any]:
        if not code:
            result["fields"].append({"c": "-", "f": label, "v": "Not given", "st": "miss"})
            return {"code": None, "value": "Not given", "status": "miss"}
        val = mapping.get(code)
        st = ("ok" if fam else "warn") if val else "bad"
        text = val or f'Code "{code}" is not defined for this family'
        result["fields"].append({"c": code, "f": label, "v": text, "st": st})
        return {"code": code, "value": text, "status": st}

    result["pinCount"] = add_field(pin, "Pin count", tab["pin"])
    result["flashSize"] = add_field(fl, "Flash memory", tab["fl"])
    result["package"] = add_field(pk, "Package", tab["pk"])
    result["temperatureRange"] = add_field(tp, "Temperature range", tab["tp"])

    if rest:
        tr = ""
        if rest.endswith("TR"):
            tr = "TR"
            rest = rest[:-2]
        elif rest.endswith("TT") and key == "F401":
            tr = "TT"
            rest = rest[:-2]

        if rest:
            ov = fam.get("op", {}).get(rest) if fam else None
            opt_val = ov or (
                "Not defined in this datasheet's ordering table (may be a die revision, internal or programmed-part code; check ST marking documents)"
            )
            opt_st = "ok" if ov else "warn"
            result["option"] = {"code": rest, "value": opt_val, "status": opt_st}
            result["fields"].append({"c": rest, "f": "Option", "v": opt_val, "st": opt_st})

        if tr:
            pack_val = "Tape and reel" if tr == "TR" else "Tape and reel for WLCSP (PCN9547)"
            result["packing"] = {"code": tr, "value": pack_val, "status": "ok"}
            result["fields"].append({"c": tr, "f": "Packing", "v": pack_val, "st": "ok"})
        else:
            result["packing"] = {"code": "", "value": "Tray or tube (default when TR is omitted)", "status": "default"}
    else:
        result["packing"] = {"code": "", "value": "Tray or tube (default when TR is omitted)", "status": "default"}

    result["ok"] = all(x["st"] != "bad" for x in result["fields"])

    summary_parts = []
    if pin and pin in tab["pin"]:
        summary_parts.append(tab["pin"][pin])
    if fl and fl in tab["fl"]:
        summary_parts.append(f"{tab['fl'][fl]} flash")
    if pk and pk in tab["pk"]:
        summary_parts.append(tab["pk"][pk])
    if tp and tp in tab["tp"]:
        summary_parts.append(tab["tp"][tp])
    if result["packing"] and result["packing"]["code"]:
        summary_parts.append(result["packing"]["value"])

    result["summary"] = ", ".join(summary_parts)
    result["shareUrl"] = f"https://www.partvane.com/tools/stm32-part-number-decoder/?pn={quote(result['input'], safe='')}"
    return result
