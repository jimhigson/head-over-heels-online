import type { GameState } from "../GameState";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";

export const selectCanCombine = <RoomId extends string>(
  gameState: GameState<RoomId>,
): boolean => {
  const head = selectPlayableItem(gameState, "head");
  const heels = selectPlayableItem(gameState, "heels");

  return (
    head !== undefined &&
    heels !== undefined &&
    head.state.action === "idle" &&
    heels.state.action === "idle" &&
    head.state.standingOnItemId === heels
  );
};
