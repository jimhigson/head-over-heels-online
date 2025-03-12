import type { GameMenusState } from "../../store/slices/gameMenusSlice";
import type { GameState } from "./GameState";

export type SavedGameState = {
  saveTime: number;
  screenshotBase64: string;
} & Pick<
  GameState<string>,
  | "characterRooms"
  | "currentCharacterName"
  | "entryState"
  | "gameTime"
  | "pickupsCollected"
  | "previousPlayable"
> &
  Pick<GameMenusState, "planetsLiberated" | "scrollsRead">;
