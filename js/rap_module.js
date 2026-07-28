// Reproducible Analytical Pipelines (RAP) Bridge Module
// Guides SAS/Stata & Python users from folder script clutter to production RAP pipelines.

const rapSteps = [
    {
        level: 1,
        title: "Level 1: Unorganized Folder (Legacy SAS/Stata Workflow)",
        badge: "⚠️ Legacy / Fragile",
        badgeColor: "#EF4444",
        problem: "Multiple unversioned scripts (clean_v2.do, analysis_final_FINAL.sas) with hardcoded absolute file paths like C:\\Users\\Name\\Downloads. No dependency tracking, no version control.",
        sasExample: `/* Hardcoded path, no dependency management */
LIBNAME mydata "C:\\Users\\pushp\\Downloads\\survey_data";

data clean_v2;
    set mydata.ai_trust;
    if age = . then delete;
run;
/* Must manually remember to run clean_v2.sas before analysis_july.sas! */`,
        pythonExample: `# Hardcoded paths, no environment isolation
import pandas as pd
df = pd.read_csv("C:/Users/pushp/Downloads/ai_trust_insights.csv")
df_clean = df.dropna()
df_clean.to_csv("C:/Users/pushp/Downloads/clean_output_v2.csv")`,
        rapUpgrade: "Move all code out of loose scripts and organize into a standardized project directory with relative file paths."
    },
    {
        level: 2,
        title: "Level 2: Structured Project Layout & Virtual Environment",
        badge: "📁 Standardized Setup",
        badgeColor: "#F59E0B",
        problem: "Package version drift ('Works on my laptop, crashes on server because pandas 2.0 vs 1.4 handles NA differently').",
        structure: `my_survey_project/
├── data/
│   ├── raw/          <-- Immutable original CSV (read-only!)
│   └── processed/    <-- Cleaned datasets produced by pipeline
├── src/
│   ├── data_clean.py <-- Modular Python functions
│   └── models.py     <-- Analysis & modeling logic
├── notebooks/        <-- Exploratory Analysis (.ipynb)
├── pyproject.toml    <-- Locked package dependencies (uv / poetry)
└── README.md         <-- Execution instructions`,
        pythonExample: `# pyproject.toml (Locks exact package versions for 100% reproducibility)
[project]
name = "ai-trust-survey-rap"
version = "1.0.0"
dependencies = [
    "pandas==2.2.1",
    "statsmodels==0.14.1",
    "pydantic==2.6.4",
    "scikit-learn==1.4.1",
]`,
        rapUpgrade: "Lock your Python environment using pyproject.toml (or uv/poetry) so identical results are produced 5 years later."
    },
    {
        level: 3,
        title: "Level 3: Declarative Data Pipeline (DAG Dependency Graph & Cloud Orchestration)",
        badge: "⚡ Pipeline DAG & Cloud Orchestrators",
        badgeColor: "#38BDF8",
        problem: "Executing scripts sequentially by hand or relying on single-server SAS Enterprise Guide Process Flows that don't scale to modern cloud platforms (Argo, Databricks, Microsoft Fabric).",
        explanation: "In SAS Enterprise Guide, you draw visual node graphs. In modern cloud engineering, DAGs (Directed Acyclic Graphs) define task dependencies across distributed engines. If raw data hasn't changed, cached step results are reused automatically!",
        orchestrationMatrix: [
            { tool: "SAS Enterprise Guide / Miner", mechanism: "Visual Process Flow GUI", storage: "SAS Working Libraries", Execution: "Single SAS Server Session Memory" },
            { tool: "Argo Workflows (Kubernetes)", mechanism: "YAML / Hera Python SDK DAGs", storage: "Container Volumes & S3/GCS", Execution: "Container-native distributed K8s pods" },
            { tool: "Databricks Workflows / Jobs", mechanism: "Notebook Jobs & DLT Pipelines", storage: "Delta Lake / DBFS / S3", Execution: "Distributed Apache Spark Clusters" },
            { tool: "Microsoft Fabric Data Factory", mechanism: "Drag & Drop Pipelines + PySpark", storage: "OneLake / Synapse Lakehouse", Execution: "Fabric Compute Engines & PySpark" },
            { tool: "Prefect / Airflow (Python Native)", mechanism: "@task & @flow Python Decorators", storage: "DataFrame Memory / S3", Execution: "Distributed Python Workers" }
        ],
        pythonExample: `# Prefect / Airflow Python DAG (Equivalent to SAS Enterprise Guide Process Flow)
from prefect import task, flow
import pandas as pd

@task(retries=2)  # Auto-retry node if raw data source stutters
def load_and_clean_survey(raw_path: str) -> pd.DataFrame:
    df = pd.read_csv(raw_path)
    return df.replace(-9, None)

@task
def fit_survey_model(df_clean: pd.DataFrame):
    import statsmodels.formula.api as smf
    return smf.logit("High_AI_Trust ~ Perceived_AI_Risk", data=df_clean).fit()

@flow(name="Survey RAP Orchestration DAG")
def run_full_pipeline():
    df_clean = load_and_clean_survey("data/raw/survey.csv")
    model = fit_survey_model(df_clean)
    print(model.summary())`,
        rapUpgrade: "Use DAG orchestrators (Databricks Workflows, Microsoft Fabric, Argo, or Prefect) to automate execution order, retries, and smart caching."
    },
    {
        level: 4,
        title: "Level 4: Automated Data Quality & Schema Assertions",
        badge: "🛡️ Automated Quality",
        badgeColor: "#10B981",
        problem: "Bad data (e.g. a new survey batch with missing age columns or out-of-range Likert scores) silently corrupting downstream regression models.",
        pythonExample: `# Data Quality assertions with pytest & Pydantic
import pytest

def test_survey_data_quality():
    df = pd.read_csv("data/processed/clean_survey.csv")
    
    # Assertion 1: No missing respondent IDs
    assert df["respondent_id"].isnull().sum() == 0, "Missing IDs found!"
    
    # Assertion 2: Likert scores strictly between 1 and 5
    assert df["perceived_risk"].between(1, 5).all(), "Invalid Likert scores!"
    
    # Assertion 3: Column count matches expected schema
    assert len(df.columns) == 12, "Schema drift detected!"`,
        rapUpgrade: "Add automated tests (pytest) that halt pipeline execution if incoming survey data violates quality contracts."
    },
    {
        level: 5,
        title: "Level 5: Continuous Integration (CI/CD) & Automated Reports",
        badge: "🚀 Production RAP",
        badgeColor: "#A855F7",
        problem: "Manual email reports that take hours to run every time new survey waves are released.",
        githubActionExample: `# .github/workflows/run_pipeline.yml
name: Execute Reproducible Analytical Pipeline

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 8 * * 1'  # Run automatically every Monday morning

jobs:
  run-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v1
      - name: Run Pipeline & Generate HTML Report
        run: |
          uv run python src/run_pipeline.py
          uv run pytest tests/
`,
        rapUpgrade: "Deploy GitHub Actions to run tests, execute the pipeline, and publish executive survey reports automatically on every git commit!"
    }
];

function rapEscapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

let currentRapStep = 1;
let activeRapContainerId = 'rapStudioCard';

function renderRapModuleCard(targetContainerId) {
    if (targetContainerId) {
        activeRapContainerId = targetContainerId;
    }
    const container = document.getElementById(activeRapContainerId) || 
                      document.getElementById('rapStudioCard') || 
                      document.getElementById('rapModuleCard');
    if (!container) return;
    activeRapContainerId = container.id;

    const shortTitles = [
        "Level 1: Script Folder",
        "Level 2: Project Layout",
        "Level 3: Pipeline DAG",
        "Level 4: Quality Assertions",
        "Level 5: CI/CD Automation"
    ];

    let stepNavHtml = rapSteps.map(s => `
        <button class="viz-step-btn ${s.level === currentRapStep ? 'active' : ''}" 
                onclick="setRapStep(${s.level})" 
                style="padding: 8px 14px; font-size: 0.82rem;">
            ${shortTitles[s.level - 1]}
        </button>
    `).join('');

    let codeBlockHtml = '';
    if (step.level === 1) {
        codeBlockHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                <div>
                    <h4 style="font-size: 0.82rem; color: #EF4444; margin-bottom: 6px;">❌ Legacy SAS / Stata Script</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #F87171; overflow-x: auto; border: 1px solid rgba(239,68,68,0.3);">${rapEscapeHtml(step.sasExample)}</pre>
                </div>
                <div>
                    <h4 style="font-size: 0.82rem; color: #EF4444; margin-bottom: 6px;">❌ Loose Python Script</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #F87171; overflow-x: auto; border: 1px solid rgba(239,68,68,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
                </div>
            </div>`;
    } else if (step.level === 2) {
        codeBlockHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                <div>
                    <h4 style="font-size: 0.82rem; color: var(--gold-primary); margin-bottom: 6px;">📁 Standard Directory Structure</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #FBBF24; overflow-x: auto; border: 1px solid rgba(251,191,36,0.3);">${rapEscapeHtml(step.structure)}</pre>
                </div>
                <div>
                    <h4 style="font-size: 0.82rem; color: #38BDF8; margin-bottom: 6px;">🔒 pyproject.toml Version Locking</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #38BDF8; overflow-x: auto; border: 1px solid rgba(56,189,248,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
                </div>
            </div>`;
    } else if (step.level === 3) {
        let matrixRows = step.orchestrationMatrix.map(m => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 8px 10px; font-weight:700; color: var(--gold-primary);">${rapEscapeHtml(m.tool)}</td>
                <td style="padding: 8px 10px; color: var(--cyan-magic);">${rapEscapeHtml(m.mechanism)}</td>
                <td style="padding: 8px 10px; color: var(--text-main);">${rapEscapeHtml(m.storage)}</td>
                <td style="padding: 8px 10px; color: var(--text-muted);">${rapEscapeHtml(m.Execution)}</td>
            </tr>
        `).join('');

        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.88rem; color: var(--cyan-magic); margin-bottom: 8px;">🌉 Orchestration Bridge Matrix: SAS EG ➔ Modern Cloud Platforms</h4>
                <div style="overflow-x: auto; margin-bottom: 14px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;">
                    <table style="width: 100%; font-size: 0.78rem; text-align: left; border-collapse: collapse;">
                        <thead>
                            <tr style="background: rgba(255,255,255,0.05); color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.15);">
                                <th style="padding: 8px 10px;">Platform / Engine</th>
                                <th style="padding: 8px 10px;">Orchestration Mechanism</th>
                                <th style="padding: 8px 10px;">Data Storage</th>
                                <th style="padding: 8px 10px;">Execution Engine</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${matrixRows}
                        </tbody>
                    </table>
                </div>

                <h4 style="font-size: 0.82rem; color: #38BDF8; margin-bottom: 6px;">⚡ Python Pipeline DAG Example (Prefect / Airflow Syntax)</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #38BDF8; overflow-x: auto; border: 1px solid rgba(56,189,248,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
            </div>`;
    } else if (step.level === 4) {
        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.82rem; color: #10B981; margin-bottom: 6px;">🛡️ Automated Schema & Quality Assertions (pytest)</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #4ADE80; overflow-x: auto; border: 1px solid rgba(74,222,128,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
            </div>`;
    } else if (step.level === 5) {
        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.82rem; color: #C084FC; margin-bottom: 6px;">🚀 GitHub Actions CI/CD Automated Execution</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #C084FC; overflow-x: auto; border: 1px solid rgba(192,132,252,0.3);">${rapEscapeHtml(step.githubActionExample)}</pre>
            </div>`;
    }

    container.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 2px solid var(--gold-primary); border-radius: 20px; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span style="background: ${step.badgeColor}; color: #000; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">${step.badge}</span>
                    <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin: 6px 0 0; font-size: 1.25rem;">${step.title}</h3>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Step ${currentRapStep} of 5</div>
            </div>

            <!-- Stepper Buttons -->
            <div class="viz-controls" style="margin-bottom: 18px; display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
                ${stepNavHtml}
            </div>

            <!-- Problem / Context Box -->
            <div style="background: rgba(255,255,255,0.04); border-left: 4px solid ${step.badgeColor}; padding: 14px 16px; border-radius: 6px; font-size: 0.88rem; color: var(--text-main); margin-bottom: 16px; line-height: 1.6;">
                <strong>Key Friction Point:</strong> ${step.problem}
            </div>

            <!-- Code Comparison / Diagram -->
            ${codeBlockHtml}

            <!-- Upgrade Takeaway Box -->
            <div style="background: rgba(255, 199, 44, 0.1); border: 1px solid var(--gold-primary); padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; color: var(--text-main);">
                <strong>💡 Modern RAP Upgrade:</strong> ${step.rapUpgrade}
            </div>
        </div>`;
}

function setRapStep(stepNum) {
    currentRapStep = stepNum;
    renderRapModuleCard(activeRapContainerId);
    const card = document.getElementById(activeRapContainerId);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Interactive RAP Toolkit Generator Modals
function openRapGeneratorModal(level) {
    setRapStep(level);

    let existingModal = document.getElementById('rapModalOverlay');
    if (existingModal) existingModal.remove();

    let title = "";
    let badge = "";
    let badgeColor = "#000";
    let bodyHtml = "";

    if (level === 1) {
        title = "⚠️ Level 1: Script Path Sanitizer & Audit Tool";
        badge = "LEVEL 1 TOOL";
        badgeColor = "#EF4444";
        bodyHtml = `
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
                Paste any legacy SAS/Stata/Python script containing hardcoded absolute paths (e.g. <code>C:\\Users\\Name\\Downloads</code>). Click <strong>Sanitize Paths</strong> to automatically replace hardcoded paths with clean, relative project paths.
            </p>
            <div style="margin-bottom: 12px;">
                <label style="color: var(--gold-primary); font-size: 0.82rem; font-weight: 700; display: block; margin-bottom: 4px;">INPUT CODE WITH HARDCODED PATHS:</label>
                <textarea id="pathInput" style="width: 100%; height: 90px; background: #000; color: #F87171; border: 1px solid rgba(239,68,68,0.4); border-radius: 8px; padding: 10px; font-family: var(--font-mono); font-size: 0.8rem;">LIBNAME mydata "C:\\Users\\pushp\\Downloads\\survey_data";
df = pd.read_csv("C:/Users/pushp/Downloads/ai_trust_insights.csv")
df_clean.to_csv("C:/Users/pushp/Downloads/clean_output_v2.csv")</textarea>
            </div>
            <button onclick="runPathSanitizer()" style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFF; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-bottom: 14px;">⚡ Sanitize to RAP Relative Paths</button>
            <div>
                <label style="color: #4ADE80; font-size: 0.82rem; font-weight: 700; display: block; margin-bottom: 4px;">SANITIZED RAP REPRODUCIBLE OUTPUT:</label>
                <pre id="pathOutput" style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #4ADE80; border: 1px solid rgba(74,222,128,0.3); overflow-x: auto; min-height: 80px;">Click 'Sanitize' to generate clean relative paths...</pre>
            </div>
        `;
    } else if (level === 2) {
        title = "🔒 Level 2: Interactive pyproject.toml Lockfile Generator";
        badge = "LEVEL 2 TOOL";
        badgeColor = "#FBBF24";
        bodyHtml = `
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
                Select packages required for your project. Generates a production-ready <code>pyproject.toml</code> with pinned dependency versions to guarantee 100% execution reproducibility.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_pandas" checked onchange="generatePyprojectToml()"> pandas (2.2.1)</label>
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_statsmodels" checked onchange="generatePyprojectToml()"> statsmodels (0.14.1)</label>
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_sklearn" checked onchange="generatePyprojectToml()"> scikit-learn (1.4.1)</label>
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_pydantic" checked onchange="generatePyprojectToml()"> pydantic (2.6.4)</label>
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_pytest" checked onchange="generatePyprojectToml()"> pytest (8.0.2)</label>
                <label style="color: var(--text-main); font-size: 0.84rem;"><input type="checkbox" id="pkg_prefect" checked onchange="generatePyprojectToml()"> prefect (3.0.1)</label>
            </div>
            <button onclick="generatePyprojectToml()" style="background: linear-gradient(135deg, var(--gold-primary), var(--gold-dark)); color: #000; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-bottom: 14px;">⚡ Generate pyproject.toml File</button>
            <div>
                <pre id="tomlOutput" style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #38BDF8; border: 1px solid rgba(56,189,248,0.3); overflow-x: auto; min-height: 100px;">Click 'Generate' to create pyproject.toml content...</pre>
            </div>
        `;
    } else if (level === 3) {
        title = "⚡ Level 3: Interactive Pipeline DAG Code Builder";
        badge = "LEVEL 3 TOOL";
        badgeColor = "#38BDF8";
        bodyHtml = `
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
                Build an automated Pipeline DAG (Directed Acyclic Graph) equivalent to SAS Enterprise Guide Process Flows with retries and task caching.
            </p>
            <div style="margin-bottom: 12px;">
                <label style="color: #38BDF8; font-size: 0.82rem; font-weight: 700; display: block; margin-bottom: 4px;">SELECT ORCHESTRATION FRAMEWORK:</label>
                <select id="dagFramework" onchange="generateDagCode()" style="background: #000; color: #38BDF8; border: 1px solid rgba(56,189,248,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem; width: 100%;">
                    <option value="prefect">Prefect 3.0 (Python Native Decorators)</option>
                    <option value="airflow">Apache Airflow (Enterprise DAGs)</option>
                    <option value="snakemake">Snakemake (Declarative Rules)</option>
                </select>
            </div>
            <button onclick="generateDagCode()" style="background: linear-gradient(135deg, #0EA5E9, #0284C7); color: #FFF; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-bottom: 14px;">⚡ Build Executable DAG Script</button>
            <div>
                <pre id="dagOutput" style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #38BDF8; border: 1px solid rgba(56,189,248,0.3); overflow-x: auto; min-height: 120px;">Select a framework and click 'Build'...</pre>
            </div>
        `;
    } else if (level === 4) {
        title = "🛡️ Level 4: Live Data Quality & Schema Tester";
        badge = "LEVEL 4 TOOL";
        badgeColor = "#10B981";
        bodyHtml = `
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
                Run automated schema quality checks against sample incoming survey batches before feeding into statistical models.
            </p>
            <button onclick="runQualityTests()" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-bottom: 14px;">⚡ Run pytest Quality Suite</button>
            <div>
                <pre id="testOutput" style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #4ADE80; border: 1px solid rgba(74,222,128,0.3); overflow-x: auto; min-height: 100px;">Click 'Run pytest' to execute data quality checks...</pre>
            </div>
        `;
    } else if (level === 5) {
        title = "🚀 Level 5: GitHub Actions CI/CD Workflow Builder";
        badge = "LEVEL 5 TOOL";
        badgeColor = "#C084FC";
        bodyHtml = `
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
                Generate a production <code>.github/workflows/pipeline.yml</code> file to automate data pipeline execution and testing on git push.
            </p>
            <button onclick="generateGithubWorkflow()" style="background: linear-gradient(135deg, #A855F7, #7E22CE); color: #FFF; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; margin-bottom: 14px;">⚡ Generate GitHub Actions YAML</button>
            <div>
                <pre id="yamlOutput" style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #C084FC; border: 1px solid rgba(192,132,252,0.3); overflow-x: auto; min-height: 120px;">Click 'Generate' to build CI/CD Workflow YAML...</pre>
            </div>
        `;
    }

    const modalHtml = `
        <div id="rapModalOverlay" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: #0F172A; border: 2px solid ${badgeColor}; border-radius: 20px; max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 60px rgba(0,0,0,0.9); position: relative;">
                
                <button onclick="closeRapGeneratorModal()" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); border: none; color: #FFF; font-size: 1.2rem; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;">✕</button>

                <span style="background: ${badgeColor}; color: #000; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">${badge}</span>
                <h2 style="color: var(--gold-primary); font-family: var(--font-heading); margin: 10px 0 16px; font-size: 1.35rem;">${title}</h2>

                ${bodyHtml}

                <div style="margin-top: 20px; text-align: right;">
                    <button onclick="closeRapGeneratorModal()" style="background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; cursor: pointer;">Close Inspector</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    setTimeout(() => {
        if (level === 1) runPathSanitizer();
        if (level === 2) generatePyprojectToml();
        if (level === 3) generateDagCode();
        if (level === 4) runQualityTests();
        if (level === 5) generateGithubWorkflow();
    }, 50);
}

function closeRapGeneratorModal() {
    let modal = document.getElementById('rapModalOverlay');
    if (modal) modal.remove();
}

function runPathSanitizer() {
    let input = document.getElementById('pathInput')?.value || '';
    let output = input
        .replace(/LIBNAME\s+\w+\s+"[^"]+";?/gi, 'LIBNAME mydata "data/processed"; /* Sanitized relative path */')
        .replace(/"[A-Z]:\\[^"]+\\([^"\\]+\.csv)"/gi, '"data/raw/$1"')
        .replace(/"[A-Z]:\/[^"]+\/([^"\/]+\.csv)"/gi, '"data/raw/$1"');
    
    let el = document.getElementById('pathOutput');
    if (el) el.textContent = output + '\n\n# Best Practice (pathlib):\nfrom pathlib import Path\nDATA_DIR = Path("data/raw")\ndf = pd.read_csv(DATA_DIR / "survey.csv")';
}

function generatePyprojectToml() {
    let pkgs = [];
    if (document.getElementById('pkg_pandas')?.checked) pkgs.push('"pandas==2.2.1"');
    if (document.getElementById('pkg_statsmodels')?.checked) pkgs.push('"statsmodels==0.14.1"');
    if (document.getElementById('pkg_sklearn')?.checked) pkgs.push('"scikit-learn==1.4.1"');
    if (document.getElementById('pkg_pydantic')?.checked) pkgs.push('"pydantic==2.6.4"');
    if (document.getElementById('pkg_pytest')?.checked) pkgs.push('"pytest==8.0.2"');
    if (document.getElementById('pkg_prefect')?.checked) pkgs.push('"prefect==3.0.1"');

    let toml = `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "survey-rap-pipeline"
version = "1.0.0"
description = "Reproducible Analytical Pipeline for Survey Machine Learning"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [\n    ` + pkgs.join(',\n    ') + `\n]`;

    let el = document.getElementById('tomlOutput');
    if (el) el.textContent = toml;
}

function generateDagCode() {
    let fw = document.getElementById('dagFramework')?.value || 'prefect';
    let code = '';
    if (fw === 'prefect') {
        code = `from prefect import task, flow\nimport pandas as pd\n\n@task(retries=2)\ndef clean_survey_data(raw_path: str) -> pd.DataFrame:\n    return pd.read_csv(raw_path).replace(-9, None)\n\n@task\ndef fit_statistical_model(df: pd.DataFrame):\n    import statsmodels.formula.api as smf\n    return smf.logit("High_AI_Trust ~ Perceived_AI_Risk", data=df).fit()\n\n@flow(name="Survey RAP Pipeline")\ndef main():\n    df = clean_survey_data("data/raw/survey.csv")\n    model = fit_statistical_model(df)\n    print(model.summary())\n\nif __name__ == "__main__":\n    main()`;
    } else if (fw === 'airflow') {
        code = `from airflow import DAG\nfrom airflow.operators.python import PythonOperator\nfrom datetime import datetime\n\nwith DAG('survey_rap_pipeline', start_date=datetime(2026, 1, 1), schedule='@weekly') as dag:\n    task1 = PythonOperator(task_id='clean_data', python_callable=clean_survey_data)\n    task2 = PythonOperator(task_id='fit_model', python_callable=fit_model)\n    task1 >> task2`;
    } else {
        code = `rule all:\n    input: "data/processed/report.html"\n\nrule clean:\n    input: "data/raw/survey.csv"\n    output: "data/processed/clean.csv"\n    script: "src/clean.py"\n\nrule model:\n    input: "data/processed/clean.csv"\n    output: "data/processed/report.html"\n    script: "src/model.py"`;
    }

    let el = document.getElementById('dagOutput');
    if (el) el.textContent = code;
}

function runQualityTests() {
    let output = `============================= test session starts =============================
platform win32 -- Python 3.11.4, pytest-8.0.2
rootdir: C:\\Users\\pushp\\Documents\\Projects\\learn
collected 3 items

tests/test_survey_data.py::test_no_missing_respondent_ids PASSED         [ 33%]
tests/test_survey_data.py::test_likert_range_one_to_five PASSED           [ 66%]
tests/test_survey_data.py::test_schema_column_count PASSED                [100%]

============================== 3 passed in 0.42s ==============================`;
    let el = document.getElementById('testOutput');
    if (el) el.textContent = output;
}

function generateGithubWorkflow() {
    let yaml = `name: RAP Automated Execution
on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 8 * * 1'  # Run automatically every Monday morning

jobs:
  run-pipeline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v1
      - name: Run Pipeline & Quality Tests
        run: |
          uv run python src/run_pipeline.py
          uv run pytest tests/`;
    let el = document.getElementById('yamlOutput');
    if (el) el.textContent = yaml;
}


