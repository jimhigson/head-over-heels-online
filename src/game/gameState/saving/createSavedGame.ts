import type { RootState } from "../../../store/store";
import { pick } from "../../../utils/pick";
import type { GameState } from "../GameState";
import { badJsonClone } from "../../../utils/badJsonClone";
import {
  savedGameGameMenuSliceFields,
  savedGameGameStateFields,
  type SavedGameState,
} from "./SavedGameState";
import { deleteItemFromRoom } from "../mutators/deleteItemFromRoom";

export const createSavedGame = <RoomId extends string>(
  gameState: GameState<RoomId>,
  storeState: RootState,
  /**
   * if saving due to a pickup (creating a reincarnation point by eating a fish),
   * this is the id of the pickup. It will be removed from the saved room
   */
  pickupId?: string,
): SavedGameState => {
  const reincarnationPoint: SavedGameState = badJsonClone({
    saveTime: Date.now(),
    screenshotBase64: "IAMANIMAGE",
    campaignId: "original",
    gameState: pick(gameState, ...savedGameGameStateFields),
    store: {
      gameMenus: pick(storeState.gameMenus, ...savedGameGameMenuSliceFields),
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
