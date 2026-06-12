import { bench } from "vitest";

import { buildBeamScenario, castOnce } from "./scenario";

/*
Casts the whole beam path (2-row lamp, 3 reflections + a partial-reflection
split) through a 16x16 room crowded with 48 monsters sitting off the path.
The identical-result of before vs after is guarded by the sibling
lightBeamsCast.test.ts snapshot.

before (all-items scan, 14/6/2026):
  cast beams ... room of 48 monsters  30,952 hz  mean 0.0323ms  ±0.60%

after (cell-march via spatial index, 14/6/2026):
  cast beams ... room of 48 monsters  137,776 hz  mean 0.0073ms  ±2.49%
  => ~4.4x faster; the gap widens as more items sit off the beam path

after dropping the per-row merge + generator and packing cell keys as ints (18/6/2026):
  cast beams ... room of 48 monsters  206,397 hz  mean 0.0048ms  ±1.16%
  => ~6.7x over the original scan; ~1.5x over the cell-march above
*/

const scenario = buildBeamScenario();

bench(
  "cast beams (3 reflections + split) through a room of 48 monsters",
  () => {
    castOnce(scenario);
  },
  { iterations: 30 },
);
