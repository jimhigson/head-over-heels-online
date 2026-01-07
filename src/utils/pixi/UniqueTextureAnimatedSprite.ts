import type { DestroyOptions } from "pixi.js";

import { AnimatedSprite, RenderTexture } from "pixi.js";

/**
 * An AnimatedSprite subclass that automatically destroys its textures when the sprite is destroyed.
 * Use this for animated sprites with unique textures that won't be shared with other sprites.
 */
export class UniqueTextureAnimatedSprite extends AnimatedSprite {
  /**
   * Destroys this sprite and always destroys its textures
   */
  destroy(options?: DestroyOptions): void {
    // Collect RenderTextures before destroying - these need manual cleanup
    const renderTextures = this.textures
      .map((frame) => ("texture" in frame ? frame.texture : frame))
      .filter(
        (texture): texture is RenderTexture => texture instanceof RenderTexture,
      );

    super.destroy(options);

    // Destroy all the RenderTextures including their sources
    for (const texture of renderTextures) {
      texture.destroy(true);
    }
  }
}
