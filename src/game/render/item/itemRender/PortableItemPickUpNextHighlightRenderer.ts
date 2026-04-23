import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { DecorateItemRenderer } from "./DecorateItemRenderer";
import type { ItemPixiRenderer } from "./ItemPixiRenderer";

import { zxSpectrumColor } from "../../../../originalGame";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
import {
  isPortable,
  type PortableItemType,
} from "../../../physics/itemPredicates";
import { OutlineFilter } from "../../filters/OutlineFilter";

class PortableItemPickUpNextHighlightRenderer
  implements ItemPixiRenderer<PortableItemType>
{
  public readonly output: Container = new Container({
    label: "PortableItemPickUpNextHighlightRenderer",
  });
  #outlineFilter: OutlineFilter;

  readonly renderContext: ItemRenderContext<PortableItemType>;
  #childRenderer: ItemPixiRenderer<ItemInPlayType>;

  constructor(
    renderContext: ItemRenderContext<PortableItemType>,
    childRenderer: ItemPixiRenderer<ItemInPlayType>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);

    const {
      general: { spriteOption, spritesheetMeta },
      room,
    } = renderContext;

    this.#outlineFilter = new OutlineFilter({
      color:
        spriteOption.uncolourised ?
          zxSpectrumColor(room.color)
        : effectColour(spritesheetMeta, room.color.shade === "dimmed", "carry"),
    });
    this.#outlineFilter.enabled = false;
    this.output.filters = this.#outlineFilter;
  }

  tick(tickContext: ItemTickContext) {
    const { wouldPickUpNext } = this.renderContext.item.state;

    this.#outlineFilter.enabled = wouldPickUpNext;

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
        (new PortableItemPickUpNextHighlightRenderer(
          itemRenderContext as ItemRenderContext<PortableItemType>,
          childRenderer,
        ) as typeof childRenderer)
      : childRenderer;
  };
