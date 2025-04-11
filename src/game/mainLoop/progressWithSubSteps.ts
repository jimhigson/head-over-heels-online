import type { RoomStateItems } from "../../model/RoomState";
import { emptyObject } from "../../utils/empty";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import type { MovedItems, ProgressGameState } from "./progressGameState";

const noItems = emptyObject as RoomStateItems<string, string>;

export const progressWithSubSteps =
  <RoomId extends string, RoomItemId extends string>(
    progress: ProgressGameState<RoomId, RoomItemId>,
    maxStepDeltaMs: number,
  ): ProgressGameState<RoomId, RoomItemId> =>
  (
    gameState: GameState<RoomId>,
    deltaMS: number,
  ): MovedItems<RoomId, RoomItemId> => {
    const timeProgressionDelta = deltaMS * gameState.gameSpeed;
    const numberOfSubTicks = Math.ceil(timeProgressionDelta / maxStepDeltaMs);

    if (numberOfSubTicks === 1) {
      // simple case of no stepping required
      return progress(gameState, timeProgressionDelta);
    }

    const stepDeltaMs = timeProgressionDelta / numberOfSubTicks;

    const movedItems = new Set() as MovedItems<RoomId, RoomItemId>;
    for (let i = 0; i < numberOfSubTicks; i++) {
      const subtickMoves = progress(gameState, stepDeltaMs);

      for (const m of subtickMoves) movedItems.add(m);
    }

    // remove from movedItems any items that no longer exist in the room
    // (as of the last sub-tick):
    const itemsAfterLastSubtick =
      selectCurrentRoomState(gameState)?.items ?? noItems;

    for (const m of movedItems) {
      if (itemsAfterLastSubtick[m.id] === undefined) {
        movedItems.delete(m);
      }
    }

    return movedItems;
  };
