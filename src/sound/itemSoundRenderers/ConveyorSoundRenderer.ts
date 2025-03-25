import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isStoodOn } from "../../model/StoodOnBy";

const playbackRate = 2;

export class ConveyorSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"conveyor", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #currentSound: AudioBufferSourceNode | null = null;
  #currentRenderProps: { stoodOn: boolean } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "conveyor",
      RoomId,
      RoomItemId
    >,
  ) {}

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
      },
    } = this;
    const currentlyStoodOn = this.#currentRenderProps?.stoodOn ?? false;
    const stoodOn = isStoodOn(stoodOnBy);

    if (stoodOn !== currentlyStoodOn) {
      if (stoodOn) {
        const startNode = audioCtx.createBufferSource();
        startNode.buffer = loadedSounds().conveyorStart;
        startNode.playbackRate.value = playbackRate;

        startNode.connect(this.output);
        startNode.start();
        this.#currentSound = startNode;

        startNode.onended = () => {
          const loopNode = audioCtx.createBufferSource();
          loopNode.buffer = loadedSounds().conveyorLoop;
          loopNode.loop = true;
          loopNode.playbackRate.value = playbackRate;

          loopNode.connect(this.output);
          loopNode.start();
          this.#currentSound = loopNode;
        };
      } else {
        if (this.#currentSound !== null) {
          this.#currentSound.stop();
          this.#currentSound.onended = null;
        }

        const endNode = audioCtx.createBufferSource();
        endNode.buffer = loadedSounds().conveyorEnd;
        endNode.playbackRate.value = playbackRate;

        endNode.connect(this.output);
        endNode.start();
        this.#currentSound = endNode;
      }
    }

    this.#currentRenderProps = { stoodOn };
  }

  destroy(): void {
    // conveyors can be destroyed - ie, #bookworld2
    if (this.#currentSound !== null) {
      this.#currentSound.stop();
      this.#currentSound.onended = null;
    }
  }
}
