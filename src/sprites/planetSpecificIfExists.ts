import { isTextureId } from "./assertIsTextureId";
import { type SceneryName } from "./planets";
import { type AppSpritesheetData } from "./spritesheet/AppSpritesheet";
import {
  type BaseTextureId,
  type TextureId,
} from "./spritesheet/spritesheetData/makeSpritesheetData";

type ExtractGenericSuffix<T> = T extends `generic.${infer Rest}` ? Rest : never;
type GenericTextureSuffix = ExtractGenericSuffix<TextureId>;

/**
 * the ids a suffix can resolve to: the scenery's own art (lit or dark) where
 * the sheet has it, else the generic art - which every suffix has by
 * definition, since the suffixes are those `generic` declares
 */
type PlanetSpecificTextureId<Suffix extends GenericTextureSuffix> =
  | `generic.${Suffix}`
  | (BaseTextureId & `${SceneryName}${".dark" | ""}.${Suffix}`);

/**
 * Given a texture ID suffix (the part after the planet name, including the leading dot),
 * returns the most specific texture ID that exists, trying in order:
 * 1. `${sceneryName}.dark.${suffix}` (if isDark)
 * 2. `${sceneryName}.${suffix}`
 * 3. `generic.${suffix}`
 */
export const planetSpecificIfExists = <Suffix extends GenericTextureSuffix>(
  sceneryName: SceneryName,
  /** e.g. `door.floatingThreshold.x` — will be prefixed with both the scenery name and `generic` */
  suffix: Suffix,
  spritesheetData: AppSpritesheetData,
  isDark = false,
): PlanetSpecificTextureId<Suffix> => {
  if (isDark) {
    const darkTextureId = `${sceneryName}.dark.${suffix}` as const;
    if (isTextureId(darkTextureId, spritesheetData)) {
      return darkTextureId;
    }
  }
  const planetSpecific = `${sceneryName}.${suffix}` as const;
  return isTextureId(planetSpecific, spritesheetData) ? planetSpecific : (
      `generic.${suffix}`
    );
};
