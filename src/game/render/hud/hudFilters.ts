import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { OutlineFilter } from "../filters/outlineFilter";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";

export type OutlineAndColouriseFilter = [OutlineFilter, RevertColouriseFilter];

export const hudOutlineFilter = new OutlineFilter({
  outlineColor: spritesheetPalette.pureBlack,
  upscale: store.getState().upscale.gameEngineUpscale,
  // it is ok to snap to pixel grid
  lowRes: true,
});

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
    head: [
      hudOutlineFilter,
      new RevertColouriseFilter(spritesheetPalette.metallicBlue),
    ] as OutlineAndColouriseFilter,
    heels: [
      hudOutlineFilter,
      new RevertColouriseFilter(spritesheetPalette.pink),
    ] as OutlineAndColouriseFilter,
  },
};
