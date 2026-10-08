import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { BracketedSound } from "../soundUtils/BracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const walkGain = 0.8;

export class MovingPlatformSoundRenderer implements ItemSoundRenderer<"movingPlatform"> {
  public readonly output: GainNode = audioCtx.createGain();

  #freeItemSoundRenderer: FreeItemSoundRenderer;
  #activatedBracketed: BracketedSound;

  #walkChannel: GainNode;
  #walkBracketedSound: BracketedSound;

  readonly renderContext: ItemSoundRenderContext<"movingPlatform">;

  constructor(renderContext: ItemSoundRenderContext<"movingPlatform">) {
    this.renderContext = renderContext;
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      pushed: null,
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
    this.#activatedBracketed = new BracketedSound(
      activationBracketedSoundOptions,
      this.output,
    );

    this.#walkChannel = audioCtx.createGain();
    this.#walkChannel.gain.value = walkGain;
    this.#walkChannel.connect(this.output);
    this.#walkBracketedSound = new BracketedSound(
      {
        loop: {
          soundId: "lowerSmallMotorLoop",
          randomiseStartPoint: true,
          gain: 0.5,
        },
      },
      this.#walkChannel,
    );
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { activated },
        },
      },
    } = this;

    this.#walkBracketedSound.tick(activated);
    this.#activatedBracketed.tick(this.renderContext.item.state.activated);
    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#walkBracketedSound.destroy();
    this.#activatedBracketed.destroy();
    this.#freeItemSoundRenderer.destroy();
  }
}
