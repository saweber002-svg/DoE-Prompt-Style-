# PROMPT B — for Grok: The Premium UI (build slices 3–4)

Copy everything below the line into Grok, **with the mockup images attached** (Scott: attach the 12 files listed at the end of this file). Prerequisite: Prompt A merged (engine + loader on `main`). This prompt authorizes UI code on a branch — nothing else.

---

You are building the user interface of **Damage of Eternity**, a premium companion app for the VR game *Dungeons of Eternity*. Repository: **https://github.com/saweber002-svg/DoE-Prompt-Style-** — read `README.md`, `BLUEPRINT.md`, `docs/05-screens-and-flows.md`, `docs/06-design-system.md`, `docs/08-consistency-rules.md`, and `reference/mockups/INDEX.md` in full before designing anything. The engine from Prompt A is merged and its API is fixed: **do not modify the engine, the loader, or `src/data/*.json`.** If the UI needs something the engine doesn't expose, stop and report it.

## The visual target (attached mockups govern)

The attached images are the design authority for composition, atmosphere, and component shape. Direction: **Approach B "Torchlit Cinematic"** (`docs/06`). Non-negotiables from the mockups:

- Full-bleed torchlit dungeon backdrops, softly darkened; **frosted dark-glass panels** with hairline gold edges carry all data; warm amber light vs deep teal magical glow; drifting ember ambience (subtle, performant — CSS/canvas, no video).
- **Gold serif display type** (logo-spirit) for headings and the three big numbers; clean sans for data rows. Circular **blue sigil icons** for perks/factors/menu; **orange sigil rings** for equipped rings.
- Enemies presented cinematically — full-body figure in the red arena square or on the glowing pedestal — with **zone tints on the model itself**: gold = ×3, pale teal = ×2, slate = ×1, hatched/dark = nullify, hollow `?` = unmeasured.
- Signature components (build exactly these, reusable): `FactorChain` (chips in formula order, same-factor adds stacked in one bracket, active chips lit / inactive dimmed, proc chips show their chance), `ThreeNumbers` (Floor / Expected / Ceiling, ceiling always with its frequency), `ProcPips` (the EXO-crit pip in a **distinct hue** from the three 32% pools), `DistributionBar` (5 segments), `ZoneFigure`, `UnknownField` (one component renders **every** `?` state in the app), `ConfidenceBadge`.

## Dressing errors — the mockups lie in these specific places; do NOT build them

Mockup text/numbers are AI dressing. Specifically forbidden, though visible in some mockups: **DPS, TTK, "hit probability / chance to hit", elemental resists, weakness %, enemy abilities lists, threat/difficulty stats, invented perk names** (e.g. "Ignite", "Doom Tide"), **invented ring names** (e.g. "Ring of Ember"). All names and numbers come from `src/data/*.json` via the engine. If a mockup panel shows content the data doesn't have, that panel holds zone rows / factor data instead — see `docs/05` per screen.

## Screens (spec: docs/05; one route each)

1. **Main Menu** — `b-main-menu.webp`: title lockup, sigil menu (Sandbox, The Chain, Perk Library, EXO Suit, Rings, Enemies, Combos, Lab Notes), hero figure on pedestal.
2. **Sandbox** — `approach-b-sandbox.webp` + `b2-sandbox-skeleton-warrior.webp`: three panes (Build in formula order / Target / Results), mobile stacks with sticky results bar. Build panel: base damage input → grip + attack type → 2 perk slots + element → EXO toggles → 2 ring slots (value fields showing `?` until the user types the value from their physical ring; persisted locally with `user-entered` provenance styling) → situation toggles. Target: ZoneFigure + Roll a hit / Roll 100. Results: ThreeNumbers, FactorChain, pips, waterfall contributions, DistributionBar, save-snapshot A/B compare. Defaults: target **Wasp** (flat baseline).
3. **Enemy Select + Detail** — `b2-enemy-select.webp`, `b2-target-*.webp`: roster cards; detail = figure + zone rows only. Use the real captures from `reference/mob-images/` where present in the repo; where an enemy has no image (Mimic, Skeleton Archer), render the designed **silhouette + `?`** state — never generate or substitute art. Skeletal Boss detail carries **no multiplier badges on the body**; face marker + copy "no zone multiplier — headshot perks/rings apply."
4. **Combos** — `b-combos.webp`: 16-pattern pip grid with engine frequencies, DistributionBar on top, melee/ranged toggle greying the impossible patterns for ranged; full-house card gets the hero glow. Summary rail: pattern count / expected multiplier / expected damage.
5. **Perk Library** — card deck from data: tier tables (7 tiers), eligibility, confidence badges; excluded perks in a marked appendix section only.
6. **EXO Board** — 4 slot columns (Mind/Chest/Arms/Legs); damage perks functional; **per-level values render `?`** (unknown — only maxed values are known); non-damage perks name-only.
7. **Rings Vault** — `b-rings-vault.webp`: equipped L/R rings in sigil circles, collection grid, detail panel with the engraved-`?` value field, crypt sigil strip.
8. **The Chain** — the formula as a walkable explainer; every factor group deep-links a preset build into the Sandbox.
9. **Lab Notes** — the 12 measurement tasks from `docs/07` as cards (unknown / why it matters / how to measure).

## Quality bar

This must feel like a flagship commercial product that out-classes the game's own UI while matching its world seamlessly: meticulous spacing, real hover/active states, smooth 60fps transitions, backdrop depth (parallax-lite), perfect responsive behavior phone→desktop, keyboard navigable, visible focus states, and zone colors that remain distinguishable for color-blind users (pair tint with the multiplier badge — never color alone). No lorem ipsum, no placeholder copy, no stock fantasy art.

## Workflow & acceptance

- Branch **`build/premium-ui`** off `main` (after Prompt A merged). Commit per screen. Open a PR titled "Slices 3–4: premium UI" and **STOP** — do not merge.
- Acceptance: `npm test` and `npm run build` green; every screen renders with real data (no hard-coded numbers in components — the lead will grep); unknowns render through `UnknownField` everywhere; a screenshot of each screen at desktop + phone width attached to the PR for comparison against the mockups.
- Report back: per-screen status, deviations from any mockup and why, every place data was missing and how the `?` state handled it, and any engine API gap you hit (do not work around it silently).

## Attachments Scott must include when sending this prompt

From `reference/mockups/` (staged workspace / repo once binaries land): `approach-b-sandbox.webp`, `b-main-menu.webp`, `b-combos.webp`, `b-rings-vault.webp`, `b-enemy-select-v1.webp`, `b2-enemy-select.webp`, `b2-sandbox-skeleton-warrior.webp`, `b2-target-uber-mage.webp`, `b2-target-octoculus.webp`, `b2-target-doomer.webp`, `b2-target-skeleton-boss.webp`, `b2-target-zombie.webp`, `b2-target-wasp.webp`.
