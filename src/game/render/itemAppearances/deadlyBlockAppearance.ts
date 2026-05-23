import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

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
    general: { pixiRenderer, paused, spritesheetVariants },
  },
  currentRendering,
}) => {
  if (
    currentRendering &&
    !!disabled === currentRendering.renderProps.disabled
  ) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet();

  const rendering = createSprite(
    disabled ?
      { textureId: `${style}.disabled`, times, spritesheet }
    : {
        animationId: style,
        times,
        randomiseStartFrame: id,
        paused,
        spritesheet,
      },
  );

  return {
    output: maybeRenderContainerToAnimatedSprite(
      pixiRenderer,
      rendering,
      style,
      spritesheet,
    ),
    renderProps: { disabled: !!disabled },
  };
};
