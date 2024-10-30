import { UnknownJsonItem } from "@/model/Item";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { Aabb } from "@/utils/vectors";

const smallItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const playerAabb: Aabb = { x: 13, y: 13, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };

export const boundingBoxForItem = (item: UnknownJsonItem): Aabb | undefined => {
  switch (item.type) {
    case "player":
      return playerAabb;

    case "spring":
    case "portable-block":
      return { x: 11, y: 11, z: blockSizePx.h };
    case "ball":
    case "switch":
    case "pickup":
      return smallItemAabb;
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
        ? { x: 4, y: smallItemAabb.y, z: blockSizePx.h }
        : { x: smallItemAabb.x, y: 4, z: blockSizePx.h };
    }
  }
};
