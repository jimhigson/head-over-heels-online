import { type Container, type RenderLayer } from "pixi.js";

import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import { type RoomState } from "../../model/RoomState";
import { type MovedOrResizedItems } from "../mainLoop/progressGameState";
import { type ItemRenderPipeline } from "./item/itemRender/createItemRenderer";
import { type GeneralRenderContext } from "./room/RoomRenderContexts";
import { type ZGraph } from "./sortZ/GraphEdges";

export type ItemZGraph<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = ZGraph<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>;

export type ItemRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  room: RoomState<string, string>;
  general: GeneralRenderContext<string>;
  /**
   * layer to render items over the room items that emulate colour clash, ie for the floor
   * edge colourisation
   *
   * https://pixijs.com/8.x/guides/concepts/render-layers
   */
  colourClashLayer?: RenderLayer;
  frontLayer: RenderLayer;
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

  isReflection: boolean;
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
