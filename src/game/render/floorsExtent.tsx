import type { AnyRoomJson } from "../../model/RoomJson";
import { iterateRoomJsonItems } from "../../model/RoomJson";
import { iterateRoomItems, type RoomState } from "../../model/RoomState";
import type { Xyz } from "../../utils/vectors/vectors";
import { addXyz, originXyz } from "../../utils/vectors/vectors";
import { isFloor } from "../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "./projections";

type FloorsRenderExtent = {
  edgeLeftX: number;
  edgeRightX: number;
  topEdgeY: number;
  bottomEdgeY: number;
};

const nullFloorsRenderExtent: FloorsRenderExtent = {
  edgeLeftX: Number.POSITIVE_INFINITY,
  edgeRightX: Number.NEGATIVE_INFINITY,
  topEdgeY: Number.POSITIVE_INFINITY,
  bottomEdgeY: Number.NEGATIVE_INFINITY,
};
/**
 * get projected rectangle for the floor(s) of a room, used for room scrolling
 * like:
 * ```
 *                            floor natural pos/aabb
 *                     ---------------------
 *                     |                   |
 *  floor natural pos/aabb                 | floor natural pos/aabb
 *                     |                   |
 *                     |                   |
 *                     ---------------------
 *                            floor *extended* pos/aabb
 * ```
 */
export const floorsRenderExtent = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomState: RoomState<RoomId, RoomItemId>,
): FloorsRenderExtent => {
  return iterateRoomItems(roomState.items)
    .filter(isFloor)
    .reduce(
      (
        ac: FloorsRenderExtent,
        {
          config: { naturalFootprint },
          state: { position },
          renderAabb,
          renderAabbOffset,
          aabb,
        },
      ): FloorsRenderExtent => {
        // natural position:
        const floorEdgeLeftX = projectWorldXyzToScreenXy(
          addXyz(naturalFootprint.position, {
            x: naturalFootprint.aabb.x,
            z: naturalFootprint.aabb.z,
          }),
        ).x;

        // natural position:
        const floorEdgeRightX = projectWorldXyzToScreenXy(
          addXyz(naturalFootprint.position, {
            y: naturalFootprint.aabb.y,
            z: naturalFootprint.aabb.z,
          }),
        ).x;

        // natural position:
        const topEdgeY = projectWorldXyzToScreenXy(
          addXyz(naturalFootprint.position, naturalFootprint.aabb),
        ).y;

        // extended position:
        const frontSide = projectWorldXyzToScreenXy(
          addXyz(position, renderAabbOffset ?? originXyz, {
            z: (renderAabb ?? aabb).z,
          }),
        ).y;

        return {
          edgeLeftX: Math.min(ac.edgeLeftX, floorEdgeLeftX),
          edgeRightX: Math.max(ac.edgeRightX, floorEdgeRightX),
          topEdgeY: Math.min(ac.topEdgeY, topEdgeY),
          bottomEdgeY: Math.max(ac.bottomEdgeY, frontSide),
        };
      },
      nullFloorsRenderExtent,
    );
};

export type RoomJsonFloorsExtent = {
  from: Xyz;
  to: Xyz;
};

const nullRoomJsonFloorsExtent: RoomJsonFloorsExtent = {
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
  const res = iterateRoomJsonItems(roomJson)
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
