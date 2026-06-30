import { maybeReflectedVector } from "../../../model/MirrorOrientation";
import { type IndividualCharacterName } from "../../../model/modelTypes";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import { emptyObject } from "../../../utils/empty";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy8,
  vectorClosestDirectionXy8,
} from "../../../utils/vectors/vectors";
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

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    isReflection,
    item: {
      hash,
      config: { which, startDirection },
    },
    general: { paused, spritesheetVariants },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render = currentlyRenderedProps === undefined;

  if (!render) {
    return "no-update";
  }

  // scenery players have their own spritesheet variant, but in a reflection
  // they draw from the mirror-reflection variant like everything else:
  const spritesheet =
    isReflection ?
      spritesheetVariants.currentMainSpritesheet(false, false, true)
    : spritesheetVariants.sceneryPlayerSpritesheet;

  // and face the reflected way when seen in a mirror:
  const direction =
    vectorClosestDirectionXy8(
      maybeReflectedVector(unitVectors[startDirection], isReflection),
    ) ?? startDirection;

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: spriteOptions("head", direction, hash, paused, spritesheet),
          bottom: spriteOptions("heels", direction, hash, paused, spritesheet),
        })
      : createSprite(
          spriteOptions(which, direction, hash, paused, spritesheet),
        ),
    renderProps: emptyObject,
  };
};
