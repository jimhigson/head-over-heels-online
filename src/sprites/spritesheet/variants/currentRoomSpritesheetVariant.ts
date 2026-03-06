import { type Renderer, RenderTexture, Spritesheet } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SceneryName } from "../../planets";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../palette/spritesheetPalette";
import { colourisedRoomSwops } from "../colourisedRoomSwops";
import {
  spritesheetData,
  spritesheetSize,
} from "../spritesheetData/spriteSheetData";
import {
  noopSpritesheetTextureSwops,
  spritesheetPaletteSwop,
} from "../spritesheetPaletteSwop";

let destinationTexture: RenderTexture | undefined = undefined;
let spritesheet: AppSpritesheet | undefined = undefined;
let currentSwops: SpritesheetTextureSwops = noopSpritesheetTextureSwops;

export const destroyCurrentRoomSpritesheetVariant = () => {
  if (spritesheet !== undefined) {
    spritesheet.destroy(true);
    spritesheet = undefined;
  }
  if (destinationTexture !== undefined) {
    destinationTexture.destroy(true);
    destinationTexture = undefined;
  }
};

/**
 * change the global palette swops to apply to the spritesheet before any
 * other rendering occurs. Promise resolves when the swopped spritesheet is ready
 */
export const createCurrentRoomSpritesheetVariant = (
  pixiRenderer: Renderer,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
) => {
  currentSwops = colourisedRoomSwops(roomScenery, roomColor);

  if (destinationTexture === undefined) {
    destinationTexture = RenderTexture.create({
      width: spritesheetSize.w,
      height: spritesheetSize.h,
    });
  }

  spritesheetPaletteSwop(
    pixiRenderer,
    currentSwops,
    undefined,
    destinationTexture,
  );

  if (spritesheet === undefined) {
    spritesheet = new Spritesheet(
      destinationTexture.source,
      structuredClone(spritesheetData),
    );
    spritesheet.parseSync();
    spritesheet.textureSource.scaleMode = "nearest";
  }
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const currentRoomSpritesheetVariant = (): AppSpritesheet => {
  if (import.meta.env.DEV && spritesheet === undefined) {
    throw new Error(
      `current room spritesheet undefined - currentRoomSpritesheetVariant() should only be called when we know for sure it is available`,
    );
  }

  return spritesheet!;
};

/**
 * try to get a colour from the swapped palette that is actually being used, according to
 * the current ambient swops
 *
 * // NOTE: this doesn't currently support double-swops
 * // NOTE: also doesn't support texture-specific swops
 */
export const getAmbientSwoppedColour = (
  colourName: SpritesheetPaletteColourName,
) => {
  return (
    currentSwops.ambient.paletteSwaps[colourName] ??
    spritesheetPalette[colourName]
  );
};
