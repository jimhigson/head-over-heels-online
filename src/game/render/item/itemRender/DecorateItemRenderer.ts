import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemRenderContext } from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemPixiRenderer";

/**
 * Creates a decorator/wrapper around a child item renderer, adding some additional
 * rendering to it (or maybe returning the original if declining to enhance).
 * Used by the editor to inject annotation/selection overlays to a room's item
 * rendering.
 *
 * Passed as an optional field on {@link RoomRenderContext} and forwarded to
 * {@link createItemRenderer} as an explicit argument — it is not carried on
 * the per-item {@link ItemRenderContext}, since it is never read at tick time.
 */
export type DecorateItemRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
) => ItemPixiRenderer<T>;

/** a wrapper that does nothing */
export const noopDecorateItemRenderer: DecorateItemRenderer = (_ctx, child) =>
  child;
