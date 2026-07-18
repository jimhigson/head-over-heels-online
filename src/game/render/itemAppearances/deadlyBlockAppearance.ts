import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { type Xy } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import {
  cameraQuarterAngleEqual,
  type ItemAppearance,
  multipliedLayoutAngle,
} from "./ItemAppearance";

type DeadlyBlockRenderProps = {
  disabled: boolean;
  /** the multiplied tiling resolves per camera angle; null when single */
  multipliedAtAngle: null | Xy;
};

export const deadlyBlockAppearance: ItemAppearance<
  "deadlyBlock",
  DeadlyBlockRenderProps
> = ({
  renderContext: {
    isReflection,
    item,
    item: {
      hash,
      config: { times, style },
      state: { disabled },
    },
    general: { pixiRenderer, paused, spritesheetVariants, cameraAngle },
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const multipliedAtAngle = multipliedLayoutAngle(item, cameraQuarterAngle);
  if (
    currentRendering &&
    !!disabled === currentRendering.renderProps.disabled &&
    cameraQuarterAngleEqual(
      multipliedAtAngle,
      currentRendering.renderProps.multipliedAtAngle,
    )
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
      { textureId: `${style}.disabled`, times, cameraQuarterAngle, spritesheet }
    : {
        animationId: style,
        times,
        cameraQuarterAngle,
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
    renderProps: { disabled: !!disabled, multipliedAtAngle },
  };
};
