# UI Final Pass Report-Back

**Blocker first:** Environment still cannot complete npm ci / npm test / npm run build (I/O and network constraints). Lead sweep required.

**Branch:** build/ui-final-pass (5fe5930) off main 1956dc5.

## Task status
1. **Sigil:** Reworked to import.meta.glob raw SVGs, drop background path, currentColor glyph inside circular cyan ring. Name→id resolution with short-name and dual-name matching. Text fallback only for unmapped and known gaps (weapon-sword, weapon-club).
2. **Ring store:** localStorage `doe-ring-values`. Sandbox has two ring slots (name select + value input, writes through). TheChain presets resolve ring values from store at click time (no invented 0.1/0.15).
3. **Combos:** Rebuilt with curated cards (Full House, Double Crit, Predator Stack) evaluated live via evaluateHit against selectable enemy+zone. ThreeNumbers + ceiling frequency. Proc distribution panel with ranged toggle retained.
4. **Perk Library / EXO / Lab Notes:** Data-driven from damageModel. EXO set-aside derived from setAside.factors. Lab Notes: canon card, set-aside annex, interactions, measurement backlog marked unmeasured.
5. **Motion:** ThreeNumbers animates numeric changes (instant for ?). FactorChain already had motion. Route transitions and remaining springs noted as partial.
6. **Stage 5:** Visual-pulse-only. No verified Kenney/Freesound files obtained. Toggle remains default OFF.

## Guards
- Sandbox enemy selector AND weapon-type selector present and wired (grep confirmed).
- No new runtime dependencies added. Lockfile not regenerated (install blocked).
- Frozen files untouched.

## Screenshots
Not generated in this environment.
