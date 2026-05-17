import {
  type PartialNamedColours,
  resolveNamedColourSwops,
  resolveSwops,
} from "../../../utils/palette/palette";
import { omitArray } from "../../../utils/pick";
import {
  type AppSpritesheet,
  type LoadableSpriteOption,
} from "../loadedSpriteSheet";
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

let swopped: AppSpritesheet | undefined = undefined;

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

const destroyDeactivatedSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createDeactivatedSpritesheetVariant = (
  context: VariantBuildContext,
): void => {
  const { roomScenery, roomColor, spritesheetMetaData } = context;
  destroyDeactivatedSpritesheetVariant();

  let result = createSpritesheetVariant(
    context,
    buildDeactivatedSwops(spritesheetMetaData),
  );

  if (roomColor.shade === "dimmed") {
    const dimSwops = ambientDimSwops(spritesheetMetaData);
    if (dimSwops !== undefined) {
      result = replaceSpritesheetWithSwopped(context, result, dimSwops);
    }
  } else {
    // TODO: incorrectly applying blockstack ambience here it seems (to deactivated)
    result = replaceSpritesheetWithSwopped(context, result, {
      ambient: [blockstackAmbienceSwops(roomScenery, roomColor)],
    });
  }

  swopped = result;
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const deactivatedSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
