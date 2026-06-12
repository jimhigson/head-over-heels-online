#!/usr/bin/env -S pnpm tsx
/**
 * Utility for when sprites have been added to blockstack spritesheet to automatically
 * put them also on Toppy, to serve until he has had time to redraw them
 *
 * splices the frames whose names match a given regex from the BlockStack-
 * bordered sheet (gfx/sprites.borders.png) onto the Toppy sheet
 * (gfx/spritesToppy.webp), keeping each frame at exactly the same location and
 * surrounding it with a 1px transparent border. The frame rectangles come
 * directly from makeSpritesheetData, so they stay in sync with whatever it
 * produces, rather than hard-coding coordinates.
 *
 * usage:
 *   pnpm tsx scripts/spliceBlockstackOntoToppy.ts "<frameNameRegex>"
 */
import { $ } from "execa";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { makeSpritesheetData } from "../src/sprites/spritesheet/spritesheetData/makeSpritesheetData";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

const palettePath = "src/_generated/palette/spritesheetPalette.json";

/** the sheet the frames are copied from */
const sourceSheet = "gfx/sprites.borders.png";
/** the sheet the frames are copied onto (overwritten in place) */
const targetSheet = "gfx/spritesToppy.webp";

const palette = JSON.parse(
  readFileSync(repoRoot + palettePath, "utf8"),
) as Record<string, string>;

/**
 * colours that should become fully transparent (#00000000) in each spliced
 * frame, so the keying/background pixels do not survive onto the Toppy sheet
 */
const transparentColours = [palette.ss_alphaKey, palette.ss_background];

/** one frame's rectangle within the (shared 1024×1024) sheet layout */
type FrameRect = {
  name: string;
  w: number;
  h: number;
  x: number;
  y: number;
};

if (process.argv.length < 3) {
  console.log(
    [
      "Splice BlockStack sprites onto the Toppy sheet, to serve until Toppy's",
      "own versions are drawn.",
      "",
      "usage:",
      '  pnpm tsx scripts/spliceBlockstackOntoToppy.ts "<frameNameRegex>"',
      "",
      "<frameNameRegex> is matched (unanchored) against each spritesheet frame",
      'name; every match is spliced. eg: "(mirror|lamp)" or "^lightBeam"',
    ].join("\n"),
  );
  process.exit(1);
}

const frameNameRegex = new RegExp(process.argv[2]);
const isSplicedFrameName = (name: string): boolean => frameNameRegex.test(name);

const { frames } = makeSpritesheetData({ playable: { head: {}, heels: {} } });

const splicedFrames: FrameRect[] = Object.entries(frames)
  .filter(([name]) => isSplicedFrameName(name))
  .map(([name, { frame }]) => ({
    name,
    w: frame.w,
    h: frame.h,
    x: frame.x,
    y: frame.y,
  }));

/**
 * build the ImageMagick argument list: load the target sheet, then for every
 * frame first clear a 1px-larger rectangle to transparent (leaving a 1px
 * transparent border once the frame lands on top), then crop the matching
 * rectangle out of the source sheet, turn its keying and background colours into
 * fully-transparent black, and copy it (alpha and all, via `-compose Copy`) onto
 * the same coordinates in the target. Because `-compose Copy` overwrites the
 * whole rectangle, the original Toppy pixels are replaced outright rather than
 * showing through the transparent areas.
 */
const buildMagickArgs = (
  /** the frames to splice across */
  toSplice: readonly FrameRect[],
): string[] => [
  targetSheet,
  "-compose",
  "Copy",
  ...toSplice.flatMap(({ w, h, x, y }) => [
    // clear a rectangle 1px larger on every side to transparent first, so a 1px
    // transparent border survives around the frame once it is composited on top:
    "(",
    "-size",
    `${w + 2}x${h + 2}`,
    "xc:#00000000",
    ")",
    "-geometry",
    `+${x - 1}+${y - 1}`,
    "-composite",
    // then the frame itself, replacing the inner rectangle:
    "(",
    sourceSheet,
    "-crop",
    `${w}x${h}+${x}+${y}`,
    "+repage",
    "-alpha",
    "set",
    "-fuzz",
    "0",
    ...transparentColours.flatMap((colour) => [
      "-fill",
      "#00000000",
      "-opaque",
      colour,
    ]),
    ")",
    "-geometry",
    `+${x}+${y}`,
    "-composite",
  ]),
  "-define",
  "webp:lossless=true",
  targetSheet,
];

const magickArgs = buildMagickArgs(splicedFrames);

console.log(
  `splicing ${splicedFrames.length} frames (${splicedFrames
    .map((frame) => frame.name)
    .join(", ")}) from ${sourceSheet} onto ${targetSheet}`,
);
console.log(`\nmagick ${magickArgs.join(" ")}\n`);

{
  await $({ cwd: repoRoot, stdio: "inherit" })`magick ${magickArgs}`;
}
