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

export class CollisionSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<FreeItemTypes, RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #collisionBracketed: BracketedSound;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      FreeItemTypes,
      RoomId,
      RoomItemId
    >,
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

  tick() {
    const {
      renderContext: {
        item,
        room: { roomTime },
      },
    } = this;
    const {
      state: {
        collidedWith: { roomTime: roomTimeCollidedWith, by: collidedWith },
      },
    } = item;

    const hitSomething =
      roomTime === roomTimeCollidedWith && !isEmpty(keysIter(collidedWith));

    this.#collisionBracketed(hitSomething);
  }

  destroy(): void {}
}
