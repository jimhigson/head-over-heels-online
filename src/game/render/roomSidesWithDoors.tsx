import { JsonItem } from "@/model/Item";
import { AnyRoomState } from "@/model/modelTypes";
import { SidesWithDoors } from "./renderFloor";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";

export const roomSidesWithDoors = (room: AnyRoomState): SidesWithDoors => {
  const result: SidesWithDoors = {};

  const doorIter = room.items
    .values()
    .filter((i) => i.type === "doorNear") as ArrayIterator<
    JsonItem<"doorNear">
  >;

  for (const {
    config: { axis },
    position: { x, y },
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
