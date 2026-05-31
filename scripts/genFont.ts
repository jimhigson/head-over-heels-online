#!/usr/bin/env -S pnpm tsx
import { decode } from "@cwasm/webp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import opentype from "opentype.js";
// wawoff2 ships no types; it exposes compress(buffer): Promise<Uint8Array>
// @ts-expect-error -- no type declarations
import { compress as woff2Compress } from "wawoff2";

import {
  type HudGlyph,
  hudGlyphs,
} from "../src/sprites/spritesheet/spritesheetData/hudSritesheetData";
import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "../src/sprites/spritesheet/spritesheetData/textureSizes";
import { size } from "../src/utils/iterators/size";

const spritesheetPath = "gfx/sprites.webp";
const outputDir = "src/_generated/font";
const outputPath = `${outputDir}/blockstack-head-over-heels.woff2`;
const manifestPath = `${outputDir}/manifest.json`;

const unitsPerEm = 512;
/** font units per design pixel - 512/8 gives clean integer pixel boundaries */
const px = unitsPerEm / hudCharTextureSize.h;
/** the baseline sits this many design pixels below the top of each cell */
const baselineFromTop = hudCharTextureSize.h;
const inkAlphaThreshold = 128;

type DecodedImage = { width: number; height: number; data: Uint8ClampedArray };

type Rect = { col: number; row: number; w: number; h: number };

const isInk = (image: DecodedImage, x: number, y: number): boolean => {
  const alpha = image.data[(y * image.width + x) * 4 + 3];
  return alpha > inkAlphaThreshold;
};

/**
 * Merge a glyph's ink pixels into as few axis-aligned rectangles as possible:
 * each unconsumed ink pixel grows greedily rightward then downward as far as it
 * stays a solid block, keeping the contour count (and so the font size) low.
 */
const mergeInkRects = (
  image: DecodedImage,
  { frame }: HudGlyph<string>,
): Rect[] => {
  const consumed: boolean[] = new Array(frame.w * frame.h).fill(false);
  const ink = (col: number, row: number) =>
    isInk(image, frame.x + col, frame.y + row);
  const used = (col: number, row: number) => consumed[row * frame.w + col];

  const rects: Rect[] = [];
  for (let row = 0; row < frame.h; row++) {
    for (let col = 0; col < frame.w; col++) {
      if (!ink(col, row) || used(col, row)) {
        continue;
      }

      let w = 1;
      while (col + w < frame.w && ink(col + w, row) && !used(col + w, row)) {
        w++;
      }

      let h = 1;
      growDown: while (row + h < frame.h) {
        for (let dx = 0; dx < w; dx++) {
          if (!ink(col + dx, row + h) || used(col + dx, row + h)) {
            break growDown;
          }
        }
        h++;
      }

      for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) {
          consumed[(row + dy) * frame.w + col + dx] = true;
        }
      }
      rects.push({ col, row, w, h });
    }
  }
  return rects;
};

/**
 * Build an opentype path for one glyph from its merged ink rectangles. Contours
 * are wound clockwise in font (y-up) space for opentype.js's non-zero fill.
 */
const glyphPath = (
  image: DecodedImage,
  hudGlyph: HudGlyph<string>,
): opentype.Path => {
  const path = new opentype.Path();
  for (const { col, row, w, h } of mergeInkRects(image, hudGlyph)) {
    const xLeft = col * px;
    const xRight = (col + w) * px;
    const yTop = (baselineFromTop - row) * px;
    const yBottom = (baselineFromTop - (row + h)) * px;
    path.moveTo(xLeft, yBottom);
    path.lineTo(xLeft, yTop);
    path.lineTo(xRight, yTop);
    path.lineTo(xRight, yBottom);
    path.close();
  }
  return path;
};

const glyphName = (codePoint: number): string =>
  `glyph${codePoint.toString(16)}`;

const notdef = new opentype.Glyph({
  name: ".notdef",
  unicode: 0,
  advanceWidth: hudCharTextureSize.w * px,
  path: new opentype.Path(),
});

const image = decode(readFileSync(spritesheetPath)) as DecodedImage;

const glyphs: opentype.Glyph[] = [notdef];
let skipped = 0;
for (const hudGlyph of hudGlyphs) {
  // only single-codepoint chars become font glyphs; this drops the unused
  // EnterFullscreen/ExitFullscreen pseudo-glyphs and the uppercaseCharReplacement
  // strings (eg "QUESTMK"), so duplicated punctuation resolves to the row1 variant
  if (size(hudGlyph.char) !== 1) {
    skipped++;
    continue;
  }
  const codePoint = hudGlyph.char.codePointAt(0)!;
  glyphs.push(
    new opentype.Glyph({
      name: glyphName(codePoint),
      unicode: codePoint,
      advanceWidth: hudGlyph.advanceWidth * px,
      path: glyphPath(image, hudGlyph),
    }),
  );
}

const ascender = baselineFromTop * px;
const descender = -(hudLowercaseCharTextureSize.h - baselineFromTop) * px;

const font = new opentype.Font({
  familyName: "HeadOverHeels",
  styleName: "Regular",
  unitsPerEm,
  ascender,
  descender,
  glyphs,
});

// a manifest of everything that determines the font output: the glyph set, each
// glyph's outline and advance, and the font metrics - all derived from hudGlyphs
// and the spritesheet pixels. We only rewrite the woff2 when this changes, so an
// unchanged font keeps its committed bytes (and accurate timestamp) instead of
// churning on opentype.js's per-run head-table timestamp.
const manifestData = {
  unitsPerEm,
  ascender,
  descender,
  glyphs: glyphs.map((glyph) => ({
    unicode: glyph.unicode,
    advanceWidth: glyph.advanceWidth,
    path: glyph.path.commands,
  })),
};

// compared as parsed JSON so that reformatting the committed manifest (eg
// prettier, indentation, a trailing newline) doesn't force a needless rebuild
const manifestUnchanged = (): boolean => {
  if (!existsSync(manifestPath)) {
    return false;
  }
  try {
    return (
      JSON.stringify(JSON.parse(readFileSync(manifestPath, "utf8"))) ===
      JSON.stringify(manifestData)
    );
  } catch {
    return false;
  }
};

if (manifestUnchanged()) {
  console.log(
    `🅵 font unchanged (${glyphs.length} glyphs) - kept existing ${outputPath}`,
  );
} else {
  mkdirSync(outputDir, { recursive: true });
  const otf = Buffer.from(font.toArrayBuffer());
  const woff2 = Buffer.from(await woff2Compress(otf));
  writeFileSync(outputPath, woff2);
  writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));
  console.log(
    `🅵 wrote ${outputPath}: ${glyphs.length} glyphs (${skipped} non-codepoint entries skipped), ${woff2.length} bytes woff2 (from ${otf.length} bytes otf)`,
  );
}
