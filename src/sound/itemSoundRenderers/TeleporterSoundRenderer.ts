import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isPlayableItem } from "../../game/physics/itemPredicates";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { teleporterIsActive } from "../../game/physics/mechanics/teleporting";

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
