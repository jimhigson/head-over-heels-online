import type { SceneryName } from "../sprites/planets";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";
import type { JsonItemUnion } from "./json/JsonItem";
import type { AnyWallJsonConfig, WallJsonConfig } from "./json/WallJsonConfig";

import { isMultipliedItem } from "../game/physics/itemPredicates";
import { unitXyz, type Xy, type Xyz } from "../utils/vectors/vectors";

/**
 * imply the wall times from json wall items based on the number of tiles, or the
 * explicit 'times' number given
 */

export const wallTimes = (
  config: AnyWallJsonConfig | WallJsonConfig<SceneryName>,
): Partial<Xy> => {
  return {
    x:
      config.direction === "away" ? config.tiles!.length
      : config.direction === "towards" ? config.times?.x
      : 1,
    y:
      config.direction === "left" ? config.tiles!.length
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

/**
 * for a json item, get the times in terms of a complete xyz vector,
 * no matter what type it is - this is a complete function that handles
 * all items
 */
export const getJsonItemTimes = (item: JsonItemUnion): Xyz => {
  const isMultipliedItem = (
    item: JsonItemUnion,
  ): item is JsonItemUnion & { config: { times: Partial<Xyz> } } => {
    type ItemConfigMaybeWithMultiplication = {
      times?: Partial<Xyz> | undefined;
    };

    return (
      (item.config as ItemConfigMaybeWithMultiplication).times !== undefined
    );
  };

  return (
    item.type === "wall" ? completeTimesXyz(wallTimes(item.config))
    : isMultipliedItem(item) ? completeTimesXyz(item.config.times)
    : unitXyz
  );
};

/**
 * for an in-play item, get the times in terms of a complete xyz vector,
 * no matter what type it is - this is a complete function that handles
 * all items
 */
export const getItemInPlayTimes = (item: UnionOfAllItemInPlayTypes): Xyz => {
  const isMultipliedItemInPlay = (
    item: UnionOfAllItemInPlayTypes,
  ): item is UnionOfAllItemInPlayTypes & {
    config: { times: Partial<Xyz> };
  } => {
    type ItemConfigMaybeWithMultiplication = {
      times?: Partial<Xyz> | undefined;
    };

    return (
      (item.config as ItemConfigMaybeWithMultiplication).times !== undefined
    );
  };

  return (
    item.type === "wall" ?
      completeTimesXyz(wallTimes(item.config as WallJsonConfig<SceneryName>))
    : isMultipliedItemInPlay(item) ? completeTimesXyz(item.config.times)
    : unitXyz
  );
};

// convert a times vector to its most efficient format, particularly for the json encoding
// = remove any 1 properties, and returning undefined if all are 1
export const optimiseTimesXyz = (xyz: Xyz): Partial<Xyz> | undefined => {
  const optimised: Partial<Xyz> = {};
  let set = false;

  if (xyz.x !== 1) {
    optimised.x = xyz.x;
    set = true;
  }
  if (xyz.y !== 1) {
    optimised.y = xyz.y;
    set = true;
  }
  if (xyz.z !== 1) {
    optimised.z = xyz.z;
    set = true;
  }

  return set ? optimised : undefined;
};
