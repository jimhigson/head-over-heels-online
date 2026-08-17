import { expect, test } from "vitest";

import { baselineFromTop, px } from "./fontUnits";
import { type VectorContour, type VectorShape } from "./glyphOverrides";
import { contourPixelPoints, vectorGlyphContours } from "./vectorGlyphContours";

const square: VectorContour = {
  type: "contour",
  points: [
    [1, 1],
    [7, 1],
    [7, 7],
    [1, 7],
  ],
};

/** back from font units to the glyph pixels the shapes were authored in */
const inPixels = (contour: Array<[number, number, 0] | [number, number]>) =>
  contour.map((point) => [point[0] / px, baselineFromTop - point[1] / px]);

test("a plain contour is drawn exactly as authored", () => {
  expect(contourPixelPoints(square)).toEqual([
    [1, 1],
    [7, 1],
    [7, 7],
    [1, 7],
  ]);
});

test("a curved segment takes its control from where its neighbours' lines cross", () => {
  // a quarter of a diamond: the vertical and the 45 degree side either side of
  // the curve meet at (7,1), which is where the control has to land for the
  // curve to leave one tangentially and arrive on the other
  const curved: VectorContour = {
    type: "contour",
    points: [
      [7, 7],
      [7, 3],
      [5, 1],
      [1, 1],
    ],
    curves: [1],
  };
  expect(contourPixelPoints(curved)[2]).toEqual([7, 1, 0]);
});

test("a chamfered corner cuts one pixel back along each of its two edges", () => {
  const chamfered: VectorContour = { ...square, corners: { "1": "chamfer" } };
  expect(contourPixelPoints(chamfered).slice(1, 3)).toEqual([
    [6, 1],
    [7, 2],
  ]);
});

test("a rounded corner meets both its edges tangentially", () => {
  const rounded: VectorContour = { ...square, corners: { "1": "round" } };
  const [, start, , , end] = contourPixelPoints(rounded);
  // the arc's two ends sit on the edges either side, the same distance back
  expect([start[1], end[0]].map((c) => Math.round(c * 1e9) / 1e9)).toEqual([
    1, 7,
  ]);
});

test("a contour inside another is a hole, whichever way each is wound", () => {
  const counter: VectorContour = {
    type: "contour",
    points: [
      [3, 3],
      [3, 5],
      [5, 5],
      [5, 3],
    ],
  };
  const [outer, inner] = vectorGlyphContours([square, counter]);
  // non-zero fill adds a contour of negative signed area in font space and
  // subtracts one of positive, so the two must come out opposite
  const signedArea = (
    contour: ReturnType<typeof vectorGlyphContours>[number],
  ) =>
    Math.sign(
      contour.reduce((total, [x, y], index) => {
        const [nextX, nextY] = contour[(index + 1) % contour.length];
        return total + x * nextY - nextX * y;
      }, 0),
    );
  expect(signedArea(outer)).toEqual(-signedArea(inner));
});

test("a circle shape is placed on the cell it names", () => {
  const [circle] = vectorGlyphContours([
    { type: "circle", cell: [3, 4] } satisfies VectorShape,
  ]);
  const centres = inPixels(circle).reduce(
    ([totalX, totalY], [x, y]) => [
      totalX + x / circle.length,
      totalY + y / circle.length,
    ],
    [0, 0],
  );
  expect(centres.map((c) => Math.round(c * 100) / 100)).toEqual([3.5, 4.5]);
});
