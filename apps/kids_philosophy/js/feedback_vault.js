// Questions & Upgrade Ideas notebook.
//
// Everything is saved locally first (localStorage), so nothing is ever lost by
// not sending. Sending uses a mailto: draft rather than posting to a server:
// no third-party service, no data leaves the device automatically, and an adult
// sees the message in their own mail app and presses send themselves. That
// matters in an app used by 8-12 year olds.

const FEEDBACK_STORAGE_KEY = 'kids_quest_feedback_vault';
const FEEDBACK_EMAIL = 'modularsurveytools@gmail.com';

function getSavedFeedback() {
    try {
        return JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

function saveFeedback(item) {
    const feedbackList = getSavedFeedback();
    feedbackList.unshift(item); // latest first
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackList));
}

function submitTopicFeedback(topicId, topicName, avatarEmoji) {
    const typeSelect = document.getElementById(`feedbackType_${topicId}`);
    const inputEl = document.getElementById(`feedbackInput_${topicId}`);
    const resultBox = document.getElementById(`feedbackResult_${topicId}`);

    if (!inputEl || !inputEl.value.trim()) {
        showToast('Please type a question or suggestion first.', 'red');
        return;
    }

    const type = typeSelect ? typeSelect.value : 'question';
    const content = inputEl.value.trim();
    const activeUser = (typeof currentProfile !== 'undefined' && currentProfile.username) ? currentProfile.username : 'Cadet Thinker';

    const feedbackEntry = {
        id: 'fb_' + Date.now(),
        topicId: topicId,
        topicName: topicName,
        userName: activeUser,
        type: type, // 'question' or 'suggestion'
        content: content,
        timestamp: new Date().toISOString()
    };

    saveFeedback(feedbackEntry);
    inputEl.value = '';

    let reply = '';
    if (type === 'question') {
        reply = `📓 <strong>Question saved to your notebook.</strong> Nobody has read it yet.`;
    } else {
        const priorSuggestion = getSavedFeedback().some(
            f => f.topicId === topicId && f.type === 'suggestion' && f.id !== feedbackEntry.id);
        const earnsXP = content.length >= 15 && !priorSuggestion;
        reply = `💡 <strong>Idea saved to your notebook.</strong> Nobody has read it yet.${earnsXP ? ' (+10 XP)' : ''}`;
        if (earnsXP && typeof addXP === 'function') addXP(10);
    }

    if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            ${reply}
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.15);">
                <p style="color: var(--text-main); font-size: 0.9rem; margin: 0 0 10px; font-weight: 500;">
                    Want the people who made this app to see it? Ask a grown-up to send it &mdash;
                    it opens their email app so they can check it first. Nothing is sent on its own.
                </p>
                <button class="fb-action-btn gold" style="font-size: 0.85rem;"
                        onclick="emailFeedbackEntry('${feedbackEntry.id}')">✉️ Send this to the app makers</button>
            </div>`;
    }

    renderSavedFeedbackList(topicId);
}

/** Open a pre-filled email draft for one saved entry. Nothing sends by itself. */
function emailFeedbackEntry(entryId) {
    const entry = getSavedFeedback().find(f => f.id === entryId);
    if (!entry) {
        showToast('Could not find that note.', 'red');
        return;
    }
    openFeedbackEmailDraft([entry]);
}

/** Open a draft containing every saved note. */
function emailAllFeedback() {
    const all = getSavedFeedback();
    if (all.length === 0) {
        showToast('Your notebook is empty - save a question first.', 'red');
        return;
    }
    openFeedbackEmailDraft(all);
}

/**
 * Build the mailto: URL for a set of notes. Pure - builds a string, sends
 * nothing. Kept separate from the navigation so it can be asserted on.
 */
function buildFeedbackMailto(entries) {
    const label = entries.length === 1
        ? (entries[0].type === 'question' ? 'Question' : 'Idea') + ' about ' + entries[0].topicName
        : `${entries.length} notes from Philosopher's Quest`;

    const lines = [
        "Sent from Philosopher's Quest (a philosophy app for children).",
        '',
        'Please note: this message was written by a child using the app.',
        '',
        '----------------------------------------',
        ''
    ];

    entries.forEach((e, i) => {
        lines.push(`${i + 1}. ${e.type === 'question' ? 'QUESTION' : 'UPGRADE IDEA'} - ${e.topicName}`);
        lines.push(`   "${e.content}"`);
        lines.push(`   Saved ${new Date(e.timestamp).toLocaleDateString()} by profile name: ${e.userName}`);
        lines.push('');
    });

    lines.push('----------------------------------------');
    lines.push('');
    lines.push('You can edit or delete anything above before sending.');

    // encodeURIComponent, not escape: subject/body must survive quotes and newlines.
    return `mailto:${FEEDBACK_EMAIL}` +
        `?subject=${encodeURIComponent("Philosopher's Quest - " + label)}` +
        `&body=${encodeURIComponent(lines.join('\n'))}`;
}

/** Hand the draft to the device's mail app. This is the only step that navigates. */
function openFeedbackEmailDraft(entries) {
    const href = buildFeedbackMailto(entries);

    if (href.length > 1900) {
        // Some mail clients silently truncate long mailto: URLs. Rather than
        // send a half-message, fall back to the file export.
        showToast('That is a lot of notes - saving them as a file instead.', 'gold');
        exportFeedbackJSON();
        return;
    }

    window.location.href = href;
    showToast('Opening your email app. Check it, then press send.', 'green');
}

function renderSavedFeedbackList(topicId) {
    const listContainer = document.getElementById(`savedFeedbackList_${topicId}`);
    if (!listContainer) return;

    const allFeedback = getSavedFeedback().filter(item => item.topicId === topicId);

    if (allFeedback.length === 0) {
        listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">No questions or suggestions submitted for this topic yet. Be the first!</p>`;
        return;
    }

    listContainer.innerHTML = allFeedback.map(fb => `
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="nb-badge" style="font-size: 0.75rem; background: ${fb.type === 'question' ? 'var(--cyan-magic)' : 'var(--pink-energy)'}; color: #000;">
                    ${fb.type === 'question' ? '❓ Question' : '💡 Upgrade Idea'}
                </span>
                <span style="color: var(--text-muted); font-size: 0.75rem;">${new Date(fb.timestamp).toLocaleDateString()}</span>
            </div>
            <p style="color: var(--text-main); font-size: 0.92rem; margin: 0;">"${escapeHtml(fb.content)}"</p>
            <div style="color: var(--gold-star); font-size: 0.78rem; margin-top: 4px;">Submitted by: <strong>${escapeHtml(fb.userName)}</strong></div>
        </div>
    `).join('');
}

function exportFeedbackJSON() {
    const allFeedback = getSavedFeedback();
    if (allFeedback.length === 0) {
        showToast('Your notebook is empty - save a question first.', 'red');
        return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allFeedback, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kids_philosophy_feedback_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function openFeedbackVaultModal() {
    let modal = document.getElementById('feedbackVaultModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'feedbackVaultModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    const allFeedback = getSavedFeedback();

    modal.innerHTML = `
        <div class="concept-modal-card" style="max-width: 650px;">
            <button class="concept-modal-close" onclick="closeFeedbackVaultModal()">&times;</button>
            <div class="concept-badge-tag">MY QUESTIONS NOTEBOOK</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">My Questions &amp; Ideas</h2>

            <div style="background: rgba(6,182,212,0.08); border-left: 3px solid var(--cyan-magic); border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;">
                <p style="color: var(--text-main); font-size: 0.9rem; margin: 0; line-height: 1.55;">
                    These are saved <strong>on this device only</strong>, in this browser. They are not
                    sent anywhere unless you choose to send them, and they will disappear if someone
                    clears the browsing data or you switch to a different device.
                </p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
                <span style="color: var(--gold-star); font-weight: 800;">Saved notes: ${allFeedback.length}</span>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="fb-action-btn outline" onclick="exportFeedbackJSON()" style="padding: 8px 16px; font-size: 0.85rem;">📥 Save as a file</button>
                    <button class="fb-action-btn gold" onclick="emailAllFeedback()" style="padding: 8px 16px; font-size: 0.85rem;">✉️ Send to the app makers</button>
                </div>
            </div>

            <div style="max-height: 350px; overflow-y: auto; padding-right: 6px;">
                ${allFeedback.length === 0 ? `<p style="color: var(--text-muted);">No entries yet.</p>` : allFeedback.map(fb => `
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--purple-primary); border-radius: 12px; padding: 14px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="color: var(--cyan-magic); font-weight: 800; font-size: 0.88rem;">${escapeHtml(fb.topicName)}</span>
                            <span class="nb-badge" style="font-size: 0.72rem; background: ${fb.type === 'question' ? 'var(--cyan-magic)' : 'var(--pink-energy)'}; color: #000;">
                                ${fb.type === 'question' ? '❓ Question' : '💡 Upgrade Idea'}
                            </span>
                        </div>
                        <p style="color: #FFF; font-size: 0.95rem; margin: 0 0 6px 0;">"${escapeHtml(fb.content)}"</p>
                        <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.78rem;">
                            <span>By: <strong>${escapeHtml(fb.userName)}</strong></span>
                            <span>${new Date(fb.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeFeedbackVaultModal() {
    const modal = document.getElementById('feedbackVaultModal');
    if (modal) modal.style.display = 'none';
}
