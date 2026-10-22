# Premium UI Report-Back (build/premium-ui)

**Branch tip:** `745f774`  
**Export:** `DoE-Prompt-Style-build-premium-ui.tar.gz` (excludes node_modules and .git)

## A1 / A2
- **Library decision:** Motion (GSAP free for commercial use confirmed). Native React `<ViewTransition>` (19.3+) preferred for routes; feature-check fallback to raw API then CSS crossfade.
- **Bundle measurement:** Not measured this session — npm install stalled on this environment. Owed on clean machine.
- Report: `reports/animation-decision.md`

## Icon gap list
Full list in `reports/icon-gaps.md`. Text-sigil fallbacks in use. No icons invented. ATTRIBUTIONS.md ready for lines when SVGs are vendored.

## Per-screen status
| Screen | Status | Notes |
|--------|--------|-------|
| Main Menu | Wired | Sigil buttons, hero pedestal placeholder |
| Sandbox | Functional | Live evaluateHit, perk/grip/attack/zone controls, ThreeNumbers + FactorChain + ProcPips |
| Enemies | Functional | Roster cards, ZoneFigure with zone badges, zone rows |
| Combos | Functional | Engine frequencies, ranged toggle greys >2 |
| Perks | Functional | Data-driven from weaponPerks |
| EXO | Functional | Maxed values only; per-level = ? |
| Rings | Functional | User-entered values, user-entered provenance styling |
| The Chain | Functional | Formula chain from data |
| Lab Notes | Functional | 12 measurement cards |

## Missing-data / unknowns
- Enemy captures not in repo — silhouette + ? via UnknownField when image absent.
- Ring values unknown until user-entered.
- EXO per-level values unknown (only maxed known).
- Icon SVGs not vendored (gap list).
- A1 gzip measurement pending clean install.
- Push returned 403 — export is the delivery path.

## Acceptance
- Engine and data files untouched.
- No hard-coded damage numbers in components.
- Fontsource declared in package.json.
- Clean npm test / build / screenshots blocked by environment I/O.
