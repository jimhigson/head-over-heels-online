import type { Disappear } from "../../../model/ItemInPlay";
import type { BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import type { TextureId } from "../../../sprites/spriteSheetData";
import { createSprite } from "../createSprite";
import {
  bookPaletteSwapFilter,
  mainPaletteSwapFilter,
} from "../filters/standardFilters";
import type { ItemAppearance } from "./ItemAppearance";

type BlockRenderProps = {
  disappear: Disappear;
};

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  disappear: boolean,
): TextureId => {
  if (style === "tower") {
    return "tower";
  }
  if (style === "book") {
    return `book.x`;
  }
  if (style === "organic" && isDark) {
    return `block.organic.dark${disappear ? ".disappearing" : ""}`;
  }
  return `block.${style}${disappear ? ".disappearing" : ""}`;
};

export const blockAppearance: ItemAppearance<"block", BlockRenderProps> = ({
  renderContext: {
    item: {
      config: { style, times },
      state: { disappear },
    },
    room,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.disappear !== disappear;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite({
      textureId: blockTextureId(
        room.color.shade === "dimmed",
        style,
        disappear !== null,
      ),
      filter:
        style === "organic" ? mainPaletteSwapFilter(room)
        : style === "book" ? bookPaletteSwapFilter(room)
        : undefined,
      times,
    }),
    renderProps: { disappear },
  };
};
