import { expect, test } from "vitest";

import { type Contour, px } from "./fontUnits";
import { circleContour } from "./kernelShapes";

const cross = (
  [aX, aY]: readonly number[],
  [bX, bY]: readonly number[],
): number => aX * bY - aY * bX;

/**
 * the area a contour of all-off-curve points encloses, in glyph pixels.
 *
 * TrueType implies an on-curve point midway between consecutive controls, so
 * the contour is that many quadratic Béziers; integrating ½∮(x dy − y dx)
 * over a quadratic from A through control B to C gives
 * ⅓(A×B) + ⅙(A×C) + ⅓(B×C), which summed round the loop is the enclosed area
 */
const areaOf = (contour: Contour): number => {
  const midpoint = (a: Contour[number], b: Contour[number]) => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  let total = 0;
  for (const [index, control] of contour.entries()) {
    const start = midpoint(
      contour[(index + contour.length - 1) % contour.length],
      control,
    );
    const end = midpoint(control, contour[(index + 1) % contour.length]);
    total +=
      cross(start, control) / 3 +
      cross(start, end) / 6 +
      cross(control, end) / 3;
  }
  return Math.abs(total) / px ** 2;
};

test("a circular hole encloses exactly the one pixel of ink it replaces", () => {
  expect(areaOf(circleContour(3, 4, true))).toBeCloseTo(1, 9);
});

test("a circular hole is centred on its cell", () => {
  const contour = circleContour(3, 4, true);
  const centre = contour.reduce(
    ([x, y], point) => [
      x + point[0] / contour.length,
      y + point[1] / contour.length,
    ],
    [0, 0],
  );
  expect([centre[0] / px, 8 - centre[1] / px]).toEqual([3.5, 4.5]);
});
