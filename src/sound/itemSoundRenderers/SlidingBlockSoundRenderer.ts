import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { CollisionSoundRenderer } from "./generic/CollisionSoundRenderer";

export class SlidingBlockSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> extends CollisionSoundRenderer<RoomId, RoomItemId> {
  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "slidingBlock",
      RoomId,
      RoomItemId
    >,
  ) {
    super(
      renderContext,
      { soundId: "glassClink", varyPlaybackRate: true },
      0.8,
    );
  }
}
