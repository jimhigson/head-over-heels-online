import type { Renderer as PixiRenderer } from "pixi.js";
import type { RoomState } from "../../model/RoomState";
import type {
  DisplaySettings,
  SoundSettings,
} from "../../store/slices/gameMenusSlice";
import type { GameState } from "../gameState/GameState";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { Upscale } from "./calculateUpscale";

/** some context that most renderers need, to be composed into their contexts */
export type GeneralRenderContext<RoomId extends string> = {
  displaySettings: DisplaySettings;
  soundSettings: SoundSettings;
  pixiRenderer: PixiRenderer;
  gameState: GameState<RoomId>;
  paused: boolean;
  colourised: boolean;
  upscale: Upscale;
};

export type RoomRenderContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  room: RoomState<RoomId, RoomItemId>;
  general: GeneralRenderContext<RoomId>;
};

export type RoomTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  movedItems: MovedItems<RoomId, RoomItemId>;
  progression: number;
  deltaMS: number;
};
