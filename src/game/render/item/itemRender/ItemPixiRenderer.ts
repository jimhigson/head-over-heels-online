import { type Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import {
  type ItemLeafRenderContext,
  type ItemLeafTickContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type Renderer } from "../../Renderer";

/**
 * an item's own graphics renderer - the leaf. It needs only the leaf-level
 * render context (item/room/general/isReflection, optionally filterCache) and
 * the {@link ItemLeafTickContext} to render the item itself
 */
export type ItemLeafPixiRenderer<
  T extends ItemInPlayType,
  Output extends Container = Container,
> = Renderer<ItemLeafRenderContext<T>, ItemLeafTickContext, Output>;

/**
 * the item-renderer interface used across the render chain - the leaves plus the
 * position/shadow/bounding-box wrappers that carry the fuller
 * {@link ItemRenderContext}
 */
export type ItemChainPixiRenderer<
  T extends ItemInPlayType,
  Output extends Container = Container,
> = Renderer<ItemLeafRenderContext<T>, ItemTickContext, Output>;
