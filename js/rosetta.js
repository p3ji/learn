// Rosetta Stone comparative matrix with Stage-Targeted Rendering & Safe Event Handling
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
        python: `# Step 1: Encode categoricals (SAS CLASS does this automatically!)
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# YOUR DATA — equivalent to SAS 'data=clean_survey'
df = pd.read_csv("survey_data.csv")

# Replace missing codes (-9) with NaN first
df["Perceived_AI_Risk"] = df["Perceived_AI_Risk"].replace(-9, pd.NA)

# Define X (predictors) and y (outcome) — SAS MODEL statement does this
X = pd.get_dummies(df[["Age_Group", "Education_Level", "Perceived_AI_Risk"]],
                   drop_first=True)  # creates 0/1 dummy columns like SAS CLASS
y = df["High_AI_Trust"]                # outcome variable (0/1)
w = df["Survey_Weight"]                # sample weights (SAS: weight Survey_Weight;)

# Step 2: Train/Test split (80% train, 20% test) — no SAS equivalent
X_train, X_test, y_train, y_test, w_train, w_test = train_test_split(
    X, y, w, test_size=0.2, random_state=42)

# Step 3: Fit model with survey weights
clf = LogisticRegression()
clf.fit(X_train, y_train, sample_weight=w_train)

# Step 4: Evaluate (SAS shows AIC/p-values; sklearn shows predictive accuracy)
roc_auc = roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1])
print(f"ROC-AUC: {roc_auc:.3f}")`,
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🔍 Why Python Needs More Setup Than SAS:</h4>
            <ul style="color: var(--text-muted); font-size: 0.88rem; padding-left: 18px; margin-bottom: 12px;">
                <li><strong>SAS <code>CLASS</code> statement:</strong> SAS automatically converts text variables like <code>Education_Level</code> into 0/1 dummy columns behind the scenes. You just list them and SAS handles it.</li>
                <li><strong>SAS <code>MODEL y = x1 x2;</code>:</strong> SAS reads which columns are X (predictors) and y (outcome) directly from the MODEL statement — no separate extraction step needed.</li>
                <li><strong>Python <code>pd.get_dummies()</code>:</strong> You must explicitly create the dummy columns yourself. This is the step SAS hides — it's the same math, just visible.</li>
                <li><strong>Python X/y split:</strong> You explicitly define <code>X</code> (the predictor matrix) and <code>y</code> (the outcome column) before fitting. SAS infers these from the MODEL formula.</li>
                <li><strong>Train/Test split:</strong> SAS fits on the full dataset and reports inference stats (p-values, AIC). Sklearn prioritises out-of-sample prediction — so you hold 20% back as a test set and measure ROC-AUC.</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 8px;">⚖️ Do SAS and Scikit-Learn Give the Exact Same Results?</h4>
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <p><strong>Out-of-the-box? NO!</strong> They differ by default for 3 main reasons:</p>
                <ol style="padding-left: 18px; margin: 6px 0; line-height: 1.5;">
                    <li><strong>Regularization:</strong> Scikit-Learn applies <code>L2 regularization</code> penalty by default (shrinking coefficients to prevent overfitting). SAS <code>PROC LOGISTIC</code> uses unregularized Maximum Likelihood Estimation (MLE). Pass <code>penalty=None</code> in Python to turn it off.</li>
                    <li><strong>Reference Category:</strong> SAS drops the <em>last</em> level by default; <code>pd.get_dummies(drop_first=True)</code> drops the <em>first</em> level.</li>
                    <li><strong>P-values vs Accuracy:</strong> Scikit-Learn does NOT calculate p-values or Odds Ratio 95% CIs — it calculates predictive accuracy/ROC-AUC.</li>
                </ol>
                <p style="margin-top:6px; color: var(--gold-primary);"><strong>💡 Need exact SAS-style p-values & Odds Ratios in Python?</strong> Use <code>statsmodels</code> instead of <code>sklearn</code>: <br><code>import statsmodels.formula.api as smf; model = smf.logit("High_AI_Trust ~ C(Education_Level) + Perceived_AI_Risk", data=df).fit()</code> — this gives the exact SAS PROC LOGISTIC output table!</p>
            </div>
        `,
        proTip: "💡 <strong>Sociologist Pro-Tip:</strong> Use <code>scikit-learn</code> when building machine learning pipelines & AI agents (prediction). Use <code>statsmodels</code> when writing journal papers needing p-values & odds ratio confidence intervals (inference).",
        agenticNote: "An agentic AI can run scikit-learn for machine learning classification or statsmodels for academic reporting, depending on what the user asks for in plain English."
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
    }
};

let showStataView = false;

function toggleStataView() {
    showStataView = !showStataView;
    renderRosettaContent('data', 'rosettaContentCard1');
    renderRosettaContent('ml', 'rosettaContentCard2');
    renderRosettaContent('graph', 'rosettaContentCard3');
}

function renderRosettaContent(key, targetContainerId) {
    const item = rosettaData[key];
    const container = document.getElementById(targetContainerId || 'rosettaContentCard1');
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
