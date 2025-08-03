import type { Texture, TEXTURE_FORMATS } from "pixi.js";

export interface TrackedTexture {
  texture: Texture;
  createdAt: number;
  /**
   * Error object created at texture creation time.
   * Not an actual error - just used to capture the call stack for debugging.
   */
  callStack: Error;
  type?: "ItemShadowRenderer" | "PaletteSwapFilter" | "ItemAppearance";
}

// Track all dynamically created textures
const trackedTextures = new Set<TrackedTexture>();

/**
 * Detect the type based on stack trace
 */
const detectType = (stack: string): TrackedTexture["type"] => {
  if (stack.includes("ItemShadowRenderer.ts")) {
    return "ItemShadowRenderer";
  }
  if (stack.includes("PaletteSwapFilter.ts")) {
    return "PaletteSwapFilter";
  }
  if (stack.includes("ItemAppearancePixiRenderer")) {
    return "ItemAppearance";
  }
  return undefined;
};

/**
 * Add a texture to tracking
 */
export const addTexture = (texture: Texture): void => {
  const callStack = new Error();
  const type = detectType(callStack.stack ?? "");

  trackedTextures.add({
    texture,
    createdAt: Date.now(),
    callStack,
    type,
  });
};

/**
 * Remove a texture from tracking
 */
export const removeTexture = (texture: Texture): void => {
  for (const item of trackedTextures) {
    if (item.texture === texture) {
      trackedTextures.delete(item);
      break;
    }
  }
};

/**
 * Get all tracked textures
 */
export const getTrackedTextures = (): Set<TrackedTexture> => {
  return trackedTextures;
};

/**
 * Get bytes per pixel for a given texture format
 */
export const getBytesPerPixel = (format: TEXTURE_FORMATS): number => {
  // Single channel formats (1 byte)
  if (format.startsWith("r8") || format === "stencil8") {
    return 1;
  }

  // Two channel formats (2 bytes)
  if (format.startsWith("rg8") || format.startsWith("r16")) {
    return 2;
  }

  // Four channel 8-bit formats (4 bytes) - default
  if (format.startsWith("rgba8") || format.startsWith("bgra8")) {
    return 4;
  }

  // RGB formats
  if (
    format === "rgb9e5ufloat" ||
    format === "rgb10a2unorm" ||
    format === "rg11b10ufloat"
  ) {
    return 4; // These are packed 32-bit formats
  }

  // 16-bit per channel formats
  if (format.startsWith("rg16")) {
    return 4; // 2 channels * 2 bytes
  }
  if (format.startsWith("rgba16")) {
    return 8; // 4 channels * 2 bytes
  }

  // 32-bit per channel formats
  if (format.startsWith("r32")) {
    return 4; // 1 channel * 4 bytes
  }
  if (format.startsWith("rg32")) {
    return 8; // 2 channels * 4 bytes
  }
  if (format.startsWith("rgba32")) {
    return 16; // 4 channels * 4 bytes
  }

  // Depth/stencil formats
  if (format.startsWith("depth")) {
    return 4; // Most depth formats are 32-bit
  }

  // Compressed formats - these are more complex, return estimate
  if (
    format.startsWith("bc") ||
    format.startsWith("etc") ||
    format.startsWith("astc")
  ) {
    return 0.5; // Compressed formats vary, this is a rough estimate
  }

  // Default to 4 bytes (RGBA8)
  return 4;
};

/**
 * Get memory usage for a texture
 */
export const getTextureMemory = (texture: Texture): number => {
  const format = texture.source?.format ?? "rgba8unorm";
  const bytesPerPixel = getBytesPerPixel(format);
  return texture.width * texture.height * bytesPerPixel;
};

/**
 * Calculate total memory usage
 */
export const getTotalMemory = (): number => {
  let totalMemory = 0;
  for (const item of trackedTextures) {
    totalMemory += getTextureMemory(item.texture);
  }
  return totalMemory;
};
