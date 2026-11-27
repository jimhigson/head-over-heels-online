import {
  itemBehaviourKey,
  type ItemInPlay,
} from "../../../model/itemInPlay/ItemInPlay";
import type { EmittableItemJson } from "../../../model/json/ItemConfigMap";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { roomJsonItemsIterable } from "../../../model/RoomJsonItemIterators";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { store } from "../../../store/store";
import {
  hashNumberToNumber0to1,
  hashXyzToNumber0to1,
} from "../../../utils/maths/hashing";
import { originXyz } from "../../../utils/vectors/vectors";
import {
  collision2Items,
  hasCollisionItemWithIndex,
} from "../../collision/aabbCollision";
import type { GameState } from "../../gameState/GameState";
import { buildRoomJsonDirectionalIndex } from "../../gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { periodicItemShouldAct } from "../../physics/mechanics/periodicItemShouldAct";
import { chooseEmittableRecipe } from "./chooseEmittableRecipe";
import { emittedItemBox } from "./emittedItemBox";

const hasFewerThanInRoom = <RoomId extends string, RoomItemId extends string>(
  limit: number,
  emitterId: RoomItemId,
  room: RoomState<RoomId, RoomItemId>,
): boolean => {
  let count = 0;
  for (const item of roomItemsIterable(room.items)) {
    if (item.state.createdByEmitter === emitterId) {
      count++;
      if (count >= limit) {
        return false;
      }
    }
  }
  return true;
};

const isCurrentPlayerInsideEmitter = <
  RoomId extends string,
  RoomItemId extends string,
>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
): boolean => {
  const currentPlayable =
    room.items[gameState.currentCharacterName as RoomItemId];
  return (
    currentPlayable !== undefined && collision2Items(emitter, currentPlayable)
  );
};

export const emitting = <RoomId extends string, RoomItemId extends string>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { id: emitterId, state } = emitter;
  const { lastEmittedAtRoomTime, quantityEmitted } = state;

  const { maximum } = state;

  const exhaustedTotalCreateCount =
    maximum !== null && quantityEmitted >= maximum;

  if (exhaustedTotalCreateCount) {
    return;
  }

  let startTime = 0;

  if (emitter.config.whenPlayerInside) {
    const playerInside = isCurrentPlayerInsideEmitter(emitter, room, gameState);

    if (playerInside && state.playerInsideAtRoomTime === undefined) {
      state.playerInsideAtRoomTime = room.roomTime;
      state.lastEmittedAtRoomTime =
        room.roomTime + (state.delay ?? state.period) - state.period;
      state.quantityEmitted = 0;
    } else if (!playerInside && state.playerInsideAtRoomTime !== undefined) {
      state.playerInsideAtRoomTime = undefined;
    }

    if (state.playerInsideAtRoomTime === undefined) {
      return;
    }

    startTime = state.playerInsideAtRoomTime;
  }

  if (
    periodicItemShouldAct(
      {
        delay: state.delay,
        period: state.period,
        lastActedAtRoomTime: lastEmittedAtRoomTime,
      },
      room.roomTime,
      startTime,
    )
  ) {
    const maximumAtOnce = state.maximumAtOnce ?? Infinity;

    if (hasFewerThanInRoom(maximumAtOnce, emitterId, room)) {
      const recipe = chooseEmittableRecipe(
        state.emits,
        quantityEmitted,
        hashNumberToNumber0to1(emitter.hash + room.roomTime),
      );

      // we need to structured clone the emits recipe, otherwise we would be mutating
      // the emitter's config when we set the position for the emitted item, which would
      // likely fail if we loaded from the db via rtk query since it would be immutable
      // - we also later need to write appearanceRoomTime onto the config
      const emitsCloned = structuredClone(recipe) as JsonItemUnion<
        RoomId,
        RoomItemId,
        EmittableItemJson["type"]
      >;
      // temporary position, to be overwritten in item-in-play
      emitsCloned.position = originXyz;

      const [newlyEmittedItem] = loadItemFromJson(
        // by using room.roomTime, this emitter can be reset by switch/button
        // and emit another number 1, 2, etc - avoids id clashes so long as no
        // two are emitted at the same millisecond
        `${emitterId}-${quantityEmitted}-${Math.floor(room.roomTime)}` as RoomItemId,
        emitsCloned,
        room.roomJson,
        store.getState().gameInPlay.gameInPlay.planetsLiberated,
        buildRoomJsonDirectionalIndex(roomJsonItemsIterable(room.roomJson)),
      );
      if (newlyEmittedItem === undefined) {
        throw new Error("emitter failed to create a new item");
      }
      newlyEmittedItem.state.createdByEmitter = emitterId;
      if (newlyEmittedItem.type === "floatingText") {
        newlyEmittedItem.config.appearanceRoomTime = room.roomTime;
        newlyEmittedItem.state.expires = room.roomTime + 3_000;
      }

      newlyEmittedItem.state.box = emittedItemBox(
        emitter,
        newlyEmittedItem.state.box,
      );

      // recompute the hash from the final position plus roomTime, so items
      // emitted from one emitter (all sharing a spawn position) don't start
      // their animations in sync:
      newlyEmittedItem.hash = hashXyzToNumber0to1(
        newlyEmittedItem.state.box,
        room.roomTime,
      );

      // check if the emitted item would immediately collide - if so, skip it:
      if (!(
        !newlyEmittedItem[itemBehaviourKey].isNonSolid(newlyEmittedItem) &&
        hasCollisionItemWithIndex(
          newlyEmittedItem,
          room[roomSpatialIndexKey],
          (item) => !item[itemBehaviourKey].isNonSolid(item, newlyEmittedItem),
        )
      )) {
        addItemToRoom({
          room,
          item: newlyEmittedItem,
        });
        emitter.state.quantityEmitted++;
      }
    }

    // lost the chance to emit until the next period, even if already at the
    // maximum in the room at once limit
    emitter.state.lastEmittedAtRoomTime = room.roomTime;
  }
};
