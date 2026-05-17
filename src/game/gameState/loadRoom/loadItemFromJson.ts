import { produce } from "immer";

import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { type RoomJson, roomJsonItemsIterable } from "../../../model/RoomJson";
import { getJsonItemTimes } from "../../../model/times";
import { type PlanetName } from "../../../sprites/planets";
import { type ScrollsRead } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type PokesEnabled } from "../../../store/slices/userSettings/userSettingsSlice";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  lengthXyz,
  unitXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import {
  floatingTextFixedZIndex,
  nonRenderingItemFixedZIndex,
} from "../../render/sortZ/fixedZIndexes";
import { type RoomPickupsCollected } from "../GameState";
import {
  buildRoomJsonDirectionalIndex,
  type RoomDirectionalIndex,
} from "./buildRoomJsonDirectionalIndex";
import { initialState } from "./itemDefaultStates";
import { loadDoor } from "./loadDoor";
import { loadFloor } from "./loadFloor";
import { loadItemShadowCast } from "./loadItemShadowCast";
import { loadPlayer } from "./loadPlayer";
import { loadWall } from "./loadWalls";

type ItemConfigMaybeWithMultiplication = {
  times?: Partial<Xyz> | undefined;
};

export function* loadItemFromJson<
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItemId: RoomItemId,
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
  roomJson: RoomJson<RoomId, RoomItemId>,
  directionalIndex: RoomDirectionalIndex<
    RoomId,
    RoomItemId
  > = buildRoomJsonDirectionalIndex(roomJsonItemsIterable(roomJson)),
  roomPickupsCollected: RoomPickupsCollected = emptyObject,
  /** may be safely omitted if we know that the item is not a scroll */
  scrollsRead: ScrollsRead = {},
  planetsLiberated: Partial<Record<PlanetName, boolean>> = emptyObject,
  pokesEnabled: PokesEnabled = {},
  itemIdSuffix = "",
): Generator<UnionOfAllItemInPlayTypes<RoomId>, undefined> {
  if (roomPickupsCollected[jsonItemId]) {
    // skip pickups that have already been collected
    return;
  }
  if (
    jsonItem.type === "pickup" &&
    jsonItem.config.gives === "scroll" &&
    jsonItem.config.source === "manual" &&
    scrollsRead[jsonItem.config.page]
  ) {
    // don't show scrolls the player has already read
    return;
  }

  switch (true) {
    case jsonItem.type === "door": {
      return yield* loadDoor<RoomId, RoomItemId>(
        jsonItem,
        jsonItemId,
        directionalIndex,
      );
    }
    case jsonItem.type === "player": {
      yield loadPlayer(jsonItem, jsonItemId, pokesEnabled);
      return;
    }

    case jsonItem.type === "wall": {
      yield loadWall(jsonItemId, jsonItem);
      return;
    }

    case jsonItem.type === "floor": {
      yield loadFloor(jsonItemId, jsonItem, roomJson);
      return;
    }

    // this is a multiple dissapearing blocks - recursively load as multiple individual blocks (with the same jsonItemId)
    case jsonItem.type === "block" &&
      jsonItem.config.disappearing !== undefined &&
      lengthXyz(getJsonItemTimes(jsonItem)) >= 2: {
      const times = getJsonItemTimes(jsonItem);
      for (let x = 0; x < times.x; x++) {
        for (let y = 0; y < times.y; y++) {
          for (let z = 0; z < times.z; z++) {
            const individualBlock = produce(jsonItem, (draft) => {
              draft.position = {
                x: jsonItem.position.x + x,
                y: jsonItem.position.y + y,
                z: jsonItem.position.z + z,
              };
              draft.config.times = unitXyz;
            });
            yield* loadItemFromJson(
              jsonItemId,
              individualBlock,
              roomJson,
              directionalIndex,
              roomPickupsCollected,
              scrollsRead,
              planetsLiberated,
              pokesEnabled,
              `${itemIdSuffix}_${x}_${y}_${z}`,
            );
          }
        }
      }

      break;
    }

    case jsonItem.type === "sceneryCrown" &&
      !planetsLiberated[jsonItem.config.planet]: {
      // yield nothing - scenery crowns only show if we have collected that crown
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
          multiplyBoundingBox({
            singleItemBBInfo: boundingBoxes,
            times: (jsonItem.config as ItemConfigMaybeWithMultiplication).times,
          })
        : boundingBoxes;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
      let state: any;
      try {
        state = initialState(jsonItem);
      } catch (e: unknown) {
        throw new Error(
          `loadItemFromJson: error creating initial state for jsonItem ${JSON.stringify(jsonItem, null, 2)}`,
          { cause: e },
        );
      }

      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxesMultiplied,
        id: `${jsonItemId}${itemIdSuffix}`,
        jsonItemId,
        fixedZIndex:
          jsonItem.type === "emitter" || jsonItem.type === "timer" ?
            nonRenderingItemFixedZIndex
          : jsonItem.type === "floatingText" ? floatingTextFixedZIndex
          : undefined,
        shadowCastTexture: loadItemShadowCast(jsonItem),
        // items that have true here are items that let a little bit of the floor below them
        // be seen while they are standing on it
        castsShadowWhileStoodOn:
          (jsonItem.type === "monster" &&
            (jsonItem.config.which === "emperor" ||
              jsonItem.config.which === "emperorsGuardian" ||
              jsonItem.config.which === "cyberman" ||
              jsonItem.config.which === "turtle" ||
              jsonItem.config.which === "helicopterBug")) ||
          jsonItem.type === "pickup" ||
          jsonItem.type === "ball" ||
          jsonItem.type === "lift" ||
          // ie, stepstool - see its own shadow via the hole in it:
          jsonItem.type === "pushableBlock" ||
          jsonItem.type === "sceneryPlayer" ||
          // spiky balls:
          jsonItem.type === "slidingDeadly" ||
          jsonItem.type === "spring",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: jsonItem.config as any,
        state,
      };

      if (jsonItem.type === "teleporter") {
        const teleporterTimes = getJsonItemTimes(jsonItem);
        yield* loadItemFromJson(
          `${jsonItemId}-help` as RoomItemId,
          {
            type: "emitter",
            position: addXyz(jsonItem.position, { z: teleporterTimes.z }),
            config: {
              emits: {
                type: "floatingText",
                config: {
                  textLines: ["Press jump", "to teleport"],
                  sway: true,
                },
              },
              period: 8_000,
              delay: 2_000,
              maximum: null,
              whenPlayerInside: true,
              offset: { z: 0.5 },
              times: {
                ...teleporterTimes,
                z: 0.1,
              },
              sound: null,
            },
          },
          roomJson,
          directionalIndex,
        );
      }
    }
  }
}
