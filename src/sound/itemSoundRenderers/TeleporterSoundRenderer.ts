import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isPlayableItem } from "../../game/physics/itemPredicates";
import { teleporterIsActive } from "../../game/physics/mechanics/teleporting";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";

export class TeleporterSoundRenderer
  implements ItemSoundRenderer<"teleporter">
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #sirenBracket = createBracketedSound(
    {
      loop: { soundId: "teleportWarningSiren" },
    },
    this.output,
  );

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"teleporter">,
  ) {}

  tick() {
    const {
      renderContext: { item, room },
    } = this;

    this.#sirenBracket(
      teleporterIsActive(item) &&
        iterateStoodOnByItems(item.state.stoodOnBy, room).some(isPlayableItem),
    );
  }

  destroy(): void {}
}
