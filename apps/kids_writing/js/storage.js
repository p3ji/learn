// Library store — the child's real books and chapters.
//
// Everything lives in localStorage under one key per writer, so a book is never
// shared between pen names. Chapter text is the source of truth for the whole
// app: the Revision Lab, word counts, streak and export all read from here.

const KW_LIBRARY_KEY = 'kw_library';

function kwLoadLibraryRoot() {
    try {
        return JSON.parse(localStorage.getItem(KW_LIBRARY_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function kwSaveLibraryRoot(root) {
    localStorage.setItem(KW_LIBRARY_KEY, JSON.stringify(root));
}

function getLibrary() {
    const root = kwLoadLibraryRoot();
    return root[currentProfile.username] || { books: [] };
}

function saveLibrary(lib) {
    const root = kwLoadLibraryRoot();
    root[currentProfile.username] = lib;
    kwSaveLibraryRoot(root);
}

function renameLibraryOwner(oldName, newName) {
    const root = kwLoadLibraryRoot();
    if (!root[oldName]) return;
    root[newName] = root[oldName];
    delete root[oldName];
    kwSaveLibraryRoot(root);
}

function kwNewId(prefix) {
    // Time-plus-random: unique enough for a personal library, and sortable.
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Books ----------

function createBook(title, genre) {
    const lib = getLibrary();
    const book = {
        id: kwNewId('book'),
        title: title || 'Untitled Book',
        genre: genre || 'Adventure',
        created: new Date().toISOString(),
        spine: {},          // Story Spine planner answers
        characters: [],     // Character Builder entries
        chapters: [{ id: kwNewId('ch'), title: 'Chapter 1', text: '', lastWordCount: 0, creditedPeak: 0, revisions: 0 }]
    };
    lib.books.push(book);
    saveLibrary(lib);
    return book;
}

function getBook(bookId) {
    return getLibrary().books.find(b => b.id === bookId) || null;
}

function updateBook(bookId, patch) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book) return null;
    Object.assign(book, patch);
    saveLibrary(lib);
    return book;
}

function deleteBook(bookId) {
    const lib = getLibrary();
    lib.books = lib.books.filter(b => b.id !== bookId);
    saveLibrary(lib);
}

// ---------- Chapters ----------

function addChapter(bookId, title) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book) return null;
    const ch = {
        id: kwNewId('ch'),
        title: title || `Chapter ${book.chapters.length + 1}`,
        text: '',
        lastWordCount: 0,
        creditedPeak: 0,
        revisions: 0
    };
    book.chapters.push(ch);
    saveLibrary(lib);
    return ch;
}

function getChapter(bookId, chapterId) {
    const book = getBook(bookId);
    return book ? book.chapters.find(c => c.id === chapterId) || null : null;
}

// Saving a chapter is also how the daily habit gets credited.
//
// Credit is measured against a high-water mark that never falls, not against the
// previous count. Using the previous count meant deleting a paragraph and
// retyping it credited the same words twice — trivially farmable, and it made
// the streak meaningless. The trade-off: rewriting a chapter from scratch at the
// same length earns no new credit. That is the honest side to err on, and the
// total-word badges still read the real counts.
function saveChapterText(bookId, chapterId, text) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book) return 0;
    const ch = book.chapters.find(c => c.id === chapterId);
    if (!ch) return 0;

    const words = countWords(text);
    // Older saves only had lastWordCount; seed the mark from it so existing
    // chapters don't suddenly re-credit their whole length.
    if (ch.creditedPeak == null) ch.creditedPeak = ch.lastWordCount || 0;

    const delta = Math.max(0, words - ch.creditedPeak);
    ch.text = text;
    ch.lastWordCount = words;
    ch.creditedPeak = Math.max(ch.creditedPeak, words);
    saveLibrary(lib);

    if (delta > 0) recordWordsWritten(delta);
    if (totalLibraryWords() >= 100) unlockBadge('first_words');
    if (totalLibraryWords() >= 5000) unlockBadge('novelist');
    return delta;
}

function renameChapter(bookId, chapterId, title) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book) return;
    const ch = book.chapters.find(c => c.id === chapterId);
    if (ch) { ch.title = title; saveLibrary(lib); }
}

function deleteChapter(bookId, chapterId) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book || book.chapters.length <= 1) return false;
    book.chapters = book.chapters.filter(c => c.id !== chapterId);
    saveLibrary(lib);
    return true;
}

function noteRevision(bookId, chapterId) {
    const lib = getLibrary();
    const book = lib.books.find(b => b.id === bookId);
    if (!book) return 0;
    const ch = book.chapters.find(c => c.id === chapterId);
    if (!ch) return 0;
    ch.revisions = (ch.revisions || 0) + 1;
    saveLibrary(lib);
    if (ch.revisions >= 2) unlockBadge('reviser');
    return ch.revisions;
}

// ---------- Counting & export ----------

function countWords(text) {
    const t = String(text || '').trim();
    if (!t) return 0;
    return t.split(/\s+/).length;
}

function bookWordCount(book) {
    return book.chapters.reduce((n, c) => n + countWords(c.text), 0);
}

function totalLibraryWords() {
    return getLibrary().books.reduce((n, b) => n + bookWordCount(b), 0);
}

// Plain-text export — the child owns their manuscript and can take it anywhere.
function exportBookText(bookId) {
    const book = getBook(bookId);
    if (!book) return;
    const body = [
        book.title,
        `by ${currentProfile.username}`,
        '',
        ...book.chapters.flatMap(c => [`\n\n== ${c.title} ==\n`, c.text || ''])
    ].join('\n');

    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${book.title.replace(/[^\w\- ]+/g, '')|| 'book'}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    showToast('Book downloaded!', 'green');
}
