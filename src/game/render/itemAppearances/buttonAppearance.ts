import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type ButtonRenderProps = {
  pressed: boolean;
};

export const buttonAppearance: ItemAppearance<"button", ButtonRenderProps> = ({
  renderContext: {
    isReflection,
    item: {
      state: { pressed },
    },
    general: { spritesheetVariants },
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
      spritesheet: spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      ),
    }),
    renderProps: { pressed },
  };
};
