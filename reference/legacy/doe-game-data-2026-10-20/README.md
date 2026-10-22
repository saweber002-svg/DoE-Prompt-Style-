# `resources/game-data/` — first research pass (proactive staging)

Prepared 2026-10-20 ~18:35 CDT by Muse (research stage) as a head start on Scott's
deep-research ask (commissioned 2026-10-20 ~17:37 CDT; acknowledged as running in the
side chat). These files are **staged for review, not pushed** — the side chat's main
agent owns the repo flow (resources/game-data/ destination, push to DoE-Damage-System-).

## Files

- `weapon-classes.json` — structured data: 10 weapon classes + 2 legendary classes +
  crypt set + mythic list, each with slot, handedness, damage-scale notes, throwable,
  and niche stats; plus enemy-hitbox quirks, damage-formula notes, and an explicit
  `gaps` array.
- `loot-and-tiers.md` — chest tiers (the public drop-rate structure), difficulty
  tiers 1–7, level gates (L1 / L5 / L60+), material/upgrade tiers, realm ladder,
  perk-drop context, enemy colorization, the remaining gaps, and sources.

## What's solid (public, verified across ≥2 sources)

- 10 weapon classes with per-class behaviors + niche stats (community wiki, reviews).
- 5 crypt weapons with unique mechanics (official update notes + UploadVR + Steam).
- Auric (gold, Undead Fortune) and Spectral (Spectral Attack echo) legendary classes
  with six-tier materials, name colors, damage-cost tables (official notes).
- 9 mythic weapons, levels 60/120/180/240, one unique effect + cooldown each.
- Chest tier contents (I/II/III), difficulty 1–7, level gates, realm ladder.
- Enemy hitbox quirks: zombie body = immune / head = instant kill; skeleton block
  bypassed via feet/legs; bats die to anything.
- Damage notes: weapon-type scale factors (long sword ≈2x, crossbow ≈1x, community
  wiki); first-strike 3x on unaware enemies (official notes).

## What's NOT available publicly (do not invent — dev team extracts from game files)

1. Exact per-weapon / per-perk drop-rate percentages (web only has chest structure).
2. Auric/Spectral six-tier material names + tier→damage numbers (damage-cost tables).
3. Named perk pools per column + bonus magnitudes (model uses +25% placeholders).
4. Mythic weapon individual effects + cooldowns.
5. Club/mace niche stats vs hammer.

## Suggested placement

Merge into `resources/game-data/` in the repo (weapon-classes.json as-is,
loot-and-tiers.md as-is), and hand the five gaps to the dev team as issues —
mirroring how Issues #1–#6 track the spec's open questions.
