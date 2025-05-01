import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemSoundRenderer } from "../../../../sound/ItemSoundRenderer";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
} from "../../Renderer";
import type { SoundAndGraphicsOutput } from "../../SoundAndGraphicsOutput";
import type { ItemPixiRenderer } from "./ItemRenderer";

export class ItemSoundAndGraphicsRenderer<T extends ItemInPlayType>
  implements
    Renderer<ItemRenderContext<T>, ItemTickContext, SoundAndGraphicsOutput>
{
  public readonly output: SoundAndGraphicsOutput;

  constructor(
    public readonly renderContext: ItemRenderContext<T>,
    private componentRenderers: {
      graphics?: ItemPixiRenderer<T>;
      sound?: ItemSoundRenderer<T>;
    },
  ) {
    this.output = {
      graphics: componentRenderers.graphics?.output,
      sound: componentRenderers.sound?.output,
    };
  }

  tick(tickContext: ItemTickContext): void {
    this.componentRenderers.graphics?.tick(tickContext);
    this.componentRenderers.sound?.tick(tickContext);
  }

  destroy() {
    this.componentRenderers.graphics?.destroy();
    this.componentRenderers.sound?.destroy();
  }
}
