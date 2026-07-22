import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
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
    general: { pixiRenderer, paused, spritesheets, cameraAngle },
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

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  const rendering = createSprite(
    disabled ?
      {
        textureId: variantTextureId(
          `${style}.disabled`,
          isReflection,
          false,
          false,
          false,
          undefined,
        ),
        times,
        cameraQuarterAngle,
        spritesheet,
      }
    : {
        animationId: variantTextureId(
          style,
          isReflection,
          false,
          false,
          false,
          undefined,
        ),
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
