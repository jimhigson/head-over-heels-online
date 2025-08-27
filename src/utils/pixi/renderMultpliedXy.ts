import type { Container } from "pixi.js";

import type { Xy, Xyz } from "../vectors/vectors";

import {
  createSprite,
  type CreateSpriteOptions,
} from "../../game/render/createSprite";

/**
 * render to a sprite, using a base sprite to be repeated in x and y.
 *
 * You probably want to pipe the output of this function through
 * maybeRenderContainerToSprite and add that to the scene instead,
 * unless the contents are animated or you need to keep in the internal
 * scene structure
 */
export const renderMultipliedXy = (
  createSpriteOptions: CreateSpriteOptions,
  timesXyz: Partial<Xyz> | undefined,
): Container => {
  const timesXy: Partial<Xy> | undefined = timesXyz && {
    x: timesXyz.x ?? 1,
    y: timesXyz.y ?? 1,
  };

  return createSprite({
    ...(typeof createSpriteOptions === "string" ?
      { textureId: createSpriteOptions }
    : createSpriteOptions),
    times: timesXy,
  });
};
