import type { Container } from "pixi.js";

import { RenderTexture, Sprite } from "pixi.js";

/**
 * since render textures are usually created dynamically, often when a container is removed, the
 * render textures inside it need to be destroyed (unless they are shared)
 */
export const destroyRenderTextureDescendants = (container: Container): void => {
  if (container instanceof Sprite) {
    const { texture } = container;
    if (texture instanceof RenderTexture) {
      texture.destroy(true);
    }
  }
  for (const child of container.children) {
    destroyRenderTextureDescendants(child as Container);
  }
};
