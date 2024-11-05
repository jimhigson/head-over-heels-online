import { ItemType, UnknownJsonItem } from "@/model/Item";
import { fallingItemTypes, UnknownItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { addXy } from "@/utils/vectors";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { loadDoor } from "./loadDoor";

const positionAndAabb = (
  item: UnknownJsonItem,
): Pick<UnknownItemInPlay, "aabb" | "position" | "renderAabb"> => {
  const blockPosition = blockXyzToFineXyz(item.position);
  const { aabb, renderAabb } = boundingBoxForItem(item);

  if (aabb === undefined) {
    return { position: blockPosition, aabb };
  }

  // 'extra' walls don't get centred on their square (it needs to stay on the edge between
  // squares) - if this extends to more types, make more generic than an if-type
  const centredPosition =
    item.type === "wall"
      ? blockPosition
      : addXy(blockPosition, {
          x: (blockSizePx.w - aabb.x) / 2,
          y: (blockSizePx.d - aabb.y) / 2,
        });

  return {
    position: { ...centredPosition, z: blockPosition.z },
    aabb,
    renderAabb,
  };
};

export function* loadItem<RoomId extends string>(
  id: string,
  jsonItem: UnknownJsonItem<RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  switch (jsonItem.type) {
    case "door": {
      return yield* loadDoor<RoomId>(jsonItem, id);
    }
    case "player": {
      if (jsonItem.config.which === "head") {
        yield {
          type: "head",
          config: {},
          ...defaultItemProperties,
          ...{
            id: "head",
            state: {
              facing: "towards",
              movement: "idle",
              jumpRemaining: 0,
              hasHooter: false,
              fast: 0,
              shield: 0,
              standingOn: null,
              lives: 8,
              donuts: 0,
              autoWalkDistance: 0,
            },
            ...positionAndAabb(jsonItem),
            falls: true,
          },
        };
      } else {
        yield {
          type: "heels",
          config: {},
          ...defaultItemProperties,
          ...{
            id: "heels",
            state: {
              facing: "towards",
              movement: "idle",
              jumpRemaining: 0,
              carrying: null,
              hasBag: false,
              jumps: 0,
              shield: 0,
              standingOn: null,
              lives: 8,
              autoWalkDistance: 0,
            },
            ...positionAndAabb(jsonItem),
            falls: true,
          },
        };
      }
      return;
    }

    case "pickup":
    case "portable-block":
    case "baddie":
    case "spring": {
      // falling items:
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {
            standingOn: null,
          },
          ...positionAndAabb(jsonItem),
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
      return;
    }

    case "teleporter": {
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {
            flashing: false,
          },
          ...positionAndAabb(jsonItem),
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
      return;
    }

    default:
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {},
          ...positionAndAabb(jsonItem),
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
  }
}
