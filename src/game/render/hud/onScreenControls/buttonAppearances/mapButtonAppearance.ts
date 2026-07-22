import { type EmptyObject } from "type-fest";

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { tintForHud } from "../../spritesheetVariantForHud";

export type MapButtonRenderProps = EmptyObject;

export const mapButtonAppearance: ButtonAppearance<
  "map",
  string,
  MapButtonRenderProps,
  TextContainer
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

  const output = new TextContainer({
    pixiRenderer: general.pixiRenderer,
    label: "mapText",
    outline: true,
    // double height (but not width) so it lines up height-wise with the
    // double-size menu and rotate buttons without stretching the "MAP" text
    doubleHeight: true,
    text: "MAP",
    colour: tintForHud(
      general.spriteOption,
      tickContext.room.color,
      tickContext.hovered ?? false,
      general.spritesheetMeta,
    ),
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
