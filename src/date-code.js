/**
 * Zero-dependency IC Date Code & Lot Marking Decoder.
 *
 * Covers:
 * 1. Numeric markings: 3-digit (YWW), 4-digit parallel readings (YYWW, WWYY, YYMM),
 *    5-digit Julian/ordinal dates (YYDDD), and supplier notation (YY+).
 * 2. onsemi 12-year repeating two-letter date codes per AND8002/D Rev. 13 (Sep 2023), Tables 3 & 4.
 * 3. National Semiconductor (TI) 6-week assembly period codes per SNOA039C (May 2004, rev. Jul 2005), Tables 1-6.
 */

const DAY_MS = 86_400_000;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * 24 first-character letters used by onsemi AND8002/D (O and Q are skipped).
 * Index 0 ('A') corresponds to H1 of 2002 / 2014 / 2026.
 */
export const ONSEMI_FIRST_LETTERS = 'ABCDEFGHIJKLMNPRSTUVWXYZ';

/**
 * Verbatim 2006-2030 reference rows transcribed from onsemi AND8002/D Rev. 13, Tables 3 & 4.
 */
export const ONSEMI_AND8002_TABLE = [
  { year: 2006, weeks1To26: 'IA-IZ', weeks27To52: 'JA-JZ' },
  { year: 2007, weeks1To26: 'KA-KZ', weeks27To52: 'LA-LZ' },
  { year: 2008, weeks1To26: 'MA-MZ', weeks27To52: 'NA-NZ' },
  { year: 2009, weeks1To26: 'PA-PZ', weeks27To52: 'RA-RZ' },
  { year: 2010, weeks1To26: 'SA-SZ', weeks27To52: 'TA-TZ' },
  { year: 2011, weeks1To26: 'UA-UZ', weeks27To52: 'VA-VZ' },
  { year: 2012, weeks1To26: 'WA-WZ', weeks27To52: 'XA-XZ' },
  { year: 2013, weeks1To26: 'YA-YZ', weeks27To52: 'ZA-ZZ' },
  { year: 2014, weeks1To26: 'AA-AZ', weeks27To52: 'BA-BZ' },
  { year: 2015, weeks1To26: 'CA-CZ', weeks27To52: 'DA-DZ' },
  { year: 2016, weeks1To26: 'EA-EZ', weeks27To52: 'FA-FZ' },
  { year: 2017, weeks1To26: 'GA-GZ', weeks27To52: 'HA-HZ' },
  { year: 2018, weeks1To26: 'IA-IZ', weeks27To52: 'JA-JZ' },
  { year: 2019, weeks1To26: 'KA-KZ', weeks27To52: 'LA-LZ' },
  { year: 2020, weeks1To26: 'MA-MZ', weeks27To52: 'NA-NZ' },
  { year: 2021, weeks1To26: 'PA-PZ', weeks27To52: 'RA-RZ' },
  { year: 2022, weeks1To26: 'SA-SZ', weeks27To52: 'TA-TZ' },
  { year: 2023, weeks1To26: 'UA-UZ', weeks27To52: 'VA-VZ' },
  { year: 2024, weeks1To26: 'WA-WZ', weeks27To52: 'XA-XZ' },
  { year: 2025, weeks1To26: 'YA-YZ', weeks27To52: 'ZA-ZZ' },
  { year: 2026, weeks1To26: 'AA-AZ', weeks27To52: 'BA-BZ' },
  { year: 2027, weeks1To26: 'CA-CZ', weeks27To52: 'DA-DZ' },
  { year: 2028, weeks1To26: 'EA-EZ', weeks27To52: 'FA-FZ' },
  { year: 2029, weeks1To26: 'GA-GZ', weeks27To52: 'HA-HZ' },
  { year: 2030, weeks1To26: 'IA-IZ', weeks27To52: 'JA-JZ' },
];

/**
 * Verbatim 9 legal 6-week period codes from National Semiconductor SNOA039C (May 2004, rev. Jul 2005).
 */
export const NSC_SNOA039C_PERIODS = [
  { twoDigitCode: '52', oneDigitCode: '9', startWeek: 52, endWeek: 5, wrapsIntoNextYear: true, weeksCovered: '52 - 5 (wraps into the next year)' },
  { twoDigitCode: '06', oneDigitCode: '1', startWeek: 6, endWeek: 11, wrapsIntoNextYear: false, weeksCovered: '6 - 11' },
  { twoDigitCode: '12', oneDigitCode: '2', startWeek: 12, endWeek: 17, wrapsIntoNextYear: false, weeksCovered: '12 - 17' },
  { twoDigitCode: '18', oneDigitCode: '3', startWeek: 18, endWeek: 23, wrapsIntoNextYear: false, weeksCovered: '18 - 23' },
  { twoDigitCode: '24', oneDigitCode: '4', startWeek: 24, endWeek: 29, wrapsIntoNextYear: false, weeksCovered: '24 - 29' },
  { twoDigitCode: '30', oneDigitCode: '5', startWeek: 30, endWeek: 35, wrapsIntoNextYear: false, weeksCovered: '30 - 35' },
  { twoDigitCode: '36', oneDigitCode: '6', startWeek: 36, endWeek: 41, wrapsIntoNextYear: false, weeksCovered: '36 - 41' },
  { twoDigitCode: '42', oneDigitCode: '7', startWeek: 42, endWeek: 47, wrapsIntoNextYear: false, weeksCovered: '42 - 47' },
  { twoDigitCode: '48', oneDigitCode: '8', startWeek: 48, endWeek: 51, wrapsIntoNextYear: false, weeksCovered: '48 - 51' },
];

export function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function isoWeeksInYear(year) {
  const jan1 = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  return jan1 === 4 || (jan1 === 3 && isLeapYear(year)) ? 53 : 52;
}

export function isoWeekRange(year, week) {
  if (!Number.isInteger(year) || !Number.isInteger(week)) return null;
  if (week < 1 || week > isoWeeksInYear(year)) return null;
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dow = (jan4.getUTCDay() + 6) % 7; // Monday = 0 .. Sunday = 6
  const week1MonMs = jan4.getTime() - dow * DAY_MS;
  const mon = new Date(week1MonMs + (week - 1) * 7 * DAY_MS);
  const sun = new Date(mon.getTime() + 6 * DAY_MS);
  const startDate = mon.toISOString().slice(0, 10);
  const endDate = sun.toISOString().slice(0, 10);
  return {
    startDate,
    endDate,
    formatted: `${startDate} to ${endDate}`,
  };
}

function isoWeekOfUtcDate(dateObj) {
  const dow = (dateObj.getUTCDay() + 6) % 7;
  const thursday = new Date(dateObj.getTime() + (3 - dow) * DAY_MS);
  const isoYear = thursday.getUTCFullYear();
  const jan4 = new Date(Date.UTC(isoYear, 0, 4));
  const jan4Dow = (jan4.getUTCDay() + 6) % 7;
  const week1MonMs = jan4.getTime() - jan4Dow * DAY_MS;
  const isoWeek = Math.floor((dateObj.getTime() - week1MonMs) / (7 * DAY_MS)) + 1;
  return { isoYear, isoWeek };
}

function daysInMonth(year, month1To12) {
  return new Date(Date.UTC(year, month1To12, 0)).getUTCDate();
}

function normalizeCentury(century) {
  const c = Number(century ?? 2000);
  return c === 1900 ? 1900 : 2000;
}

function normalizeReferenceYear(referenceYear) {
  if (referenceYear !== undefined && referenceYear !== null) {
    const y = Number(referenceYear);
    if (Number.isInteger(y) && y >= 1970 && y <= 2100) return y;
  }
  return new Date().getUTCFullYear();
}

function centuryPair(yy, preferredCentury) {
  const base = normalizeCentury(preferredCentury);
  const other = base === 2000 ? 1900 : 2000;
  return [base + yy, other + yy];
}

/**
 * Decode an onsemi 2-letter date code per AND8002/D Rev. 13 (Tables 3 & 4).
 */
export function decodeOnsemiTwoLetter(raw, options = {}) {
  const input = String(raw ?? '').trim().toUpperCase();
  const referenceYear = normalizeReferenceYear(options.referenceYear);
  const baseResult = {
    input,
    ok: false,
    scheme: 'ONSEMI_AND8002_2LETTER',
    source: 'onsemi AND8002/D Rev. 13 (September 2023), Tables 3 & 4',
    referenceUrl: 'https://www.partvane.com/tools/date-code-formats/',
  };

  if (!/^[A-Z]{2}$/.test(input)) {
    return {
      ...baseResult,
      error: 'onsemi two-letter date codes must be exactly two letters A-Z (e.g. GJ, SL, WA).',
    };
  }

  const first = input[0];
  const second = input[1];

  if (first === 'O' || first === 'Q') {
    return {
      ...baseResult,
      error: `First character '${first}' is not valid in onsemi AND8002/D: letters O and Q are skipped so the remaining 24 letters form a 12-year cycle (2 letters per year).`,
    };
  }

  const idx1 = ONSEMI_FIRST_LETTERS.indexOf(first);
  const yearOffset = Math.floor(idx1 / 2); // 0..11 relative to 2002 / 2014 / 2026
  const half = (idx1 % 2) + 1;             // 1 = Weeks 1-26, 2 = Weeks 27-52
  const weekInHalf = second.charCodeAt(0) - 65 + 1;
  const workWeek = (half === 1 ? 0 : 26) + weekInHalf;

  const cycleBases = [1990, 2002, 2014, 2026];
  const cycleCandidates = cycleBases.map((cycleStart) => {
    const year = cycleStart + yearOffset;
    const range = isoWeekRange(year, workWeek);
    return {
      year,
      workWeek,
      startDate: range.startDate,
      endDate: range.endDate,
      inAnd8002Rev13Table: year >= 2006 && year <= 2030,
      isFuture: year > referenceYear,
    };
  });

  return {
    ...baseResult,
    ok: true,
    firstLetter: first,
    secondLetter: second,
    halfOfYear: half,
    halfRangeWeeks: half === 1 ? '1-26' : '27-52',
    weekInHalf,
    workWeek,
    cycleLengthYears: 12,
    cycleCandidates,
    notes: [
      `Only 24 first-position letters are used (O and Q skipped), so '${input}' repeats every 12 years (${cycleCandidates.map((c) => c.year).join(', ')}, W${String(workWeek).padStart(2, '0')}).`,
      'Scope: onsemi ECLinPS and clock/data small packages per AND8002/D. Device-specific datasheet marking diagrams take precedence where they differ.',
    ],
  };
}

/**
 * Look up a National Semiconductor 6-week period definition by 2-digit ('06'..'52') or 1-digit ('1'..'9') code.
 */
export function lookupNationalPeriod(periodCode) {
  const s = String(periodCode ?? '').trim();
  if (/^[0-9]{2}$/.test(s)) {
    return NSC_SNOA039C_PERIODS.find((p) => p.twoDigitCode === s) || null;
  }
  if (/^[1-9]$/.test(s)) {
    return NSC_SNOA039C_PERIODS.find((p) => p.oneDigitCode === s) || null;
  }
  return null;
}

/**
 * Decode a National Semiconductor (now TI) 4-digit 6-week assembly period code per SNOA039C.
 */
export function decodeNationalSixWeek(raw, options = {}) {
  const input = String(raw ?? '').trim().toUpperCase();
  const century = normalizeCentury(options.century);
  const referenceYear = normalizeReferenceYear(options.referenceYear);
  const baseResult = {
    input,
    ok: false,
    scheme: 'NSC_SNOA039C_6WEEK',
    source: 'National Semiconductor SNOA039C (May 2004, revised July 2005), Tables 1-6',
    referenceUrl: 'https://www.partvane.com/tools/date-code-formats/',
  };

  if (!/^[0-9]{4}$/.test(input)) {
    return {
      ...baseResult,
      error: 'National Semiconductor 4-digit date codes must be 4 digits YYPP where PP is one of the 9 legal six-week period codes (06, 12, 18, 24, 30, 36, 42, 48, 52).',
    };
  }

  const yy = parseInt(input.slice(0, 2), 10);
  const pp = input.slice(2, 4);
  const period = lookupNationalPeriod(pp);

  if (!period) {
    return {
      ...baseResult,
      error: `Week digits '${pp}' are not a legal National Semiconductor SNOA039C period code. Only 06, 12, 18, 24, 30, 36, 42, 48, and 52 can appear.`,
    };
  }

  const candidateYears = centuryPair(yy, century);
  const centuryCandidates = candidateYears.map((year) => {
    const startRange = isoWeekRange(year, period.startWeek);
    const endYear = period.wrapsIntoNextYear ? year + 1 : year;
    const endRange = isoWeekRange(endYear, period.endWeek);
    return {
      century: Math.floor(year / 100) * 100,
      year,
      startWeek: period.startWeek,
      endWeek: period.endWeek,
      endYear,
      wrapsIntoNextYear: period.wrapsIntoNextYear,
      startDate: startRange.startDate,
      endDate: endRange.endDate,
      isFuture: year > referenceYear,
    };
  });

  const primary = centuryCandidates[0];
  const maxUnderstatementWeeks = period.twoDigitCode === '48' ? 3 : 5;

  return {
    ...baseResult,
    ok: true,
    yearDigits: input.slice(0, 2),
    twoDigitPeriodCode: period.twoDigitCode,
    oneDigitPeriodCode: period.oneDigitCode,
    startWeek: period.startWeek,
    endWeek: period.endWeek,
    wrapsIntoNextYear: period.wrapsIntoNextYear,
    weeksCovered: period.weeksCovered,
    maxPlainYywwUnderstatementWeeks: maxUnderstatementWeeks,
    primaryCandidate: primary,
    centuryCandidates,
    notes: [
      `On National Semiconductor parts (LM, LF, LMC, DS, ADC prefixes), '${pp}' is the starting week of assembly period '${period.weeksCovered}' (1-digit code '${period.oneDigitCode}'), not a single work week.`,
      `Reading '${input}' as plain YYWW understates the assembly date by up to ${maxUnderstatementWeeks} weeks.`,
      'Caution (SNOA039C): On small packages (SOT-23, SOT-223, SC70, SC90), the top 4 characters are device ID + grade, NOT a date code (their date code is on the package underside).',
    ],
  };
}

/**
 * Unified IC Date Code & Lot Marking Decoder.
 *
 * Options:
 * - century: 2000 (default) or 1900
 * - referenceYear: integer year (defaults to current UTC year)
 * - scheme: 'auto' (default) | 'numeric' | 'onsemi' | 'nsc'
 */
export function decodeDateCode(raw, options = {}) {
  const input = String(raw ?? '').trim().toUpperCase();
  const century = normalizeCentury(options.century);
  const referenceYear = normalizeReferenceYear(options.referenceYear);
  const scheme = String(options.scheme ?? 'auto').toLowerCase();

  if (!input) {
    return {
      input: '',
      ok: false,
      century,
      referenceYear,
      readings: [],
      rejectedReadings: [],
      manufacturerSpecific: null,
      error: 'Empty date code input.',
    };
  }

  if (scheme === 'onsemi') {
    const onsemi = decodeOnsemiTwoLetter(input, { referenceYear });
    return {
      input,
      ok: onsemi.ok,
      century,
      referenceYear,
      readings: onsemi.ok ? [{ format: 'ONSEMI_AND8002_2LETTER', ...onsemi }] : [],
      rejectedReadings: onsemi.ok ? [] : [{ format: 'ONSEMI_AND8002_2LETTER', reason: onsemi.error }],
      manufacturerSpecific: { onsemiAnd8002: onsemi },
      shareUrl: 'https://www.partvane.com/tools/date-code-formats/',
      ...(onsemi.ok ? {} : { error: onsemi.error }),
    };
  }

  if (scheme === 'nsc') {
    const nsc = decodeNationalSixWeek(input, { century, referenceYear });
    return {
      input,
      ok: nsc.ok,
      century,
      referenceYear,
      readings: nsc.ok ? [{ format: 'NSC_SNOA039C_6WEEK', ...nsc }] : [],
      rejectedReadings: nsc.ok ? [] : [{ format: 'NSC_SNOA039C_6WEEK', reason: nsc.error }],
      manufacturerSpecific: { nscSnoa039c: nsc },
      shareUrl: 'https://www.partvane.com/tools/date-code-formats/',
      ...(nsc.ok ? {} : { error: nsc.error }),
    };
  }

  // Two-letter alphabetic code in auto mode -> onsemi AND8002/D lookup
  if (scheme === 'auto' && /^[A-Z]{2}$/.test(input)) {
    const onsemi = decodeOnsemiTwoLetter(input, { referenceYear });
    return {
      input,
      ok: onsemi.ok,
      century,
      referenceYear,
      readings: onsemi.ok ? [{ format: 'ONSEMI_AND8002_2LETTER', ...onsemi }] : [],
      rejectedReadings: onsemi.ok ? [] : [{ format: 'ONSEMI_AND8002_2LETTER', reason: onsemi.error }],
      manufacturerSpecific: { onsemiAnd8002: onsemi },
      shareUrl: 'https://www.partvane.com/tools/date-code-formats/',
      ...(onsemi.ok ? {} : { error: onsemi.error }),
    };
  }

  const shareUrl = `https://www.partvane.com/tools/date-code-decoder/?c=${encodeURIComponent(input)}&century=${century}`;

  // Supplier stock-list notation YY+ (e.g. "22+")
  if (/^[0-9]{2}\+$/.test(input)) {
    const yy = parseInt(input.slice(0, 2), 10);
    const candidates = centuryPair(yy, century);
    return {
      input,
      ok: true,
      century,
      referenceYear,
      readings: [
        {
          format: 'YY_PLUS',
          label: 'Supplier year notation (not a package marking standard)',
          year: candidates[0],
          centuryCandidates: candidates.map((year) => ({
            century: Math.floor(year / 100) * 100,
            year,
            meaning: `${year} or newer`,
          })),
          warning: candidates[0] > referenceYear,
          note: `Suppliers use '${input}' on stock lists to mean ${candidates[0]} or later. Confirm actual lot date codes before purchase.`,
        },
      ],
      rejectedReadings: [],
      manufacturerSpecific: null,
      shareUrl,
    };
  }

  const readings = [];
  const rejectedReadings = [];
  let manufacturerSpecific = null;

  // 3-digit numeric: YWW
  if (/^[0-9]{3}$/.test(input)) {
    const y = parseInt(input[0], 10);
    const ww = parseInt(input.slice(1), 10);
    if (ww < 1 || ww > 53) {
      rejectedReadings.push({
        format: 'YWW',
        reason: `Work week ${String(ww).padStart(2, '0')} is outside the valid ISO week range (01-53).`,
      });
    } else {
      const currentDecade = Math.floor(referenceYear / 10) * 10;
      const assumedYear = currentDecade + y > referenceYear ? currentDecade - 10 + y : currentDecade + y;
      const decadeYears = [assumedYear, assumedYear - 10, assumedYear - 20, assumedYear - 30];
      const decadeCandidates = decadeYears.map((yr) => {
        const range = isoWeekRange(yr, ww);
        return {
          year: yr,
          workWeek: ww,
          validIsoWeek: Boolean(range),
          startDate: range ? range.startDate : null,
          endDate: range ? range.endDate : null,
          isoWeeksInYear: isoWeeksInYear(yr),
        };
      });

      const primaryRange = isoWeekRange(assumedYear, ww);
      if (!primaryRange) {
        const validAltYears = decadeCandidates.filter((c) => c.validIsoWeek).map((c) => c.year);
        rejectedReadings.push({
          format: 'YWW',
          reason: `${assumedYear} has only ${isoWeeksInYear(assumedYear)} ISO weeks (no ISO week 53).` +
            (validAltYears.length ? ` Earlier 10-year cycle year(s) with week 53: ${validAltYears.join(', ')}.` : ''),
          decadeCandidates,
        });
      } else {
        readings.push({
          format: 'YWW',
          label: 'Single-digit year then work week',
          year: assumedYear,
          workWeek: ww,
          startDate: primaryRange.startDate,
          endDate: primaryRange.endDate,
          isoCalendarRange: primaryRange.formatted,
          decadeCandidates,
          warning: false,
          note: `Single-digit year '${y}' repeats every 10 years (${decadeYears.slice(0, 3).join(', ')}).`,
        });
      }
    }
  } else if (/^[0-9]{4}$/.test(input)) {
    // 4-digit numeric: parallel evaluation of YYWW, WWYY, YYMM
    const firstTwo = parseInt(input.slice(0, 2), 10);
    const lastTwo = parseInt(input.slice(2, 4), 10);

    // 1) YYWW
    if (lastTwo < 1 || lastTwo > 53) {
      rejectedReadings.push({
        format: 'YYWW',
        reason: `Work week ${String(lastTwo).padStart(2, '0')} is outside the valid ISO week range (01-53).`,
      });
    } else {
      const ys = centuryPair(firstTwo, century);
      const centuryCandidates = ys.map((yr) => {
        const range = isoWeekRange(yr, lastTwo);
        return {
          century: Math.floor(yr / 100) * 100,
          year: yr,
          workWeek: lastTwo,
          validIsoWeek: Boolean(range),
          isoWeeksInYear: isoWeeksInYear(yr),
          startDate: range ? range.startDate : null,
          endDate: range ? range.endDate : null,
          isFuture: yr > referenceYear,
        };
      });
      const primary = centuryCandidates[0];
      if (!primary.validIsoWeek) {
        rejectedReadings.push({
          format: 'YYWW',
          reason: `${primary.year} has no ISO week ${lastTwo} (${primary.year} has ${primary.isoWeeksInYear} ISO weeks).`,
          centuryCandidates,
        });
      } else {
        readings.push({
          format: 'YYWW',
          label: 'Year then work week',
          year: primary.year,
          workWeek: lastTwo,
          startDate: primary.startDate,
          endDate: primary.endDate,
          isoCalendarRange: `${primary.startDate} to ${primary.endDate}`,
          centuryCandidates,
          warning: primary.isFuture,
          note: primary.isFuture
            ? `Gives future year ${primary.year} under ${century}s assumption (alternate century: ${centuryCandidates[1].year}).`
            : `Two year digits do not carry a century: '${input}' can also represent ${centuryCandidates[1].year} under 1900-1999 / 2000-2099 ambiguity.`,
        });
      }
    }

    // 2) WWYY
    if (firstTwo < 1 || firstTwo > 53) {
      rejectedReadings.push({
        format: 'WWYY',
        reason: `Leading digits ${String(firstTwo).padStart(2, '0')} are outside the valid ISO week range (01-53).`,
      });
    } else {
      const ys = centuryPair(lastTwo, century);
      const centuryCandidates = ys.map((yr) => {
        const range = isoWeekRange(yr, firstTwo);
        return {
          century: Math.floor(yr / 100) * 100,
          year: yr,
          workWeek: firstTwo,
          validIsoWeek: Boolean(range),
          isoWeeksInYear: isoWeeksInYear(yr),
          startDate: range ? range.startDate : null,
          endDate: range ? range.endDate : null,
          isFuture: yr > referenceYear,
        };
      });
      const primary = centuryCandidates[0];
      if (!primary.validIsoWeek) {
        rejectedReadings.push({
          format: 'WWYY',
          reason: `${primary.year} has no ISO week ${firstTwo} (${primary.year} has ${primary.isoWeeksInYear} ISO weeks).`,
          centuryCandidates,
        });
      } else {
        readings.push({
          format: 'WWYY',
          label: 'Work week then year',
          year: primary.year,
          workWeek: firstTwo,
          startDate: primary.startDate,
          endDate: primary.endDate,
          isoCalendarRange: `${primary.startDate} to ${primary.endDate}`,
          centuryCandidates,
          warning: primary.isFuture,
          note: primary.isFuture
            ? `Gives future year ${primary.year}; unlikely unless reading 19xx stock (${centuryCandidates[1].year}).`
            : 'Used on some commercial components and bare PCBs. Ambiguous with YYWW when both halves are 01-52.',
        });
      }
    }

    // 3) YYMM
    if (lastTwo < 1 || lastTwo > 12) {
      rejectedReadings.push({
        format: 'YYMM',
        reason: `Trailing digits ${String(lastTwo).padStart(2, '0')} are outside the valid month range (01-12).`,
      });
    } else {
      const ys = centuryPair(firstTwo, century);
      const monthName = MONTH_NAMES[lastTwo - 1];
      const centuryCandidates = ys.map((yr) => {
        const lastDay = daysInMonth(yr, lastTwo);
        const mmStr = String(lastTwo).padStart(2, '0');
        return {
          century: Math.floor(yr / 100) * 100,
          year: yr,
          month: lastTwo,
          monthName,
          startDate: `${yr}-${mmStr}-01`,
          endDate: `${yr}-${mmStr}-${String(lastDay).padStart(2, '0')}`,
          isFuture: yr > referenceYear,
        };
      });
      const primary = centuryCandidates[0];
      readings.push({
        format: 'YYMM',
        label: 'Year then month',
        year: primary.year,
        month: lastTwo,
        monthName,
        startDate: primary.startDate,
        endDate: primary.endDate,
        calendarRange: `${primary.startDate} to ${primary.endDate}`,
        centuryCandidates,
        warning: primary.isFuture,
        note: 'Applies only when the manufacturer explicitly documents a YYMM marking format (e.g. certain passives and connectors).',
      });
    }

    // Check National Semiconductor 6-week period if scheme === 'auto'
    if (scheme === 'auto') {
      const nsc = decodeNationalSixWeek(input, { century, referenceYear });
      if (nsc.ok) {
        manufacturerSpecific = { nscSnoa039c: nsc };
      }
    }
  } else if (/^[0-9]{5}$/.test(input)) {
    // 5-digit numeric: YYDDD Julian (ordinal day of year)
    const yy = parseInt(input.slice(0, 2), 10);
    const ddd = parseInt(input.slice(2, 5), 10);
    if (ddd < 1 || ddd > 366) {
      rejectedReadings.push({
        format: 'YYDDD',
        reason: `Ordinal day ${String(ddd).padStart(3, '0')} is outside the valid Julian day range (001-366).`,
      });
    } else {
      const ys = centuryPair(yy, century);
      const centuryCandidates = ys.map((yr) => {
        const maxDay = isLeapYear(yr) ? 366 : 365;
        if (ddd > maxDay) {
          return {
            century: Math.floor(yr / 100) * 100,
            year: yr,
            dayOfYear: ddd,
            validOrdinalDay: false,
            isLeapYear: isLeapYear(yr),
            date: null,
            isoWeek: null,
            isFuture: yr > referenceYear,
          };
        }
        const dt = new Date(Date.UTC(yr, 0, 1) + (ddd - 1) * DAY_MS);
        const dateStr = dt.toISOString().slice(0, 10);
        const { isoYear, isoWeek } = isoWeekOfUtcDate(dt);
        const wkRange = isoWeekRange(isoYear, isoWeek);
        return {
          century: Math.floor(yr / 100) * 100,
          year: yr,
          dayOfYear: ddd,
          validOrdinalDay: true,
          isLeapYear: isLeapYear(yr),
          date: dateStr,
          isoYear,
          isoWeek,
          isoWeekRange: wkRange ? wkRange.formatted : null,
          isFuture: yr > referenceYear,
        };
      });

      const primary = centuryCandidates[0];
      if (!primary.validOrdinalDay) {
        rejectedReadings.push({
          format: 'YYDDD',
          reason: `Day ${ddd} does not exist in non-leap year ${primary.year}.`,
          centuryCandidates,
        });
      } else {
        readings.push({
          format: 'YYDDD',
          label: 'Julian (ordinal) date',
          year: primary.year,
          dayOfYear: ddd,
          date: primary.date,
          startDate: primary.date,
          endDate: primary.date,
          isoYear: primary.isoYear,
          isoWeek: primary.isoWeek,
          isoCalendarRange: primary.isoWeekRange,
          centuryCandidates,
          warning: primary.isFuture,
          note: '5-digit Julian date specifies an exact ordinal day of the year (001-365, or 366 in leap years).',
        });
      }
    }
  } else {
    return {
      input,
      ok: false,
      century,
      referenceYear,
      readings: [],
      rejectedReadings: [],
      manufacturerSpecific: null,
      shareUrl,
      error:
        'Unsupported date code pattern. Supported inputs: 3-digit (YWW), 4-digit (YYWW/WWYY/YYMM or National Semi SNOA039C), 5-digit (YYDDD Julian), YY+, or 2-letter onsemi (AND8002/D).',
    };
  }

  if (readings.length === 0) {
    return {
      input,
      ok: false,
      century,
      referenceYear,
      readings: [],
      rejectedReadings,
      manufacturerSpecific,
      shareUrl,
      error: rejectedReadings.map((r) => `${r.format}: ${r.reason}`).join(' | ') ||
        `No standard numeric reading of '${input}' produces a valid calendar week, month, or ordinal day.`,
    };
  }

  return {
    input,
    ok: true,
    century,
    referenceYear,
    ambiguous: readings.length > 1,
    readings,
    rejectedReadings,
    manufacturerSpecific,
    shareUrl,
    disclaimer:
      'ISO calendar dates are a reference, not a verified manufacturer production interval. A plausible date code never authenticates a component.',
  };
}
