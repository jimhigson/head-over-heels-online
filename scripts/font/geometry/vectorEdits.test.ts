import { expect, test } from "vitest";

import { type VectorContour, type VectorPoint } from "./glyphOverrides";
import { slopeOf } from "./slopes";
import {
  movePoint,
  removeCorner,
  splitSide,
  translateSide,
  turnSide,
} from "./vectorEdits";

const square: VectorContour = {
  type: "contour",
  points: [
    [1, 1],
    [7, 1],
    [7, 7],
    [1, 7],
  ],
};

const diamond: VectorContour = {
  type: "contour",
  points: [
    [4, 0],
    [8, 4],
    [4, 8],
    [0, 4],
  ],
};

test("sliding a side moves both its corners and leaves the rest alone", () => {
  expect(translateSide(square, 0, [0, 2]).points).toEqual([
    [1, 3],
    [7, 3],
    [7, 7],
    [1, 7],
  ]);
});

test("a side's offset snaps to the grid however far it is dragged", () => {
  expect(translateSide(square, 0, [0, 1.31]).points[0]).toEqual([1, 2.5]);
});

test("sliding a 45 degree side keeps both its corners on the grid", () => {
  const moved = translateSide(diamond, 0, [0.4, 0.4]);
  expect(moved.points.every(([x, y]) => x % 0.5 === 0 && y % 0.5 === 0)).toBe(
    true,
  );
});

test("turning a side leaves it at a legal slope", () => {
  const turned = turnSide(square, 0, 1);
  expect(slopeOf(turned.points[0], turned.points[1])).toBeDefined();
});

test("splitting a side puts a new corner at its middle", () => {
  expect(splitSide(square, 0).points).toEqual([
    [1, 1],
    [4, 1],
    [7, 1],
    [7, 7],
    [1, 7],
  ]);
});

test("splitting a side moves the corner treatments after it along with it", () => {
  const withCorner: VectorContour = { ...square, corners: { "2": "round" } };
  expect(splitSide(withCorner, 0).corners).toEqual({ "3": "round" });
});

test("removing a corner renumbers the curves that came after it", () => {
  const withCurve: VectorContour = { ...square, curves: [2] };
  expect(removeCorner(withCurve, 0).curves).toEqual([1]);
});

test("a triangle keeps its last three corners", () => {
  const triangle: VectorContour = {
    type: "contour",
    points: [
      [0, 0],
      [4, 0],
      [0, 4],
    ],
  };
  expect(removeCorner(triangle, 0)).toEqual(triangle);
});

test("a corner dragged to a free angle still lands on the grid", () => {
  const moved = movePoint(square, 1, [-1.31, 0.8]);
  expect(moved.points[1]).toEqual<VectorPoint>([5.5, 2]);
});

test("the sides either side of a dragged corner are left free", () => {
  const moved = movePoint(square, 1, [-1.31, 0.8]);
  expect(slopeOf(moved.points[0], moved.points[1])).toBeUndefined();
});

test("a side left at a free angle can still be slid", () => {
  const freed = movePoint(square, 1, [-1.31, 0.8]);
  expect(translateSide(freed, 0, [0, 1]).points[0]).not.toEqual<VectorPoint>(
    square.points[0],
  );
});
