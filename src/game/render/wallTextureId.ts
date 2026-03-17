import type { SceneryName, Wall } from "../../sprites/planets";
import type { AppSpritesheetData } from "../../sprites/spritesheet/loadedSpriteSheet";
import type { TextureId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

import { isTextureId } from "../../sprites/assertIsTextureId";

export const wallTextureId = <P extends SceneryName, TDark extends boolean>(
  planet: P,
  wallName: Wall<P>,
  side: "away" | "left",
  dark: TDark,
  spritesheetData: AppSpritesheetData,
): TextureId => {
  if (!dark) {
    return `${planet}.wall.${wallName}.${side}` as TextureId;
  }

  const darkTextureId = `${planet}.dark.wall.${wallName}.${side}`;
  if (isTextureId(darkTextureId, spritesheetData)) {
    return darkTextureId;
  }

  // no dark texture, use non-dark:
  return `${planet}.wall.${wallName}.${side}` as TextureId;
};
