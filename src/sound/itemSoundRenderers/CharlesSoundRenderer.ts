import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type {
  ItemSoundRenderer,
  ItemSoundRendererConstructableClass,
} from "../ItemSoundRenderer";

import { isJoystick } from "../../game/physics/itemPredicates";
import { keysIter } from "../../utils/entries";
import { iterate } from "../../utils/iterate";
import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { CollisionSoundRenderer } from "./generic/CollisionSoundRenderer";

export class CharlesSoundRenderer implements ItemSoundRenderer<"charles"> {
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

  #collisionsSoundRenderer: CollisionSoundRenderer;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"charles">,
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

  tick(tickContext: ItemTickContext) {
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
