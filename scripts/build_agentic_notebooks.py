"""
Build the Sociology ➔ AI & Data Science notebooks (02-09).

Run:  python scripts/build_agentic_notebooks.py
Then: python scripts/execute_notebooks.py     # fills in saved outputs

Notebook 01 (Python for SAS/Stata users) is hand-maintained and not touched here.
Every notebook runs offline against notebooks/agentkit.py — no API key required.
"""

from __future__ import annotations

import pathlib

import nbformat as nbf

ROOT = pathlib.Path(__file__).resolve().parent.parent
NB_DIR = ROOT / "notebooks"

PREAMBLE = """import sys, pathlib
sys.path.insert(0, str(pathlib.Path.cwd() if (pathlib.Path.cwd() / 'agentkit.py').exists()
                      else pathlib.Path.cwd() / 'notebooks'))
from agentkit import *"""


def md(text: str) -> nbf.NotebookNode:
    return nbf.v4.new_markdown_cell(text.strip())


def code(text: str) -> nbf.NotebookNode:
    return nbf.v4.new_code_cell(text.strip())


def build(filename: str, title: str, week: str, cells: list) -> None:
    nb = nbf.v4.new_notebook()
    nb.cells = [
        md(f"# {title}\n\n**Sociology ➔ AI & Data Science — {week}**\n\n"
           "Runs offline. Set `OPENAI_API_KEY` to swap the stub model for a real one."),
        code(PREAMBLE),
        *cells,
    ]
    nb.metadata = {
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python"},
    }
    path = NB_DIR / filename
    nbf.write(nb, path)
    print(f"wrote {path.relative_to(ROOT)}  ({len(nb.cells)} cells)")


# ===========================================================================
# 02 — Tools & function calling
# ===========================================================================
NB02 = [
    md("""
## Why this is the first agentic concept

An "agent" is a loop around one primitive: **the model can ask your code to run a
function, and gets the result back**. Everything else — ReAct, LangGraph,
multi-agent — is control flow built on top of that one move.

The contract has three parts:

1. You describe your functions as **JSON Schema** and send them with the prompt.
2. The model replies with a *request*: `{"name": ..., "arguments": {...}}`. It never
   runs anything itself.
3. **You** validate, execute, and send the result back as a new message.

Step 3 is where your engineering lives. The model proposes; your code disposes.
"""),
    code("""
# A tool is just a function + a schema describing it.
tools = ToolBox()

@tools.tool("Cross-tabulate two survey columns and return a chi-square test",
            schema(row_var='string', col_var='string'))
def crosstab(row_var: str, col_var: str) -> dict:
    # Stand-in for a real pandas.crosstab + scipy.stats.chi2_contingency call.
    return {"row": row_var, "col": col_var, "chi2": 12.41, "dof": 3, "p_value": 0.0061}

@tools.tool("Return weighted mean of a numeric survey column",
            schema(column='string'))
def weighted_mean(column: str) -> dict:
    return {"column": column, "weighted_mean": 3.42, "n": 2041}

show("Tools the model will be told about", tools.names())
"""),
    md("""
### What actually goes over the wire

This is the exact payload shape the OpenAI and Anthropic tool-calling APIs accept.
Read it closely — most agent bugs are schema bugs, and frameworks hide this from you.
"""),
    code("""
show("JSON sent to the model", tools.schemas()[0])
"""),
    md("""
### The model's turn

The stub below is *scripted* so the notebook is reproducible. A real model would
produce the same structure from the prompt. Note it returns a **request**, not a result.
"""),
    code("""
llm = get_llm([
    LLMResponse(tool_calls=[{"name": "crosstab",
                             "arguments": {"row_var": "age_group", "col_var": "trusts_ai"}}]),
    LLMResponse(content="Age group and AI trust are associated (chi2=12.41, p=0.006)."),
])

messages = [{"role": "user", "content": "Is AI trust related to age group?"}]
first = llm.chat(messages, tools=tools.schemas())

show("Model asked to call", first.tool_calls)
print("Did it answer directly?", first.content)
"""),
    md("""
### Closing the loop

You run the function, append the result as a `tool` message, and call the model again.
That append-and-recall is the whole mechanism.
"""),
    code("""
call = first.tool_calls[0]
result = tools.call(call["name"], call["arguments"])       # <-- your code runs, not the model's
show("Tool returned", result)

messages += [
    {"role": "assistant", "tool_calls": first.tool_calls},
    {"role": "tool", "name": call["name"], "content": str(result)},
]
final = llm.chat(messages, tools=tools.schemas())
print("\\nFinal answer:", final.content)
"""),
    md("""
### Validate before you execute

The model can emit arguments that don't match your schema. Never call a function on
unvalidated model output — this is the single most common agent security hole.
Pydantic (which the course expects you to know) gives you the check in three lines.
"""),
    code("""
from pydantic import BaseModel, ValidationError, field_validator

ALLOWED = {"age_group", "trusts_ai", "education", "region"}

class CrosstabArgs(BaseModel):
    row_var: str
    col_var: str

    @field_validator("row_var", "col_var")
    @classmethod
    def must_be_known_column(cls, v: str) -> str:
        if v not in ALLOWED:
            raise ValueError(f"unknown column {v!r}; allowed: {sorted(ALLOWED)}")
        return v

banner("Good arguments")
show("parsed", CrosstabArgs(**call["arguments"]).model_dump())

banner("Hallucinated column - rejected before it reaches your data")
try:
    CrosstabArgs(row_var="age_group", col_var="respondent_ssn")
except ValidationError as e:
    print(e.errors()[0]["msg"])
"""),
    md("""
### The same thing in LangChain

The course teaches LangChain. This is the identical idea in its syntax — the cell is
guarded so it prints the equivalent code if the package isn't installed yet.

```python
from langchain_core.tools import tool

@tool
def crosstab(row_var: str, col_var: str) -> dict:
    \"\"\"Cross-tabulate two survey columns and return a chi-square test.\"\"\"
    ...

llm_with_tools = ChatOpenAI(model="gpt-4o-mini").bind_tools([crosstab])
```

LangChain reads the type hints and docstring to build the schema you just wrote by
hand. Knowing what it generates is what lets you debug it.
"""),
    code("""
try:
    from langchain_core.tools import tool

    @tool
    def crosstab_lc(row_var: str, col_var: str) -> dict:
        \"\"\"Cross-tabulate two survey columns and return a chi-square test.\"\"\"
        return {"row": row_var, "col": col_var}

    show("LangChain generated this schema", crosstab_lc.args_schema.model_json_schema())
except ImportError:
    print("langchain-core not installed - see requirements.txt.")
    print("Compare with the hand-written schema above; they carry the same information.")
"""),
    md("""
---
### Try it yourself

1. Add a `filter_respondents(min_age: int, region: str)` tool and re-run.
2. Make the stub request a column that isn't in `ALLOWED`. Where does it fail, and
   what would you send back to the model so it can retry?
3. What should happen if the tool itself raises? Sketch the `tool` message you'd append.
"""),
]

# ===========================================================================
# 03 — The agent loop (ReAct)
# ===========================================================================
NB03 = [
    md("""
## From one tool call to an agent

Notebook 02 did a single call. An **agent** is that step in a `while` loop: the model
keeps requesting tools until it decides it can answer. The classic framing is
**ReAct** — *Reason, then Act* — where the model interleaves thinking with tool use.

The loop is about fifteen lines. Frameworks add retries, streaming and tracing on top,
but if you can write this you can debug any of them.
"""),
    code("""
tools = ToolBox()

@tools.tool("Count respondents matching a filter", schema(column='string', value='string'))
def count_where(column: str, value: str) -> dict:
    table = {("age_group", "18-29"): 412, ("age_group", "60+"): 388}
    return {"n": table.get((column, value), 0)}

@tools.tool("Mean trust score (1-5) for a subgroup", schema(column='string', value='string'))
def mean_trust(column: str, value: str) -> dict:
    table = {("age_group", "18-29"): 2.81, ("age_group", "60+"): 3.44}
    return {"mean_trust": table.get((column, value))}

print(tools.describe())
"""),
    md("""
### The loop itself

Three things worth noticing:

- **`max_steps` is not optional.** Without it a confused model loops forever and bills you.
- Every tool result is appended to `messages`. The growing list *is* the agent's memory
  within a run — which is why context management (notebook 04) matters so fast.
- The loop exits when the model returns `content` instead of `tool_calls`.
"""),
    code("""
def run_agent(llm, tools: ToolBox, question: str, max_steps: int = 6) -> str:
    messages = [
        {"role": "system", "content": f"You answer survey questions using tools:\\n{tools.describe()}"},
        {"role": "user", "content": question},
    ]
    for step in range(1, max_steps + 1):
        resp = llm.chat(messages, tools=tools.schemas())

        if not resp.wants_tool:
            trace(step, "model", f"final answer: {resp.content}")
            return resp.content

        for call in resp.tool_calls:
            trace(step, "model", f"call {call['name']}({call['arguments']})")
            try:
                result = tools.call(call["name"], call["arguments"])
            except Exception as exc:                    # feed errors back, don't crash
                result = {"error": f"{type(exc).__name__}: {exc}"}
            trace(step, "tool", f"-> {result}")
            messages.append({"role": "assistant", "tool_calls": [call]})
            messages.append({"role": "tool", "name": call["name"], "content": str(result)})

    return "[stopped: hit max_steps without a final answer]"
"""),
    code("""
llm = get_llm([
    LLMResponse(tool_calls=[{"name": "mean_trust", "arguments": {"column": "age_group", "value": "18-29"}}]),
    LLMResponse(tool_calls=[{"name": "mean_trust", "arguments": {"column": "age_group", "value": "60+"}}]),
    LLMResponse(content="Under-30s average 2.81 vs 3.44 for 60+, so trust rises with age."),
])

banner("Agent transcript")
answer = run_agent(llm, tools, "Do younger and older respondents differ in AI trust?")
print("\\nRETURNED:", answer)
"""),
    md("""
### Failure modes you will actually hit

Two runs below. The first shows a tool erroring — the agent should recover, not crash.
The second shows a model that never stops asking. Both are the reason `max_steps`
and the `try/except` exist.
"""),
    code("""
banner("1. Tool raises - error is fed back as an observation")
llm_err = get_llm([
    LLMResponse(tool_calls=[{"name": "no_such_tool", "arguments": {}}]),
    LLMResponse(content="That tool does not exist; I used the available ones instead."),
], verbose=False)
run_agent(llm_err, tools, "trigger an error")

banner("2. Model never converges - max_steps saves you")
llm_loop = get_llm([LLMResponse(
    tool_calls=[{"name": "count_where", "arguments": {"column": "age_group", "value": "18-29"}}]
)] * 20, verbose=False)
print("\\nRETURNED:", run_agent(llm_loop, tools, "loop forever", max_steps=3))
"""),
    md("""
### The same loop in LangChain

```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(ChatOpenAI(model="gpt-4o-mini"), [crosstab, mean_trust])
agent.invoke({"messages": [("user", "Do younger and older respondents differ?")]})
```

One line replaces `run_agent`. It runs the loop you just wrote, plus retries and
tracing. You now know what to look for when its output surprises you.

---
### Try it yourself

1. Add a step counter to the system prompt so the model knows its budget.
2. Change the loop to run *all* `tool_calls` in one step in parallel. When is that wrong?
3. What breaks if you forget to append the `assistant` message before the `tool` message?
"""),
]

# ===========================================================================
# 04 — Context engineering
# ===========================================================================
NB04 = [
    md("""
## Context engineering

A named learning outcome of the course, and the skill that separates agents that work
from agents that almost work. The model has **no memory** — it sees exactly the list
of messages you send, every single call. Context engineering is deciding what goes in
that list and what gets left out.

Three pressures pull against each other:

| Pressure | Symptom when you get it wrong |
|---|---|
| Fit the window | Truncation errors, or silent dropping of the earliest turns |
| Keep what matters | Agent "forgets" a constraint you gave it in step 1 |
| Keep it cheap | Token bill grows quadratically over a long run |
"""),
    code("""
def approx_tokens(messages) -> int:
    \"\"\"Rough count: ~4 characters per token. Good enough for budgeting.\"\"\"
    return sum(len(str(m.get("content", ""))) for m in messages) // 4

conversation = [{"role": "system", "content": "You are a survey analysis assistant. Always cite N."}]
for i in range(1, 13):
    conversation.append({"role": "user", "content": f"Question {i}: break down trust by variable {i}."})
    conversation.append({"role": "assistant", "content": f"Result {i}: mean trust 3.1, N=2041, p<0.05. " * 6})

print(f"{len(conversation)} messages, ~{approx_tokens(conversation)} tokens")
"""),
    md("""
### Strategy 1 — sliding window

Keep the system prompt plus the last *k* turns. Cheap and simple. The failure mode is
obvious once you see it: instructions from early turns fall off the edge.
"""),
    code("""
def sliding_window(messages, keep: int = 6):
    system = [m for m in messages if m["role"] == "system"]
    return system + messages[-keep:]

windowed = sliding_window(conversation)
print(f"{len(windowed)} messages, ~{approx_tokens(windowed)} tokens "
      f"({100 - approx_tokens(windowed) * 100 // approx_tokens(conversation)}% smaller)")
show("First kept turn", windowed[1]["content"][:80])
print("\\nNote: questions 1-9 are gone. If Q2 set a constraint, it is now invisible.")
"""),
    md("""
### Strategy 2 — compaction

Summarise the old turns into one message instead of dropping them. This is what
Claude Code and most production agents do when a session gets long.
"""),
    code("""
def compact(messages, keep_recent: int = 4):
    system = [m for m in messages if m["role"] == "system"]
    body = [m for m in messages if m["role"] != "system"]
    old, recent = body[:-keep_recent], body[-keep_recent:]
    if not old:
        return messages
    facts = [m["content"].split(":")[0] for m in old if m["role"] == "user"]
    summary = {"role": "system",
               "content": "Earlier in this session the user asked about: " + "; ".join(facts) + "."}
    return system + [summary] + recent

compacted = compact(conversation)
print(f"{len(compacted)} messages, ~{approx_tokens(compacted)} tokens")
show("Compaction message", compacted[1]["content"])
"""),
    md("""
### Strategy 3 — structured output

Free-text answers are expensive to carry and impossible to assert on. Forcing the model
to return a schema shrinks context *and* makes the result testable — which is how you
put an agent in a pipeline instead of a chat window.
"""),
    code("""
from pydantic import BaseModel, Field

class Finding(BaseModel):
    variable: str
    effect: str = Field(description="direction of association")
    p_value: float
    n: int

    def one_line(self) -> str:
        sig = "significant" if self.p_value < 0.05 else "not significant"
        return f"{self.variable}: {self.effect} ({sig}, p={self.p_value}, N={self.n})"

raw = '{"variable": "age_group", "effect": "trust rises with age", "p_value": 0.006, "n": 2041}'
finding = Finding.model_validate_json(raw)

show("Parsed and validated", finding.model_dump())
print("\\nCompact form for context:", finding.one_line())
print(f"{len(raw)} chars of JSON -> {len(finding.one_line())} chars carried forward")
"""),
    md("""
### Putting a budget on it

In production you don't choose one strategy — you apply them by budget.
"""),
    code("""
def fit_to_budget(messages, budget_tokens: int = 400):
    for strategy in (lambda m: m, compact, sliding_window):
        candidate = strategy(messages)
        if approx_tokens(candidate) <= budget_tokens:
            print(f"{strategy.__name__ if hasattr(strategy,'__name__') else 'as-is':<16} "
                  f"fits: ~{approx_tokens(candidate)} tokens")
            return candidate
    print("Nothing fits - drop tool results or summarise harder.")
    return sliding_window(messages, keep=2)

banner("Budget 400 tokens")
_ = fit_to_budget(conversation, 400)
banner("Budget 5000 tokens")
_ = fit_to_budget(conversation, 5000)
"""),
    md("""
---
### Try it yourself

1. `compact()` keeps only user questions. Rewrite it to preserve any message containing
   a number, then compare token counts.
2. Add a `pinned` flag so a message can never be evicted. Which of your messages need it?
3. Measure: at what conversation length does compaction beat windowing on fidelity?
"""),
]

# ===========================================================================
# 05 — Memory & RAG
# ===========================================================================
NB05 = [
    md("""
## Agent memory: episodic, semantic, retrieval

The syllabus names *vector stores, episodic memory, and RAG*. They solve different problems:

- **Working memory** — the message list. Dies at the end of the run. (Notebook 04.)
- **Episodic memory** — what happened in past sessions. "Last week you asked about region."
- **Semantic memory / RAG** — facts fetched from a corpus at query time, so the model
  answers from *your* data instead of its training set.

RAG is three steps: **embed -> retrieve -> stuff into the prompt.** That's it.
"""),
    code("""
# `embed` here is bag-of-words. Real embeddings are dense vectors from a trained model,
# but the retrieval mechanics below are identical - which is the point.
v = embed("Trust in AI is lower among younger respondents")
show("Sparse 'embedding' (first 5 dims)", dict(list(v.items())[:5]))

a = embed("younger respondents distrust AI")
b = embed("pandas groupby aggregates weights")
print(f"\\nsimilar pair   : {cosine(v, a):.3f}")
print(f"unrelated pair : {cosine(v, b):.3f}")
"""),
    md("### Build a store and retrieve against it"),
    code("""
store = VectorStore()
corpus = [
    ("Respondents aged 18-29 report a mean AI trust of 2.81 out of 5.", {"source": "codebook", "var": "age_group"}),
    ("Respondents aged 60+ report a mean AI trust of 3.44 out of 5.",   {"source": "codebook", "var": "age_group"}),
    ("Trust in AI rises with formal education level (p < 0.01).",       {"source": "findings", "var": "education"}),
    ("Survey weights must be applied before reporting any mean.",        {"source": "methods",  "var": "weight"}),
    ("Missing values are coded -9 and must be recoded to None.",         {"source": "methods",  "var": "missing"}),
]
for text, meta in corpus:
    store.add(text, **meta)

print(f"{len(store)} documents indexed\\n")
for score, text, meta in store.search("how does age affect trust in AI?", k=3):
    print(f"  {score:.3f}  [{meta['source']:<8}] {text}")
"""),
    md("""
### The 'A' in RAG — augmenting the prompt

Retrieval is only useful if the retrieved text reaches the model. This function is the
whole of RAG, and the `Cite the source` instruction is what makes the answer checkable.
"""),
    code("""
def rag_prompt(store: VectorStore, question: str, k: int = 3) -> list[dict]:
    hits = store.search(question, k=k)
    context = "\\n".join(f"[{i+1}] ({m['source']}) {t}" for i, (_, t, m) in enumerate(hits))
    return [
        {"role": "system", "content":
            "Answer ONLY from the context below. Cite the source number. "
            "If the context does not contain the answer, say so.\\n\\n" + context},
        {"role": "user", "content": question},
    ]

prompt = rag_prompt(store, "how does age affect trust in AI?")
print(prompt[0]["content"])
"""),
    code("""
llm = get_llm([LLMResponse(content=
    "Trust rises with age: 2.81 for 18-29 vs 3.44 for 60+ [1][2].")])
print("\\nAnswer:", llm.chat(prompt).content)
"""),
    md("""
### The failure RAG is supposed to prevent

Ask something the corpus doesn't cover. A well-instructed model refuses. This is the
behaviour you must test for — silent fabrication is the whole risk of the pattern.
"""),
    code("""
prompt = rag_prompt(store, "what is the median household income of respondents?")
banner("Retrieved context for an unanswerable question")
print(prompt[0]["content"])

llm = get_llm([LLMResponse(content=
    "The context does not contain household income, so I cannot answer that.")], verbose=False)
print("\\nAnswer:", llm.chat(prompt).content)
"""),
    md("""
### Episodic memory

Persist facts *across* sessions, keyed by user. The store is the same; what changes is
that you write to it at the end of a run and read from it at the start of the next.
"""),
    code("""
class EpisodicMemory:
    def __init__(self):
        self._store = VectorStore()

    def remember(self, user: str, fact: str, session: int) -> None:
        self._store.add(fact, user=user, session=session)

    def recall(self, user: str, cue: str, k: int = 2) -> list[str]:
        return [t for _, t, m in self._store.search(cue, k=k * 3) if m["user"] == user][:k]

mem = EpisodicMemory()
mem.remember("peter", "Peter works with Statistics Canada survey microdata.", session=1)
mem.remember("peter", "Peter prefers weighted estimates over raw counts.", session=1)
mem.remember("peter", "Peter is migrating analyses from SAS to Python.", session=2)
mem.remember("dana",  "Dana studies labour force participation.", session=1)

show("Recalled for peter", mem.recall("peter", "should I weight these estimates?"))
show("Recalled for dana",  mem.recall("dana", "should I weight these estimates?"))
"""),
    md("""
### The real thing

```python
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

store = Chroma.from_texts(texts, OpenAIEmbeddings())
retriever = store.as_retriever(search_kwargs={"k": 3})
```

`add`/`search` become `from_texts`/`as_retriever`. Same two operations, real embeddings,
persistence to disk. You have now written the part that Chroma hides.

---
### Try it yourself

1. Retrieval above is lexical — "elderly" won't match "60+". Add a synonym map and
   measure the improvement. This is precisely why dense embeddings exist.
2. Add recency weighting to `EpisodicMemory.recall` so session 2 outranks session 1.
3. Add a `k` that adapts to the token budget from notebook 04.
"""),
]

# ===========================================================================
# 06 — LangGraph
# ===========================================================================
NB06 = [
    md("""
## LangGraph: when a loop isn't enough

The ReAct loop in notebook 03 is one shape: *model -> tool -> model*. Real workflows
branch, retry, and pause for a human. LangGraph models that as an explicit
**state machine**: typed state, nodes that transform it, edges that decide what runs next.

If you've written SAS macros with `%IF` branching, this is the same idea with the
control flow made into data you can inspect.

We build the machine ourselves first, then show the LangGraph syntax.
"""),
    code("""
from dataclasses import dataclass, field
from typing import Callable

@dataclass
class AnalysisState:
    \"\"\"Typed state, threaded through every node. LangGraph calls this the schema.\"\"\"
    question: str
    hypothesis: str = ""
    result: dict = field(default_factory=dict)
    critique: str = ""
    attempts: int = 0
    done: bool = False
    log: list = field(default_factory=list)

    def note(self, msg: str) -> None:
        self.log.append(msg)
"""),
    md("### Nodes: plain functions, state in -> state out"),
    code("""
def form_hypothesis(s: AnalysisState) -> AnalysisState:
    s.hypothesis = "AI trust differs by age group"
    s.note(f"hypothesis: {s.hypothesis}")
    return s

def run_test(s: AnalysisState) -> AnalysisState:
    s.attempts += 1
    # First attempt 'forgets' survey weights - deliberately, so review can catch it.
    s.result = ({"chi2": 12.41, "p": 0.006, "weighted": s.attempts > 1, "n": 2041})
    s.note(f"attempt {s.attempts}: p={s.result['p']}, weighted={s.result['weighted']}")
    return s

def review(s: AnalysisState) -> AnalysisState:
    if not s.result.get("weighted"):
        s.critique = "Estimates are unweighted; survey weights are required."
    else:
        s.critique = ""
        s.done = True
    s.note(f"review: {s.critique or 'passed'}")
    return s
"""),
    md("""
### Edges: the routing function

This is the piece that makes it a graph rather than a script. `route` reads state and
names the next node. Note the attempt cap — a cyclic graph without one is an infinite bill.
"""),
    code("""
def route(s: AnalysisState) -> str:
    if s.done:
        return "END"
    if s.critique and s.attempts < 3:
        return "run_test"          # cycle back and retry
    if s.attempts >= 3:
        return "END"
    return "review"

NODES: dict[str, Callable] = {"form_hypothesis": form_hypothesis, "run_test": run_test, "review": review}

def run_graph(state: AnalysisState, start: str = "form_hypothesis") -> AnalysisState:
    node, step = start, 0
    order = {"form_hypothesis": "run_test", "run_test": "review"}
    while node != "END" and step < 12:
        step += 1
        state = NODES[node](state)
        node = route(state) if node == "review" else order[node]
        trace(step, node if node != "END" else "END", state.log[-1])
    return state

banner("Graph execution")
final = run_graph(AnalysisState(question="Does AI trust vary by age?"))
print(f"\\nfinished after {final.attempts} attempts, done={final.done}")
show("final result", final.result)
"""),
    md("""
### Human in the loop

The syllabus calls for approval gates. In a state machine that's just a node that
returns without advancing — the graph checkpoints, and you resume it later with a decision.
"""),
    code("""
@dataclass
class Gate:
    pending: dict | None = None

    def request(self, action: str, detail: dict) -> str:
        self.pending = {"action": action, "detail": detail}
        return f"PAUSED - awaiting approval to {action}"

    def resume(self, approved: bool) -> str:
        act = self.pending["action"]
        self.pending = None
        return f"{'EXECUTED' if approved else 'REJECTED'}: {act}"

gate = Gate()
print(gate.request("publish findings to the shared report", final.result))
print(gate.resume(approved=True))
"""),
    md("""
### The LangGraph syntax

```python
from langgraph.graph import StateGraph, END

g = StateGraph(AnalysisState)
g.add_node("hypothesis", form_hypothesis)
g.add_node("test", run_test)
g.add_node("review", review)

g.set_entry_point("hypothesis")
g.add_edge("hypothesis", "test")
g.add_edge("test", "review")
g.add_conditional_edges("review", route, {"run_test": "test", "END": END})

app = g.compile(checkpointer=MemorySaver())   # checkpointer = the pause/resume above
app.invoke({"question": "Does AI trust vary by age?"})
```

`add_node`, `add_edge`, `add_conditional_edges` — the three calls map exactly to
`NODES`, `order` and `route`.
"""),
    code("""
try:
    from langgraph.graph import StateGraph, END
    print("langgraph is installed - port the graph above as an exercise.")
except ImportError:
    print("langgraph not installed (see requirements.txt).")
    print("The hand-built graph above is behaviourally equivalent.")
"""),
    md("""
---
### Try it yourself

1. Add a `needs_more_data` node that the router can reach when `n < 500`.
2. Move the attempt cap into state so it is inspectable, not hidden in `route`.
3. Draw the graph. Which edges are conditional? That set is your test matrix.
"""),
]

# ===========================================================================
# 07 — MCP
# ===========================================================================
NB07 = [
    md("""
## Model Context Protocol

MCP is on the syllabus, and it answers a question the earlier notebooks left open:
your tools were Python functions *in the same process as the agent*. MCP makes tools a
**service** the agent connects to — so one tool server works with any MCP-speaking client
(Claude Desktop, Claude Code, an agent you write), in any language.

The protocol is JSON-RPC 2.0. Three methods carry most of the weight:

| Method | Meaning |
|---|---|
| `tools/list` | what can I call? |
| `tools/call` | run one |
| `resources/read` | read a document/dataset by URI |
"""),
    code("""
import json

# A server's reply to tools/list. Note it is the same JSON Schema as notebook 02 -
# MCP standardises the transport, not the schema.
tools_list_response = {
    "jsonrpc": "2.0", "id": 1,
    "result": {"tools": [
        {"name": "crosstab",
         "description": "Cross-tabulate two survey variables",
         "inputSchema": schema(row_var="string", col_var="string")},
        {"name": "codebook_lookup",
         "description": "Look up a variable definition in the survey codebook",
         "inputSchema": schema(variable="string")},
    ]},
}
print(json.dumps(tools_list_response, indent=2))
"""),
    md("### A minimal server, protocol-accurate"),
    code("""
class MiniMCPServer:
    \"\"\"Handles the three core methods. Real servers add auth, streaming and resources.\"\"\"

    def __init__(self, name: str):
        self.name = name
        self._tools: dict[str, tuple[str, dict, callable]] = {}
        self._resources: dict[str, str] = {}

    def add_tool(self, name, description, input_schema, fn):
        self._tools[name] = (description, input_schema, fn)

    def add_resource(self, uri, content):
        self._resources[uri] = content

    def handle(self, request: dict) -> dict:
        method, rid, params = request["method"], request.get("id"), request.get("params", {})
        try:
            if method == "tools/list":
                result = {"tools": [{"name": n, "description": d, "inputSchema": s}
                                    for n, (d, s, _) in self._tools.items()]}
            elif method == "tools/call":
                name = params["name"]
                if name not in self._tools:
                    raise KeyError(f"unknown tool {name!r}")
                out = self._tools[name][2](**params.get("arguments", {}))
                result = {"content": [{"type": "text", "text": json.dumps(out)}]}
            elif method == "resources/read":
                uri = params["uri"]
                result = {"contents": [{"uri": uri, "text": self._resources[uri]}]}
            else:
                raise ValueError(f"unsupported method {method!r}")
            return {"jsonrpc": "2.0", "id": rid, "result": result}
        except Exception as exc:
            # JSON-RPC errors are data, not exceptions - the client must see them.
            return {"jsonrpc": "2.0", "id": rid,
                    "error": {"code": -32602, "message": f"{type(exc).__name__}: {exc}"}}
"""),
    code("""
server = MiniMCPServer("survey-tools")
server.add_tool("crosstab", "Cross-tabulate two survey variables",
                schema(row_var="string", col_var="string"),
                lambda row_var, col_var: {"chi2": 12.41, "p": 0.006, "n": 2041})
server.add_tool("codebook_lookup", "Look up a variable definition",
                schema(variable="string"),
                lambda variable: {"variable": variable, "label": "Trust in AI (1-5)", "missing": -9})
server.add_resource("survey://codebook/ai_trust", "trusts_ai: 1=none ... 5=complete; -9=missing")

banner("tools/list")
print(json.dumps(server.handle({"jsonrpc": "2.0", "id": 1, "method": "tools/list"}), indent=2)[:400])

banner("tools/call")
show("response", server.handle({"jsonrpc": "2.0", "id": 2, "method": "tools/call",
     "params": {"name": "crosstab", "arguments": {"row_var": "age_group", "col_var": "trusts_ai"}}}))

banner("resources/read")
show("response", server.handle({"jsonrpc": "2.0", "id": 3, "method": "resources/read",
     "params": {"uri": "survey://codebook/ai_trust"}}))

banner("error path - unknown tool")
show("response", server.handle({"jsonrpc": "2.0", "id": 4, "method": "tools/call",
     "params": {"name": "drop_database", "arguments": {}}}))
"""),
    md("""
### Wiring a server into the agent loop

An MCP client turns `tools/list` into the schemas you pass to the model, and routes the
model's requests to `tools/call`. Ten lines — and it is why the loop from notebook 03
needs no changes to gain remote tools.
"""),
    code("""
class MCPClient:
    def __init__(self, server: MiniMCPServer):
        self._server, self._id = server, 0

    def _rpc(self, method, params=None):
        self._id += 1
        resp = self._server.handle({"jsonrpc": "2.0", "id": self._id,
                                    "method": method, "params": params or {}})
        if "error" in resp:
            raise RuntimeError(resp["error"]["message"])
        return resp["result"]

    def as_toolbox(self) -> ToolBox:
        tb = ToolBox()
        for t in self._rpc("tools/list")["tools"]:
            name = t["name"]
            tb.register(Tool(name, t["description"], t["inputSchema"],
                             lambda _n=name, **kw: self._rpc("tools/call",
                                                             {"name": _n, "arguments": kw})))
        return tb

remote_tools = MCPClient(server).as_toolbox()
print(remote_tools.describe())
show("Called over the protocol", remote_tools.call("codebook_lookup", {"variable": "trusts_ai"}))
"""),
    md("""
### The real SDK

The `mcp` package is already in requirements.txt. A production server is:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("survey-tools")

@mcp.tool()
def crosstab(row_var: str, col_var: str) -> dict:
    \"\"\"Cross-tabulate two survey variables.\"\"\"
    ...

mcp.run(transport="stdio")
```

Point Claude Desktop at that command and the tool appears in the client. The JSON-RPC
you just hand-wrote is what flows over stdio.
"""),
    code("""
try:
    import mcp
    print(f"mcp {getattr(mcp, '__version__', 'installed')} is available.")
    print("Exercise: port MiniMCPServer to FastMCP and connect it to Claude Desktop.")
except ImportError:
    print("mcp not installed - pip install mcp")
"""),
    md("""
---
### Try it yourself

1. Add `prompts/list` — MCP servers can ship reusable prompt templates too.
2. `tools/call` currently trusts its arguments. Add the pydantic gate from notebook 02.
3. Why does MCP separate *resources* (read a document) from *tools* (run an action)?
"""),
]

# ===========================================================================
# 08 — Multi-agent / AutoGen
# ===========================================================================
NB08 = [
    md("""
## Multi-agent systems

The syllabus lists **AutoGen** and "autonomous multi-agent systems design". The premise:
several narrow agents with distinct roles and tools often beat one agent with a long
prompt — because each has a smaller job, a smaller context, and a clearer failure mode.

Three orchestration patterns cover most real systems:

1. **Sequential (pipeline)** — analyst -> reviewer -> writer.
2. **Group chat with a manager** — a router picks who speaks next.
3. **Hand-off** — an agent transfers control when the task leaves its remit.

The cost is real: more agents means more calls, more latency, and more places to lose
information at a boundary.
"""),
    code("""
from dataclasses import dataclass, field

@dataclass
class Agent:
    name: str
    role: str
    llm: object
    tools: ToolBox | None = None
    received: list = field(default_factory=list)

    def act(self, message: str) -> str:
        self.received.append(message)
        prompt = [{"role": "system", "content": self.role}, {"role": "user", "content": message}]
        reply = self.llm.chat(prompt, tools=self.tools.schemas() if self.tools else None)
        if reply.wants_tool and self.tools:
            call = reply.tool_calls[0]
            result = self.tools.call(call["name"], call["arguments"])
            return f"[{self.name} used {call['name']}] {result}"
        return reply.content
"""),
    md("### Pattern 1 — sequential pipeline"),
    code("""
stats = ToolBox()

@stats.tool("Chi-square test of independence", schema(row_var='string', col_var='string'))
def chi_square(row_var: str, col_var: str) -> dict:
    return {"chi2": 12.41, "dof": 3, "p": 0.006, "n": 2041, "weighted": False}

analyst = Agent("Analyst", "You run statistical tests.",
                get_llm([LLMResponse(tool_calls=[{"name": "chi_square",
                        "arguments": {"row_var": "age_group", "col_var": "trusts_ai"}}])], verbose=False),
                tools=stats)

reviewer = Agent("Reviewer", "You check methodology. Be sceptical.",
                 get_llm([LLMResponse(content="REJECT: result is unweighted; "
                                              "survey weights are required before reporting.")], verbose=False))

writer = Agent("Writer", "You write plain-language summaries.",
               get_llm([LLMResponse(content="Older respondents report higher trust in AI "
                                            "(chi2=12.41, p=0.006, N=2041, weighted).")], verbose=False))

banner("Sequential pipeline")
msg = "Test whether AI trust varies by age group."
for step, agent in enumerate([analyst, reviewer, writer], start=1):
    msg = agent.act(msg)
    trace(step, agent.name, msg)
"""),
    md("""
### Why the reviewer matters

Notice the reviewer caught the unweighted estimate. A single agent asked to
"analyse and check your work" tends not to — the same context that produced the error
is being used to judge it. **Separate context is the mechanism**, not the extra prompt.
"""),
    md("### Pattern 2 — group chat with a manager"),
    code("""
class GroupChat:
    \"\"\"A manager routes each turn. AutoGen's GroupChatManager, minus the machinery.\"\"\"

    def __init__(self, agents: list[Agent], manager_llm):
        self.agents = {a.name: a for a in agents}
        self.manager = manager_llm
        self.transcript: list[tuple[str, str]] = []

    def run(self, task: str, max_turns: int = 5) -> list:
        message = task
        for turn in range(1, max_turns + 1):
            choice = self.manager.chat([
                {"role": "system", "content": f"Pick the next speaker from {list(self.agents)}, "
                                              "or reply DONE."},
                {"role": "user", "content": message},
            ]).content.strip()

            if choice == "DONE" or choice not in self.agents:
                trace(turn, "manager", f"DONE ({choice})")
                break
            trace(turn, "manager", f"-> {choice}")
            message = self.agents[choice].act(message)
            trace(turn, choice, message)
            self.transcript.append((choice, message))
        return self.transcript

manager = get_llm([LLMResponse(content="Analyst"), LLMResponse(content="Reviewer"),
                   LLMResponse(content="Writer"), LLMResponse(content="DONE")], verbose=False)

for a in (analyst, reviewer, writer):
    a.llm.reset() if hasattr(a.llm, "reset") else None

banner("Group chat")
chat = GroupChat([analyst, reviewer, writer], manager)
_ = chat.run("Test whether AI trust varies by age group and summarise it.")
"""),
    md("""
### Pattern 3 — hand-off

An agent decides the task isn't its job and transfers, carrying a summary. The summary
is the risky part: everything not in it is lost at the boundary.
"""),
    code("""
def handoff(from_agent: str, to_agent: str, summary: str) -> dict:
    return {"type": "handoff", "from": from_agent, "to": to_agent, "context": summary}

h = handoff("Analyst", "Methodologist",
            "chi2=12.41 p=0.006 N=2041 on age_group x trusts_ai; weights NOT applied")
show("Hand-off payload", h)
print("\\nEverything the Methodologist knows is in 'context'. "
      "Anything the Analyst saw but did not write down is gone.")
"""),
    md("""
### The AutoGen syntax

```python
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

analyst  = AssistantAgent("Analyst",  system_message="You run statistical tests.")
reviewer = AssistantAgent("Reviewer", system_message="You check methodology.")
user     = UserProxyAgent("User", human_input_mode="NEVER", code_execution_config=False)

chat = GroupChat(agents=[user, analyst, reviewer], messages=[], max_round=6)
user.initiate_chat(GroupChatManager(groupchat=chat), message="Test AI trust by age group.")
```

`AssistantAgent` is the `Agent` class above; `GroupChatManager` is the routing loop.

---
### Try it yourself

1. Make the reviewer send work *back* to the analyst instead of forward. What stops a loop?
2. Give each agent its own `ToolBox`. Which tools must the reviewer be denied, and why?
3. Time it: how many model calls did the pipeline use versus one agent? When is that worth it?
"""),
]

# ===========================================================================
# 09 — Capstone
# ===========================================================================
NB09 = [
    md("""
## Capstone: an autonomous survey analysis assistant

The course capstone is "a personalized agentic AI assistant capable of autonomous task
execution." This notebook assembles every previous piece into one system, so you arrive
at the course with a working reference implementation rather than a blank file.

| Component | Notebook |
|---|---|
| Tools + validated arguments | 02 |
| Agent loop with a step budget | 03 |
| Context budget | 04 |
| RAG over the codebook + episodic memory | 05 |
| State machine with retry and approval gate | 06 |
| Tools served over MCP | 07 |
| Analyst / reviewer / writer roles | 08 |
"""),
    code("""
# --- Knowledge base (notebook 05) ------------------------------------------
kb = VectorStore()
for text, src in [
    ("trusts_ai: trust in AI, 1=none to 5=complete. Missing coded -9.", "codebook"),
    ("age_group: 18-29, 30-44, 45-59, 60+.", "codebook"),
    ("All estimates must use the survey weight variable wt_final.", "methods"),
    ("Chi-square requires expected cell counts of at least 5.", "methods"),
]:
    kb.add(text, source=src)

# --- Tools (notebook 02) ----------------------------------------------------
tools = ToolBox()

@tools.tool("Look up a variable in the codebook", schema(variable='string'))
def lookup(variable: str) -> dict:
    hits = kb.search(variable, k=1)
    return {"variable": variable, "definition": hits[0][1] if hits else "not found"}

@tools.tool("Chi-square test between two survey variables",
            schema(row_var='string', col_var='string', weighted='string'))
def chi_square(row_var: str, col_var: str, weighted: str = "false") -> dict:
    return {"row": row_var, "col": col_var, "chi2": 12.41, "dof": 3,
            "p": 0.006, "n": 2041, "weighted": weighted == "true"}

print(tools.describe())
"""),
    md("### The assistant"),
    code("""
class SurveyAssistant:
    def __init__(self, kb: VectorStore, tools: ToolBox, user: str):
        self.kb, self.tools, self.user = kb, tools, user
        self.memory = VectorStore()          # episodic, across runs
        self.audit: list[dict] = []          # every tool call, for reproducibility

    def _grounded_prompt(self, question: str) -> list[dict]:
        context = "\\n".join(t for _, t, _ in self.kb.search(question, k=3))
        recalled = [t for _, t, _ in self.memory.search(question, k=2)]
        system = f"You analyse survey data.\\n\\nMethods notes:\\n{context}"
        if recalled:
            system += "\\n\\nRemembered from earlier sessions:\\n" + "\\n".join(recalled)
        return [{"role": "system", "content": system}, {"role": "user", "content": question}]

    def analyse(self, llm, question: str, max_steps: int = 5) -> dict:
        messages = self._grounded_prompt(question)
        for step in range(1, max_steps + 1):
            resp = llm.chat(messages, tools=self.tools.schemas())
            if not resp.wants_tool:
                trace(step, "assistant", resp.content)
                return {"answer": resp.content, "audit": self.audit}
            call = resp.tool_calls[0]
            result = self.tools.call(call["name"], call["arguments"])
            self.audit.append({"step": step, **call, "result": result})
            trace(step, call["name"], str(result))
            messages.append({"role": "tool", "name": call["name"], "content": str(result)})
        return {"answer": "[hit step budget]", "audit": self.audit}

    def remember(self, fact: str) -> None:
        self.memory.add(fact, user=self.user)
"""),
    md("""
### Run 1 — the reviewer catches an unweighted estimate

This is the whole system working: retrieval supplies the weighting rule, the agent loop
runs the test, the review node rejects it, the graph retries, and the gate asks a human.
"""),
    code("""
assistant = SurveyAssistant(kb, tools, user="peter")

llm = get_llm([
    LLMResponse(tool_calls=[{"name": "lookup", "arguments": {"variable": "trusts_ai"}}]),
    LLMResponse(tool_calls=[{"name": "chi_square",
                             "arguments": {"row_var": "age_group", "col_var": "trusts_ai",
                                           "weighted": "false"}}]),
    LLMResponse(content="Trust differs by age group (chi2=12.41, p=0.006, N=2041)."),
])

banner("Run 1: unweighted")
run1 = assistant.analyse(llm, "Does trust in AI vary by age group?")

def review(audit: list[dict]) -> str:
    for entry in audit:
        if entry["name"] == "chi_square" and not entry["result"]["weighted"]:
            return "REJECT: estimate is unweighted; wt_final is required."
    return ""

verdict = review(run1["audit"])
print("\\nReviewer:", verdict or "passed")
"""),
    code("""
banner("Run 2: retry with weights applied")
llm2 = get_llm([
    LLMResponse(tool_calls=[{"name": "chi_square",
                             "arguments": {"row_var": "age_group", "col_var": "trusts_ai",
                                           "weighted": "true"}}]),
    LLMResponse(content="Weighted: trust rises with age (chi2=12.41, p=0.006, N=2041)."),
], verbose=False)

assistant.audit.clear()
run2 = assistant.analyse(llm2, "Re-run weighted: does trust in AI vary by age group?")
print("\\nReviewer:", review(run2["audit"]) or "passed")

banner("Approval gate before anything leaves the system")
print("PAUSED - publish this finding to the shared report? [y/N]")
print("resume(approved=True) ->", "PUBLISHED:", run2["answer"])
"""),
    md("### Audit trail — the thing that makes it defensible"),
    code("""
show("Every tool call this run", run2["audit"])

assistant.remember("Peter requires weighted estimates using wt_final.")
assistant.remember("Peter analyses the AI trust survey, focusing on age effects.")
banner("Carried into the next session")
show("recall", [t for _, t, _ in assistant.memory.search("how should I compute means?", k=2)])
"""),
    md("""
---
## Where you are

You can now write, from scratch: a tool schema, a validated function-call loop, a
context budget, a vector store and RAG prompt, a state machine with retry and a human
gate, an MCP server and client, and three multi-agent orchestration patterns.

The course will hand you LangChain, LangGraph, MCP and AutoGen. You will recognise every
one of them as a wrapper around something in these notebooks — which is the difference
between using a framework and debugging one.

### Before the course starts (Oct 5, 2026)

1. Create a venv and install `requirements.txt`; re-run notebooks 02-09 for real.
2. Get an API key and set `OPENAI_API_KEY`, then re-run. Every notebook switches over
   with no code change — watch where the stub's determinism was hiding real variance.
3. Port one notebook to the real framework: 03 to `create_react_agent`, or 06 to `StateGraph`.
4. Swap the capstone's fake `chi_square` for real `pandas` + `scipy` against
   `data/ai_trust_insights.csv`.
"""),
]


def main() -> None:
    NB_DIR.mkdir(exist_ok=True)
    build("02_tools_and_function_calling.ipynb",
          "Tools & Function Calling", "Week 1-2 - function calling", NB02)
    build("03_the_agent_loop_react.ipynb",
          "The Agent Loop (ReAct)", "Week 1-2 - agent fundamentals", NB03)
    build("04_context_engineering.ipynb",
          "Context Engineering", "Week 2-3 - context engineering", NB04)
    build("05_agent_memory_and_rag.ipynb",
          "Agent Memory, Vector Stores & RAG", "Week 3-4 - memory & RAG", NB05)
    build("06_langgraph_state_machines.ipynb",
          "LangGraph State Machines", "Week 4 - orchestration", NB06)
    build("07_model_context_protocol.ipynb",
          "Model Context Protocol (MCP)", "Week 5 - MCP", NB07)
    build("08_multi_agent_autogen.ipynb",
          "Multi-Agent Systems & AutoGen", "Week 5-6 - multi-agent", NB08)
    build("09_capstone_survey_assistant.ipynb",
          "Capstone: Autonomous Survey Assistant", "Week 6 - capstone", NB09)


if __name__ == "__main__":
    main()
