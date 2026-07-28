// Supervised ML & Google TabFM Step Visualizer with Safe Event Handling

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
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 2: Recoding & Missing Value Imputation</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Traditional ML requires manual One-Hot Encoding and handling missing values (-9 ➔ None) before matrix fitting.</p>
                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #4ADE80; overflow-x: auto;">
                    # Pandas Recoding<br>
                    df['Perceived_AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, None)<br>
                    df_encoded = pd.get_dummies(df, columns=['Age_Group', 'Education_Level'])
                </div>
            </div>
        `;
    } else if (stepNum === 3) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 3: Scikit-Learn Logistic Regression Fitting</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Trains weights over multiple gradient descent iterations on numerical matrices.</p>
                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #C084FC; overflow-x: auto;">
                    clf = LogisticRegression()<br>
                    clf.fit(X_train, y_train)<br>
                    # Model Accuracy: 84.2% | ROC-AUC: 0.865
                </div>
            </div>
        `;
    } else if (stepNum === 4) {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">Step 4: Google TabFM Zero-Shot Classification</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">TabFM classifies raw categorical columns in a single forward pass without gradient fine-tuning!</p>
                <div style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: var(--gold-primary); overflow-x: auto;">
                    tabfm = TabFMClassifier()<br>
                    tabfm.fit(train_df, target='High_AI_Trust') # In-context memory loading<br>
                    preds = tabfm.predict_proba(test_df) # Zero-shot inference!<br>
                    # TabFM Accuracy: 89.4% | Zero Training Delay!
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setVizStep(1);
});
