import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { audioCtx } from "../audioCtx";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";

export class PushableBlockSoundRenderer
  implements ItemSoundRenderer<"pushableBlock">
{
  public readonly output: GainNode = audioCtx.createGain();

  scrapeBracketed: BracketedSound;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"pushableBlock">,
  ) {
    this.scrapeBracketed = createBracketedSound(
      {
        loop: { soundId: "stepStoolScraping" },
      },
      this.output,
    );
    this.output.gain.value = 0.4;
  }

  tick({ movedItems }: ItemTickContext) {
    const {
      renderContext: {
        item,
        room: { roomTime },
      },
    } = this;

    const {
      state: {
        actedOnAt: { roomTime: roomTimeActedOn },
        standingOnItemId,
      },
    } = item;

    const beingPushed =
      roomTime === roomTimeActedOn &&
      standingOnItemId !== null &&
      movedItems.has(item);

    this.scrapeBracketed(beingPushed);
  }

  destroy(): void {}
}
