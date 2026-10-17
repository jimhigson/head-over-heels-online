import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class PortableBlockSoundRenderer implements ItemSoundRenderer<"portableBlock"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  readonly renderContext: ItemSoundRenderContext<"portableBlock">;

  constructor(renderContext: ItemSoundRenderContext<"portableBlock">) {
    this.renderContext = renderContext;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      collision: { soundId: "softBump" },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#freeItemSoundRenderer.destroy();
  }
}
