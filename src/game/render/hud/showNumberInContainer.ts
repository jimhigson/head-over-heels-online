import { size } from "iter-tools";
import { Container } from "pixi.js";

import type { PokeableNumber } from "../../../model/ItemStateMap";

import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { hudCharTextureSize } from "../../../sprites/textureSizes";
import { iterateToContainer } from "../../../utils/pixi/iterateToContainer";
import { createSprite } from "../createSprite";
import { hudOutlinedTextFilters, hudTextFilter } from "./hudFilters";

function* characterSprites(input: PokeableNumber | string) {
  const str =
    typeof input === "string" ?
      (
        input === "infinite" // huh? why special case this string?
      ) ?
        ""
      : input
    : input.toString();

  // safer than chars.length for length in terms of real characters (i.e. Unicode code points), not UTF-16 code units:
  const l = size(str);

  let i = 0;
  for (const c of str) {
    const textureId = `hud.char.${escapeCharForTailwind(c)}`;

    try {
      assertIsTextureId(textureId);
    } catch (e) {
      throw new Error(
        `no texture id for char "${c}": ${(e as Error).message}`,
        {
          cause: e,
        },
      );
    }

    yield createSprite({
      textureId,
      x: (i + 0.5 - l / 2) * hudCharTextureSize.w,
    });
    i++;
  }
}

export const showTextInContainer = (
  container: Container,
  n: number | string,
) => {
  container.removeChildren();
  try {
    iterateToContainer(characterSprites(n), container);
  } catch (e) {
    console.error("invalid string is", n, "and on window as window.invalid");
    console.error(e);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).invalid = n;
    throw new Error(
      `could not show text "${n}" in container because: "${(e as Error).message}"`,
      { cause: e },
    );
  }
  return container;
};
export const makeTextContainer = ({
  doubleHeight = false,
  outline = false,
  label = "text",
}: { doubleHeight?: boolean; outline?: boolean; label?: string } = {}) => {
  return new Container({
    label,
    filters: outline ? hudOutlinedTextFilters : hudTextFilter,
    scale: { x: 1, y: doubleHeight ? 2 : 1 },
  });
};
