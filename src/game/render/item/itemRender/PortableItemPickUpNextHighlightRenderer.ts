import { Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { zxSpectrumColor } from "../../../../originalGame";
import {
  spritesheetPalette,
  spritesheetPaletteDim,
} from "../../../../sprites/palette/spritesheetPalette";
import {
  isPortable,
  type PortableItemType,
} from "../../../physics/itemPredicates";
import { OutlineFilter } from "../../filters/outlineFilter";

class PortableItemPickUpNextHighlightRenderer
  implements ItemPixiRenderer<PortableItemType>
{
  public readonly output: Container = new Container({
    label: "PortableItemPickUpNextHighlightRenderer",
  });
  #outlineFilter: OutlineFilter;

  constructor(
    readonly renderContext: ItemRenderContext<PortableItemType>,
    private readonly childRenderer: ItemPixiRenderer<ItemInPlayType>,
  ) {
    this.output.addChild(childRenderer.output);

    const {
      general: { colourised },
      room,
    } = renderContext;

    this.#outlineFilter = new OutlineFilter({
      color:
        colourised ?
          (room.color.shade === "dimmed" ?
            spritesheetPaletteDim
          : spritesheetPalette
          ).moss
        : zxSpectrumColor(room.color),
    });
    this.#outlineFilter.enabled = false;
    this.output.filters = this.#outlineFilter;
  }

  tick(tickContext: ItemTickContext) {
    const { wouldPickUpNext } = this.renderContext.item.state;

    this.#outlineFilter.enabled = wouldPickUpNext;

    this.childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.childRenderer.destroy();
  }
}

export const maybeWrapInPortableItemPickUpNextHighlightRenderer = <
  T extends ItemInPlayType,
>(
  item: ItemTypeUnion<T, string, string>,
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
): ItemPixiRenderer<T> => {
  return isPortable(item) ?
      (new PortableItemPickUpNextHighlightRenderer(
        itemRenderContext as ItemRenderContext<PortableItemType>,
        childRenderer,
      ) as ItemPixiRenderer<T>)
    : childRenderer;
};
