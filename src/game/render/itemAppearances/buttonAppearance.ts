import type { ItemAppearance } from "./ItemAppearance";

import { createSprite } from "../createSprite";
import { mainPaletteSwapFilter } from "../filters/standardFilters";

type ButtonRenderProps = {
  pressed: boolean;
};

export const buttonAppearance: ItemAppearance<"button", ButtonRenderProps> = ({
  renderContext: {
    item: {
      state: { pressed },
    },
    room,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render =
    currentlyRenderedProps === undefined ||
    pressed !== currentlyRenderedProps.pressed;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite({
      textureId: pressed ? `buttonInGame.pressed` : "buttonInGame",
      filter: mainPaletteSwapFilter(room),
    }),
    renderProps: { pressed },
  };
};
