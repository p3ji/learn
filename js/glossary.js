// Comprehensive Concept Deep-Dive & Glossary Database
const glossaryDB = {
    pydantic: {
        term: "Pydantic",
        category: "Python Essentials",
        summary: "Data validation and settings management using Python type hints.",
        sasAnalogy: "Like combining SAS PROC FORMAT with PROC CONTENTS validation checks and SAS DATA step ERROR log traps.",
        whatIsIt: "Pydantic is Python's gold standard for data parsing and validation. It allows you to define strict schemas (data types, ranges, required vs optional fields) using simple Python classes.",
        whyAgentsNeedIt: "LLMs output freeform text. Pydantic acts as a 'bouncer' that parses LLM responses, guarantees that numbers are actual integers and booleans are true/false, and raises clear errors if the AI hallucinates invalid data structures.",
        codeExample: `# SAS / Stata mindset: "Hope column X is numeric"
# Pydantic mindset: Strict contract!

from pydantic import BaseModel, Field
from typing import Optional

class SurveyRespondent(BaseModel):
    respondent_id: str
    age_group: str
    risk_score: Optional[int] = Field(ge=1, le=5, description="1-5 Likert scale score")
    high_ai_trust: bool

# If an LLM passes risk_score="invalid", Pydantic throws a ValidationError!`,
        useCases: [
            "Parsing LLM Tool Arguments safely",
            "Structuring survey codebook JSON objects",
            "Validating API response payloads before saving to databases"
        ]
    },
    tabfm: {
        term: "Google TabFM (Tabular Foundation Model)",
        category: "Tabular ML & AI",
        summary: "Google Research's zero-shot transformer model for tabular dataset prediction.",
        sasAnalogy: "Imagine SAS PROC LOGISTIC that doesn't need to estimate model parameters from scratch on your dataset, because it has already learned tabular data patterns from millions of synthetic tables!",
        whatIsIt: "TabFM is a pre-trained Transformer model engineered by Google specifically for tabular data. It treats prediction as an In-Context Learning (ICL) problem.",
        whyAgentsNeedIt: "Traditional ML requires training loops and hyperparameter searches that take time and CPU power. TabFM allows an autonomous agent to predict survey outcomes instantly in a single forward pass without training delay.",
        codeExample: `# Traditional ML: Requires .fit() training loop & one-hot encoding
# TabFM: In-context zero-shot evaluation directly on raw survey columns!

from tabfm import TabFMClassifier

model = TabFMClassifier()
model.fit(train_df, target_column='High_AI_Trust') # Loads context
predictions = model.predict_proba(test_df)          # Instant zero-shot forward pass`,
        useCases: [
            "Instant zero-shot benchmarking on new survey datasets",
            "Predicting outcomes on small survey sub-samples where standard models overfit",
            "Handling mixed categorical & continuous survey columns without manual dummy creation"
        ]
    },
    mcp: {
        term: "Model Context Protocol (MCP)",
        category: "Agent Standards",
        summary: "Anthropic's open standard for connecting AI models to data sources and tools.",
        sasAnalogy: "Like a universal SAS LIBNAME system that any LLM client (Claude, ChatGPT, Gemini) can connect to via standard URI handles.",
        whatIsIt: "MCP is an open protocol (using JSON-RPC 2.0) that standardizes how AI applications connect to external data (Resources), tools (Tools), and prompt templates (Prompts).",
        whyAgentsNeedIt: "Without MCP, every AI tool needs custom integration code. With MCP, you write an MCP Server once for your survey dataset, and any MCP-compatible AI client can immediately inspect codebooks and query stats.",
        codeExample: `from mcp.server import Server

app = Server("survey-mcp-server")

@app.read_resource("survey://codebook")
def read_codebook():
    return open("ai_trust_codebook.json").read()

@app.call_tool("crosstab")
def execute_crosstab(var1, var2):
    return pd.crosstab(df[var1], df[var2]).to_dict()`,
        useCases: [
            "Exposing survey data dictionaries securely to LLMs",
            "Standardizing tool execution across Claude Desktop, VS Code, and custom web apps",
            "Creating modular research assistant microservices"
        ]
    },
    langgraph: {
        term: "LangGraph (StateGraph)",
        category: "Agent Frameworks",
        summary: "A framework for building stateful, multi-actor applications with LLMs.",
        sasAnalogy: "An interactive, cyclic Stata .do file script that can inspect its own results, loop back to previous steps, and branching based on conditional logic.",
        whatIsIt: "LangGraph builds agentic workflows as graph networks. Nodes are Python functions, edges are state transitions, and State keeps track of execution history.",
        whyAgentsNeedIt: "Complex survey analysis requires multiple steps (Clean -> Split -> Fit -> Evaluate -> Report). LangGraph provides state persistence, human-in-the-loop approvals, and recovery from failures.",
        codeExample: `from langgraph.graph import StateGraph

# 1. Define State
class State(TypedDict):
    df: pd.DataFrame
    auc_score: float

# 2. Build Graph
builder = StateGraph(State)
builder.add_node("ingest", node_ingest)
builder.add_node("fit_model", node_fit)
builder.add_edge("ingest", "fit_model")
graph = builder.compile()`,
        useCases: [
            "Automated multi-step survey data analysis pipelines",
            "Cyclic model tuning loops (re-fit until test accuracy threshold is met)",
            "Human-in-the-loop review before publishing research memos"
        ]
    },
    react: {
        term: "ReAct (Reasoning + Acting)",
        category: "Agent Frameworks",
        summary: "Prompting framework combining chain-of-thought reasoning with tool execution.",
        sasAnalogy: "How a research statistician works: Think about what test to run -> Run the PROC in SAS -> Inspect output -> Decide next step.",
        whatIsIt: "ReAct prompts the LLM to generate explicit 'Thought' steps followed by 'Action' tool calls, observing results in an iterative loop until reaching a 'Final Answer'.",
        whyAgentsNeedIt: "Without ReAct, LLMs guess answers based on memory. With ReAct, LLMs explicitly state why they are calling a statistical tool and ground their answers in real code execution.",
        codeExample: `User: "Predict high AI trust in healthcare workers."

Thought 1: I need to filter survey data for employment_sector == 'Healthcare'.
Action 1: filter_dataset(sector='Healthcare')
Observation 1: 240 respondents filtered.

Thought 2: Now I will fit a Logistic Regression tool on this subset.
Action 2: fit_logistic_model()
Observation 2: ROC-AUC = 0.81.

Final Answer: In healthcare workers, education and risk perception drive 81% AUC.`,
        useCases: [
            "Natural language data exploration",
            "Automated statistical hypothesis testing",
            "Tool selection in conversational research assistants"
        ]
    },
    asyncio: {
        term: "Python Asyncio",
        category: "Python Essentials",
        summary: "Asynchronous I/O framework for running concurrent non-blocking tasks.",
        sasAnalogy: "Like running multiple SAS jobs in batch mode concurrently rather than waiting for job 1 to finish before submitting job 2.",
        whatIsIt: "Asyncio allows Python code to perform non-blocking network requests using `async` and `await` keywords, running hundreds of API queries concurrently.",
        whyAgentsNeedIt: "LLM API calls take 1-3 seconds. If you need qualitative LLM coding for 100 survey open-ended responses, synchronous code takes 300s, while `asyncio` takes 3s!",
        codeExample: `import asyncio

async def call_llm(respondent_text):
    return await llm_api.generate(respondent_text)

async def main():
    tasks = [call_llm(text) for text in survey_responses]
    results = await asyncio.gather(*tasks) # Runs all in parallel!

asyncio.run(main())`,
        useCases: [
            "Parallel qualitative coding of open-ended survey text",
            "Concurrent multi-agent communication",
            "Streaming real-time LLM responses to web applications"
        ]
    }
};

function openConceptDeepDive(termKey) {
    const item = glossaryDB[termKey];
    if (!item) return;

    // Create or locate modal element
    let modal = document.getElementById('conceptModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'conceptModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="concept-modal-card">
            <button class="concept-modal-close" onclick="closeConceptDeepDive()">&times;</button>
            <div class="concept-badge-tag">${item.category}</div>
            <h2 class="concept-title">${item.term}</h2>
            <p class="concept-summary">${item.summary}</p>

            <div class="concept-sas-box">
                <span class="sas-box-label">SAS / Stata Veteran Analogy:</span>
                <p>${item.sasAnalogy}</p>
            </div>

            <div class="concept-section">
                <h3>What Is It?</h3>
                <p>${item.whatIsIt}</p>
            </div>

            <div class="concept-section">
                <h3>Why Agentic AI Needs It</h3>
                <p>${item.whyAgentsNeedIt}</p>
            </div>

            <div class="concept-section">
                <h3>Code Example & Syntax</h3>
                <pre class="concept-code-block"><code>${escapeHtml(item.codeExample)}</code></pre>
            </div>

            <div class="concept-section">
                <h3>Common Use Cases</h3>
                <ul>
                    ${item.useCases.map(u => `<li>${u}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeConceptDeepDive() {
    const modal = document.getElementById('conceptModal');
    if (modal) modal.style.display = 'none';
}

function renderGlossaryPage() {
    const container = document.getElementById('glossaryGrid');
    if (!container) return;

    container.innerHTML = Object.keys(glossaryDB).map(key => {
        const item = glossaryDB[key];
        return `
            <div class="glossary-card" onclick="openConceptDeepDive('${key}')">
                <div class="nb-badge">${item.category}</div>
                <h3 style="font-family: var(--font-heading); color: var(--gold-primary); margin: 8px 0;">${item.term}</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">${item.summary}</p>
                <div style="font-size: 0.8rem; color: var(--accent-blue); font-weight: 600;">Click for Deep-Dive ➔</div>
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderGlossaryPage();
});
