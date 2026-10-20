import { type Color } from "pixi.js";

import {
  zxSpectrumHexColours,
  zxSpectrumHexColoursDimmed,
  type ZxSpectrumHue,
  type ZxSpectrumPaletteColour,
  type ZxSpectrumRoomColour,
  type ZxSpectrumShade,
} from "../../../originalGame";
import { toPixiPalette } from "../../../sprites/palette/toPixiPalette";

export const zxSpectrumPixiColors = toPixiPalette(zxSpectrumHexColours);
export const zxSpectrumPixiColorsDimmed = toPixiPalette(
  zxSpectrumHexColoursDimmed,
);

export const zxSpectrumPaletteColours: Record<ZxSpectrumPaletteColour, Color> =
  {
    redBasic: zxSpectrumPixiColors.red,
    greenBasic: zxSpectrumPixiColors.green,
    blueBasic: zxSpectrumPixiColors.blue,
    cyanBasic: zxSpectrumPixiColors.cyan,
    magentaBasic: zxSpectrumPixiColors.magenta,
    yellowBasic: zxSpectrumPixiColors.yellow,
    blackBasic: zxSpectrumPixiColors.black,
    whiteBasic: zxSpectrumPixiColors.white,
    redDimmed: zxSpectrumPixiColorsDimmed.red,
    greenDimmed: zxSpectrumPixiColorsDimmed.green,
    blueDimmed: zxSpectrumPixiColorsDimmed.blue,
    cyanDimmed: zxSpectrumPixiColorsDimmed.cyan,
    magentaDimmed: zxSpectrumPixiColorsDimmed.magenta,
    yellowDimmed: zxSpectrumPixiColorsDimmed.yellow,
    blackDimmed: zxSpectrumPixiColorsDimmed.black,
    whiteDimmed: zxSpectrumPixiColorsDimmed.white,
  };

export function zxSpectrumPixiColor(colour: ZxSpectrumRoomColour): Color;
export function zxSpectrumPixiColor(
  hue: ZxSpectrumHue,
  shade?: ZxSpectrumShade,
): Color;
export function zxSpectrumPixiColor(
  hueOrColour: ZxSpectrumHue | ZxSpectrumRoomColour,
  shade?: ZxSpectrumShade,
): Color {
  const { hue, shade: resolvedShade } =
    typeof hueOrColour === "object" ? hueOrColour : (
      { hue: hueOrColour, shade: shade ?? "basic" }
    );
  const hues =
    resolvedShade === "dimmed" ?
      zxSpectrumPixiColorsDimmed
    : zxSpectrumPixiColors;
  return hues[hue];
}
