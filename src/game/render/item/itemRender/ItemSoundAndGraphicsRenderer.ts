import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemSoundRenderer } from "../../../../sound/ItemSoundRenderer";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
} from "../../Renderer";
import type { SoundAndGraphicsOutput } from "../../SoundAndGraphicsOutput";
import type { ItemPixiRenderer } from "./ItemRenderer";

export class ItemSoundAndGraphicsRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements
    Renderer<
      ItemRenderContext<T, RoomId, RoomItemId>,
      ItemTickContext<RoomId, RoomItemId>,
      SoundAndGraphicsOutput
    >
{
  public readonly output: SoundAndGraphicsOutput;

  constructor(
    public readonly renderContext: ItemRenderContext<T, RoomId, RoomItemId>,
    public readonly componentRenderers: {
      graphics?: ItemPixiRenderer<T, RoomId, RoomItemId>;
      sound?: ItemSoundRenderer<T, RoomId, RoomItemId>;
    },
  ) {
    this.output = {
      graphics: componentRenderers.graphics?.output,
      sound: componentRenderers.sound?.output,
    };
  }

  tick(tickContext: ItemTickContext<RoomId, RoomItemId>): void {
    this.componentRenderers.graphics?.tick(tickContext);
    this.componentRenderers.sound?.tick(tickContext);
  }

  destroy() {
    this.componentRenderers.graphics?.destroy();
    this.componentRenderers.sound?.destroy();
  }
}
