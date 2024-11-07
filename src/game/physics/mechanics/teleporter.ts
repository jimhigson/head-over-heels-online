import { ItemInPlay, PlayableItem } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { UnknownRoomState } from "@/model/modelTypes";
import { GameState } from "@/game/gameState/GameState";
import { PlanetName } from "@/sprites/planets";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function teleporter<RoomId extends string>(
  teleporter: ItemInPlay<"teleporter", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  const stoodItem = room.items.find(
    (i): i is PlayableItem =>
      (i.type === "head" || i.type === "heels") &&
      i.state.standingOn === teleporter,
  );

  return {
    stateDelta: { flashing: !!stoodItem },
  };
}
