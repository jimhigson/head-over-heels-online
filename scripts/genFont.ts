#!/usr/bin/env -S pnpm tsx
import { decode } from "@cwasm/webp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

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
const builderScript = "scripts/font/buildVariableFont.py";
const requirementsPath = "scripts/font/requirements.txt";

const unitsPerEm = 512;
/** font units per design pixel - 512/8 gives clean integer pixel boundaries */
const px = unitsPerEm / hudCharTextureSize.h;
/** the baseline sits this many design pixels below the top of each cell */
const baselineFromTop = hudCharTextureSize.h;
const inkAlphaThreshold = 128;

const spaceCodePoint = 0x20;
const emSpaceCodePoint = 0x20_03;
// the spritesheet space frame is a full block wide, but that's too wide for
// font-rendered text (BitmapText doesn't render a space sprite at all, spacing
// words with a margin instead). narrow it to 5/8 of a block here. this is applied
// only here, not in hudSritesheetData, so the in-game space sprite (which is drawn
// directly in a few places) keeps its on-sheet width.
const spaceAdvanceWidth = hudCharTextureSize.w * 0.625;
// an explicit wider space, one full block - has no equivalent in the sprite path
const emSpaceAdvanceWidth = hudCharTextureSize.w;

// most multi-codepoint spritesheet names (eg "QUESTMK") are spritesheet-only and
// skipped, but these also become font glyphs, at the given codepoints. "DOT" is
// the original game's 8px fixed-grid full stop: mapping it to U+FF0E FULLWIDTH
// FULL STOP gives text a full-character-width dot (eg game speed "0．75") while
// the ordinary "." keeps its narrow proportional glyph
const namedGlyphCodePoints: { [name: string]: number } = {
  DOT: 0xff_0e,
};

// a single custom variation axis: at its peak (1) every glyph is twice as tall
// at the same width, so "double-height" text is a real font variant selected
// with font-variation-settings. Custom (non-registered) tags must be uppercase.
const heightAxis = {
  tag: "HGHT",
  min: 0,
  default: 0,
  max: 1,
  name: "Height",
} as const;

type DecodedImage = { width: number; height: number; data: Uint8ClampedArray };

type Rect = { col: number; row: number; w: number; h: number };

/** a closed contour of on-curve points, in font units with the baseline at y=0 */
type Contour = Array<[number, number]>;

type GlyphData = {
  unicode: number;
  advanceWidth: number;
  contours: Contour[];
};

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
 * A glyph's ink rectangles as closed contours in font units (baseline at y=0),
 * wound clockwise in y-up space. varLib's default (normal) master uses these as
 * drawn; the double-height master scales every y by 2.
 */
const glyphContours = (
  image: DecodedImage,
  hudGlyph: HudGlyph<string>,
): Contour[] =>
  mergeInkRects(image, hudGlyph).map(({ col, row, w, h }) => {
    const xLeft = col * px;
    const xRight = (col + w) * px;
    const yTop = (baselineFromTop - row) * px;
    const yBottom = (baselineFromTop - (row + h)) * px;
    return [
      [xLeft, yBottom],
      [xLeft, yTop],
      [xRight, yTop],
      [xRight, yBottom],
    ];
  });

const image = decode(readFileSync(spritesheetPath)) as DecodedImage;

const glyphs: GlyphData[] = [];
for (const hudGlyph of hudGlyphs) {
  // only single-codepoint chars become font glyphs (bar namedGlyphCodePoints);
  // this drops the unused EnterFullscreen/ExitFullscreen pseudo-glyphs and the
  // uppercaseCharReplacement strings (eg "QUESTMK"), so duplicated punctuation
  // resolves to the row1 variant
  if (size(hudGlyph.char) !== 1) {
    const namedCodePoint = namedGlyphCodePoints[hudGlyph.char];
    if (namedCodePoint !== undefined) {
      glyphs.push({
        unicode: namedCodePoint,
        advanceWidth: hudGlyph.advanceWidth * px,
        contours: glyphContours(image, hudGlyph),
      });
    }
    continue;
  }
  const codePoint = hudGlyph.char.codePointAt(0)!;
  const advanceWidth =
    codePoint === spaceCodePoint ? spaceAdvanceWidth : hudGlyph.advanceWidth;
  glyphs.push({
    unicode: codePoint,
    advanceWidth: advanceWidth * px,
    contours: glyphContours(image, hudGlyph),
  });
}

// em space exists only in the font (not the spritesheet), as an empty glyph with
// a full-block advance
glyphs.push({
  unicode: emSpaceCodePoint,
  advanceWidth: emSpaceAdvanceWidth * px,
  contours: [],
});

// everything about the design that determines the font output - glyph outlines,
// advances, metrics and the axis. Change-detection compares only this, so an
// unchanged design skips the rebuild and keeps the committed woff2 bytes.
const design = {
  // bump whenever buildVariableFont.py changes what it emits for the same
  // glyph data, so the rebuild isn't skipped as "unchanged"
  builderVersion: 3,
  unitsPerEm,
  ascender: baselineFromTop * px,
  descender: -(hudLowercaseCharTextureSize.h - baselineFromTop) * px,
  notdefAdvance: hudCharTextureSize.w * px,
  // font units per design pixel, so the builder can place pixel-exact features
  // (eg the underline) without re-deriving this from unitsPerEm
  unitsPerPixel: px,
  axis: heightAxis,
  glyphs,
};

// the committed manifest is the design plus a `builtAt` unix timestamp. The
// builder bakes builtAt into head.modified, so the font's version stamp only
// advances when the design genuinely changes (and the build is otherwise
// deterministic - an unchanged design rebuilds to identical bytes)
const committedDesign = (): unknown => {
  if (!existsSync(manifestPath)) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
    delete parsed.builtAt;
    return parsed;
  } catch {
    return undefined;
  }
};

// override with PYTHON=/path/to/python for a venv install (eg on macOS where
// PEP 668 blocks pip installing into the system python)
const python = process.env.PYTHON ?? "python3";

// fail with an actionable message rather than a raw ENOENT or Python traceback
// when the build toolchain isn't installed
const ensurePythonToolchain = () => {
  try {
    execFileSync(python, ["-c", "import fontTools, brotli"], {
      stdio: "ignore",
    });
  } catch (e) {
    const pythonMissing = (e as { code?: string }).code === "ENOENT";
    throw new Error(
      pythonMissing ?
        `${python} is required to build the font but was not found. Install Python 3, then: pip install -r ${requirementsPath}`
      : `the font builder's Python dependencies are missing. Install them with: pip install -r ${requirementsPath} (or set PYTHON to a venv python that has them)`,
      { cause: e },
    );
  }
};

if (JSON.stringify(committedDesign()) === JSON.stringify(design)) {
  console.log(
    `🅵 font unchanged (${glyphs.length} glyphs) - kept existing ${outputPath}`,
  );
} else {
  ensurePythonToolchain();
  mkdirSync(outputDir, { recursive: true });
  const builtAt = Math.floor(Date.now() / 1_000);
  writeFileSync(manifestPath, JSON.stringify({ ...design, builtAt }, null, 2));
  // opentype.js can neither write glyf outlines nor a working gvar, and a
  // hand-assembled variable font is silently not animated by Chromium; fontTools
  // (varLib) builds one that is. See scripts/font/buildVariableFont.py.
  execFileSync(python, [builderScript, manifestPath, outputPath], {
    stdio: "inherit",
  });
}
