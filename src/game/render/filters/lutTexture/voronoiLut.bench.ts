import { bench } from "vitest";

import { paletteQuantMappingsWithHalfBrite } from "./stdLuts/paletteQuantisationLut";
import { voronoiLut } from "./voronoiLut";

/*

  on an M4Pro MacBook Pro under node v22:

 ✓ src/game/render/filters/lutTexture/voronoiLut.bench.ts 1746ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · voronoiLut (palette + halfbrite)  305.93  2.8776  4.4816  3.2688  3.2075  4.2281  4.3240  4.4816  ±0.75%      500

 */
bench(
  "voronoiLut (palette + halfbrite)",
  () => {
    voronoiLut(paletteQuantMappingsWithHalfBrite);
  },
  { iterations: 500 },
);
