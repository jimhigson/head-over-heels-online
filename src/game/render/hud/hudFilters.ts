import type { OutlineFilter } from "../filters/outlineFilter";

import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { halfbrite } from "../../../utils/colour/halfBrite";
import { accentColours } from "../../hintColours";
import { outlineFilters } from "../filters/outlineFilter";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";

export type OutlineAndColouriseFilter = [OutlineFilter, RevertColouriseFilter];

export const hudOutlineFilter = outlineFilters.pureBlack;

export const hudLowlightedFilter: RevertColouriseFilter =
  new RevertColouriseFilter();
export const hudIconFilter = new RevertColouriseFilter();
export const hudTextFilter = new RevertColouriseFilter();
export const hudFpsColourFilter = new RevertColouriseFilter(
  spritesheetPalette.moss,
);

/**
 * without colourisation, the active character gets the same colour as the lives text
 */
export const hudHighligtedFilter = new RevertColouriseFilter();

/* for either colourised or original (colours will be changed by HudRenderer) */
export const hudLowlightAndOutlineFilters = [
  hudLowlightedFilter,
  hudOutlineFilter,
];
/* for either colourised or original (colours will be changed by HudRenderer) */
export const hudHighlightAndOutlineFilters = [
  hudHighligtedFilter,
  hudOutlineFilter,
];

/* for either colourised or original (colours will be changed by HudRenderer) */
export const hudOutlinedTextFilters = [
  hudOutlineFilter,
  hudTextFilter,
] as OutlineAndColouriseFilter;

export const hudLivesTextFilter = {
  original: [
    hudOutlineFilter,
    hudHighligtedFilter,
  ] as OutlineAndColouriseFilter,
  colourised: {
    head: {
      active: [
        hudOutlineFilter,
        new RevertColouriseFilter(spritesheetPalette[accentColours.head]),
      ] as OutlineAndColouriseFilter,
      inactive: [
        hudOutlineFilter,
        new RevertColouriseFilter(
          halfbrite(spritesheetPalette[accentColours.head]),
        ),
      ] as OutlineAndColouriseFilter,
    },
    heels: {
      active: [
        hudOutlineFilter,
        new RevertColouriseFilter(spritesheetPalette[accentColours.heels]),
      ] as OutlineAndColouriseFilter,
      inactive: [
        hudOutlineFilter,
        new RevertColouriseFilter(
          halfbrite(spritesheetPalette[accentColours.heels]),
        ),
      ] as OutlineAndColouriseFilter,
    },
  },
};
