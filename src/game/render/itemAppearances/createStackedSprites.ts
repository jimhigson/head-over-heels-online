import type { ContainerChild } from "pixi.js";
import { type Filter, Container } from "pixi.js";
import type { AnimatedCreateSpriteOptions } from "../createSprite";
import { type CreateSpriteOptions, createSprite } from "../createSprite";
import { blockSizePx } from "../../../sprites/spritePivots";

export const itemRidingOnBubblesSpritesOptions: AnimatedCreateSpriteOptions = {
  animationId: "bubbles.cold",
};
export const createStackedSprites = ({
  top,
  bottom = "headlessBase",
  filter,
}: {
  top: CreateSpriteOptions;
  bottom?: CreateSpriteOptions;
  filter?: Filter;
}): StackedSpritesContainer => {
  const container = new Container({
    filters: filter,
  }) as StackedSpritesContainer;
  const bottomSprite = createSprite(bottom);
  container.addChild(bottomSprite);

  const topSprite = createSprite(top);
  topSprite.y = -12;
  container.addChild(topSprite);

  container[stackedTopSymbol] = topSprite;
  container[stackedBottomSymbol] = bottomSprite;

  return container;
};

export const stackedTopSymbol: unique symbol = Symbol();
export const stackedBottomSymbol: unique symbol = Symbol();
export type StackedSpritesContainer<Child extends Container = ContainerChild> =
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
  top.y = -blockSizePx.h;
  container.addChild(top);
  container[stackedTopSymbol] = top;
  container[stackedBottomSymbol] = bottom;
  return container;
};
