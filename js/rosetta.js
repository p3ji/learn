// Rosetta Stone comparative matrix with Safe Event Handling & Detailed Breakdown
const rosettaData = {
    data: {
        title: "1. SAS DATA Step / Stata Recode ➔ Pandas & Pydantic Schemas",
        sas: `/* SAS DATA Step + PROC FORMAT Validation (Pydantic Equivalent in SAS) */
proc format;
    value risk_chk 1-5 = 'Valid' other = 'Invalid';
run;

data clean_survey;
    set ai_trust_insights;
    if Perceived_AI_Risk = -9 then Perceived_AI_Risk = .;
    
    /* SAS Pydantic-style Validation Trap */
    if not missing(Perceived_AI_Risk) and put(Perceived_AI_Risk, risk_chk.) = 'Invalid' then do;
        put "ERROR: [Pydantic Validation Trap] Invalid Likert score: " Perceived_AI_Risk;
        _error_ = 1;
    end;
    
    High_Risk = (Perceived_AI_Risk >= 4);
run;`,
        stata: `* Stata .do Recode
use "ai_trust_insights.dta", clear
mvdecode Perceived_AI_Risk, mv(-9)
gen High_Risk = (Perceived_AI_Risk >= 4) if !missing(Perceived_AI_Risk)`,
        python: `# Python Pandas & Pydantic Model (Pydantic is a Python Data Validation Library)
import pandas as pd
from pydantic import BaseModel, Field
from typing import Optional

df['Perceived_AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, None)
df['High_Risk'] = (df['Perceived_AI_Risk_Clean'] >= 4).astype(int)

# Pydantic Schema: Replaces ~30 lines of SAS DATA step validation & PROC FORMAT!
class SurveyRespondent(BaseModel):
    respondent_id: str
    perceived_risk: Optional[int] = Field(default=None, ge=1, le=5)
    high_ai_trust: bool`,
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 How to do Pydantic Validation in SAS:</h4>
            <div style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 12px;">
                <p>To replicate what Pydantic does for an LLM in SAS, you would need to write:</p>
                <ol style="padding-left: 20px; margin-top: 6px;">
                    <li><strong>Outbound Schema (JSON Creation):</strong> Use <code>PROC JSON</code> or a SAS macro to construct an explicit JSON Schema definition string to send in your <code>PROC HTTP</code> API request payload to tell the LLM how to format its output.</li>
                    <li><strong>Inbound Parsing:</strong> Read the raw LLM JSON response using <code>LIBNAME JSON</code>.</li>
                    <li><strong>Validation & Range Checks:</strong> Write a 20-30 line SAS <code>DATA</code> step with <code>PROC FORMAT</code> value checks, <code>PUT</code> log error statements, and <code>_error_ = 1</code> flags to abort execution if the AI returns out-of-bounds data.</li>
                </ol>
            </div>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Why Pydantic is a Game-Changer vs SAS:</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>1. Dual-Action (Schema Gen + Validation):</strong> Pydantic automatically exports the JSON Schema for the LLM prompt (via <code>Model.model_json_schema()</code>) AND validates the inbound response in 4 lines of Python code!</p>
                <p style="margin-top:6px;"><strong>2. Type Coercion:</strong> If an LLM returns a numeric string <code>"4"</code>, Pydantic automatically coerces it into integer <code>4</code> while enforcing the boundary rule (<code>1 <= risk <= 5</code>).</p>
            </div>
        `,
        proTip: "💡 <strong>SAS Veteran Pro-Tip:</strong> Pydantic collapses 30 lines of SAS PROC FORMAT checks and DATA step error-handling macros into a clean 4-line Python class definition!",
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
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 Code & Execution Breakdown:</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 18px; margin-bottom: 12px;">
                <li><strong>SAS PROC LOGISTIC:</strong> Handles categorical dummy coding automatically inside the <code>class</code> statement, fits the model, and outputs comprehensive statistical tables (coefficients, standard errors, Wald Chi-Square p-values, odds ratios, AIC/SBC).</li>
                <li><strong>Scikit-Learn <code>LogisticRegression().fit()</code>:</strong> Requires explicit numerical matrix inputs (e.g. via <code>pd.get_dummies()</code>). It prioritizes prediction performance on out-of-sample test data.</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Key Differences SAS vs Scikit-Learn:</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>1. Inference vs Prediction:</strong> SAS focuses on statistical inference & p-values on full sample data. Scikit-Learn focuses on out-of-sample generalization (Train/Test 80/20 splits & ROC-AUC curves).</p>
                <p style="margin-top:6px;"><strong>2. Survey Weights:</strong> SAS uses <code>weight Survey_Weight;</code>. Scikit-Learn passes <code>sample_weight=df['Survey_Weight']</code> into the <code>.fit()</code> function.</p>
            </div>
        `,
        proTip: "💡 <strong>SAS Veteran Pro-Tip:</strong> Wrap Scikit-Learn model fitting inside a <code>@tool</code> wrapper function so your LangGraph agent can call PROC LOGISTIC style regression tools directly from plain English user requests!",
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
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 Code & Execution Breakdown:</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 18px; margin-bottom: 12px;">
                <li><strong>Traditional SAS / ML:</strong> Requires iterative parameter optimization (gradient descent / maximum likelihood) and manual feature engineering on every new dataset.</li>
                <li><strong>Google TabFM (Tabular Foundation Model):</strong> Uses Transformer-based <strong>In-Context Learning (ICL)</strong>. It receives training survey rows as context and predicts test labels in a single forward pass without gradient fine-tuning!</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Key Advantages of TabFM for Survey Research:</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>1. Handles Raw Survey Strings Natively:</strong> No need to create manual dummy variables for Likert scales or demographic text columns.</p>
                <p style="margin-top:6px;"><strong>2. Zero Training Delay:</strong> Instant predictions allow autonomous conversational agents to evaluate models during real-time user chat.</p>
            </div>
        `,
        proTip: "💡 <strong>SAS Veteran Pro-Tip:</strong> Use TabFM zero-shot prediction as a rapid benchmark to compare against traditional SAS PROC LOGISTIC or Random Forests!",
        agenticNote: "Google TabFM allows survey agents to predict labels on raw categorical survey columns in a single forward pass without manual one-hot recoding or long training loops."
    },
    graph: {
        title: "4. Stata .do File / SAS Macros ➔ LangGraph State Machines (StateGraph)",
        sas: `/* SAS Macro Chain with Conditional Logic */
%macro run_survey_pipeline();
    %clean_data();
    %fit_models();
    
    /* SAS Macro Conditional Logic (%IF / %ELSE) */
    %if &SYSERR. = 0 %then %do;
        %export_report();
    %end;
    %else %do;
        %log_error();
    %end;
%mend;`,
        stata: `* Stata Sequential Execution with if/else
do "01_clean.do"
if _rc == 0 {
    do "02_models.do"
}`,
        python: `# LangGraph State Machine (StateGraph) with Dynamic Router Edges
from langgraph.graph import StateGraph, END

def router_node(state):
    if state["accuracy"] >= 0.85:
        return "report"
    return "re_engineer_features" # Cyclic self-correction loop!

builder = StateGraph(SurveyState)
builder.add_node("clean", node_clean_data)
builder.add_node("tabfm", node_run_tabfm)
builder.add_node("report", node_draft_report)
builder.add_conditional_edges("tabfm", router_node)`,
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 Code & Execution Breakdown:</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 18px; margin-bottom: 12px;">
                <li><strong>SAS Macro Conditional Logic (%IF / %ELSE):</strong> Evaluates macro variables (e.g. <code>&SYSERR.</code> or <code>&syscc.</code>) or macro expressions to determine which macro block to run next.</li>
                <li><strong>LangGraph State Machine:</strong> Uses Python router functions acting on a shared <code>State</code> dictionary. Unlike linear SAS macros, LangGraph nodes can make <strong>non-deterministic AI decisions</strong>, loop back cyclically to previous nodes, or pause for Human-in-the-Loop review.</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Key Differences: SAS Macro %IF vs LangGraph Router Edges:</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>1. State Dictionary Memory:</strong> SAS macros rely on global macro variables (<code>&var.</code>). LangGraph passes a centralized <code>State</code> object containing full message history, data tables, and agent memory across graph nodes.</p>
                <p style="margin-top:6px;"><strong>2. Dynamic Agent Routing:</strong> In LangGraph, the conditional edge can ask an LLM agent to inspect model output errors and dynamically decide which tool node to execute next.</p>
                <p style="margin-top:6px;"><strong>3. Built-in Checkpointing:</strong> LangGraph can pause execution (e.g. waiting for human sociological approval), save graph state to a database, and resume seamlessly.</p>
            </div>
        `,
        proTip: "💡 <strong>SAS Veteran Pro-Tip:</strong> Just as SAS Macros use %IF/%THEN to direct flow based on macro variables, LangGraph uses conditional router edges—but with full state persistence, cyclic self-correction loops, and LLM-driven decision making!",
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
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 Code & Execution Breakdown:</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 18px; margin-bottom: 12px;">
                <li><strong>SAS <code>LIBNAME</code>:</strong> Internal SAS directory handle that allows SAS procedures to access datasets on a local or server disk.</li>
                <li><strong>Model Context Protocol (MCP):</strong> Open JSON-RPC API standard that allows external LLM models (Claude Desktop, VS Code, Web Apps) to inspect local survey codebooks (<code>Resources</code>) and run statistical procedures (<code>Tools</code>).</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Key Differences:</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>1. Universal Interoperability:</strong> MCP is vendor-agnostic. Once built, any MCP-compatible AI client can query your survey dataset without custom adapter code.</p>
                <p style="margin-top:6px;"><strong>2. Security & Control:</strong> You explicitly declare which dataset columns or tools are exposed through the MCP Server interface.</p>
            </div>
        `,
        proTip: "💡 <strong>SAS Veteran Pro-Tip:</strong> MCP Resources are like 'PROC CONTENTS' metadata, while MCP Tools are like SAS 'PROCs' that the AI assistant can execute remotely!",
        agenticNote: "MCP is the open standard that connects LLM clients (Claude, GPT, Gemini) directly to your local survey datasets, codebooks, and statistical tools."
    }
};

let currentRosettaKey = 'data';
let showStataView = false;

function toggleStataView() {
    showStataView = !showStataView;
    renderRosettaContent(currentRosettaKey);
}

function showRosettaTab(key, evt) {
    currentRosettaKey = key;
    document.querySelectorAll('.rosetta-tab').forEach(b => b.classList.remove('active'));
    
    // Safe event element selection
    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    if (target) {
        target.classList.add('active');
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

        <!-- Detailed Syntax Breakdown & Key Differences -->
        <div style="background: rgba(18, 24, 38, 0.8); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 18px; margin-bottom: 16px;">
            ${item.explanation}
            <div style="margin-top: 10px; font-size: 0.88rem; color: var(--gold-primary);">${item.proTip}</div>
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
