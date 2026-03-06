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

/** Change the appearance of the citizens of Freedom to distinguish from the player */
export const sceneryPlayerSwaps: PaletteSwaps = {
  pastelBlue: spritesheetPalette.moss,
  metallicBlue: spritesheetPalette.moss,
  pink: spritesheetPalette.moss,
};

const lazyInitTexture = (texture: RenderTexture | undefined) =>
  texture ??
  RenderTexture.create({
    width: spritesheetSize.w,
    height: spritesheetSize.h,
  });

export const destroySceneryPlayerSpritesheetVariant = () => {
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

export const createSceneryPlayerSpritesheetVariant = (
  pixiRenderer: Renderer,
  isDim: boolean,
): void => {
  destinationTexture = lazyInitTexture(destinationTexture);

  if (isDim) {
    intermediateTexture = lazyInitTexture(intermediateTexture);

    spritesheetPaletteSwop(
      pixiRenderer,
      { ambient: { paletteSwaps: sceneryPlayerSwaps, lutType: "sparse" } },
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
      { ambient: { paletteSwaps: sceneryPlayerSwaps, lutType: "sparse" } },
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

export const sceneryPlayerSpritesheetVariant = (): AppSpritesheet => {
  if (spritesheet === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return spritesheet;
};
