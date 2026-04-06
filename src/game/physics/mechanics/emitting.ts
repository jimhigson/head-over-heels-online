import { first } from "iter-tools-es";

import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { EmittableItemJson } from "../../../model/json/ItemConfigMap";
import type { GameState } from "../../gameState/GameState";

import { iterateRoomItems, type RoomState } from "../../../model/RoomState";
import { originXyz, scaleXyz, subXyz } from "../../../utils/vectors/vectors";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";

const hasFewerThanInRoom = <RoomId extends string, RoomItemId extends string>(
  limit: number,
  emitterId: RoomItemId,
  room: RoomState<RoomId, RoomItemId>,
): boolean => {
  let count = 0;
  for (const item of iterateRoomItems(room.items)) {
    if (item.state.createdByEmitter === emitterId) {
      count++;
      if (count >= limit) {
        return false;
      }
    }
  }
  return true;
};

export const emitting = <RoomId extends string, RoomItemId extends string>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
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

  const delay = state.delay ?? 0;

  const { roomTime } = room;
  if (roomTime < delay) {
    return;
  }

  const { period } = state;

  if (lastEmittedAtRoomTime + period < roomTime) {
    const maximumAtOnce = state.maximumAtOnce ?? Infinity;

    if (hasFewerThanInRoom(maximumAtOnce, emitterId, room)) {
      const { emits } = state;

      const newlyEmittedItem = first(
        loadItemFromJson(
          // by using roomTime, this emitter can be reset by switch/button
          // and emit another number 1, 2, etc - avoids id clashes so long as no
          // two are emitted at the same millisecond
          `${emitterId}-${quantityEmitted}-${Math.floor(roomTime)}`,
          {
            ...emits,
            // temporary position, to be overwritten in item-in-play
            position: originXyz,
          } as EmittableItemJson,
          room.roomJson,
        ),
      );
      if (newlyEmittedItem === undefined) {
        throw new Error("emitter failed to create a new item");
      }
      newlyEmittedItem.state.createdByEmitter = emitterId;
      addItemToRoom({
        room,
        item: newlyEmittedItem,
        atPosition: subXyz(position, scaleXyz(newlyEmittedItem.aabb, 0.5)),
      });
      emitter.state.quantityEmitted++;
    }

    // lost the chance to emit until the next period, even if already at the
    // maximum in the room at once limit
    emitter.state.lastEmittedAtRoomTime = room.roomTime;
  }
};
