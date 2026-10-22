# 04 — Enemies & zones

Machine-readable twin: `data/enemies.json`. Evidence: hit-box survey video (Dungeons Demystified, Oct 2026) via research report §11. **No written per-enemy table exists anywhere** — the video survey is the only complete source. Zone model: each zone is ×3, ×2, ×1, or **0 (nullify)**.

## The app roster (deliberately trimmed)

Bosses, mini-bosses, skeletons, mages, wasps, zombies, and a mimic. Redundant mobs are excluded from the app (survey data for them is still kept in `data/enemies.json`, `roster: false`).

| Enemy | Zones |
|---|---|
| Skeletal Warrior / Minion | **waist ×3**, head ×1, torso ×1 — head is NOT the weak point |
| Skeleton Archer | head ×3, body ×1 |
| Skeleton Mage | head ×3, body ×1 |
| Mage / Sorcerer | head ×3, body ×1 |
| Zombie | head ×3; torso + limbs **nullify** |
| Wasp | flat ×1 everywhere — **the default control target** |
| Queen Wasp (boss) | no modifiers anywhere |
| Uber Mage (boss) | head ×3, upper chest ×2, limbs ×1, backpack **nullifies** (he teleports when hit, even in a null zone) |
| Doomer (mini-boss) | head ×3, body ×2, limbs ×1 (zones wrap front/back) |
| Skeletal Boss | **face only** — takes NO zone multiplier but DOES take headshot-ring damage; body nullifies; crossbow bolts pierce; icing-immune |
| Octoculus (boss) | body ×2 all around; eyes give nothing; Scout's Signet does not proc |
| Blind Octoculus | **×6 everywhere**, no headshot bonus. (Owner previously heard ×8 for this family — unconfirmed; video survey wins for planning, conflict flagged in data.) |
| **Mimic** | **NO DATA AT ALL** — no zones, no usable image anywhere. Ships as silhouette + all-`?` zones, top of the measurement list. |

## Zone display rules

- Tints on the figure itself: **gold = ×3, pale = ×2, slate = ×1, hatched = nullify, hollow `?` = unmeasured.**
- Flat enemies (Wasp, Queen Wasp) get one neutral treatment and an explicit "no zone modifiers" line — flatness is a feature (baseline), never an empty state.
- The Skeletal Boss is the special case: **no multiplier badges on the body at all**; only the face carries a marker, and its copy must say "no zone multiplier — headshot perks/rings apply," never a fabricated percentage.
