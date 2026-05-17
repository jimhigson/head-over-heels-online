import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type EmittableItemJson } from "../../../model/json/ItemConfigMap";
import { roomJsonItemsIterable } from "../../../model/RoomJson";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import {
  addXyz,
  originXyz,
  productXyz,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import {
  collision2Items,
  hasCollisionItemWithIndex,
} from "../../collision/aabbCollision";
import { type GameState } from "../../gameState/GameState";
import { buildRoomJsonDirectionalIndex } from "../../gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { isSolid } from "../itemPredicates";
import { blockSizePx } from "../mechanicsConstants";
import { periodicItemShouldAct } from "./periodicItemShouldAct";

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
  const { lastEmittedAtRoomTime, quantityEmitted, position } = state;

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
      const { emits } = state;

      // we need to structured clone the emits recipe, otherwise we would be mutating
      // the emitter's config when we set the position for the emitted item, which would
      // likely fail if we loaded from the db via rtk query since it would be immutable
      // - we also later need to write appearanceRoomTime onto the config
      const emitsCloned = structuredClone(emits) as EmittableItemJson;
      // temporary position, to be overwritten in item-in-play
      emitsCloned.position = originXyz;

      const [newlyEmittedItem] = loadItemFromJson(
        // by using room.roomTime, this emitter can be reset by switch/button
        // and emit another number 1, 2, etc - avoids id clashes so long as no
        // two are emitted at the same millisecond
        `${emitterId}-${quantityEmitted}-${Math.floor(room.roomTime)}`,
        emitsCloned,
        room.roomJson,
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

      const emitOffset =
        emitter.config.offset ?
          productXyz({ ...originXyz, ...emitter.config.offset }, blockSizePx)
        : originXyz;

      newlyEmittedItem.state.position = subXyz(
        addXyz(position, emitOffset),
        scaleXyz(newlyEmittedItem.aabb, 0.5),
      );

      // check if the emitted item would immediately collide - if so, skip it:
      if (
        !(
          isSolid(newlyEmittedItem) &&
          hasCollisionItemWithIndex(
            newlyEmittedItem,
            room[roomSpatialIndexKey],
            (item) => isSolid(item, newlyEmittedItem),
          )
        )
      ) {
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
