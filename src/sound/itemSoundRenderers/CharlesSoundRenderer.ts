import { audioCtx } from "../audioCtx";
import type {
  ItemSoundRenderer,
  ItemSoundRendererConstructableClass,
} from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { isJoystick } from "../../game/physics/itemPredicates";
import { iterate } from "../../utils/iterate";
import { keysIter } from "../../utils/entries";
import { CollisionSoundRenderer } from "./generic/CollisionSoundRenderer";
import type { ItemTickContext } from "../../game/render/Renderer";

export class CharlesSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"charles", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #servoChannel: GainNode = audioCtx.createGain();

  #servoBracketed = createBracketedSound(
    {
      start: { soundId: "servoStart", playbackRate: 0.5 },
      loop: { soundId: "servoLoop", playbackRate: 0.5 },
      stop: { soundId: "servoStop", playbackRate: 0.5 },
    },
    this.#servoChannel,
  );

  #collisionsSoundRenderer: CollisionSoundRenderer<RoomId, RoomItemId>;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "charles",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#servoChannel.connect(this.output);
    this.#servoChannel.gain.value = 0.5;
    this.#collisionsSoundRenderer = new CollisionSoundRenderer(
      renderContext,
      { soundId: "metalHit" },
      0.3,
    );
    this.#collisionsSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    const {
      renderContext: {
        item,
        room: { roomTime, items },
      },
    } = this;
    const {
      state: {
        actedOnAt: { roomTime: roomTimeActedOn, by },
      },
    } = item;

    const controlledByJoystick =
      roomTime === roomTimeActedOn &&
      iterate(keysIter(by)).some((id) => isJoystick(items[id]));

    this.#servoBracketed(controlledByJoystick);

    this.#collisionsSoundRenderer.tick(tickContext);
  }

  destroy(): void {}
}

CharlesSoundRenderer satisfies ItemSoundRendererConstructableClass<"charles">;
