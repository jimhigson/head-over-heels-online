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
  //const { inputState } = gameState;

  const stoodItem = room.items.find(
    (i): i is PlayableItem =>
      (i.type === "head" || i.type === "heels") &&
      i.state.standingOn === teleporter,
  );

  // if (stoodItem !== undefined && inputState.jump) {
  //   // this jump input is now handled - prevent immediate teleport back:
  //   // TODO: this can probably be removed when the teleportation animation is implemented
  //   inputState.jump = false;
  //   stoodItem.state.teleporting = {
  //     phase: "out",
  //     toRoom: teleporter.config.toRoom,
  //     timeRemaining: teleportTime,
  //   };
  //   //changeCharacterRoom(gameState, teleporter.config.toRoom);
  // }

  return {
    stateDelta: { flashing: !!stoodItem },
  };
}
