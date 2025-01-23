import type { Container } from "pixi.js";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { DisplaySettings } from "../../store/gameMenusSlice";

export type RenderContext = {
  movedItems: MovedItems;
  progression: number;
  deltaMS: number;
  displaySettings: DisplaySettings;
};

export interface Renderer {
  tick(renderContext: RenderContext): void;
  destroy(): void;
  container: Container;
}
