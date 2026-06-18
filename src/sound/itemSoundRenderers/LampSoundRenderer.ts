import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";

/**
 * lamps play the same sound monsters do when they are activated and
 * deactivated (eg by switches, buttons or timers)
 */
export class LampSoundRenderer implements ItemSoundRenderer<"lamp"> {
  public readonly output: GainNode = audioCtx.createGain();

  #activatedBracketed: BracketedSound;

  readonly renderContext: ItemSoundRenderContext<"lamp">;

  constructor(renderContext: ItemSoundRenderContext<"lamp">) {
    this.renderContext = renderContext;
    this.#activatedBracketed = createBracketedSound(
      activationBracketedSoundOptions,
      this.output,
    );
  }

  tick() {
    this.#activatedBracketed(this.renderContext.item.state.activated);
  }

  destroy(): void {
    // don't call #activatedBracketed(false) here — that would play the
    // deactivation sound when leaving the room, not a real deactivation
  }
}
