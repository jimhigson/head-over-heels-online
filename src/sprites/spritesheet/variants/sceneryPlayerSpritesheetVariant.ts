import type { Renderer } from "pixi.js";

import type { PaletteSwaps } from "../../../game/render/filters/lutTexture/sparseLut";
import type { AppSpritesheet } from "../loadedSpriteSheet";

import { spritesheetPalette } from "../../palette/spritesheetPalette";
import {
  createSpritesheetVariant,
  dimSwops,
  replaceSpritesheetWithSwopped,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

/** Change the appearance of the citizens of Freedom to distinguish from the player */
export const sceneryPlayerSwaps: PaletteSwaps = {
  pastelBlue: spritesheetPalette.moss,
  metallicBlue: spritesheetPalette.moss,
  pink: spritesheetPalette.moss,
};

export const destroySceneryPlayerSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createSceneryPlayerSpritesheetVariant = (
  pixiRenderer: Renderer,
  isDim: boolean,
): void => {
  destroySceneryPlayerSpritesheetVariant();

  let result = createSpritesheetVariant(pixiRenderer, {
    ambient: [{ paletteSwaps: sceneryPlayerSwaps, lutType: "sparse" }],
  });

  if (isDim) {
    result = replaceSpritesheetWithSwopped(pixiRenderer, result, dimSwops);
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
