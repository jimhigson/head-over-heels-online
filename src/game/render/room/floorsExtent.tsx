import type { AnyRoomJson } from "../../../model/RoomJson";
import type { Xyz } from "../../../utils/vectors/vectors";

import { iterateRoomJsonItems } from "../../../model/RoomJson";
import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { addXyz, originXyz } from "../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../projections";

export type ItemsProjectedExtents = {
  floors: {
    edgeLeftX: number;
    edgeRightX: number;
    topEdgeY: number;
    bottomEdgeY: number;
  };
  allItems: {
    topEdgeY: number;
  };
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
 *                     -------------------- <-floor *extended* pos/aabb
 *
 * ```
 */
export const floorsRenderExtent = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomState: RoomState<RoomId, RoomItemId>,
): ItemsProjectedExtents => {
  let floorsEdgeLeftX = Number.POSITIVE_INFINITY;
  let floorsEdgeRightX = Number.NEGATIVE_INFINITY;
  let floorsTopEdgeY = Number.POSITIVE_INFINITY;
  let floorsBottomEdgeY = Number.NEGATIVE_INFINITY;
  let allItemsTopEdgeY = Number.POSITIVE_INFINITY;

  for (const item of roomItemsIterable(roomState.items)) {
    if (item.type === "floor") {
      const {
        config: { naturalFootprint },
        state: { position },
        renderAabb,
        renderAabbOffset,
        aabb,
      } = item;

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

      floorsEdgeLeftX = Math.min(floorsEdgeLeftX, floorEdgeLeftX);
      floorsEdgeRightX = Math.max(floorsEdgeRightX, floorEdgeRightX);
      floorsTopEdgeY = Math.min(floorsTopEdgeY, topEdgeY);
      floorsBottomEdgeY = Math.max(floorsBottomEdgeY, frontSide);
    } else {
      // This should be in place so that non-rendering items don't
      // impact scrolling, but is being left to keep scrolling changes
      // out of the current work - a future item should be raised to deal
      // with them separately to keep work isolated to one change at once
      // if (item.fixedZIndex === nonRenderingItemFixedZIndex) {
      //   continue;
      // }

      // any non-floor item
      // natural position:
      const topEdgeY = projectWorldXyzToScreenXy(
        addXyz(
          item.state.position,
          item.renderAabb ?? item.aabb ?? originXyz,
          item.renderAabbOffset ?? originXyz,
        ),
      ).y;

      allItemsTopEdgeY = Math.min(allItemsTopEdgeY, topEdgeY);
    }
  }

  return {
    floors: {
      edgeLeftX: floorsEdgeLeftX,
      edgeRightX: floorsEdgeRightX,
      topEdgeY: floorsTopEdgeY,
      bottomEdgeY: floorsBottomEdgeY,
    },
    allItems: {
      topEdgeY: allItemsTopEdgeY,
    },
  };
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
