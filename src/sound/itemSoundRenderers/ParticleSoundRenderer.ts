import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class ParticleSoundRenderer implements ItemSoundRenderer<"particle"> {
  public readonly output: GainNode = audioCtx.createGain();

  readonly renderContext: ItemSoundRenderContext<"particle">;

  constructor(renderContext: ItemSoundRenderContext<"particle">) {
    this.renderContext = renderContext;
    const {
      item: {
        //id,
        config: { forCharacter },
      },
    } = renderContext;

    const isCrown = forCharacter === "crown";

    if (!isCrown /* && hashStringToNumber0to1(id) < 0.7*/) {
      // disabling for non-crowns for now until can find a nicer sfx for this case
      return;
    }

    createAudioNode({
      soundId: "crownSparkle",
      connectTo: this.output,
      varyPlaybackRate: true,
      //playbackRate: isCrown ? 1 : 0.5,
    });
    //this.output.gain.value = isCrown ? 1.2 : 0.03;
    this.output.gain.value = 1.2;
  }

  tick() {}

  destroy(): void {}
}
