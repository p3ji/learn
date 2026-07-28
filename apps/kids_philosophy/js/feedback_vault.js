// Interactive Question & App Upgrade Suggestion Vault with Persistence and JSON Export

const FEEDBACK_STORAGE_KEY = 'kids_quest_feedback_vault';

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

    // Simulated Smart Response from Thinker Avatar
    let simulatedReply = '';
    if (type === 'question') {
        simulatedReply = `📓 <strong>Question saved to your notebook.</strong> Nobody has read it yet - take it to a parent, teacher, or friend and talk it through.`;
    } else {
        const priorSuggestion = getSavedFeedback().some(
            f => f.topicId === topicId && f.type === 'suggestion' && f.id !== feedbackEntry.id);
        const earnsXP = content.length >= 15 && !priorSuggestion;
        simulatedReply = `💡 <strong>Idea saved to your notebook.</strong> Nobody has read it yet - show it to a grown-up if you want it built!${earnsXP ? ' (+10 XP)' : ''}`;
        if (earnsXP && typeof addXP === 'function') addXP(10);
    }

    if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = simulatedReply;
    }

    renderSavedFeedbackList(topicId);
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
            <div class="concept-badge-tag">PERSISTENT FEEDBACK & UPGRADE VAULT</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">App Upgrade & Questions Vault</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Review all questions and app upgrade ideas submitted by users. You can export these to JSON for incorporating into future app versions!</p>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <span style="color: var(--gold-star); font-weight: 800;">Total Saved Entries: ${allFeedback.length}</span>
                <button class="fb-action-btn gold" onclick="exportFeedbackJSON()" style="padding: 8px 16px; font-size: 0.85rem;">📥 Export All to JSON</button>
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
