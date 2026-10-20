import { type Color } from "pixi.js";

import { type ZxSpectrumRoomHue } from "../../../originalGame";
import { maybeDimPixiPalette } from "../../../sprites/palette/pixiPalette";
import {
  type BlockstackPaletteColourName,
  type ToppyPaletteColourName,
} from "../../../sprites/palette/spritesheetPalette";
import {
  blockstackPixiPalettes,
  toppyPixiPalettes,
} from "../../../sprites/palette/spritesheetPixiPalettes";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type NamedPixiColours } from "../../../utils/palette/palette";
import { zxSpectrumPixiColors } from "../palette/zxSpectrumPixiColours";

export const blockstackGameColour = (
  colourName: BlockstackPaletteColourName,
  inDimmedPalette: boolean = false,
): Color => {
  return maybeDimPixiPalette(blockstackPixiPalettes, inDimmedPalette)[
    colourName
  ];
};

export const blockstackReplacementColour = (
  hue: ZxSpectrumRoomHue,
  dim: boolean = false,
  inDimmedPalette: boolean = false,
) => {
  return blockstackGameColour(
    `swop_${hue}${dim ? "Dim" : ""}`,
    inDimmedPalette,
  );
};

const toppyHueMapping: Record<ZxSpectrumRoomHue, ToppyPaletteColourName> = {
  white: "warm1",
  yellow: "warm3",
  cyan: "cool2",
  green: "cool1",
  magenta: "pink1",
};

export const toppyReplacementColour = (hue: ZxSpectrumRoomHue): Color =>
  toppyPixiPalettes.basic[toppyHueMapping[hue]];

type PaletteSwapsForPlaceholderColours = NamedPixiColours<
  "replaceDark" | "replaceLight"
>;

type Trend = "light-dark" | "light-mid" | "mid-dark";

export const blockstackReplacementColours = (
  hue: ZxSpectrumRoomHue,
  inDimmedPalette: boolean = false,
  trend: Trend = "light-dark",
): PaletteSwapsForPlaceholderColours => {
  const palette = maybeDimPixiPalette(blockstackPixiPalettes, inDimmedPalette);

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
      }
      return {
        replaceLight: palette[midKey as BlockstackPaletteColourName],
        replaceDark: palette[`${baseColourKey}Dim`],
      };
    }
  }

  return {
    replaceLight: palette[baseColourKey],
    replaceDark: palette[`${baseColourKey}Dim`],
  };
};

export const getWhite = (
  spritesheetMeta: SpritesheetMetadata,
  dim: boolean = false,
): Color =>
  spritesheetMeta.isUncolourisedOf !== undefined ?
    zxSpectrumPixiColors.white
  : blockstackGameColour("white", dim);
