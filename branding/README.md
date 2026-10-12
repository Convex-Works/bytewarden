# Bytewarden brand

The logo is the **pixel tile**: a notched ink square with two strands of lit stripes on a 16-unit grid. The middle rows shift right, then the strands step back, like a scanline slipping out of sync. It's drawn from the kit's 48 px toolbar art, and `icon.svg` is the canonical vector. The wordmark is set in Doto 900: `byte` in muted ink, `warden` lit.

![Lockup](lockup.svg)

## Files

| File            | Use                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `icon.svg`      | The logo. Generated; the stripe geometry and colours live in `scripts/branding/generate-assets.mjs`.     |
| `lockup.svg`    | Logo and wordmark on ink, for the README and listings. Generated.                                        |
| `wordmark.svg`  | Doto 900 wordmark as square paths, letter-spacing −2 at 112 px. No font needed to render it.             |
| `mark-mono.svg` | One-colour glyph on the 16 px grid (`currentColor`), for places the UI tints the icon.                   |
| `toolbar/`      | The kit's hand-drawn 16, 32, and 48 px toolbar art, shipped without resampling.                          |
| `fonts/`        | Doto variable font (SIL OFL 1.1). Only needed to redraw `wordmark.svg`.                                  |
| `kit/`          | Original brand-kit subpixel mark, app icon, and lockups. Reference only; nothing is generated from them. |

Run `npm run branding:assets` to regenerate toolbar states, store, Safari and popup images, the in-app logo modules in `libs/assets/src/svg/svgs/`, and the inline autofill icon. Then run `npm run icons:build` to rebuild the `bwi-bytewarden-shield` font glyph from `mark-mono.svg`.

## Colour

| Role                   | Hex       | Interface token                 |
| ---------------------- | --------- | ------------------------------- |
| Tile / dark background | `#0B0C0C` | `gray-950`                      |
| Wordmark `byte`        | `#6F7873` | `gray-500`                      |
| Wordmark `warden`      | `#F4F6F5` | `gray-050`                      |
| Green subpixel         | `#3DFF7A` | `brand-400`: brand in dark mode |
| Red subpixel           | `#FF3A5E` | `red-400`: danger in dark mode  |
| Blue subpixel          | `#3D7DFF` | legacy `info-600`, beta badge   |

Stripe colours are fixed `--color-mark-*` tokens. The interface palette follows the kit: Neutrals are a green-tinted ink ramp. Each subpixel has one semantic job: green is the brand and primary action, red is danger, and blue is information. In dark mode, the lit colours sit on ink with ink text on top (`#3DFF7A` vs `#0B0C0C` is 14.7:1). In light mode, actions use darker steps that keep AA contrast on white: `brand-700` `#0A7A34` (5.5:1) and `red-700` `#C8102E` (5.9:1). The tokens live in `libs/components/src/tw-theme.css`. The autofill content-script palettes in `apps/browser/src/autofill/` mirror them.

## Type

- **Wordmark:** Doto, weight 900. Only in the logo, never as UI text.
- **Interface:** Inter (bundled, `system-ui` fallback) for all UI text.
- **Fixed-width text:** JetBrains Mono (SIL OFL 1.1, bundled in `libs/components/src/webfonts/`) for passwords, codes, and `--font-mono`.

## Usage

- The logo is always the full tile with its stripe colours. Don't recolour it, crop the tile, or put the stripes on another background.
- Use `mark-mono.svg` wherever a single tint is required: toolbar template images, side navigation, the notification header, and the icon font.
- Toolbar states keep the lit tile and use pixel badges: lock (locked), blue square (beta), red square (notification berry). Signed out dims the mark to grey.
- Minimum sizes: tile 16 px; lockup 24 px tall. Below that, use the tile alone.

## Store listing

`store/slides.html` lays out the Chrome Web Store screenshots (1280 × 800) and promo tiles (440 × 280, 1400 × 560) on the brand's ink, grid, and lit-stripe system. The popups in `store/shots/` are real captures: the vault and tab bar from the `Browser/Vault/VaultComponent` and `Browser/Popup Layout` stories, and the login screen from the built extension. The website, inline autofill menu, and passkey picker are drawn in HTML with the same tokens. Run `npm run branding:store` to render them into `apps/browser/store/screenshots/`. It needs a Chromium-based browser; set `BROWSER` if it isn't found.
