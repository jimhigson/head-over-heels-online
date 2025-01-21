import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { UnknownItemInPlay } from "../../../model/ItemInPlay";
import type { JsonItem } from "../../../model/json/JsonItem";
import { doorIsInHiddenWall } from "../../../model/json/JsonItem";
import type { SceneryName } from "../../../sprites/planets";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptySet } from "../../../utils/empty";
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
import { blockXyzToFineXyz } from "../../render/projectToScreen";
/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = blockSizePx.h * 2;
export const doorPostHeightBlocks = 4;
export const doorPostHeight = blockSizePx.h * 4;

export function* loadDoor<RoomId extends string>(
  jsonDoor: JsonItem<"door", SceneryName, RoomId>,
  id: string,
): Generator<UnknownItemInPlay<RoomId>> {
  const {
    config: { direction },
    position,
  } = jsonDoor;

  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const inHiddenWall = doorIsInHiddenWall(jsonDoor);

  // doors on the left/front are moved back half a square to embed them inside the unseen near-side wall:
  const crossAxisDisplacement: Xyz = {
    ...originXyz,
    [crossAxis]: inHiddenWall ? -0.5 : 0,
  };

  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/far`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        part: "far",
      },
      state: {
        position: blockXyzToFineXyz(
          addXyz(position, { [axis]: 1.5 }, crossAxisDisplacement),
        ),
        expires: null,
        stoodOnBy: emptySet,
        disappear: null,
      },
      aabb: { x: 8, y: 8, z: doorPostHeight },
    },
  };
  const doorNearPosition = blockXyzToFineXyz(
    addXyz(position, crossAxisDisplacement),
  );
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/near`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        part: "near",
      },
      state: {
        position: doorNearPosition,
        expires: null,
        stoodOnBy: emptySet,
        disappear: null,
      },
      /* the graphics for the near post are 9x8 = don't ask me why but 8x8 doesn't match
         the bb very well */
      aabb: { [axis]: 9, [crossAxis]: 8, z: doorPostHeight } as Xyz,
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "doorFrame",
      id: `${id}/top`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        part: "top",
      },
      state: {
        position: addXyz(
          blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
          {
            [axis]: 9,
            z: doorPortalHeight,
          },
        ),
        expires: null,
        stoodOnBy: emptySet,
        disappear: null,
      },
      aabb: {
        [axis]: 2 * blockSizePx.w - 8 - 9,
        [crossAxis]: 8,
        z: doorPostHeight - doorPortalHeight,
      } as Xyz,
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      id: `${id}/wall`,
      config: {
        style: "none",
        side: "away", // TODO: look at typings - this isn't needed for hidden walls
      },
      renders: false,
      type: "wall",
      state: {
        position: addXyz(
          blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
          {
            z: doorPostHeight,
          },
        ),
        expires: null,
        stoodOnBy: emptySet,
        disappear: null,
      },
      aabb: blockXyzToFineXyz({
        [axis]: 2,
        [crossAxis]: 0.5,
        z: defaultRoomHeightBlocks - doorPostHeightBlocks,
      }),
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      type: "portal",
      id: `${id}/portal`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        // TODO: make relativePoint relative to the portal's position, not absolute like it is here
        relativePoint: blockXyzToFineXyz({
          ...originXyz,
          [crossAxis]: inHiddenWall ? 0.25 : -0.25,
        }),
        direction: unitVectors[direction],
      },
      renders: false,
      state: {
        position: blockXyzToFineXyz(
          addXyz(
            position,
            { [axis]: 0.5 },
            {
              [crossAxis]: inHiddenWall ? -0.5 : 0.5,
            },
          ),
        ),
        expires: null,
        stoodOnBy: emptySet,
        disappear: null,
      },
      aabb: {
        [axis]: blockSizePx.w,
        [crossAxis]: 0,
        z: doorPortalHeight,
      } as Xyz,
    },
  };

  if (position.z !== 0)
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        type: "doorLegs",
        id: `${id}/legs`,
        config: {
          ...jsonDoor.config,
          inHiddenWall,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: position.z,
        },
        renders: true,
        shadowCastTexture:
          inHiddenWall ? "shadow.door.floatingThreshold.double.y" : undefined,
        shadowMask: {
          spriteOptions: {
            texture:
              inHiddenWall ?
                "shadowMask.door.floatingThreshold.double.y"
              : "shadowMask.door.legs.threshold.double.y",
            flipX: axis === "x",
          },
          relativeTo: "top",
        },
        state: {
          position: addXyz({
            ...blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
            z: 0,
          }),
          expires: null,
          stoodOnBy: new Set(),
          disappear: null,
        },
        aabb: blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0.5, z: position.z }),
      },
    };
  yield {
    type: "stopAutowalk",
    id: `${id}/stopAutowalk`,
    renders: false,
    aabb: blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0, z: 2 } as Xyz),
    config: {},
    state: {
      position: blockXyzToFineXyz(
        subXyz(position, scaleXyz(unitVectors[direction], 0.75)),
      ),
      expires: null,
      stoodOnBy: emptySet,
      disappear: null,
    },
  };
}
