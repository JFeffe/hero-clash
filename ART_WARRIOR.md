# Warrior equipment · 0.9.0

The detailed Warrior now renders all six weapon IDs with all four armor IDs in portraits and combat. Shared body frames and hand sockets retain movement, attack, hurt and death states. Weapons follow the actual equipped inventory entry, including older saves and uncommon/rare items. No combat or progression values changed.

`docs/warrior-preview.html` provides a save-independent bilingual equipment fitting room, linked from the home showcase. Equipment selection in the main game keeps the existing scroll/focus preservation.

Assets: `docs/assets/warrior-armors-v1.webp`, `docs/assets/warrior-weapons-v1.webp`. Generated with the built-in image tool and converted losslessly to WebP. Runtime applies the existing magenta key/fringe cleanup once on load. Weapon and body artwork remain separate, with the original glove drawn over the handle. Other classes retain their existing renderer.

Prompt set: preserve the approved copper-haired adult bearded Warrior; generate four armor rows (steel plate, tactical vest, linen tunic, black leather), each with idle, two running strides, attack, hurt and fallen poses, without weapons. Generate six separate upright detailed pixel-art weapons (sword, rifle, bow, staff, dagger, mace). Replace generated backgrounds with uniform magenta while preserving subjects and placement for runtime matting.

Validation: nine Node test suites pass, including 24 loadouts × six states × both directions and inventory reordering. Production Canvas renderer used to inspect the 24 idle combinations and sword/rifle animation states. Game state and balance modules unchanged.
