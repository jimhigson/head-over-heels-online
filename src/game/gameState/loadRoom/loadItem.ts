import type { JsonItemType, UnknownJsonItem } from "@/model/json/JsonItem";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import {
  fallingItemTypes,
  slidingItemTypes,
} from "@/game/physics/itemPredicates";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { loadPlayer } from "./loadPlayer";
import type { RoomPickupsCollected } from "../GameState";
import { originXyz } from "@/utils/vectors/vectors";
import { initBaddieWalk } from "@/game/physics/mechanics/baddieAi";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { TextureId } from "@/sprites/spriteSheet";

export function* loadItemFromJson<RoomId extends string>(
  itemId: string,
  jsonItem: UnknownJsonItem<RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
): Generator<UnknownItemInPlay<RoomId>, undefined> {
  if (roomPickupsCollected[itemId]) {
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
        shadowMaskTexture: shadowMask(jsonItem),
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
        shadowMaskTexture: shadowMask(jsonItem),
        id: itemId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: jsonItem.config as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
      };
    }
  }
}

const shadowMask = (jsonItem: UnknownJsonItem): TextureId | undefined => {
  switch (jsonItem.type) {
    case "block":
      return "shadowMask.fullBlock";
  }
};

const initialState = (jsonItem: UnknownJsonItem) => {
  const free = (fallingItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    expires: null,
    stoodOnBy: new Set(),
    position: positionCentredInBlock(jsonItem as UnknownJsonItem),
    ...(free ?
      {
        standingOn: null,
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          ...((slidingItemTypes as string[]).includes(jsonItem.type) ?
            { sliding: originXyz }
          : {}),
        },
        activeConveyor: null,
        latentMovement: [],
      }
    : {}),
    ...(jsonItem.type === "baddie" ?
      {
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          walking: initBaddieWalk(jsonItem.config),
        },
        activated: jsonItem.config.activated,
      }
    : {}),
    ...(jsonItem.type === "pickup" ?
      { collected: false, disappear: "onTouchByPlayer" }
    : {}),
    ...(jsonItem.type === "switch" ?
      { setting: "left", touchedOnProgression: -1 }
    : {}),
    ...(jsonItem.type === "block" ?
      { disappear: jsonItem.config.disappearing ? "onStand" : null }
    : {}),
    ...(jsonItem.type === "barrier" ?
      { disappear: jsonItem.config.disappearing ? "onTouch" : null }
    : {}),
    ...(jsonItem.type === "lift" ?
      { direction: "up", vels: { lift: originXyz } }
    : {}),
    ...(jsonItem.type === "charles" ? { facing: unitVectors.towards } : {}),
  };
};
