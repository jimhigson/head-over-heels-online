import { type Renderer } from "pixi.js";
import { type SetRequired } from "type-fest";

import { type RoomState } from "../../../model/RoomState";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type SpritesheetVariants } from "../../../sprites/spritesheet/variants/SpritesheetVariants";
import { type Upscale } from "../../../store/slices/upscale/Upscale";
import {
  type DisplaySettings,
  type SoundSettings,
  type SpriteOption,
} from "../../../store/slices/userSettings/userSettingsSlice";
import { type Xy } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { type MovedOrResizedItems } from "../../mainLoop/progressGameState";

/**
 * some context that most renderers need, to be composed into their contexts
 */
export type GeneralRenderContext<RoomId extends string> = {
  displaySettings: DisplaySettings;
  soundSettings: SoundSettings;
  pixiRenderer: Renderer;
  /**
   * The state of the game currently being played.
   *
   * GameState is undefined if there isn't a current game in progress
   * - this would mean that the rendering is for the level editor.
   *
   * The Omit is a workaround for generic variance: pickupsCollected
   * has deeply nested RoomId that makes GameState<RoomId> invariant,
   * causing errors where renderers pass GameState<string>. Removing
   * the Omit requires fixing the variance in GameState/pickupsCollected.
   */
  gameState?: Omit<GameState<RoomId>, "pickupsCollected">;
  paused: boolean;
  spriteOption: SpriteOption;
  spritesheetMeta: SpritesheetMetadata;
  upscale: Upscale;
  /** the 90°-increment camera rotation as a (cos,sin) unit vector */
  cameraAngle: Xy;

  onScreenControls: boolean;
  /** game speed multiplier for the current frame — 0 when paused, <1 during slow-motion (e.g. death animation) */
  speedCoefficient: number;
  spritesheetVariants: SpritesheetVariants;
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
  movedOrResizedItems: MovedOrResizedItems<RoomId, RoomItemId>;
  deltaMS: number;
};
