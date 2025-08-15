import type {
  gameMenusSlice,
  GameMenusState,
} from "../../../store/slices/gameMenusSlice";
import type { GameState } from "../GameState";

/**
 * the fields from the game state that are serialised for a saved game
 */
export const savedGameGameStateFields = [
  // TODO: this means the room json also goes in the save - hmmmm.
  "characterRooms",
  "currentCharacterName",
  "entryState",
  "gameTime",
  "progression",
  "pickupsCollected",
  "previousPlayable",
] as const;

export type SavedGameState<RoomId extends string = string> = {
  saveTime: number;
  gameState: Pick<GameState<RoomId>, (typeof savedGameGameStateFields)[number]>;
  store: {
    [gameMenusSlice.reducerPath]: Pick<GameMenusState, "gameInPlay">;
  };
};
