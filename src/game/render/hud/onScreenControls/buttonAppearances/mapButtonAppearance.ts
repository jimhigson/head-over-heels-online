import { type BitmapText } from "pixi.js";
import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { createHudText } from "../../../text/createHudText";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type MapButtonRenderProps = EmptyObject;

export const mapButtonAppearance: ButtonAppearance<
  "map",
  string,
  MapButtonRenderProps,
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
    label: "mapText",
    outline: true,
    // double height (but not width) so it lines up height-wise with the
    // double-size menu and rotate buttons without stretching the "MAP" text
    doubleHeight: true,
    text: "MAP",
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
