import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type MenuButtonRenderProps = EmptyObject;

export const menuButtonAppearance: ButtonAppearance<
  "menu",
  string,
  MenuButtonRenderProps,
  TextContainer
> = ({ currentRendering, tickContext, renderContext: { general } }) => {
  if (currentRendering !== undefined) {
    currentRendering.output!.tint = tintForHud(
      general.spritesheetMeta,
      tickContext.room.color,
      tickContext.hovered ?? false,
    );
    return "no-update";
  }

  const output = new TextContainer({
    pixiRenderer: general.pixiRenderer,
    resolution: general.spritesheets.spritesheetUpscale,
    label: "menuText",
    outline: true,
    doubleHeight: true,
    doubleWidth: true,
    text: "☰",
    colour: tintForHud(
      general.spritesheetMeta,
      tickContext.room.color,
      tickContext.hovered ?? false,
    ),
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
