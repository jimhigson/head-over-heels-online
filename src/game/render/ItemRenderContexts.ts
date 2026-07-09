import { type Container, type RenderLayer } from "pixi.js";

import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import { type RoomState } from "../../model/RoomState";
import { type MovedOrResizedItems } from "../mainLoop/progressGameState";
import { type ItemRenderPipeline } from "./item/itemRender/createItemRenderer";
import { type RenderBoxes } from "./renderBox/makeItemRenderBoxAtCameraAngle";
import { type GeneralRenderContext } from "./room/RoomRenderContexts";
import { type ZGraph } from "./sortZ/GraphEdges";

export type ItemZGraph<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = ZGraph<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>;

/**
 * the context appearances receive. The layer/render-box fields are optional
 * because standalone contexts (eg the hud's carried-item render) genuinely
 * have no room renderer behind them; in-room rendering always provides them
 * (see {@link ItemRenderContext})
 */
export type AppearanceRenderContext<T extends ItemInPlayType> = {
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
};

/**
 * the {@link AppearanceRenderContext} plus the pipeline-renderer-only
 * concerns (which no appearance reads), with the room-renderer-provided
 * fields guaranteed present. Declared flat (not as an intersection) so
 * narrowing/comparability behaves like a plain object type
 */
export type ItemRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  room: RoomState<string, string>;
  general: GeneralRenderContext<string>;
  isReflection: boolean;
  /** see {@link AppearanceRenderContext.colourClashLayer} */
  colourClashLayer?: RenderLayer;
  frontLayer: RenderLayer;
  /** see {@link AppearanceRenderContext.renderBoxes} */
  renderBoxes: RenderBoxes<UnionOfAllItemInPlayTypes>;
  /**
   * the container positioned at this item's projected origin - the
   * ItemPositionRenderer's output, set once that renderer is constructed. Debug
   * overlays that draw at the item's true projected positions (eg the bounding box)
   * parent to this, so they are not shifted by the near-corner offset applied to the
   * item's sprites.
   */
  itemPositionContainer?: Container;
  /**
   * the (mutated in place) record of which items is in front of which,
   * including what can't be applied due to cyclic dependencies
   * - updated by the time the item renders
   */
  zEdges: ItemZGraph;
  /**
   * allows any item's renderers to get access to another item's current
   * render pipeline (ie, for masking against other items's renderings)
   */
  getItemRenderPipeline: (
    item: UnionOfAllItemInPlayTypes,
  ) => ItemRenderPipeline<ItemInPlayType> | undefined;
};

/**
 * narrow an appearance context back to the full pipeline context, for the few
 * appearances that need pipeline capabilities (eg the mirror, which renders
 * other items' reflections). Such items can never legitimately appear in a
 * standalone appearance context (mirrors are not portable), so this asserts
 * rather than making every appearance carry the pipeline surface
 */
export const asItemRenderContext = <T extends ItemInPlayType>(
  renderContext: AppearanceRenderContext<T>,
): ItemRenderContext<T> => {
  if (!("zEdges" in renderContext)) {
    throw new Error(
      "appearance needs the full item render context but was given a standalone appearance context",
    );
  }
  return renderContext as ItemRenderContext<T>;
};

export type ItemTickContext = {
  /**
   * The lastRenderRoomTime from the room's renderer. This is not a property
   * of the room itself, but of the room's rendering.
   *
   * @see RoomRenderer.#lastRenderRoomTime
   */
  lastRenderRoomTime: number | undefined;
  deltaMS: number;
  movedOrResizedItems: MovedOrResizedItems<string, string>;
};
