import type { Campaign } from "../model/modelTypes";
import type { RoomState } from "../model/RoomState";
import type { Xy } from "../utils/vectors/vectors";
import type { GameState } from "./gameState/GameState";
import type { SavedGameState } from "./gameState/saving/SavedGameState";

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  resizeTo: (newSize: Xy) => void;
  /**
   * @returns the state for the room that is currently being viewed, or undefined if
   * none (game over)
   */
  currentRoom: RoomState<RoomId, string> | undefined;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  stop: () => void;
  reincarnateFrom: (gameState: SavedGameState<RoomId>) => void;
};
