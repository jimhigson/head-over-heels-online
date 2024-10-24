import { Application } from "pixi.js";
import { zxSpectrumResolution } from "../originalGame";
//simport { CRTFilter, HslAdjustmentFilter } from "pixi-filters";

export const resize = async (app: Application) => {
  const scaleToFit = () => {
    if (app.renderer.width === 0 || app.renderer.height === 0)
      // not ready yet - size not known
      return;

    const scaleFactor = Math.floor(
      Math.min(
        app.renderer.width / zxSpectrumResolution.width,
        app.renderer.height / zxSpectrumResolution.height,
      ),
    );

    console.log("scale factor is:", scaleFactor);
    /*
    app.stage.filters = [
      new CRTFilter({
        lineWidth: 1,
        lineContrast: 0,
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
  };

  app.renderer.on("resize", () => scaleToFit());
  scaleToFit();
};
