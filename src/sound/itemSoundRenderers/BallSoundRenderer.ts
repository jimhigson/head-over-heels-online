import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createBracketedSound } from "../soundUtils/createBracketedSound";

export class BallSoundRenderer<RoomId extends string, RoomItemId extends string>
  implements ItemSoundRenderer<"ball", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  #brackets = createBracketedSound({
    loop: { soundId: "rollingBallLoop", playbackRate: 0.5 },
    connectTo: this.output,
  });

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "ball",
      RoomId,
      RoomItemId
    >,
  ) {
    this.output.gain.value = 4;
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: {
            vels: { sliding },
            standingOnItemId,
          },
        },
      },
    } = this;

    const rolling =
      (sliding.x !== 0 || sliding.y !== 0) && standingOnItemId !== null;

    this.#brackets(rolling);
  }

  destroy(): void {}
}
