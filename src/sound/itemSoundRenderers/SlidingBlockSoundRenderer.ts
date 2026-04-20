import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { FreeItemSoundRendererConstructorOptions } from "./generic/FreeItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const glassyOptions: FreeItemSoundRendererConstructorOptions = {
  collision: { soundId: "glassClink", varyPlaybackRate: true, gain: 0.8 },
  pushed: {
    soundId: "iceScrape",
    varyPlaybackRate: true,
    randomiseStartPoint: true,
  },
};

export class SlidingBlockSoundRenderer
  implements ItemSoundRenderer<"slidingBlock">
{
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  readonly renderContext: ItemSoundRenderContext<"slidingBlock">;

  constructor(renderContext: ItemSoundRenderContext<"slidingBlock">) {
    this.renderContext = renderContext;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(
      renderContext,
      renderContext.item.config.style === "puck" ? glassyOptions : undefined,
    );
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
