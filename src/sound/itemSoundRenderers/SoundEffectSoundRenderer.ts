import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { loadSound } from "../soundsLoader";
import { connectWithGain } from "../soundUtils/connectWithGain";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { stopWithFade } from "../soundUtils/stopWithFade";

/** plays the sound given by the item's config.soundId */
export class SoundEffectSoundRenderer implements ItemSoundRenderer<"soundEffect"> {
  public readonly output: GainNode = audioCtx.createGain();
  #source: AudioBufferSourceNode | undefined;

  readonly renderContext: ItemSoundRenderContext<"soundEffect">;
  #destroyed = false;

  constructor(renderContext: ItemSoundRenderContext<"soundEffect">) {
    this.renderContext = renderContext;
    const {
      item: { state },
    } = renderContext;

    if (state.played === false) {
      const {
        config: { soundOptions },
      } = renderContext.item;

      const play = () => {
        if (this.#destroyed) {
          return;
        }

        // createAudioNode starts the sound unconnected; connectWithGain then
        // inserts the gain node that applies the item's per-sound gain and the
        // randomiseStartPoint fade-in (avoiding a click), connecting to output
        this.#source = createAudioNode(soundOptions);
        connectWithGain(this.#source, soundOptions, this.output);
        this.#source.onended = () => {
          this.#source?.disconnect();
          this.#source = undefined;
        };
        state.played = true;
      };

      const loading = loadSound(soundOptions.soundId);
      if (loading === undefined) {
        // already loaded - play synchronously
        play();
      } else {
        loading.then(play);
      }
    }
  }

  tick(_tickContext: ItemTickContext) {}

  destroy(): void {
    if (this.#source !== undefined) {
      stopWithFade(this.#source, this.output);
    }
    this.#destroyed = true;
  }
}
