import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import { type FreeItemTypes } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export function* latentMovement<
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemInPlay<FreeItemTypes, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): Generator<MechanicResult<FreeItemTypes, RoomId, RoomItemId>> {
  while (
    (item.state.latentMovement.at(0)?.moveAtRoomTime ??
      Number.POSITIVE_INFINITY) < room.roomTime
  ) {
    const { positionDelta } = item.state.latentMovement.shift()!;
    yield { movementType: "position", posDelta: positionDelta };
  }
}
