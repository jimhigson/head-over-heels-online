import { expect, test } from "vitest";

import { readGlyphOverrides } from "../node/readGlyphOverrides";
import { baselineFromTop, px } from "./fontUnits";
import { ruleSettingsFor } from "./ruleEnablement";
import { smoothGlyphContours } from "./smoothGlyphContours";

// read the same way the build reads it, so these test the settings the font
// is actually built from rather than a copy kept in step by hand
const overrides = readGlyphOverrides();

const bitmapOf = (rows: string[]): boolean[][] =>
  rows.map((row) => [...row].map((ch) => ch === "#"));

/** every point of every contour, back in the bitmap's own coordinates */
const cellPointsOf = (char: string, rows: string[]) =>
  smoothGlyphContours(
    bitmapOf(rows),
    char,
    ruleSettingsFor(overrides[char]),
  ).contours.flatMap((contour) =>
    contour.map(
      ([x, y]) => [x / px, baselineFromTop - y / px] as [number, number],
    ),
  );

// a left-pointing arrow: one edge steps out to the tip and straight back, so
// the two runs are the same side of the same stroke rather than two sides
// meeting
const leftArrow = [
  "........",
  "...#....",
  "..#####.",
  ".######.",
  "#######.",
  ".######.",
  "..#####.",
  "...#....",
];

const seven = [
  "#######.",
  "#######.",
  "...###..",
  "..####..",
  ".####...",
  ".####...",
  "####....",
  "####....",
];

test("an arrow comes to a single point at its tip", () => {
  expect(cellPointsOf("\u{2b05}", leftArrow).filter(([x]) => x === 0)).toEqual<
    Array<[number, number]>
  >([[0, 4.5]]);
});

test("the arrow's tip is where its two edges cross", () => {
  expect(cellPointsOf("\u{2b05}", leftArrow)).toContainEqual<[number, number]>([
    0, 4.5,
  ]);
});

test("a curve told to end at the corner reaches it", () => {
  expect(cellPointsOf("7", seven)).toContainEqual<[number, number]>([3, 2]);
});

test("that curve leaves nothing of the steps it swallowed", () => {
  expect(cellPointsOf("7", seven)).not.toContainEqual<[number, number]>([
    2.5, 3,
  ]);
});
