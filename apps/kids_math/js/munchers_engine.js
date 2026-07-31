/**
 * Number Munchers engine for MathForge Ottawa.
 *
 * Pure logic only (no DOM) so `test/smoke.js` can exercise it in node.
 *
 * A rule pack describes one board goal. Every candidate cell is
 * `{ text, val }` where `text` is what the kid reads and `val` is the numeric
 * meaning of that text. Correctness is ALWAYS decided by `rule.test(val)` —
 * the "wrong answer" generators are only hints, never the source of truth, so
 * a sloppy distractor generator can never put a false cell on the board.
 */

(function(exports) {

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function isPrime(n) {
    if (!Number.isInteger(n) || n < 2) return false;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) return false;
    }
    return true;
  }

  function isSquare(n) {
    if (!Number.isInteger(n) || n < 0) return false;
    const r = Math.round(Math.sqrt(n));
    return r * r === n;
  }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  function nearly(a, b) {
    return Math.abs(a - b) < 1e-9;
  }

  /* ------------------------------------------------------------------ *
   * Rule pack factories
   * ------------------------------------------------------------------ */

  function multiplesRule(n) {
    return {
      id: 'multiples_' + n,
      grade: 'grade3',
      title: 'Multiples of ' + n,
      prompt: 'Munch every number that is a multiple of ' + n + '.',
      strandCode: 'B2.4',
      test: v => Number.isInteger(v) && v > 0 && v % n === 0,
      // Small n needs a taller multiplier range to clear 30 distinct labels.
      correct: () => { const v = n * randInt(1, Math.max(12, Math.ceil(40 / n))); return { text: String(v), val: v }; },
      wrong: () => {
        const v = n * randInt(1, Math.max(12, Math.ceil(40 / n))) + randInt(1, n - 1);
        return { text: String(v), val: v };
      }
    };
  }

  function factorsRule(n) {
    const factors = [];
    for (let d = 1; d <= n; d++) if (n % d === 0) factors.push(d);
    return {
      id: 'factors_' + n,
      grade: 'grade3',
      title: 'Factors of ' + n,
      prompt: 'Munch every number that divides exactly into ' + n + '.',
      strandCode: 'B2.4',
      test: v => Number.isInteger(v) && v > 0 && n % v === 0,
      correct: () => { const v = pick(factors); return { text: String(v), val: v }; },
      // Range runs past n so there are always >30 distinct labels for a board.
      wrong: () => {
        let v;
        do { v = randInt(2, n * 4); } while (n % v === 0);
        return { text: String(v), val: v };
      }
    };
  }

  function sumsRule(target) {
    return {
      id: 'sums_' + target,
      grade: 'grade3',
      title: 'Sums equal to ' + target,
      prompt: 'Munch every expression that equals ' + target + '.',
      strandCode: 'B2.2',
      test: v => v === target,
      correct: () => {
        const a = randInt(1, target - 1);
        return { text: a + ' + ' + (target - a), val: target };
      },
      wrong: () => {
        const a = randInt(1, target);
        const b = randInt(1, target) + (Math.random() < 0.5 ? 1 : -1);
        const sum = a + Math.max(1, b);
        if (sum === target) return { text: a + ' + ' + (Math.max(1, b) + 1), val: sum + 1 };
        return { text: a + ' + ' + Math.max(1, b), val: sum };
      }
    };
  }

  function differencesRule(target) {
    return {
      id: 'differences_' + target,
      grade: 'grade3',
      title: 'Differences equal to ' + target,
      prompt: 'Munch every subtraction that equals ' + target + '.',
      strandCode: 'B2.2',
      test: v => v === target,
      correct: () => {
        const b = randInt(1, 20);
        return { text: (target + b) + ' − ' + b, val: target };
      },
      wrong: () => {
        const b = randInt(1, 20);
        const off = pick([-3, -2, -1, 1, 2, 3]);
        return { text: (target + b + off) + ' − ' + b, val: target + off };
      }
    };
  }

  function evenOddRule(kind) {
    const wantEven = kind === 'even';
    return {
      id: 'parity_' + kind,
      grade: 'grade3',
      title: wantEven ? 'Even numbers' : 'Odd numbers',
      prompt: 'Munch every ' + kind + ' number.',
      strandCode: 'B1.1',
      test: v => Number.isInteger(v) && (v % 2 === 0) === wantEven,
      correct: () => { const v = randInt(1, 99) * 2 - (wantEven ? 0 : 1); return { text: String(v), val: v }; },
      wrong: () => { const v = randInt(1, 99) * 2 - (wantEven ? 1 : 0); return { text: String(v), val: v }; }
    };
  }

  function lessThanRule(limit) {
    return {
      id: 'less_than_' + limit,
      grade: 'grade3',
      title: 'Numbers less than ' + limit,
      prompt: 'Munch every number smaller than ' + limit + '.',
      strandCode: 'B1.3',
      test: v => v < limit,
      correct: () => { const v = randInt(limit - 250, limit - 1); return { text: String(v), val: v }; },
      wrong: () => { const v = randInt(limit, limit + 250); return { text: String(v), val: v }; }
    };
  }

  function halfFractionRule() {
    return {
      id: 'equal_half',
      grade: 'grade3',
      title: 'Fractions equal to 1/2',
      prompt: 'Munch every fraction that is worth one half.',
      strandCode: 'B1.6',
      test: v => nearly(v, 0.5),
      correct: () => { const k = randInt(1, 9); return { text: k + '/' + (2 * k), val: 0.5 }; },
      wrong: () => {
        const den = randInt(3, 12);
        let num = randInt(1, den - 1);
        if (nearly(num / den, 0.5)) num = num === 1 ? 2 : num - 1;
        return { text: num + '/' + den, val: num / den };
      }
    };
  }

  function timesTableRule(n) {
    return {
      id: 'times_table_' + n,
      grade: 'grade3',
      title: 'Products equal to ' + n,
      prompt: 'Munch every multiplication that equals ' + n + '.',
      strandCode: 'B2.4',
      test: v => v === n,
      correct: () => {
        const pairs = [];
        for (let d = 1; d <= n; d++) if (n % d === 0) pairs.push([d, n / d]);
        const p = pick(pairs);
        return { text: p[0] + ' × ' + p[1], val: n };
      },
      wrong: () => {
        let a, b;
        do { a = randInt(2, 12); b = randInt(2, 12); } while (a * b === n);
        return { text: a + ' × ' + b, val: a * b };
      }
    };
  }

  function primesRule() {
    return {
      id: 'primes',
      grade: 'grade8',
      title: 'Prime numbers',
      prompt: 'Munch every prime number (exactly two factors: 1 and itself).',
      strandCode: 'B1.4',
      test: isPrime,
      correct: () => {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        const v = pick(primes);
        return { text: String(v), val: v };
      },
      wrong: () => {
        let v;
        do { v = randInt(4, 99); } while (isPrime(v));
        return { text: String(v), val: v };
      }
    };
  }

  function squaresRule() {
    return {
      id: 'perfect_squares',
      grade: 'grade8',
      title: 'Perfect squares',
      prompt: 'Munch every perfect square.',
      strandCode: 'B1.4',
      test: isSquare,
      correct: () => { const r = randInt(2, 15); return { text: String(r * r), val: r * r }; },
      wrong: () => {
        let v;
        do { v = randInt(5, 225); } while (isSquare(v));
        return { text: String(v), val: v };
      }
    };
  }

  function equivalentFractionRule() {
    const num = pick([1, 2, 3, 2, 3, 4]);
    const den = num + pick([1, 2, 3, 4]);
    const g = gcd(num, den);
    const n0 = num / g, d0 = den / g;
    const target = n0 / d0;
    return {
      id: 'equiv_' + n0 + '_' + d0,
      grade: 'grade8',
      title: 'Fractions equal to ' + n0 + '/' + d0,
      prompt: 'Munch every fraction equivalent to ' + n0 + '/' + d0 + '.',
      strandCode: 'B1.3',
      test: v => nearly(v, target),
      correct: () => { const k = randInt(1, 9); return { text: (n0 * k) + '/' + (d0 * k), val: target }; },
      wrong: () => {
        let a, b;
        do { a = randInt(1, 20); b = randInt(2, 20); } while (nearly(a / b, target));
        return { text: a + '/' + b, val: a / b };
      }
    };
  }

  function integerExpressionRule(target) {
    return {
      id: 'integers_' + target,
      grade: 'grade8',
      title: 'Expressions equal to ' + target,
      prompt: 'Munch every integer expression that evaluates to ' + target + '.',
      strandCode: 'B2.3',
      test: v => v === target,
      correct: () => {
        const a = randInt(-20, 20);
        const b = target - a;
        const text = b < 0 ? a + ' − ' + Math.abs(b) : a + ' + ' + b;
        return { text: text, val: target };
      },
      wrong: () => {
        const a = randInt(-20, 20);
        let b = randInt(-20, 20);
        if (a + b === target) b += pick([-2, -1, 1, 2]);
        const text = b < 0 ? a + ' − ' + Math.abs(b) : a + ' + ' + b;
        return { text: text, val: a + b };
      }
    };
  }

  function percentRule(target) {
    return {
      id: 'percent_' + target,
      grade: 'grade8',
      title: 'Values equal to ' + target,
      prompt: 'Munch every percent expression worth ' + target + '.',
      strandCode: 'B2.6',
      test: v => nearly(v, target),
      correct: () => {
        const opts = [[10, target * 10], [25, target * 4], [50, target * 2], [20, target * 5]];
        const o = pick(opts);
        return { text: o[0] + '% of ' + o[1], val: target };
      },
      wrong: () => {
        const p = pick([10, 20, 25, 50, 75]);
        let whole = randInt(2, 40) * 4;
        if (nearly(whole * p / 100, target)) whole += 4;
        return { text: p + '% of ' + whole, val: whole * p / 100 };
      }
    };
  }

  function powersRule() {
    return {
      id: 'powers_of_2',
      grade: 'grade8',
      title: 'Powers of 2',
      prompt: 'Munch every number that is a power of 2.',
      strandCode: 'B1.4',
      test: v => Number.isInteger(v) && v >= 1 && (v & (v - 1)) === 0,
      correct: () => { const v = Math.pow(2, randInt(1, 9)); return { text: String(v), val: v }; },
      wrong: () => {
        let v;
        do { v = randInt(3, 512); } while ((v & (v - 1)) === 0);
        return { text: String(v), val: v };
      }
    };
  }

  function squareRootRule() {
    const target = randInt(3, 12);

    // Several expression shapes per value, so the label pool stays well above
    // the 30 cells a board needs.
    function forms(v) {
      const k = randInt(2, 9);
      const a = randInt(1, 30);
      return [
        { text: '√' + (v * v), val: v },
        { text: (v * k) + ' ÷ ' + k, val: v },
        { text: (v + a) + ' − ' + a, val: v },
        { text: (v - a) + ' + ' + a, val: v }
      ];
    }

    return {
      id: 'roots_' + target,
      grade: 'grade8',
      title: 'Expressions equal to ' + target,
      prompt: 'Munch every expression worth ' + target + '.',
      strandCode: 'B1.4',
      test: v => nearly(v, target),
      correct: () => pick(forms(target)),
      wrong: () => {
        let v;
        do { v = randInt(2, 20); } while (v === target);
        return pick(forms(v));
      }
    };
  }

  /* ------------------------------------------------------------------ *
   * Rule pack registry
   * ------------------------------------------------------------------ */

  function buildRulePacks(grade) {
    if (grade === 'grade8') {
      return [
        primesRule(),
        squaresRule(),
        equivalentFractionRule(),
        integerExpressionRule(randInt(-12, 12)),
        percentRule(pick([12, 15, 20, 24, 30])),
        powersRule(),
        squareRootRule(),
        multiplesRule(pick([6, 7, 8, 9, 12]))
      ];
    }
    return [
      multiplesRule(pick([2, 3, 4, 5, 6, 7, 8, 9, 10])),
      factorsRule(pick([12, 16, 18, 20, 24, 30, 36])),
      sumsRule(randInt(10, 18)),
      differencesRule(randInt(3, 12)),
      evenOddRule(pick(['even', 'odd'])),
      lessThanRule(pick([300, 500, 750])),
      halfFractionRule(),
      timesTableRule(pick([12, 16, 18, 24, 36]))
    ];
  }

  /**
   * Pick the rule for a level. Level 1 is curated per grade (easier starts);
   * later levels cycle through a freshly randomised pack list.
   */
  function ruleForLevel(grade, level) {
    if (level === 1) {
      if (grade === 'grade8') return primesRule();
      return multiplesRule(2);
    }
    const packs = buildRulePacks(grade);
    return packs[(level - 2) % packs.length];
  }

  /**
   * Build a `rows x cols` board for a rule.
   * Guarantees: every cell text is unique, `correctCount` cells satisfy
   * `rule.test`, and at least one correct cell exists.
   */
  function buildBoard(rule, rows, cols, correctCount) {
    const total = rows * cols;
    const want = Math.max(1, Math.min(correctCount || Math.round(total * 0.3), total - 1));
    const seen = new Set();
    const cells = [];

    function push(candidate) {
      if (!candidate || seen.has(candidate.text)) return false;
      seen.add(candidate.text);
      cells.push({
        text: candidate.text,
        val: candidate.val,
        correct: !!rule.test(candidate.val),
        eaten: false
      });
      return true;
    }

    let guard = 0;
    while (cells.filter(c => c.correct).length < want && guard++ < 3000) {
      push(rule.correct());
    }

    guard = 0;
    while (cells.length < total && guard++ < 5000) {
      const cand = rule.wrong();
      // A distractor generator may accidentally produce a true cell; the
      // predicate is the authority, so just accept it as correct.
      push(cand);
    }

    // Extremely unlikely fallback: pad with correct cells if distractors ran dry.
    guard = 0;
    while (cells.length < total && guard++ < 3000) {
      push(rule.correct());
    }

    // Shuffle (Fisher-Yates) then lay out in a grid.
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = cells[i]; cells[i] = cells[j]; cells[j] = t;
    }

    const grid = [];
    for (let r = 0; r < rows; r++) {
      grid.push(cells.slice(r * cols, (r + 1) * cols));
    }
    return grid;
  }

  function countRemainingCorrect(grid) {
    let n = 0;
    grid.forEach(row => row.forEach(c => { if (c.correct && !c.eaten) n++; }));
    return n;
  }

  exports.MunchersEngine = {
    buildRulePacks: buildRulePacks,
    ruleForLevel: ruleForLevel,
    buildBoard: buildBoard,
    countRemainingCorrect: countRemainingCorrect,
    isPrime: isPrime,
    isSquare: isSquare
  };

})(typeof window !== 'undefined' ? window : global);
