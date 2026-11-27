import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import {
  type BracketedSegmentOptions,
  BracketedSound,
} from "../soundUtils/BracketedSound";

export class EmitterSoundRenderer implements ItemSoundRenderer<"emitter"> {
  public readonly output: GainNode = audioCtx.createGain();

  /**
   * driven by the count of emissions heard - every new count plays the
   * changed sound. Undefined for an emitter configured to be silent
   */
  #emitBracketedSound: BracketedSound<number> | undefined;

  /**
   * the emitter's quantityEmitted as last ticked
   */
  #lastQuantityEmitted: number;

  /**
   * how many emissions this renderer has heard
   */
  #emissionsHeard = 0;

  readonly renderContext: ItemSoundRenderContext<"emitter">;

  constructor(renderContext: ItemSoundRenderContext<"emitter">) {
    this.renderContext = renderContext;
    this.output.gain.value = 2.5;
    this.#lastQuantityEmitted = renderContext.item.state.quantityEmitted;

    const {
      config: { sound = "emit" },
    } = renderContext.item;
    if (sound !== null) {
      const emitSoundOptions: BracketedSegmentOptions = { soundId: sound };
      this.#emitBracketedSound = new BracketedSound<number>(
        { change: emitSoundOptions },
        this.output,
      );
    }
  }

  tick(_tickContext: ItemTickContext) {
    const { quantityEmitted } = this.renderContext.item.state;

    // quantityEmitted rises with each item emitted, and can drop back to 0 (eg
    // a whenPlayerInside emitter restarting), which isn't an emission:
    if (quantityEmitted > this.#lastQuantityEmitted) {
      this.#emissionsHeard++;
    }
    this.#lastQuantityEmitted = quantityEmitted;

    this.#emitBracketedSound?.tick(this.#emissionsHeard);
  }

  destroy(): void {
    this.#emitBracketedSound?.destroy();
  }
}
