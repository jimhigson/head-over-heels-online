import { spritesheetPalette } from "gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "gfx/spritesheetPaletteDim";
import type { Color } from "pixi.js";
import { type Filter } from "pixi.js";
import type { PaletteSwaps } from "./PaletteSwapFilter";
import { PaletteSwapFilter } from "./PaletteSwapFilter";
import type { Shades } from "../../hintColours";
import { colorScheme, getColorScheme } from "../../hintColours";
import { emptyArray } from "../../../utils/empty";
import { RevertColouriseFilter } from "./RevertColouriseFilter";
import { halfbrite } from "../../../utils/colour/halfBrite";
import { HalfBriteFilter } from "./HalfBriteFilter";
import type { UnknownRoomState } from "../../../model/RoomState";

const replaceMapForShades = ({ basic, dimmed }: Shades): PaletteSwaps => ({
  replaceLight: basic,
  replaceDark: dimmed,
});

const replaceMapForRoom = (
  room: Pick<UnknownRoomState, "color">,
): PaletteSwaps =>
  replaceMapForShades(colorScheme[room.color.hue][room.color.shade].main);

/**
 * if given, will do colour replace - eg, deactivated cyber men
 * still have their backpacks in room colour
 */
export const greyFilter = (room?: Pick<UnknownRoomState, "color">) =>
  new PaletteSwapFilter({
    lightBeige: spritesheetPalette.lightGrey,
    redShadow: spritesheetPalette.shadow,
    pink: spritesheetPalette.lightGrey,
    moss: spritesheetPalette.lightGrey,
    midRed: spritesheetPalette.midGrey,
    highlightBeige: spritesheetPalette.lightGrey,
    ...(room && replaceMapForRoom(room)),
  });

export const doughnuttedFilter = new PaletteSwapFilter({
  midGrey: spritesheetPalette.midRed,
  lightGrey: spritesheetPalette.lightBeige,
  white: spritesheetPalette.highlightBeige,
  metallicBlue: spritesheetPalette.redShadow,
  pink: spritesheetPalette.midRed,
  moss: spritesheetPalette.midRed,
  replaceDark: spritesheetPalette.midRed,
  replaceLight: spritesheetPalette.lightBeige,
});

export const replaceWithHalfbriteFilter = (c: Color) =>
  new PaletteSwapFilter({ replaceLight: c, replaceDark: halfbrite(c) });

export const edgePaletteSwapFilters = (
  room: Pick<UnknownRoomState, "color">,
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

export const mainPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color">,
): Filter => new PaletteSwapFilter(replaceMapForRoom(room));

export const floorPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color">,
): Filter => {
  switch (room.color.hue) {
    case "white":
      // avoid white floors standing out too much, since floors need to not
      // be too distracting so that items stand out:
      return new PaletteSwapFilter({
        replaceLight: spritesheetPalette.lightGrey,
        replaceDark: spritesheetPalette.midGrey,
      });
    default:
      return mainPaletteSwapFilter(room);
  }
};

export const bookPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color">,
): Filter => {
  switch (room.color.hue) {
    case "white":
      // the white books look a bit much, use a lighter version of the red filter instead
      return new PaletteSwapFilter({
        replaceLight: spritesheetPalette.lightBeige,
        replaceDark: spritesheetPalette.midRed,
        shadow: spritesheetPalette.redShadow,
      });
    default:
      return mainPaletteSwapFilter(room);
  }
};

export const halfBriteFilter = new HalfBriteFilter();

export const noFilters: Filter[] = emptyArray;

export const dimLut = new PaletteSwapFilter(spritesheetPaletteDim);
