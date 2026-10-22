# PROMPT B-COMPLETION — for Grok: finish the premium UI build

You are mid-build on branch `build/premium-ui` for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). Prompt B, its addendum (asset stack lock + amendments A1–A3), and the 13 mockups are already in your hands and confirmed. This prompt sequences the remaining work to completion, per the lead's priority ruling. It changes no decisions — it orders them and defines "done."

## Work order (strict sequence; commit per stage)

**Stage 1 — A1 animation decision (do this first; it gates all motion work).**
Prototype the FactorChain chip-lighting sequence and the Enemy Select card → Enemy Detail shared-element transition **both ways** (Motion and GSAP). Measure each in this project: gzipped bundle delta, implementation complexity, `prefers-reduced-motion` behavior. Write the decision and the evidence to `reports/animation-decision.md` on the branch, including which View Transitions rung you landed on per A2 (React native `<ViewTransition>` if the lockfile's React supports it stably → raw API behind a feature check → CSS crossfade). Then delete the losing prototype — one animation library in the final bundle, never both.

**Stage 2 — Icons.** Vendor the game-icons.net SVGs in the locked priority order (perks → rings → elements → EXO → weapons → zone markers → menu sigils) under `src/assets/icons/` with the manifest, styled into the circular blue sigil treatment. One `ATTRIBUTIONS.md` line per icon (name, author, source URL, CC-BY 3.0). Kenney CC0 only for genuine gaps, style-treated. **Every icon you cannot find goes on a gap list in your report-back — never invent or substitute a mismatched icon silently.**

**Stage 3 — Signature components.** `FactorChain`, `ThreeNumbers`, `ProcPips` (EXO-crit pip in its distinct hue), `DistributionBar`, `ZoneFigure`, `UnknownField`, `ConfidenceBadge` — built on the Stage 1 winner, all data flowing from the loader/engine. Enemy figure slots keyed to the `image` field in `src/data/enemies.json`; absent file = designed silhouette + `?` state (captures are not in the repo — do not generate art, do not commit binaries).

**Stage 4 — Screens, in this order** (spec: docs/05; composition: the mockups; dressing errors from Prompt B remain forbidden):
1. **Sandbox** (flagship — full build panel, target pane, results with ThreeNumbers/FactorChain/pips/DistributionBar, Roll a hit, save-snapshot compare; default target Wasp)
2. **Enemy Select + Detail** (roster cards; detail = figure + zone rows only; Skeletal Boss carries no body multiplier badges — face marker + "no zone multiplier — headshot perks/rings apply")
3. **Combos** (16-pattern grid with engine frequencies; ranged toggle greys impossible patterns)
4. **Perk Library** → 5. **EXO Board** (per-level values render `?` — only maxed values are known) → 6. **Rings Vault** (engraved-`?` value fields, user-entered values persisted locally with `user-entered` provenance styling) → 7. **The Chain** (walkable explainer, factors deep-link preset builds into the Sandbox) → 8. **Lab Notes** (the 12 measurement cards from docs/07) → 9. **Main Menu** polish pass on your existing skeleton.

**Stage 5 — Feedback layer.** Route transitions per the A2 rung chosen. Micro-sounds per A3: Kenney CC0 or Freesound CC0/CC-BY only (credited in ATTRIBUTIONS.md), **default OFF** behind a persisted settings toggle, visual pulse always paired, Vibration as Android-only progressive enhancement on the same toggle.

## "Done" means

- All 9 screens functional with **real data through the loader/engine — zero hard-coded names or numbers in components** (the lead greps; a hard-coded damage value fails the build).
- Every unknown in the app renders through `UnknownField`; no `?` is ever a guessed value.
- All 19 existing tests green plus any component tests you add; `npm run build` green; production JS bundle size (gzip) reported.
- `ATTRIBUTIONS.md` complete for every icon, font, and sound.
- A screenshot of every screen at desktop AND phone width, attached to the PR (or included in the zip delivery).

## Delivery

Commit per stage/screen on `build/premium-ui`. Push and open the PR titled **"Slices 3–4: premium UI"** against `main`, then **STOP — do not merge.** If push returns 403 again, export the branch as a zip and return it to Scott (the slices 1–2 route) and say so plainly — do not stall on permissions.

## Report back

- The A1 decision with its measurements, and the A2 rung landed on.
- Per-screen status against the mockups, with every deviation and its reason.
- The icon gap list (unfound icons + what you did instead).
- Every place data was missing and how the `?` state handled it.
- Any engine API gap — report it, never work around it silently. The engine, loader, and `src/data/*.json` remain untouched.
