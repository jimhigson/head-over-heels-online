import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { isJoystick } from "../../game/physics/itemPredicates";
import { iterate } from "../../utils/iterate";
import { keysIter } from "../../utils/entries";
import { isEmpty } from "iter-tools";

export class CharlesSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"charles", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #servoChannel: GainNode = audioCtx.createGain();
  #collisionChannel: GainNode = audioCtx.createGain();

  #servoBracketed = createBracketedSound(
    {
      start: { soundId: "servoStart", playbackRate: 0.5 },
      loop: { soundId: "servoLoop", playbackRate: 0.5 },
      stop: { soundId: "servoStop", playbackRate: 0.5 },
    },
    this.#servoChannel,
  );

  #collisionBracketed = createBracketedSound(
    {
      start: { soundId: "metalHit" },
    },
    this.#collisionChannel,
  );

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "charles",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#servoChannel.connect(this.output);
    this.#servoChannel.gain.value = 0.5;
    this.#collisionChannel.connect(this.output);
    this.#collisionChannel.gain.value = 0.3;
  }

  tick() {
    const {
      renderContext: {
        item,
        room: { roomTime, items },
      },
    } = this;
    const {
      state: {
        actedOnAt: { roomTime: roomTimeActedOn, by },
        collidedWith: { roomTime: roomTimeCollidedWith, by: collidedWith },
      },
    } = item;

    const controlledByJoystick =
      roomTime === roomTimeActedOn &&
      iterate(keysIter(by)).some((id) => isJoystick(items[id]));

    this.#servoBracketed(controlledByJoystick);

    const hitSomething =
      roomTime === roomTimeCollidedWith && !isEmpty(keysIter(collidedWith));

    this.#collisionBracketed(hitSomething);
  }

  destroy(): void {}
}
