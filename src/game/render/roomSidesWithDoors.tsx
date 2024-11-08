import { UnknownRoomState } from "@/model/modelTypes";
import { SidesWithDoors } from "./renderFloor";
import { blockSizePx } from "@/sprites/spriteSheet";
import { isItemType } from "@/model/ItemInPlay";

export const roomSidesWithDoors = (room: UnknownRoomState): SidesWithDoors => {
  const result: SidesWithDoors = {};

  const doorIter = room.items.values().filter(isItemType("doorNear"));

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
