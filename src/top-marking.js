export const VERIFIED_TOP_MARKINGS = [
  {
    "mark": "ZAKX",
    "mpn": "TPL5010DDCR",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DDC)",
    "kind": "Cryptic SMD",
    "src": "TI SNAS650 packaging addendum",
    "trap": "Marking ZAKX bears zero resemblance to TPL5010; verify pin-1 dot and SOT-23-Thin 6-pin body.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tpl5010ddcr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tpl5010.pdf"
  },
  {
    "mark": "PTSI",
    "mpn": "TPS62130RGTR / TPS62130RGTT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-16 (RGT, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSAG7 packaging addendum",
    "trap": "Adjustable output; PG pulls low when EN=Low. Do not mix with PA6I (TPS62130A, PG high-Z when EN=Low). MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps62130rgtr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps62130.pdf"
  },
  {
    "mark": "PA6I",
    "mpn": "TPS62130ARGTR / TPS62130ARGTT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-16 (RGT, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSAG7 packaging addendum",
    "trap": "A-variant of TPS62130 (PG stays high-impedance when EN=Low); plain TPS62130RGTR is marked PTSI.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps62130rgtr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps62130.pdf"
  },
  {
    "mark": "QVX",
    "mpn": "TPS62131RGTR / TPS62131RGTT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-16 (RGT, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSAG7 packaging addendum",
    "trap": "Fixed 1.8 V output variant of TPS62130 family (QVY = 2.5 V TPS62132, QVZ = 3.3 V TPS62133, PTSI = adjustable).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps62130rgtr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps62130.pdf"
  },
  {
    "mark": "QVY",
    "mpn": "TPS62132RGTR / TPS62132RGTT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-16 (RGT, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSAG7 packaging addendum",
    "trap": "Fixed 2.5 V output variant of TPS62130 family; do not place on adjustable PTSI feedback-divider boards.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps62130rgtr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps62130.pdf"
  },
  {
    "mark": "QVZ",
    "mpn": "TPS62133RGTR / TPS62133RGTT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-16 (RGT, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSAG7 packaging addendum",
    "trap": "Fixed 3.3 V output variant of TPS62130 family; adjustable TPS62130RGTR is marked PTSI.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps62130rgtr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps62130.pdf"
  },
  {
    "mark": "AVW",
    "mpn": "TPS3808G01DBVR",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SBVS050 packaging table",
    "trap": "Adjustable 0.405 V threshold voltage supervisor; fixed-threshold G33/G50 trims carry different 3-letter SOT-23-6 codes.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3808g01dbvr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3808.pdf"
  },
  {
    "mark": "12MV",
    "mpn": "OPA197IDBVR",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-5 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SBOS737 orderable addendum",
    "trap": "36 V rail-to-rail CMOS op amp in 5-pin SOT-23; verify 5-pin DBV pin order against SOIC-8.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/opa197idbvr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/opa197.pdf"
  },
  {
    "mark": "AJNN",
    "mpn": "MCP4725A0T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "First two letters set factory I2C address bits: AJ = A0 (00), AP = A1 (01), AQ = A2 (10), AR = A3 (11); last two characters (NN) are Microchip's alphanumeric traceability code.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf",
    "pat": "^AJ[A-Z0-9]{2}$"
  },
  {
    "mark": "APNN",
    "mpn": "MCP4725A1T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A1 (AP + 2-char trace code). Will NACK firmware written for A0 (AJNN) if A0 pin is tied the same way.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf",
    "pat": "^AP[A-Z0-9]{2}$"
  },
  {
    "mark": "AQNN",
    "mpn": "MCP4725A2T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A2 (AQ + 2-char trace code); not firmware drop-in for A0 (AJNN) without changing I2C target address.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf",
    "pat": "^AQ[A-Z0-9]{2}$"
  },
  {
    "mark": "ARNN",
    "mpn": "MCP4725A3T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A3 (AR + 2-char trace code) in SOT-23-6.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf",
    "pat": "^AR[A-Z0-9]{2}$"
  },
  {
    "mark": "1M3Q",
    "mpn": "LMR43610MSC3RPERQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-9 (RPE, 2x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBE0H addendum (Oct 2025)",
    "trap": "36 V, 1 A AEC-Q100 fixed 3.3 V buck, spread spectrum, Pin 1 = MODE/SYNC. 2M3Q is the 2 A LMR43620MSC3RPERQ1; 1R3Q changes Pin 1 to RT!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmr43610msc3rperq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmr43610-q1.pdf"
  },
  {
    "mark": "2M3Q",
    "mpn": "LMR43620MSC3RPERQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-9 (RPE, 2x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBE0H addendum (Oct 2025)",
    "trap": "36 V, 2 A AEC-Q100 fixed 3.3 V buck, spread spectrum, Pin 1 = MODE/SYNC (2C3Q omits spread spectrum; 2R3Q changes Pin 1 to RT). MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmr43610msc3rperq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmr43610-q1.pdf"
  },
  {
    "mark": "1R3Q",
    "mpn": "LMR43610RS3QRPERQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-9 (RPE, 2x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBE0H Table 4-1",
    "trap": "Hardware pin trap: on 1R3Q/2R3Q, Pin 1 is RT (resistor-set frequency), whereas on 1M3Q/2M3Q Pin 1 is MODE/SYNC logic input.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmr43610msc3rperq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmr43610-q1.pdf"
  },
  {
    "mark": "Q6146Q / AAS",
    "mpn": "LMQ61460AASQRJRRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-14 (RJR, 4x3.5 mm)",
    "kind": "Two-line SMD",
    "src": "TI SNVSBP4D addendum (Oct 2025)",
    "trap": "Second line AAS = Auto PFM/PWM mode (7 uA typ sleep IQ on 12 V battery). Do NOT accept Q6146Q / AFS (Forced PWM, drains battery in sleep)!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmq61460aasqrjrrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmq61460-q1.pdf"
  },
  {
    "mark": "Q6146Q / AFS",
    "mpn": "LMQ61460AFSQRJRRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-14 (RJR, 4x3.5 mm)",
    "kind": "Two-line SMD",
    "src": "TI SNVSBP4D Table 4-1",
    "trap": "Second line AFS = continuous Forced PWM at light load; shares first line Q6146Q with AAS Auto-PFM variant.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmq61460aasqrjrrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmq61460-q1.pdf"
  },
  {
    "mark": "240A1E",
    "mpn": "INA240A1EDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS776 addendum (Nov 2025)",
    "trap": "A1 = 20 V/V gain, E = AEC-Q100 Grade 0 (-40 to +150 °C), MSL 2. 240A1Q is Grade 1 (-40 to +125 °C); 240A2E / 240A2Q are 50 V/V gain!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ina240a1edrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ina240-q1.pdf"
  },
  {
    "mark": "240A2E",
    "mpn": "INA240A2EDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS776 addendum (Nov 2025)",
    "trap": "A2 = 50 V/V gain, E = AEC-Q100 Grade 0 (-40 to +150 °C). Not gain-compatible with 240A1E (20 V/V).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ina240a1edrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ina240-q1.pdf"
  },
  {
    "mark": "240A1Q",
    "mpn": "INA240A1QDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS776 addendum (Nov 2025)",
    "trap": "A1 = 20 V/V gain, Q = AEC-Q100 Grade 1 (-40 to +125 °C); cannot substitute for E-grade (240A1E) above 125 °C.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ina240a1edrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ina240-q1.pdf"
  },
  {
    "mark": "240A2Q",
    "mpn": "INA240A2QDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS776 addendum (Nov 2025)",
    "trap": "A2 = 50 V/V gain, Q = AEC-Q100 Grade 1 (-40 to +125 °C).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ina240a1edrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ina240-q1.pdf"
  },
  {
    "mark": "1057AV",
    "mpn": "TCAN1057AVDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SLLSEW9 addendum (Apr 2026)",
    "trap": "V suffix puts 1.7-5.5 V VIO level-shifter supply on Pin 5 (leaving Pin 5 floating locks out TXD/RXD). Non-V 1057A has Pin 5 = NC!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tcan1057avdrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tcan1057a-q1.pdf"
  },
  {
    "mark": "2HFF",
    "mpn": "TCAN1057AVDDFRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-8 (DDF)",
    "kind": "Cryptic SMD",
    "src": "TI SLLSEW9 addendum (Apr 2026)",
    "trap": "SOT-23-8 package variant of TCAN1057AV-Q1 (SOIC-8 is marked 1057AV).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tcan1057avdrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tcan1057a-q1.pdf"
  },
  {
    "mark": "1042V",
    "mpn": "TCAN1042HGVDR / TCAN1042HVDR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SLLSES7 packaging table",
    "trap": "1042V confirms Pin 8 = VIO level shifter, whereas plain 1042 is shared by 2 Mbps TCAN1042HDR and 5 Mbps TCAN1042HGDR—check reel label!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tcan1042hgvdr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tcan1042hgv.pdf"
  },
  {
    "mark": "VP230",
    "mpn": "SN65HVD230DR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Cryptic SMD",
    "src": "TI SLOS346O family table",
    "trap": "3.3 V CAN transceiver with listen-only standby (370 uA). VP231 = SN65HVD231 (40 nA sleep, receiver off); VP232 = SN65HVD232 (no RS/Vref).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/sn65hvd230dr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf"
  },
  {
    "mark": "VP231",
    "mpn": "SN65HVD231DR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Cryptic SMD",
    "src": "TI SLOS346O family table",
    "trap": "Sleep-mode 3.3 V CAN transceiver (receiver turns off in sleep, cannot bus-wake like VP230 / SN65HVD230).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/sn65hvd231dr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf"
  },
  {
    "mark": "M747",
    "mpn": "LM74700QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Truncated MPN",
    "src": "TI SBVS367 packaging table",
    "trap": "6-pin SOT-23 automotive ideal diode controller; the 8-pin SOT-23-8 DDF variant is marked 747F.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm74700qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm74700-q1.pdf"
  },
  {
    "mark": "7721",
    "mpn": "ISO7721DR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D, narrow)",
    "kind": "Truncated MPN",
    "src": "TI SLLSEU1 packaging table",
    "trap": "Default-HIGH fail-safe digital isolator in narrow SOIC-8; 7721F is default-LOW fail-safe, and DW-16 wide body marks ISO7721.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/iso7721dr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/iso7721.pdf"
  },
  {
    "mark": "AMC3330Q",
    "mpn": "AMC3330QDWERQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-16 wide (DWE)",
    "kind": "Truncated MPN",
    "src": "TI SBAS998 addendum (Feb 2026)",
    "trap": "Automotive isolated amplifier with integrated DC/DC; MSL Level 3 (168-hour floor life—check humidity indicator card!).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/amc3330qdwerq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/amc3330-q1.pdf"
  },
  {
    "mark": "AMC1301",
    "mpn": "AMC1301DWVR / AMC1301DWVRG4",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 wide (DWV)",
    "kind": "Truncated MPN",
    "src": "TI SBAS695 packaging table",
    "trap": "Both -40..125 °C and -55..125 °C order codes carry AMC1301 top mark; MSL Level 3 (168 hours).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/amc1301dwvr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/amc1301.pdf"
  },
  {
    "mark": "BQ27 441A",
    "mpn": "BQ27441DRZR-G1A",
    "mfr": "Texas Instruments",
    "pkg": "SON-12 (DRZ, 2.5x4 mm)",
    "kind": "Two-line SMD",
    "src": "TI SLUSBH1 packaging table",
    "trap": "G1A is for 4.2 V max LiCoO2 chemistry; G1B (4.30/4.35 V chemistry) is a distinct fuel-gauge profile.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/bq27441drzr-g1a/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/bq27441-g1.pdf"
  },
  {
    "mark": "70",
    "mpn": "TUSB320IRWBR",
    "mfr": "Texas Instruments",
    "pkg": "X2QFN-12 (RWB, 1.6x1.6 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLLSEN9F packaging table",
    "trap": "Industrial -40 to +85 °C USB Type-C CC controller; commercial 0 to +70 °C TUSB320RWBR in the identical 1.6x1.6 mm X2QFN is marked 20!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tusb320irwbr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tusb320.pdf"
  },
  {
    "mark": "20",
    "mpn": "TUSB320RWBR",
    "mfr": "Texas Instruments",
    "pkg": "X2QFN-12 (RWB, 1.6x1.6 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLLSEN9F packaging table",
    "trap": "Commercial 0 to +70 °C grade of TUSB320; fails industrial cold-chamber qualification where marking 70 (TUSB320I) is required.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tusb320irwbr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tusb320.pdf"
  },
  {
    "mark": "3070",
    "mpn": "TPS63070RNMR / TPS63070RNMT",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-15 (RNM)",
    "kind": "Truncated MPN",
    "src": "TI SLVSC58B packaging addendum",
    "trap": "Adjustable 2-16 V buck-boost converter; fixed-output siblings mark 0701 (TPS630701) and 0702 (TPS630702).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps63070rnmr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps63070.pdf"
  },
  {
    "mark": "05L",
    "mpn": "DRV2605LDGSR / DRV2605LDGST",
    "mfr": "Texas Instruments",
    "pkg": "VSSOP-10 (DGS)",
    "kind": "Cryptic SMD",
    "src": "TI SLOS854D packaging addendum",
    "trap": "VSSOP-10 LRA/ERM haptic driver marks 05L (9-ball DSBGA marks 2605L); check non-L DRV2605 supply range if replacing.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/drv2605ldgsr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/drv2605l.pdf"
  },
  {
    "mark": "LMK61E2",
    "mpn": "LMK61E2-SIAR",
    "mfr": "Texas Instruments",
    "pkg": "QFM-8 (SIA, 7x5 mm)",
    "kind": "Two-line SMD",
    "src": "TI SNAS674C (May 2025)",
    "trap": "Plain LMK61E2 boots at 156.25 MHz LVPECL; LMK61E2 BAA boots at 156.25 MHz LVDS and LMK61E2 BBA at 125 MHz LVDS. MSL 3.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmk61e2-siar/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmk61e2.pdf"
  },
  {
    "mark": "UCC21520",
    "mpn": "UCC21520DWR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-16 wide (DW)",
    "kind": "Truncated MPN",
    "src": "TI SLUSCJ9 packaging table",
    "trap": "8 V UVLO version (9.2-25 V VDDA/B); UCC21520A is the 5 V UVLO version—do not swap on 5 V gate-drive rails! MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ucc21520dwr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ucc21520.pdf"
  },
  {
    "mark": "PCM5102A",
    "mpn": "PCM5102APWR",
    "mfr": "Texas Instruments",
    "pkg": "TSSOP-20 (PW)",
    "kind": "Truncated MPN",
    "src": "TI SLAS764 packaging table",
    "trap": "Commercial -25 to +85 °C audio DAC; -40 to +125 °C requires automotive PCM5102AQPWRQ1.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/pcm5102apwr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/pcm5102a.pdf"
  },
  {
    "mark": "12",
    "mpn": "TPS51200DRCR",
    "mfr": "Texas Instruments",
    "pkg": "VSON-10 (DRC, 3x3 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLUS812 orderable addendum",
    "trap": "DDR VTT sink/source termination regulator in 3x3 mm VSON-10; 2-digit code '12' requires matching 10-pin exposed-pad DRC outline.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps51200drcr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps51200.pdf"
  },
  {
    "mark": "4302",
    "mpn": "TPS54302DDCR",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-THIN-6 (DDC)",
    "kind": "Truncated MPN",
    "src": "TI SLVSD66 orderable addendum",
    "trap": "28 V, 3 A synchronous buck in SOT-23-6; TPS54202DDCR (2 A) sits in the identical 6-pin DDC footprint.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps54302ddcr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps54302.pdf"
  },
  {
    "mark": "O2140A",
    "mpn": "OPA2140AIDR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS498 orderable addendum",
    "trap": "Precision JFET dual op amp; leading 'O' replaces 'OPA' on narrow SOIC-8.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/opa2140aidr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/opa2140.pdf"
  },
  {
    "mark": "O2333A",
    "mpn": "OPA2333AIDR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SBOS351 orderable addendum",
    "trap": "Zero-drift CMOS dual op amp in SOIC-8.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/opa2333aidr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/opa2333.pdf"
  },
  {
    "mark": "L2904B",
    "mpn": "LM2904BIDR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SLOS068AB addendum",
    "trap": "36 V, -40 to +125 °C B-die dual op amp; legacy 26 V LM2904DR marks LM2904, and -40 to +85 °C LM358BIDR marks LM358B.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm2904bidr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm358b.pdf"
  },
  {
    "mark": "LM393B",
    "mpn": "LM393BIDR",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SLCS005AH addendum",
    "trap": "36 V, -40 to +85 °C B-generation dual comparator; commercial 0 to +70 °C LM393DR marks LM393.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm393bidr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm393b.pdf"
  },
  {
    "mark": "UL26",
    "mpn": "USBLC6-2SC6",
    "mfr": "STMicroelectronics",
    "pkg": "SOT23-6L",
    "kind": "Cryptic SMD",
    "src": "ST DS4260 Rev 7 Table 6",
    "trap": "Two-line USB 2.0 ESD array + VBUS clamp; marking may be rotated 90° to indicate assembly plant. Four-line USBLC6-4SC6 marks UL46!",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/usblc6-2sc6/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/usblc6-2.pdf"
  },
  {
    "mark": "UL46",
    "mpn": "USBLC6-4SC6",
    "mfr": "STMicroelectronics",
    "pkg": "SOT23-6L",
    "kind": "Cryptic SMD",
    "src": "ST DocID11068 Rev 7 Table 4",
    "trap": "Four-line ESD protection in identical SOT23-6L body as UL26 (USBLC6-2SC6)—different internal diode routing!",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/usblc6-4sc6/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/usblc6-4.pdf"
  },
  {
    "mark": "EL24",
    "mpn": "ESDCAN24-2BLY",
    "mfr": "STMicroelectronics",
    "pkg": "SOT23-3L (TO-236)",
    "kind": "Cryptic SMD",
    "src": "ST DS11111 Rev 4 Table 5",
    "trap": "AEC-Q101 24 V dual-line CAN/LIN TVS (43 V max clamp). EN24 = ESDCAN01-2BLY, EC24 = ESDCAN04-2BLY, EC35 = ESDCAN06-2BLY.",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/esdcan24-2bly/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/esdcan24-2bl.pdf"
  },
  {
    "mark": "P75NF75",
    "mpn": "STP75NF75 / STP75NF75FP",
    "mfr": "STMicroelectronics",
    "pkg": "TO-220 / TO-220FP",
    "kind": "Shared Marking",
    "src": "ST STP75NF75 Rev 8",
    "trap": "Shared-marking trap: bare-metal-tab TO-220 (300 W) and plastic-isolated TO-220FP carry the EXACT same P75NF75 stamp—inspect tab in photos!",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/stp75nf75/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/stp75nf75.pdf"
  },
  {
    "mark": "3NF06L",
    "mpn": "STN3NF06L",
    "mfr": "STMicroelectronics",
    "pkg": "SOT-223",
    "kind": "Truncated MPN",
    "src": "ST DocID7798 Rev 9",
    "trap": "60 V logic-level N-channel MOSFET in SOT-223 (drops ST prefix).",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/stn3nf06l/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/stn3nf06l.pdf"
  },
  {
    "mark": "6N95K5",
    "mpn": "STD6N95K5",
    "mfr": "STMicroelectronics",
    "pkg": "DPAK (TO-252)",
    "kind": "Truncated MPN",
    "src": "ST DS6666 Rev 6",
    "trap": "950 V SuperMESH5 MOSFET in DPAK (drops STD package prefix).",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/std6n95k5/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/std6n95k5.pdf"
  },
  {
    "mark": "110N10F7",
    "mpn": "STL110N10F7",
    "mfr": "STMicroelectronics",
    "pkg": "PowerFLAT 5x6",
    "kind": "Truncated MPN",
    "src": "ST DS9392 Rev 6",
    "trap": "100 V STripFET F7 MOSFET in PowerFLAT 5x6 (siblings mark 90N10F7 and 130N6F7).",
    "pageUrl": "https://www.partvane.com/parts/stmicroelectronics/stl110n10f7/",
    "datasheetUrl": "https://www.st.com/resource/en/datasheet/stl110n10f7.pdf"
  },
  {
    "mark": "S4",
    "mpn": "SS34",
    "mfr": "Vishay General Semiconductor",
    "pkg": "SMC (DO-214AB)",
    "kind": "Cryptic SMD",
    "src": "Vishay 88751 datasheet",
    "trap": "3 A, 40 V Schottky rectifier in wide SMC (DO-214AB); verify body width because S4 also appears on smaller SMA/SMB parts from other makers.",
    "pageUrl": "https://www.partvane.com/parts/vishay/ss34/",
    "datasheetUrl": "https://www.vishay.com/docs/88751/ss32.pdf"
  },
  {
    "mark": "SFH617A-3",
    "mpn": "SFH617A-3X007T",
    "mfr": "Vishay Semiconductors",
    "pkg": "SMD-4 (Option 7)",
    "kind": "Shared Marking",
    "src": "Vishay 83740 marking diagram",
    "trap": "CTR group -3 is marked, whereas SMD lead-bend option X007 and T reel suffix are NOT marked; VDE logo appears only on X001 safety options.",
    "pageUrl": "https://www.partvane.com/parts/vishay-semiconductors/sfh617a-3x007t/",
    "datasheetUrl": "https://www.vishay.com/docs/83740/sfh617a.pdf"
  },
  {
    "mark": "23 / 1B",
    "mpn": "1N5231B / 1N5231BTR",
    "mfr": "onsemi",
    "pkg": "DO-35 axial (CASE 017AG)",
    "kind": "Two-line SMD",
    "src": "onsemi 1N5221B/D Rev 5",
    "trap": "5.1 V ±5% 500 mW Zener diode: prints prefix '23' over device code '1B' rather than spelling out 1N5231B.",
    "pageUrl": "https://www.partvane.com/parts/onsemi/1n5231b/",
    "datasheetUrl": "https://www.onsemi.com/download/data-sheet/pdf/1n5221b-d.pdf"
  },
  {
    "mark": "BR",
    "mpn": "2SB709A-R",
    "mfr": "Panasonic",
    "pkg": "SOT-23 / Mini3",
    "kind": "Cryptic SMD",
    "src": "Panasonic 2SB709A hFE rank table",
    "trap": "PNP transistor hFE rank code: BQ = -Q (160-260), BR = -R (210-340), BS = -S (290-460). Bands overlap, so multimeter hFE alone cannot separate Q and R!",
    "pageUrl": "https://www.partvane.com/obsolete/panasonic-2sb709a-hfe-rank/",
    "datasheetUrl": ""
  },
  {
    "mark": "MB10S",
    "mpn": "MB10S-13",
    "mfr": "Diodes Incorporated",
    "pkg": "MBS (4-pin bridge)",
    "kind": "Truncated MPN",
    "src": "Diodes Inc. MB10S datasheet",
    "trap": "Accompanied by a 3-char YMD date code where months Oct/Nov/Dec are letters O/N/D—an 'O' in month position means October, not year 2000!",
    "pageUrl": "https://www.partvane.com/parts/diodes-incorporated/mb10s/",
    "datasheetUrl": "https://www.diodes.com/assets/Datasheets/MB10S.pdf"
  },
  {
    "mark": "3MC5Q",
    "mpn": "LMQ66430MC5RXBRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-FCRLF-14 (RXB, 2.6x2.6 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBV1F addendum (May 2026)",
    "trap": "36 V, 3 A, 5 V fixed/adj, 2.2 MHz MINT 2 buck. 3MC3Q = 3.3 V; 3MA5Q = 400 kHz; 2MC5Q = 2 A; 1MC5Q = 1 A.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmq66430mc5rxbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmq66430-q1.pdf"
  },
  {
    "mark": "3MC3Q",
    "mpn": "LMQ66430MC3RXBRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-FCRLF-14 (RXB, 2.6x2.6 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBV1F addendum (May 2026)",
    "trap": "36 V, 3 A, 3.3 V fixed/adj trim of LMQ66430-Q1 (5.0 V trim marks 3MC5Q).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmq66430mc5rxbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmq66430-q1.pdf"
  },
  {
    "mark": "3MA5Q",
    "mpn": "LMQ66430MA5RXBRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-FCRLF-14 (RXB, 2.6x2.6 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSBV1F addendum (May 2026)",
    "trap": "400 kHz switching trim of 3 A, 5 V LMQ66430-Q1 (2.2 MHz trim marks 3MC5Q).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lmq66430mc5rxbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lmq66430-q1.pdf"
  },
  {
    "mark": "CVR",
    "mpn": "LM5155QDSSRQ1 / LM5155QDSSTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-12 WF (DSS0012C, 3x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSAY4F addendum (Nov 2025)",
    "trap": "Wettable-flank, hiccup-disabled boost controller (MSL 2, Sn). 1CW enables hiccup (LM51551); 5155QU is non-wettable-flank (MSL 1)!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm5155qdssrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm5155-q1.pdf"
  },
  {
    "mark": "1CW",
    "mpn": "LM51551QDSSRQ1 / LM51551QDSSTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-12 WF (DSS0012C, 3x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SNVSAY4F addendum (Nov 2025)",
    "trap": "Hiccup-mode overload protection ENABLED (wettable-flank WSON-12). Plain LM5155QDSSRQ1 (CVR) disables hiccup!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm5155qdssrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm5155-q1.pdf"
  },
  {
    "mark": "5155QU",
    "mpn": "LM5155QUDSSRQ1 / LM5155QUDSSTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-12 Non-WF (DSS0012B, 3x2 mm)",
    "kind": "Truncated MPN",
    "src": "TI SNVSAY4F addendum (Nov 2025)",
    "trap": "Non-wettable-flank DSS0012B (MSL 1, NIPDAU); wettable-flank DSS0012C marks CVR (MSL 2, Sn).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm5155qdssrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm5155-q1.pdf"
  },
  {
    "mark": "1551QU",
    "mpn": "LM51551QUDSSRQ1 / LM51551QUDSSTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-12 Non-WF (DSS0012B, 3x2 mm)",
    "kind": "Truncated MPN",
    "src": "TI SNVSAY4F addendum (Nov 2025)",
    "trap": "Non-wettable-flank hiccup-enabled LM51551-Q1 (MSL 1); wettable-flank version marks 1CW.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm5155qdssrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm5155-q1.pdf"
  },
  {
    "mark": "L5109Q",
    "mpn": "LM5109BQNGTRQ1 / LM5109BQNGTTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-8 (NGT, 4x4 mm)",
    "kind": "Truncated MPN",
    "src": "TI SNVSAG6A addendum (Nov 2025)",
    "trap": "AEC-Q100 90 V, 1 A half-bridge gate driver in WSON-8 (MSL 1, Sn finish).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm5109bqngtrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm5109b-q1.pdf"
  },
  {
    "mark": "M74202Q",
    "mpn": "LM74202QPWPRQ1",
    "mfr": "Texas Instruments",
    "pkg": "HTSSOP-16 (PWP)",
    "kind": "Truncated MPN",
    "src": "TI SLVSFD0 addendum (Nov 2025)",
    "trap": "40 V, 2.2 A integrated ideal diode/eFuse; MSL Level 3 (168-hour floor life—verify dry-pack).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lm74202qpwprq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lm74202-q1.pdf"
  },
  {
    "mark": "1HB08F",
    "mpn": "TPS1HB08FQPWPRQ1",
    "mfr": "Texas Instruments",
    "pkg": "HTSSOP-16 (PWP)",
    "kind": "Truncated MPN",
    "src": "TI SLVSE16E addendum (Sep 2026)",
    "trap": "8 mOhm, 94 A fixed ILIM, Pin 5 = FLT fault output. Do NOT swap with 1HB08A/B (Pin 5 = ILIM) or 16 mOhm 1HB16AQ!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps1hb08fqpwprq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps1hb08-q1.pdf"
  },
  {
    "mark": "1HB08A",
    "mpn": "TPS1HB08AQPWPRQ1",
    "mfr": "Texas Instruments",
    "pkg": "HTSSOP-16 (PWP)",
    "kind": "Truncated MPN",
    "src": "TI SLVSE16E addendum (Sep 2026)",
    "trap": "8 mOhm Version A (6.4-32 A ILIM resistor on Pin 5; 1HB08B is 14-70 A; 1HB08F is 94 A fixed with Pin 5 = FLT).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps1hb08fqpwprq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps1hb08-q1.pdf"
  },
  {
    "mark": "1HB16AQ",
    "mpn": "TPS1HB16AQPWPRQ1",
    "mfr": "Texas Instruments",
    "pkg": "HTSSOP-16 (PWP)",
    "kind": "Truncated MPN",
    "src": "TI SLVSE17B addendum (Feb 2026)",
    "trap": "16 mOhm Version A (4.4-22 A ILIM, VOUT on Pins 6-8 only); 1HB08F is 8 mOhm with VOUT on Pins 6-11.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps1hb08fqpwprq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps1hb16-q1.pdf"
  },
  {
    "mark": "3S713AQ",
    "mpn": "TPD3S713AQRVCRQ1",
    "mfr": "Texas Instruments",
    "pkg": "WQFN-20 (RVC, 3x4 mm)",
    "kind": "Truncated MPN",
    "src": "TI SLUSDH1B addendum (Nov 2025)",
    "trap": "A-suffix USB 2.0 18 V short-to-battery protector; earlier non-A TPD3S713QRVCRQ1 marks 3S713Q (different FAULT/OVP behavior).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tpd3s713aqrvcrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tpd3s713-q1.pdf"
  },
  {
    "mark": "3S713Q",
    "mpn": "TPD3S713QRVCRQ1",
    "mfr": "Texas Instruments",
    "pkg": "WQFN-20 (RVC, 3x4 mm)",
    "kind": "Truncated MPN",
    "src": "TI SLUSDH1B addendum (Nov 2025)",
    "trap": "Base non-A variant of TPD3S713-Q1 (A-variant marks 3S713AQ).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tpd3s713aqrvcrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tpd3s713-q1.pdf"
  },
  {
    "mark": "1ONC",
    "mpn": "REF3433QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SBAS901C addendum (Nov 2025)",
    "trap": "3.3 V REF34-Q1 in SOT-23-6 (EN + Kelvin Force/Sense): 1OLC = 2.5 V, 1OMC = 3.0 V, 1OOC = 4.096 V, 1OPC = 5.0 V. Not pin-compatible with REF35 (34EI)!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref3433qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref34-q1.pdf"
  },
  {
    "mark": "2D8C",
    "mpn": "REF3433SQDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-5 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SBAS901C addendum (Nov 2025)",
    "trap": "5-pin SOT-23 3.3 V REF34S (no EN or Force/Sense pins); 6-pin REF3433QDBVRQ1 marks 1ONC.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref3433qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref34-q1.pdf"
  },
  {
    "mark": "2FV3",
    "mpn": "REF3433QDGKRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VSSOP-8 (DGK)",
    "kind": "Cryptic SMD",
    "src": "TI SBAS901C addendum (Nov 2025)",
    "trap": "8-pin VSSOP 3.3 V REF34-Q1 (2E93 = 2.5 V, 2FW3 = 3.0 V, 2FQ3 = 4.096 V, 2FX3 = 5.0 V).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref3433qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref34-q1.pdf"
  },
  {
    "mark": "34EI",
    "mpn": "REF35330QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SNAS845 addendum (Nov 2025)",
    "trap": "3.3 V nanopower (650 nA) REF35-Q1 (34AI = 1.8 V, 34CI = 2.5 V, 34DI = 3.0 V, 34FI = 5.0 V). Pin 5 is NR cap, max VIN 6 V (NOT REF34 1ONC)!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref35330qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref35-q1.pdf"
  },
  {
    "mark": "34AI",
    "mpn": "REF35180QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SNAS845 addendum (Nov 2025)",
    "trap": "1.8 V nanopower REF35-Q1 (34BI = 1.25 V, 34EI = 3.3 V, 34FI = 5.0 V).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref35330qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref35-q1.pdf"
  },
  {
    "mark": "34CI",
    "mpn": "REF35250QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SNAS845 addendum (Nov 2025)",
    "trap": "2.5 V nanopower REF35-Q1 in SOT-23-6 (34EI is 3.3 V).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ref35330qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ref35-q1.pdf"
  },
  {
    "mark": "P1753T",
    "mpn": "PCM1753TDBQRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SSOP-16 (DBQ)",
    "kind": "Truncated MPN",
    "src": "TI SLES254D addendum (Nov 2025)",
    "trap": "3-wire SPI-controlled 24-bit 192 kHz stereo DAC (MSL 3); P1754Q is hardware-controlled PCM1754TDBQRQ1 (Pins 13-15 differ!).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/pcm1753tdbqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/pcm1753-q1.pdf"
  },
  {
    "mark": "P1754Q",
    "mpn": "PCM1754TDBQRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SSOP-16 (DBQ)",
    "kind": "Truncated MPN",
    "src": "TI SLES254D addendum (Nov 2025)",
    "trap": "Hardware-controlled sibling of P1753T (Pins 12-15 are TEST/DEMP/MUTE/FMT instead of ZEROL/MD/MC/ML).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/pcm1753tdbqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/pcm1753-q1.pdf"
  },
  {
    "mark": "UB935",
    "mpn": "DS90UB935TRHBRQ1 / DS90UB935TRHBTQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-32 (RHB, 5x5 mm)",
    "kind": "Truncated MPN",
    "src": "TI SNLS605C addendum (Oct 2025)",
    "trap": "3 Gbps FPD-Link III CSI-2 serializer; 1.8 V core & PDB (NOT 3.3 V tolerant), MSL 3 (168 hours).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ds90ub935trhbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ds90ub935-q1.pdf"
  },
  {
    "mark": "6507",
    "mpn": "SN6507DGQR",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP-10 (DGQ, 3x3 mm)",
    "kind": "Truncated MPN",
    "src": "TI SLLSFM0A addendum (Nov 2025)",
    "trap": "36 V, 0.5 A push-pull transformer driver with duty-cycle control (catalog -55..125 C; verify reel label vs automotive SN6507-Q1).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/sn6507dgqr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn6507.pdf"
  },
  {
    "mark": "34W5",
    "mpn": "SN74LVC1G17QDBVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-5 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SCES663E addendum (Oct 2026)",
    "trap": "One of four authorized TI markings for SN74LVC1G17QDBVRQ1 (34W5, 3NQH, 3VRF, C17O); SC70-5 DCK marks C7J/C7O, SON-6 DRY marks HM.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/sn74lvc1g17qdbvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn74lvc1g17-q1.pdf"
  },
  {
    "mark": "HCS74Q",
    "mpn": "SN74HCS74QDYYRQ1 / QDRQ1 / QPWRQ1 / QBQARQ1",
    "mfr": "Texas Instruments",
    "pkg": "DYY / SOIC-14 / TSSOP-14 / WQFN-14",
    "kind": "Shared Marking",
    "src": "TI SCES894E addendum (Oct 2026)",
    "trap": "Shared-marking trap: DYY SOT-23-THIN (2.0x4.2 mm), SOIC-14 D (8.7x3.9 mm), TSSOP-14 PW (5.0x4.4 mm) and WQFN-14 BQA (3.0x2.5 mm) ALL print HCS74Q!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/sn74hcs74qdyyrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn74hcs74-q1.pdf"
  },
  {
    "mark": "AX8T245Q",
    "mpn": "CAXC8T245QRHLRQ1 / CAXC8T245QWRGYRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-24 (RHL / WRGY)",
    "kind": "Shared Marking",
    "src": "TI SCES892D addendum (Jan 2026)",
    "trap": "SN74AXC8T245-Q1 automotive 8-bit transceiver: non-wettable RHL (MSL 1, 1000/reel) and wettable-flank WRGY (MSL 2, 3000/reel) share AX8T245Q!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/caxc8t245qrhlrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn74axc8t245-q1.pdf"
  },
  {
    "mark": "1HM",
    "mpn": "CAXC2T245QRSWRQ1",
    "mfr": "Texas Instruments",
    "pkg": "UQFN-10 (RSW, 1.8x1.4 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SCES908A addendum (Nov 2025)",
    "trap": "Automotive 2-bit dual-supply transceiver SN74AXC2T245-Q1 (order code CAXC2T245QRSWRQ1) in 10-pin UQFN; MSL 1.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/caxc8t245qrhlrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/sn74axc2t245-q1.pdf"
  },
  {
    "mark": "AM2632C",
    "mpn": "AM2632COKFHMZCZRQ1",
    "mfr": "Texas Instruments",
    "pkg": "NFBGA-324 (ZCZ, 15x15 mm)",
    "kind": "Shared Marking",
    "src": "TI SPRSP74F addendum (Nov 2026)",
    "trap": "Silicon Rev SR 1.1 Sitara R5F MCU: line-1 AM2632C is shared across -40..105 C industrial (HAZCZR) and -40..150 C Q1 (HMZCZRQ1) spins. MSL 3.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/am2632cokfhmzczrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/am2632-q1.pdf"
  },
  {
    "mark": "7B8401",
    "mpn": "TPS7B8401QWDRBRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VSON-8 WF (DRB, 3x3 mm)",
    "kind": "Truncated MPN",
    "src": "TI SBVS361C addendum (Sep 2026)",
    "trap": "Adjustable 1.2-18 V 150 mA 40 V LDO (Pin 2 = FB). Fixed 3.3 V marks 7B8433 and fixed 5.0 V marks 7B8450 (Pin 2 = NC). MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps7b8401qwdrbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps7b84-q1.pdf"
  },
  {
    "mark": "7B8433",
    "mpn": "TPS7B8433QWDRBRQ1 / TPS7B8433QDCYRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VSON-8 (DRB) / SOT-223-4 (DCY)",
    "kind": "Truncated MPN",
    "src": "TI SBVS361C addendum (Sep 2026)",
    "trap": "Fixed 3.3 V 150 mA 40 V LDO; do not mount on adjustable 7B8401 feedback-divider boards.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps7b8401qwdrbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps7b84-q1.pdf"
  },
  {
    "mark": "7B8450",
    "mpn": "TPS7B8450QWDRBRQ1 / TPS7B8450QDCYRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VSON-8 (DRB) / SOT-223-4 (DCY)",
    "kind": "Truncated MPN",
    "src": "TI SBVS361C addendum (Sep 2026)",
    "trap": "Fixed 5.0 V 150 mA 40 V LDO; adjustable version in DRB-8 is marked 7B8401.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps7b8401qwdrbrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps7b84-q1.pdf"
  },
  {
    "mark": "7B8750",
    "mpn": "TPS7B8750QDDARQ1 / TPS7B8750QKVURQ1",
    "mfr": "Texas Instruments",
    "pkg": "HSOIC-8 (DDA) / TO-252-5 (KVU)",
    "kind": "Shared Marking",
    "src": "TI SBVS363B addendum (Dec 2025)",
    "trap": "Fixed 5.0 V 500 mA 40 V LDO with PG: DDA-8 is MSL 2 whereas TO-252-5 KVU is MSL 3 (168 hr); 3.3 V sibling marks 7B8733.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps7b8750qddarq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps7b87-q1.pdf"
  },
  {
    "mark": "7B8733",
    "mpn": "TPS7B8733QDDARQ1 / TPS7B8733QKVURQ1",
    "mfr": "Texas Instruments",
    "pkg": "HSOIC-8 (DDA) / TO-252-5 (KVU)",
    "kind": "Shared Marking",
    "src": "TI SBVS363B addendum (Dec 2025)",
    "trap": "Fixed 3.3 V 500 mA 40 V LDO with PG (5.0 V TPS7B8750 marks 7B8750).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps7b8750qddarq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps7b87-q1.pdf"
  },
  {
    "mark": "15OX",
    "mpn": "TPS92515QDGQRQ1 / TPS92515QDGQTQ1",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP-10 PowerPAD (DGQ)",
    "kind": "Cryptic SMD",
    "src": "TI SLUSBZ6A addendum (Nov 2025)",
    "trap": "42 V AEC-Q100 2 A buck LED driver. 15NX = commercial non-Q1 (42 V), 15PX = commercial 65 V HV, 15QX = AEC-Q100 65 V HV! MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps92515qdgqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps92515-q1.pdf"
  },
  {
    "mark": "15QX",
    "mpn": "TPS92515HVQDGQRQ1 / TPS92515HVQDGQTQ1",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP-10 PowerPAD (DGQ)",
    "kind": "Cryptic SMD",
    "src": "TI SLUSBZ6A addendum (Nov 2025)",
    "trap": "65 V AEC-Q100 HV version of TPS92515-Q1 (42 V automotive TPS92515QDGQRQ1 is marked 15OX).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps92515qdgqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps92515-q1.pdf"
  },
  {
    "mark": "15NX",
    "mpn": "TPS92515DGQR / TPS92515DGQT",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP-10 PowerPAD (DGQ)",
    "kind": "Cryptic SMD",
    "src": "TI SLUSBZ6A addendum (Nov 2025)",
    "trap": "Commercial non-automotive 42 V TPS92515—reject if BOM requires AEC-Q100 Grade 1 TPS92515QDGQRQ1 (15OX)!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps92515qdgqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps92515-q1.pdf"
  },
  {
    "mark": "15PX",
    "mpn": "TPS92515HVDGQR / TPS92515HVDGQT",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP-10 PowerPAD (DGQ)",
    "kind": "Cryptic SMD",
    "src": "TI SLUSBZ6A addendum (Nov 2025)",
    "trap": "Commercial non-automotive 65 V TPS92515HV (AEC-Q100 65 V version marks 15QX).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps92515qdgqrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps92515-q1.pdf"
  },
  {
    "mark": "92662AQ",
    "mpn": "TPS92662AQPHPRQ1",
    "mfr": "Texas Instruments",
    "pkg": "HTQFP-48 PowerPAD (PHP)",
    "kind": "Truncated MPN",
    "src": "TI SLUSDV6A addendum (Oct 2025)",
    "trap": "A-version 60 V 12-switch ADB LED matrix manager with EMI clock/crystal control; MSL Level 3 (168-hour floor life!).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps92662aqphprq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps92662a-q1.pdf"
  },
  {
    "mark": "GV",
    "mpn": "TPS3703A7330DSERQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-6 (DSE, 1.5x1.5 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SBVS344D addendum (Nov 2025)",
    "trap": "3.30 V +/-7% window OV/UV supervisor (10ms/200ms CT). Tighter +/-4% 3.30 V marks AE; 2.80 V marks H3; 2.50 V marks L9; 1.80 V marks H2!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3703a7330dserq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3703-q1.pdf"
  },
  {
    "mark": "AE",
    "mpn": "TPS3703A4330DSERQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-6 (DSE, 1.5x1.5 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SBVS344D addendum (Nov 2025)",
    "trap": "3.30 V +/-4% window OV/UV supervisor in 1.5x1.5 mm WSON-6 (the +/-7% 3.30 V trim TPS3703A7330DSERQ1 marks GV).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3703a7330dserq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3703-q1.pdf"
  },
  {
    "mark": "L9",
    "mpn": "TPS3703A7250DSERQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-6 (DSE, 1.5x1.5 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SBVS344D addendum (Nov 2025)",
    "trap": "2.50 V +/-7% window OV/UV supervisor in 1.5x1.5 mm WSON-6 (do not load onto 3.30 V GV rails!).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3703a7330dserq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3703-q1.pdf"
  },
  {
    "mark": "H2",
    "mpn": "TPS3703A7180DSERQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-6 (DSE, 1.5x1.5 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SBVS344D addendum (Nov 2025)",
    "trap": "1.80 V +/-7% window OV/UV supervisor in 1.5x1.5 mm WSON-6.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3703a7330dserq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3703-q1.pdf"
  },
  {
    "mark": "11B",
    "mpn": "TPS22965NQWDSGRQ1 / TPS22965NQWDSGTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-8 WF (DSG, 2x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSCI3E addendum (Nov 2025)",
    "trap": "No-QOD wettable-flank (-40..125 C) 4 A automotive load switch. 11A adds 225 Ohm QOD (bleeds pre-biased rails!); ZDXI/ZYE lack wettable flanks. MSL 2.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps22965nqwdsgrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps22965-q1.pdf"
  },
  {
    "mark": "11A",
    "mpn": "TPS22965QWDSGRQ1 / TPS22965QWDSGTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-8 WF (DSG, 2x2 mm)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSCI3E addendum (Nov 2025)",
    "trap": "Includes 225 Ohm Quick Output Discharge (QOD) when disabled; no-QOD TPS22965NQWDSGRQ1 is marked 11B.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps22965nqwdsgrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps22965-q1.pdf"
  },
  {
    "mark": "ZDXI",
    "mpn": "TPS22965NTDSGRQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-8 (DSG, 2x2 mm, non-WF)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSCI3E addendum (Nov 2025)",
    "trap": "Non-wettable-flank NIPDAU version of TPS22965N-Q1 (wettable-flank Sn version TPS22965NQWDSGRQ1 marks 11B).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps22965nqwdsgrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps22965-q1.pdf"
  },
  {
    "mark": "ZYE",
    "mpn": "TPS22965TDSGRQ1 / TPS22965TDSGTQ1",
    "mfr": "Texas Instruments",
    "pkg": "WSON-8 (DSG, 2x2 mm, non-WF)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSCI3E addendum (Nov 2025)",
    "trap": "Non-wettable-flank QOD version of TPS22965-Q1 (wettable-flank QOD version marks 11A).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps22965nqwdsgrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps22965-q1.pdf"
  },
  {
    "mark": "ZFNR",
    "mpn": "TPS22860DBVR / TPS22860DBVRG4",
    "mfr": "Texas Instruments",
    "pkg": "SOT-23-6 (DBV)",
    "kind": "Cryptic SMD",
    "src": "TI SLVSD04 addendum (Nov 2025)",
    "trap": "2 nA ultra-low-leakage 200 mA load switch in SOT-23-6; cryptic ZFNR bears zero resemblance to TPS22860.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps22860dbvr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps22860.pdf"
  },
  {
    "mark": "PS63020",
    "mpn": "TPS63020DSJR / TPS63020DSJT",
    "mfr": "Texas Instruments",
    "pkg": "VSON-14 (DSJ, 3x4 mm)",
    "kind": "Truncated MPN",
    "src": "TI SLVS916I addendum (Nov 2025)",
    "trap": "Adjustable 1.2-5.5 V buck-boost (500 mV FB on Pin 3). Fixed 3.3 V TPS63021DSJR marks PS63021 and ties Pin 3 directly to VOUT!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps63020dsjr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps63020.pdf"
  },
  {
    "mark": "PS63021",
    "mpn": "TPS63021DSJR / TPS63021DSJT",
    "mfr": "Texas Instruments",
    "pkg": "VSON-14 (DSJ, 3x4 mm)",
    "kind": "Truncated MPN",
    "src": "TI SLVS916I addendum (Nov 2025)",
    "trap": "Fixed 3.3 V buck-boost converter; NOT drop-in for adjustable PS63020 boards with external feedback resistors.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps63020dsjr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps63020.pdf"
  },
  {
    "mark": "30718",
    "mpn": "TPS3307-18DR / TPS3307-18D",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 (D)",
    "kind": "Truncated MPN",
    "src": "TI SLVS199C addendum (Nov 2025)",
    "trap": "Triple supervisor (3.3 V + 1.8 V + adj) in SOIC-8; 2.5 V trim marks 30725, 5 V/3.3 V trim marks 30733, and MSOP-8 TPS3307-18DGNR marks AAP.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3307-18dr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3307.pdf"
  },
  {
    "mark": "AAP",
    "mpn": "TPS3307-18DGNR / TPS3307-18DGN",
    "mfr": "Texas Instruments",
    "pkg": "HVSSOP / MSOP-8 (DGN)",
    "kind": "Cryptic SMD",
    "src": "TI SLVS199C addendum (Nov 2025)",
    "trap": "MSOP-8 package of TPS3307-18 (AAQ = TPS3307-25DGN, AAR = TPS3307-33DGN; SOIC-8 marks 30718).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/tps3307-18dr/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/tps3307.pdf"
  },
  {
    "mark": "U282Q",
    "mpn": "UCC27282QDRCTQ1 / QDRCRQ1 / QDDARQ1 / QDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "VSON-10 (DRC) / HSOIC-8 (DDA) / SOIC-8 (D)",
    "kind": "Shared Marking",
    "src": "TI SLUSDN5D addendum (Aug 2026)",
    "trap": "Shared-marking trap: 10-pin VSON DRC (with Pin 6 EN), 8-pin HSOIC DDA and 8-pin SOIC D ALL print U282Q! Check outline and reel SPQ (250 vs 3000).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ucc27282qdrctq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ucc27282-q1.pdf"
  },
  {
    "mark": "5350MCQ",
    "mpn": "UCC5350MCQDWVRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 wide (DWV, 8.5 mm creepage)",
    "kind": "Truncated MPN",
    "src": "TI SLUSE29G addendum (May 2026)",
    "trap": "5 kVRMS wide-body isolated SiC/IGBT driver with Active Miller Clamp & 12 V UVLO; MSL Level 3 (168 hr floor life!).",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ucc5350mcqdwvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ucc5350-q1.pdf"
  },
  {
    "mark": "5350Q",
    "mpn": "UCC5350MCQDRQ1 / UCC5350SBQDRQ1",
    "mfr": "Texas Instruments",
    "pkg": "SOIC-8 narrow (D, 4 mm creepage)",
    "kind": "Shared Marking",
    "src": "TI SLUSE29G addendum (May 2026)",
    "trap": "Critical shared-marking trap: in narrow SOIC-8, BOTH Miller-Clamp 12 V UVLO (MCQDRQ1) and Split-Output 8 V UVLO (SBQDRQ1) print 5350Q! Verify TI reel label.",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/ucc5350mcqdwvrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/ucc5350-q1.pdf"
  },
  {
    "mark": "LP8752",
    "mpn": "LP875230DRNFRQ1 / LP8752x-Q1 family",
    "mfr": "Texas Instruments",
    "pkg": "VQFN-HR-26 (RNF)",
    "kind": "Shared Marking",
    "src": "TI SNVSB23 addendum (Nov 2025)",
    "trap": "Every LP87521/22/23/24/25 OTP spin prints LP8752 on line 1—wrong OTP suffix (e.g. 30C/30E/24B instead of 30D) changes SoC startup rail voltages!",
    "pageUrl": "https://www.partvane.com/parts/texas-instruments/lp875230drnfrq1/",
    "datasheetUrl": "https://www.ti.com/lit/ds/symlink/lp87523-q1.pdf"
  }
];

function norm(s) {
  return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function lookupTopMarking(rawInput) {
  const s = String(rawInput || '').trim().toUpperCase();
  if (!s) {
    return { input: '', ok: false, error: 'Empty input', matches: [], dateTokens: [], shareUrl: '' };
  }
  const tokens = s.split(/[\s/,;|]+/).filter(Boolean);
  const fullNorm = norm(s);
  const matches = [];
  const usedIdx = new Set();

  for (const m of VERIFIED_TOP_MARKINGS) {
    const mNorm = norm(m.mark);
    const mpnNorm = norm(m.mpn);
    let matched = false;
    let matchReason = '';

    if (mNorm === fullNorm) {
      matched = true;
      matchReason = 'Exact top-marking match';
    } else if (
      m.pat &&
      tokens.some((t, ix) => {
        if (new RegExp(m.pat).test(t)) {
          usedIdx.add(ix);
          return true;
        }
        return false;
      })
    ) {
      matched = true;
      matchReason = `Matches datasheet wildcard pattern (${m.mark})`;
    } else if (tokens.length > 1) {
      for (let i = 0; i < tokens.length; i++) {
        if (norm(tokens[i]) === mNorm) {
          matched = true;
          usedIdx.add(i);
          matchReason = `Matched device-code token ${tokens[i]}`;
        }
        if (i + 1 < tokens.length && norm(tokens[i] + tokens[i + 1]) === mNorm) {
          matched = true;
          usedIdx.add(i);
          usedIdx.add(i + 1);
          matchReason = `Matched two-line marking ${m.mark}`;
        }
      }
    }

    if (!matched && fullNorm.length >= 3 && (mpnNorm.includes(fullNorm) || (mNorm.startsWith(fullNorm) && fullNorm.length >= 2))) {
      matched = true;
      matchReason = mpnNorm.includes(fullNorm) ? 'Reverse MPN-to-marking lookup' : 'Prefix marking match';
    }

    if (matched) {
      matches.push({ ...m, matchReason });
    }
  }

  const dateTokens = [];
  tokens.forEach((t, ix) => {
    if (usedIdx.has(ix) && matches.length === 1 && norm(matches[0].mark) === norm(t)) return;
    if (/^(?:[0-9]{3,5}|[0-9]{2}\+)$/.test(t) && (!matches.length || norm(matches[0].mark) !== t)) {
      dateTokens.push(t);
    }
  });

  return {
    input: s,
    ok: matches.length > 0,
    matches,
    dateTokens,
    shareUrl: `https://www.partvane.com/tools/ic-marking-decoder/?m=${encodeURIComponent(s)}`,
  };
}
