import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type {
  ItemSoundRenderer,
  ItemSoundRendererConstructableClass,
} from "../ItemSoundRenderer";

import { isJoystick } from "../../game/physics/itemPredicates";
import { keysIter } from "../../utils/entries";
import { audioCtx } from "../audioCtx";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

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

  #activatedBracketed: BracketedSound;

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  readonly renderContext: ItemSoundRenderContext<"charles">;

  constructor(renderContext: ItemSoundRenderContext<"charles">) {
    this.renderContext = renderContext;
    this.#servoChannel.connect(this.output);
    this.#servoChannel.gain.value = 0.5;
    this.#activatedBracketed = createBracketedSound(
      activationBracketedSoundOptions,
      this.output,
    );
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      collision: { soundId: "metalHit", gain: 0.3 },
      pushed: { soundId: "heavyMetalScraping", gain: 0.4 },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
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
      keysIter(by).some((id) => isJoystick(items[id]));

    this.#servoBracketed(controlledByJoystick);
    this.#activatedBracketed(item.state.activated ?? true);

    this.#freeItemSoundRenderer.tick(tickContext, controlledByJoystick);
  }

  destroy(): void {
    this.#servoBracketed(false);
    // don't call #activatedBracketed(false) here — that would play the
    // deactivation sound when leaving the room, not a real deactivation
    this.#freeItemSoundRenderer.destroy();
  }
}

CharlesSoundRenderer satisfies ItemSoundRendererConstructableClass<"charles">;
