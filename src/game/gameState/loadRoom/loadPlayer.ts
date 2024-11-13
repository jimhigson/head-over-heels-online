import type { JsonItem } from "@/model/JsonItem";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { boundingBoxForItem } from "@/game/collision/boundingBoxes";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { PlanetName } from "@/sprites/planets";
import type { PlayableItem } from "@/model/ItemInPlay";
import { originXy } from "@/utils/vectors";

export const loadPlayer = <RoomId extends string>(
  jsonItem: JsonItem<"player", PlanetName, RoomId>,
): PlayableItem => {
  if (jsonItem.config.which === "head") {
    return {
      type: "head",
      config: {},
      ...defaultItemProperties,
      ...boundingBoxForItem(jsonItem),
      ...{
        id: "head",
        state: {
          facing: "towards",
          movement: "idle",
          jumpRemaining: 0,
          jumped: false,
          hasHooter: false,
          fast: 0,
          shield: 0,
          standingOn: null,
          lives: 8,
          donuts: 0,
          autoWalkDistance: 0,
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          jumpRoundingError: 0,
          fallRoundingError: 0,
          walkRoundingError: originXy,
        },
        falls: true,
      },
    };
  } else {
    return {
      type: "heels",
      config: {},
      ...defaultItemProperties,
      ...boundingBoxForItem(jsonItem),
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
          jumped: false,
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          jumpRoundingError: 0,
          fallRoundingError: 0,
          walkRoundingError: originXy,
        },
        falls: true,
      },
    };
  }
};
