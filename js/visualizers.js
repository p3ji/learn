// Interactive Visualizer Steps
const vizSteps = {
    1: {
        title: "Step 1: Survey Data Ingestion & 80/20 Train/Test Splitting",
        desc: "Ingests raw survey dataset (ai_trust_insights.csv), handles missing codes (-9), and creates stratified train/test splits.",
        nodes: [
            { id: "raw", label: "Raw Survey CSV", type: "input", detail: "1,200 Respondents" },
            { id: "clean", label: "Missing Code Imputer", type: "process", detail: "-9 -> NaN" },
            { id: "split", label: "Stratified Train/Test Split", type: "output", detail: "Train: 960 | Test: 240" }
        ],
        codeSnippet: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)"
    },
    2: {
        title: "Step 2: Scikit-Learn Supervised Model Training (Baseline)",
        desc: "Fits Logistic Regression (SAS PROC LOGISTIC equivalent) and Random Forest classifiers on encoded survey features.",
        nodes: [
            { id: "train_data", label: "Encoded Feature Matrix", type: "input", detail: "One-Hot Encoded" },
            { id: "log_reg", label: "Logistic Regression", type: "process", detail: "ROC-AUC: 0.7890" },
            { id: "rf", label: "Random Forest Classifier", type: "process", detail: "ROC-AUC: 0.8120" }
        ],
        codeSnippet: "model = LogisticRegression(); model.fit(X_train, y_train); auc = roc_auc_score(y_test, model.predict_proba(X_test)[:,1])"
    },
    3: {
        title: "Step 3: Google TabFM (Tabular Foundation Model) Zero-Shot Prediction",
        desc: "Google TabFM evaluates test rows via In-Context Learning (ICL) directly on raw survey columns without gradient updates!",
        nodes: [
            { id: "raw_context", label: "Raw Context Rows", type: "input", detail: "No Manual Encoding Needed" },
            { id: "tabfm_transformer", label: "Google TabFM Model", type: "process", detail: "In-Context Single Forward Pass" },
            { id: "tabfm_out", label: "TabFM Zero-Shot Prediction", type: "output", detail: "ROC-AUC: 0.8420 (+3.0% boost)" }
        ],
        codeSnippet: "tabfm = TabFMClassifier(); tabfm.fit(train_df, 'High_AI_Trust'); probs = tabfm.predict_proba(test_df)"
    },
    4: {
        title: "Step 4: LangGraph State Decision & Sociological Report Generation",
        desc: "LangGraph StateGraph evaluates model metrics, routes execution to the winning model (TabFM), and generates the final sociological memo.",
        nodes: [
            { id: "eval_node", label: "StateGraph Evaluator", type: "input", detail: "TabFM vs Scikit-Learn" },
            { id: "router", label: "Winner Selection Node", type: "process", detail: "Selected: Google TabFM" },
            { id: "report_node", label: "Sociological Report Agent", type: "output", detail: "Academic Memo Generated" }
        ],
        codeSnippet: "class State(TypedDict): winner: str; memo: str\nbuilder.add_edge('eval_node', 'report_node')"
    }
};

function runVizStep(stepNum) {
    document.querySelectorAll('.viz-step-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const data = vizSteps[stepNum];
    const canvas = document.getElementById('vizCanvas');

    let nodesHtml = data.nodes.map(n => `
        <div style="background: rgba(18, 24, 38, 0.9); border: 1px solid ${n.type === 'output' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.2)'}; border-radius: 12px; padding: 16px 20px; flex: 1; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">${n.type}</div>
            <div style="font-weight: 700; color: ${n.type === 'output' ? 'var(--gold-primary)' : 'var(--text-main)'}; font-size: 1rem; margin-bottom: 6px;">${n.label}</div>
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-blue);">${n.detail}</div>
        </div>
    `).join('<div style="color: var(--gold-primary); font-size: 1.5rem; font-weight: bold; align-self: center;">➔</div>');

    canvas.innerHTML = `
        <div style="margin-bottom: 16px;">
            <h3 style="font-family: var(--font-heading); color: var(--accent-blue); margin-bottom: 6px;">${data.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${data.desc}</p>
        </div>

        <div style="display: flex; gap: 16px; align-items: stretch; margin-bottom: 20px;">
            ${nodesHtml}
        </div>

        <div style="background: #000; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px 16px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">EXECUTABLE PYTHON SNIPPET</div>
            <code style="font-family: var(--font-mono); color: var(--accent-green); font-size: 0.85rem;">${escapeHtml(data.codeSnippet)}</code>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    runVizStep(1);
});
