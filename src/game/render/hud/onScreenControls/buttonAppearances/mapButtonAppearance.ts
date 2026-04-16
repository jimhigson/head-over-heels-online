import type { EmptyObject } from "type-fest";

import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
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
      false,
      general.spritesheetMeta,
    );
    return "no-update";
  }

  const output = new TextContainer({
    pixiRenderer: general.pixiRenderer,
    label: "mapText",
    outline: true,
    text: "MAP",
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
