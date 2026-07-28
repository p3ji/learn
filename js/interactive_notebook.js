// Interactive In-Browser Python Execution Lab
// Engine: Skulpt (real Python interpreter in JS) with Pyodide WASM upgrade path

// â”€â”€â”€ Lab Scripts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const defaultLabNotebooks = {
    1: {
        title: "Lab 01: Python Data Essentials & Pydantic Recoding",
        subtitle: "Modify Pandas recoding logic and Pydantic validation rules. Click 'Run Code' or press Shift+Enter to execute!",
        initialCode: `# Lab 01 â€” Survey Data Recoding
# Try changing recode_cutoff to 3 or 5 and re-running!

data = [
    {"id": "RESP_01", "age_group": "30-44", "ai_risk": 4,  "ai_trust": 1, "weight": 1.25},
    {"id": "RESP_02", "age_group": "18-29", "ai_risk": -9, "ai_trust": 1, "weight": 0.95},
    {"id": "RESP_03", "age_group": "45-60", "ai_risk": 5,  "ai_trust": 0, "weight": 1.10},
    {"id": "RESP_04", "age_group": "60+",   "ai_risk": 4,  "ai_trust": 0, "weight": 1.40},
    {"id": "RESP_05", "age_group": "18-29", "ai_risk": 1,  "ai_trust": 1, "weight": 0.88},
]

# --- EDIT THESE VALUES ---
recode_cutoff = 4    # Change to 3 or 5 and re-run!
missing_code  = -9   # SAS equivalent: missing = .

# Recode missing values and create high-risk flag
total_w = 0.0
weighted_sum = 0.0

print("id        age_group  ai_risk  cleaned   high_risk")
print("-" * 50)

for row in data:
    raw = row["ai_risk"]
    cleaned = None if raw == missing_code else raw
    flag = 1 if (cleaned is not None and cleaned >= recode_cutoff) else 0
    row["ai_risk_clean"] = cleaned
    row["high_risk_flag"] = flag
    cleaned_str = str(cleaned) if cleaned is not None else "NaN"
    print(row["id"] + "  " + row["age_group"] + "  " + str(raw) + "  " + cleaned_str + "  " + str(flag))
    if cleaned is not None:
        weighted_sum += cleaned * row["weight"]
        total_w += row["weight"]

weighted_mean = weighted_sum / total_w if total_w > 0 else 0
print("")
print("Population Weighted Risk Mean: " + str(round(weighted_mean, 2)) + " / 5.0")
print("(Recode Cutoff >= " + str(recode_cutoff) + ")")
`
    },
    2: {
        title: "Lab 02: Supervised ML & PROC LOGISTIC Bridge",
        subtitle: "Tune train/test split ratio or decision threshold and see accuracy change live!",
        initialCode: `# Lab 02 â€” Logistic Regression (no sklearn needed)
# Simulates a trained model with adjustable decision threshold

# --- EDIT THESE VALUES ---
test_ratio = 0.20       # Fraction for test set (try 0.30 or 0.10)
decision_threshold = 0.5  # Probability cutoff for High Trust (try 0.4 or 0.6)

# Simulated predicted probabilities [feature: ai_risk, tech_fam]
respondents = [
    {"id": "RESP_01", "ai_risk": 4, "tech_fam": 5, "actual": 1},
    {"id": "RESP_02", "ai_risk": 2, "tech_fam": 4, "actual": 1},
    {"id": "RESP_03", "ai_risk": 5, "tech_fam": 2, "actual": 0},
    {"id": "RESP_04", "ai_risk": 4, "tech_fam": 3, "actual": 0},
    {"id": "RESP_05", "ai_risk": 1, "tech_fam": 5, "actual": 1},
    {"id": "RESP_06", "ai_risk": 3, "tech_fam": 3, "actual": 0},
    {"id": "RESP_07", "ai_risk": 4, "tech_fam": 4, "actual": 0},
    {"id": "RESP_08", "ai_risk": 2, "tech_fam": 4, "actual": 1},
    {"id": "RESP_09", "ai_risk": 5, "tech_fam": 1, "actual": 0},
    {"id": "RESP_10", "ai_risk": 2, "tech_fam": 5, "actual": 1},
]

# Simple logistic probability: p = 1 / (1 + exp(2*risk - 3*tech))
import math

n_test = int(len(respondents) * test_ratio)
test_set = respondents[-n_test:] if n_test > 0 else respondents

correct = 0
print("id        prob    predicted  actual  correct?")
print("-" * 50)
for r in test_set:
    logit = 2.5 - 0.6 * r["ai_risk"] + 0.5 * r["tech_fam"]
    prob = 1.0 / (1.0 + math.exp(-logit))
    predicted = 1 if prob >= decision_threshold else 0
    ok = predicted == r["actual"]
    if ok:
        correct += 1
    print(r["id"] + "  " + str(round(prob, 3)) + "  " + str(predicted) + "  " + str(r["actual"]) + "  " + ("âœ“" if ok else "âœ—"))

accuracy = correct / len(test_set) * 100
print("")
print("Test Set Size:  " + str(len(test_set)) + " respondents")
print("Threshold:      " + str(decision_threshold))
print("Test Accuracy:  " + str(round(accuracy, 1)) + "%")
`
    },
    3: {
        title: "Lab 03: Google TabFM Zero-Shot Survey Classifier",
        subtitle: "Test how TabFM classifies respondents without manual dummy coding!",
        initialCode: `# Lab 03 â€” Google TabFM Zero-Shot Simulation
# Demonstrates why TabFM doesn't need one-hot encoding

# --- EDIT THE RESPONDENT PROFILE BELOW ---
respondent = {
    "Age_Group":       "18-29",      # try: "30-44", "45-60", "60+"
    "Education_Level": "Master's",   # try: "High School", "Bachelor's", "PhD"
    "Perceived_AI_Risk": "Low",      # try: "Low", "Medium", "High", "Very High"
    "Tech_Familiarity":  "Expert"    # try: "Novice", "Intermediate", "Expert"
}

in_context_rows = 128  # Try changing to 64 or 256

# Lookup table (simulates TabFM in-context attention weights)
risk_scores = {"Very Low": 0.05, "Low": 0.20, "Medium": 0.50, "High": 0.78, "Very High": 0.92}
age_mod     = {"18-29": -0.15, "30-44": 0.0, "45-60": 0.20, "60+": 0.35}
edu_mod     = {"High School": 0.10, "Bachelor's": 0.0, "Master's": -0.05, "PhD": -0.10}
tech_mod    = {"Novice": 0.20, "Intermediate": 0.0, "Expert": -0.20}

base = risk_scores.get(respondent["Perceived_AI_Risk"], 0.50)
base += age_mod.get(respondent["Age_Group"], 0)
base += edu_mod.get(respondent["Education_Level"], 0)
base += tech_mod.get(respondent["Tech_Familiarity"], 0)
base = max(0.01, min(0.99, base))

p_low_trust  = round(base, 3)
p_high_trust = round(1 - base, 3)

print("=== GOOGLE TabFM ZERO-SHOT CLASSIFICATION ===")
print("In-Context Memory: " + str(in_context_rows) + " rows loaded")
print("")
print("Respondent Profile:")
for k, v in respondent.items():
    print("  " + k + ": " + v)
print("")
print("Prediction (no dummy encoding required!):")
print("  High_AI_Trust = 1: " + str(round(p_high_trust * 100, 1)) + "% confidence")
print("  High_AI_Trust = 0: " + str(round(p_low_trust  * 100, 1)) + "% confidence")
predicted = "HIGH TRUST" if p_high_trust > 0.5 else "LOW TRUST"
print("")
print("Final Classification: " + predicted)
`
    },
    4: {
        title: "Lab 04: LangChain & Tool Calling for Survey Analysis",
        subtitle: "Edit the @tool function and watch an LLM decide which tool to call!",
        initialCode: `# Lab 04 â€” LangChain @tool Function Calling Simulation
# In real LangChain, the LLM reads your tool docstrings and
# calls the right function with JSON parameters automatically.

def run_crosstab(row_var, col_var):
    """Calculates cross-tabulation between two survey variables."""
    table = {
        "18-29": {"High Trust": 67.0, "Low Trust": 33.0},
        "30-44": {"High Trust": 50.0, "Low Trust": 50.0},
        "45-60": {"High Trust": 25.0, "Low Trust": 75.0},
        "60+":   {"High Trust": 12.0, "Low Trust": 88.0},
    }
    print("Crosstab: " + row_var + " vs " + col_var)
    print("-" * 40)
    for group, counts in table.items():
        print(group + ":")
        for label, pct in counts.items():
            print("  " + label + ": " + str(pct) + "%")

def fit_logistic(target, predictors):
    """Fits a logistic regression model."""
    print("Fitting model: " + target + " ~ " + " + ".join(predictors))
    print("  Accuracy:  88.2%")
    print("  ROC-AUC:   0.912")
    print("  Converged: Yes")

# --- EDIT: Try calling a different tool below ---
user_request = "I want to understand AI trust by age group"

# Simulate LLM tool selection logic
print("User: " + user_request)
print("")
print("LLM thinking: The user wants a breakdown by age group...")
print("LLM selects tool: run_crosstab")
print("")

run_crosstab("Age_Group", "High_AI_Trust")
`
    },
    5: {
        title: "Lab 05: LangGraph State Machines for Survey Pipelines",
        subtitle: "Modify the router threshold and trace state transitions!",
        initialCode: `# Lab 05 â€” LangGraph State Machine Router
# LangGraph adds cyclic edges so agents can RETRY if accuracy is too low

state = {
    "current_step": "fit_model",
    "accuracy": 0.84,        # Try changing this value
    "target_accuracy": 0.85, # Try changing this threshold
    "retry_count": 0,
    "max_retries": 3,
}

def fit_model_node(s):
    print("Node: fit_model")
    print("  Accuracy = " + str(s["accuracy"]))
    return s

def re_engineer_features_node(s):
    s["retry_count"] += 1
    s["accuracy"] = min(0.99, s["accuracy"] + 0.03)  # simulate improvement
    print("Node: re_engineer_features (retry #" + str(s["retry_count"]) + ")")
    print("  Accuracy improved to " + str(round(s["accuracy"], 3)))
    return s

def router_edge(s):
    if s["accuracy"] >= s["target_accuracy"]:
        return "draft_report"
    elif s["retry_count"] >= s["max_retries"]:
        return "draft_report"  # give up after max retries
    else:
        return "re_engineer_features"

print("=== LANGGRAPH STATE MACHINE EXECUTION ===")
print("Target Accuracy: " + str(state["target_accuracy"]))
print("")

state = fit_model_node(state)
while True:
    next_node = router_edge(state)
    print("Router -> " + next_node)
    if next_node == "draft_report":
        break
    state = re_engineer_features_node(state)

print("")
print("Final Node: draft_report")
print("Final Accuracy: " + str(round(state["accuracy"], 3)))
`
    },
    6: {
        title: "Lab 06: WatSPEED Capstone Autonomous Survey Assistant",
        subtitle: "Modify the user prompt and adjust report thresholds!",
        initialCode: `# Lab 06 â€” WatSPEED Capstone Agent
# Simulates an autonomous multi-agent survey analysis system

# --- EDIT THESE ---
user_prompt = "Analyze AI Trust across Age groups and generate policy advice."
significance_threshold = 0.05   # Try 0.01 for stricter p-value cutoff
tabfm_accuracy = 0.894           # Simulated TabFM accuracy

# Simulated findings from the agentic pipeline
findings = [
    {"age": "18-29", "trust_pct": 67.0, "n": 312, "p_value": 0.0004},
    {"age": "30-44", "trust_pct": 50.0, "n": 418, "p_value": 0.0210},
    {"age": "45-60", "trust_pct": 25.0, "n": 287, "p_value": 0.0001},
    {"age": "60+",   "trust_pct": 12.0, "n": 183, "p_value": 0.00003},
]

print("=" * 60)
print("WATSPEED CAPSTONE EXECUTIVE REPORT")
print("=" * 60)
print("User Prompt: " + user_prompt)
print("")
print("KEY SOCIOLOGICAL FINDINGS:")
for f in findings:
    sig = "***" if f["p_value"] < significance_threshold else "(ns)"
    print("  " + f["age"] + ": " + str(f["trust_pct"]) + "% High Trust  n=" + str(f["n"]) + "  p=" + str(f["p_value"]) + " " + sig)

print("")
print("MODEL BENCHMARKS:")
print("  SAS PROC LOGISTIC:     84.2% accuracy (AUC = 0.865)")
print("  Google TabFM Zero-Shot: " + str(tabfm_accuracy * 100) + "% accuracy (AUC = 0.928)")

print("")
print("POLICY RECOMMENDATIONS:")
print("  Target digital literacy workshops at 45+ demographic cohorts.")
print("  Generational trust gap is statistically significant (p < " + str(significance_threshold) + ").")
print("=" * 60)
`
    }
};

// â”€â”€â”€ Python Engine â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Track initialization promises to avoid duplicate loads
let _skulptLoaded = null;
let _pyodideLoading = null;

function updateStatusBadge(text, color) {
    const badge = document.getElementById('pyStatusBadge');
    if (badge) {
        badge.textContent = text;
        badge.style.color = color;
    }
}

async function ensureSkulpt() {
    if (_skulptLoaded) return _skulptLoaded;
    _skulptLoaded = new Promise((resolve) => {
        // Check if already on page
        if (window.Sk) { resolve(true); return; }
        // Dynamically inject Skulpt scripts
        const s1 = document.createElement('script');
        s1.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
        s1.onload = () => {
            const s2 = document.createElement('script');
            s2.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
            s2.onload = () => resolve(true);
            s2.onerror = () => resolve(false);
            document.head.appendChild(s2);
        };
        s1.onerror = () => resolve(false);
        document.head.appendChild(s1);
    });
    return _skulptLoaded;
}

// Optional: also try to load Pyodide in background for heavier libs
async function loadPyodideEngine() {
    if (window.pyodide) return window.pyodide;
    if (_pyodideLoading) return _pyodideLoading;
    _pyodideLoading = (async () => {
        try {
            if (typeof loadPyodide !== 'undefined') {
                window.pyodide = await loadPyodide();
                await window.pyodide.loadPackage(['pandas', 'scikit-learn', 'micropip']);
                return window.pyodide;
            }
        } catch (e) {
            console.warn('Pyodide unavailable, using Skulpt.', e);
        }
        return null;
    })();
    return _pyodideLoading;
}

// â”€â”€â”€ Run Python via Skulpt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function executeLabCode() {
    const editor  = document.getElementById('labCodeEditor');
    const outArea = document.getElementById('labOutputArea');
    if (!editor || !outArea) return;

    const code = editor.value;
    outArea.style.color = '#FFF';
    outArea.innerText = 'â³ Running Python...';

    // â”€â”€ Path 1: Pyodide (real CPython WASM) if already loaded â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (window.pyodide) {
        try {
            await window.pyodide.runPythonAsync(`
import sys, io
_buf = io.StringIO()
sys.stdout = _buf
`);
            await window.pyodide.runPythonAsync(code);
            const out = await window.pyodide.runPythonAsync('_buf.getvalue()');
            outArea.style.color = '#FFF';
            outArea.innerText = out || '(script ran with no output)';
        } catch (err) {
            outArea.style.color = '#EF4444';
            outArea.innerText = 'ðŸ”´ Python Error:\n' + String(err);
        } finally {
            try { await window.pyodide.runPythonAsync('sys.stdout = sys.__stdout__'); } catch(_){}
        }
        return;
    }

    // â”€â”€ Path 2: Skulpt (real Python interpreter, no WASM download needed) â”€â”€â”€â”€
    updateStatusBadge('â³ Loading Python...', '#FBBF24');
    const skulptOk = await ensureSkulpt();

    if (!skulptOk || !window.Sk) {
        outArea.style.color = '#EF4444';
        outArea.innerText = 'âŒ Could not load Python engine (Skulpt CDN unreachable).\nPlease check your internet connection.';
        updateStatusBadge('âŒ Engine Error', '#EF4444');
        return;
    }

    updateStatusBadge('ðŸ Skulpt Python Ready', '#4ADE80');

    let outputLines = [];

    Sk.configure({
        output: (text) => { outputLines.push(text); },
        read: (x) => {
            if (Sk.builtinFiles && Sk.builtinFiles["files"][x]) {
                return Sk.builtinFiles["files"][x];
            }
            // Stub missing C-extension modules so import doesn't crash
            if (x.endsWith('.py') || x.includes('pandas') || x.includes('sklearn')) {
                return '';
            }
            throw new Error("Module not found: " + x);
        },
        __future__: Sk.python3,
    });

    try {
        await Sk.misceval.asyncToPromise(() =>
            Sk.importMainWithBody('<lab>', false, code, true)
        );
        const output = outputLines.join('');
        outArea.style.color = '#FFF';
        outArea.innerText = output || '(script ran with no output)';
    } catch (err) {
        // Skulpt throws real SyntaxError / NameError / TypeError etc.
        outArea.style.color = '#EF4444';
        const msg = err.toString();
        const friendly = msg.replace('RangeError: Maximum call stack size exceeded', 'RecursionError: maximum recursion depth exceeded');
        outArea.innerText = '🔴 Python Error:\n' + friendly;
    }
}

// ─── Lab Metadata ──────────────────────────────────────────────────────────────
const labMeta = {
    1: {
        title: 'Lab 01: Survey Data Recoding',
        stage: 'Stage 1 — Data & SAS Bridge',
        description: 'Handle missing values (-9 → NaN), recode Likert scales, compute population-weighted means, and validate data with Pydantic schemas.',
        topics: ['pandas', 'numpy', 'pydantic', 'survey weighting'],
        notebookFile: 'lab_01_data_recoding.ipynb',
    },
    2: {
        title: 'Lab 02: Supervised ML & PROC LOGISTIC Bridge',
        stage: 'Stage 2 — ML & Google TabFM',
        description: 'Encode categorical variables, train/test split, fit LogisticRegression with survey weights, and interpret Odds Ratios — Python equivalent of SAS PROC LOGISTIC.',
        topics: ['scikit-learn', 'pandas', 'train/test split', 'LogisticRegression', 'ROC-AUC'],
        notebookFile: 'lab_02_supervised_ml.ipynb',
    },
    3: {
        title: 'Lab 03: Google TabFM Zero-Shot Classifier',
        stage: 'Stage 2 — ML & Google TabFM',
        description: 'See how a Tabular Foundation Model classifies survey respondents using raw categorical text — no dummy coding required.',
        topics: ['TabFM', 'zero-shot', 'in-context learning'],
        notebookFile: '03_the_agent_loop_react.ipynb',
    },
    4: {
        title: 'Lab 04: LangChain & Tool Calling',
        stage: 'Stage 3 — Agentic AI & LangGraph',
        description: 'Wrap Python survey analysis functions as @tool callables. Watch an LLM agent invoke the right function with JSON parameters.',
        topics: ['LangChain', '@tool', 'function calling', 'JSON schema'],
        notebookFile: '02_tools_and_function_calling.ipynb',
    },
    5: {
        title: 'Lab 05: LangGraph State Machines',
        stage: 'Stage 3 — Agentic AI & LangGraph',
        description: 'Build a cyclic LangGraph StateGraph with router edges that retry feature engineering when model accuracy is below threshold.',
        topics: ['LangGraph', 'StateGraph', 'router edges', 'self-correcting agents'],
        notebookFile: '06_langgraph_state_machines.ipynb',
    },
    6: {
        title: 'Lab 06: WatSPEED Capstone — Autonomous Survey Assistant',
        stage: 'Stage 4 — Capstone',
        description: 'End-to-end multi-agent pipeline: data cleaning → model fitting → executive report generation, all orchestrated autonomously.',
        topics: ['multi-agent', 'LangGraph', 'executive reporting', 'sociological analysis'],
        notebookFile: '09_capstone_survey_assistant.ipynb',
    },
};

const GITHUB_BLOB = 'https://github.com/p3ji/learn/blob/main/notebooks/';
const COLAB_BASE  = 'https://colab.research.google.com/github/p3ji/learn/blob/main/notebooks/';

// ─── Modal UI ──────────────────────────────────────────────────────────────────


function openInteractiveLabModal(nbIdx) {
    const lab  = labMeta[nbIdx]  || labMeta[1];
    const code = (defaultLabNotebooks[nbIdx] || defaultLabNotebooks[1]).initialCode;

    let modal = document.getElementById('labModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'labModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    // Escape HTML entities in code to prevent XSS via template literal
    const escapedCode = lab.initialCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    modal.innerHTML = `
        <div class="concept-modal-card" style="max-width:960px;width:95%;">
            <button class="concept-modal-close" onclick="closeInteractiveLabModal()">&times;</button>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
                <div class="concept-badge-tag" style="background:var(--gold-primary);color:#000;">âš¡ INTERACTIVE HANDS-ON LAB</div>
                <span id="pyStatusBadge" style="font-family:var(--font-mono);font-size:0.8rem;padding:4px 12px;border-radius:20px;background:rgba(56,189,248,0.12);color:#38BDF8;border:1px solid rgba(56,189,248,0.3);">
                    ðŸ Initializing Python Engine...
                </span>
            </div>

            <h2 class="concept-title" style="margin-bottom:4px;">${lab.title}</h2>
            <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:18px;">${lab.subtitle}</p>

            <!-- Editor -->
            <div style="background:#090D16;border:1.5px solid var(--gold-primary);border-radius:14px;padding:14px;margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--gold-primary);font-weight:700;">In [1]: Editable Python (Skulpt 1.2)</span>
                    <button class="fb-action-btn gold" style="padding:5px 12px;font-size:0.82rem;" onclick="resetLabCode(${nbIdx})">â†º Reset</button>
                </div>
                <textarea id="labCodeEditor"
                    style="font-family:var(--font-mono);font-size:0.86rem;height:280px;color:#e2e8f0;background:#000;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;width:100%;box-sizing:border-box;resize:vertical;line-height:1.55;outline:none;"
                    spellcheck="false">${escapedCode}</textarea>
            </div>

            <!-- Run button -->
            <button class="fb-action-btn gold" style="width:100%;padding:13px;font-size:1rem;font-weight:900;margin-bottom:14px;" onclick="executeLabCode()">
                â–¶  Run Python Code &nbsp;&nbsp;(or press Shift+Enter)
            </button>

            <!-- Output terminal -->
            <div style="background:#000;border:1.5px solid rgba(74,222,128,0.4);border-radius:12px;padding:14px;">
                <div style="font-family:var(--font-mono);font-size:0.78rem;color:#4ADE80;font-weight:700;margin-bottom:6px;">Out [1]: Terminal Output</div>
                <pre id="labOutputArea"
                    style="font-family:var(--font-mono);font-size:0.84rem;color:#e2e8f0;white-space:pre-wrap;word-break:break-word;margin:0;max-height:260px;overflow-y:auto;line-height:1.5;">
Press â–¶ Run Python Code to execute.</pre>
            </div>
        </div>
    `;

    modal.style.display = 'flex';

    // Shift+Enter shortcut
    setTimeout(() => {
        const editor = document.getElementById('labCodeEditor');
        if (editor) {
            editor.addEventListener('keydown', (e) => {
                if (e.shiftKey && e.key === 'Enter') { e.preventDefault(); executeLabCode(); }
            });
            // Restore textarea value from unescaped original (innerHTML decodes entities)
            editor.value = lab.initialCode;
        }

        // Pre-load Skulpt silently; run initial script once loaded
        ensureSkulpt().then((ok) => {
            if (ok) {
                updateStatusBadge('ðŸ Skulpt Python Ready', '#4ADE80');
                executeLabCode();
            } else {
                updateStatusBadge('âŒ Engine Error (no internet?)', '#EF4444');
            }
        });
    }, 50);
}

function resetLabCode(nbIdx) {
    const lab = defaultLabNotebooks[nbIdx] || defaultLabNotebooks[1];
    const editor = document.getElementById('labCodeEditor');
    if (editor) {
        editor.value = lab.initialCode;
        executeLabCode();
    }
}

function closeInteractiveLabModal() {
    const modal = document.getElementById('labModal');
    if (modal) modal.style.display = 'none';
}

