import type { GameState } from "../gameState/GameState";
import { swopPlayables } from "../gameState/mutators/swopCharacters";

export const swopPlayablesIfInput = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { inputStateTracker } = gameState;

  if (inputStateTracker.currentActionPress("swop") === "tap") {
    swopPlayables(gameState);
  }
  if (inputStateTracker.currentActionPress("swop.head") === "tap") {
    swopPlayables(gameState, "head");
  }
  if (inputStateTracker.currentActionPress("swop.heels") === "tap") {
    swopPlayables(gameState, "heels");
  }
};
