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
    isReflection,
    item: {
      hash,
      config: { times, style },
      state: { disabled },
    },
    general: { pixiRenderer, paused, spritesheetVariants, cameraAngle },
  },
  currentRendering,
}) => {
  if (
    currentRendering &&
    !!disabled === currentRendering.renderProps.disabled
  ) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );

  const rendering = createSprite(
    disabled ?
      { textureId: `${style}.disabled`, times, cameraAngle, spritesheet }
    : {
        animationId: style,
        times,
        cameraAngle,
        startFramePhase: hash,
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
