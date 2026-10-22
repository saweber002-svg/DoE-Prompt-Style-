# DoE loot, tiers, levels, and drop-rate structure — v1 research draft

Researched 2026-10-20. Public sources only; exact percentages are not published anywhere public and are flagged as gaps for the dev team to extract from game files.

## Chest tiers (the loot table shape)

| Chest | Contents |
|---|---|
| Tier I | ≥75 coins and sometimes a cosmetic (or 100 coins instead) |
| Tier II | ≥100 coins, a potion, and either a cosmetic **or** a weapon |
| Tier III | 200 coins, a potion, a cosmetic **and** a weapon |

So weapons are a *guaranteed* drop only from Tier III chests; Tier II chests roll cosmetic-or-weapon. This is the closest public data gets to "drop rates" — there is no published per-weapon or per-perk percentage.

## Difficulty tiers

- Dungeon difficulty runs **Tier 1–7** (Tier 6–7 boss rooms spawn more bosses / extra waves).
- Suggested progression: Tiers 1–2 for levels 1–10; trust scaling until ~level 15 (community guide).

## Player level gates

- **Level 1**: tutorial dungeon (Forgotten Tombs); common + unique weapons available at the Fabricator.
- **Level 5**: Unique weapons with **elements and perks** start appearing.
- **Level 60 / 120 / 180 / 240 …**: mythic weapon unlock (one of nine, each with a unique effect + cooldown).

## Weapon material / upgrade tiers

- Auric and Spectral legendary classes each have **their own six-tier materials**, their own name colors, and their own **damage-cost tables** (official update notes, Tomb Extraction). The numeric tables are not public.
- Weapon crafting/looting uses Weapon Modules from chests; upgrades are paid at the Fabricator (damage-cost scaling).

## Realms (difficulty → loot quality)

Underworld < Sandstorm < Vilehalls < Lavaforge — Lavaforge is the most difficult and most profitable. Realm choice scales XP and loot drops.

## Perk drop context

- 4 perk columns per weapon: col 1 = 40% proc chance, cols 2–4 = 32% each (verified distribution in the damage model; 0/1/2/3/4-perk tier frequencies 18.87 / 39.21 / 30.29 / 10.32 / 1.31%).
- Auric weapons carry a **guaranteed Undead Fortune** perk; Spectral weapons carry a guaranteed **Spectral Attack** echo perk.
- A separate equipment slot (Rings, added Sept 2026) has 30+ ring types, each with its own perk — ring perks are networked and apply to teammates.
- **Gap**: named perk pools and their drop weights per column are not public — the dev team must extract from game files.

## Enemy colorization (threat tier)

Duller shades = lower tier. **Red** = Elite. **Bright Purple** = Legendary. Elemental tells: bright orange-red = fire/explosion AOE, bright blue = ice/freeze, bright green = poison/stun + DoT.

## What the dev team still needs from game files

1. Exact drop-rate percentages per weapon and per perk (public web: chest-tier structure only).
2. Auric/Spectral six-tier material names + tier→damage mapping (damage-cost tables).
3. Named perk pool per column with proc bonuses (bonus magnitudes are +25% placeholders in the model).
4. Nine mythic weapon effects and cooldowns.
5. Stacking rule confirmation (model assumes additive), rounding rule, roll independence — already tracked as Issues #1, #4, #5 on the repo.

## Sources

- Official Othergate update notes: https://www.othergate.com/updates (Auric/Spectral six-tier materials + damage-cost tables; first-strike 3x; crypt weapon details).
- Steam Tomb Extraction announcement: https://store.steampowered.com/news/app/3189340/view/717916455762395965 (crypt weapons, rings, auric/spectral behaviors).
- UploadVR Tomb Extraction coverage: https://www.uploadvr.com/dungeons-of-eternity-goes-darker-in-new-tomb-extraction-update/ (damage numbers/multipliers toggle, crypt loadout list).
- Community wiki (forsaken-planet.com, via search index): weapon class list + behaviors, scale factors (long sword ≈2x, crossbow ≈1x), chest tiers, level milestones, enemy hitbox quirks, difficulty tiers.
- Fandom wiki: https://dungeons-of-eternity.fandom.com/wiki/Dungeons_of_Eternity_Wiki (slots, mythic list).
