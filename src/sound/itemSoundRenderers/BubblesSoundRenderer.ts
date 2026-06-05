import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class BubblesSoundRenderer implements ItemSoundRenderer<"bubbles"> {
  public readonly output: GainNode = audioCtx.createGain();

  readonly renderContext: ItemSoundRenderContext<"bubbles">;

  constructor(renderContext: ItemSoundRenderContext<"bubbles">) {
    this.renderContext = renderContext;
    const {
      item: {
        config: { was },
      },
    } = renderContext;

    switch (was.type) {
      case "pickup": {
        // for fish needs to be: "seaShanty"

        switch (was.gives) {
          // which sound we choose matches the choices in the original game
          // except scrolls since they didn't exist:
          case "scroll":
            // sound handled by the dialog it opens
            break;
          case "reincarnation":
          case "bag":
          case "hooter":
          case "doughnuts":
            createAudioNode({
              soundId: "collectedItem",
              connectTo: this.output,
            });
            break;
          case "extra-life":
          case "fast":
          case "jumps":
          case "shield":
            createAudioNode({
              soundId: "collectedRabbit",
              connectTo: this.output,
            });
            break;
          case "crown":
            createAudioNode({
              soundId: "fanfare",
              connectTo: this.output,
            });
            break;
          default:
            was.gives satisfies never;
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
      case "firedDoughnut": {
        createAudioNode({
          soundId: "doughnutSplat",
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
