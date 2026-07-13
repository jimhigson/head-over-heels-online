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
  deactivated: NonNullable<
    SpritesheetMetadata<PaletteColourName, SO>["swops"]
  >["deactivated"] &
    object,
): SpritesheetTextureSwops => {
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
): AppSpritesheet | undefined => {
  const { roomScenery, roomColor, spritesheetMetaData } = context;

  const deactivated = spritesheetMetaData.swops?.deactivated;
  if (deactivated === undefined) {
    // no deactivated swops declared: this sheet has no deactivated variant
    return undefined;
  }

  let result = createSpritesheetVariant(
    context,
    buildDeactivatedSwops(spritesheetMetaData, deactivated),
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
