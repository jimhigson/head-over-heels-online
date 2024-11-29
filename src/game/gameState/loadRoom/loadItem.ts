import type { JsonItemType, UnknownJsonItem } from "@/model/json/JsonItem";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { fallingItemTypes } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { loadPlayer } from "./loadPlayer";
import type { RoomPickupsCollected } from "../GameState";
import { originXyz } from "@/utils/vectors/vectors";
import { initBaddieWalk } from "@/game/physics/mechanics/baddieAi";
import { unitVectors } from "@/utils/vectors/unitVectors";

export function* loadItem<RoomId extends string>(
  itemId: string,
  jsonItem: UnknownJsonItem<RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
): Generator<UnknownItemInPlay<RoomId>, undefined> {
  if (jsonItem.type === "pickup" && roomPickupsCollected[itemId]) {
    // skip pickups that have already been collected
    return;
  }

  switch (jsonItem.type) {
    case "door": {
      return yield* loadDoor<RoomId>(jsonItem, itemId);
    }
    case "player": {
      yield loadPlayer(jsonItem);
      return;
    }

    case "conveyor": {
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxForItem(jsonItem),
        id: itemId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: { ...jsonItem.config, count: 1 } as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
      };
      return;
    }

    // catch-all for all items that don't need special handling:
    default: {
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxForItem(jsonItem),
        id: itemId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: jsonItem.config as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
      };
    }
  }
}

const initialState = (jsonItem: UnknownJsonItem) => {
  const free = (fallingItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    expires: null,
    stoodOnBy: [],
    unsolidAfterProgression: null,
    position: positionCentredInBlock(jsonItem as UnknownJsonItem),
    ...(free ?
      {
        standingOn: [],
        vels: { gravity: originXyz, movingFloor: originXyz },
        activeConveyor: null,
      }
    : {}),
    ...(jsonItem.type === "baddie" ?
      {
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          walking: initBaddieWalk(),
        },
        activated: true,
      }
    : {}),
    ...(jsonItem.type === "pickup" ? { collected: false } : {}),
    ...(jsonItem.type === "switch" ? { setting: "left" } : {}),
    ...(jsonItem.type === "block" ?
      { disappearing: jsonItem.config.disappearing }
    : {}),
    ...(jsonItem.type === "lift" ?
      { direction: "up", vels: { lift: originXyz } }
    : {}),
    ...(jsonItem.type === "charles" ? { facing: unitVectors.towards } : {}),
  };
};
