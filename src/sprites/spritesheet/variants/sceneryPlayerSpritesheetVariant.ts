import { type Texture } from "pixi.js";

import {
  resolveNamedColourSwops,
  resolveSwops,
} from "../../../utils/palette/palette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./AppSpritesheet";

export const buildSceneryPlayerSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet | undefined => {
  const { roomColor, spritesheetMetaData } = context;
  const { palette } = spritesheetMetaData;

  const sceneryPlayerSwops = spritesheetMetaData.swops?.sceneryPlayer;
  if (sceneryPlayerSwops === undefined) {
    // no scenery-player swops declared: this sheet has no such variant
    return undefined;
  }

  let result = createSpritesheetVariant(
    context,
    {
      ambient: [
        {
          swops: resolveSwops(
            palette,
            resolveNamedColourSwops(sceneryPlayerSwops.colours, palette),
          ),
          lutType: "sparse",
        },
      ],
    },
    baseTexture,
    originalSpritesheet,
  );

  // a second swop is possible to apply dimming:
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
