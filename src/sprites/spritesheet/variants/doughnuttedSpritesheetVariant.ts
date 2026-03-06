import { type Renderer, RenderTexture, Spritesheet } from "pixi.js";

import type { PaletteSwaps } from "../../../game/render/filters/lutTexture/sparseLut";
import type { AppSpritesheet } from "../loadedSpriteSheet";

import { spritesheetPalette } from "../../palette/spritesheetPalette";
import {
  spritesheetData,
  spritesheetSize,
} from "../spritesheetData/spriteSheetData";
import { dimSwops, spritesheetPaletteSwop } from "../spritesheetPaletteSwop";

let intermediateTexture: RenderTexture | undefined = undefined;
let destinationTexture: RenderTexture | undefined = undefined;
let spritesheet: AppSpritesheet | undefined = undefined;

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

const lazyInitTexture = (texture: RenderTexture | undefined) =>
  texture ??
  RenderTexture.create({
    width: spritesheetSize.w,
    height: spritesheetSize.h,
  });

export const destroyDoughnuttedSpritesheetVariant = () => {
  if (spritesheet !== undefined) {
    spritesheet.destroy(true);
    spritesheet = undefined;
  }
  if (destinationTexture !== undefined) {
    destinationTexture.destroy(true);
    destinationTexture = undefined;
  }
  if (intermediateTexture !== undefined) {
    intermediateTexture.destroy(true);
    intermediateTexture = undefined;
  }
};

export const createDoughnuttedSpritesheetVariant = (
  pixiRenderer: Renderer,
  isDim: boolean,
): void => {
  destinationTexture = lazyInitTexture(destinationTexture);

  if (isDim) {
    intermediateTexture = lazyInitTexture(intermediateTexture);

    spritesheetPaletteSwop(
      pixiRenderer,
      { ambient: { paletteSwaps: doughnuttedSwaps, lutType: "sparse" } },
      undefined,
      intermediateTexture,
    );

    spritesheetPaletteSwop(
      pixiRenderer,
      dimSwops,
      intermediateTexture,
      destinationTexture,
    );
  } else {
    spritesheetPaletteSwop(
      pixiRenderer,
      { ambient: { paletteSwaps: doughnuttedSwaps, lutType: "sparse" } },
      undefined,
      destinationTexture,
    );
  }

  if (spritesheet === undefined) {
    spritesheet = new Spritesheet(
      destinationTexture.source,
      structuredClone(spritesheetData),
    );
    spritesheet.parseSync();
    spritesheet.textureSource.scaleMode = "nearest";
  }
};

export const doughnuttedSpritesheetVariant = (): AppSpritesheet => {
  if (spritesheet === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return spritesheet;
};
