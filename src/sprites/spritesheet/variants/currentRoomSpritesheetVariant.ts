import { type Texture } from "pixi.js";

import { roomSpritesheetTextureSwops } from "../roomSpritesheetTextureSwops";
import {
  createSpritesheetVariant,
  type SpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";
import { type VariantBuildContext } from "../VariantBuildContext";
import { type AppSpritesheet } from "./AppSpritesheet";

export const buildCurrentRoomSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet | undefined => {
  const { roomScenery, roomColor, spriteOption } = context;

  const spritesheetTextureSwops: SpritesheetTextureSwops | undefined =
    roomSpritesheetTextureSwops(roomScenery, roomColor, spriteOption);

  if (spritesheetTextureSwops === undefined) {
    // no room swops declared: this sheet has no per-room variant
    return undefined;
  }

  return createSpritesheetVariant(
    context,
    spritesheetTextureSwops,
    baseTexture,
    originalSpritesheet,
  );
};
