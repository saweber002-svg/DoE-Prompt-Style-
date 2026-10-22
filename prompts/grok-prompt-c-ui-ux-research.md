# Grok Prompt C — UI Asset Availability + Premium Tactile Navigation Research (REPORT ONLY)

You are Grok, a collaborator on **Damage of Eternity**, a Dungeons of Eternity damage guide + calculator being built in the repo **saweber002-svg/DoE-Prompt-Style-**. Slices 1–2 (scaffold, seed loader, pure engine) are merged to `main`. The premium UI build (Prompt B) has NOT started. Before it does, the lead (Muse) and the owner (Scott) need a verified picture of what quality assets and interaction techniques are actually available — and what you can actually do. That is this task.

**This is a research-and-report task. Write no application code. Create no branch. Change no existing file. Your only deliverable is one report.**

## First, ground yourself in the repo

Clone or pull the repo and read, in this order: `BLUEPRINT.md`, `docs/05-screens-and-flows.md`, `docs/06-design-system.md`, `prompts/grok-prompt-b-premium-ui.md`, and `reference/mockups/INDEX.md`. Scott may attach the 13 Approach B mockup images to this task — if he does, study them; if he does not, work from docs/06 and the index and state that limitation in the report.

Design canon you are researching FOR (binding, from docs/06): **Approach B — Torchlit Cinematic.** Full-bleed dungeon backdrops, frosted-glass panels, torchlit stone/amber warmth against deep teal magical glow, gold serif display typography, circular blue sigil iconography, purple crypt-slot accents. The owner's bar: match the game seamlessly, at higher quality than the in-game UI — "the highest quality, most premium and visually satisfying experience." The real enemy art in the final build is the owner's own separated in-game captures; AI imagery is composition guidance only.

## The three investigations

### 1. Quality UI asset availability
Survey what premium-grade assets are actually obtainable for this design language, in these families:
- **Iconography** — sigil/rune/fantasy game icons (e.g. game-icons.net, Kenney, itch.io packs, OpenGameArt, Iconify collections, The Noun Project): coverage of our needs (perks, rings, EXO slots, elements, weapons, hit-zone markers), style fit against the circular blue sigil language, vector vs raster, sizes.
- **Typography** — display serif / engraved fantasy-leaning fonts with real web licenses (Google Fonts and beyond): candidates for the gold logo serif and for readable UI text; weights, legibility at small sizes.
- **Surfaces & backdrops** — stone/dungeon textures and backdrop art: licensed packs vs procedural (CSS/SVG noise, gradients, WebGL shaders) vs generating our own. State which route you recommend per surface and why.
- **Motion & feedback assets** — UI sound micro-feedback (clicks, chimes, stone/metal ticks) from licensed libraries (e.g. Freesound, Kenney audio, Sonniss): license terms per source.
- **Interaction/animation libraries** — for the Vite + React 19 + TS stack already in the repo (motion/Framer Motion, GSAP, React Spring, Lenis or equivalents): current version, license, bundle cost, React 19 compatibility — verified from the project's own docs/changelog, not memory.

**For every single asset or library you list:** name, canonical source URL, **license verified from the source page itself** (quote the license type; state attribution requirements and commercial-use terms), cost if any, formats/sizes, and a fit judgement against the B design language. Anything you could not verify is marked **UNVERIFIED** with the reason. Do not invent assets, prices, or license terms — an unverified claim presented as fact fails this task.

### 2. Premium interactive / tactile navigation — design & development research
Research how high-end web apps make navigation feel tactile and premium, and map each technique to OUR app (9 screens and the signature components named in Prompt B: FactorChain, ThreeNumbers, ProcPips, ZoneFigure, and screen-to-screen navigation):
- Spring/physics-based motion, gesture and drag interactions, shared-element / FLIP transitions, the View Transitions API — browser support as of now, with sources.
- Haptic feedback on the web: the Vibration API's real support matrix (including iOS Safari's limits), and what the credible fallbacks are when haptics are unavailable.
- Sound-paired micro-interactions: patterns, restraint, mute/etiquette norms.
- Performance law for 60fps tactile feel: transform/opacity-only animation, compositor layers, input latency, reduced-motion (`prefers-reduced-motion`) obligations.
- Navigation models worth stealing from: the 2–3 best real products (games or apps) whose menu navigation feels genuinely tactile, what specifically they do, and what of it is transferable to a static-hosted React app — cited, not vibes.

Every technique gets: what it is, source/citation, browser/device support, cost (bundle/perf/complexity), and the exact screen or component in our app where it would pay off. Techniques you cannot source get cut, not padded in.

### 3. Your own tools and capabilities — verified inventory
Report what YOU can actually do in your environment, testing rather than assuming. Cover at minimum: web browsing/search (can you fetch live pages?), image generation and image editing (if available: models, max resolution, can it preserve a supplied reference's likeness/style?), shell access and runtimes (node/npm versions), git and GitHub access **as it actually stands** (note: your previous push attempt returned 403 — state your current access plainly), what file formats you can hand back (zip? single files? pasted text?), and any context or file-size limits that matter for consuming 13 mockup images or large codebases. Mark every claim **VERIFIED THIS SESSION** (and how) or **UNVERIFIED**. This section decides how the owner routes work between you and Muse, so accuracy matters more than impressiveness.

## The report

Save it as `reports/grok-ui-ux-research.md` in your local clone AND return the full text to Scott (zip the repo folder as before if that is your working channel). Structure:

1. **Executive summary + your recommendation** — the correct way to proceed, in your judgement, in under 300 words.
2. **Asset inventory** — the verified table from Investigation 1, grouped by family, best option per family called out.
3. **Tactile navigation findings** — Investigation 2, each technique mapped to our screens/components.
4. **Grok capability inventory** — Investigation 3, verified/unverified marked.
5. **Proposed way forward** — phased plan for the UI build (what changes about Prompt B, if anything), what you should build, what Muse or Scott must supply (including the known gap: binary images are staged locally but not in the GitHub repo), risks, and the open questions you need answered before building.
6. **Unverified / could-not-determine list** — everything you could not establish, in one place.

## Hard rules
- The repo's documents win any conflict with your prior knowledge; the data-integrity law applies to facts and licenses exactly as to game data: unknown means labelled unknown, never smoothed over.
- No code, no branch, no edits to existing files, no PR. Report only, then stop.
- Do not start Prompt B. Do not assume its plan survives your findings — if your research says part of it should change, say so in section 5, with evidence.
