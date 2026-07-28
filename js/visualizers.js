// Supervised ML & Google TabFM Step Visualizer with Why TabFM Bridge Explanation

let currentVizStep = 1;

function setVizStep(stepNum, evt) {
    currentVizStep = stepNum;
    document.querySelectorAll('.viz-step-btn').forEach(b => b.classList.remove('active'));
    
    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    const stepBtn = document.getElementById(`vizStepBtn${stepNum}`);

    if (target && target.classList) {
        target.classList.add('active');
    } else if (stepBtn) {
        stepBtn.classList.add('active');
    }

    renderVizStage(stepNum);
}

function renderVizStage(stepNum) {
    const stage = document.getElementById('vizStage');
    if (!stage) return;

    if (stepNum === 1) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 1: Raw Survey Dataset Input</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Raw survey response rows from Kaggle AI Trust Insights dataset containing Likert scales and text demographics.</p>
                
                <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid var(--cyan-magic); padding: 12px; border-radius: 6px; margin-bottom: 16px; font-size: 0.88rem;">
                    <strong>Notice:</strong> This raw survey data contains string text (<code>"30-44"</code>, <code>"Master's"</code>) and missing code numbers (<code>-9</code>). Traditional SAS and Scikit-Learn cannot fit equations until these are manually transformed!
                </div>

                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #38BDF8; overflow-x: auto;">
                    Respondent_ID | Age_Group | Education_Level | Perceived_AI_Risk | Tech_Familiarity | High_AI_Trust<br>
                    -----------------------------------------------------------------------------------------------<br>
                    RESP_00101    | 30-44     | Master's        | 4                 | High             | 1<br>
                    RESP_00102    | 18-29     | Bachelor's      | -9 (Missing)      | Very High        | 1<br>
                    RESP_00103    | 45-60     | High School     | 5                 | Low              | 0
                </div>
            </div>
        `;
    } else if (stepNum === 2) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 2: Traditional Recoding & One-Hot Dummy Encoding</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Traditional SAS (<code>CLASS</code> statement) and Python (<code>pd.get_dummies</code>) require converting text columns into 0/1 matrices before model fitting.</p>
                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #4ADE80; overflow-x: auto;">
                    # Pandas Manual Preprocessing (Required for traditional ML)<br>
                    df['Perceived_AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, None)<br>
                    df_encoded = pd.get_dummies(df, columns=['Age_Group', 'Education_Level'])
                </div>
            </div>
        `;
    } else if (stepNum === 3) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 3: Scikit-Learn Logistic Regression Fitting</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Iterative gradient descent model fitting over multiple training passes on preprocessed numeric matrices.</p>
                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #C084FC; overflow-x: auto;">
                    clf = LogisticRegression()<br>
                    clf.fit(X_train, y_train)<br>
                    # Model Accuracy: 84.2% | ROC-AUC: 0.865 | Requires manual preprocessing!
                </div>
            </div>
        `;
    } else if (stepNum === 4) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 4: Google TabFM (Tabular Foundation Model) Zero-Shot</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Google TabFM takes <strong>raw survey CSVs directly</strong> without manual dummy recoding or gradient training delays!</p>
                
                <div style="background: rgba(255, 199, 44, 0.15); border-left: 4px solid var(--gold-primary); padding: 12px; border-radius: 6px; margin-bottom: 16px; font-size: 0.88rem;">
                    <strong>Why TabFM is Revolutionary for AI Agents:</strong> An AI assistant can classify new survey rows on the fly in 0.00 seconds because TabFM reads raw text categories directly as transformer context memory!
                </div>

                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: var(--gold-primary); overflow-x: auto;">
                    tabfm = TabFMClassifier()<br>
                    tabfm.fit(raw_survey_df, target='High_AI_Trust') # Loads raw text table as context memory<br>
                    preds = tabfm.predict_proba(test_df) # Instant zero-shot predictions!<br>
                    # TabFM Accuracy: 89.4% | ZERO manual dummy coding required!
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setVizStep(1);
});
