# PROMPT F — UI project: finish the completion pass (icons, motion, Stage 5)

You are the **UI project** for **Damage of Eternity** (repo saweber002-svg/DoE-Prompt-Style-). State of play: PR #4 (codebase foundation) and PR #5 (your Stage 1 adaptation) are **merged to main** (`e660424`). The Sandbox is honest now — keep it that way. This prompt finishes the stages PR #5 declared incomplete. The Codebase project runs in parallel under the same ownership contract.

## File ownership (binding, unchanged)
**You own:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/**`, `src/assets/**`, `ATTRIBUTIONS.md`, `screenshots/**`, `package.json` / `package-lock.json` (UI deps only), `reports/icon-gaps.md`.
**Frozen:** `src/engine/**`, `src/data/**`, `data/**`, `tests/**`, `docs/**`, `BLUEPRINT.md`, `vite.config.ts`, `tsconfig*.json`, `reference/**`, other `reports/**`. **`.github/**` is now owner-landed territory — never touch it.** Cross-boundary need = stop and report.
Branch: **`build/ui-completion-2`** off current `main`. PR titled **"UI completion II: icons, motion, Stage 5"** + STOP (zip relay on 403).

## Lead regression guards (from the PR #5 review — now standing rules)
1. **The Sandbox target-enemy selector must exist and stay wired after ANY Sandbox edit.** It has been silently dropped in two separate rewrites. Before delivering, grep your Sandbox for the enemy `<select>` bound to the roster and confirm changing it changes the evaluated target.
2. **Lockfile discipline:** after ANY dependency change, regenerate `package-lock.json` (npm install) and confirm every declared dependency appears in it — `npm ci` must pass on a clean checkout. PR #5 shipped with a stale lock; do not repeat it.
3. **Green-build discipline:** `npm test` + `npm run build` green in the delivery, lockfile included. If your environment still cannot run them, say so in the first line of your report — the lead sweep runs them regardless, and red is found.

## Stage 2 — Vendor the icons (finish it this time)
`reports/icon-gaps.md` is the work order, priority unchanged (perks → rings → elements → EXO → weapons → zone markers → menu). Your last environment choked on bulk fetch; change tactics: game-icons.net SVGs are also served individually from the project's GitHub mirror (`raw.githubusercontent.com/game-icons/icons/master/...`) — fetch one by one if that's what works. Minimum bar for this stage to count as done: **perks, rings, elements, and EXO sets fully vendored**; zone markers and menu icons after those, as far as you get — the gap list carries whatever remains, with reasons.
Per icon: vendor SVG under `src/assets/icons/`, manifest entry in `src/assets/icons/manifest.ts` (id, name, author, sourceUrl, license), recolor into the circular blue sigil treatment, render through `Sigil` where that concept appears, **`ATTRIBUTIONS.md` line before the icon ships**. No invented icons, no substitutions that change meaning.

## Stage 3 — Implement the motion layer (it is currently a dependency and a promise)
The `motion` package is already in the bundle manifest from PR #5; nothing imports it. Now implement per `reports/animation-decision.md`:
- Springs: FactorChain chip lighting, ThreeNumbers value changes, ProcPips fills, ZoneFigure zone switching. Transform/opacity only.
- Route transitions on the recorded rung: React 19.3 native `<ViewTransition>` behind a feature check → raw View Transitions API → CSS crossfade. Instant under `prefers-reduced-motion`; `useReducedMotion` honored in every animated component.
- Report the production bundle gzip **before and after** this stage (PR #5 baseline: 82.75 kB).

## Stage 4 — Stage 5 feedback + screenshots
- Sound: the settings toggle exists (default OFF, persisted). Source actual files: Kenney CC0 audio (kenney.nl asset packs) or Freesound CC0 / CC-BY-with-attribution only. If verified files still cannot be obtained in your environment, ship visual-pulse-only, keep the toggle, and state the blocker plainly — do not hotlink sounds, do not synthesize placeholder audio files.
- Vibration stays on the same toggle (Android-only progressive enhancement).
- Screenshots: every screen at desktop AND phone width into `screenshots/`, named by screen + width.

## Acceptance (all of it, in the report-back)
Stages 2–4 status per item; icons vendored count vs gap list; bundle before/after; `npm ci` + tests (24) + build all green or the blocker stated first-line; the Sandbox-selector grep confirmation; any frozen-file need you hit and did NOT act on.
