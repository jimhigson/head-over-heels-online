import type { Color, Renderer } from "pixi.js";

import { size } from "iter-tools-es";
import { Container, Rectangle, Sprite } from "pixi.js";

import type { PokeableNumber } from "../../../model/ItemStateMap";
import type { TextureId } from "../../../sprites/spritesheet/spritesheetData/spriteSheetData";

import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { spritesheetPalette } from "../../../sprites/palette/spritesheetPalette";
import { originalSpriteSheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import { hudCharTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { renderContainerToTexture } from "../../../utils/pixi/renderContainerToSprite";
import { OutlineFilter } from "../filters/outlineFilter";

const characterSpriteTextureId = (char: string): TextureId => {
  const textureId = `hud.char.${escapeCharForTailwind(char)}`;

  try {
    assertIsTextureId(textureId);
  } catch (e) {
    throw new Error(
      `no texture id for char "${char}": ${(e as Error).message}`,
      { cause: e },
    );
  }

  return textureId;
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

export type TextContainerOptions = {
  pixiRenderer: Renderer;
  doubleHeight?: boolean;
  doubleWidth?: boolean;
  outline?: boolean;
  label?: string;
  x?: number;
  y?: number;
  tint?: Color;
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

  constructor({
    pixiRenderer,
    doubleHeight = false,
    doubleWidth = false,
    outline = false,
    label = "text",
    x,
    y,
    tint,
    text,
  }: TextContainerOptions) {
    super({ label, x, y, tint });

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
        color: spritesheetPalette.pureBlack,
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
      (hudCharTextureSize.w * str.length + 2) * this.#widthMult,
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
  }

  #updateCharacterSpriteContainer(str: string) {
    const strLength = size(str);
    const oldLength = this.#characterSpriteContainer.children.length;
    const lengthChanged = strLength !== oldLength;

    try {
      const spritesheetTextures = originalSpriteSheet().textures;

      let i = 0;
      for (const char of str) {
        const textureId = characterSpriteTextureId(char);

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
      // since the length changed, update the x position of the sprites to be
      // centre-aligned again:
      for (let i = 0; i < strLength; i++) {
        const sprite = this.#characterSpriteContainer.getChildAt<Sprite>(i);
        sprite.x = i * hudCharTextureSize.w;
      }
    }
  }

  override destroy(options?: Parameters<Container["destroy"]>[0]): void {
    // always destroy the cached texture/source when the text container is destroyed:
    this.#renderCacheSprite.destroy({ texture: true, textureSource: true });
    super.destroy(options);
  }

  /** exposed for tests */
  get characterSpriteContainer(): Container<Sprite> {
    return this.#characterSpriteContainer;
  }
}
