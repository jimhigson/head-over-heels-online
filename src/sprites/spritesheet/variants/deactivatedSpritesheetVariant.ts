import type { Renderer } from "pixi.js";

import type { PaletteSwaps } from "../../../game/render/filters/lutTexture/sparseLut";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";

import { omit } from "../../../utils/pick";
import { spritesheetPalette } from "../../palette/spritesheetPalette";
import { textureIds } from "../spritesheetData/spriteSheetData";
import {
  applyDimToSpritesheet,
  createSpritesheetVariant,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const greySwaps: PaletteSwaps = {
  lightBeige: spritesheetPalette.lightGrey,
  redShadow: spritesheetPalette.shadow,
  pink: spritesheetPalette.lightGrey,
  moss: spritesheetPalette.lightGrey,
  midRed: spritesheetPalette.midGrey,
  highlightBeige: spritesheetPalette.lightGrey,
  pastelBlue: spritesheetPalette.lightGrey,
  metallicBlue: spritesheetPalette.midGrey,
  replaceLight: spritesheetPalette.lightGrey,
  replaceDark: spritesheetPalette.midGrey,
};

export const greyFilterExceptBlue = omit(
  greySwaps,
  "metallicBlue",
  "pastelBlue",
);

export const greyFilterExceptPink = omit(greySwaps, "pink");

export const deactivatedSpritesheetTextureSwops: SpritesheetTextureSwops = {
  ambient: [{ paletteSwaps: greySwaps, lutType: "sparse" }],
  textureSpecific: [
    {
      textureIds: textureIds.filter((tid) => tid.startsWith("head.")),
      paletteSwaps: greyFilterExceptBlue,
      dodgeAmbient: true,
    },
    {
      textureIds: textureIds.filter((tid) => tid.startsWith("heels.")),
      paletteSwaps: greyFilterExceptPink,
      dodgeAmbient: true,
    },
  ],
};

export const destroyDeactivatedSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createDeactivatedSpritesheetVariant = (
  pixiRenderer: Renderer,
  isDim: boolean,
): void => {
  destroyDeactivatedSpritesheetVariant();

  let result = createSpritesheetVariant(
    pixiRenderer,
    deactivatedSpritesheetTextureSwops,
  );

  if (isDim) {
    result = applyDimToSpritesheet(pixiRenderer, result);
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
