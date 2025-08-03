import { spritesheetPalette } from "gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "gfx/spritesheetPaletteDim";
import type { Color } from "pixi.js";
import { type Filter } from "pixi.js";
import type { PaletteSwaps } from "./PaletteSwapFilter";
import { getPaletteSwapFilter } from "./PaletteSwapFilter";
import type { Shades } from "../../hintColours";
import {
  colorScheme,
  getColorScheme,
  yellowShadesInBasicRooms,
  yellowShadesInDimmedRooms,
} from "../../hintColours";
import { emptyArray } from "../../../utils/empty";
import { RevertColouriseFilter } from "./RevertColouriseFilter";
import { halfbrite, zxSpectrumDimmed } from "../../../utils/colour/halfBrite";
import { HalfBriteFilter } from "./HalfBriteFilter";
import type { UnknownRoomState } from "../../../model/RoomState";

/**
 * get the replaceLight/replaceDark swops for the given shade
 */
const replaceMapForShades = ({ basic, dimmed }: Shades): PaletteSwaps => ({
  replaceLight: basic,
  replaceDark: dimmed,
});

/**
 * get the replaceLight/replaceDark swops for a room
 */
const replaceMapForRoom = ({
  color: { hue, shade },
  planet,
}: Pick<UnknownRoomState, "color" | "planet">): PaletteSwaps => {
  const shades: Shades =
    hue === "yellow" ?
      shade === "dimmed" || planet === "jail" ?
        yellowShadesInDimmedRooms
      : yellowShadesInBasicRooms
    : colorScheme[hue][shade].main;

  return replaceMapForShades(shades);
};

/**
 * if given, will do colour replace - eg, deactivated cyber men
 * still have their backpacks in room colour
 */
export const greyFilter = (room?: Pick<UnknownRoomState, "color" | "planet">) =>
  getPaletteSwapFilter({
    lightBeige: spritesheetPalette.lightGrey,
    redShadow: spritesheetPalette.shadow,
    pink: spritesheetPalette.lightGrey,
    moss: spritesheetPalette.lightGrey,
    midRed: spritesheetPalette.midGrey,
    highlightBeige: spritesheetPalette.lightGrey,
    ...(room && replaceMapForRoom(room)),
  });

export const doughnuttedFilter = getPaletteSwapFilter({
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
  getPaletteSwapFilter({ replaceLight: c, replaceDark: halfbrite(c) });

export const edgeOriginalGameColour = (
  room: Pick<UnknownRoomState, "color">,
  side: "right" | "towards",
): Color => {
  const edge = getColorScheme(room.color).edges[side];
  const basicColour = edge.original;

  if (edge.dimInOriginal) {
    return zxSpectrumDimmed(basicColour);
  }

  return basicColour;
};

export const edgePaletteSwapFilters = (
  room: Pick<UnknownRoomState, "color">,
  side: "right" | "towards",
  colourise: boolean,
): Filter =>
  colourise ?
    getPaletteSwapFilter(
      replaceMapForShades(
        colorScheme[room.color.hue][room.color.shade].edges[side],
      ),
    )
  : new RevertColouriseFilter(getColorScheme(room.color).edges[side].original);

export const mainPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter => getPaletteSwapFilter(replaceMapForRoom(room));

export const floorPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter => {
  switch (room.color.hue) {
    case "white":
      // avoid white floors standing out too much, since floors need to not
      // be too distracting so that items stand out:
      return getPaletteSwapFilter({
        replaceLight: spritesheetPalette.lightGrey,
        replaceDark: spritesheetPalette.midGrey,
      });
    default:
      return mainPaletteSwapFilter(room);
  }
};

export const bookPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter => {
  switch (room.color.hue) {
    case "white":
      // the white books look a bit much, use a lighter version of the red filter instead
      return getPaletteSwapFilter({
        replaceLight: spritesheetPalette.lightBeige,
        replaceDark: spritesheetPalette.midRed,
        shadow: spritesheetPalette.redShadow,
      });
    case "yellow":
      return mainPaletteSwapFilter({
        planet: room.planet,
        color: { hue: "yellow", shade: "dimmed" },
      });
    default:
      return mainPaletteSwapFilter(room);
  }
};

export const halfBriteFilter = new HalfBriteFilter();

export const noFilters: Filter[] = emptyArray;

export const dimLut = getPaletteSwapFilter(spritesheetPaletteDim);
