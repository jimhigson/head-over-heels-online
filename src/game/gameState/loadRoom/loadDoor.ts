import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { StoodOnBy } from "src/model/StoodOnBy";
import { inHiddenWall, type JsonItem } from "../../../model/json/JsonItem";
import { blockSizePx } from "../../../sprites/spritePivots";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  doorAlongAxis,
  perpendicularAxisXy,
  originXyz,
  addXyz,
  subXyz,
  scaleXyz,
} from "../../../utils/vectors/vectors";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { emptyObject } from "../../../utils/empty";
import { defaultBaseState } from "./itemDefaultStates";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = blockSizePx.h * 2;
export const doorPostHeightBlocks = 4;
export const doorPostHeightPx = blockSizePx.h * doorPostHeightBlocks;

/** how many blocks wide is the door, including frame and doorway? */
export const doorOverallWidthBlocks = 2;
export const doorOverallWidthPx = 2 * blockSizePx.w;

export function* loadDoor<RoomId extends string, RoomItemId extends string>(
  jsonDoor: JsonItem<"door", RoomId, RoomItemId>,
  jsonItemId: RoomItemId,
): Generator<
  ItemTypeUnion<
    "doorFrame" | "doorLegs" | "stopAutowalk" | "portal" | "wall" | "blocker",
    RoomId,
    RoomItemId
  >
> {
  const {
    config: { direction },
    position,
  } = jsonDoor;

  const alongWallAxis = doorAlongAxis(direction);
  const throughDoorAxis = perpendicularAxisXy(alongWallAxis);

  const inHidden = inHiddenWall(jsonDoor);

  // doors on the left/towards side are set back half a square to embed them inside the unseen near-side wall:
  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [throughDoorAxis]: inHidden ? -0.5 : 0,
  };

  // bounding boxes for doors form a long tunnel-like structure longer than the door's rendering
  // that extends out of the room. This helps with collision detection for items entering the room
  // to not have MTVs that snag behind the door
  const doorTunnelLengthBlocks = 1;
  const tunnelSetbackBlocks = {
    [throughDoorAxis]: inHidden ? -doorTunnelLengthBlocks : 0,
  };
  const doorTunnelLengthPx = doorTunnelLengthBlocks * blockSizePx.w;
  // the extra to put onto door frame AABBs to make them longer for the tunnel
  const doorTunnelAabbPx = {
    ...originXyz,
    [throughDoorAxis]: doorTunnelLengthPx,
  };

  /* the graphics for the near post are 9x8 = don't ask me why but 8x8 doesn't match
     the bb very well */
  const nearPostWidthInAxis = 9;
  const farPostWidthInAxis = 8;
  const postWidthInCrossAxis = 8;

  {
    const renderAabb = {
      [alongWallAxis]: farPostWidthInAxis,
      [throughDoorAxis]: postWidthInCrossAxis,
      z: doorPostHeightPx,
    } as Xyz;
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorFrame",
        id: `${jsonItemId}/frameFar` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          part: "far",
        },
        state: {
          ...defaultBaseState(),
          position: blockXyzToFineXyz(
            addXyz(
              position,
              { [alongWallAxis]: 1.5 },
              invisibleWallSetBackBlocks,
              tunnelSetbackBlocks,
            ),
          ),
          stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
        },
        aabb: addXyz(renderAabb, doorTunnelAabbPx),
        renderAabb,
        renderAabbOffset: inHidden ? doorTunnelAabbPx : undefined,
      },
    };
  }
  {
    const renderAabb = {
      [alongWallAxis]: nearPostWidthInAxis,
      [throughDoorAxis]: postWidthInCrossAxis,
      z: doorPostHeightPx,
    } as Xyz;

    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorFrame",
        id: `${jsonItemId}/frameNear` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          part: "near",
        },
        state: {
          ...defaultBaseState(),
          position: blockXyzToFineXyz(
            addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
          ),
          stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
        },

        aabb: addXyz(renderAabb, doorTunnelAabbPx),
        renderAabb,
        renderAabbOffset: inHidden ? doorTunnelAabbPx : undefined,
      },
    };
  }
  /**
   * the bit at the top of the frame between the two door posts
   */
  {
    const renderAabb = {
      [alongWallAxis]:
        2 * blockSizePx.w - nearPostWidthInAxis - farPostWidthInAxis,
      [throughDoorAxis]: postWidthInCrossAxis,
      z: doorPostHeightPx - doorPortalHeight,
    } as Xyz;
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorFrame",
        id: `${jsonItemId}/frameTop` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          part: "top",
        },
        state: {
          ...defaultBaseState(),
          position: addXyz(
            blockXyzToFineXyz(
              addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
            ),
            {
              [alongWallAxis]: nearPostWidthInAxis,
              z: doorPortalHeight,
            },
          ),
          stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
        },
        aabb: addXyz(renderAabb, doorTunnelAabbPx),
        renderAabb,
        renderAabbOffset: inHidden ? doorTunnelAabbPx : undefined,
      },
    };
  }

  // wall above the door, up to the ceiling:
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "blocker",
      id: `${jsonItemId}/blockerAbove` as RoomItemId,
      jsonItemId,
      config: {},
      renders: false,
      state: {
        ...defaultBaseState(),
        position: addXyz(
          blockXyzToFineXyz(addXyz(position, invisibleWallSetBackBlocks)),
          {
            z: doorPostHeightPx,
          },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: blockXyzToFineXyz({
        [alongWallAxis]: 2,
        [throughDoorAxis]: 0.5,
        z: defaultRoomHeightBlocks - doorPostHeightBlocks - position.z,
      }),
      fixedZIndex: nonRenderingItemFixedZIndex,
    },
  };

  // door portal:
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "portal",
      id: `${jsonItemId}/portal` as RoomItemId,
      jsonItemId,
      config: {
        ...jsonDoor.config,
        inHidden,
        relativePoint: blockXyzToFineXyz({
          ...originXyz,
          [throughDoorAxis]: inHidden ? 0.25 : -0.25,
        }),
        direction: unitVectors[direction],
      },
      fixedZIndex: nonRenderingItemFixedZIndex,
      state: {
        ...defaultBaseState(),
        position: addXyz(
          blockXyzToFineXyz(
            addXyz(
              position,

              {
                [throughDoorAxis]: inHidden ? -0.5 : 0.5,
              },
            ),
          ),
          { [alongWallAxis]: nearPostWidthInAxis },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: {
        [alongWallAxis]:
          doorOverallWidthBlocks * blockSizePx.w -
          nearPostWidthInAxis -
          farPostWidthInAxis,
        [throughDoorAxis]: 0,
        z: doorPortalHeight,
      } as Xyz,
    },
  };

  // door legs
  if (position.z !== 0) {
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorLegs",
        id: `${jsonItemId}/legs` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: position.z,
        },
        renders: true,
        shadowCastTexture:
          inHidden ?
            {
              textureId: "shadow.door.floatingThreshold.double.y",
              flipX: alongWallAxis === "x",
            }
          : undefined,
        state: {
          ...defaultBaseState(),
          position: {
            ...blockXyzToFineXyz(
              addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
            ),
            z: 0,
          },
        },
        aabb: addXyz(
          blockXyzToFineXyz({
            [alongWallAxis]: 2,
            [throughDoorAxis]: 0.5,
            z: position.z,
          }),
          doorTunnelAabbPx,
        ),
        renderAabb:
          inHidden ?
            addXyz(
              blockXyzToFineXyz({
                [alongWallAxis]: 2,
                // assume the floating threhold is 0.5 blocks wide
                // in the direction through the door - this is actually
                // slightly low since it is drawn to extend further than
                // the door frame
                [throughDoorAxis]: 0.5,
                z: 0.5,
              }),
            )
          : undefined,
        renderAabbOffset:
          inHidden ?
            addXyz(
              {
                [alongWallAxis]: 0,
                [throughDoorAxis]: 0,
                z: (position.z - 0.5) * blockSizePx.h,
              } as Xyz,
              {
                [throughDoorAxis]: doorTunnelAabbPx[throughDoorAxis],
              },
            )
          : undefined,
        shadowOffset: {
          // bring shadows up to the top of the legs:
          z: position.z * blockSizePx.h,
          [throughDoorAxis]:
            inHidden ? doorTunnelAabbPx[throughDoorAxis] : undefined,
        },
      },
    };
  }
  yield {
    type: "stopAutowalk",
    id: `${jsonItemId}/stopAutowalk` as RoomItemId,
    jsonItemId,
    aabb: blockXyzToFineXyz({
      [alongWallAxis]: 2,
      [throughDoorAxis]: 0,
      z: 2,
    } as Xyz),
    config: {},
    fixedZIndex: nonRenderingItemFixedZIndex,
    state: {
      ...defaultBaseState(),
      position: blockXyzToFineXyz(
        subXyz(position, scaleXyz(unitVectors[direction], 0.75)),
      ),
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
  };
}
