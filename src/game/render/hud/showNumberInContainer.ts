import type { Container } from "pixi.js";
import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { hudCharTextureSize } from "../../../sprites/textureSizes";
import { iterateToContainer } from "../../iterateToContainer";
import { createSprite } from "../createSprite";

function* characterSprites(n: number | string) {
  const chars =
    typeof n === "string" ? n.split("")
    : Number.isFinite(n) ? n.toString().split("")
      // an infinite value means that pokes are on - in this case
      // there's no point showing this number
    : "";
  const l = chars.length;
  for (let i = 0; i < l; i++) {
    const textureId = `hud.char.${chars[i]}`;
    assertIsTextureId(textureId);
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
  iterateToContainer(characterSprites(n), container);
  return container;
}
