import { type IndividualCharacterName } from "../../../model/modelTypes";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../sprites/spritesheet/variants/SpritesheetVariants";
import { emptyObject } from "../../../utils/empty";
import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionXy8,
  id: string,
  paused: boolean,
  spritesheet: AppSpritesheet,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.${direction}`;

  if (isAnimationId(possibleAnimationId, spritesheet.data)) {
    return {
      animationId: possibleAnimationId,
      randomiseStartFrame: id,
      paused,
      spritesheet,
    };
  }
  return { textureId: `${name}.walking.${direction}.2`, spritesheet };
};

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    item: {
      id,
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

  const spritesheet = spritesheetVariants.sceneryPlayerSpritesheet;

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: spriteOptions("head", startDirection, id, paused, spritesheet),
          bottom: spriteOptions(
            "heels",
            startDirection,
            id,
            paused,
            spritesheet,
          ),
        })
      : createSprite(
          spriteOptions(which, startDirection, id, paused, spritesheet),
        ),
    renderProps: emptyObject,
  };
};
