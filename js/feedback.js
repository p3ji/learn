// Section Feedback, AI Assistant Prompt Generator & Personal Notes Manager

let activeSectionTitle = "General Section";

function openSectionFeedback(sectionName) {
    activeSectionTitle = sectionName || "General Section";
    const modal = document.getElementById('feedbackModal');
    const titleEl = document.getElementById('fbSectionTitle');

    if (titleEl) titleEl.innerText = `Assistant: ${activeSectionTitle}`;
    if (modal) modal.style.display = 'flex';

    switchFbTab(1);
    loadSavedNotes();
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) modal.style.display = 'none';
}

function switchFbTab(tabNum, evt) {
    document.querySelectorAll('.fb-tab-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('#feedbackModal .viz-step-btn').forEach(b => b.classList.remove('active'));

    const btn = document.getElementById(`fbTabBtn${tabNum}`);
    const content = document.getElementById(`fbTabContent${tabNum}`);

    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    if (target && target.classList) {
        target.classList.add('active');
    } else if (btn) {
        btn.classList.add('active');
    }

    if (content) content.style.display = 'block';
}

function generateAiQuestionPrompt() {
    const qInput = document.getElementById('fbQuestionInput');
    const out = document.getElementById('fbQuestionPromptOut');

    if (!qInput || !out) return;
    const qText = qInput.value.trim();

    if (!qText) {
        alert("Please enter a question or topic first!");
        return;
    }

    const promptStr = `[AI QUESTION / CLARIFICATION REQUEST]\nSection: ${activeSectionTitle}\nUser Query: "${qText}"\nInstruction: Please explain this concept thoroughly or update the Sociology ➔ AI Hub codebase to incorporate this request.`;

    out.style.display = 'block';
    out.innerHTML = `
        <strong>Generated AI Prompt (Click to Copy):</strong>
        <textarea style="width:100%; height:100px; background:#000; color:#4ADE80; border:1px solid #4ADE80; margin-top:8px; padding:8px; border-radius:6px;" readonly>${escapeHtml(promptStr)}</textarea>
    `;
}

function generateAiAdditionPrompt() {
    const aInput = document.getElementById('fbAdditionInput');
    const out = document.getElementById('fbAdditionPromptOut');

    if (!aInput || !out) return;
    const aText = aInput.value.trim();

    if (!aText) {
        alert("Please describe what you would like added first!");
        return;
    }

    const promptStr = `[AI FEATURE / ADDITION REQUEST]\nSection: ${activeSectionTitle}\nUser Suggestion: "${aText}"\nInstruction: Please build this feature, dataset, or visualization into the Sociology ➔ AI Hub codebase.`;

    out.style.display = 'block';
    out.innerHTML = `
        <strong>Generated Feature Request Prompt (Click to Copy):</strong>
        <textarea style="width:100%; height:100px; background:#000; color:#4ADE80; border:1px solid #4ADE80; margin-top:8px; padding:8px; border-radius:6px;" readonly>${escapeHtml(promptStr)}</textarea>
    `;
}

function savePersonalNote() {
    const nInput = document.getElementById('fbNoteInput');
    if (!nInput) return;
    const nText = nInput.value.trim();

    if (!nText) {
        alert("Please type a note first!");
        return;
    }

    let allNotes = JSON.parse(localStorage.getItem('watspeed_user_study_notes') || '[]');
    allNotes.push({
        section: activeSectionTitle,
        timestamp: new Date().toLocaleString(),
        content: nText
    });

    localStorage.setItem('watspeed_user_study_notes', JSON.stringify(allNotes));
    nInput.value = '';
    loadSavedNotes();
    alert("Note saved to browser study storage!");
}

function loadSavedNotes() {
    const container = document.getElementById('fbSavedNotesList');
    if (!container) return;

    let allNotes = JSON.parse(localStorage.getItem('watspeed_user_study_notes') || '[]');
    const sectionNotes = allNotes.filter(n => n.section === activeSectionTitle);

    if (sectionNotes.length === 0) {
        container.innerHTML = `<em>No notes saved for ${activeSectionTitle} yet.</em>`;
        return;
    }

    container.innerHTML = `
        <strong>Saved Notes for ${activeSectionTitle}:</strong>
        <ul style="padding-left: 20px; margin-top: 8px;">
            ${sectionNotes.map(n => `
                <li style="margin-bottom: 8px;">
                    <span style="color: var(--gold-primary); font-size: 0.75rem;">[${n.timestamp}]</span>: ${escapeHtml(n.content)}
                </li>
            `).join('')}
        </ul>
    `;
}

function exportNotesToMarkdown() {
    let allNotes = JSON.parse(localStorage.getItem('watspeed_user_study_notes') || '[]');
    if (allNotes.length === 0) {
        alert("No study notes to export yet! Type and save some notes first.");
        return;
    }

    let mdStr = `# Sociology ➔ AI & Data Science Bridge | Study Guide & Personal Notes\n\n`;
    allNotes.forEach((n, idx) => {
        mdStr += `### Note ${idx + 1}: ${n.section}\n`;
        mdStr += `**Date:** ${n.timestamp}\n\n`;
        mdStr += `${n.content}\n\n---\n\n`;
    });

    const blob = new Blob([mdStr], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user_study_notes_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
