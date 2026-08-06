import {
  AnimatedSprite,
  type Container,
  type Renderer,
  RenderTexture,
  Sprite,
  type Texture,
} from "pixi.js";

import {
  animationSpeed,
  framesWithOriginalGameTimings,
} from "../../game/render/createSprite";
import { type AppSpritesheetWithVariants } from "../../sprites/spritesheet/AppSpritesheet";
import { type AnimationId } from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { range } from "../iterators/range";
import { type Xy } from "../vectors/vectors";
import { pixiContainerToString } from "./pixiContainerToString";
import { UniqueTextureAnimatedSprite } from "./UniqueTextureAnimatedSprite";
import { UniqueTextureSprite } from "./UniqueTextureSprite";

/**
 * can be used as a less buggy version of pixi.js cacheAsTexture - just creates
 * a new sprite from any container, which can be added to the scene instead of
 * that container.
 *
 * SMELL: when pixi upgrades, check if .cacheAsTexture works again;
 * if not, maybe just make a PR against Pixi
 */
export const bakeContainerToTexture = (
  pixiRenderer: Renderer,
  container: Container,
  /**
   * a render texture to try to reuse - there is no guarantee it
   * will be reused - if it is smaller than the container in either
   * dimension a new one will be created. A larger texture is reused
   * as-is (cleared before rendering) - the unused margin stays
   * transparent, which draws nothing.
   *
   * If not reused, will be DESTROYED so that there is only one at a time
   * active.
   */
  reuseTexture?: RenderTexture,
  /**
   * created textures are at least this size - pass where the container's
   * size varies slightly between renders (eg per camera angle) so one
   * texture serves every variant via the reuse path
   */
  minimumSize?: Xy,
): Texture => {
  const localBounds = container.getLocalBounds();

  // the bake displaces by a whole-pixel amount only, so any integer-positioned
  // content is never resampled; content at fractional positions rounds once,
  // in the bake, exactly as a live raster would round it. (An exact-min
  // displacement would push the fraction into every pixel of the bake.)
  const shiftX = Math.floor(localBounds.minX);
  const shiftY = Math.floor(localBounds.minY);

  // rounding because bounds can be fractional, but size of the texture can't
  // be; sized from the integer shift so the fractional overhang still fits:
  const width = Math.ceil(localBounds.maxX - shiftX);
  const height = Math.ceil(localBounds.maxY - shiftY);

  const canReuse =
    reuseTexture !== undefined ?
      reuseTexture.width >= width && reuseTexture.height >= height
    : false;

  const renderTexture =
    canReuse ?
      (reuseTexture as RenderTexture)
    : RenderTexture.create({
        width: Math.max(width, minimumSize?.x ?? 0),
        height: Math.max(height, minimumSize?.y ?? 0),
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
  container.x -= shiftX;
  container.y -= shiftY;

  try {
    pixiRenderer.render({
      container,
      target: renderTexture,
      clear: canReuse,
    });
  } catch (e) {
    throw new Error(
      `bakeContainerToTexture: failed to render to texture. Container:\n ${pixiContainerToString(container)}`,
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
 * can be used as a less buggy version of cacheAsTexture - just creates a new
 * sprite from any container, which can be added to the scene instead of that
 * container.
 */
export const renderContainerToSprite = (
  pixiRenderer: Renderer,
  container: Container,
  reuseSprite?: UniqueTextureSprite,
  label?: string,
  /** see {@link bakeContainerToTexture}'s minimumSize */
  minimumSize?: Xy,
): UniqueTextureSprite => {
  const localBounds = container.getLocalBounds();

  const reuseTexture =
    reuseSprite?.texture && reuseSprite?.texture instanceof RenderTexture ?
      reuseSprite.texture
    : undefined;

  const texture = bakeContainerToTexture(
    pixiRenderer,
    container,
    reuseTexture,
    minimumSize,
  );

  const sprite = reuseSprite ? reuseSprite : new UniqueTextureSprite();

  sprite.texture = texture;
  sprite.label = label ?? `sprite of container (${container.label})`;
  sprite.pivot = {
    // the texture's origin is the bake's whole-pixel displacement
    // (floor of the bounds min), so the pivot mirrors exactly that -
    // fractional content then sits at its fractional offset within the
    // texture, rounded once by the bake:
    x: -Math.floor(localBounds.minX),
    y: -Math.floor(localBounds.minY),
  };

  return sprite;
};

/** render a container full of animated sprites to a single animated sprite with one new texture per-frame */
export const maybeRenderContainerToAnimatedSprite = <
  C extends AnimatedSprite | Sprite,
>(
  pixiRenderer: Renderer,
  container: C | Container<C>,
  // used only to get the correct animation speed — multiple animations
  // running at different speeds are not supported
  animationId: AnimationId,
  spritesheet: AppSpritesheetWithVariants,
  label?: string,
): C => {
  if (container instanceof AnimatedSprite || container instanceof Sprite) {
    return container as C;
  }

  const localBounds = container.getLocalBounds();

  // assuming all child sprites have the same frame count:
  const frameCount =
    container.children.find((child) => child instanceof AnimatedSprite)
      ?.textures.length ??
    // if no animated sprites, create a single frame:
    1;

  const textures = range(0, frameCount)
    .map((frameNo): Texture => {
      if (frameNo > 0) {
        for (const child of container.children) {
          if (child instanceof AnimatedSprite) {
            child.gotoAndStop((child.currentFrame + 1) % frameCount);
          }
        }
      }

      return bakeContainerToTexture(pixiRenderer, container);
    })
    .toArray();

  const outputAnimatedSprite = new UniqueTextureAnimatedSprite(
    framesWithOriginalGameTimings(textures),
  );
  outputAnimatedSprite.animationSpeed = animationSpeed(
    animationId,
    spritesheet,
  );
  outputAnimatedSprite.gotoAndPlay(0);

  outputAnimatedSprite.label =
    label ?? `animated sprite of container (${container.label})`;
  outputAnimatedSprite.pivot = {
    // mirrors the bake's whole-pixel displacement (floor of the bounds min):
    x: -Math.floor(localBounds.minX),
    y: -Math.floor(localBounds.minY),
  };

  return outputAnimatedSprite as C;
};

/**
 * for reducing the number of sprites in the scene - either render a complex container
 * to a sprite, or if it is already a sprite, just return it rendered. This isn't
 * safe for animated sprites, since it would freeze them in time!
 */
export const maybeRenderContainerToSprite = (
  pixiRenderer: Renderer,
  container: Container,
  /** see {@link renderContainerToSprite}'s reuseSprite */
  reuseSprite?: UniqueTextureSprite,
) => {
  if (container instanceof Sprite) {
    // simple case where we got a sprite:
    return container;
  }
  // times case where createSprite gave us a container of sprites:
  return renderContainerToSprite(pixiRenderer, container, reuseSprite);
};

/**
 * narrow an appearance's previous rendering to something a re-render can bake
 * into: only sprites that own their (render) texture qualify - plain sprites
 * (single, unbaked items) and non-sprite containers return undefined, so the
 * bake creates afresh
 */
export const asReuseSprite = (
  previousRendering: Container | undefined,
): undefined | UniqueTextureSprite =>
  previousRendering instanceof UniqueTextureSprite ? previousRendering : (
    undefined
  );
