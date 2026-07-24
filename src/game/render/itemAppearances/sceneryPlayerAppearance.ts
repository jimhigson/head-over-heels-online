import { type IndividualCharacterName } from "../../../model/modelTypes";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheetWithVariants } from "../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { resolveCameraRelativeIndexXy8 } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type DirectionIndexXy8 } from "../../../utils/vectors/vectors";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionIndexXy8,
  hash: number | undefined,
  paused: boolean,
  spritesheet: AppSpritesheetWithVariants,
  isReflection: boolean,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.d${direction}` as const;

  if (isAnimationId(possibleAnimationId, spritesheet.data)) {
    return {
      animationId: variantTextureId(
        possibleAnimationId,
        isReflection,
        false,
        false,
        true,
      ),
      startFramePhase: hash,
      paused,
      spritesheet,
    };
  }
  return {
    textureId: variantTextureId(
      `${name}.walking.d${direction}.2`,
      isReflection,
      false,
      false,
      true,
    ),
    spritesheet,
  };
};

type SceneryPlayerRenderProps = {
  resolvedRenderDirectionIndex: DirectionIndexXy8;
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
    general: { paused, spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  // resolve the configured facing against the continuous camera angle -
  // stepping through intermediate facings mid-turn. Rounding happens only
  // here, at the final sprite-name pick:
  const resolvedRenderDirectionIndex = resolveCameraRelativeIndexXy8(
    startDirection,
    cameraAngle,
    isReflection,
  );

  const render =
    currentlyRenderedProps === undefined ||
    resolvedRenderDirectionIndex !==
      currentlyRenderedProps.resolvedRenderDirectionIndex;

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: spriteOptions(
            "head",
            resolvedRenderDirectionIndex,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
          bottom: spriteOptions(
            "heels",
            resolvedRenderDirectionIndex,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
        })
      : createSprite(
          spriteOptions(
            which,
            resolvedRenderDirectionIndex,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
        ),
    renderProps: { resolvedRenderDirectionIndex },
  };
};
