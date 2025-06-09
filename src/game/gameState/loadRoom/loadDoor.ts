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
  id: string,
): Generator<
  ItemTypeUnion<
    "doorFrame" | "doorLegs" | "stopAutowalk" | "portal" | "wall",
    RoomId,
    RoomItemId
  >
> {
  const {
    config: { direction },
    position,
  } = jsonDoor;

  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const inHidden = inHiddenWall(jsonDoor);

  // doors on the left/towards side are set back half a square to embed them inside the unseen near-side wall:
  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [crossAxis]: inHidden ? -0.5 : 0,
  };

  // bounding boxes for doors form a long tunnel-like structure longer than the door's rendering
  // that extends out of the room. This helps with collision detection for items entering the room
  // to not have MTVs that snag behind the door
  const doorTunnelLengthBlocks = 1;
  const tunnelSetbackBlocks = {
    [crossAxis]: inHidden ? -doorTunnelLengthBlocks : 0,
  };
  // the extra to put onto door frame AABBs to make them longer for the tunnel
  const doorTunnelAabbPx = {
    [crossAxis]: doorTunnelLengthBlocks * blockSizePx.w,
  };

  const nearPostWidthInAxis = 9;
  const farPostWidthInAxis = 8;
  const postWidthInCrossAxis = 8;

  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/far` as RoomItemId,
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
            { [axis]: 1.5 },
            invisibleWallSetBackBlocks,
            tunnelSetbackBlocks,
          ),
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: addXyz(
        {
          [axis]: farPostWidthInAxis,
          [crossAxis]: postWidthInCrossAxis,
          z: doorPostHeightPx,
        } as Xyz,
        doorTunnelAabbPx,
      ),
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/near` as RoomItemId,
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
      /* the graphics for the near post are 9x8 = don't ask me why but 8x8 doesn't match
         the bb very well */
      aabb: addXyz(
        {
          [axis]: nearPostWidthInAxis,
          [crossAxis]: postWidthInCrossAxis,
          z: doorPostHeightPx,
        } as Xyz,
        doorTunnelAabbPx,
      ),
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/top` as RoomItemId,
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
            [axis]: nearPostWidthInAxis,
            z: doorPortalHeight,
          },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: addXyz(
        {
          [axis]: 2 * blockSizePx.w - nearPostWidthInAxis - farPostWidthInAxis,
          [crossAxis]: postWidthInCrossAxis,
          z: doorPostHeightPx - doorPortalHeight,
        } as Xyz,
        doorTunnelAabbPx,
      ),
    },
  };

  // wall above the door
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "wall",
      id: `${id}/wall` as RoomItemId,
      config: {
        style: "none",
        direction: "away", // TODO: look at typings - this isn't needed for hidden walls
        tiles: [],
      },
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
        [axis]: 2,
        [crossAxis]: 0.5,
        z: defaultRoomHeightBlocks - doorPostHeightBlocks - position.z,
      }),
    },
  };

  // door portal:
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "portal",
      id: `${id}/portal` as RoomItemId,
      config: {
        ...jsonDoor.config,
        inHidden,
        relativePoint: blockXyzToFineXyz({
          ...originXyz,
          [crossAxis]: inHidden ? 0.25 : -0.25,
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
                [crossAxis]: inHidden ? -0.5 : 0.5,
              },
            ),
          ),
          { [axis]: nearPostWidthInAxis },
        ),
        stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      },
      aabb: {
        [axis]:
          doorOverallWidthBlocks * blockSizePx.w -
          nearPostWidthInAxis -
          farPostWidthInAxis,
        [crossAxis]: 0,
        z: doorPortalHeight,
      } as Xyz,
    },
  };

  // door legs
  // door legs currently aren't tunnels - this might need to be
  if (position.z !== 0)
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorLegs",
        id: `${id}/legs` as RoomItemId,
        config: {
          ...jsonDoor.config,
          inHiddenWall: inHidden,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: position.z,
        },
        renders: true,
        shadowCastTexture:
          inHidden ? "shadow.door.floatingThreshold.double.y" : undefined,
        shadowMask: {
          spriteOptions: {
            textureId:
              inHidden ?
                "shadowMask.door.floatingThreshold.double.y"
              : "shadowMask.door.legs.threshold.double.y",
            flipX: axis === "x",
          },
          relativeTo: "top",
        },
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
          blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0.5, z: position.z }),
          doorTunnelAabbPx,
        ),
      },
    };
  yield {
    type: "stopAutowalk",
    id: `${id}/stopAutowalk` as RoomItemId,
    aabb: blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0, z: 2 } as Xyz),
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
