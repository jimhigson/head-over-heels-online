import { Spritesheet, type Texture } from "pixi.js";

import { applySpritesheetFlips } from "./applySpritesheetFlips";
import {
  type AppSpritesheet,
  type AppSpritesheetDataWithVariants,
} from "./AppSpritesheet";
import {
  type SpritesheetMetadata,
  type SpritesheetName,
} from "./spritesheetData/spritesheetMetaData";

/**
 * a pixi spritesheet over a texture this app baked: its frames parsed against
 * the texture's logical size whatever resolution it was baked at, sampled
 * nearest, and with its flipped copies mirrored
 */
export const spritesheetOverBakedTexture = (
  bakedTexture: Texture,
  spritesheetData: AppSpritesheetDataWithVariants,
  /**
   * the spritesheet whose image the baked texture is drawn from
   */
  spritesheetArtName: SpritesheetName,
  spritesheetMeta: SpritesheetMetadata,
): AppSpritesheet => {
  const bakedResolution = bakedTexture.source.resolution;
  const sheet = new Spritesheet(
    bakedTexture,
    spritesheetData,
  ) as AppSpritesheet;
  // pixi's Spritesheet applies the sheet data's meta.scale (1) to the
  // texture source, wiping any bake resolution - restore it before parsing
  // so frame UVs are computed against the logical 1x size:
  sheet.textureSource.resolution = bakedResolution;
  sheet.parseSync();
  sheet.textureSource.scaleMode = "nearest";
  sheet.spritesheetArtName = spritesheetArtName;
  sheet.spritesheetMeta = spritesheetMeta;
  applySpritesheetFlips(sheet);
  return sheet;
};
