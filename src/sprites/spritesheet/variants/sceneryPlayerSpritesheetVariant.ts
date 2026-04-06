import type { PartialNamedColours } from "../../../utils/palette/palette";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { VariantBuildContext } from "../VariantBuildContext";

import { resolveSwops } from "../../../utils/palette/palette";
import { paletteBlockstack } from "../../palette/spritesheetPalette";
import {
  ambientDimSwops,
  createSpritesheetVariant,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

/** Change the appearance of the citizens of Freedom to distinguish from the player */
export const sceneryPlayerSwaps: PartialNamedColours<
  keyof typeof paletteBlockstack
> = {
  pastelBlue: paletteBlockstack.moss,
  metallicBlue: paletteBlockstack.moss,
  pink: paletteBlockstack.moss,
};

export const destroySceneryPlayerSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createSceneryPlayerSpritesheetVariant = (
  context: VariantBuildContext,
): void => {
  const { roomColor, spritesheetMetaData } = context;
  destroySceneryPlayerSpritesheetVariant();

  let result = createSpritesheetVariant(context, {
    ambient: [
      {
        swops: resolveSwops(paletteBlockstack, sceneryPlayerSwaps),
        lutType: "sparse",
      },
    ],
  });

  // a second swop is possible to apply dimming:
  if (roomColor.shade === "dimmed") {
    const dimSwops = ambientDimSwops(spritesheetMetaData);
    if (dimSwops !== undefined) {
      result = replaceSpritesheetWithSwopped(context, result, dimSwops);
    }
  }

  swopped = result;
};

export const sceneryPlayerSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
