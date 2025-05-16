import type { Container } from "pixi.js";
import { type Renderer as PixiRenderer, Sprite, RenderTexture } from "pixi.js";
import {
  type CreateSpriteOptions,
  createSprite,
} from "../../game/render/createSprite";
import type { Xyz, Xy } from "../vectors/vectors";

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
    // TODO: resolution (reduce size of texture)
  });

  // displace container contents to the origin of the sprite:
  container.x -= localBounds.minX;
  container.y -= localBounds.minY;
  pixiRenderer.render({ container, target: renderTexture });

  return new Sprite({
    texture: renderTexture,
    label: "shadowMaskSprite (of renderTexture)",
    // un-displace to the origin of the sprite so it works the same as the container
    // we're rendering from:
    pivot: { x: -localBounds.minX, y: -localBounds.minY },
  });
};

/* render to a sprite, using a base sprite to be repeated in x and y */
export const renderMultipliedXy = (
  pixiRenderer: PixiRenderer,
  createSpriteOptions: CreateSpriteOptions,
  timesXyz: Partial<Xyz> | undefined,
): Sprite => {
  const timesXy: Partial<Xy> | undefined = timesXyz && {
    x: timesXyz.x ?? 1,
    y: timesXyz.y ?? 1,
  };

  const renderingContainer = createSprite({
    ...(typeof createSpriteOptions === "string" ?
      { textureId: createSpriteOptions }
    : createSpriteOptions),
    times: timesXy,
  });

  if (renderingContainer instanceof Sprite) {
    // simple case where we got a sprite:
    return renderingContainer;
  } else {
    // times case where createSprite gave us a container of sprites:
    return renderContainerToSprite(pixiRenderer, renderingContainer);
  }
};
