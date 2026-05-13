import type { GameState } from "../gameState/GameState";

import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { swopPlayables } from "../gameState/mutators/swopPlayables";

export const swopPlayablesIfInput = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (selectCurrentPlayableItem(gameState)?.state.action === "death") {
    return false;
  }

  const { inputStateTracker } = gameState;

  if (inputStateTracker.currentActionPress("swop") === "tap") {
    swopPlayables(gameState);
    return true;
  }
  if (inputStateTracker.currentActionPress("swop.head") === "tap") {
    swopPlayables(gameState, "head");
    return true;
  }
  if (inputStateTracker.currentActionPress("swop.heels") === "tap") {
    swopPlayables(gameState, "heels");
    return true;
  }
  return false;
};
