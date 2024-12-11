import type { JsonItem } from "@/model/json/JsonItem";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { boundingBoxForItem } from "@/game/collision/boundingBoxes";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { PlanetName } from "@/sprites/planets";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import { originXyz } from "@/utils/vectors/vectors";
import type { CharacterName } from "@/model/modelTypes";

export const loadPlayer = <RoomId extends string>(
  jsonItem: JsonItem<"player", PlanetName, RoomId>,
): PlayableItem<CharacterName, RoomId> => {
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
          disappear: null,
          fastSteps: 0,
          shieldCollectedAt: Number.NEGATIVE_INFINITY,
          standingOn: null,
          stoodOnBy: new Set(),
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
          latentMovement: [],
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
          disappear: null,
          carrying: null,
          hasBag: false,
          bigJumps: 0,
          shieldCollectedAt: Number.NEGATIVE_INFINITY,
          standingOn: null,
          stoodOnBy: new Set(),
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
          latentMovement: [],
        },
        falls: true,
      },
    };
  }
};
