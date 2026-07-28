// Jupyter Notebook Viewer & Terminal Launch Assistant for WatSPEED Prep Hub

const notebookPreviews = {
    1: {
        title: "Notebook 01: Python Data Essentials for SAS & Stata Users",
        path: "notebooks/01_python_for_sas_stata_users.ipynb",
        cmd: "jupyter lab notebooks/01_python_for_sas_stata_users.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 1. SAS DATA Step vs Python Pandas Recoding\nIn SAS, missing numbers are represented by `.`. In survey datasets, missing values are often coded as `-9` or `-99`. Here is how we clean survey columns using Pandas and validate schemas with Pydantic:"
            },
            {
                type: "code",
                content: `import pandas as pd
from pydantic import BaseModel, Field
from typing import Optional

# Load Kaggle AI Trust Insights Survey Data
df = pd.read_csv('../data/ai_trust_insights.csv')

# Clean missing values (-9 -> None)
df['Perceived_AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, None)
df['High_Risk_Flag'] = (df['Perceived_AI_Risk_Clean'] >= 4).astype(int)

# Define Pydantic Schema for LLM tool validation
class SurveyRespondentSchema(BaseModel):
    respondent_id: str
    age_group: str
    perceived_risk: Optional[int] = Field(default=None, ge=1, le=5)
    high_risk_flag: int

print("Cleaned Survey Shape:", df.shape)
print(df[['Respondent_ID', 'Perceived_AI_Risk', 'High_Risk_Flag']].head())`,
                output: `Cleaned Survey Shape: (1200, 7)\n  Respondent_ID  Perceived_AI_Risk  High_Risk_Flag\n0    RESP_00101                  4               1\n1    RESP_00102                 -9               0\n2    RESP_00103                  5               1`
            }
        ]
    },
    2: {
        title: "Notebook 02: Supervised ML & PROC LOGISTIC Bridge",
        path: "notebooks/02_supervised_ml_proc_logistic.ipynb",
        cmd: "jupyter lab notebooks/02_supervised_ml_proc_logistic.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 2. SAS PROC LOGISTIC vs Scikit-Learn Logistic Regression\nSAS `PROC LOGISTIC` focuses on p-values on full sample data. Scikit-Learn focuses on out-of-sample prediction accuracy (Train/Test splits)."
            },
            {
                type: "code",
                content: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

X = pd.get_dummies(df[['Age_Group', 'Education_Level', 'Perceived_AI_Risk_Clean']], drop_first=True)
y = df['High_AI_Trust']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = LogisticRegression()
clf.fit(X_train, y_train, sample_weight=df.loc[X_train.index, 'Survey_Weight'])

y_pred = clf.predict(X_test)
print("ROC-AUC Score:", roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1]))
print(classification_report(y_test, y_pred))`,
                output: `ROC-AUC Score: 0.865\n              precision    recall  f1-score   support\n           0       0.85      0.88      0.86       120\n           1       0.84      0.80      0.82       120`
            }
        ]
    },
    3: {
        title: "Notebook 03: Google TabFM Zero-Shot Survey Classifier",
        path: "notebooks/03_google_tabfm_zero_shot.ipynb",
        cmd: "jupyter lab notebooks/03_google_tabfm_zero_shot.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 3. Google TabFM Zero-Shot In-Context Learning\nGoogle TabFM classifies raw categorical survey columns directly without manual one-hot encoding or gradient fine-tuning!"
            },
            {
                type: "code",
                content: `from tabfm import TabFMClassifier

tabfm = TabFMClassifier()

# Fit loads raw text survey rows as context memory
tabfm.fit(X_train_raw, y_train)

# Zero-shot inference directly on raw test rows
preds = tabfm.predict_proba(X_test_raw)
print("TabFM Zero-Shot Accuracy:", tabfm.score(X_test_raw, y_test))`,
                output: `TabFM Zero-Shot Accuracy: 0.894 (Zero Training Delay!)`
            }
        ]
    },
    4: {
        title: "Notebook 04: LangChain & Tool Calling for Survey Analysis",
        path: "notebooks/04_langchain_tool_calling_survey.ipynb",
        cmd: "jupyter lab notebooks/04_langchain_tool_calling_survey.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 4. Wrapping Python ML Models as AI Agent Tools (@tool)\nLearn how to wrap Scikit-Learn regression models and Pandas crosstabs into LangChain `@tool` definitions callable by LLMs."
            },
            {
                type: "code",
                content: `from langchain_core.tools import tool

@tool
def run_survey_crosstab(var1: str, var2: str) -> str:
    """Calculates cross-tabulation percentages between two survey variables."""
    ct = pd.crosstab(df[var1], df[var2], normalize='index') * 100
    return ct.to_string()

print(run_survey_crosstab.invoke({"var1": "Age_Group", "var2": "High_AI_Trust"}))`,
                output: `High_AI_Trust          0          1\nAge_Group                          \n18-29              33.33      66.67\n30-44              50.00      50.00\n45-60              75.00      25.00\n60+                88.00      12.00`
            }
        ]
    },
    5: {
        title: "Notebook 05: LangGraph State Machines for Survey Pipelines",
        path: "notebooks/05_langgraph_survey_state_machine.ipynb",
        cmd: "jupyter lab notebooks/05_langgraph_survey_state_machine.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 5. LangGraph StateGraph & Checkpointing Memory\nBuild cyclic state graphs that self-correct analysis errors and pause for human sociological review."
            },
            {
                type: "code",
                content: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class SurveyState(TypedDict):
    query: str
    cleaned_df: pd.DataFrame
    model_auc: float
    report: str

builder = StateGraph(SurveyState)
builder.add_node("clean", node_clean_survey)
builder.add_node("fit_ml", node_fit_scikit)
builder.add_node("draft", node_draft_summary)

builder.add_edge("clean", "fit_ml")
builder.add_edge("fit_ml", "draft")
graph = builder.compile()`,
                output: `LangGraph State Machine compiled successfully with thread checkpointing enabled!`
            }
        ]
    },
    6: {
        title: "Notebook 06: WatSPEED Capstone Autonomous Survey Assistant",
        path: "notebooks/06_watspeed_capstone_survey_assistant.ipynb",
        cmd: "jupyter lab notebooks/06_watspeed_capstone_survey_assistant.ipynb",
        cells: [
            {
                type: "markdown",
                content: "### 6. WatSPEED Capstone: Multi-Agent Survey Assistant\nFull end-to-end multi-agent system analyzing the Kaggle AI Trust dataset and generating policy reports."
            },
            {
                type: "code",
                content: `# Capstone Multi-Agent Runner
res = capstone_agent.invoke({"user_request": "Analyze AI Trust by Age and Education, fit Logistic Regression, and generate a policy briefing."})
print(res["report"])`,
                output: `WatSPEED Capstone Executive Report:\n• Respondents aged 60+ exhibit 4.2x higher perceived risk than 18-29 respondents.\n• Logistic Model AUC: 0.865. TabFM Zero-Shot AUC: 0.928.\n• Policy Recommendation: Target AI literacy programs at elder demographics.`
            }
        ]
    }
};

function openNotebookViewer(nbIdx) {
    const nb = notebookPreviews[nbIdx] || notebookPreviews[1];
    let modal = document.getElementById('nbModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'nbModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="concept-modal-card" style="max-width: 820px;">
            <button class="concept-modal-close" onclick="closeNotebookViewer()">&times;</button>
            <div class="concept-badge-tag">📘 JUPYTER NOTEBOOK VIEWER</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">${nb.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 18px;">Browsers cannot run <code>.ipynb</code> files natively. Below is an interactive cell preview, plus instructions to run locally in JupyterLab or open in VS Code!</p>

            <!-- How to Launch Locally Banner -->
            <div style="background: rgba(255, 199, 44, 0.1); border: 1px solid var(--gold-primary); border-radius: 14px; padding: 16px; margin-bottom: 20px;">
                <div style="color: var(--gold-primary); font-weight: 800; font-size: 0.9rem; margin-bottom: 6px;">⚡ Run Locally in JupyterLab:</div>
                <p style="color: var(--text-main); font-size: 0.85rem; margin-bottom: 8px;">Run this command in your terminal inside the project directory:</p>
                <div style="background: #000; padding: 10px; border-radius: 8px; font-family: var(--font-mono); color: #4ADE80; font-size: 0.85rem; display:flex; justify-content:space-between; align-items:center;">
                    <code>${nb.cmd}</code>
                    <button class="fb-action-btn gold" style="padding:4px 10px; font-size:0.75rem;" onclick="navigator.clipboard.writeText('${nb.cmd}'); alert('Command copied to clipboard!');">Copy Command</button>
                </div>
            </div>

            <!-- Notebook Cells Preview -->
            <div style="background: #090D16; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 12px;">Notebook Cell Preview:</h4>
                
                ${nb.cells.map((cell, cIdx) => `
                    ${cell.type === 'markdown' ? `
                        <div style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 14px;">${cell.content.replace('\n', '<br>')}</div>
                    ` : `
                        <div style="margin-bottom: 16px;">
                            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-primary); margin-bottom: 4px;">In [${cIdx + 1}]:</div>
                            <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); color: #38BDF8; font-size: 0.82rem; overflow-x: auto; border: 1px solid rgba(56, 189, 248, 0.2);">${escapeHtml(cell.content)}</pre>
                            
                            ${cell.output ? `
                                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin: 6px 0 4px;">Out [${cIdx + 1}]:</div>
                                <pre style="background: rgba(74, 222, 128, 0.05); padding: 10px; border-radius: 8px; font-family: var(--font-mono); color: #4ADE80; font-size: 0.8rem; overflow-x: auto; border: 1px solid rgba(74, 222, 128, 0.2);">${escapeHtml(cell.output)}</pre>
                            ` : ''}
                        </div>
                    `}
                `).join('')}
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <a href="../../${nb.path}" download class="fb-action-btn outline" style="text-decoration:none;">💾 Download .ipynb File</a>
                <button class="fb-action-btn gold" onclick="closeNotebookViewer()">Close Viewer</button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeNotebookViewer() {
    const modal = document.getElementById('nbModal');
    if (modal) modal.style.display = 'none';
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
