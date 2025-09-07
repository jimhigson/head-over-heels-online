import type { ItemTickContext } from "src/game/render/ItemRenderContexts";

import { isEmpty } from "iter-tools-es";

import type { FreeItemTypes } from "../../../game/physics/itemPredicates";
import type { ItemSoundRenderContext } from "../../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../../ItemSoundRenderer";
import type {
  BracketedSegmentOptions,
  BracketedSound,
} from "../../soundUtils/createBracketedSound";

import { keysIter } from "../../../utils/entries";
import { neverTime } from "../../../utils/neverTime";
import { audioCtx } from "../../audioCtx";
import { createBracketedSound } from "../../soundUtils/createBracketedSound";

export class CollisionSoundRenderer
  implements ItemSoundRenderer<FreeItemTypes>
{
  public readonly output: GainNode = audioCtx.createGain();

  #collisionBracketed: BracketedSound;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<FreeItemTypes>,
    collisionStartSoundOptions: BracketedSegmentOptions,
    gain: number = 1,
  ) {
    this.#collisionBracketed = createBracketedSound(
      {
        start: collisionStartSoundOptions,
      },
      this.output,
    );

    this.output.gain.value = gain;
  }

  tick({ lastRenderRoomTime }: ItemTickContext) {
    const {
      renderContext: { item },
    } = this;
    const {
      state: {
        collidedWith: { roomTime: roomTimeCollidedWith, by: collidedWith },
      },
    } = item;

    const collidedWithSomething =
      roomTimeCollidedWith > (lastRenderRoomTime ?? neverTime) &&
      !isEmpty(keysIter(collidedWith));

    this.#collisionBracketed(collidedWithSomething);
  }

  destroy(): void {}
}
