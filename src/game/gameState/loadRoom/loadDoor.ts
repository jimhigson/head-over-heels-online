import type { StoodOnBy } from "src/model/StoodOnBy";

import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { Xyz } from "../../../utils/vectors/vectors";

import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { inHiddenWall, type JsonItem } from "../../../model/json/JsonItem";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import { pick } from "../../../utils/pick";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import { veryHighZ } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";
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

// to be true to the original game, this should be 0.75 blocks, which is
// enough to be completely outside the doorframe, and to fall off the ledge
// of the door (if z>0)
const autoWalkDistanceBlocks = 0.5;
// the stop autowalk isn't just a plane, in case the player gets pushed
// through a long way in one frame, like an item being introduced to
// the room, like the other player walking through the door
const stopAutoWalkDepthBlocks = 2;

export function* loadDoor<RoomId extends string, RoomItemId extends string>(
  jsonDoor: JsonItem<"door", RoomId, RoomItemId>,
  jsonItemId: RoomItemId,
): Generator<
  ItemTypeUnion<
    "blocker" | "doorFrame" | "doorLegs" | "portal" | "stopAutowalk" | "wall",
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
  const postWidthInThroughDoorAxis = 8;

  {
    const renderAabb = {
      [alongWallAxis]: farPostWidthInAxis,
      [throughDoorAxis]: postWidthInThroughDoorAxis,
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
      [throughDoorAxis]: postWidthInThroughDoorAxis,
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
      [throughDoorAxis]: postWidthInThroughDoorAxis,
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
          blockXyzToFineXyz(
            addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
          ),
          {
            z: doorPostHeightPx,
          },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: addXyz(
        blockXyzToFineXyz({
          [alongWallAxis]: 2,
          [throughDoorAxis]: doorTunnelLengthBlocks,
        }),
        { [throughDoorAxis]: postWidthInThroughDoorAxis, z: veryHighZ },
      ),
      // helps the editor to know not to consider a hover on this:
      renderAabb: originXyz,
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
        ...pick(jsonDoor.config, "toRoom", "toDoor"),
        inHidden,
        relativePoint: blockXyzToFineXyz({
          ...originXyz,
          // the relative point gets put halfway through the doorframe
          [throughDoorAxis]: inHidden ? doorTunnelLengthBlocks + 0.25 : -0.25,
        }),
        direction: unitVectors[direction],
      },
      fixedZIndex: nonRenderingItemFixedZIndex,
      state: {
        ...defaultBaseState(),
        position: addXyz(
          blockXyzToFineXyz(
            addXyz(position, {
              // set the portal back to the 'back' side of the door (looking from
              // inside the room) so the character has to walk all the way to the
              // other side of the frame to touch it
              [throughDoorAxis]: inHidden ? -0.5 - doorTunnelLengthBlocks : 0.5,
            }),
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
        // portals get thickness for the same reason walls do -
        // it makes it harder to push items such as enemies through
        // them during collisions with a lot of overlap - ie, if items
        // spawn on top of each other
        [throughDoorAxis]: doorTunnelLengthPx,
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
        castsShadowWhileStoodOn: inHidden,
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
    ...defaultItemProperties,
    type: "stopAutowalk",
    id: `${jsonItemId}/stopAutowalk` as RoomItemId,
    jsonItemId,
    aabb: blockXyzToFineXyz({
      [alongWallAxis]: 2,
      [throughDoorAxis]: stopAutoWalkDepthBlocks,
      z: 2,
    } as Xyz),
    config: {},
    fixedZIndex: nonRenderingItemFixedZIndex,
    state: {
      ...defaultBaseState(),
      position: blockXyzToFineXyz(
        subXyz(
          position,
          scaleXyz(unitVectors[direction], autoWalkDistanceBlocks),
          inHidden ? originXyz : { [throughDoorAxis]: stopAutoWalkDepthBlocks },
        ),
      ),
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
  };
}
