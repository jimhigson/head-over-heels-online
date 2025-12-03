import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";

import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { emptyObject } from "../../../utils/empty";
import { createSprite } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionXy8,
  id: string,
  paused: boolean,
  isColourised: boolean,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.${direction}`;
  const spritesheetVariant: SpritesheetVariant =
    isColourised ? "sceneryPlayer" : "uncolourised";

  if (isAnimationId(possibleAnimationId)) {
    return {
      animationId: possibleAnimationId,
      randomiseStartFrame: id,
      paused,
      spritesheetVariant,
    };
  } else {
    return { textureId: `${name}.walking.${direction}.2`, spritesheetVariant };
  }
};

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    item: {
      id,
      config: { which, startDirection },
    },
    general: { paused, colourised },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render = currentlyRenderedProps === undefined;

  if (!render) {
    return "no-update";
  }

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: spriteOptions("head", startDirection, id, paused, colourised),
          bottom: spriteOptions(
            "heels",
            startDirection,
            id,
            paused,
            colourised,
          ),
        })
      : createSprite(
          spriteOptions(which, startDirection, id, paused, colourised),
        ),
    renderProps: emptyObject,
  };
};
