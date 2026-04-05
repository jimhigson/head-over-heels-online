import type { SceneryName } from "./planets";
import type { AppSpritesheetData } from "./spritesheet/loadedSpriteSheet";
import type { TextureId } from "./spritesheet/spritesheetData/makeSpritesheetData";

import { isTextureId } from "./assertIsTextureId";

type ExtractGenericSuffix<T> = T extends `generic.${infer Rest}` ? Rest : never;
type GenericTextureSuffix = ExtractGenericSuffix<TextureId>;

/**
 * Given a texture ID suffix (the part after the planet name, including the leading dot),
 * returns the most specific texture ID that exists, trying in order:
 * 1. `${sceneryName}.dark.${suffix}` (if isDark)
 * 2. `${sceneryName}.${suffix}`
 * 3. `generic.${suffix}`
 */
export const planetSpecificIfExists = (
  sceneryName: SceneryName,
  /** e.g. `door.floatingThreshold.x` — will be prefixed with both the scenery name and `generic` */
  suffix: GenericTextureSuffix,
  spritesheetData: AppSpritesheetData,
  isDark = false,
): TextureId => {
  if (isDark) {
    const darkTextureId = `${sceneryName}.dark.${suffix}`;
    if (isTextureId(darkTextureId, spritesheetData)) return darkTextureId;
  }
  const planetSpecific = `${sceneryName}.${suffix}`;
  return isTextureId(planetSpecific, spritesheetData) ? planetSpecific : (
      `generic.${suffix}`
    );
};
