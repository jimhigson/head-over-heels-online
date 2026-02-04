import type { ItemInPlayType } from "../model/ItemInPlay";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";
import type {
  ItemSoundRenderer,
  ItemSoundRendererConstructableClass,
} from "./ItemSoundRenderer";

import { BallSoundRenderer } from "./itemSoundRenderers/BallSoundRenderer";
import { BubblesSoundRenderer } from "./itemSoundRenderers/BubblesSoundRenderer";
import { ButtonSoundRenderer } from "./itemSoundRenderers/ButtonSoundRenderer";
import { CharlesSoundRenderer } from "./itemSoundRenderers/CharlesSoundRenderer";
import { ConveyorSoundRenderer } from "./itemSoundRenderers/ConveyorSoundRenderer";
import { DrumSoundRenderer } from "./itemSoundRenderers/DrumSoundRenderer";
import { FiredDoughnutSoundRenderer } from "./itemSoundRenderers/FiredDoughnutSoundRenderer";
import { FreeItemSoundRenderer } from "./itemSoundRenderers/generic/FreeItemSoundRenderer";
import { LiftSoundRenderer } from "./itemSoundRenderers/LiftSoundRenderer";
import { MonsterSoundRenderer } from "./itemSoundRenderers/MonsterSoundRenderer";
import { MovingPlatformSoundRenderer } from "./itemSoundRenderers/MovingPlatformSoundRenderer";
import { PlayableSoundRenderer } from "./itemSoundRenderers/PlayableSoundRenderer";
import { PushableBlockSoundRenderer } from "./itemSoundRenderers/PushableBlockSoundRenderer";
import { SlidingBlockSoundRenderer } from "./itemSoundRenderers/SlidingBlockSoundRenderer";
import { SlidingDeadlySoundRenderer } from "./itemSoundRenderers/SlidingDeadlySoundRenderer";
import { SpringSoundRenderer } from "./itemSoundRenderers/SpringSoundRenderer";
import { SwitchSoundRenderer } from "./itemSoundRenderers/SwitchSoundRenderer";
import { TeleporterSoundRenderer } from "./itemSoundRenderers/TeleporterSoundRenderer";
import { ToasterSoundRenderer } from "./itemSoundRenderers/ToasterSoundRenderer";

const rendererClasses: {
  [T in ItemInPlayType]?: ItemSoundRendererConstructableClass<T>;
} = {
  lift: LiftSoundRenderer,
  switch: SwitchSoundRenderer,
  button: ButtonSoundRenderer,
  bubbles: BubblesSoundRenderer,
  head: PlayableSoundRenderer,
  heels: PlayableSoundRenderer,
  headOverHeels: PlayableSoundRenderer,
  teleporter: TeleporterSoundRenderer,
  monster: MonsterSoundRenderer,
  conveyor: ConveyorSoundRenderer,
  spring: SpringSoundRenderer,
  portableBlock: FreeItemSoundRenderer,
  charles: CharlesSoundRenderer,
  ball: BallSoundRenderer,
  pushableBlock: PushableBlockSoundRenderer,
  firedDoughnut: FiredDoughnutSoundRenderer,
  slidingBlock: SlidingBlockSoundRenderer,
  pickup: FreeItemSoundRenderer,
  movingPlatform: MovingPlatformSoundRenderer,
  moveableDeadly: FreeItemSoundRenderer,
  slidingDeadly: SlidingDeadlySoundRenderer,
  sceneryPlayer: FreeItemSoundRenderer,
  sceneryCrown: FreeItemSoundRenderer,
};

export const createSoundRenderer = <T extends ItemInPlayType>(
  renderContext: ItemSoundRenderContext<T>,
): ItemSoundRenderer<T> | undefined => {
  if (
    renderContext.item.type === "deadlyBlock" &&
    renderContext.item.config.style === "toaster"
  ) {
    return new ToasterSoundRenderer(
      renderContext as ItemSoundRenderContext<"deadlyBlock">,
    ) as ItemSoundRenderer<T>;
  }

  if (
    renderContext.item.type === "portableBlock" &&
    renderContext.item.config.style === "drum"
  ) {
    return new DrumSoundRenderer(
      renderContext as ItemSoundRenderContext<"portableBlock">,
    ) as ItemSoundRenderer<T>;
  }

  const ThisItemRendererClass = rendererClasses[renderContext.item.type] as
    | ItemSoundRendererConstructableClass<T>
    | undefined;

  if (ThisItemRendererClass) {
    return new ThisItemRendererClass(renderContext) as ItemSoundRenderer<T>;
  }
};
