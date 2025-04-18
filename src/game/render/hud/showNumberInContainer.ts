import { Container } from "pixi.js";
import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { hudCharTextureSize } from "../../../sprites/textureSizes";
import { iterateToContainer } from "../../iterateToContainer";
import { createSprite } from "../createSprite";
import type { PokeableNumber } from "../../../model/ItemStateMap";
import { hudOutlinedTextFilters, hudTextFilter } from "./hudFilters";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";

function* characterSprites(n: PokeableNumber | string) {
  const chars =
    typeof n === "string" ?
      n === "infinite" ?
        ""
      : n.split("")
    : n.toString().split("");

  const l = chars.length;
  for (let i = 0; i < l; i++) {
    const textureId = `hud.char.${escapeCharForTailwind(chars[i])}`;

    try {
      assertIsTextureId(textureId);
    } catch (e) {
      throw new Error(
        `invalid texture id at index ${i} - char code is ${chars[i].charCodeAt(0)} : ${(e as Error).message}`,
        {
          cause: e,
        },
      );
    }

    yield createSprite({
      textureId,
      x: (i + 0.5 - l / 2) * hudCharTextureSize.w,
    });
  }
}
export function showNumberInContainer(
  container: Container,
  n: number | string,
) {
  container.removeChildren();
  iterateToContainer(characterSprites(n), container);
  return container;
}

export function showTextInContainer(container: Container, n: number | string) {
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
}
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
