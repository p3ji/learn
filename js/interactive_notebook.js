// Interactive In-Browser Python Execution Lab
// Engine: Pyodide (real CPython 3.11 compiled to WebAssembly) with pandas + sklearn

// ─── Lab Scripts ────────────────────────────────────────────────────────────
const defaultLabNotebooks = {
    1: {
        title: 'Lab 01: Python Data Essentials',
        subtitle: 'Modify Pandas recoding logic and Pydantic validation rules.',
        initialCode: `# Lab 01 - Survey Data Recoding (REAL pandas on the real 1,200-row dataset)\nimport pandas as pd, numpy as np\nfrom pyodide.http import open_url\n\ndf = pd.read_csv(open_url("../../data/ai_trust_insights.csv"))\nprint("Loaded", len(df), "respondents")\n\n# SAS: if Perceived_AI_Risk = -9 then Perceived_AI_Risk = .;\n# The whole point: see what the missing code does to your estimate.\nraw_mean = df["Perceived_AI_Risk"].mean()\ndf["risk_clean"] = df["Perceived_AI_Risk"].replace(-9, np.nan)\nclean_mean = df["risk_clean"].mean()\n\nprint(f"\\nMean WITH -9 still in:  {raw_mean:.3f}   <-- wrong, -9 drags it down")\nprint(f"Mean with -9 -> NaN:    {clean_mean:.3f}   <-- correct")\nprint(f"Missing values found:   {df['risk_clean'].isna().sum()} of {len(df)}")\n\n# SAS: weight Survey_Weight;  -- population-weighted mean, NaN excluded\nvalid = df.dropna(subset=["risk_clean"])\nw_mean = np.average(valid["risk_clean"], weights=valid["Survey_Weight"])\nprint(f"\\nUnweighted mean: {clean_mean:.3f}")\nprint(f"Weighted mean:   {w_mean:.3f}")\n\n# TRY IT: change the threshold and watch the flag count move.\nTHRESHOLD = 4\ndf["high_risk"] = (df["risk_clean"] >= THRESHOLD).astype("Int64")\nprint(f"\\nHigh risk (>= {THRESHOLD}): {df['high_risk'].sum()} respondents")\n`
    },
    2: {
        title: 'Lab 02: Tools & Function Calling',
        subtitle: 'Wrap a SAS-like PROC MEANS as an AI Tool.',
        initialCode: `# Lab 02 - Tools & Function Calling (the tool returns a REAL computed value)\nimport pandas as pd, numpy as np\nfrom pyodide.http import open_url\nfrom scipy.stats import chi2_contingency\n\ndf = pd.read_csv(open_url("../../data/ai_trust_insights.csv"))\n\ndef run_crosstab(row_var, col_var="High_AI_Trust"):\n    """Cross-tabulate two survey variables and test independence."""\n    table = pd.crosstab(df[row_var], df[col_var])\n    chi2, p, dof, _ = chi2_contingency(table)\n    pct = (table[1] / table.sum(axis=1) * 100).round(1)\n    return {"pct_high_trust": pct.to_dict(), "chi2": round(chi2, 2), "p": p, "df": dof}\n\n# An LLM would pick the tool and its arguments. The VALUE it gets back is real.\nprint("LLM selects tool: run_crosstab(row_var='Age_Group')")\nr = run_crosstab("Age_Group")\nprint("  ", r["pct_high_trust"])\nprint(f"   chi2={r['chi2']} df={r['df']} p={r['p']:.4f}")\nprint("   -> age is NOISE by construction; a non-significant p here is CORRECT\\n")\n\nprint("LLM selects tool: run_crosstab(row_var='Education_Level')")\nr = run_crosstab("Education_Level")\nprint("  ", r["pct_high_trust"])\nprint(f"   chi2={r['chi2']} df={r['df']} p={r['p']:.6f}")\nprint("   -> education DOES drive trust, so this one should be significant")\n`
    },
    3: {
        title: 'Lab 03: The Agent Loop (ReAct)',
        subtitle: 'A scripted ReAct trace - no model is called. Shows how an agent recovers from a bad column name.',
        initialCode: `# Lab 03 — ReAct Agent Loop\nprint("LLM ACTION 1: Calls 'calculate_group_means(category_col=Educ)'")\nprint("TOOL RESPONSE: Error - Column 'Educ' not found in dataset.")\nprint("---")\nprint("LLM THOUGHT 2: I should check the dataset schema to find the real name.")\nprint("LLM ACTION 2: Calls 'get_dataset_schema()'")\nprint("TOOL RESPONSE: Columns are ['Education_Level', 'Perceived_AI_Risk']")\nprint("---")\nprint("LLM ACTION 3: Calls 'calculate_group_means(category_col=Education_Level)'")\nprint("TOOL RESPONSE: [Success] Means calculated.")\n`
    },
    4: {
        title: 'Lab 04: Context Engineering',
        subtitle: 'A scripted illustration of prompt assembly - no model is called.',
        initialCode: `# Lab 04 — Context Engineering\nprompt = "Analyze the survey demographics."\ncontext = "The dataset contains 1200 respondents. Age groups skew heavily towards 18-29."\nprint(f"Final Prompt to LLM:\\n{context}\\n\\n{prompt}")\n`
    },
    5: {
        title: 'Lab 05: Agent Memory & RAG',
        subtitle: 'A scripted RAG walkthrough - the similarity scores are illustrative, not computed.',
        initialCode: `# Lab 05 — RAG\nquery = "What do respondents say about job loss?"\nprint(f"Searching vector database for: '{query}'")\nprint("Found 2 verbatim comments:")\nprint("1. 'I worry AI will replace my admin job.' (Cosine similarity: 0.92)")\nprint("2. 'Automation is risky for manual labor.' (Cosine similarity: 0.88)")\n`
    },
    6: {
        title: 'Lab 06: LangGraph State Machines',
        subtitle: 'Trace cyclic state transitions.',
        initialCode: `# Lab 06 - LangGraph Router (the retry loop refits a REAL model each pass)\nimport pandas as pd, numpy as np\nfrom pyodide.http import open_url\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\ndf = pd.read_csv(open_url("../../data/ai_trust_insights.csv"))\ndf["risk"] = df["Perceived_AI_Risk"].replace(-9, np.nan).fillna(3)\ndf["benefit"] = df["Perceived_AI_Benefit"].replace(-9, np.nan).fillna(3)\nedu = {"High School": 0, "Bachelor's": 1, "Master's": 2, "PhD": 3}\ntech = {"Novice": 0, "Intermediate": 1, "Advanced": 2}\ndf["edu"] = df["Education_Level"].map(edu)\ndf["tech"] = df["Tech_Familiarity"].map(tech)\n\n# Each retry adds a feature -- the router keeps looping until accuracy clears the bar.\nFEATURE_LADDER = [["risk"], ["risk", "benefit"], ["risk", "benefit", "edu"],\n                  ["risk", "benefit", "edu", "tech"]]\nTARGET_ACC = 0.72\n\ndef fit_model_node(state):\n    feats = FEATURE_LADDER[min(state["retry"], len(FEATURE_LADDER) - 1)]\n    X_tr, X_te, y_tr, y_te = train_test_split(\n        df[feats], df["High_AI_Trust"], test_size=0.2, random_state=42)\n    clf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)\n    state["accuracy"] = accuracy_score(y_te, clf.predict(X_te))\n    state["features"] = feats\n    print(f"  fit_model -> {feats} = {state['accuracy']:.3f}")\n    return state\n\ndef router(state):\n    return "report" if state["accuracy"] >= TARGET_ACC else "re_engineer"\n\nstate = {"retry": 0, "accuracy": 0.0}\nprint(f"Target accuracy: {TARGET_ACC}\\n")\nwhile True:\n    state = fit_model_node(state)\n    if router(state) == "report" or state["retry"] >= len(FEATURE_LADDER) - 1:\n        break\n    state["retry"] += 1\n    print(f"  router -> re_engineer (retry #{state['retry']})")\n\nprint(f"\\nrouter -> draft_report | final accuracy {state['accuracy']:.3f} "\n      f"using {state['features']}")\n`
    },
    7: {
        title: 'Lab 07: Model Context Protocol (MCP)',
        subtitle: 'Build a FastMCP server and generate a JSON Schema \'Menu\'.',
        initialCode: `# Lab 07 - MCP: BUILD the JSON schema by introspection (do not print a fake one)\nimport inspect, json\n\ndef codebook_lookup(variable: str, include_values: bool = False) -> str:\n    """Look up a variable definition in the survey codebook.\n\n    Args:\n        variable: The name of the variable to look up.\n        include_values: Whether to include the allowed value list.\n    """\n    return f"Definition for {variable}"\n\nJSON_TYPES = {str: "string", int: "integer", float: "number", bool: "boolean"}\n\ndef build_schema(fn):\n    """Turn a Python function into the tool schema an LLM API expects."""\n    sig = inspect.signature(fn)\n    doc = inspect.getdoc(fn) or ""\n    summary = doc.split("\\n")[0]\n\n    props, required = {}, []\n    for name, param in sig.parameters.items():\n        props[name] = {"type": JSON_TYPES.get(param.annotation, "string")}\n        if param.default is inspect.Parameter.empty:\n            required.append(name)\n\n    # A bare property map is NOT valid - it must be wrapped in an object schema.\n    return {\n        "name": fn.__name__,\n        "description": summary,\n        "input_schema": {\n            "type": "object",\n            "properties": props,\n            "required": required,\n        },\n    }\n\nprint("=== SCHEMA GENERATED FROM THE FUNCTION ITSELF ===")\nprint(json.dumps(build_schema(codebook_lookup), indent=2))\nprint()\nprint("Change the signature above and re-run - the schema follows automatically.")\n`
    },
    8: {
        title: 'Lab 08: Multi-Agent AutoGen',
        subtitle: 'A scripted multi-agent message exchange - no models are called.',
        initialCode: `# Lab 08 — Multi-Agent Systems\nprint("=== AUTO-GEN MESSAGE EXCHANGE ===")\nprint("Planner (Senior Analyst): @Analyst, please run the cross-tabulation on Age vs AI Trust.")\nprint("---")\nprint("Analyst (Junior): Running tool 'crosstab'...")\nprint("Analyst (Junior): @Planner, the results are ready. 18-29 is 67% High Trust.")\nprint("---")\nprint("Planner (Senior Analyst): @Writer, please draft the executive summary based on the Analyst's results.")\nprint("---")\nprint("Writer: Drafting report...")\nprint("Final Output: 'The survey reveals a stark generational divide...'")\n`
    },
    9: {
        title: 'Lab 09: Capstone Survey Assistant',
        subtitle: 'End-to-end multi-agent pipeline.',
        initialCode: `# Lab 09 - Capstone: report generated FROM COMPUTED NUMBERS, not typed ones\nimport pandas as pd, numpy as np\nfrom pyodide.http import open_url\nfrom scipy.stats import chi2_contingency\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import roc_auc_score\n\ndf = pd.read_csv(open_url("../../data/ai_trust_insights.csv"))\n\n# 1. Clean\nfor c in ["Perceived_AI_Risk", "Perceived_AI_Benefit"]:\n    df[c] = df[c].replace(-9, np.nan)\nn_missing = df[["Perceived_AI_Risk", "Perceived_AI_Benefit"]].isna().sum().sum()\ndf = df.fillna({"Perceived_AI_Risk": 3, "Perceived_AI_Benefit": 3})\n\n# 2. Test each predictor honestly\nfindings = []\nfor var in ["Age_Group", "Gender", "Education_Level", "Tech_Familiarity"]:\n    t = pd.crosstab(df[var], df["High_AI_Trust"])\n    chi2, p, dof, _ = chi2_contingency(t)\n    findings.append({"var": var, "chi2": chi2, "p": p})\n\n# 3. Model\nedu = {"High School": 0, "Bachelor's": 1, "Master's": 2, "PhD": 3}\ntech = {"Novice": 0, "Intermediate": 1, "Advanced": 2}\nX = pd.DataFrame({"risk": df["Perceived_AI_Risk"], "benefit": df["Perceived_AI_Benefit"],\n                  "edu": df["Education_Level"].map(edu),\n                  "tech": df["Tech_Familiarity"].map(tech)})\nX_tr, X_te, y_tr, y_te = train_test_split(X, df["High_AI_Trust"],\n                                          test_size=0.2, random_state=42)\nclf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)\nauc = roc_auc_score(y_te, clf.predict_proba(X_te)[:, 1])\n\n# 4. Report\nprint("=== WATSPEED CAPSTONE EXECUTIVE REPORT ===")\nprint(f"Respondents: {len(df)} | missing values imputed: {n_missing}\\n")\nprint("PREDICTORS TESTED:")\nfor f in sorted(findings, key=lambda d: d["p"]):\n    verdict = "SIGNIFICANT" if f["p"] < 0.05 else "not significant"\n    print(f"  {f['var']:<20} chi2={f['chi2']:7.2f}  p={f['p']:.4f}  {verdict}")\nprint(f"\\nMODEL: logistic regression, held-out ROC-AUC = {auc:.3f}")\nprint("\\nNOTE: age and gender are noise by construction in this synthetic data.")\nprint("Finding them non-significant is the correct result, not a failed analysis.")\n`
    }
};

// ─── Python Engine ──────────────────────────────────────────────────────────

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
            updateStatusBadge('⏳ Loading pandas, numpy, scipy, scikit-learn…', '#FBBF24');
            // scipy is required by the labs that run chi2_contingency.
            await window.pyodide.loadPackage(['pandas', 'numpy', 'scipy', 'scikit-learn']);
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

// ─── Run Python via Pyodide ────────────────────────────────────────

async function executeLabCode() {
    const editor  = document.getElementById('labCodeEditor');
    const outArea = document.getElementById('labOutputArea');
    if (!editor || !outArea) return;

    const code = editor.value;
    outArea.style.color = '#FFF';
    outArea.innerText = '⏳ Starting Python…';

    const py = await ensurePyodide();
    if (!py) {
        outArea.style.color = '#EF4444';
        outArea.innerText =
            '❌ Could not load the Python engine.\n\n' +
            'This lab downloads the Pyodide runtime from a CDN on first use.\n' +
            'Check your connection and click Run Code again, or open the\n' +
            'notebook in Google Colab using the button above.';
        return;
    }

    outArea.innerText = '⏳ Running Python…';

    try {
        // Capture stdout AND stderr so tracebacks and warnings both surface.
        await py.runPythonAsync(
            'import sys, io\n' +
            '_buf = io.StringIO()\n' +
            'sys.stdout = _buf\n' +
            'sys.stderr = _buf\n'
        );
        await py.runPythonAsync(code);
        const out = await py.runPythonAsync('_buf.getvalue()');
        outArea.style.color = '#FFF';
        outArea.innerText = out || '(script ran with no output)';
    } catch (err) {
        // Show the real CPython traceback unmodified, so what students see here
        // matches what they would see in Google Colab.
        let partial = '';
        try { partial = await py.runPythonAsync('_buf.getvalue()'); } catch (_) {}
        outArea.style.color = '#EF4444';
        outArea.innerText = (partial ? partial + '\n' : '') + '🔴 Python Error:\n' + String(err);
    } finally {
        try {
            await py.runPythonAsync('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__\n');
        } catch (_) {}
    }
}

// ─── Lab Metadata ──────────────────────────────────────────────────────────────────────────
const labMeta = {
    1: { title: 'Notebook 01: Python Data Essentials', notebookFile: '01_python_for_sas_stata_users.ipynb' },
    2: { title: 'Notebook 02: Tools & Function Calling', notebookFile: '02_tools_and_function_calling.ipynb' },
    3: { title: 'Notebook 03: The Agent Loop (ReAct)', notebookFile: '03_the_agent_loop_react.ipynb' },
    4: { title: 'Notebook 04: Context Engineering', notebookFile: '04_context_engineering.ipynb' },
    5: { title: 'Notebook 05: Agent Memory & RAG', notebookFile: '05_agent_memory_and_rag.ipynb' },
    6: { title: 'Notebook 06: LangGraph State Machines', notebookFile: '06_langgraph_state_machines.ipynb' },
    7: { title: 'Notebook 07: Model Context Protocol (MCP)', notebookFile: '07_model_context_protocol.ipynb' },
    8: { title: 'Notebook 08: Multi-Agent AutoGen', notebookFile: '08_multi_agent_autogen.ipynb' },
    9: { title: 'Notebook 09: Capstone', notebookFile: '09_capstone_survey_assistant.ipynb' }
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

        // labMeta entries carry only title + notebookFile; stage/description/topics
        // are optional. Default them so a sparse entry cannot throw.
        var metaStage = meta.stage || (nbData && nbData.subtitle) || '';
        var metaDesc  = meta.description || (nbData && nbData.subtitle) || '';
        var topicTags = (meta.topics || []).map(function(t) {
            return '<span style="background:rgba(56,189,248,0.12);color:#38BDF8;padding:2px 8px;border-radius:8px;font-size:0.78rem;font-family:monospace;">' + t + '</span>';
        }).join(' ');

        modal.innerHTML = ''
            + '<div class="concept-modal-card" style="max-width:860px;width:95%;">'
            +   '<button class="concept-modal-close" onclick="closeInteractiveLabModal()">&times;</button>'
            +   '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">'
            +     '<div class="concept-badge-tag" style="background:var(--gold-primary);color:#000;">&#x1F4D3; HANDS-ON LAB</div>'
            +     '<span style="font-size:0.82rem;color:var(--text-muted);">' + metaStage + '</span>'
            +   '</div>'
            +   '<h2 class="concept-title" style="margin-bottom:6px;">' + meta.title + '</h2>'
            +   '<p style="color:var(--text-muted);font-size:0.92rem;line-height:1.55;margin-bottom:12px;">' + metaDesc + '</p>'
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
            +     '<summary style="cursor:pointer;font-weight:700;color:var(--text-muted);font-size:0.9rem;">&#x25B8; Run In-Browser (real Python 3.11 + pandas + scikit-learn)</summary>'
            +     '<div style="margin-top:14px;">'
            +       '<p style="font-size:0.83rem;color:var(--text-muted);margin-bottom:10px;">&#x1F40D; Runs real CPython via Pyodide (WebAssembly), with pandas, numpy and scikit-learn. The first run downloads about 10MB &mdash; after that it is cached by your browser.</p>'
            +       '<div style="background:#000;border:1px solid rgba(56,189,248,0.2);border-radius:10px;padding:10px;margin-bottom:10px;">'
            +         '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'
            +           '<span style="font-family:monospace;font-size:0.75rem;color:#38BDF8;">In [1]:</span>'
            +           '<span id="pyStatusBadge" role="status" aria-live="polite" style="font-size:0.75rem;color:var(--text-muted);">Python loads on first Run</span>'
            +         '</div>'
            +         '<textarea id="labCodeEditor" aria-label="Python code editor" style="font-family:monospace;font-size:0.82rem;height:200px;color:#e2e8f0;background:transparent;border:none;width:100%;box-sizing:border-box;resize:vertical;line-height:1.5;outline:none;" spellcheck="false"></textarea>'
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
            // Reflect current engine state without forcing a 10MB download until
            // the student actually clicks Run.
            if (window.pyodide) {
                updateStatusBadge('🐍 Python 3.11 ready', '#4ADE80');
            } else {
                updateStatusBadge('Python loads on first Run', 'var(--text-muted)');
            }
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
