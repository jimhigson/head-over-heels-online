import { expect, test } from "vitest";

import { traceBitmapToLoops, type TracedLoop } from "./traceSmoothContours";

const bitmapOf = (rows: string[]): boolean[][] =>
  rows.map((row) => [...row].map((ch) => ch === "#"));

const shoelace = (loop: TracedLoop): number => {
  let sum = 0;
  for (let i = 0; i < loop.length; i++) {
    const [x1, y1] = loop[i];
    const [x2, y2] = loop[(i + 1) % loop.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
};

test("traces a ring with an island: hole wound opposite to outers", () => {
  const loops = traceBitmapToLoops(
    bitmapOf(["#####", "#...#", "#.#.#", "#...#", "#####"]),
  );
  expect(loops.map((loop) => Math.sign(shoelace(loop))).sort()).toEqual([
    -1, -1, 1,
  ]);
});
