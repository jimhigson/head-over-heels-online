import { Spritesheet } from "pixi.js";
import { type Renderer as PixiRenderer } from "pixi.js";

import type { UnknownRoomState } from "../../model/RoomState";
import type { AppSpritesheet } from "./loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "./spritesheetPaletteSwop";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../gfx/spritesheetPalette";
import { colourisedRoomSwops } from "./roomSpritesheetSwops";
import { spritesheetData } from "./spritesheetData/spriteSheetData";
import {
  noopSpritesheetTextureSwops,
  spritesheetPaletteSwop,
} from "./spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;
let swops: SpritesheetTextureSwops = noopSpritesheetTextureSwops;

/**
 * change the global palette swops to apply to the spritesheet before any
 * other rendering occurs. Promise resolves when the swopped spritesheet is ready
 */
export const setSpritesheetPaletteSwops = (
  pixiRenderer: PixiRenderer,
  colourised: boolean,
  room: UnknownRoomState,
) => {
  if (swopped !== undefined) {
    // throw away previous swopped version of spritesheet - these are
    // short-lived and created on-demand:
    swopped.destroy(true);
    swopped = undefined;
  }

  swops = colourisedRoomSwops(colourised, room);

  const swoppedTexture = spritesheetPaletteSwop(pixiRenderer, swops);

  // Create new spritesheet with the same frame data
  const swoppedSpritesheet = new Spritesheet(
    swoppedTexture.source,
    structuredClone(spritesheetData),
  );

  swoppedSpritesheet.parseSync();
  swoppedSpritesheet.textureSource.scaleMode = "nearest";

  swopped = swoppedSpritesheet;
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const paletteSwoppedSpritesheet = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - paletteSwoppedSpritesheet should only be called when we know for sure it is available`,
    );
  }

  return swopped;
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
  let swoppedColour = spritesheetPalette[colourName];

  for (const ambient of swops.ambient) {
    swoppedColour = ambient.paletteSwaps[colourName] ?? swoppedColour;
  }

  return swoppedColour;
};
