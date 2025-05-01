import { store } from "../../../store/store";
import { createSprite } from "../createSprite";
import { OutlineFilter } from "../filters/outlineFilter";
import type { ItemAppearance } from "./ItemAppearance";
import { carryableOutlineColour } from "./itemAppearanceColours";
import type { PortableItemRenderProps } from "./PortableItemRenderProps";

export const portableBlockAppearance: ItemAppearance<
  "portableBlock",
  PortableItemRenderProps
> = ({
  renderContext: {
    item: {
      config: { style },
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
        lowRes: false,
        upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
      })
    : undefined;

  return {
    output: createSprite({
      textureId: style,
      filter,
    }),
    renderProps: { highlighted },
  };
};
