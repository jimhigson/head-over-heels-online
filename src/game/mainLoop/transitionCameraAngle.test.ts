import { expect, test } from "vitest";

import { type Xy } from "../../utils/vectors/vectors";
import {
  hermiteEase,
  hermiteEaseSlope,
  transitionCameraAngle,
} from "./transitionCameraAngle";

const base: Xy = { x: 1, y: 0 };
const anticlockwise: Xy = { x: 0, y: 1 };
const half: Xy = { x: -1, y: 0 };
const clockwise: Xy = { x: 0, y: -1 };

const closeToXy = (a: Xy, b: Xy) => {
  expect(a.x).toBeCloseTo(b.x);
  expect(a.y).toBeCloseTo(b.y);
};

test("hermiteEase with zero start slope is smoothstep - pins the endpoints and midpoint", () => {
  expect([hermiteEase(0, 0), hermiteEase(0.5, 0), hermiteEase(1, 0)]).toEqual([
    0, 0.5, 1,
  ]);
});

test("hermiteEase with zero start slope is slow near the start", () => {
  // smoothstep(0.25) = 3*0.0625 - 2*0.015625 = 0.15625 < the linear 0.25
  expect(hermiteEase(0.25, 0)).toBeCloseTo(0.156_25);
});

test("hermiteEase starts at exactly its given slope", () => {
  expect(hermiteEaseSlope(0, 0.8)).toBeCloseTo(0.8);
});

test("hermiteEase always ends at zero slope", () => {
  expect([hermiteEaseSlope(1, 0), hermiteEaseSlope(1, 1.5)]).toEqual([0, 0]);
});

test("hermiteEase pins the endpoints regardless of start slope", () => {
  expect([hermiteEase(0, 1.5), hermiteEase(1, 1.5)]).toEqual([0, 1]);
});

test("a negative start slope dips below 0 first (a cancel overshoots then returns)", () => {
  expect(hermiteEase(0.1, -1)).toBeLessThan(0);
});

const quarterArc = Math.PI / 2;

test("progress 0 renders exactly the from angle", () => {
  closeToXy(transitionCameraAngle(base, quarterArc, 0, 0), base);
});

test("progress 1 renders exactly the arc's endpoint", () => {
  closeToXy(transitionCameraAngle(base, quarterArc, 1, 0), anticlockwise);
});

test("halfway through an anticlockwise quarter turn is +45°", () => {
  closeToXy(transitionCameraAngle(base, quarterArc, 0.5, 0), {
    x: Math.SQRT1_2,
    y: Math.SQRT1_2,
  });
});

test("halfway through a clockwise quarter turn is -45°", () => {
  closeToXy(transitionCameraAngle(base, -quarterArc, 0.5, 0), {
    x: Math.SQRT1_2,
    y: -Math.SQRT1_2,
  });
});

test("endpoints are exact for every quarter turn", () => {
  for (const [from, arc, to] of [
    [base, quarterArc, anticlockwise],
    [anticlockwise, quarterArc, half],
    [half, quarterArc, clockwise],
    [clockwise, quarterArc, base],
    [base, -quarterArc, clockwise],
  ] as const) {
    closeToXy(transitionCameraAngle(from, arc, 0, 0), from);
    closeToXy(transitionCameraAngle(from, arc, 1, 0), to);
  }
});

test("an arc beyond 180° sweeps the long way round to its endpoint", () => {
  // three anticlockwise quarters from base end a quarter clockwise of it; at
  // the eased midpoint 135° has been swept - deep in the second quadrant,
  // proving the sweep goes anticlockwise (the shortest path to the same
  // endpoint would be 90° clockwise, through the fourth quadrant):
  closeToXy(transitionCameraAngle(base, 3 * quarterArc, 0.5, 0), {
    x: -Math.SQRT1_2,
    y: Math.SQRT1_2,
  });
  closeToXy(transitionCameraAngle(base, 3 * quarterArc, 1, 0), clockwise);
});

test("a non-quarter from angle sweeps its arc exactly", () => {
  const from45: Xy = { x: Math.SQRT1_2, y: Math.SQRT1_2 };
  // 135° anticlockwise from 45° ends at the half turn:
  closeToXy(transitionCameraAngle(from45, (3 * Math.PI) / 4, 0, 0), from45);
  closeToXy(transitionCameraAngle(from45, (3 * Math.PI) / 4, 1, 0), half);
});
