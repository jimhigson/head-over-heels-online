import { type ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import { type GeneralRenderContext } from "../game/render/room/RoomRenderContexts";
import { type ItemInPlayType } from "../model/ItemInPlay";
import { type RoomState } from "../model/RoomState";

export type ItemSoundRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  general: GeneralRenderContext<string>;
  room: RoomState<string, string>;
};
