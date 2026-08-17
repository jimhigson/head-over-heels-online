import { expect, test } from "vitest";

import { type VectorContour } from "./glyphOverrides";
import { validateVectorGlyph } from "./validateVectorGlyph";

const square: VectorContour = {
  type: "contour",
  points: [
    [1, 1],
    [7, 1],
    [7, 7],
    [1, 7],
  ],
};

test("a square drawn on the grid has nothing wrong with it", () => {
  expect(validateVectorGlyph([square])).toEqual([]);
});

test("a side at an angle outside the preferred few is left alone", () => {
  const chevron: VectorContour = {
    type: "contour",
    points: [
      [0, 4],
      [3, 0],
      [7, 0],
    ],
  };
  expect(validateVectorGlyph([chevron])).toEqual([]);
});

test("a corner off the grid is reported", () => {
  const offGrid: VectorContour = {
    ...square,
    points: [[1, 1.25], ...square.points.slice(1)],
  };
  expect(
    validateVectorGlyph([offGrid]).map(({ message }) => message),
  ).toContain("corner 0 at 1, 1.25 is off the 0.5 pixel grid");
});

test("a chamfer on a corner that is not square is reported", () => {
  const triangle: VectorContour = {
    type: "contour",
    points: [
      [0, 0],
      [4, 0],
      [2, 4],
    ],
    corners: { "1": "chamfer" },
  };
  expect(
    validateVectorGlyph([triangle]).map(({ message }) => message),
  ).toContain("corner 1 is chamfered but is not a right angle");
});

test("a contour folded through itself is reported", () => {
  const bowtie: VectorContour = {
    type: "contour",
    points: [
      [0, 0],
      [4, 4],
      [4, 0],
      [0, 4],
    ],
  };
  expect(validateVectorGlyph([bowtie]).map(({ message }) => message)).toContain(
    "side 0 crosses side 2",
  );
});

test("two curves in a row leave the second with no straight side to leave", () => {
  const curved: VectorContour = { ...square, curves: [0, 1] };
  expect(validateVectorGlyph([curved]).map(({ message }) => message)).toContain(
    "side 0 curves into another curve, so it has no straight side to leave tangentially",
  );
});
