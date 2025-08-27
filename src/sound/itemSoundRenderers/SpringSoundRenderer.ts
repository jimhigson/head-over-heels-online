import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isStoodOn } from "../../model/StoodOnBy";
import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class SpringSoundRenderer implements ItemSoundRenderer<"spring"> {
  public readonly output: GainNode = audioCtx.createGain();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"spring">,
  ) {}

  tick({ lastRenderRoomTime }: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy, stoodOnUntilRoomTime },
        },
      },
    } = this;
    const compressed = isStoodOn(stoodOnBy);

    const boing =
      lastRenderRoomTime !== undefined &&
      stoodOnUntilRoomTime > lastRenderRoomTime &&
      // it could have stopped being stood on, but immediately been stood on again:
      !compressed;

    if (boing) {
      createAudioNode({
        soundId: "springBoing",
        connectTo: this.output,
      });
    }
  }

  destroy(): void {}
}
