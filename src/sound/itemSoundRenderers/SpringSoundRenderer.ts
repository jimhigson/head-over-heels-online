import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { isStoodOn } from "../../model/StoodOnBy";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class SpringSoundRenderer implements ItemSoundRenderer<"spring"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  /**
   * the stoodOnUntilRoomTime stamp as of the last tick - a change means a
   * stander stepped off since then. Initialised from the item's current state
   * so a stale stamp (eg from a loaded save) doesn't boing on the first tick
   */
  #seenStoodOnUntilRoomTime: number;

  readonly renderContext: ItemSoundRenderContext<"spring">;

  constructor(renderContext: ItemSoundRenderContext<"spring">) {
    this.renderContext = renderContext;
    this.#seenStoodOnUntilRoomTime =
      renderContext.item.state.stoodOnUntilRoomTime;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext);
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy, stoodOnUntilRoomTime },
        },
      },
    } = this;
    const compressed = isStoodOn(stoodOnBy);

    const boing =
      stoodOnUntilRoomTime !== this.#seenStoodOnUntilRoomTime && !compressed;
    // absorb regardless of whether the boing fired - a release while another
    // stander remains never fires late:
    this.#seenStoodOnUntilRoomTime = stoodOnUntilRoomTime;

    if (boing) {
      createAudioNode({
        soundId: "springBoing",
        connectTo: this.output,
      });
    }

    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
