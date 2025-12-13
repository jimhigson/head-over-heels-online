import type { Color } from "pixi.js";

import type { SpritesheetPaletteColourName } from "../../../../gfx/spritesheetPalette";
import type { ZxSpectrumRoomHue } from "../../../originalGame";

import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "../../../../gfx/spritesheetPaletteDim";

export const gameColour = (
  colourName: SpritesheetPaletteColourName,
  inDimmedPalette: boolean = false,
): Color => {
  return (inDimmedPalette ? spritesheetPaletteDim : spritesheetPalette)[
    colourName
  ];
};

export const gameColourForHue = (
  hue: ZxSpectrumRoomHue,
  dim: boolean = false,
  inDimmedPalette: boolean = false,
) => {
  return gameColour(`swop_${hue}${dim ? "Dim" : ""}`, inDimmedPalette);
};
