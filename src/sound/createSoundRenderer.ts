import type { ItemInPlayType } from "../model/ItemInPlay";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";
import type {
  ItemSoundRenderer,
  ItemSoundRendererConstructableClass,
} from "./ItemSoundRenderer";
import { BallSoundRenderer } from "./itemSoundRenderers/BallSoundRenderer";
import { BubblesSoundRenderer } from "./itemSoundRenderers/BubblesSoundRenderer";
import { CharlesSoundRenderer } from "./itemSoundRenderers/CharlesSoundRenderer";
import { ConveyorSoundRenderer } from "./itemSoundRenderers/ConveyorSoundRenderer";
import { LiftSoundRenderer } from "./itemSoundRenderers/LiftSoundRenderer";
import { MonsterSoundRenderer } from "./itemSoundRenderers/MonsterSoundRenderer";
import { PlayableSoundRenderer } from "./itemSoundRenderers/PlayableSoundRenderer";
import { PortableBlockSoundRenderer } from "./itemSoundRenderers/PortableBlockSoundRenderer";
import { PushableBlockSoundRenderer } from "./itemSoundRenderers/PushableBlockSoundRenderer";
import { SpringSoundRenderer } from "./itemSoundRenderers/SpringSoundRenderer";
import { SwitchSoundRenderer } from "./itemSoundRenderers/SwitchSoundRenderer";
import { TeleporterSoundRenderer } from "./itemSoundRenderers/TeleporterSoundRenderer";

const rendererClasses: {
  [T in ItemInPlayType]?: ItemSoundRendererConstructableClass<T>;
} = {
  lift: LiftSoundRenderer,
  switch: SwitchSoundRenderer,
  bubbles: BubblesSoundRenderer,
  head: PlayableSoundRenderer,
  heels: PlayableSoundRenderer,
  headOverHeels: PlayableSoundRenderer,
  teleporter: TeleporterSoundRenderer,
  monster: MonsterSoundRenderer,
  conveyor: ConveyorSoundRenderer,
  spring: SpringSoundRenderer,
  portableBlock: PortableBlockSoundRenderer,
  charles: CharlesSoundRenderer,
  ball: BallSoundRenderer,
  pushableBlock: PushableBlockSoundRenderer,
};

export const createSoundRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
>(
  context: ItemSoundRenderContext<T, RoomId, RoomItemId>,
): ItemSoundRenderer<T, RoomId, RoomItemId> | undefined => {
  const ThisItemRendererClass = rendererClasses[context.item.type] as
    | ItemSoundRendererConstructableClass<T>
    | undefined;

  if (ThisItemRendererClass) {
    return new ThisItemRendererClass(context) as ItemSoundRenderer<
      T,
      RoomId,
      RoomItemId
    >;
  }
};
