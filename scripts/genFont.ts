#!/usr/bin/env -S pnpm tsx
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "../src/sprites/spritesheet/spritesheetData/textureSizes";
import { size } from "../src/utils/iterators/size";
import { type HudGlyph, hudGlyphs } from "./font/hudGlyphs";
import {
  type CornerName,
  kernelRulesForChar,
  scanKernelRules,
} from "./font/kernelRules";
import { mergeCollinear, traceBitmapToLoops } from "./font/traceSmoothContours";

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

/**
 * a closed contour in font units with the baseline at y=0. A point is
 * `[x, y]` (on-curve) or `[x, y, 0]` (an off-curve quadratic control -
 * TrueType implies on-curve midpoints between consecutive off-curve points,
 * so runs of them render as a smooth B-spline)
 */
type Contour = Array<[number, number, 0] | [number, number]>;

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

/**
 * a cell claimed by a circle-drawing kernel rule renders as a regular polygon
 * of this many sides - eg the single-pixel counter of the 'o' becomes a round
 * hole. The base radius is the one whose POLYGON area is exactly one pixel,
 * scaled up by {@link circleOversize}
 */
const circleSides = 16;
const circleRadiusPx = Math.sqrt(
  2 / (circleSides * Math.sin((2 * Math.PI) / circleSides)),
);

/**
 * the circle is drawn this much larger than equal-area, so the hole stays
 * legible rather than closing up against the ink around it. Safe to grow: the
 * rule's pattern requires ink on all eight sides, so there is a pixel and a
 * half of ink in every direction to bulge into
 */
const circleOversize = 1.2;

/** the radius every drawn circle and slot cap is rendered at, in font units */
const circleRadius = circleRadiusPx * px * circleOversize;

/** the centre of a cell, in font units */
const cellCentre = (col: number, row: number): [number, number] => [
  (col + 0.5) * px,
  baselineFromTop * px - (row + 0.5) * px,
];

/**
 * circle contour for an isolated pixel, in font units. Additive (ink dot)
 * contours wind clockwise in y-up space like the traced contours; `hole`
 * reverses the winding so non-zero fill subtracts it
 */
const circleContour = (col: number, row: number, hole: boolean): Contour => {
  const [centreX, centreY] = cellCentre(col, row);
  const radius = circleRadius;
  const points: Contour = [];
  for (let i = 0; i < circleSides; i++) {
    const theta = ((i + 0.5) / circleSides) * 2 * Math.PI * (hole ? 1 : -1);
    // all off-curve: TrueType renders the ring of controls as a closed
    // quadratic B-spline - a genuinely smooth circle. The spline runs
    // slightly inside its control polygon, so the radius is bumped to keep
    // the equal-area property (mean spline radius is ~0.9856 of control
    // radius for 16 controls):
    points.push([
      centreX + (radius / 0.985_6) * Math.cos(theta),
      centreY + (radius / 0.985_6) * Math.sin(theta),
      0,
    ]);
  }
  return points;
};

/** each semicircular cap of a slot is drawn as this many quadratic segments */
const slotCapSegments = 4;

/**
 * slot contour for a two-cell-tall hole, in font units: a cap of the same
 * radius as {@link circleContour} centred on each of the two cells, joined by
 * straight sides. Wound anticlockwise in y-up space so non-zero fill
 * subtracts it from the ink around it.
 */
const slotContour = (col: number, topRow: number): Contour => {
  const [centreX, topY] = cellCentre(col, topRow);
  const [, bottomY] = cellCentre(col, topRow + 1);
  const segmentAngle = Math.PI / slotCapSegments;
  // a quadratic spanning `segmentAngle` puts its off-curve control where the
  // two end tangents meet, further out than the arc itself:
  const controlRadius = circleRadius / Math.cos(segmentAngle / 2);
  const at = (
    capY: number,
    angle: number,
    radius: number,
  ): [number, number] => [
    centreX + radius * Math.cos(angle),
    capY + radius * Math.sin(angle),
  ];

  // up the right side, over the top cap, down the left side, under the
  // bottom cap - the closing point back to the start is implied
  const points: Contour = [
    at(bottomY, 0, circleRadius),
    at(topY, 0, circleRadius),
  ];
  for (let i = 0; i < slotCapSegments; i++) {
    const [controlX, controlY] = at(
      topY,
      segmentAngle * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    points.push(at(topY, segmentAngle * (i + 1), circleRadius));
  }
  points.push(at(bottomY, Math.PI, circleRadius));
  for (let i = 0; i < slotCapSegments; i++) {
    const [controlX, controlY] = at(
      bottomY,
      Math.PI + segmentAngle * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    if (i < slotCapSegments - 1) {
      points.push(at(bottomY, Math.PI + segmentAngle * (i + 1), circleRadius));
    }
  }
  return points;
};

/** a quarter-circle corner is drawn as this many quadratic segments */
const cornerArcSegments = 2;

/**
 * how far a rounded corner reaches along each of its two edges, in pixels.
 * The cut corner cell is filled in and a corner-square-minus-quarter-disc is
 * taken back out of it, an area of r²(1 - π/4); at this radius that is
 * exactly the one pixel the square cut removed, so rounding a corner leaves
 * the glyph's total ink unchanged
 */
const cornerRadiusPx = 1 / Math.sqrt(1 - Math.PI / 4);

/**
 * per corner: which lattice point of the cell the shape's sharp corner would
 * be at (as an offset from the cell's top-left, in cells), the direction from
 * there towards the ink, and the angle the arc starts at
 */
const cornerArcs = {
  topLeft: { sharp: [0, 0], towardsInk: [1, 1], startAngle: Math.PI / 2 },
  topRight: { sharp: [1, 0], towardsInk: [-1, 1], startAngle: 0 },
  bottomLeft: { sharp: [0, 1], towardsInk: [1, -1], startAngle: Math.PI },
  bottomRight: {
    sharp: [1, 1],
    towardsInk: [-1, -1],
    startAngle: (3 * Math.PI) / 2,
  },
} as const satisfies Record<
  CornerName,
  {
    sharp: readonly [number, number];
    towardsInk: readonly [number, number];
    startAngle: number;
  }
>;

/**
 * the ink taken back out of a filled-in corner to round it, in font units:
 * the region between the shape's sharp corner and an arc of
 * {@link cornerRadiusPx}, which meets the two edges tangentially. Wound
 * anticlockwise in y-up space, so non-zero fill subtracts it
 */
const roundedCornerContour = (
  col: number,
  row: number,
  corner: CornerName,
): Contour => {
  const {
    sharp: [sharpCol, sharpRow],
    towardsInk: [inkCol, inkRow],
    startAngle,
  } = cornerArcs[corner];
  const apexX = (col + sharpCol) * px;
  const apexY = baselineFromTop * px - (row + sharpRow) * px;
  const radius = cornerRadiusPx * px;
  const centreX = (col + sharpCol + inkCol * cornerRadiusPx) * px;
  const centreY =
    baselineFromTop * px - (row + sharpRow + inkRow * cornerRadiusPx) * px;
  const quarterTurn = Math.PI / 2;
  const segmentAngle = quarterTurn / cornerArcSegments;
  const controlRadius = radius / Math.cos(segmentAngle / 2);
  const at = (angle: number, atRadius: number): [number, number] => [
    centreX + atRadius * Math.cos(angle),
    centreY + atRadius * Math.sin(angle),
  ];

  // the sharp corner, then the arc walked from its far end back to its near
  // end - the direction that winds this anticlockwise about the apex
  const points: Contour = [
    [apexX, apexY],
    at(startAngle + quarterTurn, radius),
  ];
  for (let i = cornerArcSegments; i > 0; i--) {
    const [controlX, controlY] = at(
      startAngle + segmentAngle * (i - 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    points.push(at(startAngle + segmentAngle * (i - 1), radius));
  }
  return points;
};

/** a closed contour wound the way non-zero fill needs to add or subtract it */
const wound = (
  points: Array<[number, number]>,
  /** true to wind clockwise in y-up space, which fill adds */
  clockwise: boolean,
): Contour => {
  let twiceArea = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    twiceArea += x1 * y2 - x2 * y1;
  }
  const isAnticlockwise = twiceArea > 0;
  return isAnticlockwise === clockwise ? [...points].reverse() : points;
};

/**
 * One tread of a 1:2 staircase recut as the straight line it approximates,
 * in font units. The line runs between the midpoints of the horizontal steps
 * above and below the tread, so consecutive treads meet exactly and a whole
 * staircase becomes one unbroken line at the true slope. It crosses the
 * blocky edge at the tread's middle, leaving a triangle of ink to take away
 * on one side of that crossing and an equal one to add on the other - so
 * straightening a staircase leaves the glyph's total ink unchanged.
 */
const diagonalEdgeContours = (
  col: number,
  row: number,
  {
    axis,
    ink,
    step,
    treadHeight,
    topReach,
    bottomReach,
  }: {
    axis: "horizontal" | "vertical";
    ink: "left" | "right";
    step: "left" | "right";
    treadHeight: number;
    topReach: number;
    bottomReach: number;
  },
): Contour[] => {
  const inkOnRight = ink === "right";
  const stepDir = step === "left" ? -1 : 1;
  const acrossAxis = axis === "vertical";
  // worked in the tread's own frame - one coordinate across the edge, one
  // along it - then mapped to font units, which is where the two axes differ
  const edgeStart = (acrossAxis ? col : row) + (inkOnRight ? 0 : 1);
  const alongStart = acrossAxis ? row : col;
  const at = (edge: number, along: number): [number, number] =>
    acrossAxis ?
      [edge * px, baselineFromTop * px - along * px]
    : [along * px, baselineFromTop * px - edge * px];
  // the line runs from one reach to the other, so it crosses the blocky edge
  // wherever those two distances balance
  const crossing =
    alongStart + (treadHeight * topReach) / (topReach + bottomReach);

  const upper: Array<[number, number]> = [
    at(edgeStart, alongStart),
    at(edgeStart - stepDir * topReach, alongStart),
    at(edgeStart, crossing),
  ];
  const lower: Array<[number, number]> = [
    at(edgeStart, crossing),
    at(edgeStart, alongStart + treadHeight),
    at(edgeStart + stepDir * bottomReach, alongStart + treadHeight),
  ];
  // whichever half of the tread the line cuts into the ink is the half to
  // take away; the other half it swings clear of, and is added
  const upperIsSubtracted = inkOnRight === stepDir < 0;
  return [wound(upper, !upperIsSubtracted), wound(lower, upperIsSubtracted)];
};

/**
 * as {@link glyphContours}, but pixels matching a {@link kernelRules} pattern
 * are replaced by that rule's action instead of contributing their plain
 * square shape - a lone hole becomes round, a two-cell-tall one becomes a
 * slot. Every other pixel stays perfectly square: this is the base the kernel
 * rule set grows from, one exception at a time.
 */
const kernelGlyphContours = (
  image: DecodedImage,
  { frame, char }: HudGlyph<string>,
): Contour[] => {
  const ink = (col: number, row: number): boolean =>
    col >= 0 &&
    row >= 0 &&
    col < frame.w &&
    row < frame.h &&
    isInk(image, frame.x + col, frame.y + row);

  const bitmap: boolean[][] = [];
  for (let row = 0; row < frame.h; row++) {
    bitmap.push(Array.from({ length: frame.w }, (_, col) => ink(col, row)));
  }

  const matches = scanKernelRules(bitmap, kernelRulesForChar(char));

  // matched cells no longer contribute their plain square shape to the
  // trace - carve them so the rectilinear tracer ignores them, then add the
  // rule's own shape on top:
  const carved = bitmap.map((row) => [...row]);
  const shapes: Contour[] = [];
  for (const { x, y, rule } of matches) {
    switch (rule.action.type) {
      case "circleHole":
        carved[y][x] = true;
        shapes.push(circleContour(x, y, true));
        break;
      case "slotHole":
        carved[y][x] = true;
        carved[y + 1][x] = true;
        shapes.push(slotContour(x, y));
        break;
      case "taperPoint": {
        // the lone cell is cleared and replaced by a triangle of equal area:
        // a base two cells across where the stroke ends, and the apex a cell
        // beyond it, which puts both sides at 45 degrees
        carved[y][x] = false;
        const { towards } = rule.action;
        const sideways = towards === "left" || towards === "right";
        // the base sits on the edge of the cell the stroke comes from, and
        // the apex on the far one
        const base = towards === "down" || towards === "right" ? 0 : 1;
        const apex = 1 - base;
        const at = (across: number, along: number): [number, number] =>
          sideways ?
            [(x + across) * px, baselineFromTop * px - (y + along) * px]
          : [(x + along) * px, baselineFromTop * px - (y + across) * px];
        shapes.push(
          wound([at(base, -0.5), at(base, 1.5), at(apex, 0.5)], true),
        );
        break;
      }
      case "notch": {
        // the bite is filled in so the edge traces straight, then a triangle
        // of the same area is taken back out of it: a mouth two cells wide
        // on the edge narrowing to a point one cell in, so both sides run at
        // 45 degrees
        carved[y][x] = true;
        const { opens } = rule.action;
        const sideways = opens === "left" || opens === "right";
        // the edge is the side of the cell the bite opens towards
        const mouth = opens === "right" || opens === "down" ? 1 : 0;
        const apex = 1 - mouth;
        const at = (across: number, along: number): [number, number] =>
          sideways ?
            [(x + across) * px, baselineFromTop * px - (y + along) * px]
          : [(x + along) * px, baselineFromTop * px - (y + across) * px];
        shapes.push(
          wound([at(mouth, -0.5), at(apex, 0.5), at(mouth, 1.5)], false),
        );
        break;
      }
      case "roundedCorner":
        // fill the cut corner in, so the traced outline is a clean right
        // angle, then take the rounding back out of it
        carved[y][x] = true;
        shapes.push(roundedCornerContour(x, y, rule.action.corner));
        break;
      case "diagonalEdge":
        // the tread keeps its square cells in the traced outline; the two
        // triangles trade the ink either side of the line across it
        shapes.push(...diagonalEdgeContours(x, y, rule.action));
        break;
      default:
        rule.action satisfies never;
    }
  }

  // the y-flip into font units reverses orientation, so the point order is
  // reversed too, keeping the convention that outers wind clockwise in
  // y-up space
  const traced = traceBitmapToLoops(carved).map((loop): Contour =>
    mergeCollinear(loop)
      .map(([x, y]): Contour[number] => [x * px, baselineFromTop * px - y * px])
      .reverse(),
  );

  return [...traced, ...shapes];
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

// a dedicated venv, self-bootstrapped below - avoids PEP 668's "externally
// managed environment" block on installing into the system python (eg via
// Homebrew on macOS). Override with PYTHON=/path/to/python to use a
// different install instead
const venvDir = "scripts/font/.venv";
const venvPython = `${venvDir}/bin/python`;
const python = process.env.PYTHON ?? venvPython;

const hasToolchain = (forPython: string): boolean => {
  try {
    execFileSync(forPython, ["-c", "import fontTools, brotli"], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * bootstrap {@link venvDir} and install the pinned toolchain into it, so
 * `pnpm gen:font` works with no manual python setup. Only attempted when the
 * caller hasn't overridden PYTHON to point somewhere else.
 */
const bootstrapVenv = () => {
  console.log(`setting up python toolchain in ${venvDir}...`);
  try {
    execFileSync("python3", ["-m", "venv", venvDir], { stdio: "inherit" });
    execFileSync(
      venvPython,
      ["-m", "pip", "install", "-q", "-r", requirementsPath],
      { stdio: "inherit" },
    );
  } catch (e) {
    throw new Error(
      `could not set up the font builder's python toolchain in ${venvDir}. ` +
        `Install python 3 (eg via Homebrew), then re-run pnpm gen:font`,
      { cause: e },
    );
  }
};

// fail with an actionable message rather than a raw ENOENT or Python traceback
// when the build toolchain isn't installed
const ensurePythonToolchain = () => {
  if (hasToolchain(python)) {
    return;
  }
  if (python === venvPython) {
    bootstrapVenv();
    if (hasToolchain(python)) {
      return;
    }
  }
  throw new Error(
    `the font builder's python dependencies are missing at ${python}. ` +
      `Install them with: ${python} -m pip install -r ${requirementsPath} ` +
      `(or unset PYTHON to let gen:font manage its own venv)`,
  );
};

const forceRebuild = process.argv.includes("--force");

const buildIfChanged = (
  builtDesign: ReturnType<typeof designFor>,
  toManifestPath: string,
  toOutputPath: string,
) => {
  if (
    !forceRebuild &&
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
  designFor(buildGlyphs(kernelGlyphContours)),
  smoothManifestPath,
  smoothOutputPath,
);
