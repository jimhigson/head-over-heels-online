import { Container } from "pixi.js";
import { XyMaybeZ, Xyz } from "@/utils/vectors";
import { MoveSpriteOptions } from "./createSprite";
import { projectBlockToScreen, projectToScreen } from "./projectToScreen";

export const moveContainerToBlockXyz = (
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

export const moveContainerToXyz = (
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
