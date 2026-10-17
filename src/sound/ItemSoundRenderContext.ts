import { type ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import { type GeneralRenderContext } from "../game/render/room/RoomRenderContexts";
import { type ItemInPlayType } from "../model/ItemInPlay";
import { type RoomState } from "../model/RoomState";

export type ItemSoundRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  /** only the parts of the general render context that sound needs */
  general: Pick<
    GeneralRenderContext<string>,
    "cameraAngle" | "gameState" | "soundSettings"
  >;
  room: RoomState<string, string>;
};
