import type { GameState } from "../GameState";

import { spatiallyCheckStandingOn } from "../../collision/checkStandingOn";
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
    (head.state.standingOnItemId === "heels" ||
      // may not have the game's standing on state set, but be positioned above,
      // such as if the standing on is a type='block' next to heels that head landed on
      // that took his standingOn slot, but he is overhanging Heels
      spatiallyCheckStandingOn(head, heels))
  );
};
