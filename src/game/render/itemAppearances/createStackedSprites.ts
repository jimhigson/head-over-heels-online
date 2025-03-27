import { type Filter, Container } from "pixi.js";
import type { AnimatedCreateSpriteOptions } from "../createSprite";
import { type CreateSpriteOptions, createSprite } from "../createSprite";

export const itemRidingOnBubblesSpritesOptions: AnimatedCreateSpriteOptions = {
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

export const stackedTopSymbol: unique symbol = Symbol();
export const stackedBottomSymbol: unique symbol = Symbol();
export type StackedSpritesContainer<Child extends Container> =
  Container<Child> & {
    [stackedTopSymbol]: Child;
    [stackedBottomSymbol]: Child;
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
  container[stackedTopSymbol] = top;
  container[stackedBottomSymbol] = bottom;
  return container;
};
