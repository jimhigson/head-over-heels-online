import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Color } from "pixi.js";
import { type Filter } from "pixi.js";
import type { PaletteSwaps } from "./PaletteSwapFilter";
import { PaletteSwapFilter } from "./PaletteSwapFilter";
import type { Shades } from "../../hintColours";
import { colorScheme, getColorScheme } from "../../hintColours";
import type { UnknownRoomState } from "../../../model/modelTypes";
import { emptyArray } from "../../../utils/empty";
import { RevertColouriseFilter } from "./RevertColouriseFilter";

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

const halfBrite = (c: Color) => {
  const [r, g, b] = c.toUint8RgbArray();
  const hb = new Color({ r: r / 2, g: g / 2, b: b / 2 });
  return hb;
};

export const replaceWithHalfbriteFilter = (c: Color) =>
  new PaletteSwapFilter({ replaceLight: c, replaceDark: halfBrite(c) });

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
  colourise: boolean,
): Filter =>
  colourise ?
    new PaletteSwapFilter(
      replaceMapForShades(
        colorScheme[room.color.hue][room.color.shade].edges[side],
      ),
    )
  : new RevertColouriseFilter(getColorScheme(room.color).edges[side].original);

export const mainPaletteSwapFilter = (room: UnknownRoomState): Filter =>
  new PaletteSwapFilter(replaceMapForRoom(room));

export const noFilters: Filter[] = emptyArray;
