# ADDENDUM to Prompt B — asset stack lock + amendments A1–A3 (owner-approved 2026-10-22)

**Send this together with Prompt B and the 13 mockup images.** This addendum is based on your Prompt C research report (`reports/grok-ui-ux-research.md`, archived in the repo) as audited by Muse and approved by Scott. **Where Prompt B and this addendum conflict, this addendum wins.** Everything in Prompt B not mentioned here stands unchanged — screens, signature components, dressing-error prohibitions, quality bar, branch `build/premium-ui`, per-screen commits, PR + STOP.

## Locked asset stack (decided — do not re-litigate)

- **Icons: game-icons.net is the primary source** (CC-BY 3.0). Priority order for icon work: **perks → rings → elements → EXO → weapons → zone markers → menu sigils.** Recolor silhouettes into the circular blue sigil language per docs/06. Kenney (CC0) may supplement only where an icon is missing AND after style treatment to match. **Attribution is a build requirement:** every icon used gets its author credited in `ATTRIBUTIONS.md` at the repo root (icon name, author, source URL, license) — no icon ships without its line. Delivery vehicle is your choice (vendored SVGs under `src/assets/icons/` with a small manifest, or `@iconify/react` with the game-icons collection) — offline reliability wins ties.
- **Typography: Cinzel + Inter, self-hosted.** Cinzel 700/900 for headings; **Cinzel Decorative for the main title lockup only** (it fails at small sizes); **ThreeNumbers render in Cinzel 700**; all data rows, tables, chips and body text in Inter (system sans fallback). **All fonts are self-hosted woff2 in the repo — no Google Fonts CDN calls at runtime** (the app is statically hosted; self-hosting is faster and has no third-party dependency). `font-display: swap`; verify data legibility at phone sizes early.
- **Surfaces: procedural only in v1** — CSS/SVG noise, gradients, amber/teal light layers, canvas or CSS ember drift, per your report and docs/06. No external texture packs.
- **Enemy art:** unchanged rule (real captures only, silhouette + `?` where none) — with one factual correction to Prompt B: **the binary captures are NOT in the GitHub repo** (only `INDEX.md`/`MANIFEST.md` text is). Build every figure slot keyed to the `image` field in `src/data/enemies.json`, rendering the designed silhouette state when the file is absent, so the real captures drop in later with zero code changes. If Scott attaches captures to this task, use them locally; do not commit binaries unless instructed.

## Amendment A1 — animation library is a measured decision, not a default

Your report recommended Motion while leaving GSAP unverified. Verified fact you missed: **GSAP has been 100% free since 2025, including every former Club plugin (Flip, Draggable, MorphSVG), under GreenSock's No-Charge license** (free commercial use; no resale of GSAP itself). Before building any screen:

1. Prototype two interactions **both ways** (Motion and GSAP): (a) the FactorChain chip-lighting sequence with its spring feel; (b) one shared-element transition — Enemy Select card → Enemy Detail figure (GSAP Flip vs Motion layout).
2. Measure in OUR project: gzipped bundle delta of each option, implementation complexity, and how each respects `prefers-reduced-motion`.
3. Record the decision and the evidence in **`reports/animation-decision.md`** on your branch, then use the winner consistently for physics/shared-element work. Everything else stays CSS + View Transitions per the original plan. One library only — never both in the final bundle.

## Amendment A2 — route transitions: native first

For screen-to-screen transitions, prefer the platform in this order: **React's native `<ViewTransition>` component if the React version in `package-lock.json` supports it stably → the raw View Transitions API (`document.startViewTransition`) behind a feature check → plain CSS crossfade.** Instant swap under `prefers-reduced-motion` in all cases. State which rung you landed on in `reports/animation-decision.md` and why.

## Amendment A3 — micro-sounds: present but OFF by default

Prompt B was silent on sound; this settles it. Subtle UI micro-feedback sounds (zone select, roll, preset switch) may ship, sourced **only** from Kenney audio (CC0) or individual Freesound files under **CC0 or CC-BY** (each file credited in `ATTRIBUTIONS.md`; CC-BY-NC is prohibited). Rules: **default OFF**, enabled only via a persisted settings toggle; never autoplay; tiny files; a visual pulse always accompanies any sound (and is the feedback on iOS, where the Vibration API does not exist). Vibration, where available (Android), is a progressive enhancement tied to the same toggle — never required for comprehension.

## Delivery & acceptance additions

- Push access from your environment was **unverified** in your own inventory (and returned 403 in the slices 1–2 round). If pushing `build/premium-ui` fails, do not stall: export the branch as a zip and return it to Scott, exactly as slices 1–2 were landed — say so in your report-back.
- Added to Prompt B's acceptance list: `ATTRIBUTIONS.md` complete for every icon/font/sound used; `reports/animation-decision.md` present with bundle measurements; final production bundle size (JS gzip) reported in the PR; all 19 existing tests still green (engine untouched).
- Report-back additions: the A1 decision and its numbers, which View Transitions rung you landed on, every icon you could NOT find on game-icons.net and what you did instead (a gap list — never a silently invented icon).
