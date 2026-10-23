# PROMPT H — UI project: FINAL PASS (render icons, complete every screen, motion, Stage 5, polish)

You are the **UI project** for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). You hold the design workspace and the mockups; this prompt is the lead's complete finishing work order, built from a full audit of current `main` (`9b2b959`). Everything you need is already in the repo: **all 52 icons are vendored** (`src/assets/icons/` + `manifest.ts` + `ATTRIBUTIONS.md`) — the asset problem is solved; what remains is rendering, completion, and polish. No parallel codebase work this round.

## Ownership (binding, as before)
**You own:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/**`, `src/assets/**`, `ATTRIBUTIONS.md`, `screenshots/**`, `package.json`/`package-lock.json` (UI deps only), `reports/**`.
**Frozen:** `src/engine/**`, `src/data/**`, `data/**`, `tests/**`, `docs/**`, `BLUEPRINT.md`, `vite.config.ts`, `tsconfig*.json`, `reference/**`, `.github/**`. Cross-boundary need = stop and report.
Branch: **`build/ui-final-pass`** off current `main`. PR titled **"UI final pass: icons rendered, screens complete, motion, Stage 5"** + STOP (zip relay on 403).

## Standing regression guards (repeat from F — still binding)
1. Sandbox **target-enemy selector AND weapon-type selector** must exist and stay wired after ANY Sandbox edit (the enemy selector has been dropped in two rewrites — grep-confirm both before delivery).
2. Lockfile regenerated after any dependency change; `npm ci` must pass clean.
3. `npm test` (29) + `npm run build` green in the delivery, or the blocker stated in the first line of the report.

## Task 1 — Render the icons (Sigil)
The vendored SVGs have this structure: `<svg viewBox="0 0 512 512"><path d="M0 0h512v512H0z"/><path fill="#fff" d="...glyph..."/></svg>` — the first path is a black background square, the rest is the glyph. Rework `Sigil` to:
- Load all SVGs via `import.meta.glob('../assets/icons/*.svg', { query: '?raw', eager: true })`, keyed by manifest id.
- Render the glyph paths only (drop the full-canvas background path), with `fill="currentColor"` inside the existing circular blue sigil ring, glyph in the sigil's cyan. 
- Map display names → manifest ids: perks/rings/EXO/elements by their concept names as today (ring data names are dual — "Predator / Critical Strike" — match on the short name as the current matcher does); weapon types → `weapon-*`; zones → `zone-*` (zone `body` maps to `zone-torso`); screens → `menu-*`.
- Keep the two-letter text fallback ONLY for genuinely unmapped names and the two known gaps (`weapon-sword`, `weapon-club` — see `reports/icon-gaps.md`). Everything else must render its real icon: menu buttons, perk chips (Sandbox + Perk Library), ring cards, EXO board, Chain factors where a concept matches, zone chips/markers.
- The Sandbox weapon-type `<select>` options can't hold SVGs — instead show the selected weapon's icon beside the selector (and in the handling indicator when active).

## Task 2 — Sandbox ring controls + shared ring-value store (functional gap)
The engine supports rings but the Sandbox can't set them. Fix end-to-end:
- New shared store: ring values persist in `localStorage` under `doe-ring-values` (map: ring name → string), read on mount. **Rings Vault already claims values "persist locally" — currently false (state only). Make it true there too, using the same store.**
- Sandbox gains two ring slots: name `<select>` (options from the damage model's ring list, plus "— none —") + numeric value input prefilled from the store; edits write through to the store immediately. A named ring with no stored/entered value passes `userValue: null` (unknown — never invent a default).
- **Data-integrity fix in `TheChain`:** its Scout's/Backstab presets currently hardcode `userValue: 0.1` / `0.15` — invented ring values, a canon violation. Change presets to carry the ring NAME only, with the value resolved from the store at click time (stored value if present, else `null`).

## Task 3 — Combos screen rebuild (currently only a frequency table)
Make it a real combos screen, all numbers computed live by the engine:
- A set of curated combo cards — each a named build fragment (e.g. "Full House" = AP + Crits + Fire + EXO Crits; "Double Crit" = Crits + EXO Crits; "Predator Stack" = a crit build with a stored Predator value if one exists in the ring store, else shown with ring factor unknown) — evaluated via `evaluateHit` against a selectable target enemy + zone (reuse the Sandbox roster/zone pattern), each card showing ThreeNumbers + its proc frequency for the ceiling.
- Combo definitions must be honest: fragments only from factors the canonical engine actually applies (no set-aside factors — no Might/Pierce/Throw Damage combos).
- Keep the existing proc-count frequency panel below as "Proc distribution (max-tier 4-pool)" with the ranged-cap toggle.

## Task 4 — Perk Library + EXO + Lab Notes (thin/hardcoded → data-driven)
- **Perk Library:** render from the damage model: per perk — sigil, name, kind, weapons applicability, always-on vs proc, its tier scaling (use `chancePerkByTier` / `pctPerkByTier` — render the 7-tier ladder compactly), and the model's `rules` text as the header note. Elements row (Fire/Ice/Poison) with their icons and the `interactions` notes that concern elements.
- **EXO Board:** derive the set-aside set from `damageModel.setAside.factors` (names) instead of the hardcoded `SET_ASIDE` constant; keep the styling + label.
- **Lab Notes:** the current cards are hardcoded and partly stale (they state set-aside research as plain fact). Rebuild from canon + data: (a) owner's-formula canon card (source: `reference/owner-calculator-formula.md`); (b) the set-aside annex rendered from `damageModel.setAside` (note + each factor with its effect); (c) `interactions` from the model, verbatim; (d) the measurement backlog — T_WEAK transcription (worksheet pending owner data), ring values (owner-measured drop pending), Poison DoT numbers, EXO per-level values, Mimic zones, swing-strength variance, difficulty/co-op scaling — each marked **unmeasured**, never estimated. No other hardcoded damage facts.

## Task 5 — Motion completion
- **ThreeNumbers:** animate numeric changes (motion spring/`animate` on the value; unknown `?` states swap instantly). 
- **ProcPips + DistributionBar:** animate — pips pop with stagger on change; bar segments transition width.
- **ZoneFigure:** fade/slide transition when the enemy or zone selection changes (keyed motion wrapper).
- **Route transitions:** implement the recorded rung honestly — wrap screen switches in `document.startViewTransition` when available (feature-checked), falling back to a CSS crossfade on the screen container; instant under `prefers-reduced-motion`. Record which rung shipped in `reports/animation-decision.md` as an addendum.
- All animation transform/opacity only; `useReducedMotion` honored everywhere (FactorChain already does — match its pattern).

## Task 6 — Stage 5 resolution + polish + screenshots
- **Audio:** if you can obtain verified Kenney CC0 (or Freesound CC0/CC-BY with attribution) files in your environment, wire two or three micro-sounds (select, toggle, result) behind the existing default-OFF persisted toggle. If not: ship visual-pulse-only and write the resolution + blocker into the `reports/animation-decision.md` addendum — a stated decision, not a silent gap. No hotlinks, no synthesized placeholder files.
- **Polish pass against your mockups:** spacing/type hierarchy consistency across all 9 screens, sigil alignment, panel rhythm, phone-width sanity (no horizontal scroll, tap targets intact). The design canon is Approach B as already built — this is refinement, not redesign.
- **Screenshots:** every screen at desktop AND phone width into `screenshots/`, named `<screen>-desktop.png` / `<screen>-phone.png`.

## Acceptance (all in the report-back)
Per-task status; the both-selectors grep confirmation; `npm ci` + 29 tests + build green; bundle gzip before/after (current main: ~120 kB); screenshots present; the Stage 5 audio resolution as decided; any frozen-file need hit and NOT acted on; deviations from the mockups and why.
