import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const walkGain = 0.8;

export class MovingPlatformSoundRenderer
  implements ItemSoundRenderer<"movingPlatform">
{
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
    this.#activatedBracketed = createBracketedSound(
      activationBracketedSoundOptions,
      this.output,
    );

    this.#walkChannel = audioCtx.createGain();
    this.#walkChannel.gain.value = walkGain;
    this.#walkChannel.connect(this.output);
    this.#walkBracketedSound = createBracketedSound(
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

    this.#walkBracketedSound(activated);
    this.#activatedBracketed(this.renderContext.item.state.activated);
    this.#freeItemSoundRenderer.tick(tickContext);
  }

  destroy(): void {
    this.#walkBracketedSound(false);
    // don't call #activatedBracketed(false) here — that would play the
    // deactivation sound when leaving the room, not a real deactivation
    this.#freeItemSoundRenderer.destroy();
  }
}
