import type { Application } from "pixi.js";
import { amigaLowResPal } from "../../originalGame";
//import { CRTFilter, HslAdjustmentFilter } from "pixi-filters";

export const upscale = (app: Application) => {
  let curUpscale = 1;

  return {
    get curUpscale() {
      return curUpscale;
    },
    rescale() {
      if (app.renderer.width === 0 || app.renderer.height === 0)
        // not ready yet - size not known
        return;

      const scaleFactor = Math.floor(
        Math.min(
          app.renderer.width / amigaLowResPal.width,
          app.renderer.height / amigaLowResPal.height,
        ),
      );

      if (curUpscale === scaleFactor) {
        return;
      }
      curUpscale = scaleFactor;
      console.log("scale factor changed to:", scaleFactor);
      /*
      app.stage.filters = [
        new CRTFilter({
          lineWidth: 0.25,
          lineContrast: 0.2,
          curvature: 0,
          noise: 0,
          vignetting: 0.3,
        }),
        new HslAdjustmentFilter({
          saturation: 0.2,
          hue: 0,
          lightness: 0,
          colorize: false,
          alpha: 1,
        }),
      ];
      */
      app.stage.scale = scaleFactor;
    },
  };
};
