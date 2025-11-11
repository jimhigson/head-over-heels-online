import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { CreateSpriteOptions } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";

import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { emptyObject } from "../../../utils/empty";
import { createSprite } from "../createSprite";
import { getPaletteSwapFilter } from "../filters/PaletteSwapFilter";
import { createStackedSprites } from "./createStackedSprites";

// change the appearance of the citizens of Freedom to distinguish from the player */
const sceneryPlayerFilter = getPaletteSwapFilter({
  pastelBlue: spritesheetPalette.moss,
  metallicBlue: spritesheetPalette.moss,
  pink: spritesheetPalette.moss,
});

const spriteOptions = (
  name: IndividualCharacterName,
  direction: DirectionXy8,
  id: string,
  paused: boolean,
): Exclude<CreateSpriteOptions, string> => {
  const possibleAnimationId = `${name}.idle.${direction}`;
  if (isAnimationId(possibleAnimationId)) {
    return {
      animationId: possibleAnimationId,
      randomiseStartFrame: id,
      paused,
    };
  } else {
    return { textureId: `${name}.walking.${direction}.2` };
  }
};

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    item: {
      id,
      config: { which, startDirection },
    },
    general: { paused },
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
          top: spriteOptions("head", startDirection, id, paused),
          bottom: spriteOptions("heels", startDirection, id, paused),
          filter: sceneryPlayerFilter,
        })
      : createSprite({
          ...spriteOptions(which, startDirection, id, paused),
          filter: sceneryPlayerFilter,
        }),
    renderProps: emptyObject,
  };
};
