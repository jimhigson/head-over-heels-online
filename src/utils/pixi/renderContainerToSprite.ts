import {
  type Renderer as PixiRenderer,
  type Container,
  Sprite,
  RenderTexture,
} from "pixi.js";
import { UniqueTextureSprite } from "./UniqueTextureSprite";

/**
 * less buggy version of cacheAsTexture - just creates a new sprite from any container,
 * which can be added to the scene instead of that container.
 */
export const renderContainerToSprite = (
  pixiRenderer: PixiRenderer,
  container: Container,
): Sprite => {
  // the shadowmask is a container - this is the case for 'times'
  const localBounds = container.getLocalBounds();

  // general containers with multiple sprites can't be used as shadow masks,
  // so we need to render the shadow mask to a sprite:
  const renderTexture = RenderTexture.create({
    width: localBounds.maxX - localBounds.minX,
    height: localBounds.maxY - localBounds.minY,
    // there are more memory efficient formats, but for the tiny memory footprint
    // of textures in this game, it is fine to keep the default 4 bytes per pixel
    //format: forMask ? undefined : "r8unorm",
  });

  // displace container contents to the origin of the sprite:
  container.x -= localBounds.minX;
  container.y -= localBounds.minY;
  pixiRenderer.render({ container, target: renderTexture });

  return new UniqueTextureSprite({
    texture: renderTexture,
    label: `renderContainerToSprite Sprite for container ${container.label}`,
    // un-displace to the origin of the sprite so it works the same as the container
    // we're rendering from:
    pivot: { x: -localBounds.minX, y: -localBounds.minY },
  });
};

/**
 * for reducing the number of sprites in the scene - either render a complex container
 * to a sprite, or if it is already a sprite, just return it rendered. This isn't
 * safe for animated sprites, since it would freeze them in time!
 */
export const maybeRenderContainerToSprite = (
  pixiRenderer: PixiRenderer,
  container: Container,
) => {
  if (container instanceof Sprite) {
    // simple case where we got a sprite:
    return container;
  } else {
    // times case where createSprite gave us a container of sprites:
    return renderContainerToSprite(pixiRenderer, container);
  }
};
