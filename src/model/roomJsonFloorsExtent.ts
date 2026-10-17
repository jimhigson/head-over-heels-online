import { type Xyz } from "../utils/vectors/vectors";
import { type AnyRoomJson } from "./RoomJson";
import { roomJsonItemsIterable } from "./RoomJsonItemIterators";

export type RoomJsonFloorsExtent = {
  from: Xyz;
  to: Xyz;
};

/** the extent of a room with no floors: from +infinity to -infinity */
export const nullRoomJsonFloorsExtent: RoomJsonFloorsExtent = {
  from: {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    z: Number.POSITIVE_INFINITY,
  },
  to: {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    z: Number.NEGATIVE_INFINITY,
  },
};

/**
 * For a non-loaded (json) room,
 * get the minimum bounding box that could contain all the floors in the
 * room.
 *
 * @returns undefined if there are no floors in the room
 */
export const roomJsonFloorsExtent = (
  roomJson: AnyRoomJson,
): RoomJsonFloorsExtent | undefined => {
  const res = roomJsonItemsIterable(roomJson)
    .filter((item) => item.type === "floor")
    .reduce((acc: RoomJsonFloorsExtent, item) => {
      const {
        position,
        config: { times },
      } = item;
      return {
        from: {
          x: Math.min(acc.from.x, position.x),
          y: Math.min(acc.from.y, position.y),
          z: Math.min(acc.from.z, position.z),
        },
        to: {
          x: Math.max(acc.to.x, position.x + times.x),
          y: Math.max(acc.to.y, position.y + times.y),
          z: Math.max(acc.to.z, position.z),
        },
      };
    }, nullRoomJsonFloorsExtent);

  if (!isFinite(res.from.x)) {
    // no floors - this has no defined value
    return undefined;
  }
  return res;
};
