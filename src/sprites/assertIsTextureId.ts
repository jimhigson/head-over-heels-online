import type {
  AnimationId,
  TextureId,
} from "./spritesheet/spritesheetData/makeSpritesheetData";

import { type AppSpritesheetData } from "./spritesheet/loadedSpriteSheet";

export function assertIsTextureId(
  textureId: string,
  spritesheetData: AppSpritesheetData,
): asserts textureId is TextureId {
  if (!isTextureId(textureId, spritesheetData)) {
    throw new Error(
      `Invalid textureId: "${textureId}"; textureId ∋ {${Object.keys(
        spritesheetData.frames,
      )
        .sort()
        .map((tid) => `"${tid}"`)
        .join(",\n")}}`,
    );
  }
}

export function isTextureId(
  textureId: string,
  spritesheetData: AppSpritesheetData,
): textureId is TextureId {
  return spritesheetData.frames[textureId as TextureId] !== undefined;
}

export function isAnimationId(
  animationId: string,
  spritesheetData: AppSpritesheetData,
): animationId is AnimationId {
  return spritesheetData.animations[animationId as AnimationId] !== undefined;
}
