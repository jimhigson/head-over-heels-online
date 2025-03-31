import type { Application } from "pixi.js";
import { useAppSelector } from "../../store/hooks";

export const useSyncAppWithStoreScale = (app: Application) => {
  const upscale = useAppSelector((state) => state.gameMenus.upscale);
  // TODO: this can be used in main game engine too
  app.stage.scale = upscale.gameEngineUpscale;
  app.renderer?.resize(upscale.canvasSize.x, upscale.canvasSize.y);
};
export const SyncAppWithStoreScale = ({ app }: { app: Application }) => {
  useSyncAppWithStoreScale(app);
  return null; //render nothing
};
