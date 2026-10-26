import blockstackSpritesheetArtUrl from "../../../../gfx/spritesBlockstack.webp";
import toppySpritesheetArtUrl from "../../../../gfx/spritesToppy.webp";
import { type SpritesheetName } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";

/**
 * the art of each sheet that is upscaled for the css sprites, by name
 */
export const spritesheetArtUrls = {
  blockstack: blockstackSpritesheetArtUrl,
  toppy: toppySpritesheetArtUrl,
} as const satisfies Partial<Record<SpritesheetName, string>>;
