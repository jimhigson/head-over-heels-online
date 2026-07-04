import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type JsonItem } from "../../../model/json/JsonItem";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { emptyObject } from "../../../utils/empty";
import { pick } from "../../../utils/pick";
import { axisProjectsReversed } from "../../../utils/vectors/rotateXy";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
  rotateAxisXyByCameraAngle,
  scaleXyz,
  subXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { blockSizePx, veryHighZ } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { floorZAtPosition } from "./floorZAtPosition";
import { isDoorInHiddenWall } from "./isDoorInHiddenWall";
import { defaultBaseState } from "./itemDefaultStates";

const shadowDoorFloatingThresholdY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.door.floatingThreshold.double.y",
});

const shadowDoorFrameTopY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.doorFrame.top.y",
});

const shadowDoorFrameTopX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.doorFrame.top.y",
  flipX: true,
});

const doorFrameTopNoCastShadowOn = ["doorLegs" as const];

const shadowDoorFloatingThresholdX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.door.floatingThreshold.double.y",
  flipX: true,
});

/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
const doorPortalHeight = blockSizePx.z * 2;
const doorPostHeightBlocks = 4;
export const doorPostHeightPx = blockSizePx.z * doorPostHeightBlocks;

/** how many blocks wide is the door, including frame and doorway? */
const doorOverallWidthBlocks = 2;
export const doorOverallWidthPx = 2 * blockSizePx.x;

// to be true to the original game, this should be 0.75 blocks, which is
// enough to be completely outside the doorframe, and to fall off the ledge
// of the door (if z>0)
const autoWalkDistanceBlocks = 0.5;
// the stop autowalk isn't just a plane, in case the player gets pushed
// through a long way in one frame, like an item being introduced to
// the room, like the other player walking through the door
const stopAutoWalkDepthBlocks = 0.5;

export function* loadDoor<RoomId extends string, RoomItemId extends string>(
  jsonDoor: JsonItem<"door", RoomId, RoomItemId>,
  jsonItemId: RoomItemId,
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
  cameraAngle: Xy,
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

  const inHidden = isDoorInHiddenWall(jsonDoor, directionalIndex, cameraAngle);
  const floorZ = floorZAtPosition(position, directionalIndex) ?? 0;
  const legHeight = position.z - floorZ;

  /**
   * the (world-space) sign of the door's out-of-room direction along
   * throughDoorAxis - fixed by the door's direction, regardless of camera:
   * towards/right doors lead out in the negative direction
   */
  const outSign = unitVectors[direction][throughDoorAxis];
  const outIsNegative = outSign < 0;

  // a door part's box must sit with its room-side face exactly on the wall
  // plane (flush with the walls either side). Boxes extend positive from their
  // position, so towards/right doors (which protrude out of the room in the
  // negative direction) need their position pulled out by the frame's depth on
  // top of the tunnel shift; away/left doors' positions already sit on the wall
  // plane. This is world geometry, fixed regardless of the camera angle:
  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [throughDoorAxis]: outIsNegative ? -0.5 : 0,
  };

  // bounding boxes for doors form a long tunnel-like structure longer than the door's rendering
  // that extends out of the room. This helps with collision detection for items entering the room
  // to not have MTVs that snag behind the door
  const doorTunnelLengthBlocks = 1;
  // aabbs extend positive from their position, so when the tunnel protrudes in
  // the negative (out-of-room) direction the position shifts out by the tunnel
  // length, and the rendering is offset back to the room end of the tunnel:
  const tunnelSetbackBlocks = {
    [throughDoorAxis]: outIsNegative ? -doorTunnelLengthBlocks : 0,
  };
  const doorTunnelLengthPx = doorTunnelLengthBlocks * blockSizePx.x;
  // the extra to put onto door frame AABBs to make them longer for the tunnel
  const doorTunnelAabbPx = {
    ...originXyz,
    [throughDoorAxis]: doorTunnelLengthPx,
  };

  /* the graphics draw the camera-nearer post 9px wide along the wall and the
     farther post 8px - an artwork quirk that can't be changed, so the geometry
     deliberately follows it. Which of the two posts is camera-nearer swaps
     when the along-wall axis projects reversed on screen: */
  const alongReversed = axisProjectsReversed(alongWallAxis, cameraAngle);
  const nearPostWidthInAxis = alongReversed ? 8 : 9;
  const farPostWidthInAxis = alongReversed ? 9 : 8;
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
        // doorframes never animate, so the hash (only used to de-synchronise animations) is irrelevant:
        hash: 0,
        id: `${jsonItemId}/frameFar` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          part: "far",
        },
        state: {
          ...defaultBaseState(),
          // the far post ends flush with the door's overall (2-block) span,
          // so its position follows from its own (camera-dependent) width:
          position: addXyz(
            blockXyzToFineXyz(
              addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
            ),
            { [alongWallAxis]: doorOverallWidthPx - farPostWidthInAxis },
          ),
          stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
        },
        aabb: addXyz(renderAabb, doorTunnelAabbPx),
        renderAabb,
        renderAabbOffset: outIsNegative ? doorTunnelAabbPx : undefined,
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
        hash: 0,
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
        renderAabbOffset: outIsNegative ? doorTunnelAabbPx : undefined,
      },
    };
  }
  /**
   * the bit at the top of the frame between the two door posts
   */
  {
    const renderAabb = {
      [alongWallAxis]:
        2 * blockSizePx.x - nearPostWidthInAxis - farPostWidthInAxis,
      [throughDoorAxis]: postWidthInThroughDoorAxis,
      z: doorPostHeightPx - doorPortalHeight,
    } as Xyz;
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorFrame",
        hash: 0,
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
              // the top's art lines up with the camera-nearer (9px) post's
              // art, so it keeps the same vector from that post's origin as
              // at the base angle - flipped along the wall when the near
              // post is at the door's far end:
              [alongWallAxis]: nearPostWidthInAxis + (alongReversed ? 1 : -1),
              z: doorPortalHeight,
            },
          ),
          stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
        },
        aabb: addXyz(renderAabb, doorTunnelAabbPx, { [alongWallAxis]: 1 }),
        renderAabb,
        // the drawn box is the gap between the posts, which sits on the other
        // side of the position's 1px overlap with the near post:
        renderAabbOffset: addXyz(outIsNegative ? doorTunnelAabbPx : originXyz, {
          [alongWallAxis]: alongReversed ? -1 : 1,
        }),
        shadowCastTexture:
          inHidden ? undefined
          : rotateAxisXyByCameraAngle(alongWallAxis, cameraAngle) === "x" ?
            shadowDoorFrameTopX
          : shadowDoorFrameTopY,
        shadowOffset: {
          [alongWallAxis]: -1,
          [throughDoorAxis]: 1,
        },
        // ie, if character jumps while stood in a doorway, the top of the doorframe is now 'standing' on them:
        castsShadowWhileStoodOn: true,
        noShadowCastOn: inHidden ? undefined : doorFrameTopNoCastShadowOn,
      },
    };
  }

  // wall above the door, up to the ceiling:
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "blocker",
      hash: 0,
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
      hash: 0,
      id: `${jsonItemId}/portal` as RoomItemId,
      jsonItemId,
      config: {
        ...pick(jsonDoor.config, "toRoom", "toDoor"),
        inHidden,
        relativePoint: blockXyzToFineXyz({
          ...originXyz,
          // the relative point gets put halfway through the doorframe
          [throughDoorAxis]:
            outIsNegative ? doorTunnelLengthBlocks + 0.25 : -0.25,
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
              // other side of the frame to touch it. The tunnel term is fixed by
              // the door's world direction; the embed term follows the
              // (camera-relative) hidden wall:
              [throughDoorAxis]:
                (outIsNegative ? -doorTunnelLengthBlocks : 0.5) +
                invisibleWallSetBackBlocks[throughDoorAxis],
            }),
          ),
          { [alongWallAxis]: nearPostWidthInAxis },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: {
        [alongWallAxis]:
          doorOverallWidthBlocks * blockSizePx.x -
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
  if (legHeight !== 0) {
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorLegs",
        hash: 0,
        id: `${jsonItemId}/legs` as RoomItemId,
        jsonItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: legHeight,
        },
        renders: true,
        shadowCastTexture:
          inHidden ?
            rotateAxisXyByCameraAngle(alongWallAxis, cameraAngle) === "x" ?
              shadowDoorFloatingThresholdX
            : shadowDoorFloatingThresholdY
          : undefined,
        castsShadowWhileStoodOn: inHidden,
        state: {
          ...defaultBaseState(),
          position: {
            ...blockXyzToFineXyz(
              addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
            ),
            z: floorZ * blockSizePx.z,
          },
        },
        aabb: addXyz(
          blockXyzToFineXyz({
            [alongWallAxis]: 2,
            [throughDoorAxis]: 0.5,
            z: legHeight,
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
                z: (legHeight - 0.5) * blockSizePx.z,
              } as Xyz,
              outIsNegative ?
                {
                  [throughDoorAxis]: doorTunnelAabbPx[throughDoorAxis],
                }
              : originXyz,
            )
          : undefined,
        shadowOffset: {
          // bring shadows up to the top of the legs:
          z: legHeight * blockSizePx.z,
          [throughDoorAxis]:
            outIsNegative ? doorTunnelAabbPx[throughDoorAxis] : undefined,
        },
      },
    };
  }
  yield {
    ...defaultItemProperties,
    type: "stopAutowalk",
    hash: 0,
    id: `${jsonItemId}/stopAutowalk` as RoomItemId,
    jsonItemId,
    aabb: blockXyzToFineXyz({
      [alongWallAxis]: 0.5,
      [throughDoorAxis]: stopAutoWalkDepthBlocks,
      z: 2,
    } as Xyz),
    config: {},
    fixedZIndex: nonRenderingItemFixedZIndex,
    state: {
      ...defaultBaseState(),
      position: blockXyzToFineXyz(
        addXyz(
          subXyz(
            position,
            scaleXyz(unitVectors[direction], autoWalkDistanceBlocks),
            // positions are min-corners, so when walking into the room means
            // travelling in the negative direction (away/left doors) the zone's
            // position needs pulling back by its own depth:
            outIsNegative ? originXyz : (
              { [throughDoorAxis]: stopAutoWalkDepthBlocks }
            ),
          ),
          { [alongWallAxis]: 0.75 },
        ),
      ),
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
  };
}
