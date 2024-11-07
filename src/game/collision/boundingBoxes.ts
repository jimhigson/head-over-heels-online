import { UnknownJsonItem } from "@/model/Item";
import { blockSizePx } from "@/sprites/spriteSheet";
import { Aabb } from "@/utils/vectors";

const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.h };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };

const wallRenderHeight = 50;
export const xAxisWallAabb = {
  x: blockSizePx.w,
  y: 0,
  z: 999, // for collisions the bounding box extends waaay up....
};
export const xAxisWallRenderAabb = {
  ...xAxisWallAabb,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = {
  x: 0, //wallThicknessBlocks * blockSizePx.w,
  y: blockSizePx.d,
  z: 999,
};
export const yAxisWallRenderAabb = { ...yAxisWallAabb, z: wallRenderHeight };

// TODO: also support giving renderAabbs
export const boundingBoxForItem = (
  item: UnknownJsonItem,
): { aabb: Aabb; renderAabb?: Aabb } => {
  switch (item.type) {
    case "spring":
    case "portable-block":
    case "lift":
    case "player": // head's nose seems to be rendered outside of his bb in the original
    case "pickup":
      return { aabb: smallItemAabb };

    case "ball":
    case "switch":
    case "fish":
      return { aabb: mediumItemAabb };

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
    case "book":
    case "conveyor":
    case "deadly-block":
    case "hush-puppy":
    case "baddie": // TODO: make different size for different baddies
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
      console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
