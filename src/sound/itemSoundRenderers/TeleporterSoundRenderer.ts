import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isPlayableItem } from "../../game/physics/itemPredicates";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";

export class TeleporterSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"teleporter", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #sirenChannel: GainNode = audioCtx.createGain();
  #sirenLoop: AudioBufferSourceNode | null = null;

  #currentRenderProps: { stoodOnByPlayer: boolean } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "teleporter",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#sirenChannel.connect(this.output);
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: { stoodOnBy },
        },
        room,
      },
    } = this;
    const currentlyStoodOnByPlayer =
      this.#currentRenderProps?.stoodOnByPlayer ?? false;

    const stoodOnByPlayer = iterateStoodOnByItems(stoodOnBy, room).some(
      isPlayableItem,
    );

    if (stoodOnByPlayer && !currentlyStoodOnByPlayer) {
      const sound = loadedSounds().teleportWarningSiren;

      this.#sirenLoop = audioCtx.createBufferSource();
      this.#sirenLoop.buffer = sound;
      this.#sirenLoop.loop = true;

      this.#sirenLoop.connect(this.#sirenChannel);
      this.#sirenLoop.start();
    }
    if (!stoodOnByPlayer && currentlyStoodOnByPlayer) {
      this.#sirenLoop?.stop();
      this.#sirenLoop = null;
    }

    this.#currentRenderProps = { stoodOnByPlayer };
  }

  destroy(): void {}
}
