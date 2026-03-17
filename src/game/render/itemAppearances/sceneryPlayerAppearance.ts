import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { SpritesheetVariant } from "../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";

import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { emptyObject } from "../../../utils/empty";
import { createSprite } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionXy8,
  id: string,
  paused: boolean,
  spriteOption: SpriteOption,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.${direction}`;
  const spritesheetVariant: SpritesheetVariant =
    spriteOption.uncolourised ? "uncolourised" : "sceneryPlayer";
  const spritesheet = getSpriteSheetVariant(spritesheetVariant);

  if (isAnimationId(possibleAnimationId, spritesheet.data)) {
    return {
      animationId: possibleAnimationId,
      randomiseStartFrame: id,
      paused,
      spritesheet,
    };
  } else {
    return { textureId: `${name}.walking.${direction}.2`, spritesheet };
  }
};

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    item: {
      id,
      config: { which, startDirection },
    },
    general: { paused, spriteOption },
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
          top: spriteOptions("head", startDirection, id, paused, spriteOption),
          bottom: spriteOptions(
            "heels",
            startDirection,
            id,
            paused,
            spriteOption,
          ),
        })
      : createSprite(
          spriteOptions(which, startDirection, id, paused, spriteOption),
        ),
    renderProps: emptyObject,
  };
};
