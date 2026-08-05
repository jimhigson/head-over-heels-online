import { requireElement } from "./requireElement";

/**
 * Every element of the generated page the viewer drives. Looking them all up
 * in one place makes the markup the viewer depends on an explicit list, and
 * any drift between generator and viewer throws here at start-up rather than
 * halfway through an interaction.
 */
export const app = requireElement<HTMLElement>("#diffViewerApp");
export const toolbar = requireElement<HTMLElement>("#toolbar");
export const toolbarHandle = requireElement<HTMLElement>("#toolbar-handle");
export const rowSelect = requireElement<HTMLSelectElement>("#row-select");
export const sortSelect = requireElement<HTMLSelectElement>("#sort-select");
export const swapButton = requireElement<HTMLButtonElement>("#swap-versions");
export const zoomDiffButton = requireElement<HTMLButtonElement>("#zoom-diff");
export const overlayCheckbox =
  requireElement<HTMLInputElement>("#overlay-diff");
export const diffCountReadout = requireElement<HTMLElement>(
  "#diff-count-readout",
);
export const viewport = requireElement<HTMLElement>("#viewport");
export const stage = requireElement<HTMLElement>("#stage");
export const layerFrom = requireElement<HTMLImageElement>("#layer-from");
export const layerTo = requireElement<HTMLImageElement>("#layer-to");
export const layerDiff = requireElement<HTMLImageElement>("#layer-diff");
export const swipeDivider = requireElement<HTMLElement>("#swipe-divider");
export const swipeLabelLeft = requireElement<HTMLElement>("#swipe-label-left");
export const swipeLabelRight =
  requireElement<HTMLElement>("#swipe-label-right");

export const modeButtons = [
  ...document.querySelectorAll<HTMLButtonElement>(".mode-btn[data-mode]"),
];
