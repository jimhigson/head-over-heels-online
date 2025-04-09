import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class FiredDoughnutSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"firedDoughnut", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "firedDoughnut",
      RoomId,
      RoomItemId
    >,
  ) {
    createAudioNode({
      soundId: "hooter",
      connectTo: this.output,
    });
  }

  tick() {}

  destroy(): void {}
}
