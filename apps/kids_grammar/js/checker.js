// The Grammar Check engine.
//
// Pure, offline, deterministic — no API, nothing leaves the device.
// checkGrammar(text) -> { stats, issues: [...] }
//
// DESIGN RULE: precision over recall. A false positive teaches a child something
// WRONG and destroys their trust in the tool; a missed error just means they
// learn it another day. So every pattern here is deliberately narrow — the
// homophone rules trigger on specific following words rather than trying to
// parse the sentence. When a rule cannot be confident, it stays quiet.
//
// Every issue carries `rule`, pointing at a RULE_CARDS entry, so the child can
// always get the full explanation rather than just a red underline.

// Words whose spelling starts with a vowel but which sound like a consonant
// ("a university", "a one-way street") and vice versa ("an hour").
const KG_SOUNDS_CONSONANT = ['university', 'universal', 'unicorn', 'uniform', 'union', 'unique', 'user', 'usual', 'european', 'ewe', 'once', 'one', 'ukulele', 'utensil'];
const KG_SILENT_H = ['hour', 'honest', 'honour', 'honor', 'heir', 'honourable', 'honorable'];

// Finite-verb signals, used only by the fragment detector. The irregular past
// forms matter a lot here: without them, "When the bell rang we ran." counts as
// one verb and gets wrongly called a fragment.
const KG_VERB_SIGNALS = new Set([
    'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'has', 'have', 'had',
    'do', 'does', 'did', 'will', 'would', 'can', 'could', 'shall', 'should', 'may', 'might', 'must',
    'got', 'went', 'ate', 'ran', 'saw', 'said', 'came', 'took', 'made', 'knew', 'felt', 'left',
    'found', 'thought', 'began', 'brought', 'gave', 'told', 'kept', 'held', 'sat', 'stood',
    'fell', 'won', 'lost', 'put', 'let', 'rang', 'sang', 'swam', 'drank', 'rose', 'woke',
    'broke', 'spoke', 'wrote', 'drove', 'flew', 'grew', 'threw', 'blew', 'shook', 'chose',
    'froze', 'stole', 'wore', 'tore', 'swore', 'hid', 'slid', 'bit', 'lit', 'quit', 'hit',
    'cut', 'shut', 'spread', 'burst', 'cost', 'met', 'fed', 'led', 'read', 'paid', 'laid',
    'sold', 'sent', 'spent', 'bent', 'lent', 'dealt', 'slept', 'wept', 'crept', 'swept',
    'built', 'caught', 'taught', 'fought', 'sought', 'bought', 'ate', 'rode', 'hung'
]);

// Only true subordinating conjunctions. "after" and "before" are deliberately
// absent: they are just as often prepositions ("After school we went home."),
// which would make the fragment check fire on a perfectly good sentence.
const KG_SUBORDINATORS = ['because', 'although', 'though', 'while', 'whereas', 'unless', 'whenever', 'wherever'];

// Nouns used to spot possessive-vs-contraction mix-ups. Short and concrete on
// purpose — a long list would start matching verbs and produce false positives.
const KG_COMMON_NOUNS = ['own', 'tail', 'paw', 'name', 'head', 'colour', 'color', 'size', 'job', 'turn', 'edge', 'side', 'top', 'end', 'shape', 'handle', 'door', 'lid', 'body', 'eyes', 'legs', 'paws', 'wings', 'house', 'car', 'bags', 'bag', 'coat', 'coats', 'dog', 'cat', 'mum', 'dad', 'friend', 'friends', 'books', 'book', 'room', 'teacher', 'names', 'arm', 'arms', 'leg', 'hand', 'hands', 'foot', 'feet', 'face', 'nose', 'ear', 'ears', 'tooth', 'teeth', 'hair', 'heart', 'brain', 'mouth', 'lips', 'chin', 'cheek', 'cheeks', 'bone', 'bones', 'skin', 'blood', 'voice', 'sound', 'smell', 'colour', 'color', 'shape', 'size'];

function kgEscape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Preserves the original capitalisation pattern when autofixing, so replacing
// "Their" at the start of a sentence doesn't hand back a lowercase "they're".
function kgMatchCase(original, replacement) {
    if (original[0] === original[0].toUpperCase() && original[0] !== original[0].toLowerCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

function checkGrammar(rawText) {
    const text = String(rawText || '');
    const issues = [];

    const add = issue => issues.push(issue);

    // ---- Helper: run a pattern and emit an issue per match ----
    // `build` receives the RegExp match and returns the issue fields, or null to
    // skip (used where a rule needs one extra check the regex can't express).
    function scan(pattern, build) {
        const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        let m;
        while ((m = re.exec(text)) !== null) {
            if (m[0].length === 0) { re.lastIndex++; continue; }
            const built = build(m);
            if (!built) continue;
            add(Object.assign({ start: m.index, end: m.index + m[0].length, match: m[0] }, built));
        }
    }

    // ---------- 1. "could of" family ----------
    scan(/\b(could|would|should|must|might)\s+of\b/gi, m => ({
        rule: 'could_have',
        severity: 'error',
        title: `"${m[0]}" should be "${m[1]} have"`,
        message: 'It sounds like "of" when we say it quickly, but the word is always "have".',
        autofix: `${m[1]} have`
    }));

    // ---------- 2. alot ----------
    scan(/\balot\b/gi, m => ({
        rule: 'a_an', severity: 'error',
        title: '"alot" is two words',
        message: 'It is always "a lot" — like "a bit" or "a little".',
        autofix: kgMatchCase(m[0], 'a lot')
    }));

    // ---------- 3. lowercase standalone "i" ----------
    // Matching the bare letter also fixes "i'm" / "i'll", since only the i is replaced.
    scan(/\bi\b/g, m => ({
        rule: 'capitals', severity: 'error',
        title: 'The word "I" is always a capital',
        message: 'Even in the middle of a sentence, and even in "I\'m" and "I\'ll".',
        autofix: 'I'
    }));

    // ---------- 4. Doubled words ----------
    // "had had" and "that that" are both legitimate, so they are excluded.
    scan(/\b(\w+)\s+\1\b/gi, m => {
        if (['had', 'that'].includes(m[1].toLowerCase())) return null;
        return {
            rule: null, severity: 'error',
            title: `"${m[1]} ${m[1]}" is written twice`,
            message: 'Easy to miss when you are typing fast.',
            autofix: m[1]
        };
    });

    // ---------- 5. its / it's ----------
    scan(/\bits\s+(been|a|an|going|not|time|clear|obvious)\b/gi, m => ({
        rule: 'its', severity: 'error',
        title: '"its" should be "it\'s" here',
        message: `"It is ${m[1]}" makes sense, so you need the apostrophe.`,
        autofix: kgMatchCase(m[0], "it's " + m[1])
    }));

    scan(new RegExp(`\\bit's\\s+(${KG_COMMON_NOUNS.map(kgEscape).join('|')})\\b`, 'gi'), m => ({
        rule: 'its', severity: 'error',
        title: '"it\'s" should be "its" here',
        message: `"It is ${m[1]}" does not make sense — you mean the ${m[1]} belonging to it, so no apostrophe.`,
        autofix: kgMatchCase(m[0], 'its ' + m[1])
    }));

    // ---------- 6. there / their / they're ----------
    scan(/\btheir\s+(is|are|was|were)\b/gi, m => ({
        rule: 'there', severity: 'error',
        title: '"their" should be "there"',
        message: '"There is" and "there are" point something out. "Their" means belonging to them.',
        autofix: kgMatchCase(m[0], 'there ' + m[1])
    }));

    scan(/\btheir\s+(going|coming|not|here|already|still)\b/gi, m => ({
        rule: 'there', severity: 'error',
        title: '"their" should be "they\'re"',
        message: `"They are ${m[1]}" works, so it is the contraction.`,
        autofix: kgMatchCase(m[0], "they're " + m[1])
    }));

    scan(new RegExp(`\\bthere\\s+(own|${KG_COMMON_NOUNS.map(kgEscape).join('|')})\\b`, 'gi'), m => ({
        rule: 'there', severity: 'warn',
        title: '"there" might need to be "their"',
        message: `If the ${m[1]} belongs to them, it is "their".`,
        autofix: kgMatchCase(m[0], 'their ' + m[1])
    }));

    scan(new RegExp(`\\bthey're\\s+(${KG_COMMON_NOUNS.map(kgEscape).join('|')})\\b`, 'gi'), m => ({
        rule: 'there', severity: 'error',
        title: '"they\'re" should be "their"',
        message: `"They are ${m[1]}" does not make sense here.`,
        autofix: kgMatchCase(m[0], 'their ' + m[1])
    }));

    // ---------- 7. your / you're ----------
    scan(/\byour\s+(going|coming|welcome|not|gonna|a|an)\b/gi, m => ({
        rule: 'your', severity: 'error',
        title: '"your" should be "you\'re"',
        message: `"You are ${m[1]}" works, so you need the apostrophe.`,
        autofix: kgMatchCase(m[0], "you're " + m[1])
    }));

    scan(new RegExp(`\\byou're\\s+(${KG_COMMON_NOUNS.map(kgEscape).join('|')})\\b`, 'gi'), m => ({
        rule: 'your', severity: 'error',
        title: '"you\'re" should be "your"',
        message: `"You are ${m[1]}" does not make sense — the ${m[1]} belongs to you.`,
        autofix: kgMatchCase(m[0], 'your ' + m[1])
    }));

    // ---------- 8. Subject-verb agreement (pronoun cases only) ----------
    scan(/\b(he|she|it)\s+were\b/gi, m => ({
        rule: 'sv_agree', severity: 'error',
        title: `"${m[1]} were" should be "${m[1]} was"`,
        message: 'One person or thing takes "was".',
        autofix: `${m[1]} was`
    }));

    scan(/\b(they|we|you)\s+was\b/gi, m => ({
        rule: 'sv_agree', severity: 'error',
        title: `"${m[1]} was" should be "${m[1]} were"`,
        message: 'More than one takes "were".',
        autofix: `${m[1]} were`
    }));

    scan(/\bI\s+(is|are)\b/g, m => ({
        rule: 'sv_agree', severity: 'error',
        title: `"I ${m[1]}" should be "I am"`,
        message: '"I" has its own special verb form: am.',
        autofix: 'I am'
    }));

    scan(/\b(he|she|it)\s+(don't|dont)\b/gi, m => ({
        rule: 'sv_agree', severity: 'error',
        title: `"${m[1]} ${m[2]}" should be "${m[1]} doesn't"`,
        message: 'One person → doesn\'t. More than one → don\'t.',
        autofix: `${m[1]} doesn't`
    }));

    scan(/\b(they|we|you)\s+doesn't\b/gi, m => ({
        rule: 'sv_agree', severity: 'error',
        title: `"${m[1]} doesn't" should be "${m[1]} don't"`,
        message: 'More than one takes "don\'t".',
        autofix: `${m[1]} don't`
    }));

    scan(/\bthere\s+is\s+(\d+|many|several|lots|loads)\b/gi, m => ({
        rule: 'sv_agree', severity: 'error',
        title: '"there is" should be "there are"',
        message: `"${m[1]}" is more than one, so it takes "are".`,
        autofix: kgMatchCase(m[0], 'there are ' + m[1])
    }));

    // ---------- 9. Double negatives ----------
    scan(/\b(don't|didn't|can't|couldn't|won't|wouldn't|isn't|aren't|haven't|hasn't)\b(?:\s+\w+){0,3}?\s+\b(nothing|nobody|nowhere|never)\b/gi, m => ({
        rule: 'double_neg', severity: 'warn',
        title: 'Double negative',
        message: `"${m[1]}" and "${m[2]}" cancel each other out. Swap ${m[2]} for ${{ nothing: 'anything', nobody: 'anybody', nowhere: 'anywhere', never: 'ever' }[m[2].toLowerCase()]}.`
    }));

    // ---------- 10. a / an ----------
    scan(/\ba\s+([aeiou]\w+)/gi, m => {
        if (KG_SOUNDS_CONSONANT.includes(m[1].toLowerCase())) return null;
        return {
            rule: 'a_an', severity: 'error',
            title: `"a ${m[1]}" should be "an ${m[1]}"`,
            message: `"${m[1]}" starts with a vowel sound.`,
            autofix: kgMatchCase(m[0], 'an ' + m[1])
        };
    });

    scan(/\ban\s+([bcdfgjklmnpqrstvwxyz]\w+)/gi, m => {
        if (KG_SILENT_H.includes(m[1].toLowerCase())) return null;
        return {
            rule: 'a_an', severity: 'error',
            title: `"an ${m[1]}" should be "a ${m[1]}"`,
            message: `"${m[1]}" starts with a consonant sound.`,
            autofix: kgMatchCase(m[0], 'a ' + m[1])
        };
    });

    scan(/\ba\s+(hour|honest|honour|honor|heir)\b/gi, m => ({
        rule: 'a_an', severity: 'error',
        title: `"a ${m[1]}" should be "an ${m[1]}"`,
        message: `The h in "${m[1]}" is silent, so it sounds like it starts with a vowel.`,
        autofix: kgMatchCase(m[0], 'an ' + m[1])
    }));

    // ---------- 11. Spacing around punctuation ----------
    scan(/ +([.,!?;:])/g, m => ({
        rule: 'commas_list', severity: 'error',
        title: `Space before "${m[1]}"`,
        message: 'Punctuation sits tight against the word before it.',
        autofix: m[1]
    }));

    scan(/([a-z]{2})([.,!?;:])([A-Za-z])/g, m => ({
        rule: 'commas_list', severity: 'error',
        title: `Missing space after "${m[2]}"`,
        message: 'Leave one space after punctuation before the next word.',
        autofix: `${m[1]}${m[2]} ${m[3]}`
    }));

    // ---------- 12. Capital at the start of a sentence ----------
    scan(/(^|[.!?]\s+|\n\s*)([a-z])/g, m => ({
        start: m.index + m[1].length,
        end: m.index + m[1].length + 1,
        match: m[2],
        rule: 'capitals', severity: 'error',
        title: 'Sentence should start with a capital letter',
        message: `Change "${m[2]}" to "${m[2].toUpperCase()}".`,
        autofix: m[2].toUpperCase()
    }));

    // ---------- 13. Comma splice ----------
    // The `,\s` requirement means dialogue tags (`"Hi," he said.`) never match,
    // because there the comma is followed by a quotation mark.
    scan(/,\s+(i|he|she|it|they|we|you)\s+(was|were|is|are|had|have|did|went|said|ran|saw|took|got|felt|knew|looked|walked|started|stopped|shouted|opened)\b/gi, m => ({
        rule: 'comma_splice', severity: 'warn',
        title: 'This might be a comma splice',
        message: 'If both halves could be their own sentence, a comma is too weak. Use a full stop, or add a joining word like "so", "and" or "but" after the comma.'
    }));

    // ---------- Sentence-level checks ----------
    const sentences = [];
    const sentRe = /[^.!?\n]+([.!?]+|$)/g;
    let sm;
    while ((sm = sentRe.exec(text)) !== null) {
        if (!sm[0].trim()) continue;
        sentences.push({ text: sm[0].trim(), start: sm.index, end: sm.index + sm[0].length, terminator: sm[1] });
    }

    sentences.forEach(s => {
        const words = s.text.toLowerCase().match(/[a-z']+/g) || [];
        if (!words.length) return;

        // 14. Run-on
        const joiners = words.filter(w => ['and', 'but', 'so', 'then'].includes(w)).length;
        if (words.length > 25 && joiners >= 3) {
            add({
                start: s.start, end: s.end, match: s.text,
                rule: 'run_on', severity: 'warn',
                title: `Run-on sentence (${words.length} words, ${joiners} joining words)`,
                message: 'Read it aloud in one breath. Where you run out of air, put a full stop.'
            });
        }

        // 15. Fragment — only the clearest case: opens with a subordinator and
        // contains at most one finite verb, so "When I got home I ate." (two
        // verbs, a complete sentence) is correctly left alone.
        if (KG_SUBORDINATORS.includes(words[0])) {
            const verbish = words.filter(w => KG_VERB_SIGNALS.has(w) || /(?:ed|ing)$/.test(w)).length;
            if (verbish <= 1 && words.length <= 8) {
                add({
                    start: s.start, end: s.end, match: s.text,
                    rule: 'fragment', severity: 'warn',
                    title: 'This looks like a fragment, not a full sentence',
                    message: `"${words[0].charAt(0).toUpperCase() + words[0].slice(1)}..." leaves the reader waiting. Join it to the sentence before or after it.`
                });
            }
        }
    });

    // 16. Missing full stop at the very end.
    const trimmed = text.trim();
    if (trimmed.length > 15 && !/[.!?"'’”)]$/.test(trimmed)) {
        add({
            start: text.lastIndexOf(trimmed) + trimmed.length - 1,
            end: text.lastIndexOf(trimmed) + trimmed.length,
            match: trimmed.slice(-1),
            rule: 'capitals', severity: 'warn',
            title: 'Missing punctuation at the end',
            message: 'Finish with a full stop, question mark or exclamation mark.'
        });
    }

    // ---------- Tidy up ----------
    // Sentence-level issues (run-on, fragment) legitimately contain word-level
    // ones, so only word-level issues are de-overlapped against each other.
    const spanIssues = issues.filter(i => i.rule === 'run_on' || i.rule === 'fragment');
    const wordIssues = issues.filter(i => i.rule !== 'run_on' && i.rule !== 'fragment');

    wordIssues.sort((a, b) => a.start - b.start || b.end - a.end);
    const kept = [];
    let cursor = -1;
    wordIssues.forEach(i => { if (i.start >= cursor) { kept.push(i); cursor = i.end; } });

    const all = kept.concat(spanIssues).sort((a, b) => a.start - b.start);

    const words = (text.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
    return {
        stats: {
            words,
            sentences: sentences.length,
            errors: all.filter(i => i.severity === 'error').length,
            warnings: all.filter(i => i.severity === 'warn').length,
            // A per-100-word rate so a long chapter isn't automatically "worse"
            // than a short one.
            errorRate: words ? Math.round((all.length / words) * 1000) / 10 : 0,
            fixable: all.filter(i => i.autofix != null).length
        },
        issues: all
    };
}

// Applies one autofix and returns the new text. Offsets shift after an edit, so
// the UI re-runs checkGrammar() after every fix rather than trying to patch the
// remaining issue positions.
function applyFix(text, issue) {
    if (issue.autofix == null) return text;
    return text.slice(0, issue.start) + issue.autofix + text.slice(issue.end);
}

// Fixes everything unambiguous in one pass. Applied back-to-front so earlier
// offsets stay valid while later ones are being replaced.
function applyAllFixes(text) {
    const { issues } = checkGrammar(text);
    const fixable = issues.filter(i => i.autofix != null).sort((a, b) => b.start - a.start);
    let out = text;
    fixable.forEach(i => { out = out.slice(0, i.start) + i.autofix + out.slice(i.end); });
    return { text: out, count: fixable.length };
}
