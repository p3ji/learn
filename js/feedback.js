// Feedback, AI Prompts & Personal Study Notes Manager

let currentFeedbackSection = "General App";

function openSectionFeedback(sectionName) {
    currentFeedbackSection = sectionName;
    
    let modal = document.getElementById('feedbackModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'feedbackModal';
        modal.className = 'feedback-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="feedback-modal-card">
            <button class="feedback-modal-close" onclick="closeFeedbackModal()">&times;</button>
            <div class="feedback-badge">Interactive Learning Assistant</div>
            <h2 class="feedback-title" id="feedbackSectionTitle">${escapeHtml(sectionName)}: Notes & Prompts</h2>
            
            <div class="feedback-tabs">
                <button class="fb-tab active" onclick="switchFbTab('question')">❓ Ask Question</button>
                <button class="fb-tab" onclick="switchFbTab('suggestion')">💡 Suggest Addition</button>
                <button class="fb-tab" onclick="switchFbTab('note')">📌 My Study Notes</button>
            </div>

            <!-- Tab 1: Ask Question -->
            <div class="fb-tab-content active" id="fbTabQuestion">
                <p class="fb-desc">Have a question about SAS syntax, TabFM, or LangGraph? Type it below to generate a formatted prompt to paste directly into our chat!</p>
                <textarea id="fbQuestionText" class="fb-textarea" placeholder="e.g. Can you explain why we replace -9 with None in Pydantic models before passing to LLM tools?"></textarea>
                <div style="display: flex; gap: 12px; margin-top: 12px;">
                    <button class="fb-action-btn" onclick="generateAiPrompt('question')">Generate & Copy AI Prompt</button>
                </div>
                <div id="fbQuestionPromptOutput" class="fb-output-box" style="display: none;"></div>
            </div>

            <!-- Tab 2: Suggest Addition -->
            <div class="fb-tab-content" id="fbTabSuggestion">
                <p class="fb-desc">Want to add a new tool, dataset feature, or visualization? Type your idea to generate a structured AI Feature Request prompt!</p>
                <textarea id="fbSuggestionText" class="fb-textarea" placeholder="e.g. Add a Likert scale distribution chart for Perceived_AI_Risk in the Visualizer section."></textarea>
                <div style="display: flex; gap: 12px; margin-top: 12px;">
                    <button class="fb-action-btn" onclick="generateAiPrompt('suggestion')">Generate & Copy Feature Request</button>
                </div>
                <div id="fbSuggestionPromptOutput" class="fb-output-box" style="display: none;"></div>
            </div>

            <!-- Tab 3: Study Notes -->
            <div class="fb-tab-content" id="fbTabNote">
                <p class="fb-desc">Organize and save personal study notes for this section. Notes are saved to your study log and can be exported as a Markdown file!</p>
                <textarea id="fbNoteText" class="fb-textarea" placeholder="e.g. Key takeaway: TabFM is zero-shot so it doesn't need fit() training like Scikit-Learn. Useful for small survey sub-samples."></textarea>
                <div style="display: flex; gap: 12px; margin-top: 12px;">
                    <button class="fb-action-btn gold" onclick="saveStudyNote()">Save Study Note</button>
                    <button class="fb-action-btn outline" onclick="exportStudyNotesMarkdown()">Export All Notes (.md)</button>
                </div>
                <div id="fbNoteSavedMsg" style="color: var(--accent-green); font-size: 0.85rem; margin-top: 8px; display: none;">✓ Note saved to your study log!</div>

                <div style="margin-top: 20px;">
                    <h4 style="font-size: 0.9rem; color: var(--gold-primary); margin-bottom: 8px;">Saved Notes for ${escapeHtml(sectionName)}:</h4>
                    <div id="savedNotesList" class="saved-notes-list"></div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    loadSavedNotesForSection(sectionName);
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) modal.style.display = 'none';
}

function switchFbTab(tabName) {
    document.querySelectorAll('.fb-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.fb-tab-content').forEach(c => c.classList.remove('active'));

    event.target.classList.add('active');
    if (tabName === 'question') document.getElementById('fbTabQuestion').classList.add('active');
    if (tabName === 'suggestion') document.getElementById('fbTabSuggestion').classList.add('active');
    if (tabName === 'note') document.getElementById('fbTabNote').classList.add('active');
}

function generateAiPrompt(type) {
    let inputText = "";
    let outputBox = null;
    let headerText = "";

    if (type === 'question') {
        inputText = document.getElementById('fbQuestionText').value.trim();
        outputBox = document.getElementById('fbQuestionPromptOutput');
        headerText = `[AI QUESTION / CLARIFICATION REQUEST]`;
    } else {
        inputText = document.getElementById('fbSuggestionText').value.trim();
        outputBox = document.getElementById('fbSuggestionPromptOutput');
        headerText = `[AI FEATURE REQUEST / ADDITION]`;
    }

    if (!inputText) return;

    const formattedPrompt = `${headerText}\nSection: ${currentFeedbackSection}\nUser Query: "${inputText}"\nInstruction: Please explain this concept thoroughly or update the WatSPEED Prep Hub codebase to incorporate this request.`;

    outputBox.style.display = 'block';
    outputBox.innerHTML = `
        <div style="font-size: 0.75rem; color: var(--gold-primary); margin-bottom: 4px;">✓ Copy & paste this prompt into chat:</div>
        <pre style="white-space: pre-wrap; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-green);">${escapeHtml(formattedPrompt)}</pre>
        <button onclick="copyToClipboard('${escapeJsString(formattedPrompt)}')" style="margin-top: 8px; background: var(--gold-primary); color: #000; border: none; padding: 4px 12px; border-radius: 4px; font-weight: 700; cursor: pointer;">Copy Prompt to Clipboard</button>
    `;

    copyToClipboard(formattedPrompt);
}

function saveStudyNote() {
    const text = document.getElementById('fbNoteText').value.trim();
    if (!text) return;

    let notes = JSON.parse(localStorage.getItem('user_study_notes') || '[]');
    const newNote = {
        id: Date.now(),
        section: currentFeedbackSection,
        timestamp: new Date().toLocaleString(),
        content: text
    };
    notes.unshift(newNote);
    localStorage.setItem('user_study_notes', JSON.stringify(notes));

    document.getElementById('fbNoteText').value = '';
    const msg = document.getElementById('fbNoteSavedMsg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);

    loadSavedNotesForSection(currentFeedbackSection);
    renderStudyNotesWidget();
}

function loadSavedNotesForSection(sectionName) {
    const container = document.getElementById('savedNotesList');
    if (!container) return;

    let notes = JSON.parse(localStorage.getItem('user_study_notes') || '[]');
    let sectionNotes = notes.filter(n => n.section === sectionName);

    if (sectionNotes.length === 0) {
        container.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">No saved notes for this section yet. Write your first note above!</div>`;
        return;
    }

    container.innerHTML = sectionNotes.map(n => `
        <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">
                <span>${n.timestamp}</span>
                <span style="color: var(--gold-primary); cursor: pointer;" onclick="deleteStudyNote(${n.id})">Delete</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-main); white-space: pre-wrap;">${escapeHtml(n.content)}</div>
        </div>
    `).join('');
}

function deleteStudyNote(id) {
    let notes = JSON.parse(localStorage.getItem('user_study_notes') || '[]');
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('user_study_notes', JSON.stringify(notes));
    loadSavedNotesForSection(currentFeedbackSection);
    renderStudyNotesWidget();
}

function exportStudyNotesMarkdown() {
    let notes = JSON.parse(localStorage.getItem('user_study_notes') || '[]');
    if (notes.length === 0) {
        alert("No study notes saved yet!");
        return;
    }

    let md = `# WatSPEED Agentic AI Study Notes & Highlights\n\n`;
    notes.forEach(n => {
        md += `### [${n.section}] - ${n.timestamp}\n${n.content}\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `watspeed_study_notes_${Date.now()}.md`;
    a.click();
}

function renderStudyNotesWidget() {
    const listContainer = document.getElementById('userNotesWidgetList');
    if (!listContainer) return;

    let notes = JSON.parse(localStorage.getItem('user_study_notes') || '[]');
    if (notes.length === 0) {
        listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem;">No personal study notes recorded yet. Use the 📝 button in any section to add notes!</p>`;
        return;
    }

    listContainer.innerHTML = notes.map(n => `
        <div style="background: rgba(3, 7, 18, 0.7); border: 1px solid rgba(255, 199, 44, 0.2); border-radius: 10px; padding: 14px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                <span class="nb-badge">${escapeHtml(n.section)}</span>
                <span style="color: var(--text-muted);">${n.timestamp}</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-main); white-space: pre-wrap;">${escapeHtml(n.content)}</div>
        </div>
    `).join('');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied prompt to clipboard! Paste it into chat to interact with the AI assistant.");
    });
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJsString(text) {
    return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

document.addEventListener('DOMContentLoaded', () => {
    renderStudyNotesWidget();
});
