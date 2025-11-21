import { twClass } from "../twClass";

// want to fit into the block grid with an outline, so 3blocks minus one (scales) pixel
export const buttonSizeClassNames =
  "h-[calc(3*var(--block)-1px*var(--scale))] w-[calc(3*var(--block)-1px*var(--scale))]";
export const buttonSmallSizeClassNames =
  "h-[calc(2*var(--block)-1px*var(--scale))] w-[calc(2*var(--block)-1px*var(--scale))]";
export const buttonSpriteRevertColourClasses = twClass(
  "[button:not([data-selected=true]):not(:hover)_&]:sprite-revert-to-two-tone-dim",
);
export const buttonGroupClassname = twClass(
  "flex flex-wrap gap-oneScaledPix w-full",
);
