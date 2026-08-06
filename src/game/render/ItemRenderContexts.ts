import { type Container, type RenderLayer } from "pixi.js";

import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import { type RoomState } from "../../model/RoomState";
import { type Graph } from "../../utils/graph/Graph";
import { type MovedOrResizedItems } from "../mainLoop/progressGameState";
import { type ItemRenderPipeline } from "./item/itemRender/createItemRenderer";
import { type ItemLeafPixiRenderer } from "./item/itemRender/ItemPixiRenderer";
import { type RenderBoxes } from "./renderBox/makeItemRenderBoxAtCameraAngle";
import { type GeneralRenderContext } from "./room/RoomRenderContexts";
import { type FilterCache } from "./room/RoomRenderer";

export type ItemZGraph<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = Graph<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>;

/**
 * the context a leaf item renderer receives. The layer/render-box fields are
 * optional because standalone contexts (eg the hud's carried-item render)
 * genuinely have no room renderer behind them; in-room rendering always
 * provides them (see {@link ItemRenderContext})
 */
export type ItemLeafRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  room: RoomState<string, string>;
  general: GeneralRenderContext<string>;
  isReflection: boolean;
  /**
   * layer to render items over the room items that emulate colour clash, ie for the floor
   * edge colourisation
   *
   * https://pixijs.com/8.x/guides/concepts/render-layers
   */
  colourClashLayer?: RenderLayer;
  frontLayer?: RenderLayer;
  /**
   * every room item's render box at this renderer's camera angle - owned and
   * reconciled per-tick by the room renderer. `null` = deliberately no box
   * (the item renders true to its physical aabb)
   */
  renderBoxes?: RenderBoxes<UnionOfAllItemInPlayTypes>;
  /**
   * shared, keyed filters for any item renderer/appearance to stash filters
   * that others (or itself, on a later render) can reuse.
   *
   * Optional because
   * standalone contexts (eg the hud's carried-item render) have no room renderer
   * behind them to own one; every appearance that reads it is only ever rendered
   * in-room, where {@link ItemRenderContext} guarantees it
   */
  filterCache?: FilterCache;
};

/**
 * the {@link ItemLeafRenderContext} plus the pipeline-renderer-only concerns
 * (which no appearance reads), with the room-renderer-provided fields (which are
 * optional on the leaf context) guaranteed present
 */
export type ItemRenderContext<T extends ItemInPlayType> =
  ItemLeafRenderContext<T> & {
    frontLayer: RenderLayer;
    renderBoxes: RenderBoxes<UnionOfAllItemInPlayTypes>;
    filterCache: FilterCache;
    /**
     * the container positioned at this item's projected origin - the
     * ItemPositionRenderer's output, set once that renderer is constructed. Debug
     * overlays that draw at the item's true projected positions (eg the bounding box)
     * parent to this, so they are not shifted by the near-corner offset applied to the
     * item's sprites.
     */
    itemPositionContainer?: Container;
    /**
     * Item graph of the parent room renderer
     */
    zEdges: ItemZGraph;
    /**
     * allows any item's renderers to get access to another item's current
     * render pipeline (ie, for masking against other items's renderings)
     */
    getItemRenderPipeline: (
      item: UnionOfAllItemInPlayTypes,
    ) => ItemRenderPipeline<ItemInPlayType> | undefined;
    /**
     * to create a renderer for another item - lets a room item (eg
     * a mirror rendering reflections) render other items
     */
    createItemLeafPixiRenderer: <U extends ItemInPlayType>(
      renderContext: ItemLeafRenderContext<U>,
    ) => ItemLeafPixiRenderer<U> | undefined;
  };

/**
 * narrow an appearance context back to the full pipeline context, for the few
 * appearances that need pipeline capabilities (eg the mirror, which renders
 * other items' reflections). Such items can never legitimately appear in a
 * standalone appearance context (mirrors are not portable), so this asserts
 * rather than making every appearance carry the pipeline surface
 */
export const asItemRenderContext = <T extends ItemInPlayType>(
  renderContext: ItemLeafRenderContext<T>,
): ItemRenderContext<T> => {
  if (!("zEdges" in renderContext)) {
    throw new Error(
      "appearance needs the full item render context but was given a standalone appearance context",
    );
  }
  return renderContext as ItemRenderContext<T>;
};

/**
 * the tick context a leaf item renderer (or an appearance) needs - without the
 * room-orchestration fields, which only the position/shadow/z-sort wrappers
 * read (see {@link ItemTickContext})
 */
export type ItemLeafTickContext = {
  /**
   * The lastRenderRoomTime from the room's renderer. This is not a property
   * of the room itself, but of the room's rendering.
   *
   * @see RoomRenderer.#lastRenderRoomTime
   */
  lastRenderRoomTime: number | undefined;
  deltaMS: number;
};

export type ItemTickContext = ItemLeafTickContext & {
  /**
   * the items that moved or resized since the last tick - read by the position,
   * shadow and z-sort machinery, never by a leaf renderer
   */
  movedOrResizedItems: MovedOrResizedItems<string, string>;
};
