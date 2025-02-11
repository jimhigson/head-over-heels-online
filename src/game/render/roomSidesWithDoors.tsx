import type { AnyRoomJson } from "../../model/RoomJson";
import { doorAlongAxis } from "../../utils/vectors/vectors";
import type { SidesWithDoors } from "./itemAppearances/floorAppearance/floorAppearance";

export const roomSidesWithDoors = (room: AnyRoomJson): SidesWithDoors => {
  const result: SidesWithDoors = {};

  const doorIter = Object.values(room.items).filter((i) => i.type === "door");

  for (const {
    config: { direction },
    position: { x, y },
  } of doorIter) {
    const axis = doorAlongAxis(direction);

    if (axis === "x") {
      if (y === 0) {
        result.towards = true;
      } else if (y === room.size.y) {
        result.away = true;
      }
    } else {
      if (x === 0) {
        result.right = true;
      } else if (x === room.size.x) {
        result.left = true;
      }
    }
  }

  return result;
};
