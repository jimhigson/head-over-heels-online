import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";

export class BubblesSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"bubbles", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #channelSource: AudioBufferSourceNode = audioCtx.createBufferSource();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "bubbles",
      RoomId,
      RoomItemId
    >,
  ) {
    const {
      item: {
        config: { was },
      },
    } = renderContext;

    if (was.type === "pickup") {
      // for fish needs to be: "seaShanty"

      if (was.gives !== "scroll") {
        const sound = loadedSounds().bonus;
        this.#channelSource = audioCtx.createBufferSource();
        this.#channelSource.buffer = sound;

        this.#channelSource.connect(this.output);
        this.#channelSource.start();
      }
    }
  }

  tick() {}

  destroy(): void {}
}
