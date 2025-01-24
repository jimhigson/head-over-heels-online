import { spritesheetPalette } from "gfx/spritesheetPalette";
import { type Filter } from "pixi.js";
import type { PaletteSwaps } from "./PaletteSwapFilter";
import { PaletteSwapFilter } from "./PaletteSwapFilter";
import type { Shades } from "../../hintColours";
import { colorScheme } from "../../hintColours";
import type { UnknownRoomState } from "../../../model/modelTypes";
import { emptyArray } from "../../../utils/empty";

const replaceMapForShades = ({ basic, dimmed }: Shades): PaletteSwaps => ({
  replaceLight: basic,
  replaceDark: dimmed,
});

const replaceMapForRoom = (room: UnknownRoomState): PaletteSwaps =>
  replaceMapForShades(colorScheme[room.color.hue][room.color.shade].main);

export const greyFilter = (room: UnknownRoomState) =>
  new PaletteSwapFilter({
    lightBeige: spritesheetPalette.lightGrey,
    redShadow: spritesheetPalette.shadow,
    //metallicBlue: spritesheetPalette.midGrey,
    pink: spritesheetPalette.lightGrey,
    moss: spritesheetPalette.lightGrey,
    midRed: spritesheetPalette.midGrey,
    highlightBeige: spritesheetPalette.lightGrey,
    //white: spritesheetPalette.lightGrey,
    ...replaceMapForRoom(room),
  });

export const doughnuttedFilter = new PaletteSwapFilter({
  //shadow: spritesheetPalette.redShadow,
  midGrey: spritesheetPalette.midRed,
  lightGrey: spritesheetPalette.lightBeige,
  white: spritesheetPalette.highlightBeige,
  metallicBlue: spritesheetPalette.redShadow,
  pink: spritesheetPalette.midRed,
  moss: spritesheetPalette.midRed,
  replaceDark: spritesheetPalette.midRed,
  replaceLight: spritesheetPalette.lightBeige,
});

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
): Filter =>
  new PaletteSwapFilter(
    replaceMapForShades(
      colorScheme[room.color.hue][room.color.shade].edges[side],
    ),
  );

export const mainPaletteSwapFilter = (room: UnknownRoomState): Filter =>
  new PaletteSwapFilter(replaceMapForRoom(room));

export const noFilters: Filter[] = emptyArray;
