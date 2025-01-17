import { spriteSheet } from "@/sprites/spriteSheet";
import type { TextureId } from "./spriteSheetData";

export function assertIsTextureId(
  textureId: string,
): asserts textureId is TextureId {
  if (!isTextureId(textureId)) {
    throw new Error(`Invalid textureId: "${textureId}"`);
  }
}

export function isTextureId(textureId: string): textureId is TextureId {
  return spriteSheet.textures[textureId as TextureId] !== undefined;
}
