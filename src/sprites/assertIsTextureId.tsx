import { spritesheetData } from "./spriteSheetData";
import type { TextureId } from "./spriteSheetData";

export function assertIsTextureId(
  textureId: string,
): asserts textureId is TextureId {
  if (!isTextureId(textureId)) {
    throw new Error(`Invalid textureId: "${textureId}"`);
  }
}

export function isTextureId(textureId: string): textureId is TextureId {
  return spritesheetData.frames[textureId as TextureId] !== undefined;
}
