import { isTextureId } from "../../sprites/assertIsTextureId";
import { type SceneryName, type Wall } from "../../sprites/planets";
import { type AppSpritesheetData } from "../../sprites/spritesheet/AppSpritesheet";
import { type TextureId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type WallTextureId } from "../../sprites/spritesheet/spritesheetData/scenerySpritesheetData";

/**
 * every scenery draws its walls lit, but only some have dark art for them - so
 * the dark ids are only those the sheet actually declares
 */
type LitOrDarkWallTextureId<P extends SceneryName> =
  (TextureId & WallTextureId<P, ".dark">) | WallTextureId<P, "">;

export const wallTextureId = <P extends SceneryName, TDark extends boolean>(
  planet: P,
  wallName: Wall<P>,
  /**
   * which of the two far-side wall arts to use, as the facing's octant index:
   * 0 = left art, 2 = away art
   */
  artIndex: 0 | 2,
  dark: TDark,
  spritesheetData: AppSpritesheetData,
): LitOrDarkWallTextureId<P> => {
  if (!dark) {
    return `${planet}.wall.${wallName}.d${artIndex}` as const;
  }

  const darkTextureId = `${planet}.dark.wall.${wallName}.d${artIndex}` as const;
  if (isTextureId(darkTextureId, spritesheetData)) {
    return darkTextureId;
  }

  // no dark texture, use non-dark:
  return `${planet}.wall.${wallName}.d${artIndex}` as const;
};
