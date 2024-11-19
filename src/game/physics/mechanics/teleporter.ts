import { itemFalls, type ItemInPlay } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { UnknownRoomState } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function teleporterStandingOn<RoomId extends string>(
  teleporter: ItemInPlay<"teleporter", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  return {
    stateDelta: {
      stoodOn:
        room.items.head?.state.standingOn === teleporter ||
        room.items.heels?.state.standingOn === teleporter,
    },
  };
}

export function springStandingOn<RoomId extends string>(
  springItem: ItemInPlay<"spring", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  return {
    stateDelta: {
      stoodOn:
        iterate(objectValues(room.items)).find(
          (item) => itemFalls(item) && item.state.standingOn === springItem,
        ) !== undefined,
    },
  };
}
