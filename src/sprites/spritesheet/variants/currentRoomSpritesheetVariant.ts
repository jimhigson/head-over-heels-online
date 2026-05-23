import { type Texture } from "pixi.js";

import { roomSpritesheetTextureSwops } from "../roomSpritesheetTextureSwops";
import {
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
  type SpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./SpritesheetVariants";

export const buildCurrentRoomSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet => {
  const { roomScenery, roomColor, spriteOption } = context;

  const spritesheetTextureSwops: SpritesheetTextureSwops =
    roomSpritesheetTextureSwops(roomScenery, roomColor, spriteOption) ??
    noopSpritesheetTextureSwops;

  return createSpritesheetVariant(
    context,
    spritesheetTextureSwops,
    baseTexture,
    originalSpritesheet,
  );
};
