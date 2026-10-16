import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import { type ItemConfigMap } from "../../model/json/ItemConfigMap";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { loadSound } from "../soundsLoader";
import { createAudioNode } from "../soundUtils/createAudioNode";

type BubblesWas = ItemConfigMap<string, string>["bubbles"]["was"];

/** the sound played by bubbles left by what they were, if any */
const bubblesSoundId = (was: BubblesWas): ExportedSoundId | undefined => {
  switch (was.type) {
    case "pickup": {
      switch (was.gives) {
        // which sound we choose matches the choices in the original game
        // except scrolls since they didn't exist:
        case "scroll":
          // sound handled by the dialog it opens
          return undefined;
        case "reincarnation":
        case "bag":
        case "hooter":
        case "doughnuts":
          return "collectedItem";
        case "extra-life":
        case "fast":
        case "jumps":
        case "shield":
          return "collectedRabbit";
        case "crown":
          return "fanfare";
        default:
          was.gives satisfies never;
          throw new Error("unknown pickup gives");
      }
    }
    case "disappearing":
      return "destroy";
    case "firedDoughnut":
      return "doughnutSplat";
    case "hushPuppy":
      return "hushPuppyVanish";
    default:
      was satisfies never;
      throw new Error("unknown bubbles was");
  }
};

export class BubblesSoundRenderer implements ItemSoundRenderer<"bubbles"> {
  public readonly output: GainNode = audioCtx.createGain();

  readonly renderContext: ItemSoundRenderContext<"bubbles">;
  readonly #soundId: ExportedSoundId | undefined;
  #destroyed = false;

  constructor(renderContext: ItemSoundRenderContext<"bubbles">) {
    this.renderContext = renderContext;
    const {
      item: {
        config: { was },
      },
    } = renderContext;

    if (was.type === "hushPuppy") {
      this.output.gain.value = 0.5;
    }

    this.#soundId = bubblesSoundId(was);
    if (this.#soundId === undefined) {
      return;
    }

    // plays the sound, after loading it if it isn't loaded yet
    const loading = loadSound(this.#soundId);
    if (loading === undefined) {
      this.#playLoadedSound();
    } else {
      loading.then(this.#playLoadedSound);
    }
  }

  #playLoadedSound = () => {
    if (this.#destroyed || this.#soundId === undefined) {
      return;
    }
    createAudioNode({ soundId: this.#soundId, connectTo: this.output });
  };

  tick() {}

  destroy(): void {
    this.#destroyed = true;
  }
}
