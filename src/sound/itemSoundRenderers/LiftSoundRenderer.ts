import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";

const dopplerSensitivity = 3;

export class LiftSoundRenderer<RoomId extends string, RoomItemId extends string>
  implements ItemSoundRenderer<"lift", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #channelSource: AudioBufferSourceNode = audioCtx.createBufferSource();

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "lift",
      RoomId,
      RoomItemId
    >,
  ) {
    const sound = loadedSounds().helicopter;
    this.#channelSource = audioCtx.createBufferSource();
    this.#channelSource.buffer = sound;
    this.#channelSource.loop = true;

    this.#channelSource.connect(this.output);
    this.#channelSource.start();
    // this sound is often in the background for a long time so make it not too loud:
    this.output.gain.value = 0.7;
  }

  tick() {
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
  }

  destroy(): void {}
}
