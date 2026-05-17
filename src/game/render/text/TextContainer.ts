import { Color, Container, Rectangle, type Renderer, Sprite } from "pixi.js";

import { type PokeableNumber } from "../../../model/ItemStateMap";
import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { paletteBlockstack } from "../../../sprites/palette/spritesheetPalette";
import {
  type AppSpritesheetData,
  originalSpriteSheet,
} from "../../../sprites/spritesheet/loadedSpriteSheet";
import { type TextureId } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { hudCharTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { size } from "../../../utils/iterators/size";
import { renderContainerToTexture } from "../../../utils/pixi/renderContainerToSprite";
import { OutlineFilter } from "../filters/OutlineFilter";

const characterSpriteTextureId = (
  char: string,
  spritesheetData: AppSpritesheetData,
): TextureId => {
  const textureId = `hud.char.${escapeCharForTailwind(char)}`;

  if (import.meta.env.DEV) {
    try {
      assertIsTextureId(textureId, spritesheetData);
    } catch (e) {
      throw new Error(`no texture id for char "${char}"`, { cause: e });
    }
  }

  return textureId as TextureId;
};

const printableString = (input: PokeableNumber | string): string => {
  return (
    typeof input === "string" ?
      (
        input === "infinite" // special case so that nothing shows on the UI for lives when infinite lives/doughnuts is on
      ) ?
        ""
      : input
    : input.toString()
  );
};

const white: Color = new Color(0xffffff);
const flashDurationMs = 100;

export type TextContainerOptions = {
  pixiRenderer: Renderer;
  doubleHeight?: boolean;
  doubleWidth?: boolean;
  outline?: boolean;
  label?: string;
  x?: number;
  y?: number;
  colour?: Color;
  flashColour?: Color;
  text?: number | string;
};

export class TextContainer extends Container {
  #pixiRenderer: Renderer;
  #currentText = "";
  #renderCacheSprite: Sprite;
  #characterSpriteContainer: Container<Sprite>;
  #renderToCacheContainer: Container<Container<Sprite>>;
  #heightMult: number;
  #widthMult: number;
  #colour: Color;
  #flashColour: Color | undefined;
  #flashTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor({
    pixiRenderer,
    doubleHeight = false,
    doubleWidth = false,
    outline = false,
    label = "text",
    x,
    y,
    colour,
    flashColour,
    text,
  }: TextContainerOptions) {
    super({ label, x, y, tint: colour });

    this.#colour = colour ?? white;
    this.#flashColour = flashColour;

    this.#pixiRenderer = pixiRenderer;
    this.#heightMult = doubleHeight ? 2 : 1;
    this.#widthMult = doubleWidth ? 2 : 1;

    this.#renderCacheSprite = new Sprite();
    this.#renderCacheSprite.y = -(
      hudCharTextureSize.h * this.#heightMult +
      // an extra -1 to compensate for padding for outline:
      1
    );
    this.addChild(this.#renderCacheSprite);

    this.#renderToCacheContainer = new Container<Container<Sprite>>();
    this.addChild(this.#renderToCacheContainer);

    this.#characterSpriteContainer = new Container<Sprite>();
    this.#characterSpriteContainer.scale = {
      x: this.#widthMult,
      y: this.#heightMult,
    };
    if (outline) {
      this.#characterSpriteContainer.filters = new OutlineFilter({
        color: paletteBlockstack.pureBlack,
        width: 1,
      });
    }

    this.#renderToCacheContainer.addChild(this.#characterSpriteContainer);

    if (text !== undefined) {
      this.text = text;
    }
  }

  get text(): string {
    return this.#currentText;
  }

  set text(textInput: number | string) {
    const str = printableString(textInput);

    if (this.#currentText === str) {
      return;
    }

    this.#updateCharacterSpriteContainer(str);

    this.#renderToCacheContainer.visible = true;
    // pad out to capture the outline:
    this.#renderToCacheContainer.boundsArea = new Rectangle(
      -1,
      -1,
      (this.#contentWidth() + 2) * this.#widthMult,
      (hudCharTextureSize.h + 2) * this.#heightMult,
    );

    if (this.#renderCacheSprite.texture) {
      // destroy the existing texture and its source:
      this.#renderCacheSprite.texture.destroy(true);
    }

    this.#renderCacheSprite.texture = renderContainerToTexture(
      this.#pixiRenderer,
      this.#renderToCacheContainer,
    );

    this.#renderCacheSprite.x =
      -this.#renderCacheSprite.texture.frame.width / 2;

    this.#renderToCacheContainer.visible = false;

    this.#currentText = str;

    this.#startFlash();
  }

  set colour(value: Color) {
    this.#colour = value;
    if (this.#flashTimeout === undefined) {
      this.tint = value;
    }
  }

  set flashColour(value: Color | undefined) {
    this.#flashColour = value;
  }

  #startFlash() {
    if (this.#flashColour === undefined) {
      return;
    }

    clearTimeout(this.#flashTimeout);
    this.tint = this.#flashColour;
    this.#flashTimeout = setTimeout(() => {
      this.#flashTimeout = undefined;
      this.tint = this.#colour;
    }, flashDurationMs);
  }

  #contentWidth(): number {
    const { children } = this.#characterSpriteContainer;
    let width = 0;
    for (let i = 0; i < children.length; i++) {
      width += children[i].texture.frame.width;
    }
    return width;
  }

  #updateCharacterSpriteContainer(str: string) {
    const strLength = size(str);
    const oldLength = this.#characterSpriteContainer.children.length;
    const lengthChanged = strLength !== oldLength;

    try {
      const spritesheet = originalSpriteSheet();
      const spritesheetTextures = spritesheet.textures;

      let i = 0;
      for (const char of str) {
        const textureId = characterSpriteTextureId(char, spritesheet.data);

        let sprite: Sprite | undefined;
        if (i < oldLength) {
          // already have a sprite - avoid unnecessary changes to the scene graph by
          // reusing it:
          sprite = this.#characterSpriteContainer.getChildAt<Sprite>(i);
          sprite.texture = spritesheetTextures[textureId];
        } else {
          sprite = new Sprite(spritesheetTextures[textureId]);
          this.#characterSpriteContainer.addChild(sprite);
        }
        i++;
      }
    } catch (e) {
      console.error(
        "invalid string is",
        str,
        "and on window as window.invalid",
      );
      console.error(e);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).invalid = str;
      throw new Error(
        `could not show text "${str}" in container because: "${(e as Error).message}"`,
        { cause: e },
      );
    }

    if (lengthChanged) {
      // remove after the end of the string
      if (strLength < oldLength) {
        this.#characterSpriteContainer.removeChildren(strLength);
      }
      let xOffset = 0;
      for (let i = 0; i < strLength; i++) {
        const sprite = this.#characterSpriteContainer.getChildAt<Sprite>(i);
        sprite.x = xOffset;
        xOffset += sprite.texture.frame.width;
      }
    }
  }

  override destroy(options?: Parameters<Container["destroy"]>[0]): void {
    clearTimeout(this.#flashTimeout);
    // always destroy the cached texture/source when the text container is destroyed:
    this.#renderCacheSprite.destroy({ texture: true, textureSource: true });
    super.destroy(options);
  }

  /** exposed for tests */
  get characterSpriteContainer(): Container<Sprite> {
    return this.#characterSpriteContainer;
  }
}
