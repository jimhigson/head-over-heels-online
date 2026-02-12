import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { connectWithGain } from "../soundUtils/connectWithGain";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { stopWithFade } from "../soundUtils/stopWithFade";

/** plays the sound given by the item's config.soundId */
export class SoundEffectSoundRenderer
  implements ItemSoundRenderer<"soundEffect">
{
  public readonly output: GainNode = audioCtx.createGain();
  #source: AudioBufferSourceNode | undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"soundEffect">,
  ) {
    const {
      item: { state },
    } = renderContext;

    if (state.played === false) {
      this.#source = createAudioNode(renderContext.item.config.soundOptions);
      connectWithGain(
        this.#source,
        renderContext.item.config.soundOptions,
        this.output,
      );
      state.played = true;
    }
  }

  tick(_tickContext: ItemTickContext) {}

  destroy(): void {
    if (this.#source !== undefined) {
      stopWithFade(this.#source, this.output);
    }
  }
}
