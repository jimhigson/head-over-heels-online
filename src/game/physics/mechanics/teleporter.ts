import type { ItemInPlay } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { UnknownRoomState } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function teleporter<RoomId extends string>(
  teleporter: ItemInPlay<"teleporter", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  return {
    stateDelta: {
      flashing:
        room.items.head?.state.standingOn === teleporter ||
        room.items.heels?.state.standingOn === teleporter,
    },
  };
}
