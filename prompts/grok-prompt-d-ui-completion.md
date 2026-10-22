# PROMPT D — UI project: completion pass (adaptation + icons + motion + Stage 5)

You are the **UI project** for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). State of play: PRs #2 (your premium UI v1) and #3 (owner formula amendment) are **merged to main** (`eac0dfa`). The engine on main now implements the owner's canonical formula. This prompt finishes the UI. A parallel **Codebase project** is working at the same time under a strict file-ownership contract (below) — the two efforts must not conflict.

## File ownership (binding — this is what keeps the two projects conflict-free)

**You own:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/**`, `src/assets/**`, `ATTRIBUTIONS.md`, `screenshots/**`, and `package.json` / `package-lock.json` (**UI dependencies only**).
**Frozen — do not touch:** `src/engine/**`, `src/data/**`, `data/**`, `tests/**`, `docs/**`, `BLUEPRINT.md`, `.github/**`, `vite.config.ts`, `tsconfig*.json`, `reference/**`, `reports/**` (except updating `reports/icon-gaps.md`, which is yours).
If the work seems to need a frozen file, **stop and report it** — never cross the boundary. Branch: **`build/ui-completion`** off current `main`. Commit per stage. PR titled **"UI completion: adaptation, icons, motion, Stage 5"** + STOP (zip relay on 403, as before).

## Stage 1 — Adapt the UI to the amended engine (do first)

The engine changed under your v1 (read `src/engine/formula.ts` + `reference/owner-calculator-formula.md` on main):
- **Sandbox needs a weapon-type selector** wired to `Build.weaponType` (all 13 types from `src/engine/types.ts`). Without it, the ×2 handling gate (2H + axe/hammer/spear/greatsword) is unreachable in the UI. Show the gate state in the results (the breakdown already carries it).
- **Remove the inert situation toggles** — First Strike, target-poisoned, target-staggered no longer affect the canonical engine (set-aside annex). The UI must never offer a control that implies math the engine doesn't do. Backstab/Scout's are zone-driven now; no UI control is needed for them.
- **EXO Board:** Might and Pierce render with set-aside styling + the label "set aside — not in the owner's calculator" (data: `setAside` in the damage model). Power/Pullback and EXO Criticals stay functional.
- **The Chain:** its copy claims factors deep-link Sandbox presets — make it true: lift the Sandbox build state to `App` level (or an equivalent simple store) so a factor card in The Chain loads a preset build into the Sandbox and navigates there.

## Stage 2 — Icons (the gap list is your work order)

Work `reports/icon-gaps.md` top-down in its locked priority order. For each icon: fetch the SVG from game-icons.net, vendor it under `src/assets/icons/` with the manifest entry, recolor into the circular blue sigil treatment, render through the `Sigil` component wherever that icon's concept appears (menu, perks, rings, elements, EXO, zone markers), and add its `ATTRIBUTIONS.md` line (name — author — source URL — CC-BY 3.0). Kenney CC0 only for genuine gaps, style-treated. Update the gap list as you fill it; anything still unfound at the end stays listed with the reason. **No invented icons, no icon without an attribution line.**

## Stage 3 — Motion (implement the A1/A2 decisions you already made)

Your `reports/animation-decision.md` chose Motion + native View Transitions; neither is in the code yet. Now integrate:
- Add the `motion` package (the only new runtime dependency expected; list it in your report-back). Springs on: FactorChain chip lighting, ThreeNumbers value changes, ProcPips, ZoneFigure zone selection.
- Route transitions on the rung your decision recorded (React 19.3 native `<ViewTransition>` — the lockfile resolves React 19.3.1 — behind a feature check, raw API fallback, CSS crossfade last), instant under `prefers-reduced-motion`. Motion's `useReducedMotion` honored everywhere.
- All animation transform/opacity only; 60fps is the bar.

## Stage 4 — Stage 5 feedback + finish

- Settings toggle (persisted) for sound/vibration, **default OFF**, in your SettingsBar. Sounds only from Kenney CC0 audio (or Freesound CC0/CC-BY with attribution lines); visual pulse always paired; Vibration Android-only progressive enhancement on the same toggle. If no suitable sound files can be obtained and verified, ship the toggle with visual pulse only and say so.
- Screenshots: every screen at desktop AND phone width into `screenshots/`.
- Final self-check before delivery: `npm test` and `npm run build` green (run them if your environment allows; if it still can't, say so plainly and the lead will run the sweep), production JS gzip size recorded, zero hard-coded names/numbers in components, every unknown through `UnknownField`.

## Report back
Per-stage status; icons filled vs still-gapped (with reasons); the motion rung landed on; bundle size before/after; every frozen-file need you hit and did NOT act on; deviations from the mockups and why.
