import { iterateRoomJsonItemsWithIds } from "../../model/RoomJson";
import { type EditorRoomJson } from "../editorTypes";

export const roomFloorMinY = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (min, [, item]) => {
      const itemTop = item.position.y;
      return Math.min(min, itemTop);
    },
    Number.POSITIVE_INFINITY,
  );

export const roomFloorMaxY = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (max, [, item]) => {
      const itemBottom = item.position.y + item.config.times.y;
      return Math.max(max, itemBottom);
    },
    Number.NEGATIVE_INFINITY,
  );

export const roomFloorMinX = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (min, [, item]) => {
      const itemTop = item.position.x;
      return Math.min(min, itemTop);
    },
    Number.POSITIVE_INFINITY,
  );

export const roomFloorMaxX = (roomJson: EditorRoomJson): number =>
  iterateRoomJsonItemsWithIds(roomJson.items, "floor").reduce(
    (max, [, item]) => {
      const itemBottom = item.position.x + item.config.times.x;
      return Math.max(max, itemBottom);
    },
    Number.NEGATIVE_INFINITY,
  );
