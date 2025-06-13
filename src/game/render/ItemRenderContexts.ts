import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { GeneralRenderContext } from "./RoomRenderContexts";
import type { IRenderLayer } from "pixi.js";

export type ItemRenderContext<T extends ItemInPlayType> = {
  item: ItemTypeUnion<T, string, string>;
  room: RoomState<string, string>;
  general: GeneralRenderContext<string>;
  /**
   * non colourised rendering (anything that doesn't get colourise-reverted when
   * colourisation is turned off) should be attached here, as well as being
   * rendered normally
   *
   * https://pixijs.com/8.x/guides/concepts/render-layers
   */
  uncolourisedLayer: IRenderLayer;
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
