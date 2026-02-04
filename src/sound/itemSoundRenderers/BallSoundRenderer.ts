import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const pushedSound = {
  soundId: "rollingBallLoop",
  playbackRate: 0.5,
  gain: 4,
} as const;
export class BallSoundRenderer implements ItemSoundRenderer<"ball"> {
  public readonly output: GainNode = audioCtx.createGain();

  #brackets = createBracketedSound(
    {
      loop: pushedSound,
    },
    this.output,
  );

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  constructor(public readonly renderContext: ItemSoundRenderContext<"ball">) {
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      pushed: pushedSound,
      collision: { soundId: "ballHit", gain: 0.7, varyPlaybackRate: true },
      standingOn: { soundId: "ballHit" },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: {
            vels: { sliding },
            standingOnItemId,
          },
        },
      },
    } = this;

    const rolling =
      (sliding.x !== 0 || sliding.y !== 0) && standingOnItemId !== null;

    this.#brackets(rolling);

    this.#freeItemSoundRenderer.tick(tickContext, rolling);
  }

  destroy(): void {
    this.#brackets(false);
    this.#freeItemSoundRenderer.destroy();
  }
}
