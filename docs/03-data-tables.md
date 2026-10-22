# 03 — Canonical data tables

Confidence key: **Verified** (official or multi-source) · **Single-source** (one wiki or one tested video — most of this system) · **Contradicted** (sources disagree; both readings recorded) · **Unknown** (no public value exists; app renders `?`). Full evidence: `reference/research/full-report-2026-10-21.md`. Machine-readable twin: `data/damage-model.json`.

## Weapon perks — max 2 per weapon, no duplicates, + at most 1 element (Fire/Ice/Poison)

%-perks scale by tier (7 tiers): **+5 / 10 / 15 / 20 / 25 / 30 / 35%**. Chance perks: **20 / 22 / 24 / 26 / 28 / 30 / 32%**.

| Perk | Weapons | Effect | Kind |
|---|---|---|---|
| Attack Power | all | +5–35% by tier, always-on, own (1+x) factor | % |
| Criticals | all | 20–32% chance, crit = ×3 | chance |
| Throw Damage | axes (spears*) | +5–35%, thrown only | % |
| Explosions | axes (spears*) | 20–32% chance, ×2, area | chance |
| Area Damage | hammers | identical numbers to Explosions | chance |
| Stab Damage | swords, longswords | **+50% flat — no tier scaling**, stabs/thrusts only; longsword needs 2H for full benefit | flat |
| Poison | daggers | 20–32% chance to poison: slowed, can't dodge, DoT (**tick values unpublished**) | chance |
| Spectral Echo (aka Spectral Attack — name contradicted) | Spectral legendaries (guaranteed) | delayed echo hit ×2; delay/chance **unknown** | special |

Edge cases: **Reload** (crossbows) is non-damage but carries an official **−7.5% damage per tier** penalty — modelled as a penalty. **Vampire** heals 25% of *player health* — not damage, excluded. The enemy-specific family (Undead/Monster/Critter/Sorcerer/Elite/Elemental Damage, +5–35%) is documented but **excluded by scope**. No duration/cooldown/ICD is published for any perk.

## EXO Suit — 4 slots (Mind / Chest / Arms / Legs), perks to level 5, Crystal Hunt currency

| Perk | Effect (maxed builds, single-source video) |
|---|---|
| Power / Pullback | share one (1 + 0.5) = ×1.5 factor; narration's "1.3 and 1.5" mapping is ambiguous |
| Might | ×2 on throws |
| Pierce | ×2 on thrusts |
| EXO Criticals (slide: "Critical/Impale") | 40% chance, ×3; co-triggers with weapon crits for ×9 |

Per-level (1–5) values: **unknown** — any per-level numbers in older materials are placeholders, not these. Currency name contradicted (Exo Crystals vs EXO Points). Non-damage EXO names: Haste, Stillness, Vitality, Blast, Mystify. No set bonuses found.

## Rings — 2 slots (one per hand), Tomb Extraction only, crypt sigil codes

**No numeric value for any ring exists in any public source.** Values are printed on each physical ring in-game; in the app they are **user-entered fields** with a `?` state. Identical rings add inside their factor.

| Ring / Perk | Behaviour |
|---|---|
| Sundering / Armor Penetration | own (1+x+y) factor; cuts armour reduction on any location; doubles weak-point damage; testers rate it above the headshot ring |
| Scout's Signet / Precision Shot | headshots, own (1+x+y) factor; melee + ranged; thrown weapons autotarget head; useless vs Lost Souls & Octoculus boss |
| Predator / Critical Strike | adds inside **both** crit factors; testers mark it **CURRENTLY BUGGED** |
| Venom Fang / Toxic Amplifier | vs poisoned targets; testers: "quite frankly broken" |
| Hexweaver / Elemental Boost | raises elemental proc rate by an unknown amount |
| Blacksmith / Imbued Strength | raises weapon-perk proc rate by an unknown amount |
| Micro Amplifier / Nanite Surge | boosts EXO power/trigger rate by an unknown amount |
| Duelist / Riposte | reactive: stagger + small return damage (outside the hit chain) |
| Breaker's Band / Stagger Mastery | vs staggered targets |
| Shadow Strike / Backstab | from behind; **does not stack with Scout's Signet** |

Observed combined zone+ring results (testers): ×6 skeletal waist, ×9 sorcerer head, ×10 Uber Mage head.

## Weapons (guide metadata only — type is NOT a math variable)

12+ types: Axe, Bow, Crossbow, Dagger, Hammer, Shield, Staff (subtypes), Sword, Club, Longsword, Spear, Sickle. 3 carry slots (L hip / R hip / back). Base damage is a rolled value set by player level/loot tier at drop — only anchors known (130 / 150). Shields show no damage number. Owner rulings: **base damage = manual input; rarity is not a damage factor; type/base ranges are disregarded in the equation.**
