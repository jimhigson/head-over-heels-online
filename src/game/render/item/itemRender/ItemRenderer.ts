import type { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
} from "../../Renderer";

export type ItemPixiRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> = Renderer<
  ItemRenderContext<T, RoomId, RoomItemId>,
  ItemTickContext<RoomId, RoomItemId>,
  Container
>;
