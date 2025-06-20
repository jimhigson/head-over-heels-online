import type { Application } from "pixi.js";

export const stopAppAutoRendering = (app: Application) => {
  app.ticker.remove(app.render, app);
};
