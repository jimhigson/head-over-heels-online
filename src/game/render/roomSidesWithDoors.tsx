import type { UnknownRoomState } from "@/model/modelTypes";
import type { SidesWithDoors } from "./renderFloor";
import { blockSizePx } from "@/sprites/spritePivots";
import { isItemType } from "@/model/ItemInPlay";

export const roomSidesWithDoors = (room: UnknownRoomState): SidesWithDoors => {
  const result: SidesWithDoors = {};

  const doorIter = Object.values(room.items).filter(isItemType("doorNear"));

  for (const {
    config: { axis },
    state: {
      position: { x, y },
    },
  } of doorIter) {
    if (axis === "x") {
      if (y < 0) {
        result.towards = true;
      } else if (y === room.size.y * blockSizePx.d) {
        result.away = true;
      }
    } else {
      if (x < 0) {
        result.right = true;
      } else if (x === room.size.x * blockSizePx.w) {
        result.left = true;
      }
    }
  }

  return result;
};
