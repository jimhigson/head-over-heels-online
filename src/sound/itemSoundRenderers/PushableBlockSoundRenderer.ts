import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class PushableBlockSoundRenderer
  implements ItemSoundRenderer<"pushableBlock">
{
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"pushableBlock">,
  ) {
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      standingOn: { soundId: "metalHit" },
      pushed: { soundId: "heavyMetalScraping", gain: 0.4 },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
