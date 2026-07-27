// Rosetta Stone comparative matrix with Stata View Toggle
const rosettaData = {
    data: {
        title: "1. SAS DATA Step / Stata Recode ➔ Pandas & Pydantic Schemas",
        sas: `/* SAS DATA Step */
data clean_survey;
    set ai_trust_insights;
    if Perceived_AI_Risk = -9 then Perceived_AI_Risk = .;
    High_Risk = (Perceived_AI_Risk >= 4);
run;`,
        stata: `* Stata .do Recode
use "ai_trust_insights.dta", clear
mvdecode Perceived_AI_Risk, mv(-9)
gen High_Risk = (Perceived_AI_Risk >= 4) if !missing(Perceived_AI_Risk)`,
        python: `# Python Pandas & Pydantic Model
import pandas as pd
from pydantic import BaseModel

df['Perceived_AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, None)
df['High_Risk'] = (df['Perceived_AI_Risk_Clean'] >= 4).astype(int)

class SurveyRespondent(BaseModel):
    respondent_id: str
    high_risk: bool`,
        agenticNote: "In Agentic AI, strict Pydantic schemas prevent hallucinations when LLMs process survey rows or parse function tool inputs."
    },
    ml: {
        title: "2. SAS PROC LOGISTIC ➔ Scikit-Learn Supervised ML Tools",
        sas: `/* SAS PROC LOGISTIC */
proc logistic data=clean_survey;
    class Education_Level Tech_Familiarity;
    model High_AI_Trust(event='1') = Age_Group Education_Level Perceived_AI_Risk;
    weight Survey_Weight;
run;`,
        stata: `* Stata Logistic Regression
svyset [pw=Survey_Weight]
svy: logit High_AI_Trust i.Education_Level i.Tech_Familiarity Perceived_AI_Risk`,
        python: `# Scikit-Learn Supervised ML Tool (@tool)
from sklearn.linear_model import LogisticRegression

@tool
def fit_logistic(X_train, y_train, sample_weight=None):
    clf = LogisticRegression()
    clf.fit(X_train, y_train, sample_weight=sample_weight)
    return {"roc_auc": clf.score(X_test, y_test)}`,
        agenticNote: "Agent tools wrapper (@tool) allow autonomous LLM agents to call PROC LOGISTIC style regression tools from natural language prompts."
    },
    tabfm: {
        title: "3. Traditional Model Fitting ➔ Google TabFM Zero-Shot Foundation Model",
        sas: `/* Traditional ML requires explicit model fitting & hyperparameter search */
/* No native SAS equivalency for Zero-Shot Tabular Transformers */`,
        stata: `* Requires fitting parameters on training subset first`,
        python: `# Google TabFM (Tabular Foundation Model) Zero-Shot
from tabfm import TabFMClassifier

# Zero-shot inference directly from in-context training rows!
tabfm = TabFMClassifier()
tabfm.fit(train_df, 'High_AI_Trust')  # In-context context loading
preds = tabfm.predict_proba(test_df) # Instant forward-pass prediction`,
        agenticNote: "Google TabFM allows survey agents to predict labels on raw categorical survey columns in a single forward pass without manual one-hot recoding or long training loops."
    },
    graph: {
        title: "4. Stata .do File ➔ LangGraph State Machines (StateGraph)",
        sas: `/* SAS Macro Chain */
%macro run_survey_pipeline();
    %clean_data();
    %fit_models();
    %export_report();
%mend;`,
        stata: `* Stata Sequential Execution
do "01_clean.do"
do "02_models.do"
do "03_report.do"`,
        python: `# LangGraph State Machine (StateGraph)
from langgraph.graph import StateGraph

builder = StateGraph(SurveyState)
builder.add_node("clean", node_clean_data)
builder.add_node("tabfm", node_run_tabfm)
builder.add_node("report", node_draft_report)
builder.add_edge("clean", "tabfm")
builder.add_edge("tabfm", "report")`,
        agenticNote: "LangGraph provides state persistence, cyclic execution loops, conditional node branching, and memory — perfect for multi-step survey analysis."
    },
    mcp: {
        title: "5. SAS Libnames ➔ Model Context Protocol (MCP) Endpoints",
        sas: `/* SAS Library Handle */
libname survey "C:\\data\\ai_trust";
proc contents data=survey._all_; run;`,
        stata: `* Stata Data Directory
cd "C:\\data\\ai_trust"
describe using "survey_data.dta"`,
        python: `# Anthropic Model Context Protocol (MCP) Server
from mcp.server import Server

app = Server("survey-mcp")

@app.read_resource("survey://codebook")
def get_codebook():
    return open("ai_trust_codebook.json").read()

@app.call_tool("crosstab")
def run_crosstab(var1, var2):
    return pd.crosstab(df[var1], df[var2]).to_dict()`,
        agenticNote: "MCP is the open standard that connects LLM clients (Claude, GPT, Gemini) directly to your local survey datasets, codebooks, and statistical tools."
    }
};

let currentRosettaKey = 'data';
let showStataView = false;

function toggleStataView() {
    showStataView = !showStataView;
    renderRosettaContent(currentRosettaKey);
}

function showRosettaTab(key) {
    currentRosettaKey = key;
    document.querySelectorAll('.rosetta-tab').forEach(b => b.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderRosettaContent(key);
}

function renderRosettaContent(key) {
    const item = rosettaData[key];
    const container = document.getElementById('rosettaContentCard');
    if (!container || !item) return;

    const gridColumns = showStataView ? "1fr 1fr" : "1fr";

    const stataBlockHtml = showStataView ? `
        <div>
            <h4 style="font-size: 0.85rem; color: var(--accent-purple); margin-bottom: 6px;">Stata .do Command</h4>
            <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; overflow-x: auto; color: #C084FC;">${escapeHtml(item.stata)}</pre>
        </div>
    ` : '';

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin: 0;">${item.title}</h3>
            
            <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); cursor: pointer; user-select: none; background: rgba(255,255,255,0.05); padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <input type="checkbox" id="stataToggle" ${showStataView ? 'checked' : ''} onchange="toggleStataView()">
                <span>Show Stata Comparison View</span>
            </label>
        </div>
        
        <div style="display: grid; grid-template-columns: ${gridColumns}; gap: 16px; margin-bottom: 16px;">
            <div>
                <h4 style="font-size: 0.85rem; color: var(--accent-blue); margin-bottom: 6px;">SAS Command (Primary)</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem; overflow-x: auto; color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.2);">${escapeHtml(item.sas)}</pre>
            </div>
            ${stataBlockHtml}
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="font-size: 0.85rem; color: var(--gold-primary); margin-bottom: 6px;">Python & Agentic AI Equivalent</h4>
            <pre style="background: #000; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem; overflow-x: auto; color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.2);">${escapeHtml(item.python)}</pre>
        </div>

        <div style="background: rgba(255, 199, 44, 0.08); border-left: 4px solid var(--gold-primary); padding: 12px 16px; border-radius: 4px; font-size: 0.88rem; color: var(--text-main);">
            <strong>Agentic Insight:</strong> ${item.agenticNote}
        </div>
    `;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.addEventListener('DOMContentLoaded', () => {
    showRosettaTab('data');
});
