import {
  boundingBoxForItem,
  multiplyBoundingBox,
} from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { loadPlayer } from "./loadPlayer";
import type { RoomPickupsCollected } from "../GameState";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type {
  UnionOfAllItemInPlayTypes,
  ShadowMaskOptions,
} from "../../../model/ItemInPlay";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";
import { directionAxis } from "../../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "../../render/createSprite";
import { initialState } from "./itemDefaultStates";
import type { ScrollsRead } from "../../../store/gameMenusSlice";
import { loadWall } from "./loadWalls";

type ItemConfigMaybeWithMultiplication = {
  times?: undefined | Partial<Xyz>;
};

export function* loadItemFromJson<RoomId extends string>(
  itemId: string,
  jsonItem: JsonItemUnion<RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
  /** may be safely omitted if we know that the item is not a scroll */
  scrollsRead: ScrollsRead = {},
): Generator<UnionOfAllItemInPlayTypes<RoomId>, undefined> {
  if (roomPickupsCollected[itemId]) {
    // skip pickups that have already been collected
    return;
  }
  if (
    jsonItem.type === "pickup" &&
    jsonItem.config.gives === "scroll" &&
    scrollsRead[jsonItem.config.page]
  ) {
    // don't show scrolls the player has already read
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

    case "wall": {
      yield loadWall(jsonItem, itemId);
      return;
    }

    // catch-all for all items that don't need special handling:
    default: {
      const boundingBoxes = boundingBoxForItem(jsonItem);

      const boundingBoxesMultiplied: typeof boundingBoxes =
        (
          (jsonItem.config as ItemConfigMaybeWithMultiplication).times !==
          undefined
        ) ?
          {
            aabb: multiplyBoundingBox(
              boundingBoxes.aabb,
              (jsonItem.config as ItemConfigMaybeWithMultiplication).times,
            ),
            // multiplied items can't have a separate render bb:
            renderAabb: undefined,
          }
        : boundingBoxes;

      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxesMultiplied,
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

const shadowMask = (jsonItem: JsonItemUnion): ShadowMaskOptions | undefined => {
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
  jsonItem: JsonItemUnion,
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
