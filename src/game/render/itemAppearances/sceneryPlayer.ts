import { store } from "../../../store/store";
import { createSprite } from "../createSprite";
import { OutlineFilter } from "../filters/outlineFilter";
import { createStackedSprites } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";
import { carryableOutlineColour } from "./itemAppearanceColours";
import type { PortableItemRenderProps } from "./PortableItemRenderProps";

export const sceneryPlayerAppearance: ItemAppearance<
  "sceneryPlayer",
  PortableItemRenderProps
> = ({
  renderContext: {
    item: {
      config: { which, startDirection },
      state: { wouldPickUpNext: highlighted },
    },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render =
    currentlyRenderedProps === undefined ||
    highlighted !== currentlyRenderedProps.highlighted;

  if (!render) {
    return "no-update";
  }

  const filter =
    highlighted ?
      new OutlineFilter({
        outlineColor: carryableOutlineColour,
        upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
        // they might get pushed between pixels so can't skip the res
        lowRes: false,
      })
    : undefined;

  // strictly speaking, it isn't necessary to create new sprits just because the outline
  // changes, but this doesn't happen very often

  return {
    output:
      which === "headOverHeels" ?
        createStackedSprites({
          top: { textureId: `head.walking.${startDirection}.2`, filter },
          bottom: {
            textureId: `heels.walking.${startDirection}.2`,
            filter,
          },
        })
      : createSprite({
          textureId: `${which}.walking.${startDirection}.2`,
          filter,
        }),
    renderProps: { highlighted },
  };
};
