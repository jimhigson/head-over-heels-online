import { type CharacterName } from "../../../model/modelTypes";
import { type GameRootState } from "../../../store/store";
import { badJsonClone } from "../../../utils/badJsonClone";
import { valuesIter } from "../../../utils/entries";
import { pick } from "../../../utils/pick";
import { type GameState } from "../GameState";
import { deleteItemFromUnindexedRoom } from "../mutators/deleteItemFromRoom";
import { type SavedGame, savedGameStateFields } from "./SavedGameState";

export const createSavedGame = <RoomId extends string>(
  gameState: GameState<RoomId>,
  { gameInPlay: { gameInPlay } }: GameRootState,
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
    gameInPlay,
  } satisfies SavedGame);

  if (pickingUp) {
    const { characterPickingUp, pickupId } = pickingUp;

    const savedGameState = savedGame.gameState;

    const roomOfCharacterPickingUp =
      savedGameState.characterRooms[characterPickingUp];

    if (roomOfCharacterPickingUp === undefined) {
      throw new Error(
        "how are we saving from a pickup if the character picking up is not in any room?",
      );
    }

    const collectedRoomId = roomOfCharacterPickingUp.id;

    for (const room of valuesIter(savedGameState.characterRooms)) {
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
