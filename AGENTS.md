# learn — Agent Guide

> Single source of truth for *how to work on this repo*. Claude and Antigravity both read this (`CLAUDE.md` → `@AGENTS.md`; `GEMINI.md` → pointer). Keep it short. *(Auto-generated 2026-07-28; edit freely — re-runs won't overwrite an existing AGENTS.md.)*

**Brain note (goals, backlog, full context):** `D:\Brain2\Projects\learn.md`
**GitHub:** https://github.com/p3ji/learn.git
**Stack (detected):** HTML / CSS / JavaScript (static)

## Run / build / test
- Run: open `index.html`, or `python -m http.server 8000` for full PWA/offline behaviour
- `apps/kids_writing` (Story Forge): `node apps/kids_writing/test/smoke.js` — data-layer +
  analyzer-calibration checks, no deps. Run it after touching the word lists in
  `js/word_data.js` or the score formulas in `js/analyzer.js`.
- `apps/kids_grammar` (Grammar Gym): `node apps/kids_grammar/test/checker_probe.js` — grammar
  checker precision and recall against confusables, agreement, punctuation and fragments. Run
  after editing `checker.js` rules or `grammar_data.js` content.
- `apps/kids_math` (MathForge Ottawa): `node apps/kids_math/test/smoke.js` — curriculum schema
  integrity and procedural question generator math checks. Run after editing `curriculum_data.js`
  or `math_engine.js`.
- `apps/kids_geo` (Kids Geo Arcade): `node apps/kids_geo/test/smoke.js` — schema integrity, Carmen Sandiego case trails & Bushbuck item/contract tests. Run after editing `geo_data.js`, `carmen_engine.js`, or `bushbuck_engine.js`.

## Conventions & gotchas
- Keep this file short; put goals/backlog in the linked Brain note, not here.

## Do NOT
- Commit secrets (`.env`) or large build artifacts.
