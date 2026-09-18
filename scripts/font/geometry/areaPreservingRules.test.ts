import { expect, test } from "vitest";

import { type Contour, px } from "./fontUnits";
import { ruleSettingsFor } from "./ruleEnablement";
import { smoothGlyphContours } from "./smoothGlyphContours";

const bitmapOf = (rows: string[]) =>
  rows.map((row) => [...row].map((cell) => cell === "#"));

// glyphs exactly as they appear in gfx/sprites.borders.png. The 'R' bite at
// (3,7) is the gap between its straight stem and its kicked-out leg; the '1'
// step at (0,0) is the shoulder above its flag; the 'Y' steps at (0,4) and
// (6,4) are where its arms meet its stem
const rGlyph = bitmapOf([
  "#######.",
  "#######.",
  "###.###.",
  "#######.",
  "######..",
  "#######.",
  "#######.",
  "###.###.",
]);
const oneGlyph = bitmapOf([
  ".#####..",
  "######..",
  ".#####..",
  ".#####..",
  ".#####..",
  "#######.",
  "#######.",
  "#######.",
]);
const yGlyph = bitmapOf([
  "###.###.",
  "###.###.",
  "#######.",
  "#######.",
  ".#####..",
  ".#####..",
  ".#####..",
  ".#####..",
]);

type WalkPoint = { x: number; y: number; onCurve: boolean };

const cross = (a: WalkPoint, b: WalkPoint) => a.x * b.y - a.y * b.x;

/**
 * the area a contour encloses, in glyph pixels. TrueType implies an on-curve
 * point midway between consecutive off-curve ones, so those are written out
 * before walking; a quadratic from A through control B to C contributes
 * ⅔(A×B) + ⅓(A×C) + ⅔(B×C) to twice the area, and a straight side A×B
 */
const areaOf = (contour: Contour): number => {
  const given: WalkPoint[] = contour.map((point) => ({
    x: point[0],
    y: point[1],
    onCurve: point.length === 2,
  }));
  const walk: WalkPoint[] = [];
  for (const [index, here] of given.entries()) {
    const next = given[(index + 1) % given.length];
    walk.push(here);
    if (!here.onCurve && !next.onCurve) {
      walk.push({
        x: (here.x + next.x) / 2,
        y: (here.y + next.y) / 2,
        onCurve: true,
      });
    }
  }
  const from = walk.findIndex((point) => point.onCurve);
  const at = (step: number) => walk[(from + step) % walk.length];

  let twiceArea = 0;
  let step = 0;
  while (step < walk.length) {
    const start = at(step);
    const second = at(step + 1);
    if (second.onCurve) {
      twiceArea += cross(start, second);
      step += 1;
      continue;
    }
    const end = at(step + 2);
    twiceArea +=
      (2 / 3) * cross(start, second) +
      (1 / 3) * cross(start, end) +
      (2 / 3) * cross(second, end);
    step += 2;
  }
  return twiceArea / 2 / px ** 2;
};

const totalArea = (
  bitmap: boolean[][],
  char: string,
  allowed: Parameters<typeof smoothGlyphContours>[2],
) =>
  Math.abs(
    smoothGlyphContours(bitmap, char, allowed).contours.reduce(
      (total, contour) => total + areaOf(contour),
      0,
    ),
  );

const inkCells = (bitmap: boolean[][]) => bitmap.flat().filter(Boolean).length;

test("cutting the notch as a wedge instead takes away exactly as much ink", () => {
  // both are sized against the pixel the fill puts back, so swapping one for
  // the other moves ink about without adding or losing any
  expect(
    totalArea(
      rGlyph,
      "R",
      ruleSettingsFor({
        pixelRules: {
          "3,7": { notchOpensDown: { options: { shape: "wedgeSquareLow" } } },
        },
      }),
    ),
  ).toBeCloseTo(totalArea(rGlyph, "R", ruleSettingsFor(undefined)), 9);
});

test("chamfering the step above a '1' flag leaves its ink area alone", () => {
  expect(
    totalArea(
      oneGlyph,
      "1",
      ruleSettingsFor({
        pixelRules: { "0,0": { chamferStepTopLeft: { on: true } } },
      }),
    ),
  ).toBeCloseTo(inkCells(oneGlyph), 9);
});

test("chamfering both steps of a 'Y' leaves its ink area alone", () => {
  expect(
    totalArea(
      yGlyph,
      "Y",
      ruleSettingsFor({
        pixelRules: {
          "0,4": { chamferStepBottomLeft: { on: true } },
          "6,4": { chamferStepBottomRight: { on: true } },
        },
      }),
    ),
  ).toBeCloseTo(inkCells(yGlyph), 9);
});

test("the wedge leaves the stem's edge straight and slants only the leg", () => {
  const { contours } = smoothGlyphContours(
    rGlyph,
    "R",
    ruleSettingsFor({
      pixelRules: {
        "3,7": { notchOpensDown: { options: { shape: "wedgeSquareLow" } } },
      },
    }),
  );
  const inPixels = contours
    .flat()
    .map((point) => [point[0] / px, 8 - point[1] / px]);
  // the square side sits on the stem's own edge, at x = 3, and reaches √2 up
  expect(
    inPixels.some(
      ([x, y]) =>
        Math.abs(x - 3) < 1e-9 && Math.abs(y - (8 - Math.SQRT2)) < 1e-9,
    ),
  ).toBe(true);
});
