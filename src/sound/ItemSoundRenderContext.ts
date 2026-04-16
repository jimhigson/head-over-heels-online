import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { GameState } from "../game/gameState/GameState";
import type { ItemInPlayType } from "../model/ItemInPlay";
import type { RoomState } from "../model/RoomState";
import type { SoundSettings } from "../store/slices/gameMenus/gameMenusSlice";

export type ItemSoundRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  general: {
    soundSettings: SoundSettings;
    gameState?: Pick<GameState, "currentCharacterName">;
  };
  room: RoomState<string, string>;
};
