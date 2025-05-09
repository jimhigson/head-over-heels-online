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
import { FiredDoughnutSoundRenderer } from "./itemSoundRenderers/FiredDoughnutSoundRenderer";
import { SlidingBlockSoundRenderer } from "./itemSoundRenderers/SlidingBlockSoundRenderer";

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
  firedDoughnut: FiredDoughnutSoundRenderer,
  slidingBlock: SlidingBlockSoundRenderer,
};

export const createSoundRenderer = <T extends ItemInPlayType>(
  renderContext: ItemSoundRenderContext<T>,
): ItemSoundRenderer<T> | undefined => {
  const ThisItemRendererClass = rendererClasses[renderContext.item.type] as
    | ItemSoundRendererConstructableClass<T>
    | undefined;

  if (ThisItemRendererClass) {
    return new ThisItemRendererClass(renderContext) as ItemSoundRenderer<T>;
  }
};
