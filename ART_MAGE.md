# Mage equipment · 0.10.0

The detailed Mage now uses six weapons and four armor sets in the shared portrait and combat renderer. Equipment follows inventory item IDs, including reordered inventories and existing saves. Other classes and game balance are unchanged.

Try `docs/mage-preview.html` from the home showcase. It offers 24 combinations, five animation choices and both facing directions without changing a save.

Asset: `docs/assets/mage-armors-v1.webp`. Created using the built-in image generation tool with the original Mage as identity reference. The six existing weapon assets are reused. Green background is removed by the existing runtime matte cleaner; hand sockets and row boundaries are measured separately for the Mage.

Prompt set: preserve the original adult female Mage, purple wavy hair, face and detailed pixel-art style; four rows of steel plate, tactical vest, indigo/teal/gold tunic and black leather; six columns of idle, two running strides, attack, hurt and fallen poses; empty hands for separate weapons. Follow-up: replace checkerboard with uniform #00ff00 while preserving character placement and appearance.

Validation: Node test suite, all 24 loadouts × six frames × both directions, and visual inspection with the production Canvas gear renderer.
