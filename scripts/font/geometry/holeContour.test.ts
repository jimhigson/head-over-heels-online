import { expect, test } from "vitest";

import { cornerChoices, roundedCornersNamed } from "./corners";
import { contourArea, px } from "./fontUnits";
import { holeContour } from "./holeContour";

const sizes = [
  { cellsWide: 1, cellsTall: 1 },
  { cellsWide: 1, cellsTall: 2 },
  { cellsWide: 2, cellsTall: 2 },
] as const;

const inPixels = (area: number) => area / px ** 2;

const everyShape = sizes.flatMap(({ cellsWide, cellsTall }) =>
  cornerChoices.map(({ name }) => ({ cellsWide, cellsTall, corners: name })),
);

test.for(everyShape)(
  "a $cellsWide×$cellsTall hole with $corners corners encloses exactly its cells",
  ({ cellsWide, cellsTall, corners }) => {
    expect(
      inPixels(
        contourArea(
          holeContour(
            0,
            0,
            cellsWide,
            cellsTall,
            roundedCornersNamed(corners),
            "areaPreserving",
          ),
        ),
      ),
    ).toBeCloseTo(cellsWide * cellsTall, 9);
  },
);

test.for(everyShape)(
  "a $cellsWide×$cellsTall hole with $corners corners stays inside its cells when told to fit",
  ({ cellsWide, cellsTall, corners }) => {
    const contour = holeContour(
      0,
      0,
      cellsWide,
      cellsTall,
      roundedCornersNamed(corners),
      "fitInPixel",
    );
    const xs = contour.map((point) => point[0] / px);
    const ys = contour.map((point) => 8 - point[1] / px);
    // every point of it, controls included, is within the cells it replaces
    expect([
      Math.min(...xs) >= -1e-9,
      Math.max(...xs) <= cellsWide + 1e-9,
      Math.min(...ys) >= -1e-9,
      Math.max(...ys) <= cellsTall + 1e-9,
    ]).toEqual([true, true, true, true]);
  },
);

test("an all-square hole is exactly the cells it replaces", () => {
  expect(
    holeContour(0, 0, 1, 1, roundedCornersNamed("allSquare"), "areaPreserving"),
  ).toHaveLength(4);
});

test.for(everyShape)(
  "a $cellsWide×$cellsTall hole with $corners corners is wound so fill takes it away",
  ({ cellsWide, cellsTall, corners }) => {
    const contour = holeContour(
      0,
      0,
      cellsWide,
      cellsTall,
      roundedCornersNamed(corners),
      "areaPreserving",
    );
    // non-zero fill subtracts a contour of positive signed area in font space,
    // which is what makes a hole a hole rather than a blob of ink
    const twiceSigned = contour.reduce((total, point, index) => {
      const next = contour[(index + 1) % contour.length];
      return total + point[0] * next[1] - point[1] * next[0];
    }, 0);
    expect(twiceSigned).toBeGreaterThan(0);
  },
);
