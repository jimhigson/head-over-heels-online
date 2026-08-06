import { expect, test } from "vitest";

import { beamItemsSnapshot, buildBeamScenario } from "./scenario";

/**
 * Snapshot of the beam items the demanding bench scenario casts - a precise
 * identical-result guard beyond the hand-written assertions in
 * lightBeamsIntegration.test.ts.
 */
test("bench scenario casts a stable set of beam items", () => {
  expect(beamItemsSnapshot(buildBeamScenario())).toMatchSnapshot();
});

test("the scenario casts independent per-row beams that reflect several times", () => {
  const beams = beamItemsSnapshot(buildBeamScenario());
  // lamp->m1 (both rows), the upper row continuing past the single-height m2,
  // m1->m2, m2->m3, m3->wall, plus tips
  expect<boolean>(beams.length >= 5).toBe(true);
  // the 2-row-tall lamp casts a separate beam per row, at distinct heights -
  // the rows are never merged into one tall beam:
  const zLevels = new Set(beams.map((b) => b.box.z));
  expect<number>(zLevels.size).toBeGreaterThanOrEqual(2);
});
