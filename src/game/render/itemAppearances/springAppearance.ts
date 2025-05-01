import type { Container } from "pixi.js";
import { isStoodOn } from "../../../model/StoodOnBy";
import { store } from "../../../store/store";
import { emptyArray } from "../../../utils/empty";
import { createSprite } from "../createSprite";
import { OutlineFilter } from "../filters/outlineFilter";
import type { ItemAppearance } from "./ItemAppearance";
import { carryableOutlineColour } from "./itemAppearanceColours";
import type { PortableItemRenderProps } from "./PortableItemRenderProps";

type SpringRenderProps = PortableItemRenderProps & {
  compressed: boolean;
};

export const springAppearance: ItemAppearance<"spring", SpringRenderProps> = ({
  renderContext: {
    item: {
      state: { stoodOnBy, wouldPickUpNext: highlighted },
    },
    paused,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const compressed = isStoodOn(stoodOnBy);

  const render =
    currentlyRenderedProps === undefined ||
    highlighted !== currentlyRenderedProps.highlighted ||
    compressed !== currentlyRenderedProps.compressed;

  if (!render) {
    return "no-update";
  }

  const currentlyRenderedCompressed =
    currentlyRenderedProps?.compressed ?? false;

  const filter =
    highlighted ?
      new OutlineFilter({
        outlineColor: carryableOutlineColour,
        lowRes: false,
        upscale: store.getState().gameMenus.upscale.gameEngineUpscale,
      })
    : undefined;

  const previousRendering = currentRendering?.output;

  const changeFilterOnExistingRendering =
    previousRendering !== undefined &&
    compressed === currentlyRenderedCompressed &&
    highlighted !== currentlyRenderedProps?.highlighted;

  let output: Container;

  if (changeFilterOnExistingRendering) {
    // only need to change the highlight - not the whole rendering. This is necessary
    // to not stop the animation when heels jumps off the spring and it stops highlighting
    previousRendering.filters = filter ?? emptyArray;
    output = previousRendering;
  } else {
    output =
      !compressed && currentlyRenderedCompressed ?
        createSprite({
          animationId: "spring.bounce",
          playOnce: "and-stop",
          filter,
          paused,
        })
      : createSprite({
          textureId: compressed ? "spring.compressed" : "spring.released",
          filter,
        });
  }

  return {
    output,
    renderProps: { compressed, highlighted },
  };
};
