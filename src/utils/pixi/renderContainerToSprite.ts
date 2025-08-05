import type { Texture } from "pixi.js";
import {
  type Renderer as PixiRenderer,
  type Container,
  Sprite,
  RenderTexture,
} from "pixi.js";
import { UniqueTextureSprite } from "./UniqueTextureSprite";
import { pixiContainerToString } from "./pixiContainerToString";

/**
 * can be used as a less buggy version of cacheAsTexture - just creates a new sprite from any container,
 * which can be added to the scene instead of that container.
 */
export const renderContainerToTexture = (
  pixiRenderer: PixiRenderer,
  container: Container,
  /**
   * a render texture to try to reuse - there is no guarantee it
   * will be reused - if the size doesn't match the container's size
   * a new one will be created.
   *
   * If not reused, will be DESTROYED so that there is only one at a time
   * active.
   *
   * TODO: maybe consider reuse if the container is larger
   */
  reuseTexture?: RenderTexture,
): Texture => {
  const localBounds = container.getLocalBounds();

  // rounding because bounds can be fractional, but size of the texture can't be
  const width = Math.ceil(localBounds.maxX - localBounds.minX);
  const height = Math.ceil(localBounds.maxY - localBounds.minY);

  const canReuse =
    reuseTexture !== undefined ?
      reuseTexture.width === width && reuseTexture.height === height
    : false;

  const renderTexture =
    canReuse ?
      (reuseTexture as RenderTexture)
    : RenderTexture.create({
        width,
        height,
        antialias: false, // Disable for mask textures (performance)
        autoGenerateMipmaps: false,
      });

  renderTexture.label = `renderTexture of ${container.label ?? "(anon)"}`;

  if (reuseTexture && !canReuse) {
    reuseTexture.destroy();
  }

  // store to be restored later
  const { x, y } = container;

  // displace container contents to the origin of the sprite:
  container.x -= localBounds.minX;
  container.y -= localBounds.minY;

  try {
    pixiRenderer.render({
      container,
      target: renderTexture,
      clear: canReuse,
    });
  } catch (e) {
    throw new Error(
      `renderContainerToTexture: failed to render to texture. Container:\n ${pixiContainerToString(container)}`,
      { cause: e },
    );
  }

  // put the container x,y back so the caller isn't astonished when their
  // container moves after copying it to a texture:
  container.x = x;
  container.y = y;

  return renderTexture;
};

/**
 * can be used as a less buggy version of cacheAsTexture - just creates a new sprite from any container,
 * which can be added to the scene instead of that container.
 */
export const renderContainerToSprite = (
  pixiRenderer: PixiRenderer,
  container: Container,
  reuseSprite?: UniqueTextureSprite,
  label?: string,
): UniqueTextureSprite => {
  const localBounds = container.getLocalBounds();

  const reuseTexture =
    reuseSprite?.texture && reuseSprite?.texture instanceof RenderTexture ?
      reuseSprite.texture
    : undefined;

  const texture = renderContainerToTexture(
    pixiRenderer,
    container,
    reuseTexture,
  );

  const sprite = reuseSprite ? reuseSprite : new UniqueTextureSprite();

  sprite.texture = texture;
  sprite.label = label ?? `sprite of container (${container.label})`;
  sprite.pivot = {
    // without rounding of bounds here, floor tiles render in not quite the right
    // place, since they can have fractional bounds. Rounded up the extent, so need
    // to round down the x and y (expanding the range)
    x: Math.floor(-localBounds.minX),
    y: Math.floor(-localBounds.minY),
  };

  return sprite;
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
