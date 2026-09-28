import { isJoystick } from "../../game/physics/itemPredicates";
import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { keysIter } from "../../utils/entries";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import {
  type ItemSoundRenderer,
  type ItemSoundRendererConstructableClass,
} from "../ItemSoundRenderer";
import { BracketedSound } from "../soundUtils/BracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

export class CharlesSoundRenderer implements ItemSoundRenderer<"charles"> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #servoChannel: GainNode = audioCtx.createGain();

  #servoBracketed = new BracketedSound(
    {
      start: { soundId: "servoStart", playbackRate: 1 },
      loop: { soundId: "servoLoop", playbackRate: 1 },
      stop: { soundId: "servoStop", playbackRate: 1 },
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
    this.#activatedBracketed = new BracketedSound(
      activationBracketedSoundOptions,
      this.output,
    );
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      collision: { soundId: "metalClang", gain: 0.3 },
      pushed: { soundId: "heavyScrape", gain: 0.4 },
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

    this.#servoBracketed.tick(controlledByJoystick);
    this.#activatedBracketed.tick(item.state.activated ?? true);

    this.#freeItemSoundRenderer.tick(tickContext, controlledByJoystick);
  }

  destroy(): void {
    this.#servoBracketed.destroy();
    this.#activatedBracketed.destroy();
    this.#freeItemSoundRenderer.destroy();
  }
}

CharlesSoundRenderer satisfies ItemSoundRendererConstructableClass<"charles">;
