import { type IndividualCharacterName } from "../../../model/modelTypes";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import { resolveCameraRelativeVectorXy8 } from "../../../utils/vectors/resolveCameraRelativeVector";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionXy8,
  hash: number | undefined,
  paused: boolean,
  spritesheet: AppSpritesheet,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.${direction}`;

  if (isAnimationId(possibleAnimationId, spritesheet.data)) {
    return {
      animationId: possibleAnimationId,
      startFramePhase: hash,
      paused,
      spritesheet,
    };
  }
  return { textureId: `${name}.walking.${direction}.2`, spritesheet };
};

type SceneryPlayerRenderProps = {
  resolvedRenderDirection: DirectionXy8;
};

export const sceneryPlayerAppearance: ItemAppearance<
  "sceneryPlayer",
  SceneryPlayerRenderProps
> = ({
  renderContext: {
    isReflection,
    item: {
      hash,
      config: { which, startDirection },
    },
    general: { paused, spritesheetVariants, cameraAngle },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  // resolve the configured facing against the continuous camera angle -
  // stepping through intermediate facings mid-turn. Rounding happens only
  // here, at the final sprite-name pick:
  const resolvedRenderDirection = resolveCameraRelativeVectorXy8(
    unitVectors[startDirection],
    cameraAngle,
    isReflection,
  );

  const render =
    currentlyRenderedProps === undefined ||
    resolvedRenderDirection !== currentlyRenderedProps.resolvedRenderDirection;

  if (!render) {
    return "no-update";
  }

  // scenery players have their own spritesheet variant, but in a reflection
  // they draw from the mirror-reflection variant like everything else:
  const spritesheet =
    isReflection ?
      spritesheetVariants.currentMainSpritesheet(false, false, true)
    : spritesheetVariants.sceneryPlayerSpritesheet;

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: spriteOptions(
            "head",
            resolvedRenderDirection,
            hash,
            paused,
            spritesheet,
          ),
          bottom: spriteOptions(
            "heels",
            resolvedRenderDirection,
            hash,
            paused,
            spritesheet,
          ),
        })
      : createSprite(
          spriteOptions(
            which,
            resolvedRenderDirection,
            hash,
            paused,
            spritesheet,
          ),
        ),
    renderProps: { resolvedRenderDirection },
  };
};
