import { PaletteSwapFilter } from "@/filters/colorReplace/PaletteSwapFilter";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import type { Shades } from "@/hintColours";
import { colorScheme } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";
import { spritesheetPalette } from "@/sprites/samplePalette";
import { type Filter } from "pixi.js";

const paletteSwapFilters = (shades: Shades) => [
  // MultiColorReplaceFilter from '@pixi/filter-multi-color-replace' is also an option but its api is not as friendly
  new PaletteSwapFilter({
    originalColor: spritesheetPalette.replaceLight,
    targetColor: shades.basic,
    tolerance: 0.1,
  }),
  new PaletteSwapFilter({
    originalColor: spritesheetPalette.replaceDark,
    targetColor: shades.dimmed,
    tolerance: 0.1,
  }),
];

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
) => paletteSwapFilters(colorScheme[room.color].edges[side]);

export const mainPaletteSwapFilters = (room: UnknownRoomState) =>
  paletteSwapFilters(colorScheme[room.color].main);

export const revertColouriseDim = new RevertColouriseFilter(
  spritesheetPalette.shadow,
);

export const noFilters: Filter[] = [];