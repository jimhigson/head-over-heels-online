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

export const stackedTopSym: unique symbol = Symbol();
export const stackedBottomSym: unique symbol = Symbol();
export type StackedSpritesContainer<Child extends Container> =
  Container<Child> & {
    [stackedTopSym]: Child;
    [stackedBottomSym]: Child;
  };

export const stackSprites = <C extends Container>({
  top,
  bottom,
}: {
  top: C;
  bottom: C;
}): StackedSpritesContainer<C> => {
  const container = new Container<C>() as StackedSpritesContainer<C>;
  container.addChild(bottom);
  top.y = -12;
  container.addChild(top);
  container[stackedTopSym] = top;
  container[stackedBottomSym] = bottom;
  return container;
};
