import { createSprite } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { noFilters } from "../filters/standardFilters";
import type { DirectionXyz4 } from "../../../utils/vectors/vectors";

type CursorRenderProps = {
  valid?: boolean;
  face: DirectionXyz4;
};

const invalidFilter = new RevertColouriseFilter(spritesheetPalette.midRed);

export const cursorAppearance: ItemAppearance<"cursor", CursorRenderProps> = ({
  renderContext,
  currentRendering,
}) => {
  const { item: cursorItem } = renderContext;

  const {
    state: { face, valid },
  } = cursorItem;

  const currentlyRenderedProps = currentRendering?.renderProps;

  // no item tool, or not valid - render the a single cursor sprite:
  const render =
    currentlyRenderedProps === undefined ||
    valid !== currentlyRenderedProps.valid ||
    face !== currentlyRenderedProps.face;

  if (render) {
    // newly went back to a simple sprite:
    return {
      output: createSprite({
        textureId: face === "up" ? "editor.cursor.floor" : "editor.cursor.xz",
        flipX: face === "right",
        filter: valid ? noFilters : invalidFilter,
      }),
      renderProps: {
        valid,
        face,
      },
    };
  } else {
    // keep rendering the same
    return "no-update";
  }
};
