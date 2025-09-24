import type { ItemAppearance } from "./ItemAppearance";

import { createSprite } from "../createSprite";

type ButtonRenderProps = {
  pressed: boolean;
};

export const buttonAppearance: ItemAppearance<"button", ButtonRenderProps> = ({
  renderContext: {
    item: {
      state: { pressed },
    },
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
    }),
    renderProps: { pressed },
  };
};
