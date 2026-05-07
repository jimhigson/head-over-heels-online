import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemRenderContext } from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemPixiRenderer";

/**
 * Creates a decorator/wrapper around a child item renderer, adding some additional
 * rendering to it (or maybe returning the original if declining to enhance).
 * Used in the fixed rendering chain where a child is always present.
 */
export type DecorateItemRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
) => ItemPixiRenderer<T>;

/**
 * Like {@link DecorateItemRenderer} but for injected decorators that may be
 * applied to items without an appearance — both child and return are optional.
 */
export type DecorateItemMaybeRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
  childRenderer?: ItemPixiRenderer<T>,
) => ItemPixiRenderer<T> | undefined;
