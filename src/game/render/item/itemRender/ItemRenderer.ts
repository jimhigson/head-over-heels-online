import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
} from "../../Renderer";

export type ItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemid extends string,
> = Renderer<
  ItemRenderContext<T, RoomId, RoomItemid>,
  ItemTickContext<RoomId, RoomItemid>
>;
