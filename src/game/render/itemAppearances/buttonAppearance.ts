import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
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
    general: { spritesheets },
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
      textureId: variantTextureId(
        pressed ? `buttonInGame.pressed` : "buttonInGame",
        isReflection,
        false,
        false,
        false,
        undefined,
      ),
      spritesheet: spritesheets.spritesheetForCurrentRoom,
    }),
    renderProps: { pressed },
  };
};
