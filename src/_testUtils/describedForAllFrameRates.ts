import { describe } from "vitest";

import { type FrameRateSpec, testFrameRates } from "./testFrameRates";

/**
 * describe the given tests once for each of the standard test frame rates,
 * titled by the frame rate. Pass the frame rate to every play-through
 */
export const describedForAllFrameRates = (
  /**
   * declares the tests, for the given frame rate
   */
  describeTests: (frameRate: FrameRateSpec) => void,
) => describe.for(testFrameRates)("at $fps fps", describeTests);
