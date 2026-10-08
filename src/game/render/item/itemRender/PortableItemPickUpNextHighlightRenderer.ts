import { Container, type Filter } from "pixi.js";

import {
  itemBehaviourKey,
  type ItemInPlayType,
} from "../../../../model/ItemInPlay";
import { getRoomItem } from "../../../../model/RoomState";
import { zxSpectrumColor } from "../../../../originalGame";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
import { selectHeelsAbilities } from "../../../gameState/gameStateSelectors/selectPlayableItem";
import { OutlineFilter } from "../../filters/OutlineFilter";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type DecorateItemRenderer } from "./DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

class PortableItemPickUpNextHighlightRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  public readonly output: Container = new Container({
    label: "PortableItemPickUpNextHighlightRenderer",
  });
  #outlineFilter: Filter;
  #applied = false;

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemChainPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);

    const {
      general: { spriteOption, spritesheetMeta },
      room,
    } = renderContext;

    const outlineColour =
      spriteOption.uncolourised ?
        zxSpectrumColor(room.color)
      : effectColour(spritesheetMeta, room.color.shade === "dimmed", "carry");

    // shared via the room renderer's filter cache (one per colour serves
    // every portable item in the room), so the highlight is applied by
    // attaching/detaching it, never by mutating the filter:
    this.#outlineFilter = renderContext.filterCache.getOrInsertComputed(
      `outline(${outlineColour.toHex()})`,
      () => new OutlineFilter({ color: outlineColour }),
    );
  }

  tick(tickContext: ItemTickContext) {
    const { item, room } = this.renderContext;
    // only one of heels and headOverHeels can be in a room:
    const carrier =
      getRoomItem("heels", room.items) ??
      getRoomItem("headOverHeels", room.items);
    const wouldPickUpNext =
      carrier !== undefined &&
      selectHeelsAbilities(carrier)?.wouldPickUpNextItemId === item.id;

    if (wouldPickUpNext !== this.#applied) {
      this.output.filters = wouldPickUpNext ? this.#outlineFilter : [];
      this.#applied = wouldPickUpNext;
    }

    this.#childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.#childRenderer.destroy();
  }
}

export const portableItemPickHighlightDecorateItemRenderer: DecorateItemRenderer =
  (itemRenderContext, childRenderer) => {
    const { item } = itemRenderContext;
    return item[itemBehaviourKey].isPortable(item) ?
        new PortableItemPickUpNextHighlightRenderer(
          itemRenderContext,
          childRenderer,
        )
      : childRenderer;
  };
