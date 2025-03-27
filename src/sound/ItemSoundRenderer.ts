import type { ItemTickContext, Renderer } from "../game/render/Renderer";
import type { ItemInPlayType } from "../model/ItemInPlay";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";

export type ItemSoundRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> = Renderer<
  ItemSoundRenderContext<T, RoomId, RoomItemId>,
  ItemTickContext<RoomId, RoomItemId>,
  AudioNode
>;

/** impose a standard constructor on the class */
export type ItemSoundRendererConstructableClass<T extends ItemInPlayType> = {
  new <RoomId extends string, RoomItemId extends string>(
    renderContext: ItemSoundRenderContext<T, RoomId, RoomItemId>,
  ): ItemSoundRenderer<T, RoomId, RoomItemId>;
};
