import type { Renderer } from "pixi.js";
import type { SetRequired } from "type-fest";

import type { RoomState } from "../../../model/RoomState";
import type { SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type {
  DisplaySettings,
  SoundSettings,
  SpriteOption,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { GameState } from "../../gameState/GameState";
import type { MovedItems } from "../../mainLoop/progressGameState";
import type { DecorateItemRenderer } from "../item/itemRender/DecorateItemRenderer";

/** some context that most renderers need, to be composed into their contexts
 *
 * TODO: a lot of stuff in there from the store - would be cheaper to just
 * put the whole store state in
 */
export type GeneralRenderContext<RoomId extends string> = {
  displaySettings: DisplaySettings;
  soundSettings: SoundSettings;
  pixiRenderer: Renderer;
  /**
   * The state of the game currently being played.
   *
   * GameState is undefined if there isn't a current game in progress
   * - this would mean that the rendering is for the level editor
   */
  gameState?: Omit<GameState<RoomId>, "pickupsCollected">;
  paused: boolean;
  spriteOption: SpriteOption;
  spritesheetMeta: SpritesheetMetadata;
  upscale: Upscale;

  onScreenControls: boolean;
};

export type RoomRenderContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  room: RoomState<RoomId, RoomItemId>;
  general: GeneralRenderContext<RoomId>;
  /**
   * optional decorator applied when an item's renderer is first constructed —
   * used by eg, the level editor to inject annotation/selection overlays
   */
  wrapItemAppearanceRenderer?: DecorateItemRenderer;
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
  deltaMS: number;
};
