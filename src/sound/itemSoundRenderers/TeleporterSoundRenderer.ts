import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isPlayableItem } from "../../game/physics/itemPredicates";
import { teleporterIsActive } from "../../game/physics/mechanics/teleporting";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";

export class TeleporterSoundRenderer
  implements ItemSoundRenderer<"portableTeleporter" | "teleporter">
{
  public readonly output: GainNode = audioCtx.createGain();

  #sirenBracket;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "portableTeleporter" | "teleporter"
    >,
  ) {
    this.#sirenBracket = createBracketedSound(
      {
        loop: {
          soundId: "teleportWarningSiren",
          playbackRate:
            renderContext.item.type === "portableTeleporter" ? 1.25 : 1,
        },
      },
      this.output,
    );
  }

  tick() {
    const {
      renderContext: { item, room },
    } = this;

    this.#sirenBracket(
      teleporterIsActive(item) &&
        iterateStoodOnByItems(item.state.stoodOnBy, room).some(isPlayableItem),
    );
  }

  destroy(): void {
    this.#sirenBracket(false);
  }
}
