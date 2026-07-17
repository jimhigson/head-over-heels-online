import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type JsonItem } from "../../../model/json/JsonItem";
import { type StoodOnBy } from "../../../model/StoodOnBy";
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
  type Xyz,
} from "../../../utils/vectors/vectors";
import { blockSizePx, veryHighZ } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { floorZAtPosition } from "./floorZAtPosition";
import { isDoorOnFloorEdge } from "./isDoorOnFloorEdge";
import { defaultBaseState } from "./itemDefaultStates";

/**
 * shadow textures baked for the door's physical axis at the base angle; the
 * shadow renderer flips them when the camera rotates onto an odd quarter turn
 */
const shadowDoorFloatingThresholdY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.door.floatingThreshold.double.y",
  flipsOnOddQuarterCameraTurns: true,
});

const shadowDoorFloatingThresholdX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.door.floatingThreshold.double.y",
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
});

const shadowDoorFrameTopY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.doorFrame.top.y",
  flipsOnOddQuarterCameraTurns: true,
});

const shadowDoorFrameTopX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.doorFrame.top.y",
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
});

const doorFrameTopNoCastShadowOn = ["doorLegs" as const];

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
export const doorOverallWidthPx = doorOverallWidthBlocks * blockSizePx.x;

/**
 * both posts are physically 8px along the wall at every camera angle. The
 * *drawn* posts are asymmetric (the apparently-nearer is 9px), which is
 * render-time-derived; freezing the physical width means the camera can
 * never change the room's geometry - at the cost of a constant 1px
 * art-vs-physics difference on exactly one post
 */
const doorPostWidthPx = 8;
const doorPostWidthInThroughDoorAxis = 8;

/**
 * the doorway gap the player walks through, and enters relative to, is placed
 * at the ORIGINAL game's asymmetric post widths (near 9px / far 8px) - NOT the
 * frozen 8px render posts. The portal is non-rendering physics, so keeping it
 * at the original geometry preserves the exact spot the player enters at (which
 * the first-frame scroll snaps to) without affecting the camera-invariant post
 * render. Baking the 9/8 asymmetry into world space is itself camera-invariant.
 */
const entryNearPostWidthPx = 9;
const entryFarPostWidthPx = 8;

// to be true to the original game, this should be 0.75 blocks, which is
// enough to be completely outside the doorframe, and to fall off the ledge
// of the door (if z>0)
const autoWalkDistanceBlocks = 0.5;
// the stop autowalk isn't just a plane, in case the player gets pushed
// through a long way in one frame, like an item being introduced to
// the room, like the other player walking through the door
const stopAutoWalkDepthBlocks = 0.5;

/**
 * loads a door's items with only angle-invariant (physical) properties: the
 * drawn post widths (9px apparently-near), whether the parts render as being
 * in a hidden wall, and their render boxes are all derived at render time
 */
export function* loadDoor<RoomId extends string, RoomItemId extends string>(
  jsonDoor: JsonItem<"door", RoomId, RoomItemId>,
  jsonItemId: RoomItemId,
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
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

  const onFloorEdge = isDoorOnFloorEdge(jsonDoor, directionalIndex);
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

  const framePartsOrigin = blockXyzToFineXyz(
    addXyz(position, invisibleWallSetBackBlocks, tunnelSetbackBlocks),
  );

  const postAabb = addXyz(
    {
      [alongWallAxis]: doorPostWidthPx,
      [throughDoorAxis]: doorPostWidthInThroughDoorAxis,
      z: doorPostHeightPx,
    } as Xyz,
    doorTunnelAabbPx,
  );

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
        // the json direction name becomes a unit vector in-play:
        direction: unitVectors[direction],
        onFloorEdge,
        part: "far",
      },
      state: {
        ...defaultBaseState(),
        // the far post ends flush with the door's overall (2-block) span:
        position: addXyz(framePartsOrigin, {
          [alongWallAxis]: doorOverallWidthPx - doorPostWidthPx,
        }),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: postAabb,
    },
  };

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
        direction: unitVectors[direction],
        onFloorEdge,
        part: "near",
      },
      state: {
        ...defaultBaseState(),
        position: framePartsOrigin,
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: postAabb,
    },
  };

  /**
   * the bit at the top of the frame between the two door posts
   */
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
        direction: unitVectors[direction],
        onFloorEdge,
        part: "top",
      },
      state: {
        ...defaultBaseState(),
        // the physical top bar spans the gap between the (8px) posts:
        position: addXyz(framePartsOrigin, {
          [alongWallAxis]: doorPostWidthPx,
          z: doorPortalHeight,
        }),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: addXyz(
        {
          [alongWallAxis]: doorOverallWidthPx - 2 * doorPostWidthPx,
          [throughDoorAxis]: doorPostWidthInThroughDoorAxis,
          z: doorPostHeightPx - doorPortalHeight,
        } as Xyz,
        doorTunnelAabbPx,
      ),
      shadowCastTexture:
        alongWallAxis === "x" ? shadowDoorFrameTopX : shadowDoorFrameTopY,
      shadowOffset: {
        [alongWallAxis]: -1,
        [throughDoorAxis]: 1,
      },
      // ie, if character jumps while stood in a doorway, the top of the doorframe is now 'standing' on them:
      castsShadowWhileStoodOn: true,
      noShadowCastOn: doorFrameTopNoCastShadowOn,
    },
  };

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
        position: addXyz(framePartsOrigin, {
          z: doorPostHeightPx,
        }),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: addXyz(
        blockXyzToFineXyz({
          [alongWallAxis]: 2,
          [throughDoorAxis]: doorTunnelLengthBlocks,
        }),
        { [throughDoorAxis]: doorPostWidthInThroughDoorAxis, z: veryHighZ },
      ),
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
              // the door's world direction; the embed term follows the wall
              // setback:
              [throughDoorAxis]:
                (outIsNegative ? -doorTunnelLengthBlocks : 0.5) +
                invisibleWallSetBackBlocks[throughDoorAxis],
            }),
          ),
          { [alongWallAxis]: entryNearPostWidthPx },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: {
        [alongWallAxis]:
          doorOverallWidthPx - entryNearPostWidthPx - entryFarPostWidthPx,
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
          direction: unitVectors[direction],
          onFloorEdge,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: legHeight,
        },
        renders: true,
        // the floating threshold only shows (and casts) in a hidden wall -
        // gated per angle by shadowCastTextureAtAngle:
        shadowCastTexture:
          alongWallAxis === "x" ?
            shadowDoorFloatingThresholdX
          : shadowDoorFloatingThresholdY,
        castsShadowWhileStoodOn: false,
        state: {
          ...defaultBaseState(),
          position: {
            ...framePartsOrigin,
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
