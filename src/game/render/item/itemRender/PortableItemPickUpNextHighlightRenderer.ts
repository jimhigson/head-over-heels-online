import { Container } from "pixi.js";
import type { ItemPixiRenderer } from "./ItemRenderer";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import {
  isPortable,
  type PortableItemType,
} from "../../../physics/itemPredicates";
import { outlineFilters } from "../../filters/outlineFilter";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { noFilters } from "../../filters/standardFilters";
import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";

const makeOutlineFilter = () => outlineFilters.moss;

class PortableItemPickUpNextHighlightRenderer
  implements ItemPixiRenderer<PortableItemType>
{
  public readonly output: Container = new Container({
    label: "PortableItemPickUpNextHighlightRenderer",
  });
  #outlined: boolean = false;

  constructor(
    readonly renderContext: ItemRenderContext<PortableItemType>,
    private readonly childRenderer: ItemPixiRenderer<ItemInPlayType>,
  ) {
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext) {
    const { wouldPickUpNext: outline } = this.renderContext.item.state;

    if (outline !== !this.#outlined) {
      this.output.filters = outline ? [makeOutlineFilter()] : noFilters;
    }
    this.#outlined = outline;

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
