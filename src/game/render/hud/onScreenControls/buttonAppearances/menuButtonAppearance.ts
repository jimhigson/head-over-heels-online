import { type BitmapText } from "pixi.js";
import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { createHudText } from "../../../text/createHudText";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type MenuButtonRenderProps = EmptyObject;

export const menuButtonAppearance: ButtonAppearance<
  "menu",
  string,
  MenuButtonRenderProps,
  BitmapText
> = ({ currentRendering, tickContext, renderContext: { general } }) => {
  if (currentRendering !== undefined) {
    currentRendering.output!.tint = tintForHud(
      general.spriteOption,
      tickContext.room.color,
      tickContext.hovered ?? false,
      general.spritesheetMeta,
    );
    return "no-update";
  }

  const output = createHudText({
    label: "menuText",
    outline: true,
    doubleHeight: true,
    doubleWidth: true,
    text: "☰",
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
