import type { Sprite } from "pixi.js";

import { size } from "iter-tools-es";
import { Container } from "pixi.js";

import type { PokeableNumber } from "../../../model/ItemStateMap";
import type { TextureId } from "../../../sprites/spriteSheetData";

import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { loadedSpriteSheet } from "../../../sprites/spriteSheet";
import { hudCharTextureSize } from "../../../sprites/textureSizes";
import { createSprite } from "../createSprite";
import { hudOutlinedTextFilters, hudTextFilter } from "./hudFilters";

function characterSpriteTextureId(char: string): TextureId {
  const textureId = `hud.char.${escapeCharForTailwind(char)}`;

  try {
    assertIsTextureId(textureId);
  } catch (e) {
    throw new Error(
      `no texture id for char "${char}": ${(e as Error).message}`,
      {
        cause: e,
      },
    );
  }

  return textureId;
}

const characterSpriteCentreAlignX = (i: number, l: number): number => {
  return (i + 0.5 - l / 2) * hudCharTextureSize.w;
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

export const showTextInContainer = (
  container: Container<Sprite>,
  text: number | string,
) => {
  const str = printableString(text);

  const strLength = size(str);

  const oldLength = container.children.length;
  const lengthChanged = strLength !== oldLength;

  try {
    let i = 0;
    for (const char of str) {
      const textureId = characterSpriteTextureId(char);

      let sprite: Sprite | undefined;
      if (i < oldLength) {
        // already have a sprite - avoid unnecessary changes to the scene graph by
        // reusing it:
        sprite = container.getChildAt<Sprite>(i);
        const texture = loadedSpriteSheet().textures[textureId];
        sprite.texture = texture;
      } else {
        sprite = createSprite(textureId);
        container.addChild(sprite);
      }
      i++;
    }
  } catch (e) {
    console.error("invalid string is", str, "and on window as window.invalid");
    console.error(e);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).invalid = text;
    throw new Error(
      `could not show text "${text}" in container because: "${(e as Error).message}"`,
      { cause: e },
    );
  }

  if (lengthChanged) {
    // remove after the end of the string
    if (strLength < oldLength) {
      container.removeChildren(strLength);
    }
    // since the length changed, update the x position of the sprites to be
    // centre-aligned again:
    for (let i = 0; i < strLength; i++) {
      const sprite = container.getChildAt<Sprite>(i);
      sprite.x = characterSpriteCentreAlignX(
        container.getChildIndex(sprite),
        strLength,
      );
    }
  }

  return container;
};
export const makeTextContainer = ({
  doubleHeight = false,
  outline = false,
  label = "text",
}: { doubleHeight?: boolean; outline?: boolean; label?: string } = {}) => {
  return new Container<Sprite>({
    label,
    filters: outline ? hudOutlinedTextFilters : hudTextFilter,
    scale: { x: 1, y: doubleHeight ? 2 : 1 },
  });
};
