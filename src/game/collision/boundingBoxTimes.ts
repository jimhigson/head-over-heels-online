import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { WallJsonConfig } from "../../model/json/WallJsonConfig";
import type { SceneryName } from "../../sprites/planets";
import { blockSizeXyzPx } from "../../sprites/spritePivots";
import type { Xy } from "../../utils/vectors/vectors";
import {
  type Xyz,
  subXyz,
  productXyz,
  unitXyz,
} from "../../utils/vectors/vectors";
import { isMultipliedItem } from "../physics/itemPredicates";

export const multiplyBoundingBox = (
  singleItemBB: Xyz,
  timesConfig: Partial<Xyz> = {},
): Xyz => {
  const times = completeTimesXyz(timesConfig);

  const difference = subXyz(blockSizeXyzPx, singleItemBB);

  return subXyz(productXyz(times, blockSizeXyzPx), difference);
};

/**
 * imply the wall times from json wall items based on the number of tiles, or the
 * explicit 'times' number given
 */
export const wallTimes = (config: WallJsonConfig<SceneryName>): Partial<Xy> => {
  return {
    x:
      config.direction === "away" ? config.tiles.length
      : config.direction === "towards" ? config.times?.x
      : 1,
    y:
      config.direction === "left" ? config.tiles.length
      : config.direction === "right" ? config.times?.y
      : 1,
  };
};

export const itemInPlayTimes = (
  item: UnionOfAllItemInPlayTypes,
): Partial<Xyz> | undefined => {
  return (
    item.type === "wall" ? wallTimes(item.config as WallJsonConfig<SceneryName>)
    : isMultipliedItem(item) ? item.config.times
    : undefined
  );
};

export const completeTimesXyz = (xyz: Partial<Xyz> = unitXyz): Xyz => {
  return {
    x: xyz.x ?? 1,
    y: xyz.y ?? 1,
    z: xyz.z ?? 1,
  };
};
export const completeTimesXy = (xy: Partial<Xyz>): Xy => {
  return {
    x: xy.x ?? 1,
    y: xy.y ?? 1,
  };
};
