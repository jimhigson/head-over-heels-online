import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import type { JsonItem } from "@/model/JsonItem";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { blockSizePx } from "@/sprites/spritePivots";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors";
import { originXyz, addXyz } from "@/utils/vectors";

/**
 * this looks low when the bounding boxes are rendered, but visually
 * the playable characters go inside the doorframes a bit too much when
 * it is set to exactly match the door sprite's internal height
 */
export const doorPortalHeight = 24;
export const doorPostHeight = 48;

export function* loadDoor<RoomId extends string>(
  jsonItem: JsonItem<"door", PlanetName, RoomId>,
  id: string,
): Generator<UnknownItemInPlay<RoomId>> {
  const {
    config: { axis },
    position,
  } = jsonItem;

  const crossAxis = axis === "x" ? "y" : "x";

  const inHiddenWall =
    (axis === "x" && jsonItem.position.y === 0) ||
    (axis === "y" && jsonItem.position.x === 0);

  // doors on the left/front are moved back half a square to embed them inside the unseen near-side wall:
  const crossAxisDisplacement: Xyz = {
    ...originXyz,
    [crossAxis]: inHiddenWall ? -0.5 : 0,
  };

  yield {
    ...jsonItem,
    ...defaultItemProperties,
    ...{
      id: `${id}/far`,
      config: {
        ...jsonItem.config,
        inHiddenWall,
      },
      type: "doorFar",
      state: {
        position: blockXyzToFineXyz(
          addXyz(position, { [axis]: 1.5 }, crossAxisDisplacement),
        ),
      },
      aabb: { x: 8, y: 8, z: doorPostHeight },
    },
  };
  const doorNearPosition = blockXyzToFineXyz(
    addXyz(position, crossAxisDisplacement),
  );
  yield {
    ...jsonItem,
    ...defaultItemProperties,
    ...{
      id: `${id}/near`,
      config: {
        ...jsonItem.config,
        inHiddenWall,
      },
      type: "doorNear",
      state: {
        position: doorNearPosition,
      },
      aabb: { x: 8, y: 8, z: doorPostHeight },
    },
  };
  yield {
    ...jsonItem,
    ...defaultItemProperties,
    ...{
      id: `${id}/portal`,
      config: {
        ...jsonItem.config,
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
      },
      aabb: {
        [axis]: blockSizePx.w,
        [crossAxis]: 0,
        z: doorPortalHeight,
      } as Xyz,
    },
  };
  yield {
    ...jsonItem,
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
        position: {
          ...blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
          ...{
            z: doorPortalHeight,
          },
        },
      },
      aabb: { ...blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0.5 }), z: 999 },
    },
  };
  return;
}
