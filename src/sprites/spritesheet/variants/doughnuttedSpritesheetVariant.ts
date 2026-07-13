import { type Texture } from "pixi.js";

import {
  resolveNamedColourSwops,
  resolveSwops,
} from "../../../utils/palette/palette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  replaceSpritesheetWithSwopped,
  type SpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./AppSpritesheet";

export const buildDoughnuttedSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet | undefined => {
  const { roomColor, spritesheetMetaData } = context;

  const { palette } = spritesheetMetaData;
  const doughnuttedSwops = spritesheetMetaData.swops?.doughnutted;

  if (doughnuttedSwops === undefined) {
    // no doughnutted swops declared: this sheet has no doughnutted variant
    return undefined;
  }

  const swops: SpritesheetTextureSwops = {
    ambient: [
      {
        swops: resolveSwops(
          palette,
          resolveNamedColourSwops(doughnuttedSwops.colours, palette),
        ),
        lutType: "sparse",
      },
    ],
  };

  let result = createSpritesheetVariant(
    context,
    swops,
    baseTexture,
    originalSpritesheet,
  );

  if (roomColor.shade === "dimmed") {
    const dimSwops = ambientDimSwops(spritesheetMetaData);
    if (dimSwops !== undefined) {
      result = replaceSpritesheetWithSwopped(
        context,
        result,
        dimSwops,
        originalSpritesheet,
      );
    }
  }

  return result;
};
