import { Container, type Filter } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { zxSpectrumColor } from "../../../../originalGame";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
import { isPortable } from "../../../physics/itemPredicates";
import { OutlineFilter } from "../../filters/OutlineFilter";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type DecorateItemRenderer } from "./DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

class PortableItemPickUpNextHighlightRenderer<T extends ItemInPlayType>
  implements ItemChainPixiRenderer<T>
{
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
    const { item } = this.renderContext;
    // the decorator only wraps portable items; re-narrow here so the portable
    // state is typed rather than cast:
    const wouldPickUpNext =
      isPortable(item) ? item.state.wouldPickUpNext : false;

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
    return isPortable(itemRenderContext.item) ?
        new PortableItemPickUpNextHighlightRenderer(
          itemRenderContext,
          childRenderer,
        )
      : childRenderer;
  };
