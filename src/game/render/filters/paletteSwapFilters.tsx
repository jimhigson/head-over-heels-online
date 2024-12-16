import { PaletteSwapFilter } from "@/filters/colorReplace/PaletteSwapFilter";
import type { Shades } from "@/hintColours";
import { colorScheme } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";
import { emptyArray } from "@/utils/empty";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { type Filter } from "pixi.js";

const paletteSwapFilter = (shades: Shades): Filter =>
  new PaletteSwapFilter({
    replaceLight: shades.basic,
    replaceDark: shades.dimmed,
  });

export const greyFilter = new PaletteSwapFilter({
  lightBeige: spritesheetPalette.lightGrey,
  redShadow: spritesheetPalette.shadow,
  metallicBlue: spritesheetPalette.midGrey,
  pink: spritesheetPalette.lightGrey,
  moss: spritesheetPalette.lightGrey,
  midRed: spritesheetPalette.midGrey,
  highlightBeige: spritesheetPalette.lightGrey,
  white: spritesheetPalette.lightGrey,
  replaceDark: spritesheetPalette.midGrey,
  replaceLight: spritesheetPalette.lightGrey,
});

export const doughnuttedFilter = new PaletteSwapFilter({
  shadow: spritesheetPalette.redShadow,
  midGrey: spritesheetPalette.midRed,
  lightGrey: spritesheetPalette.lightBeige,
  white: spritesheetPalette.highlightBeige,
  metallicBlue: spritesheetPalette.midRed,
  pink: spritesheetPalette.lightBeige,
  moss: spritesheetPalette.lightBeige,
  replaceDark: spritesheetPalette.midRed,
  replaceLight: spritesheetPalette.lightBeige,
});

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
) =>
  paletteSwapFilter(colorScheme[room.color.hue][room.color.shade].edges[side]);

export const mainPaletteSwapFilter = (room: UnknownRoomState): Filter =>
  paletteSwapFilter(colorScheme[room.color.hue][room.color.shade].main);

export const noFilters: Filter[] = emptyArray;
