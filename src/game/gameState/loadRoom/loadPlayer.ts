import type { JsonItem } from "@/model/json/JsonItem";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { boundingBoxForItem } from "@/game/collision/boundingBoxes";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { PlanetName } from "@/sprites/planets";
import type { PlayableItem } from "@/model/ItemInPlay";

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
          action: "idle",
          jumpStartTime: null,
          jumped: false,
          hasHooter: false,
          fast: 0,
          shield: 0,
          standingOn: null,
          velZ: 0,
          lives: 8,
          donuts: 0,
          autoWalkDistance: 0,
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          expires: null,
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
          action: "idle",
          jumpStartTime: null,
          carrying: null,
          hasBag: false,
          jumps: 0,
          shield: 0,
          standingOn: null,
          velZ: 0,
          lives: 8,
          autoWalkDistance: 0,
          jumped: false,
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          expires: null,
        },
        falls: true,
      },
    };
  }
};
