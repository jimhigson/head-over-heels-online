import { Container, type Sprite } from "pixi.js";
import { createSprite } from "../createSprite";
import {
  greyFilter,
  noFilters,
  replaceWithHalfbriteFilter,
} from "../filters/standardFilters";
import { buttonColours } from "./buttonColours";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { showTextInContainer } from "./showNumberInContainer";
import { PaletteSwapFilter } from "../filters/PaletteSwapFilter";
import { halfBrite } from "../../../utils/colour/halfBrite";
import type { Button } from "./OnScreenButton";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";

export const surfaceContentSym: unique symbol = Symbol();
export const buttonSpriteSym: unique symbol = Symbol();
export const depressContainerSym: unique symbol = Symbol();
export type ButtonRenderingContainer = Container & {
  /**
   * anything put into this container will be rendered on the surface of the button
   */
  [surfaceContentSym]: Container;
  /**
   * the sprite for the button itself
   */
  [buttonSpriteSym]: Sprite;
  [depressContainerSym]: Container;
};
/**
 * create a round button 'shape' with a masked top surface to render
 * into if required
 */
export const arcadeStyleButtonRendering = ({
  colourise,
  button: { colour },
}: {
  colourise: boolean;
  button: Button;
}): ButtonRenderingContainer => {
  // a container so that the whole button can move down together
  // to show the 'pressed' effect
  const depressContainer = new Container({ label: "depress" });

  const rootContainer = new Container({
    label: "arcadeButton",
  }) as ButtonRenderingContainer;
  rootContainer.addChild(depressContainer);

  const buttonSprite = createSprite("button") as Sprite;

  if (colourise) {
    buttonSprite.filters = replaceWithHalfbriteFilter(
      buttonColours.colourised[colour],
    );
  } else {
    rootContainer.filters = new RevertColouriseFilter(buttonColours.zx[colour]);
  }

  depressContainer.addChild(buttonSprite);
  const surface = new Container({ label: "surface" });
  const surfaceMask = createSprite({
    textureId: "button.surfaceMask",
    label: "surfaceMask",
  });
  depressContainer.addChild(surfaceMask);
  surface.mask = surfaceMask;
  depressContainer.addChild(surface);

  rootContainer[buttonSpriteSym] = buttonSprite;
  rootContainer[surfaceContentSym] = surface;
  rootContainer[depressContainerSym] = depressContainer;

  return rootContainer;
};

export const showOnSurface = (
  button: ButtonRenderingContainer,
  ...content: Array<Container | undefined>
) => {
  button[surfaceContentSym].removeChildren();
  for (const c of content) {
    if (c !== undefined) {
      button[surfaceContentSym].addChild(c);
    }
  }
};

export const setPressed = (
  button: ButtonRenderingContainer,
  pressed: boolean,
) => {
  button[buttonSpriteSym].texture =
    spriteSheet.textures[pressed ? "button.pressed" : "button"];
  button[depressContainerSym].y = pressed ? 1 : 0;
};

export const setDisabled = (
  button: ButtonRenderingContainer,
  disabled: boolean,
  colourise: boolean,
) => {
  if (colourise) {
    button.filters = disabled ? greyFilter() : noFilters;
  }
};

export const createTextForButtonSurface = (
  { colour }: Button,
  colourise: boolean,
  text: string,
): Container => {
  const jumpTextContainer = showTextInContainer(new Container(), text);
  jumpTextContainer.filters = new PaletteSwapFilter({
    white:
      colourise ?
        halfBrite(buttonColours.colourised[colour])
      : spritesheetPalette.pureBlack,
  });
  return jumpTextContainer;
};
