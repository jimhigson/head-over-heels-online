import { completeTimesXyz } from "../../model/times";
import { blockSizeXyzPx } from "../../sprites/spritePivots";
import {
  productXyz,
  subXyz,
  subXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";

export const multiplyBoundingBox = (
  singleItemBB: Xyz,
  timesConfig: Partial<Xyz> = {},
): Xyz => {
  const times = completeTimesXyz(timesConfig);

  const difference = subXyz(blockSizeXyzPx, singleItemBB);

  return subXyzInPlace(productXyz(times, blockSizeXyzPx), difference);
};
