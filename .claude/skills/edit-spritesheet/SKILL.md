---
name: edit-spritesheet
description: Edit the BlockStack spritesheet — its IFF source of truth, image layout and cell grid, palette and two-tone colour rules, the iff→webp conversion pipeline, and how to hand-edit in DPaint/pyDPainter or bake webp-only art back into the IFF. Use when adding or changing sprites, fixing sprite art, or reconciling the IFF and webp.
---

# Editing the BlockStack spritesheet

## What is the source of truth

`gfx/sprites.iff` is the **true source** of the BlockStack spritesheet — a 1024×1024, 32-colour (5-bitplane) ILBM, hand-drawn in DeluxePaint / pyDPainter. Everything else is a build output of `scripts/iff2png.sh` (`pnpm iff2png`):

- `gfx/sprites.webp` — the lossless, Display-P3-tagged sheet the game actually loads.
- `gfx/sprites.borders.png` — a debug view: the raw IFF decode with the palette swatches still visible. Never loaded by the game; committed so CI can pixel-check it.
- `public/icon*.png`, `src-tauri/icons/*` — app icons cut from one frame.
- `src/_generated/palette/spritesheet*.json` — colour names → hex, sampled from swatches painted into the sheet.

**Toppy is different.** `gfx/spritesToppy.webp` is authored separately as a PNG and converted to webp by the user — it is **not** IFF-backed. This skill is only about the BlockStack `sprites.iff`. See the `update-toppy-spritesheet` skill for Toppy.

CI job `check-iff2png` re-runs `pnpm iff2png` on every PR touching `gfx/*.iff`, `gfx/*.webp`, the palette JSONs, or the script, and fails if the regenerated `sprites.webp`/`sprites.borders.png` differ by even one pixel, or if any palette JSON changes. So the IFF and its outputs must always be committed together and in sync.

## Image layout — the cell grid

Sprites live in a regular grid. Cell origins (top-left, in image pixels) come from `src/sprites/spritesheet/spritesheetData/textureSizes.ts`:

- **Large cells** (blocks, walls, the lamp/mirror/beam items): `32×28`, origin `x = gx*33 + 1`, `y = gy*29 + 682`. The `+1`/baseline leave a 1px gutter between cells. `gy` may be **negative** — negative rows sit *above* the `y=682` baseline. (The light items added in 2025 live at `gy −7..−4`, i.e. `y ≈ 479..594`.)
- **Small cells** (most 24×24 items): `24×24`, origin `x = gx*25 + 1`, `y = gy*25 + 2`.
- Floor tiles `32×16`, wall tiles `16×56`, HUD chars `8×8` (lowercase `8×10`) — see `textureSizes.ts`.

The authoritative frame coordinates for every named texture are in `src/sprites/spritesheet/spritesheetData/itemsSpritesheetData.ts` (and siblings). When adding a frame, add it there and run `pnpm gen:types` if it feeds an animation/texture-id union.

### Do not draw over the palette swatches

`scripts/iff2png.sh` samples the palette from colour swatches **painted into the sheet** at a grid starting `x=562, y=663`, stepping `+90` across columns and `+10` down rows (`paletteStartX/Y`, `paletteStepX/Y`). The strip occupies roughly **x ≈ 560–660, y ≈ 660–835**. Conversion flood-fills those sample points to transparent to remove them from the output, so any art there would be corrupted/erased. Keep sprites clear of that region.

## Palette and colour semantics

The 32 palette colours are named in `scripts/iff2png.sh` (`blockstackColourNames`) and emitted to `src/_generated/palette/spritesheetPalette.json`. Roles that matter when drawing:

- **Structural greys / beiges** (`pureBlack`, `shadow`, `midGrey`, `lightGrey`, `white`, `lightBeige`, `highlightBeige`, …) — ordinary two-tone art. Outlines are `pureBlack`.
- **`swop_*`** (`swop_yellow`, `swop_green`, `swop_cyan`, `swop_magenta`, `swop_white`, and their `Mid`/`Dim` shades) — these **take part in per-room palette swaps**. Use them for anything that should recolour with the room's `(planet, colour)`. Most scenery/items use these so they tint per room.
- **`shadow_*`** — the shaped/▒ shadow colours.
- **`replaceLight` / `replaceDark`** — **placeholders replaced at runtime**, never standard art. The mirror's reflective surface uses these so the engine can paint two-tone reflections over it. Do not use them for ordinary pixels.
- **`ss_alphaKey` (`#BDBAE3`) and `ss_background` (`#7C7A98`)** — the **transparency keys**. DPaint/ILBM has no alpha channel, so "empty" pixels are *painted* in one of these and the conversion makes *both* transparent. The convention (visible in `sprites.borders.png`): the whole sheet's canvas/gutters are `ss_background` (the darker key), and **every sprite cell backs onto a rectangle of `ss_alphaKey`** (the lighter key) sized to that frame — so the sprites tile a neat lavender grid on the darker canvas. When drawing a new sprite, fill its frame's empty pixels with `ss_alphaKey` and leave the 1px inter-cell gutters as `ss_background`. Both become transparent in the webp, so this is purely an authoring/visual aid — it has no effect on the game.

Rules of the house style:

- **Two colours plus transparent** per sprite, mostly. ZX-Spectrum colour-clash aesthetic.
- **No anti-aliasing, no new colours.** Every pixel must be an exact palette entry. The pipeline and the write-back tool both assume a clean indexed image; a single off-palette or semi-transparent pixel breaks losslessness.
- Keep to the existing comment density and palette discipline of neighbouring sprites.

## Isometric drawing notes (large block cells)

Classic 2:1 isometric. For a full block in a `32×28` large cell, the world→texture mapping (used by `scripts/genLightItemSprites.ts`) is:

```
tx = (y - x) + 16
ty = 28 - (x + y) / 2 - z
```

- The **left half** (`tx < 16`) shows the `y = 0` face; the **right half** the `x = 0` face.
- The **top diamond** spans `ty` rows `0..15`; its half-width at row `ty` is `2*(ty+1)` for `ty<8`, else `2*(16-ty)`.
- The two visible side faces run `ty` from `~8+depth/2` to `~20+depth/2`, where `depth = tx<16 ? tx : 31-tx`.

`scripts/genLightItemSprites.ts` has reusable helpers (`sideFaceBounds`, `topDiamondHalfWidth`, `inTopDiamond`, `inSideFaces`, `outlineBlockSilhouette`) if drawing blocks programmatically.

## The conversion pipeline (forward: IFF → webp)

`pnpm iff2png` (`scripts/iff2png.sh`) does, in order:

1. `ffmpeg` decodes `sprites.iff` → `sprites.png` (applies CMAP → RGB).
2. Copies that to `sprites.borders.png` (debug view, swatches still in).
3. Samples the palette into the JSONs, **flood-filling each swatch sample point to transparent**.
4. Makes `ss_alphaKey` and `ss_background` colours transparent.
5. Tags the PNG as Display P3 by embedding `gfx/DisplayP3-v2-micro.icc` (assign, not convert — pixel values unchanged).
6. Cuts the app icon and builds icon sizes.
7. `magick … -define webp:lossless=true` → `sprites.webp`.
8. `revert_noop_images` reverts any output whose pixels are unchanged vs git (avoids churn).

Requires `ffmpeg`, `magick` (ImageMagick 7), `pngquant`, `jq` on PATH.

## Practical steps: hand-editing in DPaint / pyDPainter

1. Open `gfx/sprites.iff` in pyDPainter (or DPaint). It's a 1024×1024, 32-colour ILBM.
2. Edit **within the cell grid**, staying clear of the swatch strip (x≈560–660, y≈660–835). Use only the existing 32 palette entries — no new colours, no dithered/AA edges.
3. Paint transparency with the two keys per the grid convention: fill the sprite's **frame rectangle** (its empty pixels) with **`ss_alphaKey` `#BDBAE3`** so it backs onto a lavender cell, and leave the gutters/wider canvas as **`ss_background` `#7C7A98`**. (DPaint has no alpha — both keys convert to transparent.)
4. Save back as **IFF, same 32-colour palette, ByteRun1 compression**. Do not change image size, bit depth, or palette order (the `CMAP`/`CAMG`/`CRNG` chunks carry colour-cycling ranges — leave them intact).
5. Regenerate outputs: `pnpm iff2png`.
6. Commit `gfx/sprites.iff` **and** `gfx/sprites.borders.png` together (plus `gfx/sprites.webp` / icons / palette JSONs if they changed). `check-iff2png` will verify the IFF and outputs agree.

## Practical steps: baking webp-only art back into the IFF (reverse)

Sometimes new art is added straight to `sprites.webp` (e.g. programmatically by `scripts/genLightItemSprites.ts`) and the IFF needs to catch up so it stays the source of truth and can be hand-edited. Use:

```sh
pnpm tsx scripts/bakeWebpIntoIff.ts
```

It maps every opaque `sprites.webp` pixel to a palette index and writes it into the IFF's bitplanes, **in place**:

- Preserves all original chunks (`BMHD CMAP CAMG CRNG×6 BODY`) and every original palette index outside the changed pixels.
- Transparent webp pixels that fall inside a **new frame's backing rectangle** are written as `ss_alphaKey` (to follow the grid convention above); transparent pixels elsewhere keep their original IFF index, so your canvas/gutters and existing art are untouched.
- Only the scanlines the new art touches are re-compressed; all other plane-rows keep their original ByteRun1 bytes verbatim.
- It **refuses to run** (throws) if any opaque webp pixel is off-palette or semi-transparent — that is the correctness guard. It self-checks by re-decoding the new IFF to the intended indices.

The list of new-frame rectangles is hard-coded in `bakeWebpIntoIff.ts` (`newFrameRects`), mirroring the frame positions/sizes in `genLightItemSprites.ts` / `itemsSpritesheetData.ts` (32×28 lamps/mirrors/corners, 16×16 beam tiles, 16×24 terminus). If you bake a *different* set of new sprites, update that list (or the convention won't be applied to them — harmless to the game, untidy in DPaint). Run from the pristine committed IFF (`git checkout -- gfx/sprites.iff` first) so the result is reproducible.

This is safe because the palette has no duplicate colours, so webp-pixel → palette-index is an unambiguous bijection.

**Verify the bake (do this every time):**

```sh
git show HEAD:gfx/sprites.webp > /tmp/target.webp   # the intended pixels
pnpm iff2png                                        # regenerate from the new IFF
magick compare -metric AE gfx/sprites.webp /tmp/target.webp null:   # must print 0
```

`iff2png`'s `revert_noop` step will report `REVERT … sprites.webp (pixels identical)` when the IFF reproduces the webp exactly. `sprites.borders.png` will legitimately show a `KEEP` with the new pixels — commit it.

**After baking, do not run `genLightItemSprites.ts` for BlockStack again** — it paints `sprites.webp` directly and would bypass (and clobber) the IFF. The IFF is the source from then on; hand-edit it and run `pnpm iff2png`.
