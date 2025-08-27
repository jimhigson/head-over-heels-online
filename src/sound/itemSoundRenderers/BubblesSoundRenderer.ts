import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class BubblesSoundRenderer implements ItemSoundRenderer<"bubbles"> {
  public readonly output: GainNode = audioCtx.createGain();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"bubbles">,
  ) {
    const {
      item: {
        config: { was },
      },
    } = renderContext;

    switch (was.type) {
      case "pickup": {
        // for fish needs to be: "seaShanty"

        if (was.gives !== "scroll") {
          createAudioNode({
            soundId: "bonus",
            connectTo: this.output,
          });
        }
        break;
      }
      case "disappearing": {
        createAudioNode({
          soundId: "destroy",
          connectTo: this.output,
        });
        break;
      }
      case "hushPuppy": {
        this.output.gain.value = 0.5;
        createAudioNode({
          soundId: "hushPuppyVanish",
          connectTo: this.output,
        });
        break;
      }
      default:
        was satisfies never;
    }
  }

  tick() {}

  destroy(): void {}
}
