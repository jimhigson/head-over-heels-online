import { emptyObject } from "../../../utils/empty";
import { createSprite } from "../createSprite";
import { createStackedSprites } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

export const sceneryPlayerAppearance: ItemAppearance<"sceneryPlayer"> = ({
  renderContext: {
    item: {
      config: { which, startDirection },
    },
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
          top: { textureId: `head.walking.${startDirection}.2` },
          bottom: {
            textureId: `heels.walking.${startDirection}.2`,
          },
        })
      : createSprite({
          textureId: `${which}.walking.${startDirection}.2`,
        }),
    renderProps: emptyObject,
  };
};
