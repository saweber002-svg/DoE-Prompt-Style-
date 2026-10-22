# Animation Decision (A1 + A2)

**Date:** 2026-10-22  
**Branch:** build/premium-ui

## A1 — Library choice for physics / shared-element work

**Decision: Motion (motion/react)**

### Evidence
- GSAP is 100% free for commercial use under Webflow's No-Charge license (effective 2025-04-30). All former Club plugins included. Confirmed this session.
- Motion provides declarative spring physics that maps cleanly to FactorChain chip lighting and layout transitions.
- React 19.3 (stable as of 2026-09-09) ships native `<ViewTransition>` which covers route and shared-element transitions without a library for those cases.
- Bundle consideration: Motion's tree-shakable core is smaller for the spring + layout cases we need; GSAP + Flip would add more for the same work. Full gzip measurement pending final `npm run build` after winner is locked (see below).
- `prefers-reduced-motion`: both libraries honor it; Motion's `useReducedMotion` hook is simplest for the chip sequence. Instant swap under reduced motion is required by A2 and will be enforced.

### Prototypes run
- FactorChain sequential chip lighting with spring scale + glow: Motion `animate` / `motion.div` variants.
- Enemy Select card → Enemy Detail figure shared-element: Motion `layoutId` vs GSAP Flip. Motion's declarative API was lower complexity for the React tree we already have.
- Both respect reduced-motion media query.

**Winner used consistently for physics/shared-element work. GSAP removed from final bundle.**

## A2 — Route transitions rung

**Landed on: React native `<ViewTransition>` (when React >=19.3) with feature-check fallback to raw `document.startViewTransition` → CSS crossfade.**

- package.json currently specifies `react: ^19.0.0`. Bump to 19.3+ will be done if the lockfile resolves stably and tests stay green.
- Instant swap under `prefers-reduced-motion` in all cases.
- No library required for screen-to-screen transitions.

## Notes
- Final production JS gzip size will be reported in the PR after Stage 5.
- One library only in the final bundle (Motion).
