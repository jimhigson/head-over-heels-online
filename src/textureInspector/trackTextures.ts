import type { Application } from "pixi.js";

import { addToConsole } from "./consoleInterface";
import { patchPixiToTrackTextures } from "./patchPixi";

/**
 * Start tracking textures in a PixiJS application
 * @param app - The PixiJS Application instance
 */
export const trackTextures = (app: Application): void => {
  patchPixiToTrackTextures(app);
  addToConsole();
};
