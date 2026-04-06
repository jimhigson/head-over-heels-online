import type { Color } from "pixi.js";

import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { NamedColours } from "../../../utils/palette/palette";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import {
  zxSpectrumColors,
  type ZxSpectrumRoomHue,
} from "../../../originalGame";
import {
  type BlockstackPaletteColourName,
  maybeDimPalette,
} from "../../../sprites/palette/spritesheetPalette";

export const gameColour = (
  colourName: BlockstackPaletteColourName,
  inDimmedPalette: boolean = false,
): Color => {
  return maybeDimPalette(blockStackSpritesheetMeta, inDimmedPalette)[
    colourName
  ];
};

export const replacementColour = (
  hue: ZxSpectrumRoomHue,
  dim: boolean = false,
  inDimmedPalette: boolean = false,
) => {
  return gameColour(`swop_${hue}${dim ? "Dim" : ""}`, inDimmedPalette);
};

type PaletteSwapsForPlaceholderColours = NamedColours<
  "replaceDark" | "replaceLight"
>;

type Trend = "light-dark" | "light-mid" | "mid-dark";

export const replacementColours = (
  hue: ZxSpectrumRoomHue,
  inDimmedPalette: boolean = false,
  trend: Trend = "light-dark",
): PaletteSwapsForPlaceholderColours => {
  const palette = maybeDimPalette(blockStackSpritesheetMeta, inDimmedPalette);

  const requestedMid = trend === "light-mid" || trend === "mid-dark";

  const baseColourKey: `swop_${ZxSpectrumRoomHue}` = `swop_${hue}`;

  if (requestedMid) {
    const midKey = `${baseColourKey}Mid`;
    if (midKey in palette) {
      if (trend === "light-mid") {
        return {
          replaceLight: palette[baseColourKey],
          replaceDark: palette[midKey as BlockstackPaletteColourName],
        };
      } else {
        return {
          replaceLight: palette[midKey as BlockstackPaletteColourName],
          replaceDark: palette[`${baseColourKey}Dim`],
        };
      }
    }
  }

  return {
    replaceLight: palette[baseColourKey],
    replaceDark: palette[`${baseColourKey}Dim`],
  };
};

export const getWhite = (
  spriteOption: SpriteOption,
  dim: boolean = false,
): Color =>
  spriteOption === "Speccy" ? zxSpectrumColors.white : gameColour("white", dim);
