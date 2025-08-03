import {
  type Renderer as PixiRenderer,
  type Container,
  Sprite,
  RenderTexture,
} from "pixi.js";
import { UniqueTextureSprite } from "./UniqueTextureSprite";

/**
 * can be used as a less buggy version of cacheAsTexture - just creates a new sprite from any container,
 * which can be added to the scene instead of that container.
 */
export const renderContainerToSprite = (
  pixiRenderer: PixiRenderer,
  container: Container,
): Sprite => {
  // the shadowmask is a container - this is the case for 'times'
  const localBounds = container.getLocalBounds();

  const renderTexture = RenderTexture.create({
    // rounding because bounds can be fractional, but size of the texture can't be
    width: Math.ceil(localBounds.maxX - localBounds.minX),
    height: Math.ceil(localBounds.maxY - localBounds.minY),
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
    pivot: {
      // without rounding of bounds here, floor tiles render in not quite the right
      // place, since they can have fractional bounds. Rounded up the extent, so need
      // to round down the x and y (expanding the range)
      x: Math.floor(-localBounds.minX),
      y: Math.floor(-localBounds.minY),
    },
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
