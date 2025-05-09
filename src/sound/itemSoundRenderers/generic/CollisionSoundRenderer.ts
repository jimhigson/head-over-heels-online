import { audioCtx } from "../../audioCtx";
import type { ItemSoundRenderer } from "../../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../../ItemSoundRenderContext";
import type {
  BracketedSegmentOptions,
  BracketedSound,
} from "../../soundUtils/createBracketedSound";
import { createBracketedSound } from "../../soundUtils/createBracketedSound";
import type { FreeItemTypes } from "../../../game/physics/itemPredicates";
import { keysIter } from "../../../utils/entries";
import { isEmpty } from "iter-tools";
import type { ItemTickContext } from "src/game/render/ItemRenderContexts";
import { neverTime } from "../../../utils/veryClose";

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
