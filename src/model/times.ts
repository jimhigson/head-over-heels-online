import type { SceneryName } from "../sprites/planets";
import {
  type AxisXy,
  doorAlongAxis,
  unitXyz,
  type Xy,
  type Xyz,
} from "../utils/vectors/vectors";
import type { JsonItemUnion } from "./json/JsonItem";
import type { WallJsonConfig } from "./json/WallJsonConfig";

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

/**
 * the in-play config of an item that has nothing configured but a one block times
 */
export const unitTimesConfig: { readonly times: Xyz } = Object.freeze({
  times: unitXyz,
});

export const completeTimesXyz = (xyz: Partial<Xyz> = unitXyz): Xyz => {
  return {
    x: xyz.x ?? 1,
    y: xyz.y ?? 1,
    z: xyz.z ?? 1,
  };
};
export const completeTimesXy = (xy: Partial<Xyz> = unitXyz): Xy => {
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
  type ItemConfigMaybeWithMultiplication = {
    times?: Partial<Xyz> | undefined;
  };

  return completeTimesXyz(
    item.type === "wall" ?
      wallTimes(item.config)
    : (item.config as ItemConfigMaybeWithMultiplication).times,
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
