// Story Tools — planning and idea-generation, all saved against the child's
// actual book so planning and drafting are not two separate universes.

const STORY_SPINE = [
    { key: 'hero',      label: 'Who is this about?',            hint: 'Not their hair colour — what are they like when nobody is watching?' },
    { key: 'want',      label: 'What do they want?',            hint: 'One clear thing. "To find her brother." "To win the race."' },
    { key: 'why',       label: 'Why do they want it so badly?', hint: 'This is the part readers actually care about.' },
    { key: 'obstacle',  label: 'What is in the way?',           hint: 'A person, a rule, a fear, or all three.' },
    { key: 'tries',     label: 'What do they try — and how does it fail?', hint: 'At least two failed attempts. Failure is the story.' },
    { key: 'worst',     label: 'What is the worst moment?',     hint: 'The bit where it looks impossible. Do not soften it.' },
    { key: 'choice',    label: 'What do they choose in the end?', hint: 'A real choice with a cost. Luck is not a choice.' },
    { key: 'changed',   label: 'How are they different afterwards?', hint: 'If nothing changed, it was an event, not a story.' }
];

const CHARACTER_FIELDS = [
    { key: 'name',    label: 'Name' },
    { key: 'want',    label: 'What they want (in this book)' },
    { key: 'fear',    label: 'What they are afraid of' },
    { key: 'secret',  label: 'Something they have never told anyone' },
    { key: 'habit',   label: 'One small habit or object that is only theirs' },
    { key: 'voice',   label: 'How they talk (a phrase they always use)' }
];

const STORY_SPARKS = {
    'What if...': [
        'What if the last book in the library was never meant to be read?',
        'What if your shadow started arriving five minutes before you did?',
        'What if everyone in town could hear one single thought of yours per day?',
        'What if the lost property box gave back things nobody had lost yet?',
        'What if your grandmother\'s stories turned out to be a warning?'
    ],
    'First lines': [
        'The note on the fridge was in my handwriting, and I had not written it.',
        'We agreed never to go back, and then Dara found the key.',
        'The dog came home. The dog had been gone eleven years.',
        'Nobody told me the rules until I had already broken three of them.',
        'On the morning the river ran backwards, only the cat seemed surprised.'
    ],
    'Trouble to add': [
        'The one person who could help has good reasons not to.',
        'Your character gets exactly what they wanted and it is worse.',
        'Someone finds out the secret — but says nothing.',
        'The map is right. The dates on it are not.',
        'Two characters need the same object for opposite reasons.'
    ],
    'Settings': [
        'A swimming pool drained for the winter.',
        'The back room of a shop that only sells one thing.',
        'A bus route that gained a stop nobody remembers voting for.',
        'The inside of a tree that is bigger than the tree.',
        'A school on the last day before it closes forever.'
    ]
};

function renderToolsView(container) {
    const lib = getLibrary();
    const book = getBook(kwState.bookId) || lib.books[0] || null;

    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">🧰 Story Tools</h2>
            <p class="panel-sub">
                ${book
                    ? `Planning for <strong>${escapeHtml(book.title)}</strong>. Everything here saves into that book.`
                    : 'Make a book first and these tools will save into it — but you can still play with the sparks below.'}
            </p>
            <div class="grid-auto">
                <button class="mini-card" data-tool="spine">
                    <div style="font-size:1.7rem;">🗺️</div>
                    <div class="mini-card-title">Story Spine</div>
                    <div class="mini-card-desc">Eight questions that turn an idea into a plot.</div>
                </button>
                <button class="mini-card" data-tool="characters">
                    <div style="font-size:1.7rem;">🎭</div>
                    <div class="mini-card-title">Character Builder</div>
                    <div class="mini-card-desc">Wants, fears and secrets — not eye colour.</div>
                </button>
                <button class="mini-card" data-tool="wordbank">
                    <div style="font-size:1.7rem;">🏦</div>
                    <div class="mini-card-title">Word Bank</div>
                    <div class="mini-card-desc">Strong verbs and sensory words to borrow.</div>
                </button>
                <button class="mini-card" data-tool="sparks">
                    <div style="font-size:1.7rem;">⚡</div>
                    <div class="mini-card-title">Story Sparks</div>
                    <div class="mini-card-desc">What-ifs, first lines and trouble to add.</div>
                </button>
            </div>
        </div>
        <div id="kwToolStage"></div>`;

    container.querySelectorAll('[data-tool]').forEach(b =>
        b.addEventListener('click', () => openTool(b.dataset.tool, book)));

    openTool('spine', book);
}

function openTool(tool, book) {
    const stage = document.getElementById('kwToolStage');
    if (!stage) return;
    if (tool === 'spine') return renderSpineTool(stage, book);
    if (tool === 'characters') return renderCharacterTool(stage, book);
    if (tool === 'wordbank') return renderWordBank(stage);
    if (tool === 'sparks') return renderSparks(stage);
}

// ---------- Story Spine ----------

function renderSpineTool(stage, book) {
    if (!book) {
        stage.innerHTML = `<div class="panel"><p class="panel-sub" style="margin:0;">Create a book on the <strong>My Books</strong> tab to use the Story Spine.</p></div>`;
        return;
    }
    const spine = book.spine || {};
    const filled = STORY_SPINE.filter(f => (spine[f.key] || '').trim()).length;

    stage.innerHTML = `
        <div class="panel">
            <h3 class="panel-title" style="font-size:1.15rem;">🗺️ Story Spine — ${escapeHtml(book.title)}</h3>
            <p class="panel-sub">${filled} of ${STORY_SPINE.length} answered. You do not have to know all of it before you write — but knowing the <em>want</em> and the <em>obstacle</em> stops most stalls.</p>
            ${STORY_SPINE.map(f => `
                <div class="sandbox-input-group">
                    <label class="sandbox-label" for="spine_${f.key}">${escapeHtml(f.label)}</label>
                    <textarea id="spine_${f.key}" class="sandbox-input" data-spine="${f.key}"
                        placeholder="${escapeHtml(f.hint)}" style="min-height:64px;">${escapeHtml(spine[f.key] || '')}</textarea>
                </div>`).join('')}
            <button class="fb-action-btn gold" id="kwSaveSpine">Save Story Spine</button>
        </div>`;

    document.getElementById('kwSaveSpine').addEventListener('click', () => {
        const next = {};
        stage.querySelectorAll('[data-spine]').forEach(t => next[t.dataset.spine] = t.value.trim());
        updateBook(book.id, { spine: next });
        const complete = STORY_SPINE.every(f => next[f.key]);
        if (complete) unlockBadge('planner'); else addXP(10);
        showToast('Story Spine saved.', 'green');
        renderSpineTool(stage, getBook(book.id));
    });
}

// ---------- Character Builder ----------

function renderCharacterTool(stage, book) {
    if (!book) {
        stage.innerHTML = `<div class="panel"><p class="panel-sub" style="margin:0;">Create a book first to save characters.</p></div>`;
        return;
    }
    const chars = book.characters || [];

    stage.innerHTML = `
        <div class="panel">
            <h3 class="panel-title" style="font-size:1.15rem;">🎭 Characters in ${escapeHtml(book.title)}</h3>
            <p class="panel-sub">A character is a want plus a fear. Everything else is decoration.</p>

            ${chars.length ? chars.map((c, i) => `
                <div class="finding tip" style="border-left-color:var(--pink-energy);">
                    <div class="finding-title">${escapeHtml(c.name || 'Unnamed')}</div>
                    <div class="finding-body">
                        ${CHARACTER_FIELDS.filter(f => f.key !== 'name' && c[f.key]).map(f =>
                            `<div><strong>${escapeHtml(f.label)}:</strong> ${escapeHtml(c[f.key])}</div>`).join('') || '<em>No details yet.</em>'}
                    </div>
                    <button class="fb-action-btn outline" data-del-char="${i}" style="margin-top:8px; padding:3px 10px; font-size:.78rem; border-color:var(--red-alert); color:var(--red-alert);">Delete</button>
                </div>`).join('') : '<p class="panel-sub">No characters yet.</p>'}

            <h4 style="margin:18px 0 10px; font-family:var(--font-heading);">➕ New character</h4>
            ${CHARACTER_FIELDS.map(f => `
                <div class="sandbox-input-group">
                    <label class="sandbox-label" for="char_${f.key}">${escapeHtml(f.label)}</label>
                    <input type="text" id="char_${f.key}" class="sandbox-input" data-char="${f.key}">
                </div>`).join('')}
            <button class="fb-action-btn pink" id="kwAddChar">Add character</button>
        </div>`;

    document.getElementById('kwAddChar').addEventListener('click', () => {
        const c = {};
        stage.querySelectorAll('[data-char]').forEach(i => c[i.dataset.char] = i.value.trim());
        if (!c.name) { showToast('Give them a name first.', 'red'); return; }
        const list = (getBook(book.id).characters || []).concat([c]);
        updateBook(book.id, { characters: list });
        addXP(15);
        showToast(`${c.name} added.`, 'green');
        renderCharacterTool(stage, getBook(book.id));
    });

    stage.querySelectorAll('[data-del-char]').forEach(b => b.addEventListener('click', () => {
        const list = (getBook(book.id).characters || []).filter((_, i) => i !== parseInt(b.dataset.delChar, 10));
        updateBook(book.id, { characters: list });
        renderCharacterTool(stage, getBook(book.id));
    }));
}

// ---------- Word Bank ----------

function renderWordBank(stage) {
    stage.innerHTML = `
        <div class="panel">
            <h3 class="panel-title" style="font-size:1.15rem;">🏦 Word Bank</h3>
            <p class="panel-sub">Borrow freely — but only if the word is <em>truer</em> than the one you had. A fancy word in the wrong place is worse than a plain one in the right place.</p>
            ${Object.entries(WORD_BANK).map(([group, words]) => `
                <h4 style="font-family:var(--font-heading); color:var(--gold-star); margin:16px 0 8px;">${escapeHtml(group)}</h4>
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${words.map(w => `<span class="chip">${escapeHtml(w)}</span>`).join('')}
                </div>`).join('')}

            <h4 style="font-family:var(--font-heading); color:var(--cyan-magic); margin:20px 0 8px;">🔄 Weak word → stronger options</h4>
            <div style="display:flex; flex-direction:column; gap:7px;">
                ${Object.entries(WEAK_VERBS).map(([weak, strong]) => `
                    <div style="display:flex; gap:9px; align-items:baseline; flex-wrap:wrap;">
                        <span class="chip" style="border-color:var(--red-alert); color:var(--red-alert); min-width:78px;">${escapeHtml(weak)}</span>
                        <span style="color:var(--text-muted);">→</span>
                        ${strong.map(s => `<span class="chip">${escapeHtml(s)}</span>`).join('')}
                    </div>`).join('')}
            </div>
        </div>`;
}

// ---------- Story Sparks ----------

function renderSparks(stage) {
    const pickAll = () => Object.fromEntries(
        Object.entries(STORY_SPARKS).map(([k, v]) => [k, v[Math.floor(Math.random() * v.length)]])
    );
    const draw = pickAll();

    stage.innerHTML = `
        <div class="panel">
            <h3 class="panel-title" style="font-size:1.15rem;">⚡ Story Sparks</h3>
            <p class="panel-sub">A spark is not a plot. Take one, then ask "and what goes wrong?" until you have a story.</p>
            ${Object.keys(STORY_SPARKS).map(k => `
                <div class="finding tip" data-spark-group="${escapeHtml(k)}">
                    <div class="finding-title">${escapeHtml(k)}</div>
                    <div class="finding-body" data-spark-text style="font-size:1rem; color:var(--text-main);">${escapeHtml(draw[k])}</div>
                </div>`).join('')}
            <button class="fb-action-btn cyan" id="kwRerollSparks">🎲 Reroll</button>
        </div>`;

    document.getElementById('kwRerollSparks').addEventListener('click', () => {
        stage.querySelectorAll('[data-spark-group]').forEach(el => {
            const list = STORY_SPARKS[el.dataset.sparkGroup];
            el.querySelector('[data-spark-text]').textContent = list[Math.floor(Math.random() * list.length)];
        });
    });
}
