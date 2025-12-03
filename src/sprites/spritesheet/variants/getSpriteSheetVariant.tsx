import type { TextureId } from "../spritesheetData/spriteSheetData";
import type { SpritesheetVariant } from "./SpritesheetVariant";

import { type AppSpritesheet, originalSpriteSheet } from "../loadedSpriteSheet";
import { currentRoomSpritesheetVariant } from "./currentRoomSpritesheetVariant";
import { deactivatedSpritesheetVariant } from "./deactivatedSpritesheetVariant";
import { doughnuttedSpritesheetVariant } from "./doughnuttedSpritesheetVariant";
import { sceneryPlayerSpritesheetVariant } from "./sceneryPlayerSpritesheetVariant";
import { uncolourisedSpritesheetVariant } from "./uncolourisedSpritesheetVariant";

export const getSpriteSheetVariant = (
  spritesheetVariant: SpritesheetVariant,
): AppSpritesheet => {
  switch (spritesheetVariant) {
    case "original":
      return originalSpriteSheet();
    case "deactivated":
      return deactivatedSpritesheetVariant();
    case "doughnutted":
      return doughnuttedSpritesheetVariant();
    case "for-current-room":
      return currentRoomSpritesheetVariant();
    case "sceneryPlayer":
      return sceneryPlayerSpritesheetVariant();
    case "uncolourised":
      return uncolourisedSpritesheetVariant();
    default:
      return spritesheetVariant satisfies never;
  }
};

export const getSpriteSheetVariantTexture = (
  spritesheetVariant: SpritesheetVariant = "for-current-room",
  textureId: TextureId,
) => {
  return getSpriteSheetVariant(spritesheetVariant).textures[textureId];
};
