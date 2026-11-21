import { keys } from "../utils/entries";
import type { Xy } from "../utils/vectors/vectors";
import { isWholeRoomSubRooms, type RoomJson } from "./RoomJson";
import { roomWallBounds, type WallBounds } from "./roomWallBounds";

/**
 * the areas (in blocks) a room's floor covers in x and y: one per sub-room,
 * or just the whole room's for a room not divided into sub-rooms
 */
export const roomFootprints = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomJson<RoomId, RoomItemId>,
): WallBounds[] => {
  const subRooms = room.meta?.subRooms;
  return subRooms === undefined || isWholeRoomSubRooms(subRooms) ?
      [roomWallBounds(room, "*")]
    : keys(subRooms).map((subRoomId) => roomWallBounds(room, subRoomId));
};

/**
 * whether a point is in (or on the edge of) any of the footprints
 */
export const isXyInFootprints = (
  footprints: WallBounds[],
  { x, y }: Xy,
): boolean =>
  footprints.some(
    ({ from, to }) => x >= from.x && x <= to.x && y >= from.y && y <= to.y,
  );

const overlapLength = (
  aFrom: number,
  aTo: number,
  bFrom: number,
  bTo: number,
) => Math.max(0, Math.min(aTo, bTo) - Math.max(aFrom, bFrom));

/**
 * whether a rectangle lies wholly within the footprints, taken together - it
 * may straddle several, so long as no part of it is outside all of them. The
 * footprints must not overlap each other, as a room's sub-rooms don't
 */
export const isXyRectInFootprints = (
  footprints: WallBounds[],
  rectFrom: Xy,
  rectTo: Xy,
): boolean => {
  const coveredArea = footprints.reduce(
    (area, { from, to }) =>
      area +
      overlapLength(rectFrom.x, rectTo.x, from.x, to.x) *
        overlapLength(rectFrom.y, rectTo.y, from.y, to.y),
    0,
  );
  const rectArea = (rectTo.x - rectFrom.x) * (rectTo.y - rectFrom.y);
  return coveredArea >= rectArea;
};
