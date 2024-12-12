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
import { directionAxis, originXyz } from "@/utils/vectors/vectors";
import { initBaddieWalk } from "@/game/physics/mechanics/baddieAi";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { CreateSpriteOptions } from "@/game/render/createSprite";

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
        shadowCastTexture: shadowCast(jsonItem),
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
        shadowCastTexture: shadowCast(jsonItem),
        id: itemId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: jsonItem.config as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
      };
    }
  }
}

const shadowMask = (
  jsonItem: UnknownJsonItem,
): CreateSpriteOptions | undefined => {
  switch (jsonItem.type) {
    case "lift":
      return "shadowMask.smallBlock";
    case "conveyor":
      return {
        texture: "shadowMask.conveyor",
        flipX: directionAxis(jsonItem.config.direction) === "x",
      };
    case "barrier":
      return {
        texture: "shadowMask.barrier.y",
        flipX: jsonItem.config.axis === "x",
      };
    case "spring":
      return "shadowMask.smallRound";
    case "block":
      return jsonItem.config.style === "tower" ?
          "shadowMask.tower"
        : "shadowMask.fullBlock";
    case "movableBlock":
      return jsonItem.config.style === "anvil" ?
          "shadowMask.anvil"
        : "shadowMask.fullBlock";
    case "teleporter":
      // just happens to be the right shape:
      return "teleporter.flashing.1";
    case "hushPuppy":
      // just happens to be the right shape:
      return "shadowMask.hushPuppy";
    case "book":
      return "shadowMask.fullBlock";
    case "portableBlock":
      return jsonItem.config.style === "drum" ?
          "shadowMask.smallRound"
        : "shadowMask.smallBlock";
    case "deadlyBlock":
      switch (jsonItem.config.style) {
        case "volcano":
          return "shadowMask.volcano";
        case "toaster":
          return "shadowMask.fullBlock";
        case "spikes":
          return undefined;
        default:
          jsonItem.config.style satisfies never;
      }
      break;
    case "switch":
      return "shadowMask.switch";
    case "pickup":
      return jsonItem.config.gives === "scroll" ?
          "shadowMask.scroll"
        : "shadowMask.smallRound";
    case "slidingDeadly":
      return "shadowMask.smallRound";
  }
};

const shadowCast = (
  jsonItem: UnknownJsonItem,
): CreateSpriteOptions | undefined => {
  switch (jsonItem.type) {
    case "lift":
      return "shadow.smallBlock";
    case "conveyor":
      return {
        texture: "shadow.fullBlock",
        flipX: directionAxis(jsonItem.config.direction) === "x",
      };
    case "barrier":
      return {
        texture: "shadow.barrier.y",
        flipX: jsonItem.config.axis === "x",
      };
    case "spring":
      return "shadow.smallRound";
    case "block":
      return jsonItem.config.style === "tower" ?
          "shadow.smallRound"
        : "shadow.fullBlock";
    case "movableBlock":
    case "hushPuppy":
    case "deadlyBlock":
    case "book":
      return "shadow.fullBlock";
    case "portableBlock":
      return jsonItem.config.style === "drum" ?
          "shadow.smallRound"
        : "shadow.smallBlock";
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
