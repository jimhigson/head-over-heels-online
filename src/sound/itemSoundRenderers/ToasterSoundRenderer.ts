import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { createAudioNode } from "../soundUtils/createAudioNode";
import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemInPlay } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { isChargingCyberman } from "../../game/physics/itemPredicates";
import { size } from "iter-tools";

/**
 * Count how many are charging on this toaster.
 *
 * The sound of a toaster only cares how many cybermen are chargin on it, not
 * their positions
 */
const chargingCybermanOnToasterCount = (
  toaster: ItemInPlay<"deadlyBlock", string, string>,
  room: RoomState<string, string>,
): number => {
  return size(
    iterateStoodOnByItems(toaster.state.stoodOnBy, room).filter(
      isChargingCyberman,
    ),
  );
};

export class ToasterSoundRenderer implements ItemSoundRenderer<"deadlyBlock"> {
  public readonly output: GainNode = audioCtx.createGain();

  #currentStoodOnCount: number | undefined = undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"deadlyBlock">,
  ) {
    this.output.gain.value = 2;
  }

  tick(_tickContext: ItemTickContext) {
    const {
      renderContext: { item, room },
    } = this;

    const stoodOnCount = chargingCybermanOnToasterCount(item, room);

    const poppingUp =
      this.#currentStoodOnCount !== undefined &&
      stoodOnCount < this.#currentStoodOnCount;

    if (poppingUp) {
      createAudioNode({
        soundId: "toasterPopUpSoundUrl",
        connectTo: this.output,
      });
    }

    this.#currentStoodOnCount = stoodOnCount;
  }

  destroy(): void {}
}
