import type { Color } from "pixi.js";

import { Texture } from "pixi.js";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../../sprites/palette/spritesheetPalette";
import { standardBrightnessLevels } from "../../../../utils/colour/halfBrite";
import { objectEntriesIter } from "../../../../utils/entries";
import { getBlockNeighborhood } from "./blockEncode";
import { lutSize, lutW } from "./lutSize";

export type PaletteSwaps = Partial<Record<SpritesheetPaletteColourName, Color>>;

export const sparseLut = (swops: PaletteSwaps): Texture => {
  // Create RGBA texture data (4 bytes per pixel)
  const data = new Uint8Array(lutSize * 4);

  // we also put the shadow-ed version of the colour in the LUT:
  for (const bright of standardBrightnessLevels) {
    for (const [original, target] of objectEntriesIter(swops)) {
      const originalColor = spritesheetPalette[original];

      // Write to a neighborhood of positions to handle slight color variations
      // (e.g., from anti-aliasing, compression artifacts, or floating point errors)
      for (const { x, y, distance } of getBlockNeighborhood(
        originalColor.red * bright,
        originalColor.green * bright,
        originalColor.blue * bright,
        2,
      )) {
        // Calculate linear index in the texture
        const index = y * lutW + x;

        const existingAlpha = data[index * 4 + 3];

        // Alpha channel stores closeness (0 = far/unwritten, 255 = exact match)
        // For radius 1, max distance is sqrt(3) ≈ 1.732
        // Scale: distance 0 -> alpha 255, distance 1.732 -> alpha 1
        const closenessAlpha = Math.max(
          1,
          Math.floor(255 - (distance / 1.732) * 254),
        );

        // Only overwrite if:
        // - The position is empty (alpha = 0, unwritten), OR
        // - This distance is closer than what's already there (higher alpha)
        if (existingAlpha === 0 || closenessAlpha > existingAlpha) {
          // Set the replacement color in the LUT
          data[index * 4 + 0] = Math.floor(target.red * bright * 255);
          data[index * 4 + 1] = Math.floor(target.green * bright * 255);
          data[index * 4 + 2] = Math.floor(target.blue * bright * 255);
          data[index * 4 + 3] = closenessAlpha; // Store closeness in alpha
        }
      }
    }
  }

  // Final pass: normalize alpha to 1 where it's non-zero (for better visualization)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      data[i] = 255;
    }
  }

  // Create texture from the uint8 data using BufferSourceOptions
  const texture = Texture.from({
    resource: data,
    width: lutW,
    height: lutW,
    scaleMode: "nearest",
    antialias: false,
  });

  return texture;
};
