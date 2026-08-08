import { type CharacterName } from "../../model/modelTypes";
import { playablesInRoom, type RoomStateItems } from "../../model/RoomState";
import { emptyObject } from "../../utils/empty";
import { valuesIter } from "../../utils/entries";
import { type GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { type PlayableItem } from "../physics/itemPredicates";
import {
  type MovedOrResizedItems,
  type ProgressGameState,
} from "./progressGameState";
import { swopPlayablesIfInput } from "./swopPlayablesIfInput";

const noItems = emptyObject as RoomStateItems<string, string>;

export const progressWithSubTicks =
  <RoomId extends string, RoomItemId extends string>(
    progress: ProgressGameState<RoomId, RoomItemId>,
    maxStepDeltaMs: number,
  ): ProgressGameState<RoomId, RoomItemId> =>
  (
    gameState: GameState<RoomId>,
    deltaMS: number,
  ): MovedOrResizedItems<RoomId, RoomItemId> => {
    /*
      swopping needs to be done outside of the sub-ticks - since it isn't
      possible to change the input between sub-steps, the most it can be
      done is once per tick
    */
    const movedOrResizedItems = new Set() as MovedOrResizedItems<
      RoomId,
      RoomItemId
    >;

    const swapped = swopPlayablesIfInput(gameState);

    /* swapping can introduce new items into the room - if we swop, mark
       all playables in the room as having moved, since they are likely
       to be new, and were introduced outside of the sub-tick, so the sub-tick
       won't include them in its moved items set */
    if (swapped) {
      const roomItemsAfterSwop = selectCurrentRoomState<RoomId, RoomItemId>(
        gameState,
      )?.items;
      if (roomItemsAfterSwop !== undefined) {
        const playablesIter = valuesIter(
          playablesInRoom(roomItemsAfterSwop),
        ).filter((p) => p !== undefined);

        for (const playable of playablesIter) {
          movedOrResizedItems.add(
            playable as PlayableItem<CharacterName, RoomId, RoomItemId>,
          );
        }
      }
    }

    const numberOfSubTicks = Math.max(1, Math.ceil(deltaMS / maxStepDeltaMs));

    const stepDeltaMs = deltaMS / numberOfSubTicks;

    for (let i = 0; i < numberOfSubTicks; i++) {
      const subtickMoves = progress(gameState, stepDeltaMs);

      for (const item of subtickMoves) {
        movedOrResizedItems.add(item);
      }
    }

    // remove from movedOrResizedItems any items that no longer exist in the room
    // (as of the last sub-tick):
    const itemsAfterLastSubtick =
      selectCurrentRoomState(gameState)?.items ?? noItems;

    for (const m of movedOrResizedItems) {
      if (itemsAfterLastSubtick[m.id] === undefined) {
        movedOrResizedItems.delete(m);
      }
    }

    return movedOrResizedItems;
  };
