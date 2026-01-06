import type { Texture } from "pixi.js";

import { range } from "iter-tools-es";
import { AnimatedSprite } from "pixi.js";
import { type Container, type Renderer, RenderTexture, Sprite } from "pixi.js";

import type { AnimationId } from "../../sprites/spritesheet/spritesheetData/spriteSheetData";

import {
  animationSpeed,
  framesWithOriginalGameTimings,
} from "../../game/render/createSprite";
import { iterate } from "../iterate";
import { pixiContainerToString } from "./pixiContainerToString";
import { UniqueTextureAnimatedSprite } from "./UniqueTextureAnimatedSprite";
import { UniqueTextureSprite } from "./UniqueTextureSprite";

/**
 * can be used as a less buggy version of cacheAsTexture - just creates a new sprite from any container,
 * which can be added to the scene instead of that container.
 */
export const renderContainerToTexture = (
  pixiRenderer: Renderer,
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
  pixiRenderer: Renderer,
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

/** render a container full of animated sprites to a single animated sprite with one new texture per-frame */
export const maybeRenderContainerToAnimatedSprite = (
  pixiRenderer: Renderer,
  container: Container,
  // an animation id - used only to get the correct animation speed - multiple animations
  // running at different speeds are not supported
  animationId: AnimationId,
  label?: string,
): AnimatedSprite | Sprite => {
  if (container instanceof AnimatedSprite || container instanceof Sprite) {
    return container;
  }

  const localBounds = container.getLocalBounds();

  // assuming all child sprites have te same frame count:
  const frameCount =
    container.children.find((child) => child instanceof AnimatedSprite)
      ?.textures.length ??
    // if no animated sprites, create a single frame:
    1;

  const textures = iterate(range(0, frameCount))
    .map((): Texture => {
      for (const child of container.children) {
        if (child instanceof AnimatedSprite) {
          child.gotoAndStop((child.currentFrame + 1) % frameCount);
        }
      }

      return renderContainerToTexture(pixiRenderer, container);
    })
    .toArray();

  const outputAnimatedSprite = new UniqueTextureAnimatedSprite(
    framesWithOriginalGameTimings(textures),
  );
  outputAnimatedSprite.animationSpeed = animationSpeed(animationId, false);
  outputAnimatedSprite.gotoAndPlay(0);

  outputAnimatedSprite.label =
    label ?? `animated sprite of container (${container.label})`;
  outputAnimatedSprite.pivot = {
    // without rounding of bounds here, floor tiles render in not quite the right
    // place, since they can have fractional bounds. Rounded up the extent, so need
    // to round down the x and y (expanding the range)
    x: Math.floor(-localBounds.minX),
    y: Math.floor(-localBounds.minY),
  };

  return outputAnimatedSprite;
};

/**
 * for reducing the number of sprites in the scene - either render a complex container
 * to a sprite, or if it is already a sprite, just return it rendered. This isn't
 * safe for animated sprites, since it would freeze them in time!
 */
export const maybeRenderContainerToSprite = (
  pixiRenderer: Renderer,
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
