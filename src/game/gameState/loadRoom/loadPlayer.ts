import type { JsonItem } from "@/model/json/JsonItem";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { boundingBoxForItem } from "@/game/collision/boundingBoxes";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { PlanetName } from "@/sprites/planets";
import type { PlayableItem } from "@/model/ItemInPlay";
import { originXyz } from "@/utils/vectors/vectors";

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
          jumpEndTime: -1, // jump has already finished - ie, we are not jumping
          hasHooter: false,
          fast: 0,
          shield: 0,
          standingOn: [],
          stoodOnBy: [],
          activeConveyor: null,
          vels: {
            walking: originXyz,
            gravity: originXyz,
            movingFloor: originXyz,
            jumping: originXyz,
          },
          jumped: false,
          lives: 8,
          donuts: 0,
          autoWalk: false,
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          expires: null,
          unsolidAfterProgression: null,
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
          carrying: null,
          hasBag: false,
          jumps: 0,
          shield: 0,
          standingOn: [],
          stoodOnBy: [],
          activeConveyor: null,
          vels: {
            walking: originXyz,
            gravity: originXyz,
            movingFloor: originXyz,
            jumping: originXyz,
          },
          jumped: false,
          lives: 8,
          autoWalk: false,
          jumpEndTime: -1, // jump has already finished - ie, we are not jumping
          teleporting: null,
          position: positionCentredInBlock(jsonItem),
          expires: null,
          unsolidAfterProgression: null,
        },
        falls: true,
      },
    };
  }
};
