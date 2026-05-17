import { type Container } from "pixi.js";

import {
  createSprite,
  type SpecifiedTextureCreateSpriteOptions,
} from "../../game/render/createSprite";
import { type Xy, type Xyz } from "../vectors/vectors";

/**
 * render to a sprite, using a base sprite to be repeated in x and y.
 *
 * You probably want to pipe the output of this function through
 * maybeRenderContainerToSprite and add that to the scene instead,
 * unless the contents are animated or you need to keep in the internal
 * scene structure
 */
export const renderMultipliedXy = (
  createSpriteOptions: SpecifiedTextureCreateSpriteOptions,
  timesXyz: Partial<Xyz> | undefined,
): Container => {
  const timesXy: Partial<Xy> | undefined = timesXyz && {
    x: timesXyz.x ?? 1,
    y: timesXyz.y ?? 1,
  };

  return createSprite({
    ...createSpriteOptions,
    times: timesXy,
  });
};
