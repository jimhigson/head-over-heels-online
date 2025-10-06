import { Application } from "pixi.js";
import { useEffect, useState } from "react";

import { spritesheetPaletteDim } from "../../gfx/spritesheetPaletteDim";
import { getPaletteSwapFilter } from "../game/render/filters/PaletteSwapFilter";
import { omit } from "../utils/pick";

const lutDisplaySize = 512;

/**
 * Debug page to visualize the LUT texture for palette swapping
 */
export const LutPage = () => {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    // Create the palette swap filter with dim palette replacements
    const filter = getPaletteSwapFilter(
      omit(
        spritesheetPaletteDim,
        // keep the replace colours out - these should be free to change any time
        // since they don't impact the game, and shouldn't need snapshots regenerating
        "replaceLight",
        "replaceDark",
      ),
    );

    let unmounted = false;

    const extractTexture = async () => {
      // Create a temporary app just to extract the texture
      const app = new Application();
      await app.init({
        width: lutDisplaySize,
        height: lutDisplaySize,
      });

      if (unmounted) {
        app.destroy();
        return;
      }

      // Extract the LUT texture to a data URL
      const base64 = await app.renderer.extract.base64(filter.lut);
      setDataUrl(base64);

      // Clean up the temporary app
      app.destroy();
    };

    extractTexture();

    return () => {
      unmounted = true;
    };
  }, []);

  if (!dataUrl) {
    return null;
  }

  return (
    <>
      <div
        className="lut-display top-0 left-0 absolute"
        style={{
          width: lutDisplaySize,
          height: lutDisplaySize,
          backgroundImage: `url(${dataUrl})`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
          backgroundColor: "#000",
        }}
      />
      <title>LUT</title>
    </>
  );
};
