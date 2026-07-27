import {
  type AnyRoomJson,
  roomJsonItemsIterable,
} from "../../../model/RoomJson";
import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { cameraAngleBase } from "../../../utils/vectors/cameraAngleVectors";
import {
  addXyz,
  originXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import {
  blockSizePx,
  wallFaceHeightPx,
} from "../../physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../projections";
import { makeItemRenderBoxAtCameraAngle } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  effectiveFixedZIndex,
  nonRenderingItemFixedZIndex,
} from "../sortZ/fixedZIndexes";

/**
 * Just a fudge to keep scrolling in the same place after wall render boxes got a bit taller.
 * Probably remove it later.
 */
const wallLayoutHeight = wallFaceHeightPx + 2;

export type ItemsProjectedExtents = {
  floors: {
    edgeLeftX: number;
    edgeRightX: number;
    topEdgeY: number;
    bottomEdgeY: number;
    /**
     * the screen x of the camera-near corner of the room's nominal bounds -
     * the box from the origin to the floors' natural extents (ignoring the
     * camera-dependent doorway extensions). At the base angle the near corner
     * of that box is the origin, so this is exactly 0; positioning heuristics
     * that historically assumed the near corner projects at x=0 use this so
     * they hold unchanged at the base angle and correctly at every other
     */
    nearCornerX: number;
  };
  allItems: {
    topEdgeY: number;
  };
};

/**
 * get the projected extents of a room's rendering: the floors' rectangle
 * (left/right/bottom - used for room scrolling) plus the highest drawn point
 * of any item in the room (the rendering's top edge). Floor rectangle like:
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
export const roomRenderExtent = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomState: RoomState<RoomId, RoomItemId>,
  spritesheetMeta: SpritesheetMetadata,
  cameraAngle: Xy = cameraAngleBase,
): ItemsProjectedExtents => {
  let floorsEdgeLeftX = Number.POSITIVE_INFINITY;
  let floorsEdgeRightX = Number.NEGATIVE_INFINITY;
  let floorsTopEdgeY = Number.POSITIVE_INFINITY;
  let floorsBottomEdgeY = Number.NEGATIVE_INFINITY;
  let floorsNaturalMaxX = 0;
  let floorsNaturalMaxY = 0;
  let allItemsTopEdgeY = Number.POSITIVE_INFINITY;

  for (const item of roomItemsIterable(roomState.items)) {
    if (item.type === "floor") {
      const {
        config: { naturalFootprint },
        state: { position },
        aabb,
      } = item;
      const renderBox = makeItemRenderBoxAtCameraAngle(
        item,
        cameraAngle,
        spritesheetMeta,
      );

      floorsNaturalMaxX = Math.max(
        floorsNaturalMaxX,
        naturalFootprint.position.x + naturalFootprint.aabb.x,
      );
      floorsNaturalMaxY = Math.max(
        floorsNaturalMaxY,
        naturalFootprint.position.y + naturalFootprint.aabb.y,
      );

      // the floor's horizontal span and its far (top) edge come from the top
      // corners of its footprint; which corner is leftmost / rightmost / furthest
      // depends on the camera angle, so project them all:
      for (const dx of [0, naturalFootprint.aabb.x]) {
        for (const dy of [0, naturalFootprint.aabb.y]) {
          const { x, y } = projectWorldXyzToScreenXy(
            addXyz(naturalFootprint.position, {
              x: dx,
              y: dy,
              z: naturalFootprint.aabb.z,
            }),
            cameraAngle,
          );
          floorsEdgeLeftX = Math.min(floorsEdgeLeftX, x);
          floorsEdgeRightX = Math.max(floorsEdgeRightX, x);
          floorsTopEdgeY = Math.min(floorsTopEdgeY, y);
        }
      }

      // the near (front/bottom) edge is the lowest of the extended render box's
      // surface-level corners - which one is lowest also depends on the angle:
      const extendedPosition = addXyz(
        position,
        renderBox?.renderAabbOffset ?? originXyz,
      );
      const extendedAabb = renderBox?.renderAabb ?? aabb;
      for (const dx of [0, extendedAabb.x]) {
        for (const dy of [0, extendedAabb.y]) {
          const { y } = projectWorldXyzToScreenXy(
            addXyz(extendedPosition, { x: dx, y: dy, z: extendedAabb.z }),
            cameraAngle,
          );
          floorsBottomEdgeY = Math.max(floorsBottomEdgeY, y);
        }
      }
    } else {
      // This should be in place so that non-rendering items don't
      // impact scrolling, but is being left to keep scrolling changes
      // out of the current work - a future item should be raised to deal
      // with them separately to keep work isolated to one change at once
      if (
        effectiveFixedZIndex(item, cameraAngle) === nonRenderingItemFixedZIndex
      ) {
        continue;
      }

      // any non-floor item: its highest point on screen comes from the top
      // corners of its render box; which is highest depends on the camera angle:
      const itemRenderBox = makeItemRenderBoxAtCameraAngle(
        item,
        cameraAngle,
        spritesheetMeta,
      );
      const itemPosition = addXyz(
        item.type === "lift" ?
          // lifts are a special case - use the top of their travel instead of
          // their starting position for rendering height estimation
          {
            ...item.state.position,
            z: item.config.top * blockSizePx.z,
          }
        : item.state.position,
        itemRenderBox?.renderAabbOffset ?? originXyz,
      );
      const itemAabb = itemRenderBox?.renderAabb ?? item.aabb ?? originXyz;
      // walls' render boxes extend above their nominal face to cover art
      // overdraw (the tallest tile tops); for layout estimation treat walls
      // as their layout height, so the overdraw doesn't read as empty space
      // pushing the room down the screen:
      const itemTopZ = item.type === "wall" ? wallLayoutHeight : itemAabb.z;
      for (const dx of [0, itemAabb.x]) {
        for (const dy of [0, itemAabb.y]) {
          const { y } = projectWorldXyzToScreenXy(
            addXyz(itemPosition, { x: dx, y: dy, z: itemTopZ }),
            cameraAngle,
          );
          allItemsTopEdgeY = Math.min(allItemsTopEdgeY, y);
        }
      }
    }
  }

  // the camera-near corner of the nominal room box [origin..naturalMax]: the
  // origin at the base angle (projecting to exactly 0), the corner on each
  // camera-reversed axis otherwise:
  const nearCornerX = projectWorldXyzToScreenXy(
    {
      x: cameraAngle.x + cameraAngle.y < 0 ? floorsNaturalMaxX : 0,
      y: cameraAngle.x - cameraAngle.y < 0 ? floorsNaturalMaxY : 0,
      z: 0,
    },
    cameraAngle,
  ).x;

  return {
    floors: {
      edgeLeftX: floorsEdgeLeftX,
      edgeRightX: floorsEdgeRightX,
      topEdgeY: floorsTopEdgeY,
      bottomEdgeY: floorsBottomEdgeY,
      nearCornerX,
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
