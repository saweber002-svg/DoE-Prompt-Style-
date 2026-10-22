# Legacy material — READ BEFORE USE

Everything in this folder predates the 2026-10-21 deep research and is kept as **process evidence only**. Where it conflicts with `data/` or `docs/`, **it is wrong** and the canonical files win.

## Known supersessions

- **`doe-game-data-2026-10-20/weapon-classes.json`** claims "4 perk columns per weapon: col 1 = 40% proc chance, cols 2–4 = 32%". The Oct-21 research could not find this model in **any** citable source; the wiki documents **max 2 perks per weapon**, corroborated by community video testing (perk count trades against the base roll: 150 = 1 perk + element, 130 = 2 perks + element). **The 4-column model is retired.** The file's other content (weapon classes, crypt weapons, mythics, qualitative hitbox notes) remains useful guide metadata.
- **`example-model/`** (TECHNICAL_SPEC + the tested example code model + config) implements that same retired 4-column model and placeholder EXO stats (invented suit percentages from before the EXO Suit's real perks were documented). Its *engineering patterns* (pure model + tests, read-the-number UI) informed `BLUEPRINT.md`; its *numbers* must never be copied into the build.
- The demo's "Megamage" was a joke placeholder name for the **Ubermage** — canonical name: **Uber Mage**.

Nothing in this folder may be used as a build source. If you arrived here from a doc link, go back to `docs/03-data-tables.md`.
