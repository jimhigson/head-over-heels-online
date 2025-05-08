import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createAudioNode } from "../soundUtils/createAudioNode";
import type { ItemTickContext } from "../../game/render/Renderer";

export class SpringSoundRenderer implements ItemSoundRenderer<"spring"> {
  public readonly output: GainNode = audioCtx.createGain();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"spring">,
  ) {}

  tick({ lastRenderRoomTime }: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnUntilRoomTime },
        },
      },
    } = this;

    const boing =
      lastRenderRoomTime !== undefined &&
      stoodOnUntilRoomTime > lastRenderRoomTime;

    if (boing) {
      createAudioNode({
        soundId: "springBoing",
        connectTo: this.output,
      });
    }
  }

  destroy(): void {}
}
