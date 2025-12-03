import type { ContainerChild } from "pixi.js";

import { Container } from "pixi.js";

import { blockSizePx } from "../../physics/mechanicsConstants";
import { createSprite, type CreateSpriteOptions } from "../createSprite";

export const createStackedSprites = ({
  top,
  bottom,
}: {
  top: CreateSpriteOptions;
  bottom: CreateSpriteOptions;
}): StackedSpritesContainer => {
  const container = new Container() as StackedSpritesContainer;
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
  top.y = -blockSizePx.z;
  container.addChild(top);
  container[stackedTopSymbol] = top;
  container[stackedBottomSymbol] = bottom;
  return container;
};

export const isStackedSpritesContainer = (
  container: Container,
): container is StackedSpritesContainer => {
  return stackedTopSymbol in container;
};
