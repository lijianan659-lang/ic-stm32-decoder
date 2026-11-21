import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  ONSEMI_AND8002_TABLE,
  NSC_SNOA039C_PERIODS,
  isoWeeksInYear,
  isoWeekRange,
  decodeDateCode,
  decodeOnsemiTwoLetter,
  decodeNationalSixWeek,
  decodeStm32,
  lookupTopMarking,
} from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BIN_PATH = path.resolve(__dirname, '../bin/ic-stm32-decoder.js');

test('ISO week helper computes 52 vs 53 weeks and exact Monday-Sunday bounds', () => {
  assert.equal(isoWeeksInYear(2020), 53);
  assert.equal(isoWeeksInYear(2021), 52);
  assert.equal(isoWeeksInYear(2026), 53);
  assert.deepEqual(isoWeekRange(2020, 53), {
    startDate: '2020-12-28',
    endDate: '2021-01-03',
    formatted: '2020-12-28 to 2021-01-03',
  });
  assert.equal(isoWeekRange(2021, 53), null);
  assert.equal(isoWeekRange(2024, 54), null);
  assert.equal(isoWeekRange(2024, 0), null);
});

test('3-digit YWW decodes assumed decade + 10-year cycles and rejects illegal weeks', () => {
  const valid = decodeDateCode('415', { referenceYear: 2026 });
  assert.equal(valid.ok, true);
  assert.equal(valid.readings.length, 1);
  assert.equal(valid.readings[0].format, 'YWW');
  assert.equal(valid.readings[0].year, 2024);
  assert.equal(valid.readings[0].workWeek, 15);
  assert.equal(valid.readings[0].startDate, '2024-04-08');
  assert.equal(valid.readings[0].endDate, '2024-04-14');

  const rolledBack = decodeDateCode('812', { referenceYear: 2026 });
  assert.equal(rolledBack.ok, true);
  assert.equal(rolledBack.readings[0].year, 2018);

  const w54 = decodeDateCode('454', { referenceYear: 2026 });
  assert.equal(w54.ok, false);
  assert.match(w54.error, /outside the valid ISO week range/);

  const noW53 = decodeDateCode('153', { referenceYear: 2026 });
  assert.equal(noW53.ok, false);
  assert.match(noW53.error, /2021 has only 52 ISO weeks/);

  const validW53 = decodeDateCode('053', { referenceYear: 2026 });
  assert.equal(validW53.ok, true);
  assert.equal(validW53.readings[0].year, 2020);
  assert.equal(validW53.readings[0].startDate, '2020-12-28');
});

test('4-digit date codes return parallel YYWW, WWYY, YYMM readings and century candidates', () => {
  const ambig = decodeDateCode('2410', { century: 2000, referenceYear: 2026 });
  assert.equal(ambig.ok, true);
  assert.equal(ambig.ambiguous, true);
  assert.deepEqual(
    ambig.readings.map((r) => r.format),
    ['YYWW', 'WWYY', 'YYMM']
  );

  const yyww = ambig.readings[0];
  assert.equal(yyww.year, 2024);
  assert.equal(yyww.workWeek, 10);
  assert.equal(yyww.startDate, '2024-03-04');
  assert.equal(yyww.endDate, '2024-03-10');
  assert.deepEqual(
    yyww.centuryCandidates.map((c) => c.year),
    [2024, 1924]
  );

  const wwyy = ambig.readings[1];
  assert.equal(wwyy.year, 2010);
  assert.equal(wwyy.workWeek, 24);

  const yymm = ambig.readings[2];
  assert.equal(yymm.monthName, 'October');
  assert.equal(yymm.startDate, '2024-10-01');
  assert.equal(yymm.endDate, '2024-10-31');

  const hist = decodeDateCode('9843', { century: 1900, referenceYear: 2026 });
  assert.equal(hist.ok, true);
  assert.equal(hist.readings[0].year, 1998);
  assert.equal(hist.readings[0].centuryCandidates[1].year, 2098);
});

test('4-digit date codes reject W54 and nonexistent ISO week 53', () => {
  const illegalAll = decodeDateCode('5454', { referenceYear: 2026 });
  assert.equal(illegalAll.ok, false);
  assert.equal(illegalAll.readings.length, 0);

  const check2153 = decodeDateCode('2153', { century: 2000, referenceYear: 2026 });
  // YYWW (2021-W53) must be rejected because 2021 only has 52 ISO weeks; WWYY (2053-W21) remains with future warning
  assert.equal(check2153.readings.some((r) => r.format === 'YYWW'), false);
  assert.equal(check2153.rejectedReadings.some((r) => r.format === 'YYWW' && /2021 has no ISO week 53/.test(r.reason)), true);
  assert.equal(check2153.readings[0].format, 'WWYY');
  assert.equal(check2153.readings[0].warning, true);
});

test('5-digit YYDDD Julian date handles leap years, century 1900 vs 2000, and rejects day 367', () => {
  const leap = decodeDateCode('24366', { century: 2000, referenceYear: 2026 });
  assert.equal(leap.ok, true);
  assert.equal(leap.readings[0].date, '2024-12-31');

  const nonLeap = decodeDateCode('23366', { century: 2000, referenceYear: 2026 });
  assert.equal(nonLeap.ok, false);
  assert.match(nonLeap.error, /Day 366 does not exist in non-leap year 2023/);

  const day367 = decodeDateCode('24367', { century: 2000, referenceYear: 2026 });
  assert.equal(day367.ok, false);
  assert.match(day367.error, /outside the valid Julian day range/);

  // 2000 was a leap year, 1900 was not
  const y2k = decodeDateCode('00366', { century: 2000, referenceYear: 2026 });
  assert.equal(y2k.ok, true);
  assert.equal(y2k.readings[0].date, '2000-12-31');
  assert.equal(y2k.readings[0].centuryCandidates[1].year, 1900);
  assert.equal(y2k.readings[0].centuryCandidates[1].validOrdinalDay, false);

  const y1900 = decodeDateCode('00366', { century: 1900, referenceYear: 2026 });
  assert.equal(y1900.ok, false);
});

test('onsemi AND8002/D 12-year two-letter decoder matches all 2006-2030 table rows and worked examples', () => {
  const gj = decodeOnsemiTwoLetter('GJ', { referenceYear: 2026 });
  assert.equal(gj.ok, true);
  assert.equal(gj.workWeek, 10);
  assert.deepEqual(
    gj.cycleCandidates.map((c) => c.year),
    [1993, 2005, 2017, 2029]
  );

  const sl = decodeOnsemiTwoLetter('SL', { referenceYear: 2026 });
  assert.equal(sl.ok, true);
  assert.equal(sl.workWeek, 12);
  assert.equal(sl.cycleCandidates.some((c) => c.year === 2010), true);
  assert.equal(sl.cycleCandidates.some((c) => c.year === 2022), true);

  // Verify every single row of ONSEMI_AND8002_TABLE (2006..2030)
  for (const row of ONSEMI_AND8002_TABLE) {
    const h1Start = decodeOnsemiTwoLetter(row.weeks1To26.slice(0, 2), { referenceYear: 2026 });
    const h1End = decodeOnsemiTwoLetter(row.weeks1To26.slice(3, 5), { referenceYear: 2026 });
    const h2Start = decodeOnsemiTwoLetter(row.weeks27To52.slice(0, 2), { referenceYear: 2026 });
    const h2End = decodeOnsemiTwoLetter(row.weeks27To52.slice(3, 5), { referenceYear: 2026 });
    assert.equal(h1Start.workWeek, 1);
    assert.equal(h1End.workWeek, 26);
    assert.equal(h2Start.workWeek, 27);
    assert.equal(h2End.workWeek, 52);
    assert.equal(h1Start.cycleCandidates.some((c) => c.year === row.year), true);
    assert.equal(h2End.cycleCandidates.some((c) => c.year === row.year), true);
  }

  // O and Q skipped in 1st position, but valid in 2nd position (week 15 and week 17)
  assert.equal(decodeOnsemiTwoLetter('OA').ok, false);
  assert.equal(decodeOnsemiTwoLetter('QA').ok, false);
  assert.equal(decodeOnsemiTwoLetter('AO').workWeek, 15);
  assert.equal(decodeOnsemiTwoLetter('AQ').workWeek, 17);
});

test('National Semiconductor SNOA039C 6-week period decoder matches all 9 legal periods and rejects others', () => {
  assert.equal(NSC_SNOA039C_PERIODS.length, 9);

  const p0012 = decodeNationalSixWeek('0012', { century: 2000, referenceYear: 2026 });
  assert.equal(p0012.ok, true);
  assert.equal(p0012.oneDigitPeriodCode, '2');
  assert.equal(p0012.weeksCovered, '12 - 17');
  assert.equal(p0012.maxPlainYywwUnderstatementWeeks, 5);
  assert.equal(p0012.primaryCandidate.year, 2000);

  const p9948 = decodeNationalSixWeek('9948', { century: 1900, referenceYear: 2026 });
  assert.equal(p9948.ok, true);
  assert.equal(p9948.oneDigitPeriodCode, '8');
  assert.equal(p9948.weeksCovered, '48 - 51');
  assert.equal(p9948.maxPlainYywwUnderstatementWeeks, 3);
  assert.equal(p9948.primaryCandidate.year, 1999);

  const p2252 = decodeNationalSixWeek('2252', { century: 2000, referenceYear: 2026 });
  assert.equal(p2252.ok, true);
  assert.equal(p2252.wrapsIntoNextYear, true);
  assert.equal(p2252.primaryCandidate.year, 2022);
  assert.equal(p2252.primaryCandidate.endYear, 2023);

  const illegal = decodeNationalSixWeek('0014', { century: 2000, referenceYear: 2026 });
  assert.equal(illegal.ok, false);
  assert.match(illegal.error, /not a legal National Semiconductor SNOA039C period code/);
});

test('STM32 part number decoder accurately decodes datasheet-verified and generic part numbers', () => {
  const f103 = decodeStm32('STM32F103C8T6');
  assert.equal(f103.ok, true);
  assert.equal(f103.verified, true);
  assert.equal(f103.family.doc, 'DS5319 Rev 20');
  assert.equal(f103.family.core, 'Arm Cortex-M3');
  assert.equal(f103.pinCount.value, '48 pins');
  assert.equal(f103.flashSize.value, '64 KB');
  assert.equal(f103.package.value, 'LQFP');
  assert.equal(f103.temperatureRange.value, '-40 to 85 °C ambient');
  assert.equal(f103.packing.code, '');

  const g030 = decodeStm32('STM32G030F6P6TR');
  assert.equal(g030.ok, true);
  assert.equal(g030.verified, true);
  assert.equal(g030.family.doc, 'DS12991 Rev 6');
  assert.equal(g030.family.core, 'Arm Cortex-M0+');
  assert.equal(g030.pinCount.value, '20 pins');
  assert.equal(g030.flashSize.value, '32 KB');
  assert.equal(g030.package.value, 'TSSOP');
  assert.equal(g030.temperatureRange.value, '-40 to 85 °C ambient (105 °C junction)');
  assert.equal(g030.packing.value, 'Tape and reel');

  const h743 = decodeStm32('STM32H743VIT6');
  assert.equal(h743.ok, true);
  assert.equal(h743.verified, true);
  assert.equal(h743.family.doc, 'DS12110 Rev 11');
  assert.equal(h743.family.core, 'Arm Cortex-M7, 480 MHz');
  assert.equal(h743.pinCount.value, '100 pins');
  assert.equal(h743.flashSize.value, '2 MB');
  assert.equal(h743.package.value, 'LQFP');
  assert.equal(h743.temperatureRange.value, '-40 to 85 °C');

  const g564q = decodeStm32('STM32G564RET6QTR');
  assert.equal(g564q.ok, true);
  assert.equal(g564q.option.code, 'Q');
  assert.match(g564q.option.value, /SMPS/);
  assert.equal(g564q.packing.code, 'TR');

  const shorthand = decodeStm32('f103-cb-t6');
  assert.equal(shorthand.input, 'STM32F103CBT6');
  assert.equal(shorthand.flashSize.value, '128 KB');

  const generic = decodeStm32('STM32U575RIT6');
  assert.equal(generic.ok, true);
  assert.equal(generic.verified, false);
  assert.equal(generic.notes.length > 0, true);

  const badStm8 = decodeStm32('STM8S103F3P6');
  assert.equal(badStm8.ok, false);
  assert.match(badStm8.err, /STM8 is ST's 8-bit family/);

  const badWireless = decodeStm32('STM32WB55CCU6');
  assert.equal(badWireless.ok, false);
  assert.match(badWireless.err, /different field layout/);
});

test('Node CLI handles JSON and text output with proper exit codes', () => {
  const stmJson = JSON.parse(
    execFileSync(process.execPath, [BIN_PATH, 'STM32G030F6P6TR', '--json'], { encoding: 'utf8' })
  );
  assert.equal(stmJson.ok, true);
  assert.equal(stmJson.packing.value, 'Tape and reel');

  const dcText = execFileSync(process.execPath, [BIN_PATH, '0012', '--ref-year', '2026'], { encoding: 'utf8' });
  assert.match(dcText, /NSC_SNOA039C_6WEEK/);
  assert.match(dcText, /2000-03-20 to 2000-03-26/);

  const invalidRun = spawnSync(process.execPath, [BIN_PATH, '24367'], { encoding: 'utf8' });
  assert.equal(invalidRun.status, 1);
  assert.match(invalidRun.stdout, /INVALID/);
});


test('IC Top Marking lookup resolves cryptic SMD codes, wildcards, and companion date tokens', () => {
  const zakx = lookupTopMarking('ZAKX');
  assert.equal(zakx.ok, true);
  assert.equal(zakx.matches[0].mpn, 'TPL5010DDCR');

  const multi = lookupTopMarking('PTSI 2418');
  assert.equal(multi.ok, true);
  assert.match(multi.matches[0].mpn, /TPS62130RGTR/);
  assert.deepEqual(multi.dateTokens, ['2418']);

  const wc = lookupTopMarking('AJ3K');
  assert.equal(wc.ok, true);
  assert.equal(wc.matches[0].mpn, 'MCP4725A0T-E/CH');
});
