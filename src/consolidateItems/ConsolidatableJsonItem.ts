import type { JsonItemType, JsonItemUnion } from "../model/json/JsonItem";
import type { Xyz } from "../utils/vectors/vectors";

import {
  lengthXyz,
  originXyz,
  unitXyz,
  unitXyz_x,
  unitXyz_xy,
  unitXyz_xz,
  unitXyz_y,
  unitXyz_yz,
} from "../utils/vectors/vectors";

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
          return unitXyz_x;
        case "away":
        case "towards":
          return unitXyz_y;
        default:
          jsonItem.config.direction satisfies never;
          throw new Error();
      }

    case "hushPuppy":
      return unitXyz;

    case "teleporter":
      return unitXyz_xy;

    case "floor":
    case "spikes":
      return unitXyz_xy;

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
          return unitXyz_xz;
        case "y":
          return unitXyz_yz;
        default:
          jsonItem.config.axis satisfies never;
          throw new Error();
      }
    case "wall":
      switch (jsonItem.config.direction) {
        case "left":
        case "right":
          return unitXyz_yz;
        case "away":
        case "towards":
          return unitXyz_xz;
        default:
          jsonItem.config satisfies never;
          throw new Error();
      }

    default:
      return originXyz; // 0,0,0 - ie, not consolidatable on any axis
  }
};
