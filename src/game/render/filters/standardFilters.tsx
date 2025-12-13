import { spritesheetPalette } from "gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "gfx/spritesheetPaletteDim";
import { Color } from "pixi.js";
import { type Filter } from "pixi.js";

import type { SceneryName } from "../../../sprites/planets";
import type { PaletteSwaps } from "./lutTexture/sparseLut";

import { type ZxSpectrumRoomHue } from "../../../originalGame";
import { halfbrite } from "../../../utils/colour/halfBrite";
import { emptyArray } from "../../../utils/empty";
import { omit } from "../../../utils/pick";
import { HalfBriteFilter } from "./HalfBriteFilter";
import { getPaletteSwapFilter } from "./PaletteSwapFilter";

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

export const halfBriteFilter = new HalfBriteFilter();

export const noFilters: Filter[] = emptyArray;

export const dimLut = getPaletteSwapFilter(spritesheetPaletteDim);
