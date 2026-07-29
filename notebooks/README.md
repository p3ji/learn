# Sociology ➔ AI & Data Science — Executable Notebooks

Hands-on learning path for sociologists and quantitative researchers bridging SAS/Stata experience into Data Science, Machine Learning, and Agentic AI.
These notebooks close the gap between traditional social science methods and modern AI engineering.

## The design rule

**Every notebook runs offline, with no API key, and ships with saved outputs.**

`agentkit.py` provides a deterministic stub model. Same input → same output, every run.
That means you can read a notebook and see real results before installing anything, the
files stay diffable in git, and you are never blocked on a paid subscription while learning.

Each notebook then ends with a *"the real thing"* section showing the LangChain /
LangGraph / MCP / AutoGen syntax for what you just built by hand. That order is deliberate:
you learn the mechanism first, so the framework is something you can debug rather than
something you hope works.

## The notebooks

| # | Notebook | Course topic |
|---|---|---|
| 01 | Python Data Essentials for SAS & Stata Users | prerequisite |
| 02 | Tools & Function Calling | function calling |
| 03 | The Agent Loop (ReAct) | agent fundamentals |
| 04 | Context Engineering | context engineering |
| 05 | Agent Memory, Vector Stores & RAG | memory, vector stores, RAG |
| 06 | LangGraph State Machines | orchestration |
| 07 | Model Context Protocol (MCP) | MCP |
| 08 | Multi-Agent Systems & AutoGen | autonomous multi-agent design |
| 09 | Capstone: Autonomous Survey Assistant | capstone |

Notebooks 02–09 build on each other; 09 assembles all of them. Content uses survey data
throughout (`../data/ai_trust_insights.csv`), matching the SAS→Python bridge in the
[prep hub](../apps/watspeed_ai/index.html).

## Running them

```bash
python -m venv .venv && .venv\Scripts\activate     # Windows
pip install -r notebooks/requirements.txt
jupyter lab notebooks/
```

Only the "core" block of `requirements.txt` is needed for notebooks 02–09.

To re-execute everything and refresh saved outputs:

```bash
python scripts/execute_notebooks.py
```

To switch to a real model — no code changes, every notebook picks it up:

```bash
set OPENAI_API_KEY=sk-...
```

`get_llm()` returns a real client when a key is present and the stub otherwise, and
prints which one it chose.

## Files

- `agentkit.py` — tool registry, stub/real LLM wrapper, vector store, output helpers
- `../scripts/build_agentic_notebooks.py` — regenerates notebooks 02–09
- `../scripts/execute_notebooks.py` — executes notebooks in place so outputs are saved

Notebook 01 is hand-maintained and not regenerated.

## Before the course starts

1. Install the full `requirements.txt` and re-run notebooks 02–09.
2. Set an API key and re-run. Watch where the stub's determinism was hiding real variance.
3. Port one notebook to the real framework — 03 → `create_react_agent`, or 06 → `StateGraph`.
4. Replace the capstone's fake `chi_square` with real `pandas` + `scipy` on the survey data.
