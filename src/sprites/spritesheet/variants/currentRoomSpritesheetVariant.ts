import { type Renderer as PixiRenderer } from "pixi.js";

import type { UnknownRoomState } from "../../../model/RoomState";
import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../palette/spritesheetPalette";
import { colourisedRoomSwops } from "../colourisedRoomSwops";
import {
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;
let spritesheetTextureSwops: SpritesheetTextureSwops =
  noopSpritesheetTextureSwops;

export const destroyCurrentRoomSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

/**
 * change the global palette swops to apply to the spritesheet before any
 * other rendering occurs. Promise resolves when the swopped spritesheet is ready
 */
export const createCurrentRoomSpritesheetVariant = (
  pixiRenderer: PixiRenderer,
  colourised: boolean,
  room: UnknownRoomState,
) => {
  // throw away previous swopped version of spritesheet - these are
  // short-lived and created on-demand:
  destroyCurrentRoomSpritesheetVariant();

  // TODO: while uncolourised it would be more efficient to not create any variant,
  // and unset this variant altogether
  spritesheetTextureSwops =
    colourisedRoomSwops(colourised, room) ?? noopSpritesheetTextureSwops;

  swopped = createSpritesheetVariant(pixiRenderer, spritesheetTextureSwops);
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const currentRoomSpritesheetVariant = (): AppSpritesheet => {
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

  for (const ambient of spritesheetTextureSwops.ambient) {
    swoppedColour = ambient.paletteSwaps[colourName] ?? swoppedColour;
  }

  return swoppedColour;
};
