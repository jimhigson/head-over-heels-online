import { Application, type Texture } from "pixi.js";
import { useEffect, useState } from "react";

import { blockstackToSpectrumLut } from "../game/render/filters/lutTexture/stdLuts/blockstackToSpectrumLut";
import { paletteQuantisationLut } from "../game/render/filters/lutTexture/stdLuts/paletteQuantisationLut";
import { spectrumLumLut } from "../game/render/filters/lutTexture/stdLuts/spectrumLumLut";
import { toppyToSpectrumLut } from "../game/render/filters/lutTexture/stdLuts/toppyToSpectrumLut";

const lutDisplaySize = 512;

const luts = [
  paletteQuantisationLut,
  blockstackToSpectrumLut(),
  toppyToSpectrumLut(),
  spectrumLumLut(),
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
      const app = new Application();
      await app.init({
        width: lutDisplaySize,
        height: lutDisplaySize,
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
      <div className="e2e-snapshot-target">
        {luts.map((texture, index) => (
          <SingleLutDisplay key={index} texture={texture} />
        ))}
      </div>
      <title>LUTs</title>
    </>
  );
};
export default LutPage;
