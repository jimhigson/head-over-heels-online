import type { IRenderLayer } from "pixi.js";

import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { ItemRenderPipeline } from "./item/itemRender/createItemRenderer";
import type { GeneralRenderContext } from "./RoomRenderContexts";
import type { ZGraph } from "./sortZ/GraphEdges";

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
  colourClashLayer?: IRenderLayer;
  frontLayer: IRenderLayer;
  /**
   * the (mutated in place) record of which items is in front of which,
   * including what can't be applied due to cyclic dependencies
   * - updated by the time the
   * item renders
   */
  zEdges: ZGraph<string>;
  /**
   * allows any item's renderers to get access to another item's current
   * render pipeline (ie, for masking against other items's renderings)
   */
  getItemRenderPipeline: (
    itemid: string,
  ) => ItemRenderPipeline<ItemInPlayType> | undefined;
};

export type ItemTickContext = {
  /**
   * The lastRenderRoomTime from the room's renderer. This is not a property
   * of the room itself, but of the room's rendering.
   *
   * @see RoomRenderer.#lastRenderRoomTime
   */
  lastRenderRoomTime: number | undefined;
  progression: number;
  deltaMS: number;
  movedItems: MovedItems<string, string>;
};
