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
  /** the canvas element the game renders into */
  canvas: HTMLCanvasElement;
  /**
   * Mirror a live html element into the game's stage via the experimental
   * html-in-canvas API (pixi `HTMLSource`), so the top-level (crt) filters
   * apply to it. The element must be a direct child of {@link canvas}; it
   * stays interactive in the dom while its pixels are drawn by the game.
   * Only callable when {@link htmlInCanvasSupported} is true.
   *
   * @returns cleanup that removes the mirror sprite and its texture source
   */
  mirrorHtmlElement: (element: HTMLElement) => () => void;
  gameState: GameState<RoomId>;
  /**
   * Start a camera-rotation transition and immediately freeze it at `progress`
   * (0..1), so a specific point of the turn can be inspected/snapshotted. For
   * tests and debugging - the turn stays pinned until the hold is cleared.
   */
  _e2e_holdCameraTransition:
    | ((direction: "anticlockwise" | "clockwise", progress: number) => void)
    | undefined;
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
