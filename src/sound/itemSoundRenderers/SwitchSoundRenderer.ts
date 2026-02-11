import type { SwitchSetting } from "../../model/ItemInPlay";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { selectBooleanUserSetting } from "../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../store/store";
import { audioCtx } from "../audioCtx";
import { createAudioNode } from "../soundUtils/createAudioNode";

export class SwitchSoundRenderer implements ItemSoundRenderer<"switch"> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #channelNode: GainNode = audioCtx.createGain();

  #currentSetting: SwitchSetting | undefined = undefined;

  constructor(public readonly renderContext: ItemSoundRenderContext<"switch">) {
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

    const setting =
      switchConfig.type === "in-store" ?
        (
          selectBooleanUserSetting(
            store.getState().gameMenus,
            switchConfig.path,
          )
        ) ?
          "right"
        : "left"
      : stateSetting;

    if (
      this.#currentSetting !== undefined &&
      this.#currentSetting !== setting
    ) {
      createAudioNode({
        soundId: "switchClick",
        playbackRate: setting === "right" ? 0.95 : 1.05,
        connectTo: this.#channelNode,
      });
    }
    this.#currentSetting = setting;
  }

  destroy(): void {}
}
