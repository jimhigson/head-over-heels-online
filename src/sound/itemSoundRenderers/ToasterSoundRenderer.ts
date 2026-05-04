import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";

export class ToasterSoundRenderer implements ItemSoundRenderer<"deadlyBlock"> {
  public readonly output: GainNode = audioCtx.createGain();

  #bracketed = createBracketedSound(
    {
      start: { soundId: "toasterPushDown" },
      stop: { soundId: "toasterPopUp" },
    },
    this.output,
  );

  readonly renderContext: ItemSoundRenderContext<"deadlyBlock">;

  constructor(renderContext: ItemSoundRenderContext<"deadlyBlock">) {
    this.renderContext = renderContext;
    this.output.gain.value = 2;
  }

  tick(_tickContext: ItemTickContext) {
    this.#bracketed(!this.renderContext.item.state.disabled);
  }

  destroy(): void {
    //this.#bracketed(false);
  }
}
