import type { JsonItemType, UnknownJsonItem } from "@/model/json/JsonItem";
import type {
  BaseItemState,
  ShadowMaskOptions,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import type { FreeItem } from "@/game/physics/itemPredicates";
import { freeItemTypes, slidingItemTypes } from "@/game/physics/itemPredicates";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { loadPlayer } from "./loadPlayer";
import type { RoomPickupsCollected } from "../GameState";
import { directionAxis, originXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import type { CreateSpriteOptions } from "@/game/render/createSprite";
import type { FreeItemState } from "@/model/ItemStateMap";
import type { SceneryName } from "@/sprites/planets";

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
        shadowMask: shadowMask(jsonItem),
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
        shadowMask: shadowMask(jsonItem),
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
): ShadowMaskOptions | undefined => {
  // charles doesn't work because can't (yet) have direction-specific (changing) maps
  switch (jsonItem.type) {
    case "lift":
      return {
        spriteOptions: "shadowMask.smallBlock",
        relativeTo: "origin",
      };
    case "conveyor":
      return {
        spriteOptions: {
          texture: "shadowMask.conveyor",
          flipX: directionAxis(jsonItem.config.direction) === "x",
        },
        relativeTo: "origin",
      };
    case "barrier":
      return {
        spriteOptions: {
          texture: "shadowMask.barrier.y",
          flipX: jsonItem.config.axis === "x",
        },
        relativeTo: "origin",
      };
    case "spring":
      return { spriteOptions: "shadowMask.smallRound", relativeTo: "origin" };
    case "block":
      return {
        spriteOptions:
          jsonItem.config.style === "tower" ?
            "shadowMask.tower"
          : "shadowMask.fullBlock",
        relativeTo: "origin",
      };
    case "movableBlock":
      return {
        spriteOptions:
          jsonItem.config.style === "stepStool" ?
            "shadowMask.stepStool"
          : "shadowMask.fullBlock",
        relativeTo: "origin",
      };
    case "teleporter":
      return { spriteOptions: "shadowMask.teleporter", relativeTo: "origin" };
    case "hushPuppy":
      // just happens to be the right shape:
      return { spriteOptions: "shadowMask.hushPuppy", relativeTo: "origin" };
    case "portableBlock":
      return {
        spriteOptions:
          jsonItem.config.style === "drum" ?
            "shadowMask.smallRound"
          : "shadowMask.smallBlock",
        relativeTo: "origin",
      };
    case "slidingBlock":
      return {
        spriteOptions:
          jsonItem.config.style === "book" ?
            "shadowMask.fullBlock"
          : "shadowMask.smallRound",
        relativeTo: "origin",
      };
    case "deadlyBlock":
      switch (jsonItem.config.style) {
        case "volcano":
          return { spriteOptions: "shadowMask.volcano", relativeTo: "origin" };
        case "toaster":
          return {
            spriteOptions: "shadowMask.fullBlock",
            relativeTo: "origin",
          };
        case "spikes":
          return { spriteOptions: "shadowMask.spikes", relativeTo: "origin" };
        default:
          jsonItem.config.style satisfies never;
      }
      break;
    case "switch":
      return { spriteOptions: "shadowMask.switch", relativeTo: "origin" };
    case "pickup":
      return jsonItem.config.gives === "scroll" ?
          {
            spriteOptions: "shadowMask.scroll",
            relativeTo: "origin",
          }
        : undefined;
    case "slidingDeadly":
      return { spriteOptions: "shadowMask.smallRound", relativeTo: "origin" };
    case "monster":
      switch (jsonItem.config.which) {
        case "dalek":
          return { spriteOptions: "shadowMask.dalek", relativeTo: "origin" };
        default:
          return undefined;
      }
    case "joystick":
      return { spriteOptions: "shadowMask.joystick", relativeTo: "origin" };
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
      return "shadow.fullBlock";
    case "portableBlock":
      return jsonItem.config.style === "drum" ?
          "shadow.smallRound"
        : "shadow.smallBlock";
    case "pickup":
      return jsonItem.config.gives === "scroll" ?
          "shadow.scroll"
        : "shadow.smallRound";
    case "monster":
      return "shadow.smallRound";
  }
};

export const defaultBaseState = <RoomId extends string>() =>
  ({
    expires: null,
    stoodOnBy: new Set<FreeItem<SceneryName, RoomId>>(),
    disappear: null,
  }) satisfies Partial<BaseItemState>;

export const defaultFreeItemState = () =>
  ({
    standingOn: null,
    vels: {
      gravity: originXyz,
      movingFloor: originXyz,
    },
    latentMovement: [],
  }) satisfies Partial<FreeItemState>;

const initialState = (jsonItem: UnknownJsonItem) => {
  const free = (freeItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    ...defaultBaseState(),
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
        latentMovement: [],
      }
    : {}),
    ...(jsonItem.type === "monster" ?
      {
        vels: {
          gravity: originXyz,
          movingFloor: originXyz,
          walking: originXyz,
        },
        activated: jsonItem.config.activated,
        ...((
          jsonItem.config.which === "skiHead" ||
          jsonItem.config.which === "turtle" ||
          jsonItem.config.which === "elephantHead" ||
          jsonItem.config.which === "cyberman"
        ) ?
          {
            facing: unitVectors[jsonItem.config.startDirection],
          }
        : { facing: unitVectors.towards }),
      }
    : {}),
    ...(jsonItem.type === "pickup" ?
      { collected: false, disappear: "onTouchByPlayer" }
    : {}),
    ...((
      jsonItem.type === "movableBlock" && jsonItem.config.movement !== "free"
    ) ?
      {
        activated: jsonItem.config.activated === true,
        facing: unitVectors[jsonItem.config.startDirection],
      }
    : {}),
    ...(jsonItem.type === "switch" ?
      { setting: "left", touchedOnProgression: -1 }
    : {}),
    ...(jsonItem.type === "block" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "conveyor" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "barrier" ?
      { disappear: jsonItem.config.disappearing ?? null }
    : {}),
    ...(jsonItem.type === "lift" ?
      { direction: "up", vels: { lift: originXyz } }
    : {}),
    ...(jsonItem.type === "charles" ? { facing: unitVectors.towards } : {}),
  };
};
