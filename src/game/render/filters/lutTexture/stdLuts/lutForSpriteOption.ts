import type { Texture } from "pixi.js";

import type { SpriteOption } from "../../../../../store/slices/gameMenus/gameMenusSlice";

import { blockstackToSpectrumLut } from "./blockstackToSpectrumLut";
import { spectrumLumLut } from "./spectrumLumLut";
import { toppyToSpectrumLut } from "./toppyToSpectrumLut";

let cachedBlockstack: Texture | undefined;
let cachedToppy: Texture | undefined;
let cachedLum: Texture | undefined;

export const lutForSpriteOption = (spriteOption: SpriteOption): Texture => {
  if (spriteOption.uncolourised) {
    return (cachedLum ??= spectrumLumLut());
  }
  switch (spriteOption.name) {
    case "BlockStack":
      return (cachedBlockstack ??= blockstackToSpectrumLut());
    case "Toppy":
      return (cachedToppy ??= toppyToSpectrumLut());
  }
};
