// Writing Desk view: the manuscript editor plus the Revision Lab report.
//
// The editor is a plain <textarea> on purpose. contenteditable would let us
// highlight in place, but it also breaks undo, mobile keyboards and paste from
// Docs — all things a child actually uses. Instead the highlights render in a
// separate read-only "marked up" panel next to the text.

let kwLastReport = null;
let kwSaveTimer = null;

function renderWriteView(container) {
    const book = getBook(kwState.bookId);
    if (!book) { kwState.view = 'library'; renderCurrentView(); return; }

    const chapter = getChapter(book.id, kwState.chapterId) || book.chapters[0];
    kwState.chapterId = chapter.id;

    container.innerHTML = `
        <div class="panel">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
                <div>
                    <span class="nb-badge">${escapeHtml(book.genre)}</span>
                    <h2 class="panel-title" style="margin-top:6px;">${escapeHtml(book.title)}</h2>
                    <p class="panel-sub" style="margin:0;">${bookWordCount(book).toLocaleString()} words across ${book.chapters.length} chapter${book.chapters.length > 1 ? 's' : ''}</p>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button class="fb-action-btn outline" id="kwBackToLibrary">← My Books</button>
                    <button class="fb-action-btn outline" id="kwExportBook">⬇ Export</button>
                </div>
            </div>

            <div class="editor-toolbar" style="margin-top:14px;">
                <label class="sandbox-label" for="kwChapterSelect" style="margin:0;">Chapter</label>
                <select id="kwChapterSelect" class="sandbox-input" style="width:auto; min-width:180px;">
                    ${book.chapters.map(c => `<option value="${escapeHtml(c.id)}" ${c.id === chapter.id ? 'selected' : ''}>${escapeHtml(c.title)}</option>`).join('')}
                </select>
                <button class="fb-action-btn outline" id="kwAddChapter">+ Chapter</button>
                <button class="fb-action-btn outline" id="kwRenameChapter">✏️ Rename</button>
                <button class="fb-action-btn outline" id="kwDeleteChapter" style="border-color:var(--red-alert); color:var(--red-alert);">🗑️</button>
            </div>
        </div>

        <div class="editor-layout">
            <div class="panel" style="margin:0;">
                <div class="editor-toolbar">
                    <span class="wordcount-chip">📝 <strong id="kwLiveWords">0</strong> words</span>
                    <span class="wordcount-chip">🎯 Today: <strong id="kwTodayWords">0</strong> / ${currentProfile.dailyGoal}</span>
                    <span class="wordcount-chip">🔥 <strong id="kwStreakCount">0</strong> day streak</span>
                    <span style="flex:1;"></span>
                    <span id="kwSaveState" class="wordcount-chip" aria-live="polite">Saved</span>
                </div>

                <label class="sandbox-label" for="kwManuscript">Your chapter — write freely, tidy later</label>
                <textarea id="kwManuscript" class="manuscript" spellcheck="true"
                    placeholder="Start where the trouble starts...">${escapeHtml(chapter.text)}</textarea>

                <div style="display:flex; gap:9px; flex-wrap:wrap; margin-top:14px;">
                    <button class="fb-action-btn pink" id="kwRunCoach">🔍 Ask the Coach</button>
                    <button class="fb-action-btn outline" id="kwStartSprint">⏱️ Writing Sprint</button>
                    <button class="fb-action-btn outline" id="kwStuckBtn">💡 I'm stuck</button>
                </div>
            </div>

            <div class="panel" id="kwCoachPanel" style="margin:0;">
                <h3 class="panel-title" style="font-size:1.1rem;">Revision Lab</h3>
                <p class="panel-sub">Write your chapter, then press <strong>Ask the Coach</strong>. Nothing you write ever leaves this device.</p>
                <div id="kwCoachReport"></div>
            </div>
        </div>

        <div class="panel" id="kwMarkedPanel" style="display:none;">
            <h3 class="panel-title" style="font-size:1.1rem;">Your chapter, marked up</h3>
            <p class="panel-sub">
                <span class="chip mark-hit mark-weak">weak word</span>
                <span class="chip mark-hit mark-adverb">-ly crutch</span>
                <span class="chip mark-hit mark-filter">camera word</span>
                <span class="chip mark-hit mark-telling">telling</span>
                <span class="chip mark-hit mark-cliche">borrowed phrase</span>
                — hover any highlight for the fix.
            </p>
            <div class="marked-view" id="kwMarkedView"></div>
        </div>
    `;

    const ta = document.getElementById('kwManuscript');

    const refreshCounts = () => {
        document.getElementById('kwLiveWords').textContent = countWords(ta.value).toLocaleString();
        document.getElementById('kwTodayWords').textContent = currentProfile.dailyWords[kwTodayKey()] || 0;
        document.getElementById('kwStreakCount').textContent = kwStreakLength();
    };
    refreshCounts();

    // Debounced autosave: a child should never have to think about saving, but
    // saving on every keystroke would also credit the streak keystroke by keystroke.
    ta.addEventListener('input', () => {
        document.getElementById('kwSaveState').textContent = 'Saving…';
        document.getElementById('kwLiveWords').textContent = countWords(ta.value).toLocaleString();
        clearTimeout(kwSaveTimer);
        kwSaveTimer = setTimeout(() => {
            saveChapterText(book.id, kwState.chapterId, ta.value);
            document.getElementById('kwSaveState').textContent = 'Saved';
            refreshCounts();
        }, 900);
    });

    document.getElementById('kwBackToLibrary').onclick = () => {
        saveChapterText(book.id, kwState.chapterId, ta.value);
        kwState.view = 'library';
        renderCurrentView();
    };
    document.getElementById('kwExportBook').onclick = () => {
        saveChapterText(book.id, kwState.chapterId, ta.value);
        exportBookText(book.id);
    };
    document.getElementById('kwChapterSelect').onchange = e => {
        saveChapterText(book.id, kwState.chapterId, ta.value);
        kwState.chapterId = e.target.value;
        renderCurrentView();
    };
    document.getElementById('kwAddChapter').onclick = () => {
        saveChapterText(book.id, kwState.chapterId, ta.value);
        const ch = addChapter(book.id);
        kwState.chapterId = ch.id;
        renderCurrentView();
    };
    document.getElementById('kwRenameChapter').onclick = () => {
        const name = prompt('Chapter title:', chapter.title);
        if (name && name.trim()) { renameChapter(book.id, chapter.id, name.trim()); renderCurrentView(); }
    };
    document.getElementById('kwDeleteChapter').onclick = () => {
        if (book.chapters.length <= 1) { showToast('A book needs at least one chapter.', 'red'); return; }
        if (!confirm(`Delete "${chapter.title}"? This cannot be undone.`)) return;
        deleteChapter(book.id, chapter.id);
        kwState.chapterId = null;
        renderCurrentView();
    };
    document.getElementById('kwRunCoach').onclick = () => {
        saveChapterText(book.id, kwState.chapterId, ta.value);
        runCoach(ta.value, book.id, kwState.chapterId);
    };
    document.getElementById('kwStartSprint').onclick = () => openSprintModal();
    document.getElementById('kwStuckBtn').onclick = () => openUnstuckModal();

    // Re-render the last report if the child is coming back to this chapter.
    if (chapter.text.trim()) runCoach(chapter.text, book.id, chapter.id, true);
}

// ---------- Running & rendering the report ----------

function runCoach(text, bookId, chapterId, silent) {
    const report = analyzeText(text);
    kwLastReport = report;
    renderCoachReport(report);
    renderMarkedView(text, report.marks);

    if (silent) return;
    const n = noteRevision(bookId, chapterId);
    addXP(15);
    showToast(n >= 2 ? 'Revision pass complete — this is what real writers do.' : 'Coach report ready!', 'cyan');
}

function kwScoreColour(v) {
    if (v >= 75) return 'var(--green-hero)';
    if (v >= 50) return 'var(--gold-star)';
    return 'var(--red-alert)';
}

function renderCoachReport(report) {
    const el = document.getElementById('kwCoachReport');
    if (!el) return;

    if (report.empty) {
        el.innerHTML = `<div class="finding tip"><div class="finding-title">${escapeHtml(report.findings[0].title)}</div><div class="finding-body">${escapeHtml(report.findings[0].body)}</div></div>`;
        const mp = document.getElementById('kwMarkedPanel');
        if (mp) mp.style.display = 'none';
        return;
    }

    const s = report.scores;
    const tiles = [
        ['Word Power', s.wordPower, 'strong, specific words'],
        ['Rhythm', s.rhythm, 'sentence length variety'],
        ['Showing', s.showing, 'scenes, not summaries'],
        ['Freshness', s.freshness, 'your own phrasing']
    ];

    el.innerHTML = `
        <div class="score-row">
            ${tiles.map(([label, val, note]) => `
                <div class="score-tile">
                    <div class="score-value" style="color:${kwScoreColour(val)};">${val}</div>
                    <div class="score-label">${escapeHtml(label)}</div>
                    <div class="meter-outer"><div class="meter-inner" style="width:${val}%; background:${kwScoreColour(val)};"></div></div>
                    <div class="score-note">${escapeHtml(note)}</div>
                </div>`).join('')}
        </div>

        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px;">
            <span class="wordcount-chip">${report.stats.words} words</span>
            <span class="wordcount-chip">${report.stats.sentences} sentences</span>
            <span class="wordcount-chip">avg <strong>${report.stats.avgSentenceLength}</strong> words/sentence</span>
            <span class="wordcount-chip">${report.stats.uniqueRatio}% different words</span>
        </div>

        ${report.findings.map(f => `
            <div class="finding ${escapeHtml(f.tone)}">
                <div class="finding-title">${f.tone === 'good' ? '✅ ' : f.tone === 'warn' ? '🔧 ' : '💡 '}${escapeHtml(f.title)}</div>
                <div class="finding-body">${escapeHtml(f.body)}</div>
                ${f.quote ? `<div class="ba-box ba-before" style="margin-top:9px;"><span class="ba-tag">From your chapter</span>${escapeHtml(f.quote)}</div>` : ''}
                ${f.before ? `
                    <div class="before-after">
                        <div class="ba-box ba-before"><span class="ba-tag">Telling</span>${escapeHtml(f.before)}</div>
                        <div class="ba-box ba-after"><span class="ba-tag">Showing</span>${escapeHtml(f.after)}</div>
                    </div>` : ''}
                ${f.chips && f.chips.length ? `
                    <div class="finding-examples">
                        <span style="font-size:.78rem; color:var(--text-muted); font-weight:700;">${escapeHtml(f.chipLabel || '')}</span>
                        ${f.chips.map(c => `<span class="chip">${escapeHtml(c)}</span>`).join('')}
                    </div>` : ''}
            </div>`).join('')}
    `;
}

// Builds the highlighted mirror. Marks arrive sorted and non-overlapping from
// the analyzer, so a single left-to-right pass is enough.
function renderMarkedView(text, marks) {
    const panel = document.getElementById('kwMarkedPanel');
    const view = document.getElementById('kwMarkedView');
    if (!panel || !view) return;

    if (!marks.length) {
        panel.style.display = 'block';
        view.innerHTML = `<em style="color:#6B7280;">No flagged words in this draft. Clean prose.</em>`;
        return;
    }

    let html = '';
    let cursor = 0;
    marks.forEach(m => {
        html += escapeHtml(text.slice(cursor, m.start));
        html += `<span class="mark-hit mark-${escapeHtml(m.kind)}" title="${escapeHtml(m.note)}">${escapeHtml(text.slice(m.start, m.end))}</span>`;
        cursor = m.end;
    });
    html += escapeHtml(text.slice(cursor));

    view.innerHTML = html;
    panel.style.display = 'block';
}

// ---------- Sprint timer ----------

let kwSprintInterval = null;

function openSprintModal() {
    kwShowModal('kwSprintModal', `
        <h2 class="concept-title">⏱️ Writing Sprint</h2>
        <p style="color:var(--text-muted); margin:8px 0 18px;">
            Pick a length, then write without stopping and without fixing anything.
            Backspace is banned until the timer ends. Editing while drafting is the
            main reason stories stall.
        </p>
        <div style="text-align:center; margin-bottom:18px;">
            <div class="sprint-clock" id="kwSprintClock">05:00</div>
            <div style="color:var(--text-muted); font-size:.85rem;" id="kwSprintNote">Ready when you are.</div>
        </div>
        <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
            ${[3, 5, 10, 15].map(m => `<button class="fb-action-btn outline" data-sprint="${m}">${m} min</button>`).join('')}
        </div>
        <div style="display:flex; gap:8px; justify-content:center; margin-top:14px;">
            <button class="fb-action-btn green" id="kwSprintStart">Start</button>
            <button class="fb-action-btn outline" id="kwSprintStop">Stop</button>
        </div>
    `);

    const modal = document.getElementById('kwSprintModal');
    let seconds = 300;
    const clock = () => {
        const el = document.getElementById('kwSprintClock');
        if (el) el.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    };

    modal.querySelectorAll('[data-sprint]').forEach(b => b.addEventListener('click', () => {
        seconds = parseInt(b.dataset.sprint, 10) * 60;
        clock();
    }));

    modal.querySelector('#kwSprintStart').addEventListener('click', () => {
        clearInterval(kwSprintInterval);
        const startWords = countWords(document.getElementById('kwManuscript').value);
        document.getElementById('kwSprintNote').textContent = 'Go! Do not stop, do not fix.';
        closeModal('kwSprintModal');
        showToast('Sprint started — keep your hands moving.', 'green');

        kwSprintInterval = setInterval(() => {
            seconds--;
            clock();
            if (seconds > 0) return;
            clearInterval(kwSprintInterval);
            const gained = countWords(document.getElementById('kwManuscript').value) - startWords;
            addXP(Math.min(100, Math.max(10, Math.round(gained / 2))));
            showToast(`Sprint done — ${gained} new words!`, 'green');
        }, 1000);
    });

    modal.querySelector('#kwSprintStop').addEventListener('click', () => {
        clearInterval(kwSprintInterval);
        closeModal('kwSprintModal');
    });
}

// ---------- "I'm stuck" ----------

const KW_UNSTUCK = [
    'Make it worse. Whatever your character wants, take it further away right now.',
    'Someone walks in who should not be there. Who is it?',
    'Write the next line of dialogue without saying who spoke. Just the words.',
    'Skip ahead. Write the scene you actually want to write, and join them up later.',
    'What is your character afraid of that they have not admitted yet? Put it in the room.',
    'Change the weather, the time of day, or the room. Then rewrite the same moment.',
    'Have your character lie. Then show one small sign that it was a lie.',
    'End this chapter one sentence earlier than feels comfortable.',
    'Describe the scene using only sound. No sight words at all.',
    'Ask: what does my character want in THIS scene, and who is stopping them?',
    'Write the worst possible version on purpose. It is much easier to fix than a blank page.',
    'Give a small object to your character and let them fidget with it while they talk.'
];

function openUnstuckModal() {
    const pick = () => KW_UNSTUCK[Math.floor(Math.random() * KW_UNSTUCK.length)];
    kwShowModal('kwUnstuckModal', `
        <h2 class="concept-title">💡 Unstick yourself</h2>
        <p style="color:var(--text-muted); margin:8px 0 16px;">Being stuck usually means the scene has no trouble in it. Try one of these:</p>
        <div class="finding tip" id="kwUnstuckText" style="font-size:1.05rem;">${escapeHtml(pick())}</div>
        <button class="fb-action-btn cyan" id="kwUnstuckAgain" style="margin-top:12px;">Another idea</button>
    `);
    document.getElementById('kwUnstuckAgain').addEventListener('click', () => {
        document.getElementById('kwUnstuckText').textContent = pick();
    });
}
