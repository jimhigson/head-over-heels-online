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
> = ({ currentRendering, tickContext, renderContext }) => {
  if (currentRendering !== undefined) {
    currentRendering.output!.tint = tintForHud(
      renderContext.general.colourised,
      tickContext.room.color,
      false,
    );
    return "no-update";
  }

  const output = new TextContainer({
    pixiRenderer: renderContext.general.pixiRenderer,
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
