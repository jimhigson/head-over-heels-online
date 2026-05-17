import { CompositeItemGraphicsRenderer } from "./CompositeItemGraphicsRenderer";
import { type DecorateItemMaybeRenderer } from "./DecorateItemRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";

export const boundingBoxDecorateItemRenderer: DecorateItemMaybeRenderer = (
  itemRenderContext,
  childRenderer,
) => {
  const bbRenderer = new ItemBoundingBoxRenderer(itemRenderContext);

  if (!childRenderer) {
    return bbRenderer;
  }

  return new CompositeItemGraphicsRenderer(
    [childRenderer, bbRenderer],
    itemRenderContext,
  );
};
