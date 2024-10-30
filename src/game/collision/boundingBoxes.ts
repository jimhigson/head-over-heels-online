import { UnknownJsonItem } from "@/model/Item";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { Aabb } from "@/utils/vectors";

const smallItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const playerAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
const largeItemAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };

export const boundingBoxForItem = (item: UnknownJsonItem): Aabb | undefined => {
  switch (item.type) {
    case "player":
      return playerAabb;
    case "teleporter": {
      return largeItemAabb;
    }
    case "barrier": {
      return { x: 4, y: smallItemAabb.y, z: blockSizePx.h };
    }
  }
};
