import {
  Container,
  type Renderer,
  type RenderTexture,
  Sprite,
  Texture,
} from "pixi.js";

import { type RoomState } from "../../../../model/RoomState";
import {
  maybeDimPalette,
  paletteBlockstack,
} from "../../../../sprites/palette/spritesheetPalette";
import { type SpritesheetMetadata } from "../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/variants/SpritesheetVariants";
import { halfbrite } from "../../../../utils/colour/halfbrite";
import { resolveSwops } from "../../../../utils/palette/palette";
import { renderContainerToTexture } from "../../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../../createSprite";
import { PaletteSwapFilter } from "../../filters/PaletteSwapFilter";
import { type ButtonId } from "../HudButtonRenderer";

/**
 * A round button shape with a masked top surface to render into if required
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

  #spritesheetMeta: SpritesheetMetadata;
  #which: ButtonId;
  #pixiRenderer: Renderer;
  #originalSpritesheet: AppSpritesheet;

  constructor(
    spritesheetMeta: SpritesheetMetadata,
    which: ButtonId,
    pixiRenderer: Renderer,
    originalSpritesheet: AppSpritesheet,
    initiallyShowOnSurface: SurfaceContent,
  ) {
    super({ label: `arcadeButton (${which})` });
    this.#spritesheetMeta = spritesheetMeta;
    this.#which = which;
    this.#pixiRenderer = pixiRenderer;
    this.#originalSpritesheet = originalSpritesheet;

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
      spritesheet: this.#originalSpritesheet,
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

  generateButtonSpriteTextures(room: RoomState<string, string>): void {
    const which = this.#which;
    const meta = this.#spritesheetMeta;

    const spriteTemplate = createSprite({
      textureId: "button",
      spritesheet: this.#originalSpritesheet,
    });

    const palette = maybeDimPalette(meta, room.color.shade === "dimmed");
    const colour = palette[meta.buttonColours[which]];
    const colourDim = halfbrite(colour, 0.66);
    const colourBlack = palette[meta.effectColours.outline];

    const filter = new PaletteSwapFilter(
      {
        lutType: "sparse",
        swops: resolveSwops(paletteBlockstack, {
          replaceLight: colour,
          replaceDark: colourDim,
          pureBlack: colourBlack,
        }),
      },
      // the button textures are baked off-screen via renderContainerToTexture,
      // so the filter must not be clipped to the screen viewport:
      Texture.WHITE,
      false,
    );
    spriteTemplate.filters = filter;

    const buttonTexture = renderContainerToTexture(
      this.#pixiRenderer,
      spriteTemplate,
      this.#buttonSprite.texture === Texture.EMPTY ?
        undefined
      : (this.#buttonSprite.texture as RenderTexture | undefined),
    );

    spriteTemplate.texture =
      this.#originalSpritesheet.textures["button.pressed"];

    const pressedButtonTexture = renderContainerToTexture(
      this.#pixiRenderer,
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
