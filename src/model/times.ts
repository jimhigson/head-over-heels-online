import { isMultipliedItem } from "../game/physics/itemPredicates";
import { type SceneryName } from "../sprites/planets";
import {
  alongAxisOfDirectionXy,
  type AxisXy,
  doorAlongAxis,
  unitXyz,
  type Xy,
  type Xyz,
} from "../utils/vectors/vectors";
import {
  type ItemInPlayConfig,
  type UnionOfAllItemInPlayTypes,
} from "./ItemInPlay";
import { type JsonItemUnion } from "./json/JsonItem";
import { type WallJsonConfig } from "./json/WallJsonConfig";

const wallTimesAlong = (alongAxis: AxisXy, tileCount: number): Partial<Xy> => ({
  x: alongAxis === "x" ? tileCount : 1,
  y: alongAxis === "y" ? tileCount : 1,
});

/**
 * the wall times (its length in blocks along each axis) implied by the number of
 * tiles: a wall is one block deep and tiles.length blocks long along its axis
 */
export const wallTimes = (config: WallJsonConfig<SceneryName>): Partial<Xy> =>
  wallTimesAlong(doorAlongAxis(config.direction), config.tiles.length);

/** {@link wallTimes} for an in-play wall, whose direction is a unit vector */
export const wallInPlayTimes = (
  config: ItemInPlayConfig<"wall">,
): Partial<Xy> =>
  wallTimesAlong(alongAxisOfDirectionXy(config.direction), config.tiles.length);

export const itemInPlayTimes = (
  item: UnionOfAllItemInPlayTypes,
): Partial<Xyz> | undefined => {
  return (
    item.type === "wall" ? wallInPlayTimes(item.config)
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
    item.type === "wall" ? completeTimesXyz(wallInPlayTimes(item.config))
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
