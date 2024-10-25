import { JsonItem } from "@/Item";
import { AnyLoadedRoom } from "@/modelTypes";
import { SidesWithDoors } from "./renderFloor";

export const roomSidesWithDoors = (room: AnyLoadedRoom): SidesWithDoors => {
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
      if (y === -0.5) {
        result.towards = true;
      } else if (y === room.size.y) {
        result.away = true;
      }
    } else {
      if (x === -0.5) {
        result.right = true;
      } else if (x === room.size.x) {
        result.left = true;
      }
    }
  }

  return result;
};
