import { bench } from "vitest";

import { frameCount, itemCount, movePercentage, runTest } from "./runTest";

/**
 *  src/game/render/sortZ/updateZEdges.bench.ts > updateZEdges benchmark 5731ms
 *      name                                       hz     min     max    mean     p75     p99    p995    p999     rme  samples
 *     · 20% items moved (100 items) 100 frames  2.9896  328.88  350.55  334.49  334.73  350.55  350.55  350.55  ±1.36%       10
 */
bench(
  `${movePercentage * 100}% items moved (${itemCount} items) ${frameCount} frames`,
  () => {
    runTest();
  },
  {
    iterations: 30, // increase number of iterations (default is 10)
  },
);
