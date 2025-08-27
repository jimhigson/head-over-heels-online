import type { RootState } from "../../../store/store";
import type { GameState } from "../GameState";

import { badJsonClone } from "../../../utils/badJsonClone";
import { pick } from "../../../utils/pick";
import { deleteItemFromRoom } from "../mutators/deleteItemFromRoom";
import {
  savedGameGameStateFields,
  type SavedGameState,
} from "./SavedGameState";

export const createSavedGame = <RoomId extends string>(
  gameState: GameState<RoomId>,
  storeState: RootState,
  /**
   * if saving due to a pickup (creating a reincarnation point by eating a fish),
   * this is the id of the pickup. It will be removed from the current room of
   * the saved game
   */
  pickupId?: string,
): SavedGameState => {
  const reincarnationPoint: SavedGameState = badJsonClone({
    saveTime: Date.now(),
    gameState: pick(gameState, ...savedGameGameStateFields),
    store:
      // a deep-pick of just one object from the store - none others are needed
      // currently but could potentially be added later:
      {
        gameMenus: { gameInPlay: storeState.gameMenus.gameInPlay },
      },
  } satisfies SavedGameState);

  if (pickupId !== undefined) {
    // TODO1: add test for case of removing properly
    // TODO: use deleteItemFromRoom instead of this

    const savedGameState = reincarnationPoint.gameState;
    const savedCurrentRoom =
      savedGameState.characterRooms[savedGameState.currentCharacterName];
    if (!savedCurrentRoom) {
      throw new Error(
        "how are we saving from a pickup if there is no current room?",
      );
    }
    deleteItemFromRoom({
      room: savedCurrentRoom,
      item: savedCurrentRoom.items[pickupId],
    });
  }

  return reincarnationPoint;
};
