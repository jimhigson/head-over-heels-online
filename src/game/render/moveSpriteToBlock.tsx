import { Container } from "pixi.js";
import { XyMaybeZ } from "../../modelTypes";
import { blockSizePx } from "../../sprites/pixiSpriteSheet";
import { MoveSpriteOptions } from "./createSprite";
import { projectToScreen } from "./projectToScreen";


export const moveSpriteToBlock = (
  { x, y, z = 0 }: XyMaybeZ,
  sprite: Container,
  { giveZIndex }: MoveSpriteOptions = { giveZIndex: false }
) => {
  const projection = projectToScreen(
    x * blockSizePx.w,
    y * blockSizePx.d,
    z * blockSizePx.h
  );

  sprite.x = projection.x;
  sprite.y = projection.y;

  if (giveZIndex) sprite.zIndex = projection.z;

  return sprite;
};
