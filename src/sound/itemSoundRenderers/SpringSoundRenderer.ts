import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isStoodOn } from "../../model/StoodOnBy";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class SpringSoundRenderer implements ItemSoundRenderer<"spring"> {
  public readonly output: GainNode = audioCtx.createGain();

  #currentRenderProps: { stoodOn: boolean } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"spring">,
  ) {}

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;
    const currentlyStoodOn = this.#currentRenderProps?.stoodOn ?? false;
    const stoodOn = isStoodOn(stoodOnBy);

    if (currentlyStoodOn && !stoodOn) {
      createAudioNode({
        soundId: "springBoing",
        connectTo: this.output,
      });
    }

    this.#currentRenderProps = { stoodOn };
  }

  destroy(): void {}
}
