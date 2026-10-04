import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  itemBehaviourKey,
  type ItemInPlayConfig,
} from "../../../model/ItemInPlay";
import { type JsonItem } from "../../../model/json/JsonItem";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { emptyObject } from "../../../utils/empty";
import { pick } from "../../../utils/pick";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  boxWithSize,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
  scaleXyz,
  subXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
import { blockSizePx, veryHighZ } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { floorZAtPosition } from "./floorZAtPosition";
import { isDoorOnFloorEdge } from "./isDoorOnFloorEdge";
import { defaultBaseState } from "./itemDefaultStates";
import {
  autoWalkDistanceBlocks,
  doorOverallWidthPx,
  doorPortalHeight,
  doorPostHeightPx,
  doorPostWidthInThroughDoorAxis,
  doorPostWidthPx,
  doorTunnelLengthBlocks,
  entryFarPostWidthPx,
  entryNearPostWidthPx,
  stopAutoWalkDepthBlocks,
} from "./loadDoorConstants";

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

  const frameFarConfig: ItemInPlayConfig<"doorFrame", RoomId, RoomItemId> = {
    ...jsonDoor.config,
    // the json direction name becomes a unit vector in-play:
    direction: unitVectors[direction],
    onFloorEdge,
    part: "far",
  };
  yield {
    ...jsonDoor,
    ...{
      type: "doorFrame",
      // doorframes never animate, so the hash (only used to de-synchronise animations) is irrelevant:
      hash: 0,
      id: `${jsonItemId}/frameFar` as RoomItemId,
      jsonItemId,
      config: frameFarConfig,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "doorFrame",
        frameFarConfig,
      ),
      state: {
        ...defaultBaseState(),
        // the far post ends flush with the door's overall (2-block) span:
        box: boxWithSize(
          addXyz(framePartsOrigin, {
            [alongWallAxis]: doorOverallWidthPx - doorPostWidthPx,
          }),
          postAabb,
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
    },
  };

  const frameNearConfig: ItemInPlayConfig<"doorFrame", RoomId, RoomItemId> = {
    ...jsonDoor.config,
    direction: unitVectors[direction],
    onFloorEdge,
    part: "near",
  };
  yield {
    ...jsonDoor,
    ...{
      type: "doorFrame",
      hash: 0,
      id: `${jsonItemId}/frameNear` as RoomItemId,
      jsonItemId,
      config: frameNearConfig,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "doorFrame",
        frameNearConfig,
      ),
      state: {
        ...defaultBaseState(),
        box: boxWithSize(framePartsOrigin, postAabb),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
    },
  };

  /**
   * the bit at the top of the frame between the two door posts
   */
  const frameTopConfig: ItemInPlayConfig<"doorFrame", RoomId, RoomItemId> = {
    ...jsonDoor.config,
    direction: unitVectors[direction],
    onFloorEdge,
    part: "top",
  };
  yield {
    ...jsonDoor,
    ...{
      type: "doorFrame",
      hash: 0,
      id: `${jsonItemId}/frameTop` as RoomItemId,
      jsonItemId,
      config: frameTopConfig,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "doorFrame",
        frameTopConfig,
      ),
      state: {
        ...defaultBaseState(),
        // the physical top bar spans the gap between the (8px) posts:
        box: boxWithSize(
          addXyz(framePartsOrigin, {
            [alongWallAxis]: doorPostWidthPx,
            z: doorPortalHeight,
          }),
          addXyz(
            {
              [alongWallAxis]: doorOverallWidthPx - 2 * doorPostWidthPx,
              [throughDoorAxis]: doorPostWidthInThroughDoorAxis,
              z: doorPostHeightPx - doorPortalHeight,
            } as Xyz,
            doorTunnelAabbPx,
          ),
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
    },
  };

  // wall above the door, up to the ceiling:
  const blockerAboveConfig = emptyObject satisfies ItemInPlayConfig<"blocker">;
  yield {
    ...jsonDoor,
    ...{
      type: "blocker",
      hash: 0,
      id: `${jsonItemId}/blockerAbove` as RoomItemId,
      jsonItemId,
      config: blockerAboveConfig,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "blocker",
        blockerAboveConfig,
      ),
      renders: false,
      state: {
        ...defaultBaseState(),
        box: boxWithSize(
          addXyz(framePartsOrigin, {
            z: doorPostHeightPx,
          }),
          addXyz(
            blockXyzToFineXyz({
              [alongWallAxis]: 2,
              [throughDoorAxis]: doorTunnelLengthBlocks,
            }),
            { [throughDoorAxis]: doorPostWidthInThroughDoorAxis, z: veryHighZ },
          ),
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
    },
  };

  // door portal:
  const portalConfig: ItemInPlayConfig<"portal", RoomId, RoomItemId> = {
    ...pick(jsonDoor.config, "toRoom", "toDoor"),
    relativePoint: blockXyzToFineXyz({
      ...originXyz,
      // the relative point gets put halfway through the doorframe
      [throughDoorAxis]: outIsNegative ? doorTunnelLengthBlocks + 0.25 : -0.25,
    }),
    direction: unitVectors[direction],
  };
  yield {
    ...jsonDoor,
    ...{
      type: "portal",
      hash: 0,
      id: `${jsonItemId}/portal` as RoomItemId,
      jsonItemId,
      config: portalConfig,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "portal",
        portalConfig,
      ),
      state: {
        ...defaultBaseState(),
        box: boxWithSize(
          addXyz(
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
          {
            [alongWallAxis]:
              doorOverallWidthPx - entryNearPostWidthPx - entryFarPostWidthPx,
            // portals get thickness for the same reason walls do -
            // it makes it harder to push items such as enemies through
            // them during collisions with a lot of overlap - ie, if items
            // spawn on top of each other
            [throughDoorAxis]: doorTunnelLengthPx,
            z: doorPortalHeight,
          } as Xyz,
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
    },
  };

  // door legs
  if (legHeight !== 0) {
    const legsConfig = {
      ...jsonDoor.config,
      direction: unitVectors[direction],
      onFloorEdge,
      style: "none",
      side: "away", // TODO: look at typings - this isn't needed for hidden walls
      height: legHeight,
    };
    yield {
      ...jsonDoor,
      ...{
        type: "doorLegs",
        hash: 0,
        id: `${jsonItemId}/legs` as RoomItemId,
        jsonItemId,
        config: legsConfig,
        [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
          "doorLegs",
          legsConfig,
        ),
        renders: true,
        state: {
          ...defaultBaseState(),
          box: boxWithSize(
            {
              ...framePartsOrigin,
              z: floorZ * blockSizePx.z,
            },
            addXyz(
              blockXyzToFineXyz({
                [alongWallAxis]: 2,
                [throughDoorAxis]: 0.5,
                z: legHeight,
              }),
              doorTunnelAabbPx,
            ),
          ),
        },
      },
    };
  }
  const stopAutowalkConfig =
    emptyObject satisfies ItemInPlayConfig<"stopAutowalk">;
  yield {
    type: "stopAutowalk",
    hash: 0,
    id: `${jsonItemId}/stopAutowalk` as RoomItemId,
    jsonItemId,
    config: stopAutowalkConfig,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
      "stopAutowalk",
      stopAutowalkConfig,
    ),
    state: {
      ...defaultBaseState(),
      box: boxWithSize(
        blockXyzToFineXyz(
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
        blockXyzToFineXyz({
          [alongWallAxis]: 0.5,
          [throughDoorAxis]: stopAutoWalkDepthBlocks,
          z: 2,
        } as Xyz),
      ),
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
  };
}
