import { first } from "iter-tools-es";

import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { EmittableItemJson } from "../../../model/json/ItemConfigMap";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";

import { originXyz, scaleXyz, subXyz } from "../../../utils/vectors/vectors";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";

export const emitting = <RoomId extends string, RoomItemId extends string>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { id: emitterId, state, config } = emitter;
  const { roomTime } = room;
  const { lastEmittedAtRoomTime, quantityEmitted, position } = state;

  // For these three values, go direct to the config as a fallback. This
  // helps for old saves from before these values were copied from config to
  // state for emitter
  // TODO: this was added 26th Aug 2025 - remove when sure no saves before this exist
  // and use from state directly
  const emits = state.emits ?? config.emits;
  const period = state.period ?? config.period;
  const maximum = state.maximum ?? config.maximum;

  // if maximum is null, this condition will never be satisfied
  if (quantityEmitted === maximum) {
    return;
  }

  if (lastEmittedAtRoomTime + period < roomTime) {
    const newlyEmittedItem = first(
      loadItemFromJson(
        // by using roomTime, this emitter can be reset by switch/button
        // and emit another number 1, 2, etc - avoids id clashes
        `${emitterId}-${quantityEmitted}-${roomTime}`,
        {
          ...emits,
          // temporary position, to be overwritten in item-im-play
          position: originXyz,
        } as EmittableItemJson,
        room.roomJson,
      ),
    );
    if (newlyEmittedItem === undefined) {
      throw new Error("emitter failed to create a new item");
    }
    addItemToRoom({
      room,
      item: newlyEmittedItem,
      atPosition: subXyz(position, scaleXyz(newlyEmittedItem.aabb, 0.5)),
    });
    emitter.state.lastEmittedAtRoomTime = room.roomTime + period;
    emitter.state.quantityEmitted++;
  }
};
