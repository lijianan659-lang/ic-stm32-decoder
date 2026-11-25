#!/usr/bin/env node
import {
  decodeDateCode,
  decodeOnsemiTwoLetter,
  decodeNationalSixWeek,
  decodeStm32,
  lookupTopMarking,
} from '../src/index.js';

function printHelp() {
  console.log(`ic-stm32-decoder — Zero-dependency IC Date Code & STM32 Part Number Decoder

Usage:
  ic-stm32-decoder <code-or-mpn> [options]
  ic-stm32-decoder date <code-or-marking> [--century 2000|1900] [--scheme auto|numeric|onsemi|nsc] [--ref-year YYYY] [--json]
  ic-stm32-decoder onsemi <2-letter-code> [--ref-year YYYY] [--json]
  ic-stm32-decoder nsc <4-digit-code> [--century 2000|1900] [--ref-year YYYY] [--json]
  ic-stm32-decoder stm32 <part-number> [--json]
  ic-stm32-decoder marking <top-mark-or-mpn> [--json]

Examples:
  ic-stm32-decoder 2243
  ic-stm32-decoder 24366 --json
  ic-stm32-decoder GJ
  ic-stm32-decoder nsc 0012
  ic-stm32-decoder STM32F103C8T6
  ic-stm32-decoder STM32G030F6P6TR

Interactive Web Tools (No Sign-up):
  IC Top Marking Lookup:    https://www.partvane.com/tools/ic-marking-decoder/
  IC Cross-Reference Tool:  https://www.partvane.com/tools/cross-reference/
  IC Date Code Decoder:     https://www.partvane.com/tools/date-code-decoder/
  Marking Formats Guide:    https://www.partvane.com/tools/date-code-formats/
  STM32 Part Decoder:       https://www.partvane.com/tools/stm32-part-number-decoder/
  IC MSL Bake Calculator:   https://www.partvane.com/tools/msl-calculator/
  AEC-Q100 Suffix Decoder:  https://www.partvane.com/tools/aec-q100-grade-decoder/`);
}

function parseArgs(argv) {
  const opts = {
    mode: 'auto',
    target: null,
    century: 2000,
    scheme: 'auto',
    referenceYear: undefined,
    json: false,
    help: false,
  };

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      opts.help = true;
    } else if (arg === '--json' || arg === '-j') {
      opts.json = true;
    } else if (arg === '--century') {
      opts.century = Number(argv[++i]);
    } else if (arg.startsWith('--century=')) {
      opts.century = Number(arg.split('=')[1]);
    } else if (arg === '--scheme') {
      opts.scheme = argv[++i];
    } else if (arg.startsWith('--scheme=')) {
      opts.scheme = arg.split('=')[1];
    } else if (arg === '--ref-year') {
      opts.referenceYear = Number(argv[++i]);
    } else if (arg.startsWith('--ref-year=')) {
      opts.referenceYear = Number(arg.split('=')[1]);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length >= 2 && ['date', 'stm32', 'onsemi', 'nsc', 'marking'].includes(positional[0].toLowerCase())) {
    opts.mode = positional[0].toLowerCase();
    opts.target = opts.mode === 'marking' ? positional.slice(1).join(' ') : positional.slice(1).join('');
  } else if (positional.length >= 1) {
    opts.target = positional.join('');
  }

  return opts;
}

function detectMode(target) {
  const clean = target.toUpperCase().replace(/[\s\-_./]/g, '');
  if (/^STM(32|8)/.test(clean) || /^[FGLHUC]\d[0-9A-Z]{2}[A-Z][0-9A-Z]/.test(clean)) {
    return 'stm32';
  }
  return 'date';
}

function formatDateResult(res) {
  const lines = [];
  lines.push(`Input: ${res.input}`);
  if (!res.ok) {
    lines.push(`Status: INVALID`);
    lines.push(`Error:  ${res.error}`);
    return lines.join('\n');
  }
  lines.push(`Status: VALID (${res.readings.length} candidate reading${res.readings.length > 1 ? 's' : ''})`);
  for (const r of res.readings) {
    lines.push('');
    if (r.format === 'ONSEMI_AND8002_2LETTER') {
      lines.push(`[${r.format}] ${r.source}`);
      lines.push(`  Work Week: W${String(r.workWeek).padStart(2, '0')} (Half ${r.halfOfYear}, weeks ${r.halfRangeWeeks})`);
      lines.push(`  12-Year Cycle Candidates:`);
      for (const c of r.cycleCandidates) {
        const tag = c.isFuture ? ' [future]' : '';
        lines.push(`    - ${c.year} W${String(c.workWeek).padStart(2, '0')}: ${c.startDate} to ${c.endDate}${tag}`);
      }
    } else if (r.format === 'NSC_SNOA039C_6WEEK') {
      lines.push(`[${r.format}] ${r.source}`);
      lines.push(`  Assembly Period: Weeks ${r.weeksCovered} (2-digit '${r.twoDigitPeriodCode}' / 1-digit '${r.oneDigitPeriodCode}')`);
      for (const c of r.centuryCandidates) {
        lines.push(`    - ${c.year}: ${c.startDate} to ${c.endDate}${c.isFuture ? ' [future]' : ''}`);
      }
      for (const n of r.notes) lines.push(`  Note: ${n}`);
    } else if (r.format === 'YYDDD') {
      lines.push(`[${r.format}] ${r.label}`);
      lines.push(`  Primary (${res.century}s): ${r.date} (Day ${r.dayOfYear}, ISO ${r.isoYear}-W${String(r.isoWeek).padStart(2, '0')}: ${r.isoCalendarRange})`);
      const alt = r.centuryCandidates[1];
      if (alt) {
        lines.push(`  Alternate (${alt.century}s): ${alt.validOrdinalDay ? alt.date : `Invalid (non-leap year ${alt.year})`}`);
      }
    } else if (r.format === 'YYMM') {
      lines.push(`[${r.format}] ${r.label}`);
      lines.push(`  Primary (${res.century}s): ${r.year}-${String(r.month).padStart(2, '0')} (${r.monthName}, ${r.calendarRange})`);
      const alt = r.centuryCandidates[1];
      if (alt) lines.push(`  Alternate (${alt.century}s): ${alt.year}-${String(alt.month).padStart(2, '0')} (${alt.startDate} to ${alt.endDate})`);
    } else if (r.format === 'YY_PLUS') {
      lines.push(`[${r.format}] ${r.label}`);
      lines.push(`  Meaning: ${r.year} or later`);
      lines.push(`  Note: ${r.note}`);
    } else if (r.format === 'YWW') {
      lines.push(`[${r.format}] ${r.label}`);
      lines.push(`  Assumed Decade: ${r.year}-W${String(r.workWeek).padStart(2, '0')} (${r.isoCalendarRange})`);
      lines.push(`  10-Year Cycle:  ${r.decadeCandidates.filter((c) => c.validIsoWeek).map((c) => `${c.year} (${c.startDate}..${c.endDate})`).join(', ')}`);
    } else {
      lines.push(`[${r.format}] ${r.label}${r.warning ? ' [WARNING: future year]' : ''}`);
      lines.push(`  Primary (${res.century}s): ${r.year}-W${String(r.workWeek).padStart(2, '0')} (${r.isoCalendarRange})`);
      const alt = r.centuryCandidates[1];
      if (alt) {
        lines.push(
          `  Alternate (${alt.century}s): ${
            alt.validIsoWeek ? `${alt.year}-W${String(alt.workWeek).padStart(2, '0')} (${alt.startDate} to ${alt.endDate})` : `No ISO W${alt.workWeek} in ${alt.year}`
          }`
        );
      }
    }
  }
  if (res.manufacturerSpecific?.nscSnoa039c?.ok && res.readings[0]?.format !== 'NSC_SNOA039C_6WEEK') {
    const nsc = res.manufacturerSpecific.nscSnoa039c;
    const p = nsc.primaryCandidate;
    lines.push('');
    lines.push(`[NSC_SNOA039C_6WEEK] National Semiconductor 6-Week Period Candidate`);
    lines.push(`  If marked on LM/LF/LMC/DS/ADC parts: ${p.year} weeks ${nsc.weeksCovered} (${p.startDate} to ${p.endDate})`);
    lines.push(`  Warning: Plain YYWW understates date by up to ${nsc.maxPlainYywwUnderstatementWeeks} weeks.`);
  }
  if (res.shareUrl) {
    lines.push('');
    lines.push(`Web Link: ${res.shareUrl}`);
  }
  return lines.join('\n');
}

function formatStm32Result(res) {
  const lines = [];
  lines.push(`Part Number: ${res.input || '(empty)'}`);
  if (res.err) {
    lines.push(`Status:      INVALID`);
    lines.push(`Error:       ${res.err}`);
    return lines.join('\n');
  }
  lines.push(`Status:      ${res.ok ? 'VALID' : 'INVALID FIELD(S)'} (${res.verified ? `Verified: ${res.family.doc}` : 'Generic fallback'})`);
  if (res.family) {
    lines.push(`Family/Core: ${res.family.name}`);
    lines.push(`Datasheet:   ${res.family.doc} (${res.family.url})`);
  }
  if (res.summary) {
    lines.push(`Summary:     ${res.summary}`);
  }
  lines.push('');
  lines.push('Fields:');
  for (const f of res.fields) {
    const badge = f.st === 'ok' ? 'OK' : f.st.toUpperCase();
    lines.push(`  - ${f.f.padEnd(18)} [${f.c.padEnd(5)}] : ${f.v} (${badge})`);
  }
  if (res.packing && !res.packing.code) {
    lines.push(`  - ${'Packing'.padEnd(18)} [none ] : ${res.packing.value}`);
  }
  for (const n of res.notes) {
    lines.push(`Note: ${n}`);
  }
  lines.push(`Web Link: ${res.shareUrl}`);
  return lines.join('\n');
}

const opts = parseArgs(process.argv.slice(2));
if (opts.help || !opts.target) {
  printHelp();
  process.exit(opts.help ? 0 : 1);
}

const mode = opts.mode === 'auto' ? detectMode(opts.target) : opts.mode;
let output;

if (mode === 'marking') {
  output = lookupTopMarking(opts.target);
  if (opts.json) {
    console.log(JSON.stringify(output, null, 2));
  } else if (!output.ok) {
    console.log(`Input: ${output.input}\nStatus: NOT IN VERIFIED TABLE\nWeb Link: ${output.shareUrl}`);
  } else {
    console.log(`Input: ${output.input}\nMatches: ${output.matches.length}`);
    for (const m of output.matches) {
      console.log(`  - [${m.mark}] -> ${m.mpn} (${m.mfr}, ${m.pkg})\n    Trap: ${m.trap}\n    Source: ${m.src} | ${m.pageUrl}`);
    }
    if (output.dateTokens.length) console.log(`Companion Date Token(s): ${output.dateTokens.join(', ')}`);
    console.log(`Web Link: ${output.shareUrl}`);
  }
  process.exit(output.ok ? 0 : 1);
} else if (mode === 'stm32') {
  output = decodeStm32(opts.target);
  console.log(opts.json ? JSON.stringify(output, null, 2) : formatStm32Result(output));
  process.exit(output.ok && !output.err ? 0 : 1);
} else if (mode === 'onsemi') {
  const onsemi = decodeOnsemiTwoLetter(opts.target, { referenceYear: opts.referenceYear });
  output = decodeDateCode(opts.target, { scheme: 'onsemi', referenceYear: opts.referenceYear });
  console.log(opts.json ? JSON.stringify(onsemi, null, 2) : formatDateResult(output));
  process.exit(onsemi.ok ? 0 : 1);
} else if (mode === 'nsc') {
  const nsc = decodeNationalSixWeek(opts.target, { century: opts.century, referenceYear: opts.referenceYear });
  output = decodeDateCode(opts.target, { scheme: 'nsc', century: opts.century, referenceYear: opts.referenceYear });
  console.log(opts.json ? JSON.stringify(nsc, null, 2) : formatDateResult(output));
  process.exit(nsc.ok ? 0 : 1);
} else {
  output = decodeDateCode(opts.target, {
    century: opts.century,
    scheme: opts.scheme,
    referenceYear: opts.referenceYear,
  });
  console.log(opts.json ? JSON.stringify(output, null, 2) : formatDateResult(output));
  process.exit(output.ok ? 0 : 1);
}
