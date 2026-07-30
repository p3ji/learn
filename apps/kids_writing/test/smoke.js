// Node smoke test for the Story Forge data layer, run against the real files
// (no browser cache in the way).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..');

// Minimal fakes for the browser bits profile.js/storage.js touch.
const store = {};
const sandbox = {
    localStorage: {
        getItem: k => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: k => { delete store[k]; },
        clear: () => { for (const k of Object.keys(store)) delete store[k]; }
    },
    document: {
        getElementById: () => null,
        querySelectorAll: () => [],
        createElement: () => ({ setAttribute() {}, remove() {}, style: {}, classList: { toggle() {} } }),
        addEventListener: () => {},
        body: { appendChild() {} }
    },
    setTimeout: () => {},
    console,
    Blob: class {},
    URL: { createObjectURL: () => '', revokeObjectURL: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

for (const f of ['js/profile.js', 'js/storage.js', 'js/word_data.js', 'js/analyzer.js']) {
    vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), sandbox, { filename: f });
}

const run = code => vm.runInContext(code, sandbox);

let fails = 0;
const check = (label, actual, expected) => {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (!ok) fails++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  got=${JSON.stringify(actual)}${ok ? '' : ` want=${JSON.stringify(expected)}`}`);
};

const TXT100 = Array(10).fill('one two three four five six seven eight nine ten').join(' ');
const TXT150 = TXT100 + ' ' + Array(5).fill('one two three four five six seven eight nine ten').join(' ');

run('initProfileSystem()');
check('fresh init has empty dailyWords', run('JSON.stringify(currentProfile.dailyWords)'), '{}');
check('fresh init has 0 xp', run('currentProfile.xp'), 0);
check('countWords(100-word text)', run(`countWords(${JSON.stringify(TXT100)})`), 100);

run(`var b = createBook('T','Mystery'); var cid = b.chapters[0].id;`);
check('save#1 credits 100', run(`saveChapterText(b.id, cid, ${JSON.stringify(TXT100)})`), 100);
check('  today = 100', run(`currentProfile.dailyWords[kwTodayKey()]`), 100);
check('identical re-save credits 0', run(`saveChapterText(b.id, cid, ${JSON.stringify(TXT100)})`), 0);
check('deleting down to 5 credits 0 (never negative)', run(`saveChapterText(b.id, cid, 'a b c d e')`), 0);
check('RETYPING the same 100 credits 0 (no double-count)', run(`saveChapterText(b.id, cid, ${JSON.stringify(TXT100)})`), 0);
check('  today still 100', run(`currentProfile.dailyWords[kwTodayKey()]`), 100);
check('growing to 150 credits only the new 50', run(`saveChapterText(b.id, cid, ${JSON.stringify(TXT150)})`), 50);
check('  today = 150', run(`currentProfile.dailyWords[kwTodayKey()]`), 150);

// Idempotent init: wiping storage must not resurrect the old profile.
run('localStorage.clear(); initProfileSystem();');
check('after clear+init, dailyWords empty', run('JSON.stringify(currentProfile.dailyWords)'), '{}');
check('after clear+init, xp 0', run('currentProfile.xp'), 0);
check('after clear+init, no badges', run('currentProfile.badges.length'), 0);

// Books are per-writer.
run(`initProfileSystem(); createBook('Alice Book','Fantasy');`);
run(`currentProfile = kwBlankProfile('Bob'); saveProfileState();`);
check('Bob sees no books of Alice', run('getLibrary().books.length'), 0);
run(`switchActiveProfile('New Writer')`);
check('switching back restores the book', run('getLibrary().books.length'), 1);

// Rename carries the library across.
run(`var lib0 = getLibrary().books.length; renameLibraryOwner('New Writer','Renamed'); currentProfile.username='Renamed'; saveProfileState();`);
check('library follows a rename', run('getLibrary().books.length'), 1);

// ---------- Analyzer calibration ----------
// Three drafts of descending quality. The point is the SPREAD: if all three
// bunch together the scores tell a child nothing. Asserted as ranges, not exact
// values, so tuning a word list doesn't break the suite.
const DRAFTS = {
    polished: `The gate hung open in the cold, and nobody was anywhere near it. Rosa went in. Gravel crunched under her boots and the air smelled of burnt toast, which made no sense out here. She counted the steps back to the road without looking away from the shape in the doorway. "You're late," it said. Rosa stopped. The voice belonged to her brother, and her brother had been gone eleven years.`,
    average:  `Tom walked into the kitchen and looked at the table. He was hungry. He got some bread and ate it quickly. Then he went outside to find his bike, but the shed door was locked and he did not have the key.`,
    weak:     `Maya was really angry. She walked slowly and looked around nervously. She was very sad. Then she saw the door. Then she heard a noise. Then she felt scared and ran quickly as fast as lightning.`
};

const reports = {};
for (const [k, v] of Object.entries(DRAFTS)) {
    reports[k] = run(`analyzeText(${JSON.stringify(v)})`);
}

const inRange = (label, val, lo, hi) => {
    const ok = val >= lo && val <= hi;
    if (!ok) fails++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  got=${val}${ok ? '' : ` want ${lo}..${hi}`}`);
};

console.log('');
inRange('polished wordPower is high', reports.polished.scores.wordPower, 75, 100);
inRange('average  wordPower is middling', reports.average.scores.wordPower, 35, 74);
inRange('weak     wordPower is low', reports.weak.scores.wordPower, 10, 34);
inRange('polished showing is high', reports.polished.scores.showing, 80, 100);
inRange('weak     showing is low', reports.weak.scores.showing, 10, 55);

check('no score ever hits 0 (never demoralise)',
    Object.values(reports).every(r => Object.values(r.scores).every(v => v >= 10)), true);
check('weak draft raises more warnings than polished',
    reports.weak.findings.filter(f => f.tone === 'warn').length >
    reports.polished.findings.filter(f => f.tone === 'warn').length, true);
check('every draft gets at least one encouraging finding',
    Object.values(reports).every(r => r.findings.some(f => f.tone === 'good')), true);
check('short text asks for more instead of scoring it',
    run(`analyzeText('Hello there.').empty`), true);
check('highlights are non-overlapping and ordered', (() => {
    for (const r of Object.values(reports)) {
        let c = -1;
        for (const m of r.marks) { if (m.start < c) return false; c = m.end; }
    }
    return true;
})(), true);
check('weak draft flags the telling word "angry"',
    reports.weak.marks.some(m => m.kind === 'telling' && /angry/i.test(m.word)), true);
check('weak draft flags the cliche',
    reports.weak.marks.some(m => m.kind === 'cliche'), true);
check('every finding names something concrete (has a body)',
    Object.values(reports).every(r => r.findings.every(f => f.body && f.body.length > 20)), true);

console.log(fails ? `\n${fails} FAILURE(S)` : '\nAll checks passed.');
process.exit(fails ? 1 : 0);
