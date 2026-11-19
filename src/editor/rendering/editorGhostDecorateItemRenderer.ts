import { type DecorateItemMaybeRenderer } from "../../game/render/item/itemRender/DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "../../game/render/item/itemRender/ItemPixiRenderer";
import { type ItemRenderContext } from "../../game/render/ItemRenderContexts";
import { type ItemInPlayType } from "../../model/ItemInPlay";
import { EditorGhostPixiRenderer } from "./EditorGhostPixiRenderer";

const isEditorGhostRenderContext = (
  renderContext: ItemRenderContext<ItemInPlayType>,
): renderContext is ItemRenderContext<"editorGhost"> =>
  renderContext.item.type === "editorGhost";

/**
 * draws editor ghosts, which the game has no appearance for, as their brush
 * items. Must come before any decorator that only wraps an existing drawing
 */
export const editorGhostDecorateItemRenderer: DecorateItemMaybeRenderer = <
  T extends ItemInPlayType,
>(
  itemRenderContext: ItemRenderContext<T>,
  childRenderer?: ItemChainPixiRenderer<T>,
) => {
  if (!isEditorGhostRenderContext(itemRenderContext)) {
    return childRenderer;
  }
  // narrowing the context does not narrow T, so T is "editorGhost" here:
  return new EditorGhostPixiRenderer(
    itemRenderContext,
    itemRenderContext.createItemLeafPixiRenderer({
      ...itemRenderContext,
      item: itemRenderContext.item.config.brushItem,
    }),
  ) as ItemChainPixiRenderer<T>;
};
