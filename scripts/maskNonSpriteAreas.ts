import sharp from "sharp";

import { blockStackSpritesheetMeta } from "../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { makeSpritesheetData } from "../src/sprites/spritesheet/spritesheetData/makeSpritesheetData";

/**
 * Clears (to transparent) every pixel of a sprite-png that is not inside any
 * declared sprite frame, keyed on the BlockStack variant's frame set (sprites.webp
 * is the BlockStack sheet). Removes the palette-swatch strip, inter-cell gutters
 * and any stray off-frame art that the game never samples. Called by iff2png on
 * the mid-pipeline png, before the cwebp encode.
 *
 * Usage: tsx scripts/maskNonSpriteAreas.ts <pngPath>
 */

const [, , pngPath] = process.argv;
if (pngPath === undefined) {
  console.error("usage: maskNonSpriteAreas.ts <pngPath>");
  process.exit(1);
}

type Frame = { x: number; y: number; w: number; h: number };

const mask = async () => {
  const { frames } = makeSpritesheetData(blockStackSpritesheetMeta);

  const { data, info } = await sharp(pngPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  // 1 byte per pixel: 1 = inside some frame and kept, 0 = mask to transparent
  const keep = new Uint8Array(W * H);
  for (const { frame } of Object.values(frames) as Array<{ frame: Frame }>) {
    const { x, y, w, h } = frame;
    for (let j = 0; j < h; j++) {
      const yy = y + j;
      if (yy < 0 || yy >= H) {
        continue;
      }
      keep.fill(1, yy * W + Math.max(0, x), yy * W + Math.min(W, x + w));
    }
  }

  let cleared = 0;
  for (let p = 0; p < W * H; p++) {
    if (keep[p] === 0) {
      const i = p * 4;
      if (data[i + 3] !== 0) {
        cleared++;
      }
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile(pngPath);

  console.log(
    `masked ${pngPath}: cleared ${cleared} off-frame opaque px (kept ${Object.keys(frames).length} frames)`,
  );
};

mask().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
