import { ItemInPlay } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { UnknownRoomState } from "@/model/modelTypes";
import { GameState } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "@/game/gameState/changeCharacterRoom";
import { PlanetName } from "@/sprites/planets";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function teleporter<RoomId extends string>(
  teleporter: ItemInPlay<"teleporter", PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  const { inputState } = gameState;

  const stoodOn =
    room.items.find(
      (i) =>
        (i.type === "head" || i.type === "heels") &&
        i.state.standingOn === teleporter,
    ) !== undefined;

  if (stoodOn && inputState.jump) {
    // this jump input is now handled - prevent immediate teleport back:
    // TODO: this can probably be removed when the teleportation animation is implemented
    inputState.jump = false;
    changeCharacterRoom(gameState, teleporter.config.toRoom);
  }

  return {
    stateDelta: { flashing: !!stoodOn },
  };
}
