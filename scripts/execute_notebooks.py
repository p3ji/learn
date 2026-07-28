"""
Execute the prep notebooks in place so their outputs are saved to disk.

Run:  python scripts/execute_notebooks.py [nb_glob]

Saved outputs are the point: you can read a notebook and see real results before you
run anything. Because agentkit's stub model is deterministic, re-running produces the
same outputs, so notebooks stay diffable in git.
"""

from __future__ import annotations

import pathlib
import sys

import nbformat
from nbclient import NotebookClient
from nbclient.exceptions import CellExecutionError

ROOT = pathlib.Path(__file__).resolve().parent.parent
NB_DIR = ROOT / "notebooks"


def execute(path: pathlib.Path) -> tuple[bool, str]:
    nb = nbformat.read(path, as_version=4)
    client = NotebookClient(
        nb,
        timeout=180,
        kernel_name="python3",
        resources={"metadata": {"path": str(NB_DIR)}},   # cwd = notebooks/, so agentkit imports
        allow_errors=False,
    )
    try:
        client.execute()
    except CellExecutionError as exc:
        return False, str(exc).strip().splitlines()[-1]
    finally:
        nbformat.write(nb, path)
    return True, f"{sum(1 for c in nb.cells if c.cell_type == 'code')} code cells"


def main() -> int:
    pattern = sys.argv[1] if len(sys.argv) > 1 else "*.ipynb"
    paths = sorted(NB_DIR.glob(pattern))
    if not paths:
        print(f"No notebooks matched {pattern!r} in {NB_DIR}")
        return 1

    failures = 0
    for path in paths:
        ok, detail = execute(path)
        print(f"{'PASS' if ok else 'FAIL'}  {path.name:<48} {detail}")
        failures += not ok

    print(f"\n{len(paths) - failures}/{len(paths)} notebooks executed cleanly.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
