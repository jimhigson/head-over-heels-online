import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { JsonItem } from "@/model/Item";
import { UnknownItemInPlay, defaultItemProperties } from "@/model/ItemInPlay";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { PlanetName } from "@/sprites/planets";
import { Xyz, originXyz, addXyz } from "@/utils/vectors";

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
      position: blockXyzToFineXyz(
        addXyz(position, { [axis]: 1.5 }, crossAxisDisplacement),
      ),
      state: {},
      aabb: { x: 8, y: 8, z: doorPostHeight },
    },
  };
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
      position: blockXyzToFineXyz(addXyz(position, crossAxisDisplacement)),
      state: {},
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
      },
      type: "doorPortal",
      position: blockXyzToFineXyz(
        addXyz(
          position,
          { [axis]: 0.5 },
          {
            [crossAxis]: inHiddenWall ? -0.5 : 0.5,
          },
        ),
      ),
      renders: false,
      state: {},
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
      position: addXyz(blockXyzToFineXyz(addXyz(position)), {
        z: doorPortalHeight,
      }),
      state: {},
      aabb: { ...blockXyzToFineXyz({ [axis]: 2, [crossAxis]: 0 }), z: 999 },
    },
  };
  return;
}
