import type { Renderer as PixiRenderer } from "pixi.js";
import type { RoomState } from "../../model/RoomState";
import type {
  DisplaySettings,
  SoundSettings,
} from "../../store/slices/gameMenusSlice";
import type { GameState } from "../gameState/GameState";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { SetRequired } from "type-fest";
import type { Upscale } from "../../store/slices/upscale/upscaleSlice";

/** some context that most renderers need, to be composed into their contexts */
export type GeneralRenderContext<RoomId extends string> = {
  displaySettings: DisplaySettings;
  soundSettings: SoundSettings;
  pixiRenderer: PixiRenderer;
  /**
   * The state of the game currently being played.
   *
   * GameState is undefined if there isn't a current game in progress
   * - this would mean that the rendering is for the level editor
   */
  gameState?: Omit<GameState<RoomId>, "pickupsCollected" | "events">;
  paused: boolean;
  colourised: boolean;
  upscale: Upscale;
  /**
   * if true, we are rendering for the room editor. Otherwise, we are
   * in-game
   */
  editor: boolean;
};

export type RoomRenderContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  room: RoomState<RoomId, RoomItemId>;
  general: GeneralRenderContext<RoomId>;
};

/**
 * a context for room renderers that only exist while a game is running.
 * ie, don't exist in the level editor
 */
export type RoomRenderContextInGame<
  RoomId extends string,
  RoomItemId extends string,
> = {
  room: RoomState<RoomId, RoomItemId>;
  general: SetRequired<GeneralRenderContext<RoomId>, "gameState">;
};

export type RoomTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  movedItems: MovedItems<RoomId, RoomItemId>;
  progression: number;
  deltaMS: number;
};
