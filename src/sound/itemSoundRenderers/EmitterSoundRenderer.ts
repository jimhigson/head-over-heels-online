import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import {
  type BracketedSegmentOptions,
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";

export class EmitterSoundRenderer implements ItemSoundRenderer<"emitter"> {
  public readonly output: GainNode = audioCtx.createGain();

  /**
   * driven by the lastEmittedAtRoomTime stamp - every new value plays
   * the changed sound. Undefined for an emitter configured to be silent
   */
  #emitBracketedSound: BracketedSound<number> | undefined;

  readonly renderContext: ItemSoundRenderContext<"emitter">;

  constructor(renderContext: ItemSoundRenderContext<"emitter">) {
    this.renderContext = renderContext;
    this.output.gain.value = 2.5;

    const { sound = "emit" } = renderContext.item.config;
    if (sound !== null) {
      const emitSoundOptions: BracketedSegmentOptions = { soundId: sound };
      this.#emitBracketedSound = createBracketedSound<number>(
        {
          // the first emission is a start (no previous stamp), later ones are changes:
          start: emitSoundOptions,
          change: emitSoundOptions,
        },
        this.output,
      );
    }
  }

  tick(_tickContext: ItemTickContext) {
    const { lastEmittedAtRoomTime } = this.renderContext.item.state;

    this.#emitBracketedSound?.(lastEmittedAtRoomTime);
  }

  destroy(): void {}
}
