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
import { type AppSpritesheet } from "./SpritesheetVariants";

/**
 * a spritesheet recoloured to how items appear in a mirror's reflection, built
 * the same way as the doughnutted variant. Returns undefined when the
 * spritesheet has no `mirrorReflection` swops (eg speccy), so reflections fall
 * back to its normal variant.
 */
export const buildMirrorReflectionSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet | undefined => {
  const { roomColor, spritesheetMetaData } = context;

  const { palette } = spritesheetMetaData;
  const mirrorReflectionSwops = spritesheetMetaData.swops?.mirrorReflection;

  if (mirrorReflectionSwops === undefined) {
    return undefined;
  }

  const swops: SpritesheetTextureSwops = {
    ambient: [
      {
        swops: resolveSwops(
          palette,
          resolveNamedColourSwops(mirrorReflectionSwops.colours, palette),
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
