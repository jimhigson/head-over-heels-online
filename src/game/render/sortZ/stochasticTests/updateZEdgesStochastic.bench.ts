import { bench } from "vitest";

import { frameCount, itemCount, movePercentage, runTest } from "./runTest";

/*
There results can be confirmed to be giving identical results by using the sibling .test.ts

pre-indexes (10/8/2025):
src/game/render/sortZ/updateZEdges.bench.ts > updateZEdges benchmark 5731ms
    name                                        hz     min     max    mean     p75     p99    p995    p999     rme  samples
  · 20% items moved (100 items) 100 frames  2.9896  328.88  350.55  334.49  334.73  350.55  350.55  350.55  ±1.36%       10


with indexing (10/9/2025):
 src/game/render/sortZ/stochasticTests/updateZEdgesStochastic.bench.ts 928ms
   name                                         hz      min      max     mean      p75      p99     p995     p999     rme  samples
 · 20% items moved (100 items) 100 frames  40.5003  23.6659  25.7261  24.6912  25.2506  25.7261  25.7261  25.7261  ±0.87%       30

 changing the index to be only x,y (not z) gives ~25Hz (11/9/2025) but the game overall is slightly faster,
 because in the real engine, the items aren't as densely packed as in this artificial benchmark. This is still
 ~8x faster than unindexed
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
