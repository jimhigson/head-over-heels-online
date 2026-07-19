import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { HudText } from "../../../text/HudText";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type MenuButtonRenderProps = EmptyObject;

export const menuButtonAppearance: ButtonAppearance<
  "menu",
  string,
  MenuButtonRenderProps,
  HudText
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

  const output = new HudText({
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
