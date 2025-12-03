import type { EmptyObject } from "type-fest";

import type { ButtonAppearance } from "./buttonTypes";

export type MapButtonRenderProps = EmptyObject;

import { emptyObject } from "../../../../../utils/empty";
import { TextContainer } from "../../../text/TextContainer";
import { tintForHud } from "../../spritesheetVariantForHud";

export const mapButtonAppearance: ButtonAppearance<
  "map",
  string,
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
    label: "mapText",
    outline: true,
    text: "MAP",
  });

  return {
    output,
    renderProps: emptyObject,
  };
};
