import type { Writable } from "type-fest";

import type { ItemInPlayAAbbInfo } from "../../model/ItemInPlay";

import { completeTimesXyz } from "../../model/times";
import {
  addXyz,
  productXyz,
  subXyz,
  subXyzInPlace,
  type Xyz,
} from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

export const multiplyBoundingBox = ({
  singleItemBBInfo: { aabb: singleItemBB, renderAabbOffset, renderAabb },
  times: timesConfig = {},
}: {
  singleItemBBInfo: ItemInPlayAAbbInfo;
  times?: Partial<Xyz>;
}): ItemInPlayAAbbInfo => {
  const timesCompleted = completeTimesXyz(timesConfig);

  const difference = subXyz(blockSizePx, singleItemBB);

  const multipliedAabb = subXyzInPlace(
    productXyz(timesCompleted, blockSizePx),
    difference,
  );

  const multipliedRenderAabb =
    renderAabb === undefined ? undefined : (
      addXyz(multipliedAabb, subXyz(renderAabb, singleItemBB))
    );

  const result: Writable<ItemInPlayAAbbInfo> = { aabb: multipliedAabb };

  if (renderAabb !== undefined) {
    result.renderAabb = multipliedRenderAabb;
  }
  if (renderAabbOffset !== undefined) {
    result.renderAabbOffset = renderAabbOffset;
  }

  return result;
};
