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
import { EmitterSoundRenderer } from "./itemSoundRenderers/EmitterSoundRenderer";
import { FiredDoughnutSoundRenderer } from "./itemSoundRenderers/FiredDoughnutSoundRenderer";
import { FreeItemSoundRenderer } from "./itemSoundRenderers/generic/FreeItemSoundRenderer";
import { LiftSoundRenderer } from "./itemSoundRenderers/LiftSoundRenderer";
import { MonsterSoundRenderer } from "./itemSoundRenderers/MonsterSoundRenderer";
import { MovingPlatformSoundRenderer } from "./itemSoundRenderers/MovingPlatformSoundRenderer";
import { ParticleSoundRenderer } from "./itemSoundRenderers/ParticleSoundRenderer";
import { PlayableSoundRenderer } from "./itemSoundRenderers/PlayableSoundRenderer";
import { PushableBlockSoundRenderer } from "./itemSoundRenderers/PushableBlockSoundRenderer";
import { SlidingBlockSoundRenderer } from "./itemSoundRenderers/SlidingBlockSoundRenderer";
import { SlidingDeadlySoundRenderer } from "./itemSoundRenderers/SlidingDeadlySoundRenderer";
import { SoundEffectSoundRenderer } from "./itemSoundRenderers/SoundEffectSoundRenderer";
import { SpringSoundRenderer } from "./itemSoundRenderers/SpringSoundRenderer";
import { SwitchSoundRenderer } from "./itemSoundRenderers/SwitchSoundRenderer";
import { TeleporterSoundRenderer } from "./itemSoundRenderers/TeleporterSoundRenderer";
import { ToasterSoundRenderer } from "./itemSoundRenderers/ToasterSoundRenderer";

const rendererClasses: {
  [T in ItemInPlayType]?: ItemSoundRendererConstructableClass<T>;
} = {
  ball: BallSoundRenderer,
  bubbles: BubblesSoundRenderer,
  button: ButtonSoundRenderer,
  charles: CharlesSoundRenderer,
  conveyor: ConveyorSoundRenderer,
  emitter: EmitterSoundRenderer,
  firedDoughnut: FiredDoughnutSoundRenderer,
  head: PlayableSoundRenderer,
  headOverHeels: PlayableSoundRenderer,
  heels: PlayableSoundRenderer,
  lift: LiftSoundRenderer,
  monster: MonsterSoundRenderer,
  moveableDeadly: FreeItemSoundRenderer,
  movingPlatform: MovingPlatformSoundRenderer,
  particle: ParticleSoundRenderer,
  pickup: FreeItemSoundRenderer,
  portableBlock: FreeItemSoundRenderer,
  portableTeleporter:
    TeleporterSoundRenderer as ItemSoundRendererConstructableClass<"portableTeleporter">,
  pushableBlock: PushableBlockSoundRenderer,
  sceneryCrown: FreeItemSoundRenderer,
  sceneryPlayer: FreeItemSoundRenderer,
  slidingBlock: SlidingBlockSoundRenderer,
  slidingDeadly: SlidingDeadlySoundRenderer,
  soundEffect: SoundEffectSoundRenderer,
  spring: SpringSoundRenderer,
  switch: SwitchSoundRenderer,
  teleporter:
    TeleporterSoundRenderer as ItemSoundRendererConstructableClass<"teleporter">,
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
