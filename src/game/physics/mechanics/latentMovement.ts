import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { GameState } from "../../gameState/GameState";
import { type FreeItemTypes } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export function* latentMovement<RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, SceneryName, RoomId>,
  room: RoomState<SceneryName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): Generator<MechanicResult<FreeItemTypes, RoomId>> {
  while (
    (item.state.latentMovement.at(0)?.moveAtRoomTime ??
      Number.POSITIVE_INFINITY) < room.roomTime
  ) {
    const { positionDelta } = item.state.latentMovement.shift()!;
    yield { movementType: "position", posDelta: positionDelta };
  }
}
