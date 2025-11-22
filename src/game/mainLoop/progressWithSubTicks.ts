import { objectValues } from "iter-tools-es";
import { Ticker } from "pixi.js";

import type { CharacterName } from "../../model/modelTypes";
import type { GameState } from "../gameState/GameState";
import type { PlayableItem } from "../physics/itemPredicates";
import type { MovedItems, ProgressGameState } from "./progressGameState";

import { playablesInRoom, type RoomStateItems } from "../../model/RoomState";
import { emptyObject } from "../../utils/empty";
import { iterate } from "../../utils/iterate";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
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
  ): MovedItems<RoomId, RoomItemId> => {
    /* 
      swopping needs to be done outside of the sub-ticks - since it isn't
      possible to change the input between sub-steps, the most it can be
      done is once per tick
    */
    const movedItems = new Set() as MovedItems<RoomId, RoomItemId>;

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
        const playablesIter = iterate(
          objectValues(playablesInRoom(roomItemsAfterSwop)),
        ).filter((p) => p !== undefined);

        for (const playable of playablesIter) {
          movedItems.add(
            playable as PlayableItem<CharacterName, RoomId, RoomItemId>,
          );
        }
      }
    }

    const tickerSpeed = Ticker.shared.speed;
    const numberOfSubTicks =
      // snapshot tests run at a gamespeed of 0 - in any case, at this speed nothing is happening
      // so one tick is enough. Otherwise, it would run progressing at steps of the maxStepDeltaMs
      // which at the reduced frame rate for snapshot tests is a lot of frames
      tickerSpeed === 0 ? 1 : Math.max(1, Math.ceil(deltaMS / maxStepDeltaMs));

    const stepDeltaMs = deltaMS / numberOfSubTicks;

    for (let i = 0; i < numberOfSubTicks; i++) {
      const subtickMoves = progress(gameState, stepDeltaMs);

      for (const m of subtickMoves) {
        movedItems.add(m);
      }
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
