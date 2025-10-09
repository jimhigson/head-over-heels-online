import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import type { Simplify } from "type-fest";

import { spritesheetPalette } from "gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "gfx/spritesheetPaletteDim";
import { objectEntries } from "iter-tools-es";
import { Color } from "pixi.js";
import { type Filter } from "pixi.js";

import type { UnknownRoomState } from "../../../model/RoomState";
import type { ZxSpectrumRoomHue } from "../../../originalGame";
import type { SceneryName } from "../../../sprites/planets";
import type { Shades } from "../../hintColours";
import type { PaletteSwaps } from "./PaletteSwapFilter";

import {
  halfbrite,
  standardBrightnessLevels,
  zxSpectrumDimmed,
} from "../../../utils/colour/halfBrite";
import { emptyArray, emptyObject } from "../../../utils/empty";
import { transformObject } from "../../../utils/entries";
import { omit } from "../../../utils/pick";
import {
  colorScheme,
  getColorScheme,
  yellowShadesInBasicRooms,
  yellowShadesInDimmedRooms,
} from "../../hintColours";
import { HalfBriteFilter } from "./HalfBriteFilter";
import { getPaletteSwapFilter } from "./PaletteSwapFilter";
import { RevertColouriseFilter } from "./RevertColouriseFilter";

type PaletteSwapsForPlaceholderColours = Simplify<
  Required<Pick<PaletteSwaps, "replaceDark" | "replaceLight">>
>;

/**
 * get the replaceLight/replaceDark swops for the given shade
 */
const replaceMapForShades = ({
  basic,
  dimmed,
}: Shades): PaletteSwapsForPlaceholderColours => ({
  replaceLight: basic,
  replaceDark: dimmed,
});

/**
 * get the replaceLight/replaceDark swops for a room
 */
const replacePlaceholderColoursMapForRoom = ({
  color: { hue, shade },
  planet,
}: Pick<
  UnknownRoomState,
  "color" | "planet"
>): PaletteSwapsForPlaceholderColours => {
  const shades: Shades =
    hue === "yellow" ?
      shade === "dimmed" || planet === "jail" ?
        yellowShadesInDimmedRooms
      : yellowShadesInBasicRooms
    : colorScheme[hue][shade].main;

  return replaceMapForShades(shades);
};

export const greySwaps: PaletteSwaps = {
  lightBeige: spritesheetPalette.lightGrey,
  redShadow: spritesheetPalette.shadow,
  pink: spritesheetPalette.lightGrey,
  moss: spritesheetPalette.lightGrey,
  midRed: spritesheetPalette.midGrey,
  highlightBeige: spritesheetPalette.lightGrey,
  pastelBlue: spritesheetPalette.lightGrey,
  metallicBlue: spritesheetPalette.midGrey,
  replaceLight: spritesheetPalette.lightGrey,
  replaceDark: spritesheetPalette.midGrey,
};

export const greyFilter = getPaletteSwapFilter(greySwaps);

export const greyFilterExceptBlue = getPaletteSwapFilter(
  omit(greySwaps, "metallicBlue", "pastelBlue"),
);

/**
 * like the normal grey filter, but discards the blue that is usually preserved, and
 * preserves pink since that is Heel's highlight colour */
export const greyFilterExceptPink = getPaletteSwapFilter(
  omit(greySwaps, "pink"),
);

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

const greyishBlueShadows = new Color("#424249");
const brownishShadows = new Color("#494908");
const magentaShadows = new Color("#554055");
const bluishShadows = new Color("#404055");

export const sceneryColourReplacements: Partial<
  Record<SceneryName, PaletteSwaps>
> = {
  blacktooth: { pureBlack: halfbrite(spritesheetPalette.moss, 0.15) },
  safari: { pureBlack: halfbrite(spritesheetPalette.moss, 0.17) },
  jail: { pureBlack: halfbrite(spritesheetPalette.redShadow, 0.2) },
  egyptus: { pureBlack: halfbrite(spritesheetPalette.redShadow) },
  moonbase: {
    shadow: greyishBlueShadows,
    pureBlack: halfbrite(spritesheetPalette.metallicBlue, 0.2),
  },
  bookworld: {
    pureBlack: halfbrite(spritesheetPalette.highlightBeige, 0.1),
  },
  penitentiary: {
    pureBlack: halfbrite(spritesheetPalette.midGrey, 0.2),
  },
};
export const hueColourReplacements: Partial<
  Record<ZxSpectrumRoomHue, PaletteSwaps>
> = {
  yellow: { shadow: brownishShadows },
  white: { shadow: greyishBlueShadows },
  magenta: { shadow: magentaShadows },
  cyan: { shadow: bluishShadows },
};

export const colourisedRoomFilter = (
  colourised: boolean,
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter | Filter[] => {
  if (colourised) {
    if (room.color.shade === "dimmed") {
      const lightRoomPlaceholderSwaps =
        replacePlaceholderColoursMapForRoom(room);

      const darkRoomPlaceholderSwaps = transformObject(
        lightRoomPlaceholderSwaps,
        ([key, lightRoomReplacementColour]) => {
          /* 
            if the value hits a colour that is substituted in the dim palette lut,
             use that instead in the swaps here. This is equivalent to running through the
             colour replacement lut, and then the lut for dimmed rooms, but only requires a single
             filter pass
           */
          for (const [
            spritesheetColourName,
            spritesheetColour,
          ] of objectEntries(spritesheetPalette) as Iterable<
            [SpritesheetPaletteColourName, Color]
          >) {
            for (const l of standardBrightnessLevels) {
              // also test if it is a dimming of a standard colour, in which case, replace with a dimmed version
              // of that colour put through the lut: - test on the darker replacement blues in #safari4
              if (
                halfbrite(spritesheetColour, l).toHex() ===
                lightRoomReplacementColour.toHex()
              ) {
                return [
                  key,
                  halfbrite(spritesheetPaletteDim[spritesheetColourName], l),
                ];
              }
            }
          }

          // keep as-is:
          return [key, lightRoomReplacementColour];
        },
      );

      return getPaletteSwapFilter({
        ...spritesheetPaletteDim,
        ...darkRoomPlaceholderSwaps,
      });
    }

    return getPaletteSwapFilter({
      ...(sceneryColourReplacements[room.planet] ?? emptyObject),
      ...(hueColourReplacements[room.color.hue] ?? emptyObject),
      ...replacePlaceholderColoursMapForRoom(room),
    });
  } else {
    return new RevertColouriseFilter(
      room.color.shade === "dimmed" ?
        zxSpectrumDimmed(getColorScheme(room.color).main.original)
      : getColorScheme(room.color).main.original,
    );
  }
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

export const replacePlaceholderColoursPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter => getPaletteSwapFilter(replacePlaceholderColoursMapForRoom(room));

export const floorPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter | undefined => {
  switch (room.color.hue) {
    case "white":
      // avoid white floors standing out too much, since floors need to not
      // be too distracting so that items stand out:
      return getPaletteSwapFilter({
        replaceLight: spritesheetPalette.lightGrey,
        replaceDark: spritesheetPalette.midGrey,
      });
    default:
      // no special colourisation needed
      return undefined;
  }
};

export const bookPaletteSwapFilter = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Filter | undefined => {
  switch (room.color.hue) {
    case "white":
      // the white books look a bit much, use a lighter version of the red filter instead
      return getPaletteSwapFilter({
        replaceLight: spritesheetPalette.lightBeige,
        replaceDark: spritesheetPalette.midRed,
        shadow: spritesheetPalette.redShadow,
      });
    case "yellow":
      return replacePlaceholderColoursPaletteSwapFilter({
        planet: room.planet,
        color: { hue: "yellow", shade: "dimmed" },
      });
    default:
      // no special colourisation needed
      return undefined;
  }
};

export const halfBriteFilter = new HalfBriteFilter();

export const noFilters: Filter[] = emptyArray;

export const dimLut = getPaletteSwapFilter(spritesheetPaletteDim);
