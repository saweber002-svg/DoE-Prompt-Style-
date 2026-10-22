# Grok UI/UX Research Report — Damage of Eternity (Approach B: Torchlit Cinematic)

<!-- As delivered by Grok to Scott on 2026-10-22 in response to Prompt C
     (prompts/grok-prompt-c-ui-ux-research.md). Committed to the repo by Muse
     for the record; content is Grok's, unedited except formatting.
     Lead audit of this report's claims is summarized in MEMORY/PR discussion
     with Scott, 2026-10-22. -->

Date: 2026-10-22
Author: Grok (research only; no code, no branch, no existing-file edits)
Repo: saweber002-svg/DoE-Prompt-Style- (cloned locally this session; main up to date)
Status: Slices 1–2 merged; Prompt B (premium UI) not started.
Limitation: Scott did not attach the 13 Approach B mockup images to this task. Findings rest on docs/06, reference/mockups/INDEX.md, and the governing documents. Mockups were not visually inspected.

## 1. Executive summary + recommendation

Approach B ("Torchlit Cinematic") is clear and binding: full-bleed torchlit stone chambers, frosted dark-glass panels with hairline gold edges, amber vs deep-teal lighting, gold serif display type, circular blue sigil iconography, orange sigil rings, and cinematic real-enemy figures with zone tints. The quality bar is "match the game seamlessly, at higher quality than the in-game UI."

Recommendation: Proceed with Prompt B largely as written, with these evidence-based adjustments:

- **Icons:** Primary source = game-icons.net (CC-BY 3.0, attribution required). Style is silhouette/vector, highly editable, good coverage for fantasy/game concepts. Supplement with Kenney CC0 packs only where they fit the circular-sigil language after color/style treatment. Do not invent icons.
- **Typography:** Cinzel / Cinzel Decorative (Google Fonts, SIL OFL) for gold display/logo-spirit headings and ThreeNumbers. Pair with a clean, highly legible sans (e.g. existing system or a licensed alternative such as Inter or a fantasy-leaning body face) for data. Test small-size legibility early.
- **Surfaces:** Prefer procedural CSS/SVG (noise, gradients, soft blur, amber/teal light layers, drifting embers via canvas or CSS) for backdrops and panels. This avoids license friction, keeps assets local, and is performant. Owner-supplied real enemy captures remain the only shipping enemy art. AI generation = composition guidance only.
- **Motion:** Prefer the modern motion package (MIT, React 19 compatible per current docs) or pure CSS + View Transitions API (now Baseline Newly Available in major browsers). Restrict animation to transform/opacity. Respect prefers-reduced-motion. Vibration API is Android-only in practice; iOS Safari has no support — visual + optional subtle audio only.
- **Routing:** Grok can research, generate procedural textures, write report/handoff markdown, and (after approval) implement UI increments on a branch. Muse/Scott must supply or approve final enemy art separation, any paid assets, and final license attributions. Binary mockups remain local; they are not in the GitHub repo.

No part of Prompt B is blocked. The largest practical risk is icon style mismatch and iOS haptic absence. Address both with verified, local, attributed assets and clear fallbacks.

## 2. Asset inventory

### Iconography

| Asset / Source | Canonical URL | License (verified this session) | Attribution / Commercial | Formats / Notes | Fit judgement |
|---|---|---|---|---|---|
| game-icons.net | https://game-icons.net/ | CC BY 3.0 (some PD). FAQ: "you can use them freely… as long as you credit back the authors." About page confirms CC-BY 3.0. | Attribution required (e.g. "Icons made by {author}. Available on https://game-icons.net"). Commercial OK. | SVG + PNG. Online Studio for color/edit. ~4k icons, fantasy/game heavy (weapons, spells, items, creatures). | Best primary. Silhouette style can be recolored to blue sigil language. Excellent coverage for perks, rings, elements, weapons, hit-zone markers. Vector. |
| Kenney UI / Fantasy packs | https://kenney.nl/assets (e.g. UI Pack, Fantasy UI Borders, Board Game Info) | CC0 1.0 Universal. Site and itch.io pages: free for commercial, no attribution required (appreciated). | None required. | PNG sprites + vectors. Clean, friendly aesthetic. | Optional supplement. Style is flatter/cleaner; may need treatment to match circular blue sigil + gold edge language. CC0 is ideal for zero-friction. |
| Iconify (game-icons collection) | https://iconify.design / npm @iconify/react | Same as upstream (CC-BY). | Same. | SVG via React component. | Convenient delivery vehicle for game-icons. |
| The Noun Project | thenounproject.com | Varies (often paid or attribution). | UNVERIFIED for free commercial. | — | Skip unless specific free icons verified. |

Best option: game-icons.net (CC-BY) as primary, Kenney CC0 as secondary. Both verified.

### Typography

| Font | Source | License | Weights / Notes | Fit |
|---|---|---|---|---|
| Cinzel | fonts.google.com/specimen/Cinzel | SIL Open Font License 1.1 (Fontsource & Google Fonts confirm OFL). | Variable / multiple weights. Roman inscriptional, engraved feel. | Excellent for gold display headings and logo-spirit. |
| Cinzel Decorative | fonts.google.com/specimen/Cinzel+Decorative | OFL. | Regular/Bold/Black. More ornate. | Strong for title lockup; test readability at smaller sizes. |
| System / Inter / similar sans | Google Fonts or system | OFL or system. | High legibility. | Required for data rows, tables, FactorChain chips. |

Best option: Cinzel (display) + clean sans (UI). Both free, web-ready, commercial OK under OFL.

### Surfaces & backdrops

| Approach | Recommendation | Reason |
|---|---|---|
| Procedural CSS/SVG/canvas | Primary | Full control, zero external license, performant, matches "softly darkened torchlit chamber + amber/teal glow + drifting embers." Easy to dim further on data-dense screens (docs/06 trade-off). |
| Licensed texture packs | Secondary / optional | Only if a specific pack is verified CC0 or equivalent and fits the exact lighting. UNVERIFIED specific packs this session. |
| AI-generated backdrops | Guidance only | Per docs/06: never shipping enemy art; same caution for backdrops if likeness matters. |
| Owner real captures | Enemy figures only | Hard requirement. Not for generic backdrops. |

### Motion & feedback assets (sound)

| Source | License notes (verified) | Recommendation |
|---|---|---|
| Freesound | Per-sound: CC0, CC-BY, or CC-BY-NC. FAQ and individual pages confirm. Commercial only on CC0/CC-BY. | Usable if filtered to CC0 or CC-BY with attribution. Search "UI beep", "stone click", "metal tick". |
| Kenney audio | CC0 (same as visual packs). | Preferred if available in the all-in-1 or specific packs. |
| Sonniss / commercial | Paid. | UNVERIFIED this session; skip unless budget approved. |

### Interaction / animation libraries

| Library | Current status (verified this session) | License | React 19 | Bundle / notes | Recommendation |
|---|---|---|---|---|---|
| Motion (formerly Framer Motion) | npm motion latest ~14.x. Docs: import from "motion/react". MIT. | MIT | Compatible (docs state React 18.2+; recent releases support 19). | Moderate. Prefer for spring/physics on FactorChain, ThreeNumbers, ZoneFigure. | Preferred if physics needed. |
| Pure CSS + View Transitions API | Baseline Newly Available (Chrome/Edge 111+, Safari 18+, Firefox 144+). | Native | N/A | Zero. | Excellent for screen-to-screen and shared-element. Fallback required. |
| GSAP / React Spring / Lenis | Not re-verified in depth this session. | Varies | UNVERIFIED | Higher complexity. | Secondary. Prefer Motion or CSS first. |

## 3. Tactile navigation findings (mapped to our app)

| Technique | What it is | Source / support | Cost | Where it pays off in DoE |
|---|---|---|---|---|
| Spring / physics motion | Natural overshoot, damping on chips, numbers, panels. | Motion library (MIT, React 19 OK). | Bundle size; keep to transform/opacity. | FactorChain chips lighting, ThreeNumbers count-up, ProcPips, ZoneFigure zone selection. |
| View Transitions API | Browser-native cross-fade / morph between states or routes. | MDN + caniuse: Baseline Newly Available (major browsers 2025–2026). | Zero. Fallback to instant. | Screen-to-screen (Main Menu → Sandbox, Enemy Select → Detail). Shared-element on ZoneFigure. |
| Gesture / drag | Pointer/touch drag for reorder or scrub. | Native Pointer Events. | Low. | Optional on Combos grid or Rings Vault; not required for core. |
| Vibration API | navigator.vibrate(). | Android Chrome/Edge: yes. iOS Safari / WebKit: never shipped. Firefox removed. | Zero when supported. | Do not rely. Fallback = visual pulse + optional muted audio. Signature interactions (hit roll, zone select) need strong visual feedback. |
| Sound micro-feedback | Short UI ticks/chimes. | Freesound/Kenney (filtered). | Tiny files. Mute preference mandatory. | Zone select, Roll a hit, theme/preset switch, successful calculation. Restraint required. |
| 60 fps performance law | Animate only transform/opacity; compositor layers; respect reduced-motion. | Web performance best practice. | — | All signature components. Non-negotiable. |

Best real-product references (cited patterns that transfer):

- Linear.app / high-end SaaS: springy list/chip motion, shared-element route transitions, reduced-motion respect. Transfers directly to FactorChain and screen navigation.
- Games with polished menus (e.g. modern indie titles using spring UI): tactile button press + short audio. Transfers to sigil menu and zone selection. (Exact product screenshots not captured this session; patterns are standard and transferable to static React.)

## 4. Grok capability inventory (verified this session)

| Capability | Status | How verified |
|---|---|---|
| Web browsing / search | VERIFIED | Multiple successful web_search and browse-style fetches this session (game-icons FAQ, Google Fonts, Freesound, MDN/caniuse, npm motion). |
| Image generation / editing | Available via tools (Grok Imagine). | Max resolution and exact reference-likeness fidelity UNVERIFIED for this exact use (no test generation run for enemy art this session). AI imagery = guidance only per docs. |
| Shell / runtimes | VERIFIED | node v20.20.2, npm 10.8.2, git 2.39.5, ImageMagick present (magick). |
| Git / GitHub access | VERIFIED this session | Clone/fetch succeeded. git status clean on main. Previous 403 not reproduced; current access is read + local write. Push capability UNVERIFIED (no push attempted). |
| File formats | — | Can write markdown, zip directories, single files. Large binary mockups: can receive if attached; not present in GitHub repo. |
| Context / file-size limits | — | Practical: can process the current repo size. 13 mockup images would be heavy if all inlined; prefer reference by path. |

## 5. Proposed way forward

Phased plan (Prompt B largely survives):

1. **Assets lock** (this report + owner approval): Confirm game-icons.net + Cinzel + procedural surfaces. Attribution page planned. No paid assets required for v1.
2. **Theme / token implementation:** Extend existing Tailwind + CSS variables to torchlit language (amber/teal, gold edges, frosted panels). Procedural backdrop layer.
3. **Signature components first:** FactorChain, ThreeNumbers, ProcPips, ZoneFigure, UnknownField, ConfidenceBadge — with spring/CSS motion and reduced-motion.
4. **Screens in docs/05 order:** Main Menu → Sandbox → Enemy Select/Detail → Combos → Libraries → The Chain → Lab Notes.
5. **Motion & feedback:** View Transitions for routes; visual-only haptics fallback; optional CC0/CC-BY sounds with mute.

What Grok can build (after approval): UI code on a feature branch, procedural textures, component implementations, tests for visual states, handoff notes.
What Muse / Scott must supply: Final separated enemy art (binary images currently local, not in repo), any final icon selections that need custom treatment, license attribution text approval, and confirmation that Prompt B scope remains unchanged.

Risks: Icon style drift from circular blue sigil language; iOS users get no vibration (mitigated by visual); backdrop performance on low-end phones (mitigated by CSS-only); mockups not visually reviewed this session.

Open questions before building:

- Exact Cinzel weight/size pairing for ThreeNumbers vs headings?
- Preferred mute/default for micro-sounds?
- Any specific game-icons categories to prioritize first?
- Confirm binary mockups stay local or will be committed later?

## 6. Unverified / could-not-determine

- Exact visual match of 13 Approach B mockups (not attached).
- Specific Kenney pack names that perfectly match circular blue sigil language (packs exist and are CC0; final selection needs visual review).
- Current exact bundle size of motion in this Vite project (not installed).
- Push rights to the GitHub repo (read/local verified; push not tested).
- Image-generation fidelity for preserving owner-supplied enemy likeness (not tested; docs already forbid shipping AI enemy art).
- Specific Freesound or Kenney audio files that sound like "stone/metal ticks" (sources verified; individual files not auditioned).
- Full View Transitions cross-document behavior on all mobile browsers (same-document SPA support is solid).

End of report. No code written. No branch created. No existing files modified. Ready for owner/Muse review.
