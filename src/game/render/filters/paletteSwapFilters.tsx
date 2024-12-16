import { PaletteSwapFilter } from "@/filters/colorReplace/PaletteSwapFilter";
import type { Shades } from "@/hintColours";
import { colorScheme } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";
import { emptyArray } from "@/utils/empty";
import { type Filter } from "pixi.js";

const paletteSwapFilter = (shades: Shades): Filter =>
  // MultiColorReplaceFilter from '@pixi/filter-multi-color-replace' is also an option but its api is not as friendly
  new PaletteSwapFilter({
    replaceLight: shades.basic,
    replaceDark: shades.dimmed,
  });

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
) =>
  paletteSwapFilter(colorScheme[room.color.hue][room.color.shade].edges[side]);

export const mainPaletteSwapFilter = (room: UnknownRoomState): Filter =>
  paletteSwapFilter(colorScheme[room.color.hue][room.color.shade].main);

export const noFilters: Filter[] = emptyArray;
