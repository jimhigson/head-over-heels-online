import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";

import { CollisionSoundRenderer } from "./generic/CollisionSoundRenderer";

export class SlidingBlockSoundRenderer extends CollisionSoundRenderer {
  constructor(
    public readonly renderContext: ItemSoundRenderContext<"slidingBlock">,
  ) {
    super(
      renderContext,
      { soundId: "glassClink", varyPlaybackRate: true },
      0.8,
    );
  }
}
