import { type Texture } from "pixi.js";

import {
  resolveNamedColourSwops,
  resolveSwops,
} from "../../../utils/palette/palette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
  replaceSpritesheetWithSwopped,
  type SpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./AppSpritesheet";

export const buildDoughnuttedSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet => {
  const { roomColor, spritesheetMetaData } = context;

  const { palette } = spritesheetMetaData;
  const doughnuttedSwops = spritesheetMetaData.swops?.doughnutted;

  const swops: SpritesheetTextureSwops =
    doughnuttedSwops === undefined ?
      noopSpritesheetTextureSwops
    : {
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
