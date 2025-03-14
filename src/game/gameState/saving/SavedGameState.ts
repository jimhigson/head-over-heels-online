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
  "pickupsCollected",
  "previousPlayable",
  "reincarnationPoint",
] as const;

/**
 * the fields from the game menus slice (which is really a catch-all)
 * that are serialised for a saved game
 */
export const savedGameGameMenuSliceFields = [
  "planetsLiberated",
  "scrollsRead",
] as const;

export type SavedGameState<RoomId extends string = string> = {
  saveTime: number;
  // only the original campaign is supported
  campaignId: "original";
  screenshotBase64: string;
  gameState: Pick<GameState<RoomId>, (typeof savedGameGameStateFields)[number]>;
  store: {
    [gameMenusSlice.reducerPath]: Pick<
      GameMenusState,
      (typeof savedGameGameMenuSliceFields)[number]
    >;
  };
};
