// Grammar Checker smoke test. Run after editing rules or content.
//
// Tests:
// - Precision: no false positives on known-good text
// - Recall: catches all the seeded errors
// - Both: the checker is trustworthy for kids

const fs = require('fs'), vm = require('vm'), path = require('path');

const s = { console };
s.window = s;
vm.createContext(s);

for (const f of ['js/grammar_data.js', 'js/checker.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), s);
}

const run = c => vm.runInContext(c, s);

const cases = [
    // Text, expect-flag?, severity (if flagged)
    ['I could of told you that.', true, 'error'],
    ['The cat licked it\'s paw.', true, 'error'],
    ['Its going to rain.', true, 'error'],
    ['Their going to be late.', true, 'error'],
    ['Put you\'re coat over their.', true, 'error'],  // Should flag at least one
    ['They was waiting at the gate.', true, 'error'],
    ['She were the first one there.', true, 'error'],
    ['I didn\'t see nothing in the shed.', true, 'warn'],
    ['We saw a elephant at the zoo.', true, 'error'],
    ['It took a hour to get there.', true, 'error'],
    ['i went to the shop with priya.', true, 'error'],
    ['The the cat sat down.', true, 'error'],
    ['It was late , we went home.', true, 'error'],
    ['there is 6 eggs left.', true, 'error'],
    // Must NOT be flagged
    ['The dog wagged its tail.', false],
    ['It\'s raining outside today.', false],
    ['They\'re putting their bags over there.', false],
    ['You\'re going to love your present.', false],
    ['She was the first one there.', false],
    ['When I got home I ate my dinner.', false],
    ['I had had enough of the noise.', false],
    ['It took an hour to reach a university in Spain.', false],
    ['"Hello," he said quietly to the class.', false],
    ['I saw nothing in the shed at all.', false],
    ['Its own purpose was unclear to me.', false],
];

let bad = 0, partial = 0;
for (const [t, expect, ...rest] of cases) {
    const r = run(`checkGrammar(${JSON.stringify(t)})`);
    const got = r.issues.length > 0;
    const ok = got === expect;
    if (!ok) {
        if (expect && got) partial++;  // Got something, maybe not everything
        else bad++;
    }
    const status = ok ? 'ok  ' : expect && got ? 'part' : 'MISS';
    console.log(`${status} [${expect ? 'flag' : 'clean'}] ${JSON.stringify(t).slice(0, 50)}`);
}

console.log(`\n${bad ? bad + ' MISS' : partial ? partial + ' PARTIAL' : 'all ok'}`);
process.exit(bad ? 1 : 0);
