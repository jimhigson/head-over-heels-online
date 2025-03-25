import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isStoodOn } from "../../model/StoodOnBy";
import { loadedSounds } from "../soundsLoader";

export class SpringSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"spring", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #currentRenderProps: { stoodOn: boolean } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "spring",
      RoomId,
      RoomItemId
    >,
  ) {}

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;
    const currentlyStoodOn = this.#currentRenderProps?.stoodOn ?? false;
    const stoodOn = isStoodOn(stoodOnBy);

    if (currentlyStoodOn && !stoodOn) {
      const sound = loadedSounds().springBoing;

      const source = audioCtx.createBufferSource();
      source.buffer = sound;

      source.connect(this.output);
      source.start();
    }

    this.#currentRenderProps = { stoodOn };
  }

  destroy(): void {}
}
