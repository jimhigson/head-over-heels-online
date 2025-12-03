import { completeTimesXyz } from "../../model/times";
import {
  productXyz,
  subXyz,
  subXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

export const multiplyBoundingBox = (
  singleItemBB: Xyz,
  timesConfig: Partial<Xyz> = {},
): Xyz => {
  const times = completeTimesXyz(timesConfig);

  const difference = subXyz(blockSizePx, singleItemBB);

  return subXyzInPlace(productXyz(times, blockSizePx), difference);
};
