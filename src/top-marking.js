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
    "pat": "^AJ[A-Z0-9]{2}$",
    "mpn": "MCP4725A0T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "First two letters set factory I2C address bits: AJ = A0 (00), AP = A1 (01), AQ = A2 (10), AR = A3 (11); last two characters (NN) are Microchip's alphanumeric traceability code.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf"
  },
  {
    "mark": "APNN",
    "pat": "^AP[A-Z0-9]{2}$",
    "mpn": "MCP4725A1T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A1 (AP + 2-char trace code). Will NACK firmware written for A0 (AJNN) if A0 pin is tied the same way.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf"
  },
  {
    "mark": "AQNN",
    "pat": "^AQ[A-Z0-9]{2}$",
    "mpn": "MCP4725A2T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A2 (AQ + 2-char trace code); not firmware drop-in for A0 (AJNN) without changing I2C target address.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf"
  },
  {
    "mark": "ARNN",
    "pat": "^AR[A-Z0-9]{2}$",
    "mpn": "MCP4725A3T-E/CH",
    "mfr": "Microchip Technology",
    "pkg": "SOT-23-6 (CH)",
    "kind": "Wildcard SMD",
    "src": "Microchip DS22039D Section 8.1",
    "trap": "I2C address option A3 (AR + 2-char trace code) in SOT-23-6.",
    "pageUrl": "https://www.partvane.com/parts/microchip-technology/mcp4725a0t-e-ch/",
    "datasheetUrl": "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf"
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
