import type { Application } from "pixi.js";
import { amigaLowResPal } from "../../originalGame";
import type { Xy } from "@/utils/vectors/vectors";
//import { CRTFilter, HslAdjustmentFilter } from "pixi-filters";

export const upscale = (app: Application) => {
  let curUpscale = 1;

  return {
    get curUpscale() {
      return curUpscale;
    },
    /* 
      returns the effective size of the screen (ie, the size to render to, the size before upscaling)
      or undefined if not yet known
    */
    rescale(): Xy {
      if (app.renderer.width === 0 || app.renderer.height === 0)
        // not ready yet - size not known - this shouldn't happen
        throw new Error();

      const scaleFactor = Math.floor(
        Math.min(
          app.renderer.width / amigaLowResPal.width,
          app.renderer.height / amigaLowResPal.height,
        ),
      );
      const effectiveSize = {
        x: Math.round(app.renderer.width / scaleFactor),
        y: Math.round(app.renderer.height / scaleFactor),
      };

      if (curUpscale === scaleFactor) {
        return effectiveSize;
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
      return effectiveSize;
    },
  };
};
