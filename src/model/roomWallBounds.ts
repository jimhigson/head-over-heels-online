import { type Xy } from "../utils/vectors/vectors";
import { type RoomJson, subRoomById } from "./RoomJson";
import {
  nullRoomJsonFloorsExtent,
  roomJsonFloorsExtent,
} from "./roomJsonFloorsExtent";

export type WallBounds = { from: Xy; to: Xy };

// a room with no floor has no floor extent; measure it from the origin
const finiteOrZero = (n: number) => (Number.isFinite(n) ? n : 0);

/** where a (sub-)room's walls are: the sub-room's extent, or the whole floor's */
export const roomWallBounds = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomJson<RoomId, RoomItemId>,
  subRoomId: string,
): WallBounds => {
  const subRoom = subRoomById(room, subRoomId);
  if (subRoom) {
    return subRoom.physicalPosition;
  }
  const { from, to } = roomJsonFloorsExtent(room) ?? nullRoomJsonFloorsExtent;
  return {
    from: { x: finiteOrZero(from.x), y: finiteOrZero(from.y) },
    to: { x: to.x, y: to.y },
  };
};
