import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";
import type { VariantBuildContext } from "../VariantBuildContext";

import { resolveSwops } from "../../../utils/palette/palette";
import { resolveNamedColourSwops } from "../../../utils/palette/palette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const destroyDoughnuttedSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createDoughnuttedSpritesheetVariant = (
  context: VariantBuildContext,
): void => {
  const { roomColor, spritesheetMetaData } = context;
  destroyDoughnuttedSpritesheetVariant();

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

  let result = createSpritesheetVariant(context, swops);

  if (roomColor.shade === "dimmed") {
    const dimSwops = ambientDimSwops(spritesheetMetaData);
    if (dimSwops !== undefined) {
      result = replaceSpritesheetWithSwopped(context, result, dimSwops);
    }
  }

  swopped = result;
};

export const doughnuttedSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
