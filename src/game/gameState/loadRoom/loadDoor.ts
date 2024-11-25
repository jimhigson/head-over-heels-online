import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { doorIsInHiddenWall, type JsonItem } from "@/model/json/JsonItem";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { blockSizePx } from "@/sprites/spritePivots";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors/vectors";
import {
  originXyz,
  addXyz,
  perpendicularAxisXy,
  doorAlongAxis,
  subXyz,
  scaleXyz,
  unitVectors,
} from "@/utils/vectors/vectors";

/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = blockSizePx.h * 2;
export const doorPostRenderHeight = blockSizePx.h * 4;

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
      type: "doorFrame",
      id: `${id}/far`,
      config: {
        ...jsonDoor.config,
        inHiddenWall,
        nearness: "far",
      },
      state: {
        position: blockXyzToFineXyz(
          addXyz(position, { [axis]: 1.5 }, crossAxisDisplacement),
        ),
        expires: null,
      },
      aabb: { x: 8, y: 8, z: doorPortalHeight },
      renderAabb: { x: 8, y: 8, z: doorPostRenderHeight },
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
        nearness: "near",
      },
      state: {
        position: doorNearPosition,
        expires: null,
      },
      aabb: { x: 8, y: 8, z: doorPortalHeight },
      renderAabb: { x: 8, y: 8, z: doorPostRenderHeight },
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
        direction,
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
      aabb: blockXyzToFineXyz({
        [axis]: 2,
        [crossAxis]: 0.5,
        z: 999,
      }),
    },
  };
  // note: when z === 0, the door "legs" are just an extra bit of floor
  // under the doorway that can prevent us from falling off the edge of the world
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
      state: {
        position: addXyz({
          ...blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
          z: 0,
        }),
        expires: null,
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
    },
  };
}
