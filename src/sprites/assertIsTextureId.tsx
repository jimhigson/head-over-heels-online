import { type TextureId, spriteSheet } from "@/sprites/spriteSheet";

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
