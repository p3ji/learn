// The Revision Lab engine.
//
// Pure, offline and deterministic — no API, no network, no data leaving the
// device. Given a chapter it returns { stats, scores, marks, findings }; the UI
// layer (coach_ui.js) does all the rendering.
//
// Design rule: every finding must name a specific word or sentence FROM THE
// CHILD'S OWN TEXT and say what to do about it. Generic advice ("use better
// words!") is banned — it's the thing that makes writing feedback useless.

// ---------- Tokenising ----------

function kwSentences(text) {
    // Split on terminal punctuation, keeping the offsets so marks line up with
    // the original string (offsets are what the highlighter renders against).
    const out = [];
    const re = /[^.!?\n]+[.!?]*/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        const raw = m[0];
        if (!raw.trim()) continue;
        out.push({ text: raw.trim(), start: m.index, end: m.index + raw.length });
    }
    return out;
}

function kwParagraphs(text) {
    return String(text || '').split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);
}

function kwWords(text) {
    return String(text || '').toLowerCase().match(/[a-z][a-z'’-]*/g) || [];
}

function kwSyllables(word) {
    const w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (w.length <= 3) return 1;
    const groups = w
        .replace(/(?:es|ed|[^laeiouy]e)$/, '')
        .match(/[aeiouy]{1,2}/g);
    return groups ? groups.length : 1;
}

// ---------- Scanning helpers ----------

// Word-boundary scan that reports every occurrence with its offsets.
function kwScanWords(text, list, kind, noteFor) {
    const marks = [];
    if (!list.length) return marks;
    const escaped = list.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
    let m;
    while ((m = re.exec(text)) !== null) {
        marks.push({
            start: m.index,
            end: m.index + m[0].length,
            word: m[0],
            kind,
            note: noteFor ? noteFor(m[0].toLowerCase()) : ''
        });
    }
    return marks;
}

function kwScanPhrases(text, phrases, kind, note) {
    const marks = [];
    phrases.forEach(p => {
        const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        let m;
        while ((m = re.exec(text)) !== null) {
            marks.push({ start: m.index, end: m.index + m[0].length, word: m[0], kind, note });
        }
    });
    return marks;
}

// -ly adverbs, the classic prop for a verb that isn't pulling its weight.
function kwScanAdverbs(text) {
    const marks = [];
    // "only", "family", "reply" etc. end in -ly without being adverbs.
    const notAdverbs = new Set(['only', 'family', 'reply', 'apply', 'supply', 'july', 'ugly', 'silly', 'jelly', 'belly', 'fly', 'lily', 'holy', 'early', 'likely', 'lovely', 'friendly', 'lonely', 'daily']);
    const re = /\b([a-z]{4,}ly)\b/gi;
    let m;
    while ((m = re.exec(text)) !== null) {
        if (notAdverbs.has(m[0].toLowerCase())) continue;
        marks.push({
            start: m.index, end: m.index + m[0].length, word: m[0], kind: 'adverb',
            note: `"${m[0]}" is propping up the verb. A stronger verb usually does the job alone.`
        });
    }
    return marks;
}

// ---------- Main entry point ----------

function analyzeText(rawText) {
    const text = String(rawText || '');
    const sentences = kwSentences(text);
    const paragraphs = kwParagraphs(text);
    const words = kwWords(text);
    const wordCount = words.length;

    const stats = {
        words: wordCount,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        characters: text.length
    };

    if (wordCount < 20) {
        return {
            empty: true,
            stats,
            scores: {},
            marks: [],
            findings: [{
                tone: 'tip',
                title: 'Write a bit more first',
                body: 'The coach needs about 20 words before it can spot patterns. Keep going — you can run it again any time.'
            }]
        };
    }

    // --- Sentence rhythm ---
    const lengths = sentences.map(s => kwWords(s.text).length).filter(n => n > 0);
    const avgLen = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1);
    const variance = lengths.reduce((a, n) => a + Math.pow(n - avgLen, 2), 0) / (lengths.length || 1);
    const spread = Math.sqrt(variance);
    const longest = sentences[lengths.indexOf(Math.max(...lengths))] || null;
    const shortSentences = lengths.filter(n => n <= 6).length;

    stats.avgSentenceLength = Math.round(avgLen * 10) / 10;
    stats.sentenceSpread = Math.round(spread * 10) / 10;
    stats.longestSentence = Math.max(...lengths);

    // --- Readability (Flesch-Kincaid grade level) ---
    const syllables = words.reduce((a, w) => a + kwSyllables(w), 0);
    stats.gradeLevel = Math.max(1, Math.round(
        (0.39 * (wordCount / (sentences.length || 1))) + (11.8 * (syllables / wordCount)) - 15.59
    ));

    // --- Vocabulary richness ---
    const unique = new Set(words);
    stats.uniqueRatio = Math.round((unique.size / wordCount) * 100);

    // --- Dialogue ---
    const dialogueChunks = text.match(/["“][^"”]{2,}["”]/g) || [];
    stats.dialogueLines = dialogueChunks.length;
    stats.dialogueRatio = Math.round(
        (dialogueChunks.join(' ').split(/\s+/).filter(Boolean).length / wordCount) * 100
    );

    // --- Marks (the coloured highlights) ---
    const marks = [
        ...kwScanWords(text, Object.keys(WEAK_VERBS), 'weak',
            w => `Try: ${(WEAK_VERBS[w] || []).slice(0, 4).join(', ')}`),
        ...kwScanWords(text, Object.keys(WEAK_ADJECTIVES), 'weak',
            w => `Try: ${(WEAK_ADJECTIVES[w] || []).slice(0, 4).join(', ')}`),
        ...kwScanWords(text, CRUTCH_WORDS, 'weak',
            w => `"${w}" adds no picture. Delete it, or replace the word after it.`),
        ...kwScanAdverbs(text),
        ...kwScanWords(text, FILTER_WORDS, 'filter',
            w => `"${w}" stands between the reader and the scene. Show the thing happening instead.`),
        ...kwScanWords(text, TELLING_EMOTIONS, 'telling',
            w => `You told us "${w}". What does the body do? Show that instead.`),
        ...kwScanPhrases(text, CLICHES, 'cliche',
            'Readers have met this phrase before. Invent your own version.')
    ];

    // Overlapping marks (e.g. "very" inside a cliché) make the highlighter
    // render nonsense, so keep the first mark at each position.
    marks.sort((a, b) => a.start - b.start || b.end - a.end);
    const cleanMarks = [];
    let cursor = -1;
    marks.forEach(m => {
        if (m.start >= cursor) { cleanMarks.push(m); cursor = m.end; }
    });

    const byKind = kind => cleanMarks.filter(m => m.kind === kind);

    // --- Repeated sentence openers ---
    const openers = sentences.map(s => (kwWords(s.text)[0] || ''));
    const openerCounts = {};
    openers.forEach(o => { if (o) openerCounts[o] = (openerCounts[o] || 0) + 1; });
    const repeatedOpener = Object.entries(openerCounts)
        .filter(([w, n]) => n >= 3 && WEAK_OPENERS.includes(w))
        .sort((a, b) => b[1] - a[1])[0];

    // --- Overused words (the child's own, not from any list) ---
    const stopWords = new Set(['the', 'a', 'an', 'and', 'but', 'or', 'to', 'of', 'in', 'on', 'at', 'it', 'is', 'was', 'were', 'be', 'i', 'he', 'she', 'they', 'we', 'you', 'my', 'his', 'her', 'their', 'that', 'this', 'with', 'for', 'as', 'had', 'have', 'not', 'me', 'him', 'them', 'so', 'up', 'out', 'if', 'me', 'do', 'did', 'from', 'all', 'we', 'what', 'when', 'then', 'there', 'his']);
    const freq = {};
    words.forEach(w => { if (!stopWords.has(w) && w.length > 3) freq[w] = (freq[w] || 0) + 1; });
    const overused = Object.entries(freq)
        .filter(([w, n]) => n >= Math.max(3, Math.round(wordCount / 90)))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    // --- Sensory detail ---
    const sensoryList = [].concat(WORD_BANK['Sound words'], WORD_BANK['Smell & taste'], WORD_BANK['Touch words']);
    const sensoryHits = kwScanWords(text, sensoryList, 'sensory').length;

    // --- Scores: 0-100, each one thing the child can actually move ---
    const per100 = n => (n / wordCount) * 100;

    // Floor of 10, not 0. A rough draft should read as "lots to work on", never
    // as "you scored nothing" — the second one makes children stop writing.
    const clamp = n => Math.max(10, Math.min(100, Math.round(n)));

    // Scores are penalised against a TOLERANCE, not from the first flag. Even
    // published prose contains the odd "went" or "looked"; a flat multiplier
    // scored a genuinely good paragraph at 41, which is both wrong and
    // discouraging. Below tolerance = full marks; past it, the penalty bites.
    const overTolerance = (count, perHundred) => Math.max(0, per100(count) - perHundred);

    const scores = {
        // Slopes calibrated against three sample drafts (polished / average /
        // deliberately awful) so the three land roughly 90 / 50 / 30 rather than
        // all bottoming out together.
        wordPower: clamp(100 - overTolerance(byKind('weak').length + byKind('adverb').length, 2.0) * 3.5),
        rhythm:    clamp(100 - Math.abs(spread - 7) * 7 - Math.max(0, avgLen - 22) * 3),
        showing:   clamp(100 - overTolerance(byKind('telling').length + byKind('filter').length, 1.5) * 5),
        freshness: clamp(65 + (stats.uniqueRatio - 40) * 1.4 - byKind('cliche').length * 12 - overused.length * 5)
    };

    // ---------- Findings ----------
    const findings = [];
    const add = (tone, title, body, extra) => findings.push(Object.assign({ tone, title, body }, extra || {}));

    // Weak verbs / adjectives — with swap suggestions drawn from the child's text.
    const weakHits = byKind('weak').filter(m => WEAK_VERBS[m.word.toLowerCase()] || WEAK_ADJECTIVES[m.word.toLowerCase()]);
    if (weakHits.length) {
        const first = weakHits[0].word.toLowerCase();
        const swaps = WEAK_VERBS[first] || WEAK_ADJECTIVES[first] || [];
        add('warn', `${weakHits.length} word${weakHits.length > 1 ? 's' : ''} could work harder`,
            `You used "${first}". Words like this fit anywhere, which means they show nothing. Pick one that only fits YOUR scene.`,
            { chips: swaps.slice(0, 5), chipLabel: 'Swap ideas:' });
    }

    const crutchHits = byKind('weak').filter(m => CRUTCH_WORDS.includes(m.word.toLowerCase()));
    if (crutchHits.length >= 2) {
        add('warn', `${crutchHits.length} filler words`,
            `Words like ${[...new Set(crutchHits.map(m => `"${m.word.toLowerCase()}"`))].slice(0, 4).join(', ')} shrink the word after them. "Very big" is weaker than "enormous". Try deleting them and see if the sentence still works.`);
    }

    const adverbHits = byKind('adverb');
    if (adverbHits.length >= 2) {
        add('warn', `${adverbHits.length} "-ly" words holding up verbs`,
            `Like ${[...new Set(adverbHits.map(m => `"${m.word}"`))].slice(0, 3).join(', ')}. "Ran quickly" is one strong word away from "sprinted".`);
    }

    // Telling vs showing.
    const tellingHits = byKind('telling');
    if (tellingHits.length) {
        const w = tellingHits[0].word.toLowerCase();
        add('tip', 'Show the feeling instead of naming it',
            `You wrote "${w}". Naming a feeling is the fastest way to say it and the slowest way to make a reader feel it. What do the hands, breath or voice do?`,
            {
                before: `She was ${w}.`,
                after: KW_SHOW_EXAMPLES[w] || 'Her jaw locked and she stared at the floor without blinking.'
            });
    }

    const filterHits = byKind('filter');
    if (filterHits.length >= 2) {
        add('tip', `${filterHits.length} camera words`,
            `Words like ${[...new Set(filterHits.map(m => `"${m.word.toLowerCase()}"`))].slice(0, 3).join(', ')} put a lens between the reader and the action.`,
            { before: 'She saw the door creak open.', after: 'The door creaked open.' });
    }

    // Rhythm.
    if (lengths.length >= 4) {
        if (spread < 3.5) {
            add('warn', 'Your sentences are all the same length',
                `Almost every sentence is about ${Math.round(avgLen)} words long, which makes the writing feel like a drumbeat. Break one long sentence in two. Then leave a short one on its own. Like that.`);
        } else if (spread > 12) {
            add('tip', 'Wild sentence lengths',
                'You mix very short and very long sentences — that can be great for tension, just make sure the long ones are still easy to follow out loud.');
        } else {
            add('good', 'Nice sentence rhythm',
                `Your sentences vary from short to long (average ${Math.round(avgLen)} words). That's exactly what keeps a reader moving.`);
        }
    }

    if (longest && stats.longestSentence > 32) {
        add('warn', `One sentence runs ${stats.longestSentence} words`,
            'Read it out loud. If you run out of breath, your reader does too. Find the natural half-way point and put a full stop there.',
            { quote: longest.text.length > 220 ? longest.text.slice(0, 220) + '…' : longest.text });
    }

    if (shortSentences === 0 && lengths.length >= 5) {
        add('tip', 'No short sentences at all',
            'A three-word sentence is a punch. Drop one in at your most exciting moment and watch it land.');
    }

    // Repetition.
    if (repeatedOpener) {
        add('warn', `${repeatedOpener[1]} sentences start with "${repeatedOpener[0]}"`,
            'Try starting one with an action, one with a sound, and one with where you are. Same events, completely different feel.');
    }

    if (overused.length) {
        add('warn', 'Words you leaned on',
            'These show up a lot. Repeating on purpose is powerful; repeating by accident is invisible to you and loud to a reader.',
            { chips: overused.map(([w, n]) => `${w} ×${n}`), chipLabel: 'Counted:' });
    }

    // Clichés.
    const clicheHits = byKind('cliche');
    if (clicheHits.length) {
        add('warn', `${clicheHits.length} borrowed phrase${clicheHits.length > 1 ? 's' : ''}`,
            `Such as "${clicheHits[0].word}". These were brilliant the first time someone wrote them. Your version will be better because nobody has read it yet.`);
    }

    // Sensory detail.
    if (sensoryHits === 0 && wordCount > 120) {
        add('tip', 'No sounds, smells or textures yet',
            'Right now the reader can only see your scene. Add one sound and one smell and it becomes a place they are standing in.');
    } else if (sensoryHits >= 3) {
        add('good', `${sensoryHits} sensory details`, 'You are writing with more than just eyes. That is what makes a scene feel real.');
    }

    // Dialogue.
    if (stats.dialogueLines === 0 && wordCount > 150) {
        add('tip', 'Nobody speaks in this chapter',
            'Dialogue is the fastest way to show what a character wants. Even one line changes the pace.');
    } else if (stats.dialogueRatio > 70) {
        add('tip', 'Almost all dialogue',
            'Great voices — but the reader is floating in white space. Drop in what the characters are doing while they talk.');
    } else if (stats.dialogueLines > 0) {
        add('good', `${stats.dialogueLines} lines of dialogue`, 'Good — voices bring a scene to life.');
    }

    // Paragraphing.
    const longParas = paragraphs.filter(p => kwWords(p).length > 140).length;
    if (longParas) {
        add('warn', `${longParas} very long paragraph${longParas > 1 ? 's' : ''}`,
            'Start a new paragraph when the time, the place, the speaker or the idea changes. It gives the reader somewhere to breathe.');
    }

    // Readability, framed as a fact rather than a judgement.
    add('tip', `Reads at about a Grade ${stats.gradeLevel} level`,
        stats.gradeLevel <= 3
            ? 'Very easy to read. If your characters are older than your readers, try letting a few sentences stretch out.'
            : stats.gradeLevel >= 9
                ? 'Quite dense. Not wrong — just check that a friend your age can follow it out loud.'
                : 'A comfortable reading level for a story like this.');

    // Always end on something true and encouraging that isn't flattery.
    if (!findings.some(f => f.tone === 'good')) {
        add('good', `You wrote ${wordCount} words`,
            'That is the part most people never do. Everything else on this page is just tidying.');
    }

    // Warnings first (they are the actionable ones), praise last.
    const order = { warn: 0, tip: 1, good: 2 };
    findings.sort((a, b) => order[a.tone] - order[b.tone]);

    return { empty: false, stats, scores, marks: cleanMarks, findings };
}

// Concrete "show" rewrites, so the coach never says "show don't tell" without
// demonstrating what that actually looks like.
const KW_SHOW_EXAMPLES = {
    angry:        'His fists curled until his nails bit into his palms.',
    furious:      'She kicked the chair so hard it skidded into the wall.',
    sad:          'He kept blinking at the window and pretending it was the light.',
    happy:        'She skipped the last three steps and landed with both feet.',
    excited:      'He could not keep his knees still under the table.',
    scared:       'She backed up until the wall stopped her.',
    afraid:       'His voice came out half a size too small.',
    nervous:      'He wiped his hands on his jeans. Twice.',
    bored:        'She had counted the ceiling tiles three times.',
    annoyed:      'He let out a breath through his nose, slowly.',
    worried:      'She checked the door again, even though she had just locked it.',
    lonely:       'He saved the seat next to him anyway.',
    embarrassed:  'Her ears went hot and she studied her shoes.'
};
