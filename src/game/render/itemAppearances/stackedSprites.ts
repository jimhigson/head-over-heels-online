import { spriteSheet } from "@/sprites/spriteSheet";
import { type Filter, Container } from "pixi.js";
import { type CreateSpriteOptions, createSprite } from "../createSprite";

export const itemRidingOnBubblesSpritesOptions = {
  frames: spriteSheet.animations["bubbles.cold"],
  animationSpeed: 0.25,
};
export const stackedSprites = ({
  top,
  bottom = "homingBot",
  filter,
}: {
  top: CreateSpriteOptions;
  bottom?: CreateSpriteOptions;
  filter?: Filter;
}): Container => {
  const container = new Container({ filters: filter });
  container.addChild(createSprite(bottom));
  const headSprite = createSprite(top);
  headSprite.y = -12;
  container.addChild(headSprite);
  return container;
};
