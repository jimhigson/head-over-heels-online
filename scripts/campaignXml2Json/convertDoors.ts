import { Direction } from "../../src/utils/vectors";
import { Xml2JsonRoom } from "./readToJson";

export type SidesWithDoors = Partial<Record<Direction, true>>;
export const xmlRoomSidesWithDoors = (room: Xml2JsonRoom): SidesWithDoors => {
  const result: SidesWithDoors = {};

  const doorIter = room.items.values().filter((i) => i.class === "door");

  for (const { x, y, kind } of doorIter) {
    if (kind.endsWith("-east") || kind.endsWith("-west")) {
      if (parseInt(y) === 0) {
        result.away = true;
      } else if (parseInt(y) === parseInt(room.yTiles) - 1) {
        result.towards = true;
      }
    } else {
      if (parseInt(x) === 0) {
        result.left = true;
      } else if (parseInt(x) === parseInt(room.xTiles) - 1) {
        result.right = true;
      }
    }
  }

  return result;
};
