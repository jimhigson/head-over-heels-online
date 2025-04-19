import { first } from "iter-tools";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItem";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import type { EmittableItemJson } from "../../../model/json/ItemConfigMap";
import { originXyz, scaleXyz, subXyz } from "../../../utils/vectors/vectors";

export const emitting = <RoomId extends string, RoomItemId extends string>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const {
    id: emitterId,
    state: { lastEmittedAtRoomTime, quantityEmitted, position },
    config: { emits, period, maximum },
  } = emitter;
  const { roomTime } = room;

  // if maximum is null, this condition will never be satisfied
  if (quantityEmitted === maximum) {
    return;
  }

  if (lastEmittedAtRoomTime + period < roomTime) {
    const newlyEmittedItem = first(
      loadItemFromJson(
        `${emitterId}-${quantityEmitted}`,
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
    newlyEmittedItem.state.position = subXyz(
      position,
      scaleXyz(newlyEmittedItem.aabb, 0.5),
    );
    addItemToRoom({ room, item: newlyEmittedItem });
    emitter.state.lastEmittedAtRoomTime = room.roomTime + period;
    emitter.state.quantityEmitted++;
  }
};
