import type { UnknownJsonItem } from "@/model/json/JsonItem";
import { blockSizePx } from "@/sprites/spritePivots";
import { type Aabb } from "@/utils/vectors/vectors";
import {
  liftBBShortening,
  roomHeightBlocks,
} from "../physics/mechanicsConstants";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.h };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };
export const doubleHeightCharacter: Aabb = {
  ...smallItemAabb,
  z: blockSizePx.h * 2,
};
const wallRenderHeight = 50;

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal
export const wallThicknessBlocks = 1;

export const xAxisWallAabb = {
  x: blockSizePx.w,
  y: blockSizePx.d * wallThicknessBlocks,
  z: roomHeightBlocks * blockSizePx.h,
};
export const xAxisWallRenderAabb = {
  x: xAxisWallAabb.x,
  y: 0,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = {
  x: blockSizePx.w * wallThicknessBlocks,
  y: blockSizePx.d,
  z: roomHeightBlocks * blockSizePx.h,
};
export const yAxisWallRenderAabb = {
  x: 0,
  y: yAxisWallAabb.y,
  z: wallRenderHeight,
};

export const boundingBoxForItem = (
  item: UnknownJsonItem | UnknownItemInPlay,
): { aabb: Aabb; renderAabb?: Aabb } => {
  switch (item.type) {
    case "spring":
    case "portableBlock":
    case "moveableDeadly":
    case "slidingDeadly":
    case "firedDoughnut":
      return { aabb: smallItemAabb };
    case "slidingBlock":
      return item.config.style === "book" ?
          { aabb: largeItemAabb }
        : { aabb: smallItemAabb };
    case "lift":
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z - liftBBShortening },
      };

    case "switch": {
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z },
      };
    }

    case "pickup":
      return item.config.gives === "scroll" ?
          { aabb: { x: 16, y: 4, z: 12 } }
        : { aabb: smallItemAabb };

    case "charles":
      return { aabb: doubleHeightCharacter };

    case "ball":
      return { aabb: { x: 11, y: 11, z: 12 } };
    case "movableBlock":
      return { aabb: largeItemAabb };

    case "block": {
      switch (item.config.style) {
        case "artificial":
        case "organic":
        case "book":
          return { aabb: largeItemAabb };
        case "tower":
          return { aabb: { x: 11, y: 11, z: blockSizePx.h } };
        default:
          throw new Error("unknown block style");
      }
    }
    case "monster": // TODO: make different size for different monsters
      switch (item.config.which) {
        case "skiHead":
        case "bubbleRobot":
        case "cyberman":
        case "elephant":
        case "emperorsGuardian":
        case "monkey":
        case "computerBot":
          return { aabb: doubleHeightCharacter };
        case "helicopterBug":
        case "dalek":
          return { aabb: smallItemAabb };
        default:
          return { aabb: largeItemAabb };
      }

    case "deadlyBlock":
      switch (item.config.style) {
        case "toaster":
          return { aabb: { ...largeItemAabb, y: largeItemAabb.y - 2 } };
        case "spikes":
        case "volcano":
          return { aabb: largeItemAabb };
      }
      break;

    case "bubbles":
      return { aabb: smallItemAabb };

    case "conveyor":
    case "hushPuppy":
    case "teleporter": {
      return { aabb: largeItemAabb };
    }
    case "barrier": {
      return {
        aabb:
          item.config.axis === "y" ?
            { x: 3, y: 15, z: blockSizePx.h }
          : { x: 15, y: 3, z: blockSizePx.h },
      };
    }
    case "wall":
      return item.config.side === "left" || item.config.side === "right" ?
          { aabb: yAxisWallAabb, renderAabb: yAxisWallRenderAabb }
        : { aabb: xAxisWallAabb, renderAabb: xAxisWallRenderAabb };

    default:
      //console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
