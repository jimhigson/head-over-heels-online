import { cycle, join, take } from "iter-tools-es";

import { maxFps } from "../game/physics/mechanicsConstants";

export type FrameRateSpec = { fps: Array<number> };

export const testFrameRates: Array<FrameRateSpec> = [
  { fps: [12.5] }, // original game: every other frame, PAL
  { fps: [25] }, // PAL
  { fps: [29.97] }, // NTSC real
  { fps: [30] }, // NTSC approx
  { fps: [40] },
  { fps: [45] },
  { fps: [46] },
  { fps: [50] }, // double original (interlaced)
  { fps: [50.04] }, // double original (interlaced, measured)
  { fps: [60] }, // most common; ios Safari throttle
  { fps: [75] }, // typical/high
  { fps: [79.638] }, // boundary found for head being able to jump too high (failed, frame rate not fast enough) - before sub-steps
  { fps: [79.639] }, // boundary found for head being able to jump too high (passed, frame rate *is* fast enough) - before sub-steps
  { fps: [80] },
  { fps: [90] },
  { fps: [100] }, // fast PAL/SECAM (flicker-free crt etc)
  { fps: [120] }, // eg macbook pro w/promotion
  { fps: [144] }, // high desktop monitor update rate
  { fps: [200] }, // very fast PAL/SECAM
  { fps: [240] }, // very high desktop monitor update rate
  { fps: [260] }, // old highest supported
  { fps: [280] }, // old highest supported
  { fps: [300] }, // old highest supported
  { fps: [330, 240, 330, 330] }, // highest supported with some dropped frames
  { fps: [330] }, // highest supported (ok, I bought a new monitor!)
  { fps: [maxFps] }, // testing the highest supported actually works, in case it changes!

  // now, some inconsistent frame rates:
  { fps: [30, 15] },
  {
    fps: Array.from(
      join([
        // 1/10 of a second at 60fps
        take(6, cycle([60])),
        // 1/10 of a second at 30fps
        take(3, cycle([30])),
      ]),
    ),
  },
  {
    fps: Array.from(
      join([
        // 1/4 of a second at 60fps
        take(15, cycle([60])),
        // 1/4 (ish) of a second at 30fps
        take(7, cycle([30])),
      ]),
    ),
  },
  { fps: [30, 60] },
  { fps: [240, 120] },
  {
    fps: Array.from(
      join([
        // 1/10 of a second at 240fps
        take(12, cycle([240])),
        // 1/10 of a second at 120fps
        take(6, cycle([120])),
      ]),
    ),
  },
  {
    fps: Array.from(
      join([
        // 1/4 of a second at 240fps
        take(60, cycle([240])),
        // 1/4 of a second at 120fps
        take(30, cycle([120])),
      ]),
    ),
  },
  // a bit more random/ variable, moderate spec:
  {
    fps: Array.from(
      join([
        // 1/4 of a second at 240fps
        take(60, cycle([240])),
        // 1/2 of a second at 60fps
        take(30, cycle([60])),
        // 1/4 of a second at 120fps
        take(30, cycle([120])),
      ]),
    ),
  },
  // stuttering low-spec
  { fps: [15, 40, 36, 12.5, 60, 30, 60, 30] },
];
