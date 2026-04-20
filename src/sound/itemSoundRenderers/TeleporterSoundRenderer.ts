import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { isPlayableItem } from "../../game/physics/itemPredicates";
import { teleporterIsActive } from "../../game/physics/mechanics/teleporting";
import { iterateStoodOnByItems } from "../../model/stoodOnItemsLookup";
import { audioCtx } from "../audioCtx";
import { createBracketedSound } from "../soundUtils/createBracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

type TeleporterContext =
  | ItemSoundRenderContext<"portableTeleporter">
  | ItemSoundRenderContext<"teleporter">;

const isPortableTeleporterContext = (
  ctx: TeleporterContext,
): ctx is ItemSoundRenderContext<"portableTeleporter"> =>
  ctx.item.type === "portableTeleporter";

export class TeleporterSoundRenderer
  implements ItemSoundRenderer<"portableTeleporter" | "teleporter">
{
  public readonly output: GainNode = audioCtx.createGain();

  #sirenBracket;
  #freeItemSoundRenderer: FreeItemSoundRenderer | undefined;

  readonly renderContext: TeleporterContext;

  constructor(renderContext: TeleporterContext) {
    this.renderContext = renderContext;
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

    const ctx = renderContext;
    if (isPortableTeleporterContext(ctx)) {
      this.#freeItemSoundRenderer = new FreeItemSoundRenderer(ctx);
      this.#freeItemSoundRenderer.output.connect(this.output);
    }
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: { item, room },
    } = this;

    this.#sirenBracket(
      teleporterIsActive(item) &&
        iterateStoodOnByItems(item.state.stoodOnBy, room).some(isPlayableItem),
    );

    this.#freeItemSoundRenderer?.tick(tickContext);
  }

  destroy(): void {
    this.#sirenBracket(false);
    this.#freeItemSoundRenderer?.destroy();
  }
}
