// ─── Real Survey Statistics Engine ────────────────────────────────────────────
// Loads the actual dataset and computes real crosstabs, chi-square tests and
// odds ratios. This file exists because the app previously displayed HARDCODED
// results that (a) were internally inconsistent and (b) asserted an age->trust
// effect that the data generator deliberately does not produce.
//
// Nothing here may return a hardcoded statistic. If the data cannot be loaded,
// say so — do not fall back to invented numbers.

const SURVEY_CSV_PATH = '../../data/ai_trust_insights.csv';
const MISSING_CODE = -9;

let _surveyRows = null;
let _surveyLoading = null;

// ── CSV loading ───────────────────────────────────────────────────────────────

function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        // The generated CSV has no quoted fields containing commas, so a plain
        // split is safe here. Revisit if a future dataset needs full quoting.
        const cells = line.split(',');
        const row = {};
        headers.forEach((h, i) => {
            const raw = cells[i];
            const num = Number(raw);
            row[h] = (raw !== '' && !Number.isNaN(num)) ? num : raw;
        });
        return row;
    });
}

async function loadSurveyData() {
    if (_surveyRows) return _surveyRows;
    if (_surveyLoading) return _surveyLoading;

    _surveyLoading = (async () => {
        const res = await fetch(SURVEY_CSV_PATH);
        if (!res.ok) throw new Error('HTTP ' + res.status + ' loading ' + SURVEY_CSV_PATH);
        _surveyRows = parseCsv(await res.text());
        return _surveyRows;
    })();

    return _surveyLoading;
}

// ── Chi-square distribution ───────────────────────────────────────────────────
// Regularized upper incomplete gamma Q(a,x); p-value = Q(df/2, chi2/2).

function logGamma(x) {
    const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
               -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let y = x, tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    let ser = 1.000000000190015;
    for (let j = 0; j < 6; j++) ser += c[j] / ++y;
    return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function gammaQ(a, x) {
    if (x < 0 || a <= 0) return NaN;
    if (x === 0) return 1;

    if (x < a + 1) {
        // Series expansion for P(a,x), then Q = 1 - P
        let ap = a, sum = 1 / a, del = sum;
        for (let n = 0; n < 500; n++) {
            ap++; del *= x / ap; sum += del;
            if (Math.abs(del) < Math.abs(sum) * 1e-12) break;
        }
        return 1 - sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
    }

    // Continued fraction for Q(a,x)
    const FPMIN = 1e-300;
    let b = x + 1 - a, c = 1 / FPMIN, d = 1 / b, h = d;
    for (let i = 1; i <= 500; i++) {
        const an = -i * (i - a);
        b += 2;
        d = an * d + b; if (Math.abs(d) < FPMIN) d = FPMIN;
        c = b + an / c;  if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1 / d;
        const del = d * c;
        h *= del;
        if (Math.abs(del - 1) < 1e-12) break;
    }
    return h * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

function chiSquarePValue(chi2, df) {
    return gammaQ(df / 2, chi2 / 2);
}

// ── Crosstab + chi-square ─────────────────────────────────────────────────────

/**
 * Cross-tabulate two columns and run a Pearson chi-square test of independence.
 * Rows where either variable is missing (-9 or blank) are dropped listwise.
 */
function crosstabChiSquare(rows, rowVar, colVar) {
    const valid = rows.filter(r =>
        r[rowVar] !== undefined && r[rowVar] !== '' && r[rowVar] !== MISSING_CODE &&
        r[colVar] !== undefined && r[colVar] !== '' && r[colVar] !== MISSING_CODE
    );

    const rowLevels = [...new Set(valid.map(r => String(r[rowVar])))].sort();
    const colLevels = [...new Set(valid.map(r => String(r[colVar])))].sort();

    const counts = {};
    rowLevels.forEach(rl => { counts[rl] = {}; colLevels.forEach(cl => counts[rl][cl] = 0); });
    valid.forEach(r => { counts[String(r[rowVar])][String(r[colVar])]++; });

    const rowTot = {}, colTot = {};
    let n = 0;
    rowLevels.forEach(rl => {
        rowTot[rl] = colLevels.reduce((s, cl) => s + counts[rl][cl], 0);
        n += rowTot[rl];
    });
    colLevels.forEach(cl => {
        colTot[cl] = rowLevels.reduce((s, rl) => s + counts[rl][cl], 0);
    });

    let chi2 = 0, minExpected = Infinity;
    rowLevels.forEach(rl => colLevels.forEach(cl => {
        const expected = (rowTot[rl] * colTot[cl]) / n;
        minExpected = Math.min(minExpected, expected);
        if (expected > 0) {
            const diff = counts[rl][cl] - expected;
            chi2 += (diff * diff) / expected;
        }
    }));

    const df = (rowLevels.length - 1) * (colLevels.length - 1);

    return {
        rowLevels, colLevels, counts, rowTot, colTot, n,
        chi2, df,
        pValue: chiSquarePValue(chi2, df),
        minExpected
    };
}

/**
 * Odds ratios for a binary outcome across levels of a categorical predictor,
 * against an explicit reference level (defaults to the first level).
 */
function oddsRatios(ct, positiveLevel, referenceLevel) {
    const pos = String(positiveLevel);
    const ref = referenceLevel !== undefined ? String(referenceLevel) : ct.rowLevels[0];

    const oddsFor = (rl) => {
        const p = ct.counts[rl][pos] / ct.rowTot[rl];
        return p / (1 - p);
    };

    const refOdds = oddsFor(ref);
    return ct.rowLevels.map(rl => ({
        level: rl,
        n: ct.rowTot[rl],
        pct: (ct.counts[rl][pos] / ct.rowTot[rl]) * 100,
        oddsRatio: rl === ref ? 1 : oddsFor(rl) / refOdds,
        isReference: rl === ref
    }));
}

/** Population-weighted mean that correctly excludes the missing code. */
function weightedMean(rows, valueVar, weightVar) {
    let num = 0, den = 0, dropped = 0;
    rows.forEach(r => {
        const v = r[valueVar], w = r[weightVar];
        if (v === MISSING_CODE || v === '' || v === undefined) { dropped++; return; }
        num += v * w;
        den += w;
    });
    return { mean: den ? num / den : NaN, nUsed: rows.length - dropped, nDropped: dropped };
}

// ── Logistic regression (real fit, so the UI controls actually matter) ────────

/** Deterministic PRNG so a given split ratio always reproduces — no Math.random. */
function seededShuffle(arr, seed) {
    const a = arr.slice();
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const j = s % (i + 1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/** One-hot encode categorical columns; pass numeric columns through. */
function buildDesignMatrix(rows, categorical, numeric) {
    const levels = {};
    categorical.forEach(c => {
        levels[c] = [...new Set(rows.map(r => String(r[c])))].sort().slice(1); // drop first = reference
    });

    const names = [];
    categorical.forEach(c => levels[c].forEach(l => names.push(c + '=' + l)));
    numeric.forEach(n => names.push(n));

    const X = rows.map(r => {
        const v = [];
        categorical.forEach(c => levels[c].forEach(l => v.push(String(r[c]) === l ? 1 : 0)));
        numeric.forEach(n => v.push(r[n] === MISSING_CODE ? 0 : r[n]));
        return v;
    });

    return { X, names };
}

function fitLogistic(X, y, iterations, learningRate) {
    const nFeat = X[0].length;
    let w = new Array(nFeat).fill(0), b = 0;
    const lr = learningRate || 0.1;
    const iters = iterations || 400;

    // Standardize for stable convergence
    const mean = new Array(nFeat).fill(0), sd = new Array(nFeat).fill(0);
    for (let j = 0; j < nFeat; j++) {
        mean[j] = X.reduce((s, r) => s + r[j], 0) / X.length;
        sd[j] = Math.sqrt(X.reduce((s, r) => s + (r[j] - mean[j]) ** 2, 0) / X.length) || 1;
    }
    const Z = X.map(r => r.map((v, j) => (v - mean[j]) / sd[j]));

    for (let it = 0; it < iters; it++) {
        const gw = new Array(nFeat).fill(0);
        let gb = 0;
        for (let i = 0; i < Z.length; i++) {
            const z = Z[i].reduce((s, v, j) => s + v * w[j], b);
            const p = 1 / (1 + Math.exp(-z));
            const err = p - y[i];
            for (let j = 0; j < nFeat; j++) gw[j] += err * Z[i][j];
            gb += err;
        }
        for (let j = 0; j < nFeat; j++) w[j] -= lr * gw[j] / Z.length;
        b -= lr * gb / Z.length;
    }

    return {
        predictProba: (row) => {
            const z = row.reduce((s, v, j) => s + ((v - mean[j]) / sd[j]) * w[j], b);
            return 1 / (1 + Math.exp(-z));
        },
        weights: w, intercept: b
    };
}

function rocAuc(yTrue, scores) {
    const pairs = scores.map((s, i) => ({ s, y: yTrue[i] })).sort((a, b) => a.s - b.s);
    const nPos = yTrue.filter(v => v === 1).length;
    const nNeg = yTrue.length - nPos;
    if (!nPos || !nNeg) return NaN;

    // Rank-sum (Mann-Whitney) with average ranks for ties
    let i = 0, rankSum = 0;
    while (i < pairs.length) {
        let j = i;
        while (j + 1 < pairs.length && pairs[j + 1].s === pairs[i].s) j++;
        const avgRank = (i + j + 2) / 2;
        for (let k = i; k <= j; k++) if (pairs[k].y === 1) rankSum += avgRank;
        i = j + 1;
    }
    return (rankSum - nPos * (nPos + 1) / 2) / (nPos * nNeg);
}

/** Fit + evaluate on a held-out split. Returns real accuracy and AUC. */
function trainTestLogistic(rows, categorical, numeric, target, trainFrac) {
    const shuffled = seededShuffle(rows, 42);
    const cut = Math.floor(shuffled.length * trainFrac);
    const train = shuffled.slice(0, cut), test = shuffled.slice(cut);

    const all = buildDesignMatrix(shuffled, categorical, numeric);
    const Xtrain = all.X.slice(0, cut), Xtest = all.X.slice(cut);
    const yTrain = train.map(r => r[target]), yTest = test.map(r => r[target]);

    const model = fitLogistic(Xtrain, yTrain);
    const scores = Xtest.map(r => model.predictProba(r));
    const preds = scores.map(p => (p >= 0.5 ? 1 : 0));
    const acc = preds.filter((p, i) => p === yTest[i]).length / preds.length;

    return {
        accuracy: acc, auc: rocAuc(yTest, scores),
        nTrain: train.length, nTest: test.length,
        featureNames: all.names, weights: model.weights
    };
}

function formatPValue(p) {
    if (!isFinite(p)) return 'n/a';
    if (p < 0.0001) return 'p &lt; 0.0001';
    return 'p = ' + p.toFixed(4);
}
