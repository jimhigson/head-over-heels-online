import { UnknownJsonItem } from "@/model/Item";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { Aabb } from "@/utils/vectors";

const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.h };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };

export const boundingBoxForItem = (item: UnknownJsonItem): Aabb => {
  switch (item.type) {
    case "spring":
    case "portable-block":
    case "lift":
    case "player": // head's nose seems to be rendered outside of his bb in the original
    case "pickup":
      return smallItemAabb;

    case "ball":
    case "switch":
      return mediumItemAabb;

    case "block":
    case "book":
    case "conveyor":
    case "deadly-block":
    case "hush-puppy":
    case "baddie": // TODO: make different size for different baddies
    case "teleporter": {
      return largeItemAabb;
    }
    case "barrier": {
      return item.config.axis === "y"
        ? { x: 3, y: 15, z: blockSizePx.h }
        : { x: 15, y: 3, z: blockSizePx.h };
    }
    default:
      return mediumItemAabb;
  }
};
