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

export const doughnuttedSwaps: PaletteSwaps = {
  midGrey: spritesheetPalette.midRed,
  lightGrey: spritesheetPalette.lightBeige,
  white: spritesheetPalette.highlightBeige,
  metallicBlue: spritesheetPalette.redShadow,
  shadow: spritesheetPalette.redShadow,
  pastelBlue: spritesheetPalette.lightBeige,
  pink: spritesheetPalette.midRed,
  moss: spritesheetPalette.midRed,
  replaceDark: spritesheetPalette.midRed,
  replaceLight: spritesheetPalette.lightBeige,
};

export const destroyDoughnuttedSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createDoughnuttedSpritesheetVariant = (
  pixiRenderer: Renderer,
  isDim: boolean,
): void => {
  destroyDoughnuttedSpritesheetVariant();

  let result = createSpritesheetVariant(pixiRenderer, {
    ambient: [{ paletteSwaps: doughnuttedSwaps, lutType: "sparse" }],
  });

  if (isDim) {
    result = replaceSpritesheetWithSwopped(pixiRenderer, result, dimSwops);
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
