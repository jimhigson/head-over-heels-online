import { type Campaign } from "../model/modelTypes";
import { type RoomState } from "../model/RoomState";
import { type Xy } from "../utils/vectors/vectors";
import { type GameState } from "./gameState/GameState";
import { type SavedGame } from "./gameState/saving/SavedGameState";

export type GameApi<RoomId extends string = string> = {
  campaign: Campaign<RoomId>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  resizeTo: (newSize: Xy, rot90: boolean) => void;
  /**
   * @returns the state for the room that is currently being viewed, or undefined if
   * none (game over)
   */
  currentRoom: RoomState<RoomId, string> | undefined;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  stop: () => void;
  reincarnateFrom: (gameState: SavedGame<RoomId>) => void;
  /**
   * Simulate a transient WebGL context loss: drop the gpu context, then restore
   * it 500ms later via the WEBGL_lose_context extension, mimicking a real driver
   * reset or tab reclaim the browser recovers from. Used by the cheats panel to
   * observe how the game copes with losing and regaining the WebGL context.
   */
  loseWebGlContext: () => void;
};
