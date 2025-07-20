import { blockSizeXyzPx } from "../../sprites/spritePivots";
import { type Xyz, subXyz, productXyz } from "../../utils/vectors/vectors";
import { completeTimesXyz } from "../../model/times";

export const multiplyBoundingBox = (
  singleItemBB: Xyz,
  timesConfig: Partial<Xyz> = {},
): Xyz => {
  const times = completeTimesXyz(timesConfig);

  const difference = subXyz(blockSizeXyzPx, singleItemBB);

  return subXyz(productXyz(times, blockSizeXyzPx), difference);
};
