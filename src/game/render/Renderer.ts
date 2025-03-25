import type { MovedItems } from "../mainLoop/progressGameState";
import type { DisplaySettings } from "../../store/slices/gameMenusSlice";
import type { RoomState } from "../../model/RoomState";
import type { GameState } from "../gameState/GameState";

import type { Renderer as PixiRenderer } from "pixi.js";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { Upscale } from "./calculateUpscale";

export type RoomRenderContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  displaySettings: DisplaySettings;
  gameState: GameState<RoomId>;
  room: RoomState<RoomId, RoomItemId>;
  paused: boolean;
  colourised: boolean;
  pixiRenderer: PixiRenderer;
  upscale: Upscale;
};

export type RoomTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  movedItems: MovedItems<RoomId, RoomItemId>;
  progression: number;
  deltaMS: number;
};

export type ItemTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = RoomTickContext<RoomId, RoomItemId>;

export type ItemRenderContext<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> = RoomRenderContext<RoomId, RoomItemId> & {
  item: ItemTypeUnion<T, RoomId, RoomItemId>;
};

export interface Renderer<
  RenderContext extends object,
  TickContext extends object,
  /** the thing rendered to, for example a pixi Container */
  Output,
> {
  tick(tickContext: TickContext): void;
  destroy(): void;
  output: Output;
  /** get the unchanging render context for this renderer */
  readonly renderContext: RenderContext;
}
