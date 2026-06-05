import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { epsilon } from "../../utils/epsilon";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { createAudioNode } from "../soundUtils/createAudioNode";
import { stopWithFade } from "../soundUtils/stopWithFade";

const dopplerSensitivity = 3;

/** observed empirical peak of the lift's z-acceleration (velocity change per ms) */
const maxLiftAcceleration = 0.000_026;

export class LiftSoundRenderer implements ItemSoundRenderer<"lift"> {
  public readonly output: GainNode = audioCtx.createGain();

  #channelSource = createAudioNode({
    soundId: "helicopter",
    loop: true,
    connectTo: this.output,
  } as const);

  #previousLiftZVelocity = 0;

  readonly renderContext: ItemSoundRenderContext<"lift">;

  constructor(renderContext: ItemSoundRenderContext<"lift">) {
    this.renderContext = renderContext;
    // this sound is often in the background for a long time so make it not too loud:
    this.output.gain.value = 0.7;
  }

  tick({ deltaMS }: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: {
            vels: {
              lift: { z: liftZVelocity },
            },
          },
        },
      },
    } = this;

    this.#channelSource.playbackRate.value = Math.max(
      0.5,
      1 + dopplerSensitivity * liftZVelocity,
    );

    const acceleration =
      (liftZVelocity - this.#previousLiftZVelocity) /
      Math.max(deltaMS, epsilon);
    this.#previousLiftZVelocity = liftZVelocity;

    this.output.gain.value = Math.min(
      1,
      0.5 + 0.5 * (Math.abs(acceleration) / maxLiftAcceleration),
    );
  }

  destroy(): void {
    stopWithFade(this.#channelSource, this.output);
  }
}
