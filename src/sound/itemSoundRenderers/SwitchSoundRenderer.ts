import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { SwitchSetting } from "../../model/ItemInPlay";
import { store } from "../../store/store";
import { selectAtPath } from "../../store/selectors";

export class SwitchSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"switch", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #channelNode: GainNode = audioCtx.createGain();

  #currentRenderProps: { setting: SwitchSetting } | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "switch",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#channelNode.connect(this.output);
  }

  tick() {
    const {
      renderContext: {
        item: {
          state: { setting: stateSetting },
          config: switchConfig,
        },
      },
    } = this;

    // TODO: this is the same in the pixi renderer appearance, could be shared
    const setting =
      switchConfig.type === "in-store" ?
        selectAtPath(store.getState(), switchConfig.path) ? "right"
        : "left"
      : stateSetting;

    const currentSetting = this.#currentRenderProps?.setting;

    if (currentSetting !== undefined && currentSetting !== setting) {
      const sound = loadedSounds().switchClick;

      const source = audioCtx.createBufferSource();
      source.buffer = sound;
      source.playbackRate.value = setting === "right" ? 0.95 : 1.05;

      source.connect(this.#channelNode);
      source.start();
    }
    this.#currentRenderProps = { setting };
  }

  destroy(): void {}
}
