import { type Texture } from "pixi.js";

import {
  type PartialNamedColours,
  resolveNamedColourSwops,
  resolveSwops,
} from "../../../utils/palette/palette";
import { omitArray } from "../../../utils/pick";
import { blockstackAmbienceSwops } from "../roomSpritesheetTextureSwops";
import { type SpritesheetMetadata } from "../spritesheetData/spritesheetMetaData";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
  replaceSpritesheetWithSwopped,
  type SpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./AppSpritesheet";
import { type LoadableSpriteOption } from "./SpritesheetVariants";

const buildDeactivatedSwops = <
  PaletteColourName extends string,
  SO extends LoadableSpriteOption,
>(
  spritesheetMetaData: SpritesheetMetadata<PaletteColourName, SO>,
): SpritesheetTextureSwops => {
  const deactivated = spritesheetMetaData.swops?.deactivated;

  if (deactivated === undefined) {
    return noopSpritesheetTextureSwops;
  }

  const { palette } = spritesheetMetaData;

  const ambientNamed: PartialNamedColours<PaletteColourName> =
    resolveNamedColourSwops(deactivated.colours, palette);

  const preserveHead =
    deactivated?.playableDeactivatedPreserveColours?.head ?? [];
  const preserveHeels =
    deactivated?.playableDeactivatedPreserveColours?.heels ?? [];

  return {
    ambient: [
      { swops: resolveSwops(palette, ambientNamed), lutType: "sparse" },
    ],
    // texture-specific swops let head/heels keep their characteristic colours
    textureSpecific: [
      {
        textureIds: (tid) => tid.startsWith("head."),
        swops: resolveSwops(palette, omitArray(ambientNamed, preserveHead)),
        // don't let the ambient swop out these colours first:
        dodgeAmbient: true,
      },
      {
        textureIds: (tid) => tid.startsWith("heels."),
        swops: resolveSwops(palette, omitArray(ambientNamed, preserveHeels)),
        dodgeAmbient: true,
      },
    ],
  };
};

export const buildDeactivatedSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet => {
  const { roomScenery, roomColor, spritesheetMetaData } = context;

  let result = createSpritesheetVariant(
    context,
    buildDeactivatedSwops(spritesheetMetaData),
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
  } else {
    // TODO: incorrectly applying blockstack ambience here it seems (to deactivated)
    result = replaceSpritesheetWithSwopped(
      context,
      result,
      {
        ambient: [blockstackAmbienceSwops(roomScenery, roomColor)],
      },
      originalSpritesheet,
    );
  }

  return result;
};
