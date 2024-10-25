import { Container } from "pixi.js";
import { XyMaybeZ } from "../../modelTypes";
import { MoveSpriteOptions } from "./createSprite";
import { projectBlockToScreen } from "./projectToScreen";

export const moveSpriteToBlock = (
  blockXyz: XyMaybeZ,
  sprite: Container,
  { giveZIndex }: MoveSpriteOptions = { giveZIndex: false },
) => {
  const projection = projectBlockToScreen(blockXyz);

  sprite.x = projection.x;
  sprite.y = projection.y;

  if (giveZIndex) sprite.zIndex = projection.z;

  return sprite;
};
