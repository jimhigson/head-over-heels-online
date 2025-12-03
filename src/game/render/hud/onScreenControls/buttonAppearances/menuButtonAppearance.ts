import type { Sprite } from "pixi.js";
import type { EmptyObject } from "type-fest";

import type { ButtonAppearance } from "./buttonTypes";

export type MenuButtonRenderProps = EmptyObject;

import { emptyObject } from "../../../../../utils/empty";
import { createSprite } from "../../../createSprite";
import { tintForHud } from "../../spritesheetVariantForHud";

export const menuButtonAppearance: ButtonAppearance<"menu", string, Sprite> = ({
  currentRendering,
  tickContext,
  renderContext,
}) => {
  if (currentRendering !== undefined) {
    currentRendering.output!.tint = tintForHud(
      renderContext.general.colourised,
      tickContext.room.color,
      false,
    );
    return "no-update";
  }

  const sprite = createSprite({
    textureId: "hud.char.Menu",
    spritesheetVariant: "original",
  });
  sprite.scale = 2;

  return {
    output: sprite,
    renderProps: emptyObject,
  };
};
