import { isFreeItem, type ItemInPlay } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import { currentRoom, type GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";

export function springStandingOn<RoomId extends string>(
  springItem: ItemInPlay<"spring", PlanetName, RoomId>,
  gameState: GameState<RoomId>,
): MechanicResult<"spring"> {
  return {
    stateDelta: {
      stoodOn:
        iterate(objectValues(currentRoom(gameState).items)).find(
          (item) => isFreeItem(item) && item.state.standingOn === springItem,
        ) !== undefined,
    },
  };
}
