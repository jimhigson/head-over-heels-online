import { type IndividualCharacterName } from "../../../model/modelTypes";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheetWithVariants } from "../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  resolveSpriteDirectionIndexXy8,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import { type DirectionIndexXy8 } from "../../../utils/vectors/vectors";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

const spriteOptions = (
  name: IndividualCharacterName,
  resolvedFacingArtIndexXy8: DirectionIndexXy8,
  flipX: boolean,
  hash: number | undefined,
  paused: boolean,
  spritesheet: AppSpritesheetWithVariants,
  isReflection: boolean,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId =
    `${name}.idle.d${resolvedFacingArtIndexXy8}` as const;

  if (isAnimationId(possibleAnimationId, spritesheet.data)) {
    return {
      animationId: variantTextureId(
        possibleAnimationId,
        isReflection,
        false,
        false,
        true,
      ),
      flipX,
      startFramePhase: hash,
      paused,
      spritesheet,
    };
  }
  return {
    textureId: variantTextureId(
      `${name}.walking.d${resolvedFacingArtIndexXy8}.2`,
      isReflection,
      false,
      false,
      true,
    ),
    flipX,
    spritesheet,
  };
};

type SceneryPlayerRenderProps = {
  /** the directional sprite-variant index drawn */
  resolvedFacingArtIndexXy8: DirectionIndexXy8;
  /** whether the directional sprite is drawn horizontally flipped */
  flipX: boolean;
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

  // resolve the configured facing against the continuous camera angle to the
  // sprite-variant index with its paired flip (keeping the painted shading on
  // the character's world faces - the light source stays fixed in the world),
  // stepping through intermediate facings mid-turn. Rounding happens only
  // here, at the final sprite pick:
  const resolvedFacingArtIndexXy8 = resolveSpriteDirectionIndexXy8(
    startDirection,
    cameraAngle,
    isReflection,
  );
  const flipX = spriteFlipXAtAngle(cameraAngle);

  const render =
    currentlyRenderedProps === undefined ||
    resolvedFacingArtIndexXy8 !==
      currentlyRenderedProps.resolvedFacingArtIndexXy8 ||
    flipX !== currentlyRenderedProps.flipX;

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
            resolvedFacingArtIndexXy8,
            flipX,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
          bottom: spriteOptions(
            "heels",
            resolvedFacingArtIndexXy8,
            flipX,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
        })
      : createSprite(
          spriteOptions(
            which,
            resolvedFacingArtIndexXy8,
            flipX,
            hash,
            paused,
            spritesheet,
            isReflection,
          ),
        ),
    renderProps: { resolvedFacingArtIndexXy8, flipX },
  };
};
