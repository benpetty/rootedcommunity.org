# Rooted Community — logo & brand assets

The Rooted Community mark is a **tree of life**: a spreading canopy mirrored by a
spreading root system across a horizon, distilled from the linocut hero illustration
on the site. It reads as *rooted, growing, and communal* — the organization's work of
helping system-impacted community members put down new roots.

Everything here is built from the brand palette and typeface, with **transparent
backgrounds**, so it drops cleanly onto flyers, letterhead, slides, and social posts.

## What to grab

**For flyers / print / slides / social — use the PNGs** (`png/`). They have transparent
backgrounds and are high-resolution (lockups are ~3000–4000 px wide).

**For web / anything that scales — use the SVGs** (`svg/`). Infinitely sharp at any
size. The lockup and wordmark SVGs have the Newsreader font embedded, so they render
correctly anywhere without the font installed.

| File | Use it for |
|------|-----------|
| `lockup-stacked-color.png` | **Primary flyer header** — mark above the two-line name |
| `lockup-centered-color.png` | Centered hero lockup — posters, title slides |
| `lockup-horizontal-color.{png,svg}` | Website header, email signature, letterhead (name on one line) |
| `lockup-horizontal-mono.{png,svg}` | Same, single-color forest (faxes, stamps, one-color print) |
| `wordmark-color.png` / `wordmark.svg` | The name alone, no mark |
| `mark-color.{png,svg}` | The tree symbol alone — social avatar, flyer corner, watermark |
| `mark-mono.{png,svg}` | One-color tree symbol |
| `mark-reversed.svg` + `png` | Tree for **dark backgrounds** (cream + light tints) |
| `roundel-color.{png,svg}` | Tree inside a ring — stamps, badges, stickers |
| `favicon.svg`, `favicon-*.png`, `favicon.ico` | Browser tab / app icon (cream tree on a forest tile) |

PNG sizes are encoded in the filename (`mark-color-1024.png` = 1024 px). Need a size
that isn't here? Ask — it's regenerated from the SVG in seconds.

## Palette

| Token | Hex | Role |
|-------|-----|------|
| Forest | `#2F4F3E` | Primary — trunk, roots, canopy, wordmark |
| Moss | `#6B8A6B` | Canopy dapple (secondary foliage) |
| Clay | `#B8552E` | Fruit accent |
| Cream | `#FBF7F0` | Reversed art / background |

On dark backgrounds the reversed art uses cream `#FBF7F0` with lighter tints
(moss `#8FB08F`, clay `#E8A07E`) so the accents stay visible.

## Typeface

The wordmark is **Newsreader** (variable serif), weight 500, tracked `-1.5%` — the same
display face used across the site. It is embedded in the SVG lockups and baked into the
PNGs, so no font install is required to use the files.

## Usage guidance

- **Clear space:** keep at least the height of the tree's trunk clear on all sides.
- **Minimum size:** the full-color lockups read down to ~140 px wide / ~0.5 in tall.
  Below that, prefer `mark-mono` or the `favicon` assets.
- **Don't** recolor, stretch, rotate, add drop shadows, or place the color mark on a
  busy photo — use `mark-reversed` on dark/photographic backgrounds instead.
- **Do** give it room to breathe; the mark is designed for generous whitespace.

## Regenerating

SVGs are the source of truth. PNGs are rasterized from them with ImageMagick
(`magick -background none -density 1500 …`); lockup PNGs are rendered from the same
geometry in headless Chromium (real Newsreader, `omitBackground` for true transparency).

> Note: adding this kit does **not** change the live site. Wiring the tree into the site
> header/favicon is a separate follow-up.
