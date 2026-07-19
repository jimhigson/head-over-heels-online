#!/usr/bin/env -S pnpm tsx
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "../src/sprites/spritesheet/spritesheetData/textureSizes";
import { size } from "../src/utils/iterators/size";
import { cleanEdgeUpscaleBinary } from "./font/cleanEdgeUpscaleBinary";
import { type HudGlyph, hudGlyphs } from "./font/hudGlyphs";

// the shipped gfx/sprites.webp has every non-frame area (including the HUD char
// rows) masked to transparent, so the font is generated from the unmasked full
// sheet iff2png keeps for reference: gfx/sprites.borders.png. There the char ink
// is pure white on a coloured background and the png carries no useful alpha, so
// ink is keyed on white (see isInk), and glyph frame.y values (absolute sheet
// coords) index straight into the sheet.
const spritesheetPath = "gfx/sprites.borders.png";
const outputDir = "src/_generated/font";
const outputPath = `${outputDir}/blockstack-head-over-heels.woff2`;
const manifestPath = `${outputDir}/manifest.json`;
const smoothOutputPath = `${outputDir}/blockstack-head-over-heels-smooth.woff2`;
const smoothManifestPath = `${outputDir}/manifest-smooth.json`;
const builderScript = "scripts/font/buildVariableFont.py";
const requirementsPath = "scripts/font/requirements.txt";

/**
 * the smooth font's glyphs are the same bitmaps upscaled with cleanEdge at
 * this factor - matching the cap the game engine bakes its spritesheets at,
 * so ui text shows exactly the texels the game would
 */
const smoothFactor = 4;

const unitsPerEm = 512;
/** font units per design pixel - 512/8 gives clean integer pixel boundaries */
const px = unitsPerEm / hudCharTextureSize.h;
/** the baseline sits this many design pixels below the top of each cell */
const baselineFromTop = hudCharTextureSize.h;

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

/** a closed contour of on-curve points, in font units with the baseline at y=0 */
type Contour = Array<[number, number]>;

type GlyphData = {
  unicode: number;
  advanceWidth: number;
  contours: Contour[];
};

const isInk = (image: DecodedImage, x: number, y: number): boolean => {
  const i = (y * image.width + x) * 4;
  // ink is pure white in the source sheet; every other colour is background
  return (
    image.data[i] === 255 &&
    image.data[i + 1] === 255 &&
    image.data[i + 2] === 255
  );
};

/**
 * Trace a glyph's ink into rectilinear outline contours: one boundary loop per
 * connected ink region (wound clockwise in y-up font space) plus a counter-wound
 * (anticlockwise) inner loop around each enclosed gap. Unlike a bag of disjoint
 * rectangles, this gives each glyph the topology a real font has - one
 * continuous boundary per region with true counters - so a platform rasteriser
 * that grid-fits each contour edge cannot swallow a 1px counter by rounding two
 * independent rectangles' facing edges together (which is what filled the
 * shield/rotate holes under DirectWrite and CoreText). It also needs far fewer
 * points than one rectangle per horizontal run.
 *
 * varLib's default (normal) master uses these as drawn; the double-height master
 * scales every y by 2 - the identical point sequence, so gvar interpolation is
 * exact.
 */
const glyphContours = (
  image: DecodedImage,
  { frame, char }: HudGlyph<string>,
): Contour[] => {
  const ink = (col: number, row: number): boolean =>
    col >= 0 &&
    row >= 0 &&
    col < frame.w &&
    row < frame.h &&
    isInk(image, frame.x + col, frame.y + row);

  // Every unit edge between an ink cell and a non-ink cell, directed so the ink
  // is on its left in the pixel grid's y-down space (cell (col,row)'s top-left
  // corner is lattice point (col,row)). Walking these keeps ink on the left, so
  // a region's outer boundary comes out anticlockwise in y-down - which is
  // clockwise once y is flipped to font space at the end.
  type Edge = { sx: number; sy: number; ex: number; ey: number; used: boolean };
  const edges: Edge[] = [];
  const addEdge = (sx: number, sy: number, ex: number, ey: number) =>
    edges.push({ sx, sy, ex, ey, used: false });
  for (let row = 0; row < frame.h; row++) {
    for (let col = 0; col < frame.w; col++) {
      if (!ink(col, row)) {
        continue;
      }
      if (!ink(col - 1, row)) {
        addEdge(col, row, col, row + 1);
      } // left → down
      if (!ink(col, row + 1)) {
        addEdge(col, row + 1, col + 1, row + 1);
      } // bottom → right
      if (!ink(col + 1, row)) {
        addEdge(col + 1, row + 1, col + 1, row);
      } // right → up
      if (!ink(col, row - 1)) {
        addEdge(col + 1, row, col, row);
      } // top → left
    }
  }

  const key = (x: number, y: number) => `${x},${y}`;
  const outgoing = new Map<string, Edge[]>();
  for (const e of edges) {
    const list = outgoing.get(key(e.sx, e.sy));
    if (list === undefined) {
      outgoing.set(key(e.sx, e.sy), [e]);
    } else {
      list.push(e);
    }
  }

  const heading = (e: Edge) =>
    key(Math.sign(e.ex - e.sx), Math.sign(e.ey - e.sy));
  // heading after a left turn in y-down screen space:
  const afterLeft: Record<string, string> = {
    "1,0": "0,-1", // right → up
    "0,1": "1,0", // down → right
    "-1,0": "0,1", // left → down
    "0,-1": "-1,0", // up → left
  };
  // at a pinch (two ink cells meeting only at a diagonal corner) two loops pass
  // through the point; continue with the sharpest available left turn so the
  // loops stay separate and never cross:
  const turnPreference = (h: string) => [
    afterLeft[h],
    h,
    afterLeft[afterLeft[afterLeft[h]]],
  ];

  const collapseCollinear = (loop: Array<[number, number]>) => {
    const corners: Array<[number, number]> = [];
    const n = loop.length;
    for (let i = 0; i < n; i++) {
      const [ax, ay] = loop[(i + n - 1) % n];
      const [x, y] = loop[i];
      const [bx, by] = loop[(i + 1) % n];
      if (
        key(Math.sign(x - ax), Math.sign(y - ay)) !==
        key(Math.sign(bx - x), Math.sign(by - y))
      ) {
        corners.push([x, y]);
      }
    }
    return corners;
  };

  const latticeLoops: Array<Array<[number, number]>> = [];
  for (const first of edges) {
    if (first.used) {
      continue;
    }
    const loop: Array<[number, number]> = [];
    let e: Edge | undefined = first;
    while (e !== undefined && !e.used) {
      e.used = true;
      loop.push([e.sx, e.sy]);
      const candidates = outgoing.get(key(e.ex, e.ey)) ?? [];
      let next: Edge | undefined;
      for (const want of turnPreference(heading(e))) {
        next = candidates.find((c) => !c.used && heading(c) === want);
        if (next !== undefined) {
          break;
        }
      }
      e = next;
    }
    latticeLoops.push(collapseCollinear(loop));
  }

  // Build-time proof the traced outline reproduces the source ink exactly under
  // the non-zero winding rule (the rule TrueType fills glyf with): a pixel is
  // inside the outline iff it was ink. Catches any tracing or winding error.
  const windingAt = (px0: number, py0: number) => {
    let winding = 0;
    for (const loop of latticeLoops) {
      for (let i = 0; i < loop.length; i++) {
        const [x1, y1] = loop[i];
        const [x2, y2] = loop[(i + 1) % loop.length];
        const isLeft = (x2 - x1) * (py0 - y1) - (px0 - x1) * (y2 - y1);
        if (y1 <= py0) {
          if (y2 > py0 && isLeft > 0) {
            winding++;
          }
        } else if (y2 <= py0 && isLeft < 0) {
          winding--;
        }
      }
    }
    return winding;
  };
  for (let row = 0; row < frame.h; row++) {
    for (let col = 0; col < frame.w; col++) {
      if (ink(col, row) !== (windingAt(col + 0.5, row + 0.5) !== 0)) {
        throw new Error(
          `outline trace for glyph "${char}" (frame ${frame.x},${frame.y}) does not reproduce its ink at cell (${col},${row})`,
        );
      }
    }
  }

  // to font units, flipping y (bitmap y-down → font y-up, baseline at y=0):
  return latticeLoops.map((loop) =>
    loop.map(([cx, cy]): [number, number] => [
      cx * px,
      (baselineFromTop - cy) * px,
    ]),
  );
};

type Rect = { col: number; row: number; w: number; h: number };

/**
 * Merge ink pixels into as few axis-aligned rectangles as possible: each
 * unconsumed ink pixel grows greedily rightward then downward as far as it
 * stays a solid block, keeping the contour count (and so the font size) low.
 */
const mergeRects = (
  ink: (col: number, row: number) => boolean,
  frame: { w: number; h: number },
): Rect[] => {
  const consumed: boolean[] = new Array(frame.w * frame.h).fill(false);
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

/** rects (in units of 1/pixelDivisor design pixels) to font-unit contours */
const rectContours = (rects: Rect[], pixelDivisor: number): Contour[] =>
  rects.map(({ col, row, w, h }) => {
    const subPx = px / pixelDivisor;
    const xLeft = col * subPx;
    const xRight = (col + w) * subPx;
    const yTop = baselineFromTop * px - row * subPx;
    const yBottom = baselineFromTop * px - (row + h) * subPx;
    return [
      [xLeft, yBottom],
      [xLeft, yTop],
      [xRight, yTop],
      [xRight, yBottom],
    ] as Contour;
  });

/**
 * as {@link glyphContours}, but of the glyph bitmap cleanEdge-upscaled by
 * {@link smoothFactor} - contours land on 1/smoothFactor design-pixel
 * boundaries, exactly the texels the game's baked spritesheets show
 */
const smoothGlyphContours = (
  image: DecodedImage,
  { frame }: HudGlyph<string>,
): Contour[] => {
  const bitmap = cleanEdgeUpscaleBinary(
    (x, y) =>
      x >= 0 &&
      y >= 0 &&
      x < frame.w &&
      y < frame.h &&
      isInk(image, frame.x + x, frame.y + y),
    frame.w,
    frame.h,
    smoothFactor,
  );
  const rects = mergeRects((col, row) => bitmap[row][col], {
    w: frame.w * smoothFactor,
    h: frame.h * smoothFactor,
  });
  return rectContours(rects, smoothFactor);
};

const { data: rawPixels, info } = await sharp(spritesheetPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const image: DecodedImage = {
  width: info.width,
  height: info.height,
  data: new Uint8ClampedArray(rawPixels),
};

const buildGlyphs = (
  contoursFor: (image: DecodedImage, hudGlyph: HudGlyph<string>) => Contour[],
): GlyphData[] => {
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
          contours: contoursFor(image, hudGlyph),
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
      contours: contoursFor(image, hudGlyph),
    });
  }

  // em space exists only in the font (not the spritesheet), as an empty glyph with
  // a full-block advance
  glyphs.push({
    unicode: emSpaceCodePoint,
    advanceWidth: emSpaceAdvanceWidth * px,
    contours: [],
  });

  return glyphs;
};

const glyphs = buildGlyphs(glyphContours);

// everything about the design that determines the font output - glyph outlines,
// advances, metrics and the axis. Change-detection compares only this, so an
// unchanged design skips the rebuild and keeps the committed woff2 bytes.
// everything but the glyph outlines is shared between the base and smooth
// fonts - identical metrics make the two interchangeable with no layout shift
const designFor = (designGlyphs: GlyphData[]) => ({
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
  glyphs: designGlyphs,
});

const design = designFor(glyphs);

// the committed manifest is the design plus a `builtAt` unix timestamp. The
// builder bakes builtAt into head.modified, so the font's version stamp only
// advances when the design genuinely changes (and the build is otherwise
// deterministic - an unchanged design rebuilds to identical bytes)
const committedDesign = (fromManifestPath: string): unknown => {
  if (!existsSync(fromManifestPath)) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(readFileSync(fromManifestPath, "utf8"));
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

const buildIfChanged = (
  builtDesign: ReturnType<typeof designFor>,
  toManifestPath: string,
  toOutputPath: string,
) => {
  if (
    JSON.stringify(committedDesign(toManifestPath)) ===
    JSON.stringify(builtDesign)
  ) {
    console.log(
      `🅵 font unchanged (${builtDesign.glyphs.length} glyphs) - kept existing ${toOutputPath}`,
    );
    return;
  }
  ensurePythonToolchain();
  mkdirSync(outputDir, { recursive: true });
  const builtAt = Math.floor(Date.now() / 1_000);
  writeFileSync(
    toManifestPath,
    JSON.stringify({ ...builtDesign, builtAt }, null, 2),
  );
  // opentype.js can neither write glyf outlines nor a working gvar, and a
  // hand-assembled variable font is silently not animated by Chromium; fontTools
  // (varLib) builds one that is. See scripts/font/buildVariableFont.py.
  execFileSync(python, [builderScript, toManifestPath, toOutputPath], {
    stdio: "inherit",
  });
};

buildIfChanged(design, manifestPath, outputPath);
buildIfChanged(
  designFor(buildGlyphs(smoothGlyphContours)),
  smoothManifestPath,
  smoothOutputPath,
);
