import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { doorIsInHiddenWall, type JsonItem } from "@/model/json/JsonItem";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { blockSizePx } from "@/sprites/spritePivots";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors";
import {
  originXyz,
  addXyz,
  perpendicularAxisXy,
  doorAlongAxis,
} from "@/utils/vectors";

/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = 24;
export const doorPostHeight = 48;

export function* loadDoor<RoomId extends string>(
  jsonDoor: JsonItem<"door", PlanetName, RoomId>,
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
      id: `${id}/far`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        nearness: "far",
      },
      type: "doorFrame",
      state: {
        position: blockXyzToFineXyz(
          addXyz(position, { [axis]: 1.5 }, crossAxisDisplacement),
        ),
        expires: null,
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
      id: `${id}/near`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        nearness: "near",
      },
      type: "doorFrame",
      state: {
        position: doorNearPosition,
        expires: null,
      },
      aabb: { x: 8, y: 8, z: doorPostHeight },
    },
  };
  yield {
    ...jsonDoor,
    ...defaultItemProperties,
    ...{
      id: `${id}/portal`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        relativePoint: doorNearPosition,
      },
      type: "portal",
      renders: false,
      onTouch: "portal",
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
      },
      aabb: {
        [axis]: blockSizePx.w,
        [crossAxis]: 0,
        z: doorPortalHeight,
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
            z: doorPortalHeight,
          },
        ),
        expires: null,
      },
      aabb: { ...blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0.5 }), z: 999 },
    },
  };
  if (position.z > 0)
    yield {
      ...jsonDoor,
      ...defaultItemProperties,
      ...{
        id: `${id}/legs`,
        config: {
          ...jsonDoor.config,
          inHiddenWall,
          style: "none",
          side: "away", // TODO: look at typings - this isn't needed for hidden walls
          height: position.z,
        },
        renders: true,
        type: "doorLegs",
        state: {
          position: addXyz({
            ...blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
            z: 0,
          }),
          expires: null,
        },
        aabb: {
          ...blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0.5, z: position.z }),
        },
      },
    };
}
