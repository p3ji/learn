// Interactive In-Browser Python Execution Lab
// Engine: Skulpt (real Python interpreter in JS) with Pyodide WASM upgrade path

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Lab Scripts Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const defaultLabNotebooks = {
    1: {
        title: "Lab 01: Python Data Essentials & Pydantic Recoding",
        subtitle: "Modify Pandas recoding logic and Pydantic validation rules. Click 'Run Code' or press Shift+Enter to execute!",
        initialCode: `# Lab 01 Ã¢â‚¬â€ Survey Data Recoding
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
        initialCode: `# Lab 02 Ã¢â‚¬â€ Logistic Regression (no sklearn needed)
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
    print(r["id"] + "  " + str(round(prob, 3)) + "  " + str(predicted) + "  " + str(r["actual"]) + "  " + ("Ã¢Å“â€œ" if ok else "Ã¢Å“â€”"))

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
        initialCode: `# Lab 03 Ã¢â‚¬â€ Google TabFM Zero-Shot Simulation
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
        initialCode: `# Lab 04 Ã¢â‚¬â€ LangChain @tool Function Calling Simulation
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
        initialCode: `# Lab 05 Ã¢â‚¬â€ LangGraph State Machine Router
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
        initialCode: `# Lab 06 Ã¢â‚¬â€ WatSPEED Capstone Agent
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Python Engine Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

// Pyodide is the ONLY engine. Skulpt was removed: it has no pandas/sklearn, which
// made Stage 1 and Stage 2 labs ("run live ML models in your browser") impossible.
// The tradeoff is a ~10MB first load, surfaced honestly via the status badge.
let _pyodideLoading = null;

function updateStatusBadge(text, color) {
    const badge = document.getElementById('pyStatusBadge');
    if (badge) {
        badge.textContent = text;
        badge.style.color = color;
    }
}

// Wait for the deferred CDN script to define loadPyodide (bounded, ~10s).
function awaitLoadPyodideGlobal(timeoutMs) {
    return new Promise((resolve) => {
        if (typeof loadPyodide !== 'undefined') { resolve(true); return; }
        const started = Date.now();
        const tick = setInterval(() => {
            if (typeof loadPyodide !== 'undefined') { clearInterval(tick); resolve(true); }
            else if (Date.now() - started > timeoutMs) { clearInterval(tick); resolve(false); }
        }, 100);
    });
}

// Loads the WASM runtime + scientific stack. Safe to call repeatedly.
async function ensurePyodide() {
    if (window.pyodide) return window.pyodide;
    if (_pyodideLoading) return _pyodideLoading;

    _pyodideLoading = (async () => {
        updateStatusBadge('⏳ Downloading Python runtime (~10MB, first time only)…', '#FBBF24');

        const available = await awaitLoadPyodideGlobal(10000);
        if (!available) {
            updateStatusBadge('❌ Python engine unavailable', '#EF4444');
            _pyodideLoading = null;   // allow a retry on the next Run click
            return null;
        }

        try {
            window.pyodide = await loadPyodide();
            updateStatusBadge('⏳ Loading pandas, scikit-learn, numpy…', '#FBBF24');
            await window.pyodide.loadPackage(['pandas', 'scikit-learn', 'numpy']);
            updateStatusBadge('🐍 Python 3.11 + pandas + sklearn ready', '#4ADE80');
            return window.pyodide;
        } catch (e) {
            console.error('Pyodide failed to initialise:', e);
            updateStatusBadge('❌ Python engine failed to load', '#EF4444');
            _pyodideLoading = null;
            return null;
        }
    })();

    return _pyodideLoading;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Run Python via Skulpt Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

async function executeLabCode() {
    const editor  = document.getElementById('labCodeEditor');
    const outArea = document.getElementById('labOutputArea');
    if (!editor || !outArea) return;

    const code = editor.value;
    outArea.style.color = '#FFF';
    outArea.innerText = 'Ã¢ÂÂ³ Running Python...';

    // Ã¢â€â‚¬Ã¢â€â‚¬ Path 1: Pyodide (real CPython WASM) if already loaded Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
            outArea.innerText = 'Ã°Å¸â€ Â´ Python Error:\n' + String(err);
        } finally {
            try { await window.pyodide.runPythonAsync('sys.stdout = sys.__stdout__'); } catch(_){}
        }
        return;
    }

    // Ã¢â€ â‚¬Ã¢â€ â‚¬ Path 2: Skulpt (real Python interpreter, no WASM download needed) Ã¢â€ â‚¬Ã¢â€ â‚¬Ã¢â€ â‚¬Ã¢â€ â‚¬
    updateStatusBadge('Ã¢Â Â³ Loading Python...', '#FBBF24');
    const skulptOk = await ensureSkulpt();

    if (!skulptOk || !window.Sk) {
        outArea.style.color = '#EF4444';
        outArea.innerText = 'Ã¢Â Å’ Could not load Python engine (Skulpt CDN unreachable).\nPlease check your internet connection.';
        updateStatusBadge('Ã¢Â Å’ Engine Error', '#EF4444');
        return;
    }

    updateStatusBadge('Ã°Å¸Â Â  Skulpt Python Ready', '#4ADE80');

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
        outArea.innerText = 'ðŸ”´ Python Error:\n' + friendly;
    }
}

// â”€â”€â”€ Lab Metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const labMeta = {
    1: {
        title: 'Notebook 01: Python Data Essentials for SAS & Stata Users',
        stage: 'Prerequisite',
        description: 'Handle missing values (-9 to NaN), recode Likert scales, compute population-weighted means, and validate data with Pydantic schemas.',
        topics: ['pandas', 'numpy', 'pydantic', 'survey weighting'],
        notebookFile: '01_python_for_sas_stata_users.ipynb',
    },
    2: {
        title: 'Lab 02: Supervised ML & PROC LOGISTIC Bridge',
        stage: 'Stage 2 â€” ML & Google TabFM',
        description: 'Encode categorical variables, train/test split, fit LogisticRegression with survey weights, and interpret Odds Ratios â€” Python equivalent of SAS PROC LOGISTIC.',
        topics: ['scikit-learn', 'pandas', 'train/test split', 'LogisticRegression', 'ROC-AUC'],
        notebookFile: 'lab_02_supervised_ml.ipynb',
    },
    3: {
        title: 'Lab 03: Google TabFM Zero-Shot Classifier',
        stage: 'Stage 2 â€” ML & Google TabFM',
        description: 'See how a Tabular Foundation Model classifies survey respondents using raw categorical text â€” no dummy coding required.',
        topics: ['TabFM', 'zero-shot', 'in-context learning'],
        notebookFile: '03_the_agent_loop_react.ipynb',
    },
    4: {
        title: 'Lab 04: LangChain & Tool Calling',
        stage: 'Stage 3 â€” Agentic AI & LangGraph',
        description: 'Wrap Python survey analysis functions as @tool callables. Watch an LLM agent invoke the right function with JSON parameters.',
        topics: ['LangChain', '@tool', 'function calling', 'JSON schema'],
        notebookFile: '02_tools_and_function_calling.ipynb',
    },
    5: {
        title: 'Lab 05: LangGraph State Machines',
        stage: 'Stage 3 â€” Agentic AI & LangGraph',
        description: 'Build a cyclic LangGraph StateGraph with router edges that retry feature engineering when model accuracy is below threshold.',
        topics: ['LangGraph', 'StateGraph', 'router edges', 'self-correcting agents'],
        notebookFile: '06_langgraph_state_machines.ipynb',
    },
    6: {
        title: 'Lab 06: WatSPEED Capstone â€” Autonomous Survey Assistant',
        stage: 'Stage 4 â€” Capstone',
        description: 'End-to-end multi-agent pipeline: data cleaning â†’ model fitting â†’ executive report generation, all orchestrated autonomously.',
        topics: ['multi-agent', 'LangGraph', 'executive reporting', 'sociological analysis'],
        notebookFile: '09_capstone_survey_assistant.ipynb',
    },
};

const GITHUB_BLOB = 'https://github.com/p3ji/learn/blob/main/notebooks/';
const COLAB_BASE  = 'https://colab.research.google.com/github/p3ji/learn/blob/main/notebooks/';

// --- Modal UI ---

function openInteractiveLabModal(nbIdx) {
    try {
        var meta   = labMeta[nbIdx]  || labMeta[1];
        var nbData = defaultLabNotebooks[nbIdx] || defaultLabNotebooks[1];
        var code   = nbData.initialCode;

        var modal = document.getElementById('labModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'labModal';
            modal.className = 'concept-modal-overlay';
            document.body.appendChild(modal);
        }

        var colabUrl  = COLAB_BASE  + meta.notebookFile;
        var githubUrl = GITHUB_BLOB + meta.notebookFile;
        var topicTags = meta.topics.map(function(t) {
            return '<span style="background:rgba(56,189,248,0.12);color:#38BDF8;padding:2px 8px;border-radius:8px;font-size:0.78rem;font-family:monospace;">' + t + '</span>';
        }).join(' ');

        modal.innerHTML = ''
            + '<div class="concept-modal-card" style="max-width:860px;width:95%;">'
            +   '<button class="concept-modal-close" onclick="closeInteractiveLabModal()">&times;</button>'
            +   '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">'
            +     '<div class="concept-badge-tag" style="background:var(--gold-primary);color:#000;">&#x1F4D3; HANDS-ON LAB</div>'
            +     '<span style="font-size:0.82rem;color:var(--text-muted);">' + meta.stage + '</span>'
            +   '</div>'
            +   '<h2 class="concept-title" style="margin-bottom:6px;">' + meta.title + '</h2>'
            +   '<p style="color:var(--text-muted);font-size:0.92rem;line-height:1.55;margin-bottom:12px;">' + meta.description + '</p>'
            +   '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px;">' + topicTags + '</div>'
            // Launch options
            +   '<div style="background:rgba(255,199,44,0.05);border:1.5px solid var(--gold-primary);border-radius:18px;padding:24px;margin-bottom:20px;">'
            +     '<h3 style="color:var(--gold-primary);font-size:1rem;font-weight:800;margin-bottom:18px;text-transform:uppercase;letter-spacing:0.05em;">Open This Lab In:</h3>'
            +     '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">'
            // Colab
            +       '<a href="' + colabUrl + '" target="_blank" rel="noopener" style="display:flex;flex-direction:column;gap:10px;background:rgba(15,23,42,0.95);border:2px solid #F9AB00;border-radius:14px;padding:20px;text-decoration:none;">'
            +         '<div style="display:flex;align-items:center;gap:10px;">'
            +           '<div style="font-size:1.8rem;">&#x1F525;</div>'
            +           '<div>'
            +             '<div style="font-weight:900;color:#F9AB00;font-size:1rem;">Google Colab</div>'
            +             '<div style="font-size:0.78rem;color:var(--text-muted);">RECOMMENDED &mdash; Free, no install</div>'
            +           '</div>'
            +         '</div>'
            +         '<ul style="font-size:0.83rem;color:var(--text-main);line-height:1.7;padding-left:16px;margin:0;">'
            +           '<li>Real Python 3 + pandas, sklearn, pydantic</li>'
            +           '<li>All data pre-loaded in cells</li>'
            +           '<li>Save a copy to your Google Drive</li>'
            +         '</ul>'
            +         '<div style="text-align:center;background:#F9AB00;color:#000;font-weight:900;padding:10px 16px;border-radius:10px;font-size:0.95rem;margin-top:auto;">Open in Google Colab &#x2192;</div>'
            +       '</a>'
            // VS Code / GitHub
            +       '<a href="' + githubUrl + '" target="_blank" rel="noopener" style="display:flex;flex-direction:column;gap:10px;background:rgba(15,23,42,0.95);border:1.5px solid rgba(255,255,255,0.15);border-radius:14px;padding:20px;text-decoration:none;">'
            +         '<div style="display:flex;align-items:center;gap:10px;">'
            +           '<div style="font-size:1.8rem;">&#x1F4BB;</div>'
            +           '<div>'
            +             '<div style="font-weight:800;color:#FFF;font-size:1rem;">VS Code / Jupyter</div>'
            +             '<div style="font-size:0.78rem;color:var(--text-muted);">Full local IDE</div>'
            +           '</div>'
            +         '</div>'
            +         '<ul style="font-size:0.83rem;color:var(--text-main);line-height:1.7;padding-left:16px;margin:0;">'
            +           '<li>Download .ipynb notebook</li>'
            +           '<li>Open in VS Code or Jupyter Lab</li>'
            +           '<li>Debugger, autocomplete, extensions</li>'
            +         '</ul>'
            +         '<div style="text-align:center;background:rgba(255,255,255,0.08);color:#FFF;font-weight:700;padding:10px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);font-size:0.92rem;margin-top:auto;">View / Download Notebook &#x2192;</div>'
            +       '</a>'
            +     '</div>'
            +   '</div>'
            // In-browser preview collapsible
            +   '<details style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px;">'
            +     '<summary style="cursor:pointer;font-weight:700;color:var(--text-muted);font-size:0.9rem;">&#x25B8; Quick In-Browser Preview (basic Python only &mdash; no pandas/sklearn)</summary>'
            +     '<div style="margin-top:14px;">'
            +       '<p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:10px;">&#x26A0;&#xFE0F; Uses Skulpt. No pandas or sklearn. For the full experience use Google Colab.</p>'
            +       '<div style="background:#000;border:1px solid rgba(56,189,248,0.2);border-radius:10px;padding:10px;margin-bottom:10px;">'
            +         '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'
            +           '<span style="font-family:monospace;font-size:0.75rem;color:#38BDF8;">In [1]:</span>'
            +           '<span id="pyStatusBadge" style="font-size:0.75rem;color:var(--text-muted);">Loading...</span>'
            +         '</div>'
            +         '<textarea id="labCodeEditor" style="font-family:monospace;font-size:0.82rem;height:200px;color:#e2e8f0;background:transparent;border:none;width:100%;box-sizing:border-box;resize:vertical;line-height:1.5;outline:none;" spellcheck="false"></textarea>'
            +       '</div>'
            +       '<div style="display:flex;gap:8px;margin-bottom:10px;">'
            +         '<button class="fb-action-btn gold" style="flex:1;padding:9px;" onclick="executeLabCode()">&#x25B6; Run (Shift+Enter)</button>'
            +         '<button class="fb-action-btn outline" style="padding:9px 14px;" onclick="resetLabCode(' + nbIdx + ')">&#x21BA; Reset</button>'
            +       '</div>'
            +       '<div style="background:#000;border:1px solid rgba(74,222,128,0.25);border-radius:10px;padding:10px;">'
            +         '<div style="font-family:monospace;font-size:0.75rem;color:#4ADE80;margin-bottom:4px;">Out [1]:</div>'
            +         '<pre id="labOutputArea" style="font-family:monospace;font-size:0.82rem;color:#e2e8f0;white-space:pre-wrap;margin:0;max-height:180px;overflow-y:auto;">Press &#x25B6; Run to execute.</pre>'
            +       '</div>'
            +     '</div>'
            +   '</details>'
            + '</div>';

        modal.style.display = 'flex';

        setTimeout(function() {
            var editor = document.getElementById('labCodeEditor');
            if (editor) {
                editor.value = code;
                editor.addEventListener('keydown', function(e) {
                    if (e.shiftKey && e.key === 'Enter') { e.preventDefault(); executeLabCode(); }
                });
            }
            ensureSkulpt().then(function(ok) {
                updateStatusBadge(ok ? 'Skulpt Ready' : 'Unavailable', ok ? '#4ADE80' : '#EF4444');
            });
        }, 50);

    } catch(err) {
        console.error('[openInteractiveLabModal] Error:', err);
        alert('Lab could not open: ' + err.message);
    }
}

function resetLabCode(nbIdx) {
    var nbData = defaultLabNotebooks[nbIdx] || defaultLabNotebooks[1];
    var editor = document.getElementById('labCodeEditor');
    if (editor) {
        editor.value = nbData.initialCode;
        executeLabCode();
    }
}

function closeInteractiveLabModal() {
    var modal = document.getElementById('labModal');
    if (modal) modal.style.display = 'none';
}

console.log('[interactive_notebook.js] Loaded OK');

document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'labModal') closeInteractiveLabModal();
});
