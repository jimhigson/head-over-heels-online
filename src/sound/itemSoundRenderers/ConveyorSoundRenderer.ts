import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isStoodOn } from "../../model/StoodOnBy";
import { createBracketedSound } from "../soundUtils/createBracketedSound";

const playbackRate = 2;

export class ConveyorSoundRenderer implements ItemSoundRenderer<"conveyor"> {
  public readonly output: GainNode = audioCtx.createGain();

  #bracketedSound = createBracketedSound(
    {
      start: { soundId: "conveyorStart", playbackRate },
      loop: { soundId: "conveyorLoop", playbackRate },
      stop: { soundId: "conveyorEnd", playbackRate },
    },
    this.output,
  );

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"conveyor">,
  ) {}

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;
    const stoodOn = isStoodOn(stoodOnBy);

    this.#bracketedSound(stoodOn);
  }

  destroy(): void {
    // conveyors can be destroyed - ie, #bookworld2
    this.#bracketedSound(false);
  }
}
