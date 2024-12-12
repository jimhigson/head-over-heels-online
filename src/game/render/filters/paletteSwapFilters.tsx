import { PaletteSwapFilter } from "@/filters/colorReplace/PaletteSwapFilter";
import type { Shades } from "@/hintColours";
import { colorScheme } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";
import { emptyArray } from "@/utils/empty";
import { spritesheetPalette } from "gfx/spritesheetPalette";
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
) =>
  paletteSwapFilters(colorScheme[room.color.hue][room.color.shade].edges[side]);

export const mainPaletteSwapFilters = (room: UnknownRoomState) =>
  paletteSwapFilters(colorScheme[room.color.hue][room.color.shade].main);

export const noFilters: Filter[] = emptyArray;
