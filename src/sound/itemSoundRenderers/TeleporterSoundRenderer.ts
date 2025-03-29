import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { isPlayableItem } from "../../game/physics/itemPredicates";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { teleporterIsActive } from "../../game/physics/mechanics/teleporting";

export class TeleporterSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"teleporter", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #sirenBracket = createBracketedSound({
    loop: { soundId: "teleportWarningSiren" },
    connectTo: this.output,
  });

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "teleporter",
      RoomId,
      RoomItemId
    >,
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
