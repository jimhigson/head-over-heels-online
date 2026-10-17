import { type RoomJson } from "./RoomJson";
import {
  nullRoomJsonFloorsExtent,
  roomJsonFloorsExtent,
} from "./roomJsonFloorsExtent";

export type FloorBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

/** the x/y extent of a room's floors; infinite (min > max) if it has none */
export const roomFloorBounds = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomJson<RoomId, RoomItemId>,
): FloorBounds => {
  const { from, to } = roomJsonFloorsExtent(room) ?? nullRoomJsonFloorsExtent;
  return { minX: from.x, maxX: to.x, minY: from.y, maxY: to.y };
};
