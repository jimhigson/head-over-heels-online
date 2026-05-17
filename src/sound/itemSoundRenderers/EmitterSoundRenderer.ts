import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class EmitterSoundRenderer implements ItemSoundRenderer<"emitter"> {
  public readonly output: GainNode = audioCtx.createGain();

  #lastEmittedAtRoomTime: number;

  readonly renderContext: ItemSoundRenderContext<"emitter">;

  constructor(renderContext: ItemSoundRenderContext<"emitter">) {
    this.renderContext = renderContext;
    this.#lastEmittedAtRoomTime =
      renderContext.item.state.lastEmittedAtRoomTime;
    this.output.gain.value = 2.5;
  }

  tick(_tickContext: ItemTickContext) {
    const { lastEmittedAtRoomTime } = this.renderContext.item.state;

    if (lastEmittedAtRoomTime > this.#lastEmittedAtRoomTime) {
      const { sound = "emit" } = this.renderContext.item.config;
      if (sound !== null) {
        createAudioNode({
          soundId: sound,
          connectTo: this.output,
        });
      }
    }

    this.#lastEmittedAtRoomTime = lastEmittedAtRoomTime;
  }

  destroy(): void {}
}
