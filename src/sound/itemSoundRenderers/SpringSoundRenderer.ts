import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isStoodOn } from "../../model/StoodOnBy";
import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class SpringSoundRenderer implements ItemSoundRenderer<"spring"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  readonly renderContext: ItemSoundRenderContext<"spring">;

  constructor(renderContext: ItemSoundRenderContext<"spring">) {
    this.renderContext = renderContext;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext);
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy, stoodOnUntilRoomTime },
        },
      },
    } = this;
    const compressed = isStoodOn(stoodOnBy);

    const boing =
      tickContext.lastRenderRoomTime !== undefined &&
      stoodOnUntilRoomTime > tickContext.lastRenderRoomTime &&
      !compressed;

    if (boing) {
      createAudioNode({
        soundId: "springBoing",
        connectTo: this.output,
      });
    }

    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
