import type { Application } from "pixi.js";
import { zxSpectrumResolution } from "../../originalGame";
import type { Xy } from "@/utils/vectors/vectors";
//import { CRTFilter, HslAdjustmentFilter } from "pixi-filters";

//const targetSize = amigaLowResPal;
const targetSize = zxSpectrumResolution;

export const calculateUpscale = (
  modernScreenSize: Xy,
  originalScreenSize: Xy,
) => {
  const scaleFactor = Math.floor(
    Math.min(
      modernScreenSize.x / originalScreenSize.x,
      modernScreenSize.y / originalScreenSize.y,
    ),
  );
  const effectiveSize = {
    x: Math.round(modernScreenSize.x / scaleFactor),
    y: Math.round(modernScreenSize.y / scaleFactor),
  };

  return { scaleFactor, effectiveSize };
};

export const Upscale = (app: Application) => {
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

      const { effectiveSize, scaleFactor } = calculateUpscale(
        { x: app.renderer.width, y: app.renderer.height },
        targetSize,
      );

      if (curUpscale !== scaleFactor) {
        curUpscale = scaleFactor;
        console.log("scale factor changed to:", scaleFactor);

        app.stage.scale = scaleFactor;
      }
      return effectiveSize;
    },
  };
};
