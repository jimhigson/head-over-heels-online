import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type LampRenderProps = {
  activated: boolean;
};

export const lampAppearance: ItemAppearance<"lamp", LampRenderProps> = ({
  renderContext: {
    item: {
      state: { activated },
      config: { direction, times },
    },
    general: { spritesheetVariants },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite({
      textureId: `lamp.${activated ? "on" : "off"}.${direction}`,
      // stacked to double/triple height when the lamp has times.z:
      times,
      // deactivated lamps render in the deactivated palette, like monsters do:
      spritesheet: spritesheetVariants.currentMainSpritesheet(activated),
    }),
    renderProps: { activated },
  };
};
