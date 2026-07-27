// Interactive Agent Sandbox Simulator

function executeSandboxQuery() {
    const queryInput = document.getElementById('sandboxQuery');
    const terminal = document.getElementById('sandboxOutput');
    const query = queryInput.value.trim();

    if (!query) return;

    terminal.innerHTML = `<div class="terminal-line">[User Query]: "${escapeHtml(query)}"</div>\n`;
    
    setTimeout(() => {
        terminal.innerHTML += `<div class="terminal-line" style="color: var(--accent-blue);">[Thought 1]: User wants a comparative evaluation between Scikit-Learn Logistic Regression, Random Forest, and Google TabFM Zero-Shot for AI Trust survey outcomes.</div>\n`;
    }, 400);

    setTimeout(() => {
        terminal.innerHTML += `<div class="terminal-line" style="color: var(--gold-primary);">[Action 1]: Calling tool 'fit_logistic_regression(dataset="ai_trust_insights.csv", features=["Age", "Education", "Risk"])'...</div>\n`;
        terminal.innerHTML += `<div class="terminal-line muted">   └─> Observation: {"model": "Logistic Regression", "test_accuracy": 0.7650, "roc_auc": 0.7890}</div>\n`;
    }, 900);

    setTimeout(() => {
        terminal.innerHTML += `<div class="terminal-line" style="color: var(--gold-primary);">[Action 2]: Calling tool 'fit_random_forest(n_estimators=100)'...</div>\n`;
        terminal.innerHTML += `<div class="terminal-line muted">   └─> Observation: {"model": "Random Forest", "test_accuracy": 0.7920, "roc_auc": 0.8120, "top_feature": "Education_Level"}</div>\n`;
    }, 1400);

    setTimeout(() => {
        terminal.innerHTML += `<div class="terminal-line" style="color: var(--accent-purple);">[Action 3]: Calling tool 'google_tabfm_zero_shot_predict(train_context=960_rows)'...</div>\n`;
        terminal.innerHTML += `<div class="terminal-line muted">   └─> Observation: {"model": "Google TabFM", "training": "In-Context Zero-Shot", "test_accuracy": 0.8250, "roc_auc": 0.8420}</div>\n`;
    }, 1900);

    setTimeout(() => {
        terminal.innerHTML += `<div class="terminal-line" style="color: var(--accent-green); font-weight: bold;">\n[Final Answer]:
----------------------------------------------------------------------
SOCIOLOGICAL SURVEY MODEL EVALUATION SUMMARY:
1. Baseline Logistic Regression achieved 0.7890 ROC-AUC.
2. Random Forest achieved 0.8120 ROC-AUC, identifying Education Level as the top stratifying predictor.
3. Google TabFM Zero-Shot outperformed both baseline models with 0.8420 ROC-AUC (+3.0% boost), achieving superior accuracy on raw survey columns without requiring manual one-hot recoding.
----------------------------------------------------------------------</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    }, 2400);
}
