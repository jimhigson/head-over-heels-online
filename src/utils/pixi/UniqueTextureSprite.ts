import { Sprite, Texture } from "pixi.js";
import type { DestroyOptions } from "pixi.js";

/**
 * A Sprite subclass that automatically destroys its texture when the sprite is destroyed.
 * Use this for sprites with unique textures that won't be shared with other sprites.
 */
export class UniqueTextureSprite extends Sprite {
  constructor(param: ConstructorParameters<typeof Sprite>[0]) {
    if (!(param instanceof Texture) && !param?.texture) {
      throw new Error("UniqueTextureSprite requires a Texture");
    }

    super(param);
  }

  /**
   * Destroys this sprite and always destroys its texture
   */
  destroy(options?: DestroyOptions): void {
    // Pixi.js (v8.8.1)
    //    node_modules/.pnpm/pixi.js@8.8.1/node_modules/pixi.js/lib/scene/sprite/Sprite.mjs:117
    //    this._texture.destroy(destroyTextureSource);
    // crashes if we set {texture:true} while there isn't a texture
    // - this means if .destroy() is called twice on this sprite, the second call
    // causes a null pointer exception. Guard against this by only destroying the texture
    // if we have one.
    const hasTexture = this.texture !== null;

    // Ensure texture destruction is always enabled
    if (typeof options === "boolean") {
      // Boolean true means destroy everything, false means minimal destruction
      // We always destroy texture, but respect the boolean for other options
      super.destroy({
        texture: hasTexture,
        textureSource: options,
        children: options,
      });
    } else {
      //console.log(super.destroy);
      super.destroy({ ...options, texture: hasTexture });
    }
  }
}
