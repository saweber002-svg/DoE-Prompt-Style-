# Damage of Eternity — Dungeons of Eternity (Othergate) Damage Research

Date researched: 2026-10-21. Game: Dungeons of Eternity (VR, Othergate). Purpose: companion calculator app "Damage of Eternity".
Scope: ONLY effects that change a damage number the player deals. Enemy-specific damage perks (critter/elite/boss/specific-type) are excluded from calculator tables per the app owner's rule and listed separately in §8. Non-damage perks/rings are listed by name only (§9) to prove the filter was applied.
Sourcing rule applied throughout: every number carries source URL, source type, date/version where known, and confidence (verified / single-source / contradicted). Anything unsourced is written UNKNOWN — no number in this report was invented or estimated.

## Summary

- **Weapon perks:** The game's wiki (Forsaken Planet) documents a small, fixed perk pool. A weapon has **at most 2 perks** ("Any non-common/non-staff weapon will have at least one perk and at most two perks. A weapon can not have two of the same perks"), plus optionally an element (Fire/Ice/Poison). Perk values scale across **seven weapon tiers** (e.g. Attack Power +5% at tier 1 to +35% at tier 7). No perk has a documented duration, cooldown or internal cooldown anywhere in public sources — all UNKNOWN.
- **The "columns with different proc rates" claim was NOT found in any text source** despite multiple targeted searches. The wiki account (max 2 perks, no columns) is corroborated by October 2026 community damage testing, which additionally shows perk count depends on the weapon's base-damage roll (base 150 → 1 perk + element; base 130 → 2 perks + element). See §2 for the full adjudication.
- **Core formula (community-tested, Oct 2026):** damage is a chain of **multiplicative** factors applied to base damage; %-type perks (Attack Power, EXO Power/Pullback, Stab) each form their own (1 + x) factor; two identical equipped rings **add inside** one factor. Displayed numbers are rounded (multipliers to the nearest tenth, damage to the nearest whole) and hide fractional values. Full formula and worked examples in §5.
- **EXO Suit: the system EXISTS** (the prior "not found" check was wrong). Exact name: **EXO Suit / EXO Suit Perks / EXO Perks**, four slots (Mind, Chest, Arms, Legs), perks upgraded to level 5 with points earned in Crystal Hunt missions. Damage EXO perks identified by community testing: **Power / Pullback (×1.5), Might (×2 thrown damage), Pierce (×2 on thrusts), EXO Criticals (40% chance, ×3)**. See §6.
- **Weapons catalog:** 11+ weapon types, three carry slots, rarities Common/Unique/Rare/Legendary and tiers 1–7. Base damage is a rolled value tied to level/loot tier; no official per-type base-damage table exists publicly — per-type numbers are UNKNOWN except the community-tested anchors 130/150. See §7.
- **Rings: introduced by the Tomb Extraction update, 21 Sept 2026** (official). **Two ring slots** (one per hand) — this contradicts the official announcement's singular "a new equippable slot" wording; two slots is the better-supported reading (in-game UI label "Right Ring", formula testing with two identical rings). 31 ring/perk pairs are publicly documented by community video; **no numeric value for any ring was ever stated in narration** — all ring values are UNKNOWN except their structural behaviour in the formula. See §10.
- **Hit zones:** no *written* per-enemy table exists on either wiki, but a complete per-enemy zone survey exists in video form (Dungeons Demystified, Oct 2026): enemies have 1–3 zones, weak points ×2 or ×3, some zones nullify damage entirely. Full table in §11.

Confidence key: **verified** = two or more independent sources agree, or official + corroboration. **single-source** = one source only. **contradicted** = sources disagree (see §12).

---

## Findings

### 1. Damage-perk master table (weapon perks)

System statement (wiki): "Perks are enhancements to weapons. Any non-common/non-staff weapon will have at least one perk and at most two perks. A weapon can not have two of the same perks." Perks appear on Unique, Rare and Legendary weapons; the New Players Guide adds that perks appear from Level 5 Unique weapons. Weapons may also carry one element (Fire, Ice or Poison) — elements are separate from perks.
Source: https://forsaken-planet.com/wiki/Perks (wiki, indexed ~Mar 2026; confidence: single-source for the system statement, corroborated on perk counts by video testing, §2).

**Tier scaling (wiki, single-source):** "Perks values are a range across the seven weapon tiers." The Perks page gives five value columns; the column-to-perk mapping below is inferred from the ranges matching the per-perk descriptions (flagged as inference, not a verified header row):

| Weapon tier | % damage perks (5–35%) | Chance perks (20–32%) | Distance perks (10–70%) | Reload (1–7) | Absorb (4–29%) |
|---|---|---|---|---|---|
| 1 | 5 | 20 | 10 | 1 | 4 |
| 2 | 10 | 22 | 20 | 2 | 8 |
| 3 | 15 | 24 | 30 | 3 | 13 |
| 4 | 20 | 26 | 40 | 4 | 17 |
| 5 | 25 | 28 | 50 | 5 | 21 |
| 6 | 30 | 30 | 60 | 6 | 25 |
| 7 | 35 | 32 | 70 | 7 | 29 |

Source: https://forsaken-planet.com/wiki/Perks (wiki, single-source).

**Damage perks (descriptions are the wiki's exact wording):**

| Perk | Weapons | Exact description (wiki) | Effect type | Value(s) | Duration | Cooldown / ICD | Stacking |
|---|---|---|---|---|---|---|---|
| Attack Power | All weapons | "Increases damage by 5–35%" | Additive % inside its own (1+x) multiplier factor (see §5) | +5% to +35% by tier (table above) | Always on | n/a | Cannot roll twice on one weapon; combines multiplicatively with other factors (§5) |
| Criticals | All weapons | "Gives 20–32% chance to critically strike for 300% damage" | Proc (crit) | 20–32% chance by tier; crit = ×3 (300%) | Instant | UNKNOWN | Can trigger simultaneously with EXO Criticals → ×9 total (§5); can co-trigger with Fire/Explosions on melee |
| Throw Damage | Axes; Spears* | "Increases throwing damage by 5–35%" | Conditional % (thrown attacks only) | +5% to +35% by tier | Always on (throws) | n/a | Community testing: strictly worse than Attack Power, which also applies to throws (§5) |
| Explosions | Axes; Spears* | "Gives 20–32% chance to explode for 200% damage" | Proc | 20–32% chance by tier; ×2 damage, area/radius effect | Instant | UNKNOWN | Stacks multiplicatively with Fire element ×2 and crits on melee (§5) |
| Area Damage | Hammers | "Gives 20–32% chance to explode for 200% damage" | Proc | 20–32% chance by tier; ×2 damage, radius | Instant | UNKNOWN | Same behaviour as Explosions (§5) |
| Stab Damage | Swords; Longswords (Two-Handed Swords) | "Increases damage by 50%" | Conditional % (stab/thrust attacks) | +50% flat-listed; NO tier range given by wiki | Always on | n/a | Community testing: +50% at any loot tier, "even at level one"; side sword always active, longsword needs two hands for full benefit (§5) |
| Poison | Daggers | "Gives 20–32% chance to poison enemy" | Proc → DoT/status | 20–32% chance by tier; poison damage amount, tick rate and duration: **UNKNOWN** | UNKNOWN | UNKNOWN | Poisoned status: enemy slowed, can't dodge, takes damage over time (wiki Status Effect page) |
| Fire / Ice / Poison (elements, not perks) | Any weapon may roll an element | — (not a perk; listed here because it changes damage) | Elemental | Fire proc = ×2 damage (community-tested); Ice = freeze + embrittle (see §11); Poison = DoT | See §11 | UNKNOWN | Fire overrides other elements and the Slowing perk on projectiles (§5) |
| Spectral Echo / Spectral Attack | Spectral-class legendary weapons (guaranteed perk) | Official: "Hit once and your damage echoes through the undead a short time later doing double damage." | Delayed proc (echo hit) | ×2 (double damage) on the echo | Delay: "a short time later" — exact delay UNKNOWN | Proc chance: UNKNOWN (may be guaranteed) | Name differs between two official lines ("Spectral Attack" vs "Spectral Echo") — contradicted naming, §12 |
| Reload (crossbow interaction) | Crossbows | Non-damage perk, but official patch note: "Each Reload Perk tier reduces 7.5% damage per bolt/shot." | Damage penalty tied to a non-damage perk | −7.5% damage per Reload tier (official, Jan 2024) | Always on | n/a | Included because it changes a damage number; the Reload perk itself is in §9 |

\* Spear rows: spears were added 17 Oct 2024 (official); the wiki's per-weapon table reproduced in §3 predates/omits spears, but the Perks page indexing attributes Throw Damage and Explosions to spears — single-source, treat with caution.

Shield damage note (wiki FAQ): "Shields are not marked with a damage number. Damage done by a shield whether bashing or throwing is minimal, even with Perks such as Elite Damage and Criticals." Shields can carry a hidden element type (shown by colour). Source: https://forsaken-planet.com/mediawiki/index.php?title=FAQs&direction=prev&oldid=3034 (wiki, single-source).

**Lifesteal check:** the only lifesteal-style perk, **Vampire** (Daggers, Swords, Longswords), heals "25% of player health" on a 20–32% proc — it is calculated from the *player's health*, not from damage dealt, so per the mission's lifesteal rule it is classified **non-damage** and appears in §9 only. Source: wiki perk table, §3.

### 2. Proc rates and the perk-slot system — contradiction adjudicated

**Claim A (wiki account):** max **2 perks** per weapon, no columns, no slot-specific rates. "Any non-common/non-staff weapon will have at least one perk and at most two perks. A weapon can not have two of the same perks." — https://forsaken-planet.com/wiki/Perks (wiki). The New Players Guide agrees perks exist on Unique/Rare/Legendary weapons and describes no columns: https://forsaken-planet.com/mediawiki/index.php?title=New_Players_Guide&direction=next&oldid=1638 (wiki).

**Claim B (columns account, as stated in the mission):** multiple perk columns with different proc rates and a larger maximum perk count. **This account could not be located in any public text source** despite multiple targeted searches (site searches of both wikis, Steam, Reddit-indexed queries) on 2026-10-21. No URL can be cited for it. It may originate in a Discord discussion, a video, or a garbled retelling of the real systems below.

**Corroborating evidence for a 2-perk cap, plus what likely caused the confusion:**
1. Community damage testing (Oct 2026) independently states the cap in terms of the weapon's base-damage roll: "**max damage will erase a perk. At 150, you only get one perk and an element. Where at 130, that is the maximum… two perks and an element** on your spear and swords." So perk count is 1–2 and trades off against base damage — a "damage budget", not columns. Source: https://www.youtube.com/watch?v=_LDrgYbRy38 (video / community-tested, Oct 19, 2026, single-source).
2. The same testing describes a hit on which **four** damage effects trigger together — weapon Criticals + EXO Criticals + Fire + Explosions — at ~1% frequency, and calls it "four perks". A reader could easily misread this layered system (2 weapon perks + 1 element + separate EXO crit + ring modifiers, each with its own chance) as "columns of perks with different proc rates". Sources: https://www.youtube.com/watch?v=_LDrgYbRy38 and https://www.youtube.com/watch?v=zLduVm-XinY (video / community-tested, Oct 2026).
3. The actual proc chances differ *by source of the effect*, which may be the kernel of truth in Claim B: weapon Criticals 20–32% (tier-scaled, wiki), weapon proc perks 20–32% (tier-scaled, wiki), EXO Criticals 40% (community-tested formula slide), Fire element ×2 at 32% (community-tested formula slide). There are no "columns", but there *are* distinct proc pools with distinct rates.

**Verdict:** Claim A (wiki) is **better supported** — stated directly by the wiki and consistent with independent video testing. Claim B is **unlocated and unresolved**: it cannot be cited, and no slot/column proc-rate table exists in any source found. What remains genuinely unresolved: (i) whether perk count is governed by the base-damage budget alone or also by rarity; (ii) the asterisk markers on the community formula slide (see §5) are unexplained and might encode grouping rules testers have not published.

**What counts as a hit / proc triggers (community-tested, single-source family):**
- Melee: **all** perks on the weapon roll independently on each hit and can trigger simultaneously ("Weapon perks roll simultaneously and then incrementally add a multiplier").
- Ranged: **at most two** proc perks can be active on one shot, *not counting* always-on perks (Attack Power, EXO Pullback). On bows, Fire and Criticals can trigger together; **Fire overrides any other element, including the Slowing perk**. On crossbows, a critical bolt that is lit (torch) is overridden to **fire damage only** — the crit is lost.
- Thrown weapons: Attack Power and Criticals trigger on throws exactly as in melee; throwing itself grants no inherent damage bonus.
- Full all-procs event (double crit + Fire + Explosions) frequency: **~1%** of hits (matches the worked probability table in §5).

### 3. Weapon-by-perk eligibility matrix

From the wiki perk table (identical table on the Perks page, the New Players Guide, and the wiki main page revision — one wiki source family, single-source). ✔ = can roll; — = not listed.

| Perk | All | Axe | Crossbow | Bow | Dagger | Hammer | Sword | Longsword (2H Sword) | Shield | Spear |
|---|---|---|---|---|---|---|---|---|---|---|
| Attack Power | ✔ (all weapons) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔* | ✔ |
| Criticals | ✔ (all weapons) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔* | ✔ |
| Throw Damage | | ✔ | | | | | | | | ✔† |
| Explosions | | ✔ | | | | | | | | ✔† |
| Poison | | | | | ✔ | | | | | |
| Area Damage | | | | | | ✔ | | | | |
| Stab Damage | | | | | | | ✔ | ✔ | | |
| Slowing (non-dmg) | | | ✔ | ✔ | | ✔ | | | | |
| Reload (non-dmg) | | | ✔ | | | | | | | |
| Shot Distance (non-dmg) | | | | ✔ | | | | | | |
| Throw Distance (non-dmg) | | ✔ | | | ✔ | ✔ | | | | ✔† |
| Vampire (non-dmg, §1) | | | | | ✔ | | ✔ | ✔ | | |
| Throwable (non-dmg) | | | | | | | ✔ | | | |
| Unblockable (non-dmg) | | | | | | | | ✔ | | |
| Knock-back Distance (non-dmg) | | | | | | | | ✔ | ✔ | |
| Absorb (non-dmg) | | | | | | | | | ✔ | |

\* Shields: FAQ says shield damage is minimal even with Criticals, and shields carry no displayed damage number — eligibility inferred from "All Weapons"; treat as single-source/uncertain.
† Spear rows from Perks-page indexing only; the per-weapon table omits spears (added to the game Oct 2024). Single-source.
Sources: https://forsaken-planet.com/wiki/Perks ; https://forsaken-planet.com/mediawiki/index.php?title=New_Players_Guide&diff=next&oldid=2374 ; https://forsaken-planet.com/mediawiki/index.php?title=Dungeons_Of_Eternity&direction=next&oldid=790 (all wiki, read via search index 2026-10-21 — direct fetch of forsaken-planet.com failed, see Could not verify).

- **Mutual exclusivity:** the only documented rule is "A weapon can not have two of the same perks." No other exclusivity pairs are documented for weapon perks — UNKNOWN beyond that. (Ring exclusivity does exist: Scout's Signet does not stack with the Backstab perk, §10.)
- **Fixed perks on named/special weapons:** Spectral-class legendaries always carry Spectral Echo/Spectral Attack; Auric-class legendaries always carry Undead Fortune (not damage — coin drops). Crypt weapons (Sept 2026): Crypt/Tomb Breaker Hammer — one-hit kill on ordinary skeletons (fixed effect); Skull Dagger, Gravelight Bow, Crypt Keeper's Staff, Necromancer Staff — fixed damage values UNKNOWN. Source: official update notes, https://www.othergate.com/updates (official, Sept 21, 2026).
- **Tier/level requirements:** perks appear from Level 5 Unique weapons (wiki New Players Guide, single-source); Tier 7 weapon styles require level 50+ (official, May 2, 2024); Mythic weapons at character level 60 (see §7 contradiction).

### 4. [Reserved — interactions are §5]

### 5. Core damage formula, interactions, and situational modifiers

**Master formula (community-tested, Dungeons Demystified formula slide, screenshot-verified live 2026-10-21; single-source but the only published formula):**
Source: https://www.youtube.com/watch?v=_LDrgYbRy38 (video / community-tested, Oct 19, 2026).

```
MODIFIER = (1 + [SUNDERING RING] + [SUNDERING RING])
         × (1 + [SCOUT'S SIGNET] + [SCOUT'S SIGNET])*
         × (1 + [ATTACK POWER])
         × (1 + [POWER/PULLBACK])
         × (1 + [STAB DAMAGE])
         × [FIRE]*
         × [EXPLOSIONS]*
         × ([CRITICAL/IMPALE] + [PREDATOR'S RING] + [PREDATOR'S RING])**
         × ([CRITICALS] + [PREDATOR'S RING] + [PREDATOR'S RING])**
         × [MIGHT]**
         × [PIERCE]**
         × [HANDLING BONUS]
         × [ENEMY ZONE]
DAMAGE   = [MODIFIER] × [BASE DAMAGE]
```

Slide values (max tier): Attack Power 0.35; Power/Pullback 0.5; Stab Damage 0.5; Fire 2 (32% chance); Explosions 2 (32% chance); Critical/Impale 3 (40% chance); Criticals 3 (32% chance); Might 2; Pierce 2; Handling Bonus 1.5 (dagger) / 2 (greatsword, axe, spear, hammer); ring values are read off the individual ring ("value listed on ring"); Predator's Ring noted "(CURRENTLY BUGGED)". The slide's `*` and `**` footnote markers are **not explained** in any captured material — UNKNOWN what they denote (possibly always-on vs proc grouping).

Order-of-operations facts this establishes:
- %-bonuses from *different* sources are **separate multiplicative factors**, not one additive pool: (1+Attack Power) × (1+Power/Pullback) × (1+Stab).
- Two copies of the *same* ring **add inside** a single factor (Sundering, Scout's), and Predator's Ring adds inside **each** crit factor — direct evidence two identical rings can be worn and stack additively within their group.
- Ring groups multiply with everything else. Enemy zone is the final factor before base damage.
- **Rounding:** "when it says four times damage, it's not four times damage. It's 4.05. The multipliers are rounded up to the nearest tenth. The damage itself is rounded up to the nearest [whole]." Displayed numbers therefore conceal fractional multipliers (0.5, 0.05, 0.15→0.1 components). Source: https://www.youtube.com/watch?v=zLduVm-XinY (video / community-tested, Oct 8, 2026; guest tester "Pimp Nokio", author of a community calculator app/website — a direct analogue of this project).

**Worked example (same testers' calculator table, screenshot-verified; weapon base damage 130, test enemy zones HEAD ×3 / BODY ×2 / LIMB ×1):**

| Proc combination | Chance | Total modifier | Head damage | Limb damage |
|---|---|---|---|---|
| Fire+ Crit + Crit + Explosions (max) | 1% | ×730.1 | 94,910 | — |
| Crit only (most common big outcome) | 39% | — | — | — |
| No procs | 19% | ×20.3 (head) / ×6.8 (limb) | 2,636 | 879 |

Full table: notes/source-videos-mostdamage-table.md. The "nearly 95,000 damage" headline in the narration matches 130 × 730.1 = 94,910.

**Can proc damage crit / proc?** Partially answered: crits are factors in the same multiplication, so a crit multiplies Fire/Explosion damage on the same hit (they co-trigger rather than chaining). Whether an explosion's damage can itself roll a separate crit, or a proc can trigger another proc, is **not documented — UNKNOWN**. DoT (poison) ticking rules: **UNKNOWN** (no tick value/interval in any source).

**Grip / handling modifiers (community-tested, single-source, partly self-contradictory — see §12):**
- Two hands on spear, hammer, greatsword: **×2** ("handling bonus"). Two hands also multiplies weak-zone damage.
- Axe: narration says **×3 in one hand, ×6 in two hands** — contradicts the same video's slide (axe in the ×2 group). CONTRADICTED.
- Dagger: cannot be two-handed; stabbing an enemy gives **×1.5**.
- Longsword: must be used two-handed for its full damage (×2 handling); in one hand it keeps Fire/Criticals procs but loses damage. Separately, a top-rated Steam review says two-handed weapons wielded in one hand "will not benefit from most special effects" (community, https://steamcommunity.com/app/3189340/reviews/?browsefilter=toprated&snr=1_5_100010_).
- Dual wielding: no damage modifier documented — UNKNOWN. Off-hand/shield damage effect: none documented beyond shield damage being minimal (wiki FAQ).
- Swing velocity: swinging harder does more damage (GamingTrend review, unquantified — https://gamingtrend.com/reviews/dungeons-of-eternity-on-meta-quest-3-virtual-dungeon-deliving-with-friends/); Damage 101 notes one-handed greatsword damage is *less consistent* than two-handed, mechanism unexplained. No numbers — UNKNOWN.
- Counterweight from Damage 101's conclusion: two hands double damage "but that's actually sometimes less damage than you would otherwise be doing in one hand more consistently."

**Critical hits:** base crit chance with no perks: **UNKNOWN** (no source; every sourced crit comes from a perk). Weapon Criticals: 20–32% chance, ×3 (wiki + slide agree on ×3/32% max — verified across wiki and video). EXO Criticals ("Critical/Impale" on the slide): 40% chance, ×3, and can trigger on the same hit as weapon Criticals for **×9**. Crit vs weak point are independent factors (a crit to a ×3 zone multiplies both). Display quirk: when Fire triggers, the damage number shows **red even on a crit**, so yellow crit numbers understate the biggest hits.

**Conditional modifiers:**
- **First strike:** "unaware enemy takes 3× damage on first hit" — official, Tomb Extraction notes (Sept 21, 2026), stated in a Crypt/patrol context; whether it applies game-wide is unresolved. Source: https://www.othergate.com/updates (official).
- **Backstab:** exists as the Shadow Strike ring perk (damage from behind, melee and ranged) — value UNKNOWN (§10). No weapon-perk backstab exists.
- **Charged/heavy attacks:** Mythic weapons (Sept 2025) have "powerful charged up moves" (official teaser only, no numbers — UNKNOWN). No general charged-attack multiplier documented.
- **Thrown weapons:** no inherent throw bonus; Attack Power/Criticals apply; EXO Might ×2 applies to throws (§6); Throw Damage perk +5–35% applies to throws only (§1).
- **Bow full draw:** EXO Pullback (×1.5 within the Power/Pullback factor) is *presumably* the full-draw bonus — the name and its "always-on for ranged" treatment support this, but no source states it explicitly — UNCONFIRMED.
- **Elemental/status:** only **one status effect can affect a player or enemy at a time**; a new status replaces the old (wiki Status Effect page, https://forsaken-planet.com/wiki/Status_Effect). Iced: freezes a few seconds, enemy becomes embrittled, **next hit will kill them**. Poisoned: slowed, cannot dodge, damage over time (amount UNKNOWN). Bosses cannot be frozen but ice still damages them (official, Dec 14, 2023). Fire on projectiles overrides other elements/Slowing (§2).
- **Enemy armour:** every enemy has an armour value; hammers are "more effective on armored hostiles" (wiki, no number); the Sundering ring reduces armour's damage reduction and **doubles weak-point damage** (§10). Per-enemy armour values: UNKNOWN.
- **Difficulty & co-op scaling:** difficulty tiers 1–7 (Tier 7 "Nightmare", May 2024); playing above the recommended tier scales XP/Gold and grants +1 tier better loot (official, Jan 31, 2025); 4-player co-op added Dec 14, 2024. Exact enemy HP/damage scaling numbers per tier or per player count: **UNKNOWN** — no public source.
- **Buffs:** Quad Damage Potion exists (Fandom potions list; the Doomer boss drops a "quad potion" when it roars — hit-boxes video). Its multiplier and duration are **UNKNOWN — do not assume 4×**; two targeted searches found no value. Ring perks Conquest/Alchemist extend potion duration (non-damage).
- **Damage Numbers display:** added by the Tomb Extraction update, **Sept 21, 2026** (official): numbers rise off enemies, toggleable in the pause menu ("show damage dealt"), hit multipliers are shown, crits are gold, multipliers get blue tints. Sources: https://www.othergate.com/updates (official); https://www.uploadvr.com/dungeons-of-eternity-goes-darker-in-new-tomb-extraction-update/ (press, Sept 26, 2026); hit-boxes video confirms the in-game toggle.

### 6. EXO Suit — damage perks (added track 1)

**Verdict: the system EXISTS.** The prior public check that found "no clearly documented exo-suit system" is superseded. Exact in-game name: **EXO Suit**, its perks called **EXO Suit Perks / EXO Perks**, selected on an "EXO Point Board" in the player's room (left of the door: "upgrade your suit with buffs known as EXO Suit Perks" — wiki New Players Guide).
- **Slots/pieces: four — Mind, Chest, Arms, Legs.** Each slot offers a set of perk choices, unlocked as the character levels; each perk upgrades **up to level 5**. Source: top-rated Steam review, https://steamcommunity.com/app/3189340/reviews/?browsefilter=toprated&snr=1_5_100010_ (community). Wiki FAQ corroborates slot-based advice: "**Arm slot should be assigned damage-increasing perks depending on your weapon**" and "EXO Perks give buffs like speed, dodging, and critical hits" (https://forsaken-planet.com/mediawiki/index.php?title=FAQs&direction=prev&oldid=3034, wiki).
- **Currency:** earned from **Crystal Hunt** missions. Name CONTRADICTED: "Exo Crystals" (Steam review) vs "EXO Points given at end of Crystal Hunt missions" (wiki/FAQ) vs "exo-points" (UploadVR 2026). See §12.
- **Introduction date:** UNKNOWN precisely. The system is present in launch-era material and official notes reference EXO perks by Oct 2024 (Mystify fix, Oct 17, 2024) and "New Exo Perks to unlock!" (Dec 14, 2024), but no patch note introducing the system itself was found in the full Othergate update history (read in full, Oct 2023–Sept 2026). Treat as launch-era, unproven.
- **Armour note:** worn armour in the game is entirely cosmetic (Steam review); the EXO Suit is the stat system. No set bonuses found in any source.

**Damage EXO perks (all values community-tested video, Oct 2026, single-source; per-upgrade-level values UNKNOWN — testers used maxed builds):**

| EXO perk | Effect | Value | Conditions | Source |
|---|---|---|---|---|
| Power | Damage increase (own (1+x) factor with Pullback) | ×1.5 total factor (slide: 0.5) | Always on; narration pairs "1.3 and 1.5" across Attack Power/Power-Pullback ambiguously — see §12 | https://www.youtube.com/watch?v=_LDrgYbRy38 |
| Pullback | Damage increase, grouped with Power on the formula slide | ×1.5 total factor (slide: 0.5) | Treated as always-on for ranged weapons; presumably bow-draw related — UNCONFIRMED | same |
| Might | Throwing damage | ×2 | Thrown attacks only ("situational") | same |
| Pierce | Damage on thrusting attacks | ×2 | Triggered by thrusting your weapon | same |
| EXO Criticals ("Critical/Impale" on slide) | Critical strike chance | 40% chance, ×3 damage | Can co-trigger with weapon Criticals → ×9; whether the perk is named "Impale" is unconfirmed (an "Impale Perk" icon is mentioned in official Oct 30, 2023 notes) | same + https://www.othergate.com/updates |

- **Combination with weapon damage:** EXO factors are separate multiplicative factors in the master formula (§5) — they multiply weapon perks rather than adding to them.
- **Ring interaction:** the Micro Amplifier / Nanite Surge ring boosts EXO suit effectiveness, including "power enhancing perks, allowing us to trigger our perks more often" (§10) — value UNKNOWN.
- **Non-damage EXO perks (names only):** Haste (Legs), Stillness (Mind), Vitality (Chest, ~level 15), Blast (Chest), Mystify (Mind). Source: wiki FAQ (names/gist only).

### 7. Weapons catalog (added track 2)

**Weapon types** (wiki + official patch history): Axe, Bow, Crossbow, Dagger, Hammer, Shield, Magic Staff, Sword (side sword), Club (launch-era), Longsword/Two-Handed Sword (added May 2, 2024), Spear (added Oct 17, 2024), Sickle (added Oct 25, 2025). Staff subtypes: Fireball, Ice, Chrono, Healing, Shockwave, Melee Staff, Santa's Fireball Staff. Cluster Bomb became a permanent weapon Jan 26, 2026.
Sources: https://forsaken-planet.com/mediawiki/index.php?title=Dungeons_Of_Eternity&direction=next&oldid=790 (wiki); https://www.othergate.com/updates (official).

**Carry/wielding:** three slots — Left Hip, Right Hip, Back. Either hand can draw any weapon. Back slot takes two-handed types (bow, staff, two-hand sword, shield). Crossbows are one-handed (off-hand pulls the string). Swords are throwable only with the Throwable perk; soft-tracking thrown weapons: daggers, axes, maces, spears. Wielding/damage interactions (two-hand ×2 etc.) are in §5.
**Mythic weapons** (Sept 11, 2025, official teaser; detailed notes never published by Othergate): nine types — Crossbow, Bow, Greatsword, Shield, Spear (back); Axe, Dagger, Hammer, Side Sword (hip). Acquisition CONTRADICTED: at level 60 (and 120, 180, 240…) per Fandom vs prestige at level 60 returning to level 1 per Steam review (§12). Mythic charged-move damage: UNKNOWN.

**Base damage / scaling — the honest picture:** there is **no published per-type, per-level base-damage table** in any official or wiki source. What is sourced:
- A weapon's displayed base damage is a rolled value; community testing anchors the top of the range: **130** = highest roll that keeps 2 perks + element; **150** = highest roll, drops to 1 perk + element (spear/swords). Highest-base-damage types: **spear, side sword, long sword**. Source: https://www.youtube.com/watch?v=_LDrgYbRy38 (video, single-source).
- Wiki scaling claim: weapon damage ≈ **1×–2× the player's level at drop**, scaling to level 60; crossbows nearer 1×, long swords nearer 2×. Source: https://forsaken-planet.com/mediawiki/index.php?title=Dungeons_Of_Eternity&direction=next&oldid=790 (wiki, single-source).
- Rings-video rule of thumb: "your level will determine your loot tier, which is what sets the percentage and power level of your weapons. As a rule of thumb, **every five levels, the percentage and power of your weapons increase by five**." Source: https://www.youtube.com/watch?v=LUoV4_O9RKc (video, single-source).
- Worked example available: the §5 table (base 130 weapon → 94,910 max head hit) is the only fully-worked public example.
- Official one-liners: "Sword damage was adjusted and has the highest damage now" (May 2, 2024) — note this predates spears (Oct 2024) and conflicts loosely with the 2026 testers naming spear/swords together at the top; dagger damage increased Oct 30, 2023 (no number); Bomb damage ×4 (May 29, 2024) then AOE ~×2 again (July 23, 2024). Source: https://www.othergate.com/updates (official).

**Rarities/tiers:** rarities Common, Unique, Rare, Legendary (perks only on Unique+). Weapon tiers 1–7 drive perk values (§1); Tier 7 "Nightmare" difficulty and Tier 7 styles at level 50+ (official, May 2024). Auric and Spectral legendary classes (Sept 2026) use **six-tier materials** and carry guaranteed perks (§3). Rarity multipliers, drop rates: UNKNOWN. Do not conflate chest tiers I/II/III (loot containers) with weapon tiers. Crafting: at the Fabricator from Weapon Modules found in chests, or bought with gold (wiki).

**Named/special weapons:** Crypt set (Sept 21, 2026, official): Crypt Keeper's Staff, Necromancer Staff, Gravelight Bow, Crypt/Tomb Breaker Hammer (one-hit kill on ordinary skeletons), Skull Dagger. Damage values for all: UNKNOWN. Santa's Fireball Staff (event staff subtype, wiki).

**Level/difficulty interaction:** player level sets loot tier → weapon percentage and power (above); weapon level = the level at which it dropped (implied by wiki scaling); playing above your recommended difficulty tier gives +1 tier loot (official Jan 2025). A precise formula is NOT published — UNKNOWN.

### 8. Excluded by scope — enemy-specific damage perks (owner's rule; NOT calculator variables)

All from the wiki's All-Weapons perk family at **+5–35%** by tier unless noted. Source for the family: https://forsaken-planet.com/wiki/Perks and New Players Guide (wiki, single-source). The New Players Guide names Elite Damage explicitly as an all-weapon perk example.

| Excluded perk | Target | Value | Source |
|---|---|---|---|
| Undead Damage | Undead enemies | +5–35% by tier | wiki Perks page |
| Monster Damage | Monsters | +5–35% by tier | wiki Perks page |
| Critter Damage | Critters | +5–35% by tier | wiki Perks page |
| Sorcerer Damage | Sorcerers | +5–35% by tier | wiki Perks page |
| Elite Damage | Elites | +5–35% by tier | wiki Perks page / New Players Guide |
| Elemental Damage | Elemental enemies (name is ambiguous — may mean damage *to* elemental-type enemies) | +5–35% by tier | wiki Perks page |
| Undead ring (ring, name not captured) | Undead | Value UNKNOWN; used in a 100-base-damage bow test | https://www.youtube.com/watch?v=zLduVm-XinY |
| Auric guaranteed perk "Undead Fortune" | — | NOT damage (chance on hit to drop coins) — listed here only because it sits on a damage-adjacent weapon class | official, https://www.othergate.com/updates |

Note: enemy classification changed Sept 21, 2026 (official): Loot Goblin/Imps count as monsters, scorpions as critters — relevant if the app ever revisits these perks.

### 9. Non-damage perks/rings encountered (names only — filter proof)

**Weapon perks (non-damage):** Slowing (Crossbows, Bows, Hammers — slows enemy; its damage relevance is only via the status system, the perk itself changes no damage number), Reload (Crossbows — extra shots; but see the −7.5%/tier damage interaction in §1), Shot Distance (Bows), Throw Distance (Axes, Daggers, Hammers, Spears), Vampire (Daggers, Swords, Longswords — heals % of *player health*, not damage-based), Throwable (Swords), Unblockable (Longswords), Knock-back Distance (Longswords, Shields), Absorb (Shields — heals % of player health on block).
**EXO perks (non-damage):** Haste, Stillness, Vitality, Blast, Mystify.
**Rings (non-damage):** Purity Ring/Purity, Toxic Conduit/Biohazard, Ice Conduit/Arctic Warrior, Heat Conduit/Blast Proof, Conquest/Kill Momentum, Alchemist Ring/Potion Master, Lucky Conduit/Agility, Treasure/Gold Rush, Scary/Attack Delay, Guardian's Signet/Shield Guard, Survivor's Ring/Last Stand, Vampire Signet/Blood Lust, Time Bender/Mythic Haste, Berserker's Loop/Battle Frenzy, Rush/Combat Rush, Reaper/Killing Spree, Chrono Conduit/Slipstream, Undying Band/Overheal, Ring of Fortitude/Damage Cap, Power Conduit/Iron Muscle, Band of Salvation/Medic Specialist, Scavenger/Weapon Finder.

### 10. Rings that modify damage (added track 3)

**System basics:**
- Introduced by the **Tomb Extraction update, September 21, 2026** (official: "Over 30 new ring types each with their own special perks", "a new equippable slot"). Sources: https://www.othergate.com/updates (official); https://store.steampowered.com/news/app/3189340/view/717916455762395965 (official/Steam); https://www.uploadvr.com/dungeons-of-eternity-goes-darker-in-new-tomb-extraction-update/ (press, Sept 26, 2026).
- **Slots: TWO — one per hand.** UploadVR's review: "You have two new slots, a ring for each hand… Rings can only be acquired in Tomb Extraction." (https://www.uploadvr.com/dungeons-of-eternitys-tomb-extraction-update-is-a-rune-aissance-for-an-aging-game/, press). Corroborated by the rings video's "Right Ring" equip-slot UI label and by formula testing that equips two identical rings (§5). The official singular "a new equippable slot" is the outlier — CONTRADICTED, two slots better supported.
- **Obtaining:** rings drop only in Tomb Extraction dungeons, which are launched by entering crypt sigil/rune symbol codes; the same code always launches the same dungeon; multiple rings can drop per run, including rings other than the code's listed one. Source: https://www.youtube.com/watch?v=LUoV4_O9RKc (video / community, Sept 25, 2026).
- **Rarities:** Rare and Legendary confirmed (official Sept 26, 2026 fix: "only rare rings being given out as crypt loot"; Damage 101: legendary Scout's/Sundering have bigger numbers). Full rarity list/order: UNKNOWN. A commenter even asks whether Rare can out-power Legendary — unresolved.
- **Values:** every ring prints its value on the ring ("value listed on ring" — formula slide), but **no numeric ring value is stated in any narration, wiki page or patch note found**. Fixed vs rolled per type: UNKNOWN. Upgrading rings: UNKNOWN (no source).

**Damage rings (ring name / perk name — rings and perks have different names). All values UNKNOWN unless noted; source for the whole list: https://www.youtube.com/watch?v=LUoV4_O9RKc (video / community, Sept 25, 2026) plus §5/§11 videos where noted.**

| Ring / Perk | Effect (as described) | Type | Stacking / conditions |
|---|---|---|---|
| Venom Fang / Toxic Amplifier | "increasing the damage output against poisoned enemies… quite frankly broken" | Conditional % (vs poisoned) | Value UNKNOWN |
| Hexweaver / Elemental Boost | "more elemental activation" — raises elemental proc activation (showcased with 8-shot ice crossbows) | Proc-rate modifier | Value UNKNOWN |
| Blacksmith / Imbued Strength | "allows you to activate your weapons perks" — raises weapon-perk activation rate | Proc-rate modifier | Value UNKNOWN |
| Predator Ring / Critical Strike | "increases your critical hit damage" | Crit damage (adds inside BOTH crit factors, §5) | Two can be worn; formula slide marks it "(CURRENTLY BUGGED)" |
| Duelist / Riposte | Staggers enemies that hit you; "also does a small amount of damage in return" | Reactive proc damage | Must take damage to trigger; amount UNKNOWN |
| Breaker's Band / Stagger Mastery | "deal additional damage to a staggered enemy" | Conditional % | Works with parry/block stagger, Spectral weapon effects, and the Riposte ring |
| Shadow Strike / Backstab | "increases damages to enemies attacked from behind" | Conditional % | Melee AND ranged; does NOT stack with Scout's Signet's perk (see next row) |
| Scout's Signet / Precision Shot | "increases headshot damage" | Conditional (headshot) — own (1+x+y) factor in formula | Melee and ranged; thrown weapons autotarget the head; does NOT stack with the Backstab perk; two Signets add together (§5). Does nothing vs Lost Souls or the Octoculus boss (§11) |
| Sundering Ring / Armor Penetration | "additional damage" vs armoured enemies (skeletal warrior, scorpions, zombies, imps after horns removed, skeletal boss) | Armour interaction — own (1+x+y) factor | Per Damage 101: reduces armour's damage reduction, applies on ANY body location, and weak-point damage is doubled with it; two Sunderings add together; stacks with Scout's Signet; testers call it stronger than the headshot ring even for headshots |
| Micro Amplifier / Nanite Surge | Boosts EXO suit effectiveness — "increasing our power enhancing perks, allowing us to trigger our perks more often" | Indirect damage (via EXO perks) | Value UNKNOWN |
| Undead ring (name not captured) | Enemy-specific damage | EXCLUDED BY SCOPE — see §8 | — |

**Combination rule (worked behaviour):** rings multiply with weapon/EXO factors; identical rings add within their factor. Observed combined zone+ring modifiers in testing (Damage 101): ×6 skeletal-warrior waist (Sundering), ×9 sorcerer head (Scout's + Sundering), "9.5" displayed on a zombie headshot with both rings, ×6/6.3 imp head, **×10 Uber Mage head with rings**. Source: https://www.youtube.com/watch?v=zLduVm-XinY (video / community-tested).
**Open community question (unanswered):** "Which rings stack and which don't stack?" — full stacking matrix does not exist publicly.

### 11. Hit-location / hitbox multipliers (added track 4, continued)

**No written per-enemy multiplier table exists** on either wiki (checked). A complete survey exists in video form: "All hit boxes in dungeons of eternity", Dungeons Demystified, Oct 9, 2026 — https://www.youtube.com/watch?v=VpAyfSrzPp4 (video / community-tested, single-source). Model: each enemy has 1–3 zones; zones are standard (×1), weak point (×2 or ×3), or nullification (×0). Combined with Damage 101 (https://www.youtube.com/watch?v=zLduVm-XinY):

| Enemy | Zones |
|---|---|
| Small spider | ×3 everywhere |
| Large spider | Legs ×1, thorax ×2, face ×3 |
| Skeletal warrior / minion | Waistband ×3 (wraps whole waist); head and torso ×1 (head is NOT a weak point) |
| Archer / Mage (sorcerer class) | Head ×3, body ×1 |
| Large scorpion | Limbs ×1, head or tail ×2, claws nullify |
| Zombie | Head ×3; torso and limbs nullify (joints can be dismembered); AoE radius can envelop the head |
| Imp | Chin/neck ×2 only (no ×3); horns nullify until knocked off |
| Blind Octoculus | ×6 wherever hit; no headshot bonus |
| Wasps / bats | No modifiers; bats usually show only 2 damage even on a crit (AoE overrides) |
| Lost Souls (flying skulls) | ×2 overall; Scout's Signet adds nothing |
| Slimes | ×3 all around |
| Uber Mage (boss) | Head ×3, upper chest ×2, limbs ×1, backpack nullifies; teleports when hit even in a null zone |
| Doomer ("Chungus", boss) | Head ×3, body ×2, limbs ×1; zones wrap front/back; roar drops a Quad Damage Potion (shoot its mouth to trigger) |
| Octoculus (boss) | Body ×2 all around; eyes give no extra damage; Scout's Signet does not proc |
| Queen Wasp (boss) | No modifiers anywhere |
| Skeletal Boss | Face is the ONLY vulnerable point (body nullifies; consistent with wiki: face opening is the only weak spot, crossbow bolts pierce its armour, icing-immune — https://forsaken-planet.com/mediawiki/index.php?title=Skeleton_Boss&diff=3176&oldid=2883); face takes NO zone multiplier, but DOES take headshot-ring damage |

Status/element reference (wiki Status Effect page, https://forsaken-planet.com/wiki/Status_Effect): one status at a time; Iced = freeze + embrittle + next hit kills; Poisoned = slow + no dodge + DoT. The wiki's older main-page element table says Ice = "freeze a few seconds" with NO embrittlement — wiki-internal contradiction (§12); the dedicated Status Effect page is the newer source.

### 12. Contradictions (complete list)

1. **Perk columns vs max-2:** mission-reported "multiple columns with different proc rates" — never located in any citable source; wiki + video testing support max 2 perks, no columns. Adjudicated in §2. UNRESOLVED residue: the unidentified origin of the columns account.
2. **Ring slots:** official/Steam/UploadVR-news "a new equippable slot" (singular) vs UploadVR review "two new slots, a ring for each hand" + "Right Ring" UI + two-identical-ring formula tests. Verdict: **two slots**, official wording is the outlier.
3. **EXO currency:** "Exo Crystals" (Steam review) vs "EXO Points" (wiki/FAQ/official) vs "exo-points" (UploadVR).
4. **Spectral perk name:** "Spectral Attack" vs "Spectral Echo" — both appear in official Sept 2026 material.
5. **Vampire chance on Two-Handed Swords:** 20–32% (Perks page) vs 20–30% (New Players Guide summary table) — same wiki, two pages.
6. **Mythic acquisition:** at level 60/120/180/240… (Fandom) vs prestige at 60 resetting to level 1 (Steam review).
7. **Ice effect:** older wiki element table (freeze only, no embrittlement) vs Status Effect page (embrittled, next hit kills).
8. **Handling bonus — axe:** formula slide puts axe in the ×2 group; the same video's narration says axe is ×3 one-handed / ×6 two-handed. Internal inconsistency in a single source.
9. **Power/Pullback narration vs slide:** narration "increase your damage by 1.3 and 1.5, respectively" (ambiguous mapping across Attack Power / Pullback / Power) vs slide's single [POWER/PULLBACK] = 0.5 (×1.5) factor alongside Attack Power 0.35 (×1.35 ≈ the spoken "1.3"). Most consistent reading: Attack Power ×1.35, Power/Pullback ×1.5 — but the narration does not prove it.
10. **"Head = weak point" assumption:** false in general — skeletal warrior head is standard (waist ×3), skeletal boss face is vulnerable but not a weak point, imp weak point is ×2 not ×3. The most-damage calculator's generic HEAD ×3 / BODY ×2 / LIMB ×1 table applies only to its test enemy.
11. **Uber Mage stomach zone:** Damage 101 says stomach takes no bonus; the hit-boxes video's wording can be read as stomach ×2 with the chest. Minor, single-channel wording discrepancy.
12. **First-strike ×3 scope:** official text places the 3× first-hit-on-unaware-enemy rule in a Tomb Extraction/Crypt patrol context; community material does not confirm whether it applies in all dungeon types.

### 13. Unknowns / gaps (explicit)

- Durations, cooldowns and internal cooldowns for **every** weapon perk — no source exists.
- Poison DoT: damage per tick, tick interval, duration — UNKNOWN.
- Spectral Echo: exact delay, proc chance (if any), whether it can crit, whether it is undead-only (official text says "echoes through the undead") — UNKNOWN.
- Whether proc damage (explosions/fire) can itself crit or proc; DoT ticking order vs procs — UNKNOWN.
- Base crit chance without any crit perk — UNKNOWN (possibly zero; not stated anywhere).
- All numeric ring values, ring rarity order/multipliers, fixed-vs-rolled ring stats, ring upgrading — UNKNOWN.
- EXO perks: full perk list, slot assignment per damage perk (Arm slot implied by FAQ only), values per upgrade level 1–5, EXO system introduction patch/date, set bonuses (none found) — UNKNOWN.
- Per-type base damage tables by level/rarity; rarity multipliers and drop rates; exact level/loot-tier formula; difficulty-tier and co-op scaling numbers — UNKNOWN (only the anchors in §7 exist).
- Quad Damage Potion multiplier and duration — UNKNOWN (existence verified; name must not be read as a value).
- Bow full-draw bonus as a distinct mechanic; dual-wield damage modifier; swing-velocity damage curve; charged-attack multipliers (incl. Mythic charged moves) — UNKNOWN/unquantified.
- The `*` / `**` markers on the community formula slide — unexplained.
- Whether first-strike ×3 applies outside Tomb Extraction — unresolved (§12.12).
- Exact in-game description text for perks: the wiki wording in §1 is the closest public text; verbatim in-game strings were not captured for any perk.

## Could not verify

- Direct page fetches of forsaken-planet.com failed (network/DNS) under a standing instruction not to retry them; all Forsaken Planet content here comes from the search index, which reproduced the perk table identically from three pages of that wiki. Treat wiki facts as single-source (one wiki family) even where quoted from multiple of its pages.
- The "perk columns" account (§2, Claim B) could not be found in any citable public source; it may live in Discord or video content not indexed as text.
- YouTube transcripts are auto-generated captions; numbers were cross-checked against on-screen slides/tables by screenshot where the source provided them (formula slide, worked-example table). Ring values were never stated numerically in any transcript.
- The legendary-ring-codes video ("legendary ring codes for dungeons of eternity", 6:51) was identified but not watched; it may contain legendary ring values — flagged as the top follow-up source.
- Othergate's detailed Mythic Promotion notes were, by the developer's own admission, never published; Mythic mechanics rest on teasers and community claims.

## Sources

Official:
- Othergate Update Notes (full patch history, Oct 2023 – Sept 2026, read in full 2026-10-21) — https://www.othergate.com/updates — official. Tomb Extraction (Sept 21, 2026): rings, damage numbers, first strike ×3, Spectral/Auric classes, Crypt weapons; Mythic Promotion teaser (Sept 11, 2025); Longsword + Tier 7 (May 2, 2024); Spears (Oct 17, 2024); Crossbow/Reload rebalance (Jan 2024); Sickle (Oct 25, 2025); Bomb ×4 (May 29, 2024).
- Steam News, Tomb Extraction Update — https://store.steampowered.com/news/app/3189340/view/717916455762395965 — official.
- Steam top-rated reviews page (EXO 4 slots / level-5 upgrades; one-handed two-handers lose special effects; mythic prestige claim) — https://steamcommunity.com/app/3189340/reviews/?browsefilter=toprated&snr=1_5_100010_ — community.

Wiki (Forsaken Planet — named by the Fandom wiki as the most up-to-date wiki; all read via search index, see Could not verify):
- Perks — https://forsaken-planet.com/wiki/Perks — wiki. Max-2 statement, tier value table, per-perk descriptions, excluded family.
- Status Effect — https://forsaken-planet.com/wiki/Status_Effect — wiki. One-status rule, Iced/Poisoned definitions.
- FAQs (oldid 3034) — https://forsaken-planet.com/mediawiki/index.php?title=FAQs&direction=prev&oldid=3034 — wiki. Shield damage, EXO Points/Perks, Arm-slot advice.
- New Players Guide (oldid 1638 / diff oldid 2374) — https://forsaken-planet.com/mediawiki/index.php?title=New_Players_Guide&direction=next&oldid=1638 — wiki. Perk table, EXO Suit room text, Level 5 perks.
- Main page revision (oldid 790) — https://forsaken-planet.com/mediawiki/index.php?title=Dungeons_Of_Eternity&direction=next&oldid=790 — wiki. Perk table, weapon list, 1×–2× level damage scaling, chest tiers.
- Skeleton Boss (diff 3176) — https://forsaken-planet.com/mediawiki/index.php?title=Skeleton_Boss&diff=3176&oldid=2883 — wiki. Face-only vulnerability, icing immunity, undead weakness (excluded perk evidence).

Video / community-tested (Dungeons Demystified, YouTube; transcripts extracted live 2026-10-21 via the videos' transcript panels):
- "how to deal the most damage in dungeons of eternity" (Oct 19, 2026) — https://www.youtube.com/watch?v=_LDrgYbRy38 — formula slide, worked-example table, handling bonuses, perk-count-by-base-damage, EXO perk values, ranged proc cap, fire override rules.
- "Damage 101 in Dungeons of Eternity" (Oct 8, 2026) — https://www.youtube.com/watch?v=zLduVm-XinY — rounding rules, ring stacking tests, zone model, boss zones.
- "how to get all the rings in Dungeons of Eternity" (Sept 25, 2026) — https://www.youtube.com/watch?v=LUoV4_O9RKc — full 31-pair ring list, ring acquisition, "Right Ring" slot, loot-tier rule of thumb.
- "All hit boxes in dungeons of eternity" (Oct 9, 2026) — https://www.youtube.com/watch?v=VpAyfSrzPp4 — per-enemy zone table (§11).

Press:
- UploadVR, Tomb Extraction news (Sept 26, 2026) — https://www.uploadvr.com/dungeons-of-eternity-goes-darker-in-new-tomb-extraction-update/ — rings, damage numbers, Auric/Spectral.
- UploadVR review (release Sept 21, 2026) — https://www.uploadvr.com/dungeons-of-eternitys-tomb-extraction-update-is-a-rune-aissance-for-an-aging-game/ — "two new slots, a ring for each hand", rings only in Tomb Extraction.
- GamingTrend review — https://gamingtrend.com/reviews/dungeons-of-eternity-on-meta-quest-3-virtual-dungeon-deliving-with-friends/ — swing-harder-does-more-damage (unquantified), Exosuit "effects minimal".

Research notes (working files in this directory): notes/source-videos-demystified.md, notes/source-videos-mostdamage-table.md, notes/source-rings-video-transcript.md, notes/source-damage101-mostdamage-transcripts.md, notes/source-hitboxes-and-perktable.md.
