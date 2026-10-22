# PROMPT E — Codebase project: foundation (CI, Pages deploy, owner-data readiness, docs truth)

You are the **Codebase project** for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). State of play: the owner-formula engine and the premium UI v1 are **merged to main** (`eac0dfa`); 20/20 tests, build green. Your job is the non-UI foundation that makes the project self-verifying and publicly playable. A parallel **UI project** is working at the same time under a strict file-ownership contract (below) — the two efforts must not conflict.

## File ownership (binding — this is what keeps the two projects conflict-free)

**You own:** `.github/**`, `src/engine/**`, `src/data/**`, `data/**`, `tests/**`, `docs/**`, `BLUEPRINT.md`, `vite.config.ts`, `tsconfig*.json`, `reference/**`.
**Frozen — do not touch:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/**`, `src/assets/**`, `ATTRIBUTIONS.md`, `screenshots/**`, `package.json` / `package-lock.json`.
If the work seems to need a frozen file, **stop and report it** — never cross the boundary. Branch: **`build/codebase-foundation`** off current `main`. Commit per task. PR titled **"Codebase foundation: CI, Pages deploy, owner-data readiness"** + STOP (zip relay on 403). **Merge order: your PR merges FIRST, the UI project's second** — keep your diff strictly inside your ownership so that order holds cleanly.

## Task 1 — CI (`.github/workflows/ci.yml`)
On every push and pull request: checkout → setup Node (current LTS) with npm cache → `npm ci` → `npm test` → `npm run build`. The workflow is green only when both pass. No secrets, no external services.

## Task 2 — GitHub Pages deploy (`.github/workflows/deploy.yml` + config you own)
Goal: merging to `main` publishes the app so the owner can open it on his phone — the project's first playable demo.
- Workflow: on push to `main` (and manual dispatch): `npm ci` → `npm test` → build → upload `dist/` via `actions/upload-pages-artifact` → deploy via `actions/deploy-pages`, with the standard `pages`/`id-token` permissions and a `github-pages` environment.
- The site is served from a project path (`/DoE-Prompt-Style-/`), so the build needs that base. Achieve it **without editing any UI-owned file**: you own `vite.config.ts` — set `base` there conditionally (env-driven, defaulting to `/` for local dev), or pass the base in the workflow's build step if config changes risk local DX. Pick one, document the choice in the workflow as a comment.
- Report back the ONE manual step the owner must do himself (repo Settings → Pages → source: GitHub Actions) — you cannot flip that setting from here; state it plainly, don't imply the deploy is live before he does.

## Task 3 — Owner-data readiness (data + loader + tests, all yours)
Scott's verified ring values and his T_WEAK zone table will arrive as data-only drops. Prepare the landing zone now:
- **Ring values:** `data/damage-model.json` currently requires every ring `value` to be `null`, and the loader enforces it. Amend both copies of the data model (canonical `data/` and `src/data/` — keep them byte-identical) and the loader so a ring may carry a numeric `value` **only** when accompanied by `"provenance": "owner-measured"` (and a `source` note). A numeric value without that provenance must still fail validation loudly. Add loader tests for: null value OK; numeric + owner-measured OK; numeric without provenance throws.
- **Zone classes:** the engine derives HEAD/BODY/everywhere from zone ids. Add explicit `zoneClass` to each zone in `data/enemies.json` (both copies identical) using the engine's current derivation (`head`/`face` → head; `everywhere` → everywhere; else body), and a loader test asserting every zone carries one and the Mimic's `zones: null` no-data state is preserved. This makes T_WEAK transcription a pure value edit later.
- Do **not** change any zone multiplier or invent any ring value — this task is schema and validation only. Current zone values stay flagged interim in docs/02.

## Task 4 — Docs truth pass
Update `BLUEPRINT.md` and `docs/01`–`08` where merged reality has moved past them: slices 1–4 built and merged; the owner's formula is canonical (docs/02 is already amended — align the rest); the UI completion pass and this foundation are the active work; the old "no building yet" language is gone wherever it lingers. Factual alignment only — no new design decisions, no changes to the design canon itself.

## Acceptance
All tests (existing 20 + your new loader tests) green; build green; workflows syntactically valid (state how you checked); both data copies byte-identical after your edits; a report-back listing: files changed per task, the base-path choice and why, the owner's one manual Pages step, and anything you needed from the UI project's territory and did NOT touch.
