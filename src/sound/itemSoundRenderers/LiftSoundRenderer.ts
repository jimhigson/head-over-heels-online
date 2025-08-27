import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

const dopplerSensitivity = 3;

export class LiftSoundRenderer implements ItemSoundRenderer<"lift"> {
  public readonly output: GainNode = audioCtx.createGain();

  #channelSource = createAudioNode({
    soundId: "helicopter",
    loop: true,
    connectTo: this.output,
  } as const);

  constructor(public readonly renderContext: ItemSoundRenderContext<"lift">) {
    // this sound is often in the background for a long time so make it not too loud:
    this.output.gain.value = 0.7;
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: {
            vels: {
              lift: { z: liftZVelocity },
            },
          },
        },
      },
    } = this;

    this.#channelSource.playbackRate.value = Math.max(
      0.5,
      1 + dopplerSensitivity * liftZVelocity,
    );
  }

  destroy(): void {}
}
