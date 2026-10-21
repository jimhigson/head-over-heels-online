import { Application, type Texture } from "pixi.js";
import { useEffect, useState } from "preact/hooks";

import { installAppTickerAsPixiShared } from "../game/mainLoop/installAppTickerAsPixiShared";
import { blockstackPaletteQuantisationLut } from "../game/render/filters/lutTexture/stdLuts/blockstackPaletteQuantisationLut";
import { blockstackToSpectrumLut } from "../game/render/filters/lutTexture/stdLuts/blockstackToSpectrumLut";
import { deathLutForSpritesheet } from "../game/render/filters/lutTexture/stdLuts/lutForSpritesheet";
import { spectrumLumLut } from "../game/render/filters/lutTexture/stdLuts/spectrumLumLut";
import { toppyToSpectrumLut } from "../game/render/filters/lutTexture/stdLuts/toppyToSpectrumLut";
import { spritesheetMetas } from "../sprites/spritesheet/spritesheetData/spritesheetMetaData";

const lutDisplaySize = 512;

const luts = [
  blockstackPaletteQuantisationLut,
  blockstackToSpectrumLut(),
  toppyToSpectrumLut(),
  spectrumLumLut(),
  deathLutForSpritesheet(spritesheetMetas.blockstack),
  deathLutForSpritesheet(spritesheetMetas.toppy),
  deathLutForSpritesheet(spritesheetMetas.speccy),
];

interface SingleLutDisplayProps {
  /**
   * The texture to display
   */
  texture: Texture;
}

const SingleLutDisplay = ({ texture }: SingleLutDisplayProps) => {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let unmounted = false;

    const extractTexture = async () => {
      // this page only extracts a texture, but pixi gives every Application a
      // ticker regardless - point it at the app's one rather than letting pixi
      // build its own:
      installAppTickerAsPixiShared();

      const app = new Application();
      await app.init({
        width: lutDisplaySize,
        height: lutDisplaySize,
        // use the shared ticker (the app-specific one we just installed above)
        sharedTicker: true,
      });

      if (unmounted) {
        app.destroy();
        return;
      }

      const base64 = await app.renderer.extract.base64(texture);
      setDataUrl(base64);

      app.destroy();
    };

    extractTexture();

    return () => {
      unmounted = true;
    };
  }, [texture]);

  if (!dataUrl) {
    return null;
  }

  return (
    <div
      style={{
        width: lutDisplaySize,
        height: lutDisplaySize,
        backgroundImage: `url(${dataUrl})`,
        backgroundSize: "100% 100%",
        imageRendering: "pixelated",
        backgroundColor: "#000",
      }}
    />
  );
};

/**
 * Debug page to visualize all LUT textures for palette swapping
 */
export const LutPage = () => {
  return (
    <>
      <div class="e2e-snapshot-target">
        {luts.map((texture, index) => (
          <SingleLutDisplay key={index} texture={texture} />
        ))}
      </div>
      <title>LUTs</title>
    </>
  );
};
export default LutPage;
