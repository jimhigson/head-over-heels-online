import { expect, test } from "vitest";

import { cleanEdgeUpscaleBinary } from "../cleanEdgeUpscaleBinary";
import {
  traceBitmapToLoops,
  type TracedLoop,
  traceSmoothContours,
} from "./traceSmoothContours";

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

/** non-zero winding rasterisation of loops back to ascii art */
const rasterise = (loops: TracedLoop[], w: number, h: number): string => {
  const rows: string[] = [];
  for (let y = 0; y < h; y++) {
    let row = "";
    for (let x = 0; x < w; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      let winding = 0;
      for (const loop of loops) {
        for (let i = 0; i < loop.length; i++) {
          const [x1, y1] = loop[i];
          const [x2, y2] = loop[(i + 1) % loop.length];
          if ((y1 <= py && y2 > py) || (y2 <= py && y1 > py)) {
            const t = (py - y1) / (y2 - y1);
            if (x1 + t * (x2 - x1) > px) {
              winding += y2 > y1 ? 1 : -1;
            }
          }
        }
      }
      row += winding !== 0 ? "#" : ".";
    }
    rows.push(row);
  }
  return rows.join("\n");
};

test("traces a ring with an island: hole wound opposite to outers", () => {
  const loops = traceBitmapToLoops(
    bitmapOf(["#####", "#...#", "#.#.#", "#...#", "#####"]),
  );
  expect(loops.map((loop) => Math.sign(shoelace(loop))).sort()).toEqual([
    -1, -1, 1,
  ]);
});

test("collapsing stairs preserves the shape within half a subpixel", () => {
  const rows = ["......##", "....##..", "..##....", "##......"];
  const bitmap = cleanEdgeUpscaleBinary(
    (x, y) => x >= 0 && y >= 0 && x < 8 && y < 4 && rows[y][x] === "#",
    8,
    4,
    4,
  );
  const collapsed = traceSmoothContours(bitmap);
  const original = rasterise(traceBitmapToLoops(bitmap), 32, 16);
  const simplified = rasterise(collapsed, 32, 16);
  // rasterising the diagonal back differs from the staircase only at step
  // corners (about one subpixel per step, both sides of the line) - count
  // differing subpixels
  let differing = 0;
  for (let i = 0; i < original.length; i++) {
    if (original[i] !== simplified[i]) {
      differing++;
    }
  }
  expect(differing).toBeLessThan(30);
});

test("collapsing stairs massively reduces vertex count on a 2:1 line", () => {
  const rows = ["......##", "....##..", "..##....", "##......"];
  const bitmap = cleanEdgeUpscaleBinary(
    (x, y) => x >= 0 && y >= 0 && x < 8 && y < 4 && rows[y][x] === "#",
    8,
    4,
    4,
  );
  const [stairLoop] = traceBitmapToLoops(bitmap);
  const [collapsedLoop] = traceSmoothContours(bitmap);
  expect(collapsedLoop.length).toBeLessThan(stairLoop.length / 3);
});
