/**
 * weapon-builder.mjs — modular weapon builder + A/B comparison engine.
 * Pure, zero-dependency. All game data is injected (weapons.json,
 * perks.json, systems.json, enemies.json from resources/game-data/) —
 * this module hard-codes NO game facts except the perk-effect semantics
 * table below, whose magnitudes mirror perks.json (community wiki).
 *
 * Honesty rules (same as the rest of the package):
 *  - Perk pools that are unpublished (sickles; staffs do not roll perks
 *    at all) accept any pick with a WARNING, never a silent pass or a
 *    hard error. (Spears were unpublished until research pass 2,
 *    2026-10-20, found their pool in the Forsaken Planet Perks article.)
 *  - Damage estimation uses the only published scaling rule (module
 *    damage ≈ 1x–2x player level, class-dependent). Only crossbows (~1x)
 *    and long swords (~2x) have published endpoints; every other class
 *    estimates as a RANGE, never a fake point value.
 *  - Utility perks (Vampire, Slowing, Poison, ...) are reported as
 *    utility — they are never folded into damage numbers. Poison's damage
 *    is unpublished, so it is excluded with a note, not guessed.
 */

// Perk semantics: how a perk pick affects EXPECTED single-hit damage.
// rolledValue meaning per kind: pct = rolled % (e.g. Attack Power 5–35),
// chancePct = proc chance % with a fixed damage multiple,
// flatPct = fixed % bonus in its context, shots = Reload extra shots.
export const PERK_EFFECTS = {
  "Attack Power":   { kind: "pct",        context: "all",   range: [5, 35] },
  "Throw Damage":   { kind: "pct",        context: "throw", range: [5, 35] },
  "Stab Damage":    { kind: "flatPct",    context: "stab",  value: 50 },
  "Criticals":      { kind: "chancePct",  context: "all",   range: [20, 32], multiple: 3 },
  "Explosions":     { kind: "chancePct",  context: "all",   range: [20, 32], multiple: 2 },
  "Area Damage":    { kind: "chancePct",  context: "all",   range: [20, 32], multiple: 2 },
  // Official: each Reload tier = -7.5% damage/bolt. Treating the rolled
  // +shots (1–7) as the tier count is an ASSUMPTION — flagged in warnings.
  "Reload":         { kind: "reload",     context: "all",   range: [1, 7], perShotFactor: 0.925 },
  // Utility-only perks (no direct damage number; Poison damage unknown):
  "Vampire": { kind: "utility" }, "Poison": { kind: "utility" },
  "Slowing": { kind: "utility" }, "Shot Distance": { kind: "utility" },
  "Knock-back Distance": { kind: "utility" }, "Absorb": { kind: "utility" },
  "Unblockable": { kind: "utility" }, "Throwable": { kind: "utility" },
  "Elite Damage": { kind: "utility" },
};

// Published class scale endpoints (systems.json damageScaling).
const CLASS_SCALE = { "crossbows": 1.0, "two-handed-swords": 2.0 };

// perks.json pool keys differ slightly from weapons.json ids — map them.
const POOL_KEYS = { "swords-1h": "swords", "blunt-maces-hammers-clubs": "hammers" };
const poolKeyFor = (weaponId) => POOL_KEYS[weaponId] ?? weaponId;

/** Perks selectable for a build: all-class + the class pool (if published). */
export function availablePerks(data, weaponClassId) {
  const all = (data.perks.allWeapons ?? []).map((p) => ({ ...p, pool: "all" }));
  const own = (data.perks.byClass?.[poolKeyFor(weaponClassId)] ?? []).map((p) => ({ ...p, pool: "class" }));
  return { perks: [...all, ...own], poolPublished: own.length > 0 };
}

/**
 * Validate a build. Returns { errors, warnings } — errors block use,
 * warnings are surfaced to the user (unpublished pools, assumptions).
 * build = { weaponClassId, tier (1-7), rarity, element (null|'Fire'|'Ice'|'Poison'),
 *           playerLevel, perks: [{ perk, rolledValue }] }
 */
export function validateBuild(data, build) {
  const errors = [], warnings = [];
  const weapon = data.weapons.weapons.find((w) => w.id === build.weaponClassId);
  if (!weapon) { errors.push(`Unknown weapon class: ${build.weaponClassId}`); return { errors, warnings }; }
  if (!(build.tier >= 1 && build.tier <= 7)) errors.push("Tier must be 1–7.");
  if (!data.systems.rarity.ladder.includes(build.rarity)) errors.push(`Unknown rarity: ${build.rarity}`);
  const picks = build.perks ?? [];
  if (build.rarity === "Common" && picks.length) errors.push("Common weapons have no perks.");
  if (build.rarity === "Common" && build.element) errors.push("Common weapons have no elemental feature.");
  if (build.element && !["Fire", "Ice", "Poison"].includes(build.element)) errors.push(`Unknown element: ${build.element}`);
  const { perks: selectable, poolPublished } = availablePerks(data, build.weaponClassId);
  const names = new Set(selectable.map((p) => p.perk));
  for (const pick of picks) {
    if (!names.has(pick.perk)) {
      if (poolPublished) errors.push(`${pick.perk} is not in the published ${weapon.name} perk pool.`);
      else warnings.push(`${pick.perk}: the ${weapon.name} perk pool is not published — pick allowed, unverified.`);
    }
    const fx = PERK_EFFECTS[pick.perk];
    if (fx?.range && pick.rolledValue != null &&
        (pick.rolledValue < fx.range[0] || pick.rolledValue > fx.range[1])) {
      warnings.push(`${pick.perk} rolled ${pick.rolledValue} is outside the published range ${fx.range[0]}–${fx.range[1]}.`);
    }
    if (pick.perk === "Reload") warnings.push("Reload damage trade-off assumes rolled +shots = Reload tiers (-7.5%/tier, official). Assumption, not verified.");
    if (pick.perk === "Poison") warnings.push("Poison's damage is not published — excluded from damage numbers.");
  }
  return { errors, warnings };
}

/**
 * Estimated module damage for a build at its player level.
 * Returns { point } when the class has a published scale endpoint,
 * otherwise { range: [low, high] }. `approximate: true` always — the
 * published rule itself says "about".
 */
export function estimateModuleDamage(build) {
  const level = build.playerLevel ?? 1;
  const f = CLASS_SCALE[build.weaponClassId];
  if (f) return { point: Math.round(level * f), approximate: true };
  return { range: [level, level * 2], approximate: true };
}

/** Expected-damage multiplier from a build's perks in a context. */
export function perkDamageFactor(build, context = "melee") {
  let factor = 1;
  const applied = [], utility = [];
  for (const pick of build.perks ?? []) {
    const fx = PERK_EFFECTS[pick.perk];
    if (!fx || fx.kind === "utility") { utility.push(pick.perk); continue; }
    if (fx.context !== "all" && fx.context !== context) { utility.push(`${pick.perk} (only applies to ${fx.context})`); continue; }
    if (fx.kind === "pct") factor *= 1 + (pick.rolledValue ?? 0) / 100;
    else if (fx.kind === "flatPct") factor *= 1 + fx.value / 100;
    else if (fx.kind === "chancePct") factor *= 1 + ((pick.rolledValue ?? 0) / 100) * (fx.multiple - 1);
    else if (fx.kind === "reload") factor *= Math.pow(fx.perShotFactor, pick.rolledValue ?? 0);
    applied.push(pick.perk);
  }
  return { factor, applied, utility };
}

/**
 * Expected damage of a build vs an enemy, per hitbox zone.
 * baseDamage overrides the estimate when the user knows their weapon's
 * actual number. Zones with a null multiplier return null damage.
 */
export function expectedVsEnemy(data, build, enemy, { baseDamage, context = "melee" } = {}) {
  const est = baseDamage ? { point: baseDamage } : estimateModuleDamage(build);
  const base = est.point ?? est.range;
  const { factor, applied, utility } = perkDamageFactor(build, context);
  const zones = enemy.hitboxZones.map((z) => {
    if (z.multiplier == null) return { zone: z.zone, label: z.label, multiplier: null, expected: null };
    const calc = (b) => Math.round(b * z.multiplier * factor);
    return { zone: z.zone, label: z.label, multiplier: z.multiplier,
             expected: Array.isArray(base) ? { range: [calc(base[0]), calc(base[1])] } : calc(base) };
  });
  return { enemy: enemy.name, base: est, context, factor, applied, utility, zones };
}

/** Side-by-side comparison of two builds vs the same enemy. */
export function compareBuilds(data, buildA, buildB, enemy, opts = {}) {
  const a = expectedVsEnemy(data, buildA, enemy, opts);
  const b = expectedVsEnemy(data, buildB, enemy, opts);
  const mid = (v) => (v == null ? null : Array.isArray(v.range) ? (v.range[0] + v.range[1]) / 2 : v);
  const rows = a.zones.map((za, i) => {
    const zb = b.zones[i];
    const ma = mid(za.expected);
    const mb = mid(zb.expected);
    return { zone: za.zone, label: za.label, a: za.expected, b: zb.expected,
             winner: ma == null || mb == null || ma === mb ? "tie" : ma > mb ? "A" : "B" };
  });
  const wins = rows.reduce((acc, r) => (r.winner !== "tie" ? { ...acc, [r.winner]: acc[r.winner] + 1 } : acc), { A: 0, B: 0 });
  return { enemy: enemy.name, context: a.context, a, b, rows, wins };
}
