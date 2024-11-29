import type { UnknownJsonItem } from "@/model/json/JsonItem";
import { blockSizePx } from "@/sprites/spritePivots";
import { type Aabb } from "@/utils/vectors/vectors";
import { liftBBShortening } from "../physics/mechanicsConstants";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.h };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };
const doubleHeighCharacter: Aabb = { ...smallItemAabb, z: blockSizePx.h * 2 };
const wallRenderHeight = 50;

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal
const wallHeight = 999;

export const xAxisWallAabb = {
  x: blockSizePx.w,
  y: 0,
  z: wallHeight,
};
export const xAxisWallRenderAabb = {
  ...xAxisWallAabb,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = {
  x: 0, //wallThicknessBlocks * blockSizePx.w,
  y: blockSizePx.d,
  z: wallHeight,
};
export const yAxisWallRenderAabb = { ...yAxisWallAabb, z: wallRenderHeight };

// TODO: also support giving renderAabbs
export const boundingBoxForItem = (
  item: UnknownJsonItem,
): { aabb: Aabb; renderAabb?: Aabb } => {
  switch (item.type) {
    case "spring":
    case "portableBlock":
    case "pickup":
    case "player": // head's nose seems to be rendered outside of his bb in the original
      return { aabb: smallItemAabb };
    case "lift":
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z - liftBBShortening },
      };

    case "switch": {
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z - 2 },
      };
    }

    case "charles":
      return { aabb: doubleHeighCharacter };

    case "ball":
    case "fish":
      return { aabb: mediumItemAabb };

    case "movableBlock":
      return { aabb: largeItemAabb };

    case "block": {
      switch (item.config.style) {
        case "artificial":
        case "organic":
          return { aabb: largeItemAabb };
        case "tower":
          return { aabb: { x: 11, y: 11, z: blockSizePx.h } };
        default:
          throw new Error("unknown block style");
      }
    }
    case "baddie": // TODO: make different size for different baddies
      switch (item.config.which) {
        case "american-football-head":
        case "bubble-robot":
        case "cyberman":
        case "elephant":
        case "flying-ball":
        case "computer-bot":
          return { aabb: doubleHeighCharacter };
        case "helicopter-bug":
        case "dalek":
          return { aabb: smallItemAabb };
        default:
          return { aabb: largeItemAabb };
      }
    case "deadlyBlock":
      switch (item.config.style) {
        case "puck":
          return { aabb: smallItemAabb };
        default:
          return { aabb: largeItemAabb };
      }
    case "book":
    case "conveyor":
    case "hushPuppy":
    case "teleporter": {
      return { aabb: largeItemAabb };
    }
    case "barrier": {
      return {
        aabb:
          item.config.axis === "y" ?
            { x: 3, y: 15, z: blockSizePx.h - 1 }
          : { x: 15, y: 3, z: blockSizePx.h - 1 },
      };
    }
    case "wall":
      return item.config.side === "left" || item.config.side === "right" ?
          { aabb: yAxisWallAabb, renderAabb: yAxisWallRenderAabb }
        : { aabb: xAxisWallAabb, renderAabb: xAxisWallRenderAabb };

    default:
      console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
