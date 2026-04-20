import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isStoodOn } from "../../model/StoodOnBy";
import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class DrumSoundRenderer implements ItemSoundRenderer<"portableBlock"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;
  #currentlyStoodOn = false;

  readonly renderContext: ItemSoundRenderContext<"portableBlock">;

  constructor(renderContext: ItemSoundRenderContext<"portableBlock">) {
    this.renderContext = renderContext;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      standingOn: { soundId: "drum" },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;

    const stoodOn = isStoodOn(stoodOnBy);

    if (!this.#currentlyStoodOn && stoodOn) {
      createAudioNode({
        soundId: "drum",
        connectTo: this.output,
      });
    }

    this.#currentlyStoodOn = stoodOn;

    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
