import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../model/ItemInPlay";
import type { RoomState } from "../model/RoomState";

export type ItemSoundRenderContext<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> = {
  item: ItemTypeUnion<T, RoomId, RoomItemId>;
  room: RoomState<RoomId, RoomItemId>;
};
