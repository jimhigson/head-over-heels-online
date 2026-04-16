import type { FloorConfig } from "../../model/json/ItemConfigMap";
import type { SceneryName } from "../../sprites/planets";
import type { AppSpritesheetData } from "../../sprites/spritesheet/loadedSpriteSheet";
import type { TextureId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

import { isTextureId } from "../../sprites/assertIsTextureId";

export const floorTextureId = (
  floorConfig: FloorConfig<SceneryName>,
  dark: boolean,
  spritesheetData: AppSpritesheetData,
): TextureId => {
  const { floorType } = floorConfig;
  const base =
    floorType === "deadly" ? "generic"
    : floorType === "standable" ? floorConfig.scenery
    : undefined;

  if (base === undefined) {
    throw new Error(`floorTextureId called with floorType "${floorType}"`);
  }

  const suffix = floorType === "deadly" ? ".floor.deadly" : ".floor";

  if (!dark) {
    return `${base}${suffix}` as TextureId;
  }

  const darkTextureId = `${base}.dark${suffix}`;
  if (isTextureId(darkTextureId, spritesheetData)) {
    return darkTextureId;
  }

  // no dark texture, fall back to non-dark:
  return `${base}${suffix}` as TextureId;
};
