import { type Container } from "pixi.js";

import { type RoomRenderContext } from "./RoomRenderContexts";

export type DecorateRoomRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderContext: RoomRenderContext<RoomId, RoomItemId>,
) => Container | undefined;
