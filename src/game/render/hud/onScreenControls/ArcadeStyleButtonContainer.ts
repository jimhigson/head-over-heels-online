import type { RenderTexture } from "pixi.js";

import {
  Container,
  type Renderer as PixiRenderer,
  Sprite,
  Texture,
} from "pixi.js";

import type { RoomState } from "../../../../model/RoomState";
import type { ButtonId } from "./buttonAppearances/buttonTypes";

import { zxSpectrumColor } from "../../../../originalGame";
import { originalSpriteSheet } from "../../../../sprites/spritesheet/loadedSpriteSheet";
import { halfbrite } from "../../../../utils/colour/halfBrite";
import { renderContainerToTexture } from "../../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../../createSprite";
import { PaletteSwapFilter } from "../../filters/PaletteSwapFilter";
import { gameColour } from "../../gameColours/gameColours";
import { buttonColours } from "./buttonAppearances/buttonColours";

/**
 * A round button shape with a masked top surface to render into if required
 */
export class ArcadeStyleButtonContainer<
  SurfaceContent extends Container = Container,
> extends Container {
  #surface: Container;

  /** a container that translates down when the button is pressed */
  #depressTranslateContainer: Container;
  #shownOnSurface: SurfaceContent | undefined;

  #buttonSprite: Sprite;
  #pressedButtonSprite: Sprite;

  constructor(
    private readonly colourised: boolean,
    private readonly which: ButtonId,
    private readonly pixiRenderer: PixiRenderer,
  ) {
    super({ label: `arcadeButton (${which})` });

    // a container so that the whole button can move down together
    // to show the 'pressed' effect
    this.#depressTranslateContainer = new Container({ label: "depress" });

    this.addChild(this.#depressTranslateContainer);

    this.#buttonSprite = new Sprite({ anchor: { x: 0.5, y: 1 } });
    this.#pressedButtonSprite = new Sprite({ anchor: { x: 0.5, y: 1 } });
    this.#pressedButtonSprite.visible = false;

    this.#depressTranslateContainer.addChild(this.#buttonSprite);
    this.#depressTranslateContainer.addChild(this.#pressedButtonSprite);

    this.#surface = new Container({ label: "surface" });
    const surfaceMask = createSprite({
      textureId: "button.surfaceMask",
      label: "surfaceMask",
      spritesheetVariant: "original",
    });
    this.#depressTranslateContainer.addChild(surfaceMask);
    this.#surface.mask = surfaceMask;
    this.#depressTranslateContainer.addChild(this.#surface);
  }

  get shownOnSurface(): SurfaceContent | undefined {
    return this.#shownOnSurface;
  }

  set shownOnSurface(content: SurfaceContent | undefined) {
    if (this.#shownOnSurface !== undefined) {
      this.#shownOnSurface.destroy({ children: true });
    }

    this.#shownOnSurface = content;

    if (content !== undefined) {
      this.#surface.addChild(content);
    }
  }

  setPressed(pressed: boolean) {
    this.#buttonSprite.visible = !pressed;
    this.#pressedButtonSprite.visible = pressed;
    this.#depressTranslateContainer.y = pressed ? 1 : 0;
  }

  setDisabled(disabled: boolean, colourise: boolean) {
    if (colourise) {
      // the whole button doesn't get grey'd out, just the surface details:
      //this.#surface.filters = disabled ? greyFilter : noFilters;
    }
  }

  generateButtonSpriteTextures(room: RoomState<string, string>): void {
    const { which, colourised } = this;

    const spriteTemplate = createSprite({
      textureId: "button",
      spritesheetVariant: "original",
    });
    const colour =
      colourised ?
        gameColour(
          buttonColours.colourised[which],
          room.color.shade === "dimmed",
        )
      : zxSpectrumColor(buttonColours.zx[which]);

    const colourDim =
      colourised ?
        halfbrite(colour, 0.66)
      : zxSpectrumColor(buttonColours.zx[which], "dimmed");

    const filter = new PaletteSwapFilter({
      lutType: "sparse",
      paletteSwaps: {
        replaceLight: colour,
        replaceDark: colourDim,
      },
    });
    spriteTemplate.filters = filter;

    const buttonTexture = renderContainerToTexture(
      this.pixiRenderer,
      spriteTemplate,
      this.#buttonSprite.texture === Texture.EMPTY ?
        undefined
      : (this.#buttonSprite.texture as RenderTexture | undefined),
    );

    spriteTemplate.texture = originalSpriteSheet().textures["button.pressed"];

    const pressedButtonTexture = renderContainerToTexture(
      this.pixiRenderer,
      spriteTemplate,
      this.#pressedButtonSprite.texture === Texture.EMPTY ?
        undefined
      : (this.#pressedButtonSprite.texture as RenderTexture | undefined),
    );

    // this assignment may be unnecessary if the RenderTextures were reused
    // inside renderContainerToTexture
    this.#buttonSprite.texture = buttonTexture;
    this.#pressedButtonSprite.texture = pressedButtonTexture;

    filter.destroy({ destroyLutTexture: true });
    spriteTemplate.destroy({ children: true });
  }
}
