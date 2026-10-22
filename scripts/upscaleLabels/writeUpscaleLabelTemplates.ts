#!/usr/bin/env -S pnpm tsx

/**
 * Writes templates to paint hand-drawn upscale labels over: each named frame
 * of the BlockStack sheet at 4x, nearest-neighbour, as
 * gfx/upscaleLabels/templates/<textureId>.png. A finished label is the same
 * file repainted, kept in gfx/upscaleLabels/<textureId>.png: every pixel one
 * of the frame's own colours or transparent, and output pixel (x, y) within
 * source pixel (floor(x / 4), floor(y / 4)).
 *
 * Frames to write are given as texture ids on the command line; with none, a
 * default set covering the art's idioms is written.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

import { makeSpritesheetData } from "../../src/sprites/spritesheet/spritesheetData/makeSpritesheetData";
// not macro-imported: this script runs under node, with no build step
import { octantIndexOfDirection } from "../../src/utils/vectors/octantIndexOfDirection";

export const upscaleLabelScale = 4;

const sheetPath = "gfx/spritesBlockstack.webp";
const templatesDir = "gfx/upscaleLabels/templates";

const defaultTextureIds = [
  ...[3, 4, 5, 6, 7].map((octant) => `head.blinking.d${octant}`),
  ...[1, 2, 3].map(
    (frame) =>
      `head.walking.d${octantIndexOfDirection("towardsRight")}.${frame}`,
  ),
  `heels.walking.d${octantIndexOfDirection("towardsRight")}.1`,
  "stepStool",
  "book.d0",
  "blacktooth.wall.armour.d0",
  "conveyor.d0.1",
];

const textureIds =
  process.argv.length > 2 ? process.argv.slice(2) : defaultTextureIds;

const { frames } = makeSpritesheetData({ playable: { head: {}, heels: {} } });

mkdirSync(templatesDir, { recursive: true });

for (const textureId of textureIds) {
  const maybeFrame = frames[textureId as keyof typeof frames];
  if (maybeFrame === undefined) {
    throw new Error(`no frame "${textureId}" in the spritesheet`);
  }
  const { x, y, w, h } = maybeFrame.frame;
  const templatePath = `${templatesDir}/${textureId}.png`;
  await sharp(sheetPath)
    .extract({ left: x, top: y, width: w, height: h })
    .resize(w * upscaleLabelScale, h * upscaleLabelScale, {
      kernel: "nearest",
    })
    .png()
    .toFile(templatePath);
  console.log(`${templatePath} (${w}x${h} at ${x},${y})`);
}
