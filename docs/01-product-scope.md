# 01 — Product scope

## What Damage of Eternity is

A complete damage-system guide + calculator companion for *Dungeons of Eternity*. It models **every variable that changes the damage number, and nothing else**:

**In scope (calculator variables)**
- Weapon base damage (manual input — the number printed on the weapon)
- Weapon perks (max 2 + optional element) and their tier-scaled values and proc rates
- EXO Suit perks that modify damage exclusively
- Ring perks that modify damage exclusively (values user-entered — none are published)
- Situational modifiers: grip (1H vs 2H), attack type (swing / thrust / throw / shot), first strike, target poisoned/staggered, backstab
- Enemy hit zones (the final multiplier)

**Explicitly out of scope**
- Enemy-specific damage perks (Critter / Elite / Undead / Monster / Sorcerer / Elemental Damage family) — excluded by owner ruling; they are listed in the guide's excluded appendix for completeness but are **never calculator variables**
- Non-damage perks and gear (Reload as a perk — though its documented −7.5%/tier damage *penalty* is modelled; Vampire — heals player health, not damage)
- Enemy HP, DPS, time-to-kill — **no attack-rate or HP data exists**, so no DPS or TTK readout may ever appear
- Swing/throw strength as an input — it demonstrably exists but is completely unquantified; the calculator assumes a full-strength swing and Lab Notes carries the measurement task
- Rarity as a damage factor — owner ruling: rarity is **not** a damage factor
- Weapon type / base-damage ranges in the equation — type survives only as perk-eligibility metadata in the guide

## Experience principles

1. **One hit, one story.** Every number on screen is one hit, explained by one visible factor chain.
2. **Three numbers.** Floor (no procs) / Expected per hit / Ceiling (all procs) — with the ceiling's frequency attached. Nothing else competes with them.
3. **Probability is area.** Proc outcomes render as a 5-segment bar + a 16-pattern pip grid, never as bare percentages alone.
4. **Unknown is a visual state,** not a gap: `?`, hollow pips, hatched zones. Absence of data is information and is displayed proudly.
5. **The figure teaches.** Zone tints on the enemy itself carry the zone lesson (gold ×3 / pale ×2 / slate ×1 / hatched null / `?` unmeasured) — e.g. the Skeleton Warrior's gold *waist* and plain head teach the game's signature trap without a word of copy.
