import type { SetRequired } from "type-fest";
import type { Renderer } from "./Renderer";
import type {
  RoomRenderContext,
  RoomRenderContextInGame,
  RoomTickContext,
} from "./RoomRenderContexts";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

/**
 * the type that RoomRenderer implements;
 * can be in-game or in-editor
 */
export type RoomRendererType<
  RoomId extends string,
  RoomItemId extends string,
> = Renderer<
  RoomRenderContext<RoomId, RoomItemId>,
  RoomTickContext<RoomId, RoomItemId>,
  SetRequired<SoundAndGraphicsOutput, "graphics">
>;

/** type of room renderers that don't support the level editor */
export type RoomRendererTypeInGameOnly<
  RoomId extends string,
  RoomItemId extends string,
> = Renderer<
  RoomRenderContextInGame<RoomId, RoomItemId>,
  RoomTickContext<RoomId, RoomItemId>,
  SetRequired<SoundAndGraphicsOutput, "graphics">
>;
