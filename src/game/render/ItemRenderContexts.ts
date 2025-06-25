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
   * layer to render items over the room items that emulate colour clash, ie for the floor
   * edge colourisation
   *
   * https://pixijs.com/8.x/guides/concepts/render-layers
   */
  colourClashLayer?: IRenderLayer;
  frontLayer: IRenderLayer;
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
