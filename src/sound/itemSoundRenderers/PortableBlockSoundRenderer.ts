import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isStoodOn } from "../../model/StoodOnBy";
import { loadedSounds } from "../soundsLoader";

export class PortableBlockSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"portableBlock", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #currentRenderProps: { stoodOn: boolean } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "portableBlock",
      RoomId,
      RoomItemId
    >,
  ) {}

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
          config: { style },
        },
      },
    } = this;

    if (style !== "drum") return;

    const currentlyStoodOn = this.#currentRenderProps?.stoodOn ?? false;
    const stoodOn = isStoodOn(stoodOnBy);

    if (!currentlyStoodOn && stoodOn) {
      const sound = loadedSounds().drum;

      const source = audioCtx.createBufferSource();
      source.buffer = sound;

      source.connect(this.output);
      source.start();
    }

    this.#currentRenderProps = { stoodOn };
  }

  destroy(): void {}
}
