import type { EmptyObject } from "type-fest";

import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
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
      general.spriteOption,
      tickContext.room.color,
      false,
      general.spritesheetMeta,
    );
    return "no-update";
  }

  const output = new TextContainer({
    pixiRenderer: general.pixiRenderer,
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
