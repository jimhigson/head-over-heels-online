import type { ItemAppearance } from "./ItemAppearance";

import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../createSprite";

type DeadlyBlockRenderProps = {
  disabled: boolean;
};

export const deadlyBlockAppearance: ItemAppearance<
  "deadlyBlock",
  DeadlyBlockRenderProps
> = ({
  renderContext: {
    item: {
      id,
      config: { times, style },
      state: { disabled },
    },
    general: { pixiRenderer, paused, spriteOption },
  },
  currentRendering,
}) => {
  if (
    currentRendering &&
    !!disabled === currentRendering.renderProps.disabled
  ) {
    return "no-update";
  }

  const spritesheetVariant =
    spriteOption.uncolourised ? "uncolourised" : "for-current-room";

  const rendering = createSprite({
    times,
    randomiseStartFrame: id,
    paused,
    spritesheetVariant,
    ...(disabled ? { textureId: `${style}.disabled` } : { animationId: style }),
  });

  return {
    output: maybeRenderContainerToAnimatedSprite(
      pixiRenderer,
      rendering,
      style,
    ),
    renderProps: { disabled: !!disabled },
  };
};
