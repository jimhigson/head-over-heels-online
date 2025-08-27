import type { EmptyObject } from "type-fest";

import type { ItemInPlayType } from "../model/ItemInPlay";
import type { PlayableActionState } from "../model/ItemStateMap";

export type ItemSoundRenderProps<T extends ItemInPlayType> =
  T extends keyof ItemSoundRenderPropsMap ? ItemSoundRenderPropsMap[T]
  : EmptyObject;
type ItemSoundRenderPropsMap = {
  head: { action: PlayableActionState };
  heels: { action: PlayableActionState };
  headOverHeels: { action: PlayableActionState };
  teleporter: { stoodOnByPlayer: boolean };
};
