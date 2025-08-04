import type { Application } from "pixi.js";
import { patchPixiToTrackTextures } from "./patchPixi";
import { addToConsole } from "./consoleInterface";

/**
 * Start tracking textures in a PixiJS application
 * @param app - The PixiJS Application instance
 */
export const trackTextures = (app: Application): void => {
  patchPixiToTrackTextures(app);
  addToConsole();
};
