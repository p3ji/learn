// View router and the My Books library.
//
// One stage element, five views, no framework — same pattern as the philosophy
// app so anyone who has worked on that one can work on this one.

const kwState = { view: 'library', bookId: null, chapterId: null };

const KW_VIEWS = {
    library: renderLibraryView,
    write:   renderWriteView,
    craft:   renderCraftView,
    drills:  renderDrillsView,
    tools:   renderToolsView
};

function goToView(view) {
    kwState.view = view;
    renderCurrentView();
    document.getElementById('kwStage').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCurrentView() {
    const stage = document.getElementById('kwStage');
    if (!stage) return;

    // The Writing Desk needs a book; fall back rather than render an empty desk.
    if (kwState.view === 'write' && !getBook(kwState.bookId)) {
        const first = getLibrary().books[0];
        if (first) { kwState.bookId = first.id; kwState.chapterId = first.chapters[0].id; }
        else kwState.view = 'library';
    }

    document.querySelectorAll('[data-view]').forEach(b =>
        b.classList.toggle('active', b.dataset.view === kwState.view));

    (KW_VIEWS[kwState.view] || renderLibraryView)(stage);
    updateBadgeDisplay();
}

// ---------- My Books ----------

const KW_GENRES = ['Adventure', 'Fantasy', 'Mystery', 'Funny', 'Scary', 'Sci-Fi', 'Real Life', 'Animals', 'Graphic Novel', 'Poetry'];

function renderLibraryView(container) {
    const lib = getLibrary();
    const streak = kwStreakLength();
    const todayWords = currentProfile.dailyWords[kwTodayKey()] || 0;

    // Last seven days, oldest first — a habit strip, not a guilt trip.
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const words = currentProfile.dailyWords[kwTodayKey(d)] || 0;
        days.push({ label: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()], hit: words >= currentProfile.dailyGoal, words });
    }

    container.innerHTML = `
        <div class="panel">
            <div style="display:flex; justify-content:space-between; gap:14px; flex-wrap:wrap; align-items:flex-start;">
                <div>
                    <h2 class="panel-title">✍️ Today's writing</h2>
                    <p class="panel-sub" style="margin:0;">
                        <strong style="color:${todayWords >= currentProfile.dailyGoal ? 'var(--green-hero)' : 'var(--gold-star)'};">${todayWords}</strong>
                        of ${currentProfile.dailyGoal} words · 🔥 ${streak} day streak · ${totalLibraryWords().toLocaleString()} words written in total
                    </p>
                    <div class="streak-strip">
                        ${days.map(d => `<span class="streak-day ${d.hit ? 'hit' : ''}" title="${d.words} words">${d.label}</span>`).join('')}
                    </div>
                </div>
                <button class="fb-action-btn pink" id="kwNewBookBtn">📕 New book</button>
            </div>
        </div>

        <div class="panel">
            <h2 class="panel-title">📚 My Books</h2>
            <p class="panel-sub">Your real books live here. Open one to write, then ask the Coach for a report.</p>
            ${lib.books.length ? `
                <div class="grid-auto">
                    ${lib.books.map(b => `
                        <div class="mini-card" style="cursor:default;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                                <span class="nb-badge">${escapeHtml(b.genre)}</span>
                                <button class="fb-action-btn outline" data-del-book="${escapeHtml(b.id)}"
                                    aria-label="Delete ${escapeHtml(b.title)}"
                                    style="padding:2px 8px; font-size:.75rem; border-color:var(--red-alert); color:var(--red-alert);">🗑️</button>
                            </div>
                            <div class="mini-card-title" style="margin-top:8px;">${escapeHtml(b.title)}</div>
                            <div class="mini-card-desc">${bookWordCount(b).toLocaleString()} words · ${b.chapters.length} chapter${b.chapters.length > 1 ? 's' : ''}</div>
                            <button class="fb-action-btn gold" data-open-book="${escapeHtml(b.id)}" style="margin-top:12px; width:100%;">Open ✍️</button>
                        </div>`).join('')}
                </div>` : `
                <div class="finding tip">
                    <div class="finding-title">No books yet</div>
                    <div class="finding-body">Already writing something on paper or in another app? Make a book here and paste a chapter in — the Coach works on whatever you give it.</div>
                </div>`}
        </div>`;

    document.getElementById('kwNewBookBtn').addEventListener('click', openNewBookModal);
    container.querySelectorAll('[data-open-book]').forEach(b => b.addEventListener('click', () => {
        const book = getBook(b.dataset.openBook);
        kwState.bookId = book.id;
        kwState.chapterId = book.chapters[0].id;
        goToView('write');
    }));
    container.querySelectorAll('[data-del-book]').forEach(b => b.addEventListener('click', () => {
        const book = getBook(b.dataset.delBook);
        if (!confirm(`Delete "${book.title}" and everything in it? This cannot be undone.`)) return;
        deleteBook(book.id);
        renderCurrentView();
    }));
}

function openNewBookModal() {
    kwShowModal('kwNewBookModal', `
        <h2 class="concept-title">📕 Start a new book</h2>
        <p style="color:var(--text-muted); margin:8px 0 16px;">If your book already exists somewhere else, that is fine — make it here and paste your chapters in.</p>
        <div class="sandbox-input-group">
            <label class="sandbox-label" for="kwBookTitle">Title</label>
            <input type="text" id="kwBookTitle" class="sandbox-input" placeholder="The Boy Who Ate the Moon">
        </div>
        <div class="sandbox-input-group">
            <label class="sandbox-label" for="kwBookGenre">What kind of story?</label>
            <select id="kwBookGenre" class="sandbox-input">
                ${KW_GENRES.map(g => `<option>${g}</option>`).join('')}
            </select>
        </div>
        <button class="fb-action-btn pink" id="kwCreateBookBtn" style="width:100%;">Create book</button>
    `);

    document.getElementById('kwCreateBookBtn').addEventListener('click', () => {
        const title = document.getElementById('kwBookTitle').value.trim();
        if (!title) { showToast('Your book needs a title — you can change it later.', 'red'); return; }
        const book = createBook(title, document.getElementById('kwBookGenre').value);
        kwState.bookId = book.id;
        kwState.chapterId = book.chapters[0].id;
        closeModal('kwNewBookModal');
        addXP(25);
        goToView('write');
    });
}

// ---------- Boot ----------

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-view]').forEach(b =>
        b.addEventListener('click', () => goToView(b.dataset.view)));

    const account = document.getElementById('kwAccountBtn');
    if (account) account.addEventListener('click', openAccountLoginModal);
    const pill = document.getElementById('kwProfilePill');
    if (pill) pill.addEventListener('click', openAccountLoginModal);

    // initProfileSystem writes a default writer on first run, so nothing is
    // gated behind a sign-up form.
    initProfileSystem();
    renderCurrentView();
});
