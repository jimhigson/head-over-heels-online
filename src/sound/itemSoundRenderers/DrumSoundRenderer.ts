import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { isStoodOn } from "../../model/StoodOnBy";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { BracketedSound } from "../soundUtils/BracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class DrumSoundRenderer implements ItemSoundRenderer<"portableBlock"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;
  #stoodOnBracketedSound: BracketedSound;

  readonly renderContext: ItemSoundRenderContext<"portableBlock">;

  constructor(renderContext: ItemSoundRenderContext<"portableBlock">) {
    this.renderContext = renderContext;
    this.#stoodOnBracketedSound = new BracketedSound(
      { start: { soundId: "drum" } },
      this.output,
    );
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      standingOn: { soundId: "drum" },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;

    this.#stoodOnBracketedSound.tick(isStoodOn(stoodOnBy));

    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#stoodOnBracketedSound.destroy();
    this.#freeItemSoundRenderer.destroy();
  }
}
