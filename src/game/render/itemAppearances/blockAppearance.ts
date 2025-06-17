import type { BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import type { TextureId } from "../../../sprites/spriteSheetData";
import { createSprite } from "../createSprite";
import {
  bookPaletteSwapFilter,
  mainPaletteSwapFilter,
} from "../filters/standardFilters";
import type { ItemAppearance } from "./ItemAppearance";

type BlockRenderProps = {
  // flatten disappear down to a single value, since all we care about is if it is on or not
  // for the sake of rendering
  isDissapearing: boolean;
};

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  isDissapearing: boolean,
): TextureId => {
  if (style === "tower") {
    return "tower";
  }
  if (style === "book") {
    return `book.x`;
  }
  if (style === "organic" && isDark) {
    return `block.organic.dark${isDissapearing ? ".disappearing" : ""}`;
  }
  return `block.${style}${isDissapearing ? ".disappearing" : ""}`;
};

export const blockAppearance: ItemAppearance<"block", BlockRenderProps> = ({
  renderContext: {
    item: {
      config: { style, times },
      state: { disappearing: disappear },
    },
    room,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const isDissapearing = disappear !== null;
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.isDissapearing !== isDissapearing;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite({
      textureId: blockTextureId(
        room.color.shade === "dimmed",
        style,
        isDissapearing,
      ),
      filter:
        style === "organic" ? mainPaletteSwapFilter(room)
        : style === "book" ? bookPaletteSwapFilter(room)
        : undefined,
      times,
    }),
    renderProps: { isDissapearing },
  };
};
