import {
  type AppSpritesheetData,
  type AppSpritesheetDataWithVariants,
} from "./spritesheet/AppSpritesheet";
import {
  type AnimationId,
  type TextureId,
} from "./spritesheet/spritesheetData/makeSpritesheetData";

export function assertIsTextureId(
  textureId: string,
  spritesheetData: AppSpritesheetData | AppSpritesheetDataWithVariants,
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
  spritesheetData: AppSpritesheetData | AppSpritesheetDataWithVariants,
): textureId is TextureId {
  return Object.hasOwn(spritesheetData.frames, textureId);
}

export function isAnimationId(
  animationId: string,
  spritesheetData: AppSpritesheetData | AppSpritesheetDataWithVariants,
): animationId is AnimationId {
  return Object.hasOwn(spritesheetData.animations, animationId);
}
