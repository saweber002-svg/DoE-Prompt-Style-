# 02 — The damage model

Canonical source: `reference/research/full-report-2026-10-21.md` §5. Machine-readable twin: `data/damage-model.json`.

## The factor chain

```
DAMAGE = BASE
  × (1 + Sundering + Sundering)        ← identical rings ADD inside the factor
  × (1 + Scout's + Scout's)
  × (1 + Attack Power)
  × (1 + Power/Pullback)               ← EXO
  × (1 + Stab)
  × Fire ×2            (proc)
  × Explosions ×2      (proc)
  × EXO crit factor    ((3 + Predator + Predator) on proc, else 1)
  × Weapon crit factor ((3 + Predator + Predator) on proc, else 1)
  × Might ×2           (throws only)
  × Pierce ×2          (thrusts only)
  × Handling           (grip: 2H = ×2; dagger stab ×1.5)
  × Enemy Zone         (final factor)
```

**Order is grouping + priority rules, not sequence.** Different sources multiply; the same ring twice adds inside its factor. Predator adds inside *both* crit factors (and is flagged CURRENTLY BUGGED by the testers).

**Worked example (verification anchor):** base 130 → no-proc ×20.3 = **2,636** on a ×3 zone; all-proc ×730.1 = **94,910** (~1% of hits).

## Display model

Three numbers: **Floor** (no procs) / **Expected** per hit / **Ceiling** (all procs) *with ceiling frequency*. **No DPS — ever** (no attack-rate data exists). The game rounds displayed multipliers to the nearest tenth and damage to the nearest whole ("4× is really 4.05"); the app shows exact math.

## Proc pools & frequencies (max-tier 4-pool melee build)

Pools: Weapon Criticals 32%, EXO Criticals 40%, Fire 32%, Explosions/Area 32% — four **independent** rolls per hit.

| Outcome | Frequency |
|---|---|
| No procs | 18.87% |
| Exactly 1 | 39.21% |
| Exactly 2 | 30.29% |
| Exactly 3 | 10.32% |
| All 4 ("full house") | 1.31% |

Average 1.36 procs/hit; ≥1 proc on 81.1%; any crit 59.2%; double crit (×9) 12.8%. Sword builds run 3 pools (Stab is conditional, not a roll): none 27.74% / one 44.61% / two 23.55% / all three 4.10%. **Ranged: max 2 proc perks per shot** — 3- and 4-proc combos are impossible on a single shot.

## Interactions & priority rules

- Fire overrides other elements/Slowing on projectiles; a lit crossbow bolt **loses its crit** to fire-only.
- One status at a time per enemy; new status replaces old.
- **Backstab does not stack with Scout's Signet** — the only documented non-stack; which wins is unknown.
- Enablers: Poison → Venom Fang; stagger (parry/block, Spectral Echo, Riposte) → Breaker's Band; Ice embrittle → next hit kills.
- Proc-rate rings (Hexweaver, Blacksmith, Micro Amplifier) bend other layers' odds by **unknown** amounts — all frequency tables are baselines.
- First strike ×3 vs unaware (official) is **not placed** in the testers' formula — model as a situation toggle outside the chain.
- **Outside the hit chain** (separate events, never factors): Spectral Echo's delayed hit, Poison DoT ticks, Riposte's reactive damage.
- Whether proc damage can itself crit/proc: unknown.

## Cooldowns

None are published for any perk, and the model assumes **none**: procs demonstrably roll independently and co-trigger on one hit, and observed frequencies match independent-roll math. Only two clocks are flagged for possible future measurement (poison duration/refresh; Spectral Echo delay) — and only if sustained-DPS modelling is ever added, which v1 scope forbids anyway.
