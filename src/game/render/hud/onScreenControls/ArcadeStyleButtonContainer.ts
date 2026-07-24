import { Container, Sprite } from "pixi.js";

import { type AppSpritesheetWithVariants } from "../../../../sprites/spritesheet/AppSpritesheet";
import { type ArcadeButtonAction } from "../../../../sprites/spritesheet/spritesheetData/variantSpritesheetData";
import { buttonVariantTextureId } from "../../../../sprites/spritesheet/variantTextureId";
import { createSprite } from "../../createSprite";

/**
 * A round button shape with a masked top surface to render into if required.
 * Its body art is pre-baked per action colour, so this holds no atlas
 * reference between room changes.
 */
export class ArcadeStyleButtonContainer<
  /* if button can ever not have a surface rendering, include undefined in this parametric type */
  SurfaceContent extends Container | undefined = Container | undefined,
> extends Container {
  #surface: Container;

  /** a container that translates down when the button is pressed */
  #depressTranslateContainer: Container;
  #shownOnSurface!: SurfaceContent;

  #buttonSprite: Sprite;
  #pressedButtonSprite: Sprite;

  #which: ArcadeButtonAction;

  constructor(
    which: ArcadeButtonAction,
    /** pristine sheet, sampled only for the uncoloured surfaceMask */
    originalSpritesheet: AppSpritesheetWithVariants,
    initiallyShowOnSurface: SurfaceContent,
  ) {
    super({ label: `arcadeButton (${which})` });
    this.#which = which;

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
      spritesheet: originalSpritesheet,
    });
    this.#depressTranslateContainer.addChild(surfaceMask);
    this.#surface.mask = surfaceMask;
    this.#depressTranslateContainer.addChild(this.#surface);

    this.shownOnSurface = initiallyShowOnSurface;
  }

  get shownOnSurface(): SurfaceContent {
    return this.#shownOnSurface;
  }

  set shownOnSurface(content: SurfaceContent) {
    if (this.#shownOnSurface !== undefined) {
      this.#shownOnSurface.destroy({ children: true });
    }

    this.#shownOnSurface = content;

    if (content !== undefined) {
      this.#surface.addChild(content);
    }
  }

  set pressed(value: boolean) {
    this.#buttonSprite.visible = !value;
    this.#pressedButtonSprite.visible = value;
    this.#depressTranslateContainer.y = value ? 1 : 0;
  }

  /** point the sprites at this atlas's pre-baked button variants; call per room change */
  setSpritesheet(spritesheet: AppSpritesheetWithVariants): void {
    this.#buttonSprite.texture =
      spritesheet.textures[buttonVariantTextureId("button", this.#which)];
    this.#pressedButtonSprite.texture =
      spritesheet.textures[
        buttonVariantTextureId("button.pressed", this.#which)
      ];
  }
}
