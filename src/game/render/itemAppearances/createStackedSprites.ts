import { type Filter, Container } from "pixi.js";
import { type CreateSpriteOptions, createSprite } from "../createSprite";

export const itemRidingOnBubblesSpritesOptions: CreateSpriteOptions = {
  animationId: "bubbles.cold",
};
export const createStackedSprites = ({
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

export const stackSprites = ({
  top,
  bottom,
}: {
  top: Container;
  bottom: Container;
}): Container => {
  const container = new Container();
  container.addChild(bottom);
  top.y = -12;
  container.addChild(top);
  return container;
};
