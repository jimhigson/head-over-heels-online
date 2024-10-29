import { Application } from "pixi.js";
import { currentCharacter, GameState } from "./gameState/GameState";
import { addXyz, directions, directionVectors } from "@/utils/vectors";

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add((_time) => {
    const { inputState } = gameState;

    const currentCharacterItem = currentCharacter(gameState).item;

    let directionPressed = false;
    dirs: for (const d of directions) {
      if (inputState[d] === true) {
        directionPressed = true;
        if (
          currentCharacterItem.state.facing !== d ||
          currentCharacterItem.state.movement !== "moving"
        ) {
          currentCharacterItem.state.facing = d;
          currentCharacterItem.state.movement = "moving";
          currentCharacterItem.events.emit("stateChange");
        }

        currentCharacterItem.position = addXyz(
          currentCharacterItem.position,
          directionVectors[d],
        );
        currentCharacterItem.events.emit("move");
        break dirs;
      }
    }
    if (!directionPressed) {
      if (currentCharacterItem.state.movement !== "idle") {
        currentCharacterItem.state.movement = "idle";
        currentCharacterItem.events.emit("stateChange");
      }
    }
  });
};
