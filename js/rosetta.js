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
        python: `# --- PATH A: SOCIOLOGICAL SURVEY RECODING (Pandas) ---
# Purpose: Recode missing codes (-9 -> NaN), create binary indicators, calculate weighted means
import pandas as pd
import numpy as np

df['risk_clean'] = df['Perceived_AI_Risk'].replace(-9, np.nan)
df['high_risk']  = (df['risk_clean'] >= 4).astype(int)

# --- PATH B: AGENTIC SCHEMA VALIDATION & API CONTRACTS (Pydantic) ---
# Purpose: Prevent LLM hallucinations, enforce strict data boundaries when parsing JSON
from pydantic import BaseModel, Field
from typing import Optional

class SurveyRespondentSchema(BaseModel):
    respondent_id: str
    perceived_risk: Optional[int] = Field(default=None, ge=1, le=5)
    high_ai_trust: bool`,
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 10px;">🌉 The Explicit Method Bridge: Survey Recoding vs. Schema Validation</h4>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <!-- Column 1: Survey Recoding -->
                <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid var(--accent-blue); border-radius: 12px; padding: 14px;">
                    <h5 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 6px; font-weight: 800;">🏛️ 1. Survey Data Recoding</h5>
                    <p style="font-size: 0.83rem; color: var(--text-muted); margin-bottom: 8px;"><strong>Goal:</strong> Vectorized variable transformation on dataframes.</p>
                    <ul style="font-size: 0.82rem; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                        <li><strong>SAS Tool:</strong> <code>DATA</code> step (<code>SET</code>, <code>IF/THEN</code>, missing <code>.</code>)</li>
                        <li><strong>Python Tool:</strong> <code>pandas</code> (<code>.replace()</code>, <code>.astype()</code>)</li>
                        <li><strong>Method Purpose:</strong> Preparing columns for statistical analysis.</li>
                    </ul>
                </div>

                <!-- Column 2: Pydantic Validation -->
                <div style="background: rgba(255, 199, 44, 0.08); border: 1.5px solid var(--gold-primary); border-radius: 12px; padding: 14px;">
                    <h5 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 6px; font-weight: 800;">🤖 2. Agentic Schema Validation</h5>
                    <p style="font-size: 0.83rem; color: var(--text-muted); margin-bottom: 8px;"><strong>Goal:</strong> Enforcing strict boundaries on LLM JSON outputs.</p>
                    <ul style="font-size: 0.82rem; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                        <li><strong>SAS Tool:</strong> <code>PROC FORMAT</code> + custom validation macros</li>
                        <li><strong>Python Tool:</strong> <code>pydantic</code> classes (<code>BaseModel</code>)</li>
                        <li><strong>Method Purpose:</strong> Catching hallucinated or out-of-bounds LLM responses.</li>
                    </ul>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <strong>🔍 Key Method Distinction:</strong><br>
                Pandas handles <em>batch data transformation</em> across thousands of survey rows. Pydantic handles <em>single-record structural validation</em> to ensure an AI agent or API returns valid data before it enters your pipeline.
            </div>
        `,
        proTip: "💡 <strong>Sociologist Pro-Tip:</strong> Think of Pandas as your SAS DATA step for cleaning survey CSVs, and Pydantic as your automated data auditor for AI agents!",
        agenticNote: "In Agentic AI, Pydantic schemas prevent LLMs from returning invalid survey categories or hallucinating out-of-range Likert scores."
    },
    ml: {
        title: "2. SAS PROC LOGISTIC ➔ Scikit-Learn Supervised ML Tools",
        sas: `/* SAS PROC LOGISTIC */
proc logistic data=clean_survey;
    class Education_Level Tech_Familiarity;
    model High_AI_Trust(event='1') = Age_Group Education_Level Tech_Familiarity Perceived_AI_Risk;
    weight Survey_Weight;
run;`,
        stata: `* Stata Logistic Regression
svyset [pw=Survey_Weight]
svy: logit High_AI_Trust i.Education_Level i.Tech_Familiarity Perceived_AI_Risk`,
        python: `# --- USE CASE A: SOCIOLOGIST / INFERENCE PATH (statsmodels) ---
# Goal: p-values, Odds Ratios, standard errors, survey weights
import statsmodels.formula.api as smf
import statsmodels.api as sm

# ⚠️ TWO REAL GOTCHAS FOR SAS USERS — read before trusting the coefficients:
#
# 1. CLASS PARAMETERIZATION. SAS PROC LOGISTIC defaults to PARAM=EFFECT
#    (deviation coding against the grand mean). Patsy's C() uses TREATMENT
#    (reference) coding. The coefficients will NOT match SAS unless you write
#       class Education_Level / param=ref ref=first;
#    in SAS, or set the contrast explicitly in Python.
#
# 2. smf.logit() HAS NO weights ARGUMENT. It silently ignores survey weights.
#    Use GLM with freq_weights to apply them:

model_soc = smf.glm(
    "High_AI_Trust ~ C(Age_Group, Treatment) + C(Education_Level, Treatment) + Perceived_AI_Risk",
    data=df,
    family=sm.families.Binomial(),
    freq_weights=df["Survey_Weight"],      # the SAS WEIGHT statement
).fit()
print(model_soc.summary())

# NOTE: freq_weights reproduces the weighted point estimates, but NOT the
# design-based standard errors that SAS PROC SURVEYLOGISTIC or Stata's
# svy: prefix give you. For proper design-based inference you need
# clustering/strata support that base statsmodels does not provide.

# --- USE CASE B: DATA SCIENTIST / AI AGENT PATH (scikit-learn) ---
# Goal: Out-of-sample prediction accuracy (ROC-AUC), L2 regularization, agent @tool
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X = pd.get_dummies(df[["Age_Group", "Education_Level", "Perceived_AI_Risk"]], drop_first=True)
y = df["High_AI_Trust"]

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
clf = LogisticRegression(penalty="l2").fit(X_tr, y_tr)
print(f"Agent Test ROC-AUC: {roc_auc_score(y_te, clf.predict_proba(X_te)[:, 1]):.3f}")`,
        explanation: `
            <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 10px;">🌉 The Explicit Method Bridge: Sociologist vs. Data Scientist</h4>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <!-- Column 1: Sociologist -->
                <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid var(--accent-blue); border-radius: 12px; padding: 14px;">
                    <h5 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 6px; font-weight: 800;">🏛️ 1. Sociologist / Research Path</h5>
                    <p style="font-size: 0.83rem; color: var(--text-muted); margin-bottom: 8px;"><strong>Goal:</strong> Explanation & Hypothesis Testing (<em>Why</em> do people trust AI?)</p>
                    <ul style="font-size: 0.82rem; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                        <li><strong>SAS Tool:</strong> <code>PROC LOGISTIC</code> / <code>PROC SURVEYLOGISTIC</code></li>
                        <li><strong>Python Tool:</strong> <code>statsmodels.formula.api.logit</code></li>
                        <li><strong>Outputs:</strong> Odds Ratios, 95% CIs, Wald $\chi^2$ $p$-values, AIC.</li>
                        <li><strong>Data Prep:</strong> Formulas handle categoricals via <code>C(var)</code> syntax.</li>
                    </ul>
                </div>

                <!-- Column 2: Data Scientist / Agent -->
                <div style="background: rgba(255, 199, 44, 0.08); border: 1.5px solid var(--gold-primary); border-radius: 12px; padding: 14px;">
                    <h5 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 6px; font-weight: 800;">🤖 2. Data Scientist / AI Agent Path</h5>
                    <p style="font-size: 0.83rem; color: var(--text-muted); margin-bottom: 8px;"><strong>Goal:</strong> Out-of-Sample Prediction (<em>Will this new respondent</em> trust AI?)</p>
                    <ul style="font-size: 0.82rem; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                        <li><strong>SAS Tool:</strong> <code>PROC HPLOGISTIC</code> (with <code>partition</code>)</li>
                        <li><strong>Python Tool:</strong> <code>scikit-learn LogisticRegression</code></li>
                        <li><strong>Outputs:</strong> Train/Test split, ROC-AUC, confusion matrices.</li>
                        <li><strong>Data Prep:</strong> Explicit <code>pd.get_dummies()</code> 0/1 matrices.</li>
                    </ul>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                <strong>🔍 Why the Code Syntax Differs:</strong><br>
                When moving from SAS to Python, you choose your package based on your goal:
                <br>• If you want a formula string like SAS (e.g. <code>"y ~ x1 + C(x2)"</code>) with $p$-value tables, use <strong><code>statsmodels</code></strong>.
                <br>• If you want to train an ML model for an AI Agent tool call (e.g. <code>@tool</code>), use <strong><code>scikit-learn</code></strong>.
            </div>
        `,
        proTip: "💡 <strong>Sociological AI Pro-Tip:</strong> The ultimate AI Agent combines both! It uses <code>statsmodels</code> to draft the academic baseline findings for your survey report, and <code>scikit-learn</code> to deploy the automated real-time classifier.",
        agenticNote: "An agentic survey assistant can invoke statsmodels when asked 'Are education levels statistically significant?' and scikit-learn when asked 'Classify these 50 new incoming survey rows'."
    },
    graph: {
        title: "3. Stata .do File / SAS Macros ➔ LangGraph State Machines (StateGraph)",
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
from langgraph.graph import StateGraph, START, END

def router_node(state):
    if state["accuracy"] >= 0.85:
        return "report"
    return "re_engineer"   # Cyclic self-correction loop!

builder = StateGraph(SurveyState)
builder.add_node("clean", node_clean_data)
builder.add_node("re_engineer", node_re_engineer)   # must exist — the router names it
builder.add_node("tabfm", node_run_tabfm)
builder.add_node("report", node_draft_report)

builder.add_edge(START, "clean")
builder.add_edge("clean", "tabfm")
builder.add_edge("re_engineer", "tabfm")            # the cycle back
builder.add_conditional_edges("tabfm", router_node)
builder.add_edge("report", END)

graph = builder.compile()`,
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

// escapeHtml lives in js/feedback.js (loaded first). Duplicate definitions
// here silently shadowed it depending on script order.
