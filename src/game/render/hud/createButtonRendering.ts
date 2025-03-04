import { Container, type Sprite } from "pixi.js";
import { createSprite } from "../createSprite";

export const surfaceContentSym: unique symbol = Symbol();
export const buttonSpriteSym: unique symbol = Symbol();
export type ButtonRenderingContainer = Container & {
  /**
   * anything put into this container will be rendered on the surface of the button
   */
  [surfaceContentSym]: Container;
  /**
   * the sprite for the button itself
   */
  [buttonSpriteSym]: Sprite;
};
/** create a button 'shape' with a masked top surface to render into if required */
export const createButtonRendering = (): ButtonRenderingContainer => {
  const container = new Container() as ButtonRenderingContainer;
  const buttonSprite = createSprite("button") as Sprite;
  container.addChild(buttonSprite);
  container[buttonSpriteSym] = buttonSprite;
  const surface = new Container();
  container[surfaceContentSym] = surface;
  const surfaceMask = createSprite("button.surfaceMask");
  surface.addChild(surfaceMask);
  surface.mask = surfaceMask;
  container.addChild(surface);
  return container;
};
