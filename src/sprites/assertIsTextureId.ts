import type { AnimationId, TextureId } from "./spriteSheetData";

import { spritesheetData } from "./spriteSheetData";

export function assertIsTextureId(
  textureId: string,
): asserts textureId is TextureId {
  if (!isTextureId(textureId)) {
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

export function isTextureId(textureId: string): textureId is TextureId {
  return spritesheetData.frames[textureId as TextureId] !== undefined;
}

export function isAnimationId(animationId: string): animationId is AnimationId {
  return spritesheetData.animations[animationId as AnimationId] !== undefined;
}
