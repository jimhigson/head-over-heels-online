import type { Xyz } from "../utils/vectors/vectors";
import { lengthXyz, originXyz, unitXyz } from "../utils/vectors/vectors";
import type { JsonItemType, JsonItemUnion } from "../model/json/JsonItem";

export const consolidatableJsonItemTypes = [
  "block",
  "deadlyBlock",
  "barrier",
  "conveyor",
  "hushPuppy",
  "wall",
  "teleporter",
  "floor",
  "spikes",
] as const satisfies JsonItemType[];
export type ConsolidatableJsonItemType =
  (typeof consolidatableJsonItemTypes)[number];

export type ConsolidatableJsonItem = Extract<
  JsonItemUnion,
  { type: ConsolidatableJsonItemType }
>;

export const isConsolidatable = (
  jsonItem: JsonItemUnion,
): jsonItem is ConsolidatableJsonItem => {
  return lengthXyz(getConsolidatableVector(jsonItem)) > 0;
};

/**
 * returns an xyz vector of 1 or 0, to mark which axes an item is
 * consolidatable on
 */
export const getConsolidatableVector = (jsonItem: JsonItemUnion): Xyz => {
  switch (jsonItem.type) {
    case "deadlyBlock":
      return unitXyz;

    case "conveyor":
      if (jsonItem.config.disappearing) {
        return originXyz;
      }
      switch (jsonItem.config.direction) {
        case "left":
        case "right":
          return { x: 1, y: 0, z: 0 };
        case "away":
        case "towards":
          return { x: 0, y: 1, z: 0 };
        default:
          jsonItem.config.direction satisfies never;
          throw new Error();
      }

    case "hushPuppy":
      return unitXyz;

    case "teleporter":
      return { x: 1, y: 1, z: 0 };

    case "floor":
    case "spikes":
      return { x: 1, y: 1, z: 0 };

    case "block":
      /*
      dissapearing blocks are now consolidatable, but they load as individual smaller blocks
      if (jsonItem.config.disappearing) {
        return originXyz;
      }*/
      return unitXyz;
    case "barrier":
      if (jsonItem.config.disappearing) {
        return originXyz;
      }
      switch (jsonItem.config.axis) {
        case "x":
          return { x: 1, y: 0, z: 1 };
        case "y":
          return { x: 0, y: 1, z: 1 };
        default:
          jsonItem.config.axis satisfies never;
          throw new Error();
      }
    case "wall":
      switch (jsonItem.config.direction) {
        case "left":
        case "right":
          return { x: 0, y: 1, z: 1 };
        case "away":
        case "towards":
          return { x: 1, y: 0, z: 1 };
        default:
          jsonItem.config satisfies never;
          throw new Error();
      }

    default:
      return originXyz; // 0,0,0 - ie, not consolidatable on any axis
  }
};
