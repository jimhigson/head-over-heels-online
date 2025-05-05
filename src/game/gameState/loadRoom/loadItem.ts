import {
  boundingBoxForItem,
  multiplyBoundingBox,
} from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { loadPlayer } from "./loadPlayer";
import type { RoomPickupsCollected } from "../GameState";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";
import { directionAxis } from "../../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "../../render/createSprite";
import { initialState } from "./itemDefaultStates";
import { loadWall } from "./loadWalls";
import type { RoomJson } from "../../../model/RoomJson";
import type { ScrollsRead } from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import { emptyObject } from "../../../utils/empty";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";

type ItemConfigMaybeWithMultiplication = {
  times?: undefined | Partial<Xyz>;
};

export function* loadItemFromJson<
  RoomId extends string,
  RoomItemId extends string,
>(
  itemId: string,
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
  roomJson: RoomJson<RoomId, RoomItemId>,
  roomPickupsCollected: RoomPickupsCollected = emptyObject,
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
      return yield* loadDoor<RoomId, RoomItemId>(jsonItem, itemId);
    }
    case "player": {
      yield loadPlayer(jsonItem);
      return;
    }

    case "wall": {
      yield loadWall(itemId, jsonItem, roomJson);
      return;
    }

    case "sceneryCrown": {
      if (
        !store.getState().gameMenus.planetsLiberated[jsonItem.config.planet]
      ) {
        // yield nothing - scenery crowns only show if we have collected that crown
        return;
      }
    }

    // catch-all for all items that don't need special handling:
    // eslint-disable-next-line no-fallthrough -- allow sceneryCrown to fall-through
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
        fixedZIndex:
          jsonItem.type === "emitter" ? nonRenderingItemFixedZIndex : undefined,
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

const shadowCast = (
  jsonItem: JsonItemUnion,
): CreateSpriteOptions | undefined => {
  switch (jsonItem.type) {
    case "lift":
      return "shadow.smallBlock";
    case "conveyor":
      return {
        textureId: "shadow.fullBlock",
        flipX: directionAxis(jsonItem.config.direction) === "x",
      };
    case "barrier":
      return {
        textureId: "shadow.barrier.y",
        flipX: jsonItem.config.axis === "x",
      };
    case "spring":
    case "firedDoughnut":
      return "shadow.smallRound";
    case "block":
      return jsonItem.config.style === "tower" ?
          "shadow.smallRound"
        : "shadow.fullBlock";
    case "pushableBlock":
    case "movingPlatform":
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
