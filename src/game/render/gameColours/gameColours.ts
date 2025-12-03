import type { Color } from "pixi.js";
import type { Simplify } from "type-fest";

import type { ZxSpectrumRoomHue } from "../../../originalGame";
import type { PaletteSwaps } from "../filters/lutTexture/sparseLut";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
  spritesheetPaletteDim,
} from "../../../sprites/palette/spritesheetPalette";

export const gameColour = (
  colourName: SpritesheetPaletteColourName,
  inDimmedPalette: boolean = false,
): Color => {
  return (inDimmedPalette ? spritesheetPaletteDim : spritesheetPalette)[
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

type PaletteSwapsForPlaceholderColours = Simplify<
  Required<Pick<PaletteSwaps, "replaceDark" | "replaceLight">>
>;

export const replacementColours = (
  hue: ZxSpectrumRoomHue,
  inDimmedPalette: boolean = false,
  trend: "light-dark" | "light-mid" | "mid-dark" = "light-dark",
): PaletteSwapsForPlaceholderColours => {
  const palette = inDimmedPalette ? spritesheetPaletteDim : spritesheetPalette;

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
