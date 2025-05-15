import type { SetRequired } from "type-fest";
import type { Renderer } from "./Renderer";
import type { RoomRenderContext, RoomTickContext } from "./RoomRenderContexts";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

/** the common type that both the RoomRenderer and the RoomScrollRenderer implement */
export type RoomRendererType<
  RoomId extends string,
  RoomItemId extends string,
> = Renderer<
  RoomRenderContext<RoomId, RoomItemId>,
  RoomTickContext<RoomId, RoomItemId>,
  SetRequired<SoundAndGraphicsOutput, "graphics">
>;
