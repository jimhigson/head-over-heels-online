import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../model/ItemInPlay";
import type { RoomState } from "../model/RoomState";
import type { SoundSettings } from "../store/slices/gameMenusSlice";

export type ItemSoundRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  soundSettings: SoundSettings;
  room: RoomState<string, string>;
};
