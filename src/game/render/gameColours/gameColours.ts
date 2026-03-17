import type { Color } from "pixi.js";
import type { Simplify } from "type-fest";

import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { PaletteSwaps } from "../filters/lutTexture/sparseLut";

import {
  zxSpectrumColors,
  type ZxSpectrumRoomHue,
} from "../../../originalGame";
import {
  getSpritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../sprites/palette/spritesheetPalette";

export const gameColour = (
  colourName: SpritesheetPaletteColourName,
  inDimmedPalette: boolean = false,
): Color => {
  return getSpritesheetPalette(inDimmedPalette)[colourName];
};

export const replacementColour = (
  hue: ZxSpectrumRoomHue,
  dim: boolean = false,
  inDimmedPalette: boolean = false,
) => {
  return gameColour(`swop_${hue}${dim ? "Dim" : ""}`, inDimmedPalette);
};

type PaletteSwapsForPlaceholderColours = Simplify<
  Required<Pick<PaletteSwaps, "replaceDark" | "replaceLight">>
>;

type Trend = "light-dark" | "light-mid" | "mid-dark";

export const replacementColours = (
  hue: ZxSpectrumRoomHue,
  inDimmedPalette: boolean = false,
  trend: Trend = "light-dark",
): PaletteSwapsForPlaceholderColours => {
  const palette = getSpritesheetPalette(inDimmedPalette);

  const requestedMid = trend === "light-mid" || trend === "mid-dark";

  const baseColourKey: `swop_${ZxSpectrumRoomHue}` = `swop_${hue}`;

  if (requestedMid) {
    const midKey = `${baseColourKey}Mid`;
    if (midKey in palette) {
      if (trend === "light-mid") {
        return {
          replaceLight: palette[baseColourKey],
          replaceDark: palette[midKey as SpritesheetPaletteColourName],
        };
      } else {
        return {
          replaceLight: palette[midKey as SpritesheetPaletteColourName],
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
