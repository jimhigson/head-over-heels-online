import { Texture, RenderTexture } from "pixi.js";
import type { TextureSourceLike, Application } from "pixi.js";
import { addTexture, removeTexture } from "./textureData";

// Store original methods
const originalTextureFrom = Texture.from;
const originalRenderTextureCreate = RenderTexture.create;
const originalTextureDestroy = Texture.prototype.destroy;

// Track if we've already patched the methods
let isTracking = false;

// When tracking started
let trackingStartedAt: number | undefined;

// Reference to the app for extraction
let app: Application;

/**
 * Monkey-patched version of Texture.from.
 *
 * This patch is necessary to track all dynamically created textures in the application.
 * In addition to creating a texture (as the original method does), it registers the new texture
 * with the texture inspector by calling addTexture. This enables inspection and debugging of
 * textures that are created at runtime.
 */
const patchedTextureFrom = function (
  id: TextureSourceLike,
  skipCache?: boolean,
): Texture {
  const texture = originalTextureFrom(id, skipCache);
  addTexture(texture);
  return texture;
};

// Monkey-patched RenderTexture.create
const patchedRenderTextureCreate = function (
  ...args: Parameters<typeof originalRenderTextureCreate>
): RenderTexture {
  const texture = originalRenderTextureCreate(...args);
  addTexture(texture);
  return texture;
};

// Monkey-patched destroy
const patchedDestroy = function (this: Texture, destroyBase?: boolean): void {
  removeTexture(this);
  return originalTextureDestroy.call(this, destroyBase);
};

/**
 * Start tracking dynamically created textures
 * @param application - PixiJS Application instance for texture extraction
 */
export const patchPixiToTrackTextures = (application: Application): void => {
  // Exit early if already tracking
  if (isTracking) {
    console.warn("🎯 Texture tracking is already enabled");
    return;
  }

  app = application;
  trackingStartedAt = Date.now();

  // Apply monkey patches
  Texture.from = patchedTextureFrom;
  RenderTexture.create = patchedRenderTextureCreate;
  Texture.prototype.destroy = patchedDestroy;

  isTracking = true;
  console.log("🎯 Dynamic texture tracking enabled");
};

/**
 * Get the current application instance
 */
export const getApp = (): Application => app;

/**
 * Get when tracking started
 */
export const getTrackingStartTime = (): number | undefined => trackingStartedAt;
