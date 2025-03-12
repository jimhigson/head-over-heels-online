import type { SimplifyDeep } from "type-fest";
import type { GameMenusState } from "../../store/slices/gameMenusSlice";
import type { GameState } from "./GameState";

/**
 * the fields from the game state that are serialised for a saved game
 */
export const savedGameGameStateFields = [
  "characterRooms",
  "currentCharacterName",
  "entryState",
  "gameTime",
  "pickupsCollected",
  "previousPlayable",
] as const;

/**
 * the fields from the game menus slice (which is really a catch-all)
 * that are serialised for a saved game
 */
export const savedGameGameMenuSliceFields = [
  "planetsLiberated",
  "scrollsRead",
] as const;

export type SavedGameState = SimplifyDeep<
  {
    saveTime: number;
    screenshotBase64: string;
  } & Pick<GameState<string>, (typeof savedGameGameStateFields)[number]> &
    Pick<GameMenusState, (typeof savedGameGameMenuSliceFields)[number]>
>;
