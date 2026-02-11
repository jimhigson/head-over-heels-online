import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class SlidingDeadlySoundRenderer
  implements ItemSoundRenderer<"slidingDeadly">
{
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"slidingDeadly">,
  ) {
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      collision: {
        soundId: "glassClink",
        varyPlaybackRate: true,
        gain: 0.8,
        playbackRate: 1.5,
      },
      pushed: {
        // usually a spot effect but works ok in a loop here
        soundId: "glassClink",
        varyPlaybackRate: true,
        // distinguish from slidingBlock style=puck clicks
        playbackRate: 1.5,
      },
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
