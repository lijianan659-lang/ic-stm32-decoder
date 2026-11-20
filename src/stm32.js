/**
 * Zero-dependency STM32 Ordering Part Number Decoder.
 *
 * Every family ordering table below is strictly aligned with the verified STMicroelectronics
 * datasheet "Ordering information" tables maintained in PartVane's STM32 decoder dataset.
 */

const T6_AMBIENT = {
  '6': '-40 to 85 °C ambient',
  '7': '-40 to 105 °C ambient',
  '3': '-40 to 125 °C ambient',
};

export const STM32_FAMILIES = [
  {
    keyPattern: /^F030$/,
    name: 'STM32F030 value line (Arm Cortex-M0)',
    core: 'Arm Cortex-M0',
    doc: 'DS9773 Rev 5',
    url: 'https://www.st.com/resource/en/datasheet/stm32f030f4.pdf',
    pin: { F: '20 pins', K: '32 pins', C: '48 pins', R: '64 pins' },
    fl: { '4': '16 KB', '6': '32 KB', '8': '64 KB', C: '256 KB' },
    pk: { P: 'TSSOP', T: 'LQFP' },
    tp: { '6': '-40 to 85 °C ambient' },
  },
  {
    keyPattern: /^F103$/,
    flashPattern: /^[46]$/,
    name: 'STM32F103 performance line, low-density (Arm Cortex-M3)',
    core: 'Arm Cortex-M3',
    doc: 'DocID15060 Rev 7',
    url: 'https://www.st.com/resource/en/datasheet/stm32f103c6.pdf',
    pin: { T: '36 pins', C: '48 pins', R: '64 pins' },
    fl: { '4': '16 KB', '6': '32 KB' },
    pk: { H: 'BGA', T: 'LQFP', U: 'VFQFPN or UFQFPN' },
    tp: { '6': T6_AMBIENT['6'], '7': T6_AMBIENT['7'] },
    op: { A: 'internal code "A"' },
  },
  {
    keyPattern: /^F103$/,
    flashPattern: /^[8B]$/,
    name: 'STM32F103 performance line, medium-density (Arm Cortex-M3)',
    core: 'Arm Cortex-M3',
    doc: 'DS5319 Rev 20',
    url: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',
    pin: { T: '36 pins', C: '48 pins', R: '64 pins', V: '100 pins' },
    fl: { '8': '64 KB', B: '128 KB' },
    pk: { H: 'BGA', I: 'UFBGA', T: 'LQFP', U: 'VFQFPN or UFQFPN' },
    tp: { '6': T6_AMBIENT['6'], '7': T6_AMBIENT['7'] },
    op: { R: 'customer dedicated code' },
  },
  {
    keyPattern: /^F103$/,
    flashPattern: /^[CDE]$/,
    name: 'STM32F103 performance line, high-density (Arm Cortex-M3)',
    core: 'Arm Cortex-M3',
    doc: 'DS5792 Rev 13',
    url: 'https://www.st.com/resource/en/datasheet/stm32f103rc.pdf',
    pin: { R: '64 pins', V: '100 pins', Z: '144 pins' },
    fl: { C: '256 KB', D: '384 KB', E: '512 KB' },
    pk: { H: 'BGA', T: 'LQFP', Y: 'WLCSP64' },
    tp: { '6': T6_AMBIENT['6'], '7': T6_AMBIENT['7'] },
  },
  {
    keyPattern: /^F401$/,
    flashPattern: /^[BC]$/,
    name: 'STM32F401 (Arm Cortex-M4 with FPU)',
    core: 'Arm Cortex-M4 with FPU',
    doc: 'DS9716 Rev 11',
    url: 'https://www.st.com/resource/en/datasheet/stm32f401cc.pdf',
    pin: { C: '48/49 pins', R: '64 pins', V: '100 pins' },
    fl: { B: '128 KB', C: '256 KB' },
    pk: { H: 'UFBGA', T: 'LQFP', U: 'UFQFPN', Y: 'WLCSP' },
    tp: T6_AMBIENT,
  },
  {
    keyPattern: /^F401$/,
    flashPattern: /^[DE]$/,
    name: 'STM32F401 (Arm Cortex-M4 with FPU)',
    core: 'Arm Cortex-M4 with FPU',
    doc: 'DS10086 Rev 5',
    url: 'https://www.st.com/resource/en/datasheet/stm32f401re.pdf',
    pin: { C: '48/49 pins', R: '64 pins', V: '100 pins' },
    fl: { D: '384 KB', E: '512 KB' },
    pk: { H: 'UFBGA', T: 'LQFP', U: 'UFQFPN', Y: 'WLCSP' },
    tp: { '6': T6_AMBIENT['6'] },
  },
  {
    keyPattern: /^F411$/,
    name: 'STM32F411 (Arm Cortex-M4 with FPU)',
    core: 'Arm Cortex-M4 with FPU',
    doc: 'DS10314 Rev 8',
    url: 'https://www.st.com/resource/en/datasheet/stm32f411ce.pdf',
    pin: { C: '48/49 pins', R: '64 pins', V: '100 pins' },
    fl: { C: '256 KB', E: '512 KB' },
    pk: { H: 'UFBGA', T: 'LQFP', U: 'UFQFPN', Y: 'WLCSP' },
    tp: T6_AMBIENT,
  },
  {
    keyPattern: /^F40[57]$/,
    name: 'STM32F405/F407 (Arm Cortex-M4 with FPU)',
    core: 'Arm Cortex-M4 with FPU',
    doc: 'DS8626 Rev 12',
    url: 'https://www.st.com/resource/en/datasheet/stm32f405rg.pdf',
    sub: {
      '405': 'connectivity line',
      '407': 'connectivity line with camera interface and Ethernet',
    },
    pin: { R: '64 pins', O: '90 pins', V: '100 pins', Z: '144 pins', I: '176 pins' },
    fl: { E: '512 KB', G: '1024 KB' },
    pk: { T: 'LQFP', H: 'UFBGA', Y: 'WLCSP' },
    tp: { '6': T6_AMBIENT['6'], '7': T6_AMBIENT['7'] },
  },
  {
    keyPattern: /^G030$/,
    name: 'STM32G030 (Arm Cortex-M0+)',
    core: 'Arm Cortex-M0+',
    doc: 'DS12991 Rev 6',
    url: 'https://www.st.com/resource/en/datasheet/stm32g030c8.pdf',
    pin: { J: '8 pins', F: '20 pins', K: '32 pins', C: '48 pins' },
    fl: { '6': '32 KB', '8': '64 KB' },
    pk: { T: 'LQFP', P: 'TSSOP', M: 'SO8N' },
    tp: { '6': '-40 to 85 °C ambient (105 °C junction)' },
  },
  {
    keyPattern: /^G031$/,
    name: 'STM32G031 (Arm Cortex-M0+)',
    core: 'Arm Cortex-M0+',
    doc: 'DS12992 Rev 4',
    url: 'https://www.st.com/resource/en/datasheet/stm32g031g8.pdf',
    pin: { J: '8 pins', Y: '18 balls (WLCSP18)', F: '20 pins', G: '28 pins', K: '32 pins', C: '48 pins' },
    fl: { '4': '16 KB', '6': '32 KB', '8': '64 KB' },
    pk: { T: 'LQFP', U: 'UFQFPN', Y: 'WLCSP', P: 'TSSOP', M: 'SO8N' },
    tp: {
      '6': '-40 to 85 °C ambient (105 °C junction)',
      '7': '-40 to 105 °C ambient (125 °C junction)',
      '3': '-40 to 125 °C ambient (130 °C junction)',
    },
  },
  {
    keyPattern: /^G070$/,
    name: 'STM32G070 (Arm Cortex-M0+)',
    core: 'Arm Cortex-M0+',
    doc: 'DS12766 Rev 3',
    url: 'https://www.st.com/resource/en/datasheet/stm32g070cb.pdf',
    pin: { K: '32 pins', C: '48 pins', R: '64 pins' },
    fl: { B: '128 KB' },
    pk: { T: 'LQFP' },
    tp: { '6': '-40 to 85 °C ambient (105 °C junction)' },
  },
  {
    keyPattern: /^G56[34]$/,
    name: 'STM32G56x mixed-signal, with cryptography (Arm Cortex-M33)',
    core: 'Arm Cortex-M33',
    doc: 'DS14920 Rev 1',
    url: 'https://www.st.com/resource/en/datasheet/stm32g564re.pdf',
    sub: {
      '564': 'STM32G564, with high-resolution timer (HRTIM)',
      '563': 'STM32G563, without HRTIM',
    },
    pin: { H: '40 pins', C: '48 pins', R: '64 pins', M: '80 pins', V: '100 pins', P: '121 balls', Q: '128 pins' },
    fl: { B: '128 KB', C: '256 KB', E: '512 KB' },
    pk: { I: 'UFBGA', T: 'LQFP', Z: 'TQFP-EP / LQFP-EP (exposed pad)', U: 'UFQFPN' },
    tp: {
      '7': '-40 to 105 °C ambient (140 °C junction)',
      '6': '-40 to 85 °C ambient (140 °C junction)',
      '3': '-40 to 125 °C ambient (140 °C junction)',
    },
    op: { Q: 'dedicated pinout supporting the SMPS step-down converter' },
  },
  {
    keyPattern: /^G55[34]$/,
    name: 'STM32G55x mixed-signal, no AES crypto (Arm Cortex-M33)',
    core: 'Arm Cortex-M33',
    doc: 'DS15237 Rev 1',
    url: 'https://www.st.com/resource/en/datasheet/stm32g554re.pdf',
    sub: {
      '554': 'STM32G554, with high-resolution timer (HRTIM)',
      '553': 'STM32G553, without HRTIM',
    },
    pin: { H: '40 pins', C: '48 pins', R: '64 pins', M: '80 pins', V: '100 pins', P: '121 balls', Q: '128 pins' },
    fl: { B: '128 KB', C: '256 KB', E: '512 KB' },
    pk: { I: 'UFBGA', T: 'LQFP', Z: 'TQFP-EP / LQFP-EP (exposed pad)', U: 'UFQFPN' },
    tp: {
      '7': '-40 to 105 °C ambient (140 °C junction)',
      '6': '-40 to 85 °C ambient (140 °C junction)',
      '3': '-40 to 125 °C ambient (140 °C junction)',
    },
    op: { Q: 'dedicated pinout supporting the SMPS step-down converter' },
  },
  {
    keyPattern: /^H7P[45]$/,
    name: 'STM32H7P (Arm Cortex-M7, 520 MHz)',
    core: 'Arm Cortex-M7, 520 MHz',
    doc: 'DS15208 Rev 1 (prerelease)',
    url: 'https://www.st.com/resource/en/datasheet/stm32h7p5vi.pdf',
    sub: {
      '7P4': 'with hardware signal processor (HSP)',
      '7P5': 'with Neural-ART Accelerator NPU and HSP',
    },
    pin: { I: '176 pins', Z: '144 pins', Q: '128 pins', V: '100 pins' },
    fl: { I: '2048 KB', G: '1024 KB' },
    pk: { T: 'LQFP', K: 'UFBGA', H: 'TFBGA', Z: 'LQFP with exposed pad' },
    tp: {
      '3': '-40 °C < Tj < +125 °C (junction)',
      '6': '-40 °C < Tj < +85 °C (junction)',
    },
    op: { Q: 'SMPS version' },
  },
  {
    keyPattern: /^H74[23]$/,
    name: 'STM32H742/H743 (Arm Cortex-M7, 480 MHz)',
    core: 'Arm Cortex-M7, 480 MHz',
    doc: 'DS12110 Rev 11',
    url: 'https://www.st.com/resource/en/datasheet/stm32h743vi.pdf',
    pin: {
      V: '100 pins',
      Z: '144 pins',
      A: '169 balls',
      I: '176 pins / 176+25 balls',
      B: '208 pins',
      X: '240+25 balls',
    },
    fl: { G: '1 MB', I: '2 MB' },
    pk: { T: 'LQFP', K: 'UFBGA, 0.65 mm pitch', I: 'UFBGA, 0.5 mm pitch', H: 'TFBGA' },
    tp: { '6': '-40 to 85 °C' },
    op: { A: 'advanced mission profile (VOS1, 480 MHz)' },
  },
  {
    keyPattern: /^L051$/,
    name: 'STM32L051 ultra-low-power access line (Arm Cortex-M0+)',
    core: 'Arm Cortex-M0+',
    doc: 'DS10184 Rev 10',
    url: 'https://www.st.com/resource/en/datasheet/stm32l051c8.pdf',
    pin: { K: '32 pins', T: '36 pins', C: '48/49 pins', R: '64 pins' },
    fl: { '6': '32 KB', '8': '64 KB' },
    pk: { T: 'LQFP', H: 'TFBGA', U: 'UFQFPN', Y: 'WLCSP (standard)', F: 'WLCSP (thin)' },
    tp: T6_AMBIENT,
    op: { D: 'VDD 1.65 to 3.6 V with BOR disabled' },
  },
  {
    keyPattern: /^L15[12]$/,
    name: 'STM32L151/L152 ultra-low-power, Cat. 1/2 "A" devices (Arm Cortex-M3)',
    core: 'Arm Cortex-M3',
    doc: 'DocID024330 Rev 5',
    url: 'https://www.st.com/resource/en/datasheet/stm32l151c8-a.pdf',
    sub: { '151': 'without LCD', '152': 'with LCD' },
    pin: { C: '48 pins', R: '64 pins', V: '100 pins' },
    fl: { '6': '32 KB', '8': '64 KB', B: '128 KB' },
    pk: { H: 'BGA', T: 'LQFP', U: 'UFQFPN' },
    tp: { '6': T6_AMBIENT['6'], '7': T6_AMBIENT['7'] },
    op: {
      A: 'device generation A',
      D: 'VDD 1.65 to 3.6 V with BOR disabled',
      AD: 'device generation A; VDD 1.65 to 3.6 V with BOR disabled',
    },
  },
  {
    keyPattern: /^L431$/,
    name: 'STM32L431 ultra-low-power (Arm Cortex-M4 with FPU)',
    core: 'Arm Cortex-M4 with FPU',
    doc: 'DS11453 Rev 3',
    url: 'https://www.st.com/resource/en/datasheet/stm32l431cc.pdf',
    pin: { K: '32 pins', C: '48 pins', R: '64 pins', V: '100 pins' },
    fl: { B: '128 KB', C: '256 KB' },
    pk: { T: 'LQFP', U: 'QFN', I: 'UFBGA', Y: 'CSP' },
    tp: {
      '6': '-40 to 85 °C ambient (105 °C junction)',
      '7': '-40 to 105 °C ambient (125 °C junction)',
      '3': '-40 to 125 °C ambient (130 °C junction)',
    },
  },
  {
    keyPattern: /^C011$/,
    name: 'STM32C011 (Arm Cortex-M0+)',
    core: 'Arm Cortex-M0+',
    doc: 'DS13866 Rev 5',
    url: 'https://www.st.com/resource/en/datasheet/stm32c011f6.pdf',
    pin: { J: '8 pins', D: '12 pins', F: '20 pins' },
    fl: { '4': '16 KB', '6': '32 KB' },
    pk: { U: 'UFQFPN', Y: 'WLCSP', P: 'TSSOP', M: 'SO8N' },
    tp: {
      '6': '-40 to 85 °C ambient (105 °C junction)',
      '7': '-40 to 105 °C ambient (125 °C junction)',
      '3': '-40 to 125 °C ambient (130 °C junction)',
    },
  },
];

/**
 * Generic fallback table: contains ONLY codes that carry the same meaning across all verified datasheets above.
 */
export const STM32_GENERIC_TABLE = {
  pin: {
    J: '8 pins',
    F: '20 pins',
    G: '28 pins',
    K: '32 pins',
    T: '36 pins',
    C: '48 pins (48/49 in some families)',
    R: '64 pins',
    V: '100 pins',
    Z: '144 pins',
    I: '176 pins',
  },
  fl: {
    '4': '16 KB',
    '6': '32 KB',
    '8': '64 KB',
    B: '128 KB',
    C: '256 KB',
    D: '384 KB',
    E: '512 KB',
    G: '1024 KB',
    I: '2048 KB',
  },
  pk: {
    T: 'LQFP',
    P: 'TSSOP',
    U: 'UFQFPN / VFQFPN (QFN)',
    Y: 'WLCSP',
    H: 'BGA (TFBGA or UFBGA, varies by family)',
  },
  tp: T6_AMBIENT,
};

export const STM32_PRODUCT_TYPES = {
  F: 'General-purpose (mainstream / performance)',
  G: 'General-purpose (mainstream)',
  L: 'Low-power / ultra-low-power',
  H: 'High performance',
  U: 'Ultra-low-power',
  C: 'General-purpose (entry level)',
};

export function cleanStm32Input(raw) {
  return String(raw ?? '').toUpperCase().replace(/[\s\-_./]/g, '');
}

/**
 * Decode an STM32 ordering part number (e.g. STM32F103C8T6, STM32G030F6P6TR, STM32H743VIT6).
 */
export function decodeStm32(raw) {
  let s = cleanStm32Input(raw);
  const result = {
    input: s,
    ok: false,
    verified: false,
    family: null,
    productType: null,
    subfamily: null,
    pinCount: null,
    flashSize: null,
    package: null,
    temperatureRange: null,
    option: null,
    packing: null,
    fields: [],
    notes: [],
    summary: '',
    shareUrl: '',
  };

  if (!s) {
    result.err = 'empty';
    return result;
  }
  if (/^STM8/.test(s)) {
    result.err = "STM8 is ST's 8-bit family and uses a different ordering scheme. This tool decodes STM32 codes only.";
    return result;
  }
  if (/^STM32(W|MP|N|A)/.test(s)) {
    result.err = "STM32W (wireless), STM32MP, STM32N and STM32A codes use a different field layout. Open the ordering information section of that device's datasheet.";
    return result;
  }
  if (!/^STM32/.test(s)) {
    if (/^[FGLHUC]\d/.test(s)) {
      s = 'STM32' + s;
      result.input = s;
    } else {
      result.err = 'An STM32 order code starts with "STM32", for example STM32F103C8T6.';
      return result;
    }
  }

  const m = s.match(/^STM32([FGLHUC])(\d[0-9A-Z]{2})([A-Z])?([0-9A-Z])?([A-Z])?([0-9])?([A-Z0-9]*)$/);
  if (!m) {
    result.err = 'This does not follow the STM32 + type + subfamily + pins + flash + package + temperature pattern. Check for a typo.';
    return result;
  }

  const ty = m[1];
  const sub = m[2];
  const pin = m[3];
  const fl = m[4];
  const pk = m[5];
  const tp = m[6];
  let rest = m[7] || '';

  const key = ty + sub;
  let fam = null;
  let keyHasDensitySplit = false;

  for (const entry of STM32_FAMILIES) {
    if (entry.keyPattern.test(key)) {
      if (entry.flashPattern) keyHasDensitySplit = true;
      if (!entry.flashPattern || (fl && entry.flashPattern.test(fl))) {
        fam = entry;
        break;
      }
    }
  }

  if (!fam && !fl) {
    for (const entry of STM32_FAMILIES) {
      if (entry.keyPattern.test(key) && entry.flashPattern) {
        fam = entry;
        result.notes.push('Flash code missing, so the exact datasheet cannot be chosen; showing the first matching table.');
        break;
      }
    }
  }

  const tab = fam || STM32_GENERIC_TABLE;
  result.verified = Boolean(fam);
  result.family = fam
    ? { name: fam.name, core: fam.core, doc: fam.doc, url: fam.url }
    : null;

  if (!fam) {
    if (keyHasDensitySplit && fl) {
      result.notes.push(
        `Flash code "${fl}" does not match any verified STM32${key} density datasheet table; showing generic fallback codes.`
      );
    } else {
      result.notes.push(
        `STM32${key} is not in this tool's verified list. The reading below uses only the codes that mean the same in every datasheet checked; confirm with the ordering information in the device datasheet.`
      );
    }
  }

  result.fields.push({
    c: 'STM32',
    f: 'Device family',
    v: 'Arm-based 32-bit microcontroller',
    st: 'ok',
  });

  const typeVal = STM32_PRODUCT_TYPES[ty] || 'Unknown';
  const typeStatus = STM32_PRODUCT_TYPES[ty] ? 'ok' : 'bad';
  result.productType = { code: ty, value: typeVal, status: typeStatus };
  result.fields.push({ c: ty, f: 'Product type', v: typeVal, st: typeStatus });

  const subVal = fam
    ? (fam.sub && fam.sub[sub] ? fam.sub[sub] : fam.name)
    : `Subfamily STM32${key} (not in verified list)`;
  const subStatus = fam ? 'ok' : 'warn';
  result.subfamily = { code: sub, value: subVal, status: subStatus };
  result.fields.push({ c: sub, f: 'Device subfamily', v: subVal, st: subStatus });

  function addField(code, label, map) {
    if (!code) {
      const entry = { code: null, value: 'Not given', status: 'miss' };
      result.fields.push({ c: '-', f: label, v: 'Not given', st: 'miss' });
      return entry;
    }
    const val = map[code];
    const st = val ? (fam ? 'ok' : 'warn') : 'bad';
    const text = val || `Code "${code}" is not defined for this family`;
    result.fields.push({ c: code, f: label, v: text, st });
    return { code, value: text, status: st };
  }

  result.pinCount = addField(pin, 'Pin count', tab.pin);
  result.flashSize = addField(fl, 'Flash memory', tab.fl);
  result.package = addField(pk, 'Package', tab.pk);
  result.temperatureRange = addField(tp, 'Temperature range', tab.tp);

  if (rest) {
    let tr = '';
    if (/TR$/.test(rest)) {
      tr = 'TR';
      rest = rest.slice(0, -2);
    } else if (/TT$/.test(rest) && key === 'F401') {
      tr = 'TT';
      rest = rest.slice(0, -2);
    }

    if (rest) {
      const ov = fam && fam.op ? fam.op[rest] : null;
      const optVal =
        ov ||
        "Not defined in this datasheet's ordering table (may be a die revision, internal or programmed-part code; check ST marking documents)";
      const optSt = ov ? 'ok' : 'warn';
      result.option = { code: rest, value: optVal, status: optSt };
      result.fields.push({ c: rest, f: 'Option', v: optVal, st: optSt });
    }

    if (tr) {
      const packVal = tr === 'TR' ? 'Tape and reel' : 'Tape and reel for WLCSP (PCN9547)';
      result.packing = { code: tr, value: packVal, status: 'ok' };
      result.fields.push({ c: tr, f: 'Packing', v: packVal, st: 'ok' });
    } else {
      result.packing = { code: '', value: 'Tray or tube (default when TR is omitted)', status: 'default' };
    }
  } else {
    result.packing = { code: '', value: 'Tray or tube (default when TR is omitted)', status: 'default' };
  }

  result.ok = result.fields.every((x) => x.st !== 'bad');

  const summaryParts = [];
  if (pin && tab.pin[pin]) summaryParts.push(tab.pin[pin]);
  if (fl && tab.fl[fl]) summaryParts.push(`${tab.fl[fl]} flash`);
  if (pk && tab.pk[pk]) summaryParts.push(tab.pk[pk]);
  if (tp && tab.tp[tp]) summaryParts.push(tab.tp[tp]);
  if (result.packing && result.packing.code) summaryParts.push(result.packing.value);
  result.summary = summaryParts.join(', ');
  result.shareUrl = `https://www.partvane.com/tools/stm32-part-number-decoder/?pn=${encodeURIComponent(result.input)}`;

  return result;
}
