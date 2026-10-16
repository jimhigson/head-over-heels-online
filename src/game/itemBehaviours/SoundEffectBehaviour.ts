import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { nonRenderingItemFixedZIndex } from "../render/sortZ/fixedZIndexes";
import { NonSolidBehaviour } from "./NonSolidBehaviour";

/**
 * a sound that plays from a point in a room
 */
export class SoundEffectBehaviour extends NonSolidBehaviour {
  constructor() {
    super({
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  override soundsRequired<RoomId extends string, RoomItemId extends string>(
    soundEffect: ItemTypeUnion<"soundEffect", RoomId, RoomItemId>,
  ): readonly ExportedSoundId[] {
    return [soundEffect.config.soundOptions.soundId];
  }
}
