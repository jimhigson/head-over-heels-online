import { Container } from "pixi.js";
import { XyMaybeZ, Xyz } from "../../modelTypes";
import { MoveSpriteOptions } from "./createSprite";
import { projectBlockToScreen, projectToScreen } from "./projectToScreen";

export const moveSpriteToBlockXyz = (
  blockXyz: XyMaybeZ,
  sprite: Container,
  { giveZIndex }: MoveSpriteOptions = { giveZIndex: false },
) => {
  const projectionXyz = projectBlockToScreen(blockXyz);

  sprite.x = projectionXyz.x;
  sprite.y = projectionXyz.y;

  if (giveZIndex) sprite.zIndex = projectionXyz.z;

  return sprite;
};

export const moveSpriteToXyz = (
  positionXyz: Xyz,
  sprite: Container,
  { giveZIndex }: MoveSpriteOptions = { giveZIndex: false },
) => {
  const projectionXyz = projectToScreen(positionXyz);

  sprite.x = projectionXyz.x;
  sprite.y = projectionXyz.y;

  if (giveZIndex) sprite.zIndex = projectionXyz.z;

  return sprite;
};
