"""
agentkit.py — shared helpers for the WatSPEED Agentic AI prep notebooks.

Why this exists
---------------
The WatSPEED course requires "access to a reasoning language model API (may
require a paid subscription)". These notebooks are for the weeks *before* the
course, so every concept here runs with **no API key and no network**, using a
deterministic stub model. Every notebook then shows the real provider call in a
clearly-marked cell you can switch on later.

Deterministic means: same input -> same output, every run. That makes saved
notebook outputs trustworthy and makes the notebooks diffable in git.

Switching to a real model
-------------------------
    import os
    os.environ["OPENAI_API_KEY"] = "sk-..."     # only OPENAI_API_KEY is read
    llm = get_llm()          # returns a real client wrapper if a key is present

With no key set, get_llm() returns StubLLM and says so.
"""

from __future__ import annotations

import json
import os
import re
import textwrap
from dataclasses import dataclass, field
from typing import Any, Callable, Iterable


# ---------------------------------------------------------------------------
# 1. Tool registry — the mechanism underneath LangChain's @tool decorator
# ---------------------------------------------------------------------------

@dataclass
class Tool:
    """A function the model is allowed to call, plus the schema describing it."""
    name: str
    description: str
    parameters: dict[str, Any]
    fn: Callable[..., Any]

    def to_openai_schema(self) -> dict[str, Any]:
        """The JSON shape the OpenAI Chat Completions API expects.

        NOTE: Anthropic's Messages API uses a DIFFERENT, flatter shape:
            {"name": ..., "description": ..., "input_schema": {...}}
        with no "type"/"function" wrapper. Use to_anthropic_schema() for that.
        """
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters,
            },
        }

    def to_anthropic_schema(self) -> dict[str, Any]:
        """The JSON shape the Anthropic Messages API expects.

        Flat, and the schema key is `input_schema` rather than `parameters`.
        Passing the OpenAI shape here returns a 400.
        """
        return {
            "name": self.name,
            "description": self.description,
            "input_schema": self.parameters,
        }

    def __call__(self, **kwargs: Any) -> Any:
        return self.fn(**kwargs)


class ToolBox:
    """Holds tools and dispatches calls by name. ~40 lines; LangChain's is ~2000."""

    def __init__(self) -> None:
        self._tools: dict[str, Tool] = {}

    def tool(self, description: str, parameters: dict[str, Any]) -> Callable:
        """Decorator. Mirrors `@tool` in LangChain, but you can read the source."""
        def wrap(fn: Callable[..., Any]) -> Tool:
            t = Tool(fn.__name__, description, parameters, fn)
            self._tools[t.name] = t
            return t
        return wrap

    def register(self, t: Tool) -> None:
        self._tools[t.name] = t

    def schemas(self) -> list[dict[str, Any]]:
        return [t.to_openai_schema() for t in self._tools.values()]

    def names(self) -> list[str]:
        return list(self._tools)

    def describe(self) -> str:
        """Plain-text tool list — what you paste into a ReAct system prompt."""
        return "\n".join(
            f"- {t.name}({', '.join(t.parameters.get('properties', {}))}): {t.description}"
            for t in self._tools.values()
        )

    def call(self, name: str, arguments: dict[str, Any]) -> Any:
        if name not in self._tools:
            raise KeyError(f"No tool named {name!r}. Available: {self.names()}")
        return self._tools[name](**arguments)


def schema(**properties: str) -> dict[str, Any]:
    """Tiny helper to build a JSON-Schema object. schema(city='string')."""
    return {
        "type": "object",
        "properties": {k: {"type": v} for k, v in properties.items()},
        "required": list(properties),
    }


# ---------------------------------------------------------------------------
# 2. Deterministic stub model
# ---------------------------------------------------------------------------

@dataclass
class LLMResponse:
    """Mirrors the shape a real chat-completions response gives you."""
    content: str | None = None
    tool_calls: list[dict[str, Any]] = field(default_factory=list)

    @property
    def wants_tool(self) -> bool:
        return bool(self.tool_calls)


class StubLLM:
    """
    A scripted 'model'. It does not think — it pattern-matches, so the notebooks
    produce identical output on every machine.

    You drive it with `script`: a list of LLMResponse objects returned in order.
    That is enough to demonstrate every agent control-flow pattern in the course
    (tool calling, ReAct loops, reflection, hand-off) without a network call.
    """

    name = "stub-llm (deterministic, offline)"

    def __init__(self, script: Iterable[LLMResponse] | None = None) -> None:
        self._script = list(script or [])
        self._i = 0
        self.calls: list[list[dict[str, Any]]] = []   # message history per call

    def chat(self, messages: list[dict[str, Any]], tools=None) -> LLMResponse:
        self.calls.append(messages)
        if self._i < len(self._script):
            resp = self._script[self._i]
            self._i += 1
            return resp
        # Fallback: echo a summary so an unscripted call is obvious, not a crash.
        last = messages[-1].get("content", "") if messages else ""
        return LLMResponse(content=f"[stub] no script step left; last input was: {last!r}")

    def reset(self) -> None:
        self._i = 0
        self.calls.clear()


class RealLLM:
    """Thin wrapper over the OpenAI SDK so notebooks can switch with one line."""

    def __init__(self, model: str = "gpt-4.1-mini") -> None:
        from openai import OpenAI          # imported lazily; optional dependency
        self._client = OpenAI()
        self.model = model
        self.name = f"openai:{model}"

    def chat(self, messages: list[dict[str, Any]], tools=None) -> LLMResponse:
        kwargs: dict[str, Any] = {"model": self.model, "messages": messages}
        if tools:
            kwargs["tools"] = tools
        msg = self._client.chat.completions.create(**kwargs).choices[0].message
        return LLMResponse(
            content=msg.content,
            tool_calls=[
                {"name": tc.function.name, "arguments": json.loads(tc.function.arguments)}
                for tc in (msg.tool_calls or [])
            ],
        )


def get_llm(script: Iterable[LLMResponse] | None = None, verbose: bool = True):
    """Return a real client if an API key is set, else the deterministic stub."""
    if os.getenv("OPENAI_API_KEY"):
        try:
            llm = RealLLM()
            if verbose:
                print(f"Using {llm.name}")
            return llm
        except Exception as exc:                       # SDK missing, bad key, etc.
            if verbose:
                print(f"Falling back to stub ({exc.__class__.__name__}: {exc})")
    llm = StubLLM(script)
    if verbose:
        print(f"Using {llm.name} - no OPENAI_API_KEY found, so results are scripted.")
    return llm


# ---------------------------------------------------------------------------
# 3. Presentation helpers — keep notebook output readable
# ---------------------------------------------------------------------------

def banner(title: str, char: str = "=") -> None:
    print(f"\n{char * 62}\n{title}\n{char * 62}")


def show(label: str, value: Any) -> None:
    """Print a labelled value, pretty-printing dicts/lists."""
    if isinstance(value, (dict, list)):
        value = json.dumps(value, indent=2, default=str)
    print(f"{label}:\n{textwrap.indent(str(value), '  ')}")


def trace(step: int, actor: str, message: str) -> None:
    """One line of an agent transcript, so loops are legible in output."""
    print(f"  [{step:>2}] {actor:<12} | {message}")


# ---------------------------------------------------------------------------
# 4. Minimal vector store — the idea behind Chroma/FAISS, in 30 lines
# ---------------------------------------------------------------------------

_WORD = re.compile(r"[a-z0-9']+")


def _tokens(text: str) -> list[str]:
    return _WORD.findall(text.lower())


def embed(text: str) -> dict[str, float]:
    """
    A bag-of-words 'embedding'. Real embeddings are dense float vectors from a
    trained model; the *retrieval mechanics* below are identical either way,
    which is the point being taught.
    """
    counts: dict[str, float] = {}
    for tok in _tokens(text):
        counts[tok] = counts.get(tok, 0.0) + 1.0
    norm = sum(v * v for v in counts.values()) ** 0.5 or 1.0
    return {k: v / norm for k, v in counts.items()}


def cosine(a: dict[str, float], b: dict[str, float]) -> float:
    """Cosine similarity of two sparse vectors."""
    smaller, larger = (a, b) if len(a) < len(b) else (b, a)
    return sum(v * larger.get(k, 0.0) for k, v in smaller.items())


class VectorStore:
    """add() / search() — the same two-method surface Chroma and FAISS expose."""

    def __init__(self) -> None:
        self._docs: list[tuple[str, dict[str, Any], dict[str, float]]] = []

    def add(self, text: str, **metadata: Any) -> None:
        self._docs.append((text, metadata, embed(text)))

    def search(self, query: str, k: int = 3) -> list[tuple[float, str, dict[str, Any]]]:
        q = embed(query)
        scored = [(cosine(q, vec), text, meta) for text, meta, vec in self._docs]
        scored.sort(key=lambda row: row[0], reverse=True)
        return [row for row in scored[:k] if row[0] > 0]

    def __len__(self) -> int:
        return len(self._docs)


__all__ = [
    "Tool", "ToolBox", "schema",
    "LLMResponse", "StubLLM", "RealLLM", "get_llm",
    "banner", "show", "trace",
    "embed", "cosine", "VectorStore",
]
