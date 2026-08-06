import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { maybeRenderContainerToAnimatedSprite } from "../../../utils/pixi/bakeContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { spriteFlipXAtAngle } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type Xy } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { cameraQuarterAngleEqual, type ItemAppearance } from "./ItemAppearance";

type DeadlyBlockRenderProps = {
  disabled: boolean;
  /** the flip (and any multiplied tiling) resolves per camera angle */
  renderedAtAngle: Xy;
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
    general: { pixiRenderer, paused, spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  if (
    currentRendering &&
    !!disabled === currentRendering.renderProps.disabled &&
    cameraQuarterAngleEqual(
      cameraQuarterAngle,
      currentRendering.renderProps.renderedAtAngle,
    )
  ) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  // deadly blocks flip on odd quarter turns so their painted shading stays on
  // their world faces (light source fixed in the world); each sub-sprite of a
  // multiplied run flips individually before any bake:
  const flipX = spriteFlipXAtAngle(cameraQuarterAngle);

  const rendering = createSprite(
    disabled ?
      {
        textureId: variantTextureId(
          `${style}.disabled`,
          isReflection,
          false,
          false,
          false,
        ),
        flipX,
        times,
        cameraQuarterAngle,
        spritesheet,
      }
    : {
        animationId: variantTextureId(style, isReflection, false, false, false),
        flipX,
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
    renderProps: { disabled: !!disabled, renderedAtAngle: cameraQuarterAngle },
  };
};
