import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";

export class ButtonSoundRenderer implements ItemSoundRenderer<"button"> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #channelNode: GainNode = audioCtx.createGain();

  #pressedBracketedSound: BracketedSound;

  readonly renderContext: ItemSoundRenderContext<"button">;

  constructor(renderContext: ItemSoundRenderContext<"button">) {
    this.renderContext = renderContext;
    this.#channelNode.connect(this.output);
    this.#pressedBracketedSound = createBracketedSound(
      {
        start: { soundId: "buttonOn" },
        stop: { soundId: "buttonOff" },
      },
      this.#channelNode,
    );
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: { pressed },
        },
      },
    } = this;

    this.#pressedBracketedSound(pressed);
  }

  destroy(): void {}
}
