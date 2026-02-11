import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class MovingPlatformSoundRenderer
  implements ItemSoundRenderer<"movingPlatform">
{
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"movingPlatform">,
  ) {
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      pushed: null,
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
