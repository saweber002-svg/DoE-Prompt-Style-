# Owner Calculator Formula — canonical damage equation (Scott, 2026-10-22)

**Provenance:** Scott's own spreadsheet calculator, built directly from his in-game observations. Scott's ruling (2026-10-22): this formula is **100% accurate** and is the project's canonical damage equation. It supersedes all community-video and wiki research wherever they conflict; that research is retained elsewhere as a set-aside annex, not as calculator inputs.

## The formula (verbatim, as provided)

```
=(1+V_SUNRNG)*IF([@ZONE]="HEAD",(1+V_HSRNG),1)*IF([@ZONE]="BODY",(1+V_BACKST),1)*IF(CB_ATKPOW="X",1.35,1)*IF(CB_POWPUL="X",1.5,1)*IF(CB_STAB="X",1.5,1)*IF(CB_FIRE="X",2,1)*IF(CB_CRITS="X",(3+V_CRRNG),1)*IF(CB_CRIM="X",(3+V_CRRNG),1)*IF(CB_EXPL="X",2,1)*IF(AND(CB_DUB="X",OR(V_WEAPON="AXE",V_WEAPON="HAMMER",V_WEAPON="SPEAR",V_WEAPON="GREATSWORD")),2,1)*XLOOKUP(1,(T_WEAK[ENEMY]=V_ENEMY)*(T_WEAK[ZONE]=[@ZONE]),T_WEAK[MODIFIER],0,0)
```

(The result multiplies the weapon's base damage; base is a user input, per Scott's standing ruling.)

## Reading of the terms

| Term | Meaning | Semantics |
|---|---|---|
| `(1+V_SUNRNG)` | Sundering ring factor | Always on when the ring value is entered. |
| `IF(ZONE="HEAD",(1+V_HSRNG),1)` | Headshot ring (Scout's Signet) | **Applies on HEAD-zone hits only.** |
| `IF(ZONE="BODY",(1+V_BACKST),1)` | Backstab ring | **Applies on BODY-zone hits only.** (Zone-gating also makes Backstab and the headshot ring mutually exclusive per hit by construction.) |
| `CB_ATKPOW → 1.35` | Attack Power perk | Max-tier value (the sheet is a max-build calculator; the engine generalizes tiers beneath it). |
| `CB_POWPUL → 1.5` | EXO Power/Pullback | Shared single factor. |
| `CB_STAB → 1.5` | Stab Damage perk | Flat +50%. |
| `CB_FIRE → 2` | Fire element/proc | ×2. |
| `CB_CRITS → (3+V_CRRNG)` | Weapon Criticals | Crit ring (Predator) value adds **inside** the crit factor. |
| `CB_CRIM → (3+V_CRRNG)` | EXO Criticals | The same crit-ring value adds inside this factor too. |
| `CB_EXPL → 2` | Explosions / Area Damage | ×2. |
| `CB_DUB ∧ weapon ∈ {AXE, HAMMER, SPEAR, GREATSWORD} → 2` | Two-hand handling | **×2 only for those weapon types** — weapon type is a real input to the equation. |
| `XLOOKUP(... T_WEAK ... , 0)` | Zone modifier table | Per enemy × zone; a combination absent from the table yields **0**. Table contents are Scott's; transcription into `data/enemies.json` pending his providing the table (current zone values are interim, from the superseded survey, and are flagged as such in docs/02). |

## Ring values

Scott confirms the values behind the four `V_` variables are **verified** (observed). The digits are to be transcribed into the data model when provided; until then ring values remain user-entered in the app, with Scott's verified values as the pending reference set.

## Not in this calculator (set aside, per Scott 2026-10-22)

Might (EXO, throws), Pierce (EXO, thrusts), Venom Fang, Breaker's Band, Throw Damage perk, and first-strike ×3 appear in community research but are **not part of Scott's calculator**. They are preserved in the data model's `setAside` annex — recorded, labelled research-sourced, and **not applied** by the engine.
