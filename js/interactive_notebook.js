// Interactive In-Browser Python Execution Lab
// Engine: Skulpt (real Python interpreter in JS) with Pyodide WASM upgrade path

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Lab Scripts Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const defaultLabNotebooks = {
    1: {
        title: 'Lab 01: Python Data Essentials',
        subtitle: 'Modify Pandas recoding logic and Pydantic validation rules.',
        initialCode: `# Lab 01 — Survey Data Recoding\ndata = [\n    {"id": "RESP_01", "age_group": "30-44", "ai_risk": 4, "weight": 1.25},\n    {"id": "RESP_02", "age_group": "18-29", "ai_risk": -9, "weight": 0.95},\n]\nmissing_code = -9\nprint("Recoding missing values...")\nfor row in data:\n    if row["ai_risk"] == missing_code: row["ai_risk"] = None\n    print(row)\n`
    },
    2: {
        title: 'Lab 02: Tools & Function Calling',
        subtitle: 'Wrap a SAS-like PROC MEANS as an AI Tool.',
        initialCode: `# Lab 02 — Tools & Function Calling\ndef run_crosstab(row_var, col_var):\n    '''Calculates cross-tabulation between two survey variables.'''\n    table = {"18-29": {"High Trust": 67.0}, "30-44": {"High Trust": 50.0}}\n    print(f"Crosstab: {row_var} vs {col_var}")\n    for group, counts in table.items():\n        print(f"{group}: {counts['High Trust']}% High Trust")\n\nprint("LLM selects tool: run_crosstab")\nrun_crosstab("Age_Group", "High_AI_Trust")\n`
    },
    3: {
        title: 'Lab 03: The Agent Loop (ReAct)',
        subtitle: 'Watch the agent autonomously recover from a missing variable error.',
        initialCode: `# Lab 03 — ReAct Agent Loop\nprint("LLM ACTION 1: Calls 'calculate_group_means(category_col=Educ)'")\nprint("TOOL RESPONSE: Error - Column 'Educ' not found in dataset.")\nprint("---")\nprint("LLM THOUGHT 2: I should check the dataset schema to find the real name.")\nprint("LLM ACTION 2: Calls 'get_dataset_schema()'")\nprint("TOOL RESPONSE: Columns are ['Education_Level', 'Perceived_AI_Risk']")\nprint("---")\nprint("LLM ACTION 3: Calls 'calculate_group_means(category_col=Education_Level)'")\nprint("TOOL RESPONSE: [Success] Means calculated.")\n`
    },
    4: {
        title: 'Lab 04: Context Engineering',
        subtitle: 'Test in-context learning.',
        initialCode: `# Lab 04 — Context Engineering\nprompt = "Analyze the survey demographics."\ncontext = "The dataset contains 2041 respondents. Age groups skew heavily towards 18-29."\nprint(f"Final Prompt to LLM:\\n{context}\\n\\n{prompt}")\n`
    },
    5: {
        title: 'Lab 05: Agent Memory & RAG',
        subtitle: 'Simulate a vector database lookup.',
        initialCode: `# Lab 05 — RAG\nquery = "What do respondents say about job loss?"\nprint(f"Searching vector database for: '{query}'")\nprint("Found 2 verbatim comments:")\nprint("1. 'I worry AI will replace my admin job.' (Cosine similarity: 0.92)")\nprint("2. 'Automation is risky for manual labor.' (Cosine similarity: 0.88)")\n`
    },
    6: {
        title: 'Lab 06: LangGraph State Machines',
        subtitle: 'Trace cyclic state transitions.',
        initialCode: `# Lab 06 — LangGraph Router\nstate = {"accuracy": 0.84, "target_accuracy": 0.85, "retry_count": 0}\nprint("Node: fit_model -> Accuracy = 0.84")\nwhile state["accuracy"] < state["target_accuracy"]:\n    state["retry_count"] += 1\n    state["accuracy"] += 0.02\n    print(f"Router -> re_engineer_features (retry #{state['retry_count']}) -> Accuracy improved to {state['accuracy']}")\nprint("Router -> draft_report")\n`
    },
    7: {
        title: 'Lab 07: Model Context Protocol (MCP)',
        subtitle: 'Build a FastMCP server and generate a JSON Schema \'Menu\'.',
        initialCode: `# Lab 07 — Model Context Protocol (FastMCP)\n# Notice how the docstring becomes the JSON schema API!\ndef codebook_lookup(variable: str) -> str:\n    '''\n    Look up a variable definition in the survey codebook.\n    \n    Args:\n        variable: The name of the variable to look up.\n    '''\n    return f"Definition for {variable}"\n\nprint("=== FAST MCP SERVER INITIALIZED ===")\nprint("Generated JSON Schema Menu for LLM:")\nprint('{')\nprint('  "name": "codebook_lookup",')\nprint('  "description": "Look up a variable definition in the survey codebook.",')\nprint('  "parameters": {')\nprint('    "variable": {"type": "string", "description": "The name of the variable to look up."}')\nprint('  }')\nprint('}')\n`
    },
    8: {
        title: 'Lab 08: Multi-Agent AutoGen',
        subtitle: 'Simulate a Senior Analyst delegating to a Junior Analyst.',
        initialCode: `# Lab 08 — Multi-Agent Systems\nprint("=== AUTO-GEN MESSAGE EXCHANGE ===")\nprint("Planner (Senior Analyst): @Analyst, please run the cross-tabulation on Age vs AI Trust.")\nprint("---")\nprint("Analyst (Junior): Running tool 'crosstab'...")\nprint("Analyst (Junior): @Planner, the results are ready. 18-29 is 67% High Trust.")\nprint("---")\nprint("Planner (Senior Analyst): @Writer, please draft the executive summary based on the Analyst's results.")\nprint("---")\nprint("Writer: Drafting report...")\nprint("Final Output: 'The survey reveals a stark generational divide...'")\n`
    },
    9: {
        title: 'Lab 09: Capstone Survey Assistant',
        subtitle: 'End-to-end multi-agent pipeline.',
        initialCode: `# Lab 09 — Capstone\nfindings = [\n    {"age": "18-29", "trust_pct": 67.0, "p_value": 0.0004},\n    {"age": "60+",   "trust_pct": 12.0, "p_value": 0.00003},\n]\nprint("=== WATSPEED CAPSTONE EXECUTIVE REPORT ===")\nprint("KEY SOCIOLOGICAL FINDINGS:")\nfor f in findings:\n    sig = "***" if f["p_value"] < 0.05 else "(ns)"\n    print(f"  {f['age']}: {f['trust_pct']}% High Trust (p={f['p_value']} {sig})")\n`
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
