import { ItemType, UnknownJsonItem } from "@/model/Item";
import { fallingItemTypes, UnknownItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { addXyz, Xyz } from "@/utils/vectors";
import { blockSizePx } from "@/sprites/spriteSheet";
import { loadDoor } from "./loadDoor";

const boundingBoxes = (
  item: UnknownJsonItem,
): Pick<UnknownItemInPlay, "aabb" | "renderAabb"> => {
  const { aabb, renderAabb } = boundingBoxForItem(item);

  if (aabb === undefined) {
    throw new Error(
      `item type= ${item.type} config=${JSON.stringify(item.config)} has no bounding box`,
    );
  }
  return {
    aabb,
    renderAabb,
  };
};
const positionCentredInBlock = (item: UnknownJsonItem): Xyz => {
  const blockPosition = blockXyzToFineXyz(item.position);
  const { aabb } = boundingBoxForItem(item);

  if (aabb === undefined) {
    throw new Error(
      `item type= ${item.type} config=${JSON.stringify(item.config)} has no bounding box`,
    );
  }

  // 'extra' walls don't get centred on their square (it needs to stay on the edge between
  // squares) - if this extends to more types, make more generic than an if-type
  const centredPosition =
    item.type === "wall" ?
      blockPosition
    : addXyz(blockPosition, {
        x: (blockSizePx.w - aabb.x) / 2,
        y: (blockSizePx.d - aabb.y) / 2,
      });

  return centredPosition;
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
          ...boundingBoxes(jsonItem),
          ...{
            id: "head",
            state: {
              facing: "towards",
              movement: "idle",
              jumpRemaining: 0,
              jumped: false,
              jumpRoundingError: 0,
              hasHooter: false,
              fast: 0,
              shield: 0,
              standingOn: null,
              lives: 8,
              donuts: 0,
              autoWalkDistance: 0,
              teleporting: null,
              position: positionCentredInBlock(jsonItem),
              fallRoundingError: 0,
            },
            falls: true,
          },
        };
      } else {
        yield {
          type: "heels",
          config: {},
          ...defaultItemProperties,
          ...boundingBoxes(jsonItem),
          ...{
            id: "heels",
            state: {
              facing: "towards",
              movement: "idle",
              jumpRemaining: 0,
              jumpRoundingError: 0,
              carrying: null,
              hasBag: false,
              jumps: 0,
              shield: 0,
              standingOn: null,
              lives: 8,
              autoWalkDistance: 0,
              jumped: false,
              teleporting: null,
              position: positionCentredInBlock(jsonItem),
              fallRoundingError: 0,
            },
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
        ...boundingBoxes(jsonItem),
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {
            standingOn: null,
            fallRoundingError: 0,
            position: positionCentredInBlock(jsonItem),
          },
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
      return;
    }

    case "teleporter": {
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxes(jsonItem),
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {
            flashing: false,
            position: positionCentredInBlock(jsonItem),
          },
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
      return;
    }

    default:
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxes(jsonItem),
        ...{
          id,
          renderingDirty: false,
          renderPositionDirty: false,
          state: {
            position: positionCentredInBlock(jsonItem),
          },
          falls: (fallingItemTypes as ItemType[]).includes(jsonItem.type),
        },
      };
  }
}
