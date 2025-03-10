import type { Container } from "pixi.js";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { SceneryName } from "../../sprites/planets";
import type { DisplaySettings } from "../../store/slices/gameMenusSlice";
import type { RoomState } from "../../model/RoomState";

export type RenderContext = object;

export type RoomRenderContext = {
  movedItems: MovedItems;
  progression: number;
  deltaMS: number;
  displaySettings: DisplaySettings;
  onHold: boolean;
};
export type ItemRenderContext<RoomId extends string> = RoomRenderContext & {
  room: RoomState<SceneryName, RoomId>;
};

export interface Renderer<RC extends RenderContext> {
  tick(renderContext: RC): void;
  destroy(): void;
  container: Container;
}
