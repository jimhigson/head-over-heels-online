import type { Application } from "pixi.js";
import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";

export const useSyncAppWithStoreScale = (app: Application) => {
  const upscale = useAppSelector(selectUpscale);
  // TODO: this can be used in main game engine too
  app.stage.scale = upscale.gameEngineUpscale;
  app.renderer?.resize(upscale.canvasSize.x, upscale.canvasSize.y);
};
export const SyncAppWithStoreScale = ({ app }: { app: Application }) => {
  useSyncAppWithStoreScale(app);
  return null; //render nothing
};
