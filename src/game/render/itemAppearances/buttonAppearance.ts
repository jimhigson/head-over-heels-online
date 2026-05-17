import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type ButtonRenderProps = {
  pressed: boolean;
};

export const buttonAppearance: ItemAppearance<"button", ButtonRenderProps> = ({
  renderContext: {
    item: {
      state: { pressed },
    },
    general: { spriteOption },
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
      spritesheetVariant:
        spriteOption.uncolourised ? "uncolourised" : "for-current-room",
    }),
    renderProps: { pressed },
  };
};
