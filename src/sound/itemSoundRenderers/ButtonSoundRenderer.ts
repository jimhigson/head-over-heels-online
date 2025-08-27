import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class ButtonSoundRenderer implements ItemSoundRenderer<"button"> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #channelNode: GainNode = audioCtx.createGain();

  #currentRenderProps: { pressed: boolean } | undefined = undefined;

  constructor(public readonly renderContext: ItemSoundRenderContext<"button">) {
    this.#channelNode.connect(this.output);
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: { pressed },
        },
      },
    } = this;

    const currentSetting = this.#currentRenderProps?.pressed;

    if (currentSetting !== undefined && currentSetting !== pressed) {
      createAudioNode({
        soundId: "switchClick",
        playbackRate: pressed ? 0.95 : 1.05,
        connectTo: this.#channelNode,
      });
    }
    this.#currentRenderProps = { pressed };
  }

  destroy(): void {}
}
