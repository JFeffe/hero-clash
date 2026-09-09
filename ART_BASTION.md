# Le Bastion des Serments — 0.28.0

## Direction

The approved medieval direction uses dark slate (#29333D), bone/ivory panels, burgundy actions (#74404E), antique brass borders and readable serif headings. All text, buttons, stats and navigation are live HTML. Existing pixel character and familiar atlases are unchanged. The company card shows career hearts and energy, never fabricated battle HP. Level and tower floor remain separate.

## Production images

Built-in image generation produced the following original background assets; they were converted to WebP (quality 84) for the static game. No API or external image service is called by the game. The images contain no UI or playable characters.

| File | Use |
| --- | --- |
| `docs/assets/bastion/lower.webp` | Floors 1–5, enclosed slate foundations, low galleries, torchlight and spectators |
| `docs/assets/bastion/middle.webp` | Floors 6–10, taller tournament galleries, banners and distant mountains |
| `docs/assets/bastion/upper.webp` | Floors 11–14, tall arches, spectator balconies and clouds below |
| `docs/assets/bastion/summit.webp` | Floor 15, monumental stone dome, open oculus and sky |
| `docs/assets/bastion/tower.webp` | Company ascent card, complete tower and open summit dome |

## Generation prompt set

Shared arena prompt: production landscape 1536×1024 background, refined painterly pixel-art medieval fantasy arena for a side-view auto-battler. Dark slate stone, pale limestone floor, muted burgundy, antique brass. Frontal symmetric view, empty horizontal fighting stage in the lower third; tiny spectators only in distant galleries. Restrained contrast for composited RPG sprites. No UI, text, numbers, watermarks or fighters on the stage.

Scene additions:

1. Floors 1–5: enclosed lower tower, heavy slate masonry, low vaulted galleries, burgundy tournament banners, warm torchlight, no sky.
2. Floors 6–10: grand middle arena, taller two-tier spectator galleries, long burgundy banners, high narrow windows with distant mountains, afternoon light.
3. Floors 11–14: lofty pointed arches, noble viewing balconies, tall open windows with clouds below, cold blue daylight and antique brass details.
4. Floor 15: ultimate summit, magnificent ribbed stone dome, enormous open central oculus with blue sky, burgundy and gold banners, spectator galleries and warm daylight.
5. Tower card: landscape 1536×1024; immense fifteen-storey medieval tournament tower, visible from city foundations to open stone-and-gold dome, rising above clouds. Tower on the left; clean sky to the right for HTML progression labels. Muted slate, burgundy, antique brass and ivory-blue sky. No UI, text or numbers.

## Integration

`docs/bastion.js` maps floors to scenes and loads backgrounds on demand. Canvas cover scaling preserves image proportions and top-aligns the dome. A failed background load falls back to the existing procedural arena without repeated requests. Combat reads the pre-settlement hero snapshot from `battle.heroes`, so promotion and replay cannot select the wrong floor image.

The tower card is an illustration, not the source of career state. Its four labelled bands, current-floor readout, battle count and 15-step track derive from the selected hero. Actual progression stays in `career.js`.

The UI uses no remote fonts. Portraits use the existing sprite renderer with extra headroom for tall identities. Breakpoints place navigation at the left above 1100 px, and at the bottom below that. Cards collapse to one column below 700 px. Input text is at least 16 px to avoid mobile input zoom; controls have visible keyboard focus and reduced-motion preferences remain supported.
