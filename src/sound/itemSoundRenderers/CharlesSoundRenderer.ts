import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { isJoystick } from "../../game/physics/itemPredicates";

export class CharlesSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"charles", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #servoChannel: GainNode = audioCtx.createGain();

  #servoBracketed = createBracketedSound({
    start: { soundId: "servoStart", playbackRate: 0.5 },
    loop: { soundId: "servoLoop", playbackRate: 0.5 },
    stop: { soundId: "servoStop", playbackRate: 0.5 },
    connectTo: this.#servoChannel,
  });

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "charles",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#servoChannel.connect(this.output);
    this.#servoChannel.gain.value = 0.5;
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: {
            actedOnAt: { roomTime: roomTimeActedOn, by },
          },
        },
        room: { roomTime, items },
      },
    } = this;

    const controlledByJoystick =
      roomTime === roomTimeActedOn && by.some((id) => isJoystick(items[id]));

    this.#servoBracketed(controlledByJoystick);
  }

  destroy(): void {}
}
