import { Application } from "pixi.js";
import { currentCharacter, GameState } from "./gameState/GameState";

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add((_time) => {
    const {
      inputState: { left, right, towards, away },
    } = gameState;

    const currentCharacterItem = currentCharacter(gameState).item;
    if (left) {
      currentCharacterItem.position.x++;
    } else if (right) {
      currentCharacterItem.position.x--;
    } else if (towards) {
      currentCharacterItem.position.y--;
    } else if (away) {
      currentCharacterItem.position.y++;
    }
    if (left || right || away || towards) {
      currentCharacterItem.events.emit("move");
    }
  });
};
