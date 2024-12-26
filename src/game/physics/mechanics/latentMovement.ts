import { type ItemInPlay } from "@/model/ItemInPlay";
import { type FreeItemTypes } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";

import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export function* latentMovement<RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
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
