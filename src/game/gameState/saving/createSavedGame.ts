import { objectValues } from "iter-tools-es";

import type { CharacterName } from "../../../model/modelTypes";
import type { RootState } from "../../../store/store";
import type { GameState } from "../GameState";

import { badJsonClone } from "../../../utils/badJsonClone";
import { pick } from "../../../utils/pick";
import { deleteItemFromUnindexedRoom } from "../mutators/deleteItemFromRoom";
import { type SavedGame, savedGameStateFields } from "./SavedGameState";

export const createSavedGame = <RoomId extends string>(
  gameState: GameState<RoomId>,
  storeState: RootState,
  /**
   * if saving due to a pickup (creating a reincarnation point by eating a fish),
   * this is the id of the pickup. It will be removed from the current room of
   * the saved game
   */
  pickingUp?: {
    pickupId: string;
    characterPickingUp: CharacterName;
  },
): SavedGame => {
  const savedGame: SavedGame = badJsonClone({
    saveTime: Date.now(),
    gameState: pick(gameState, ...savedGameStateFields),
    store:
      // a deep-pick of just one object from the store - none others are needed
      // currently but could potentially be added later:
      {
        gameMenus: { gameInPlay: storeState.gameMenus.gameInPlay },
      },
  } satisfies SavedGame);

  if (pickingUp) {
    const { characterPickingUp, pickupId } = pickingUp;

    // TODO1: add test for case of removing properly
    // TODO: use deleteItemFromRoom instead of this

    const savedGameState = savedGame.gameState;

    const roomOfCharacterPickingUp =
      savedGameState.characterRooms[characterPickingUp];

    if (roomOfCharacterPickingUp === undefined) {
      throw new Error(
        "how are we saving from a pickup if the character picking up is not in any room?",
      );
    }

    const collectedRoomId = roomOfCharacterPickingUp.id;

    for (const room of objectValues(savedGameState.characterRooms)) {
      // note we may have to remove the item from multiple copies of the same room,
      // since serialising to json will convert multiple references to the same object
      // into multiple copies of that object
      if (room.id === collectedRoomId) {
        deleteItemFromUnindexedRoom({
          room,
          item: room.items[pickupId],
        });
      }
    }
  }

  return savedGame;
};
