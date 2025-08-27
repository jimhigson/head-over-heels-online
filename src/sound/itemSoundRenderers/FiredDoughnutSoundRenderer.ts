import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class FiredDoughnutSoundRenderer
  implements ItemSoundRenderer<"firedDoughnut">
{
  public readonly output: GainNode = audioCtx.createGain();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"firedDoughnut">,
  ) {
    createAudioNode({
      soundId: "hooter",
      connectTo: this.output,
    });
  }

  tick() {}

  destroy(): void {}
}
