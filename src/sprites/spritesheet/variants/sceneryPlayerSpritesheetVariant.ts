import { type Texture } from "pixi.js";

import {
  type PartialNamedColours,
  resolveSwops,
} from "../../../utils/palette/palette";
import { paletteBlockstack } from "../../palette/spritesheetPalette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./SpritesheetVariants";

/** Change the appearance of the citizens of Freedom to distinguish from the player */
const sceneryPlayerSwaps: PartialNamedColours<keyof typeof paletteBlockstack> =
  {
    pastelBlue: paletteBlockstack.moss,
    metallicBlue: paletteBlockstack.moss,
    pink: paletteBlockstack.moss,
  };

export const buildSceneryPlayerSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet => {
  const { roomColor, spritesheetMetaData } = context;

  let result = createSpritesheetVariant(
    context,
    {
      ambient: [
        {
          swops: resolveSwops(paletteBlockstack, sceneryPlayerSwaps),
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
