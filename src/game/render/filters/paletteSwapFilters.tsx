import { PaletteSwapFilter } from "@/filters/colorReplace/PaletteSwapFilter";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import type { Shades } from "@/hintColours";
import { hintColours } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";

const paletteSwapFilters = (shades: Shades) => [
  // MultiColorReplaceFilter from '@pixi/filter-multi-color-replace' is also an option but its api is not as friendly
  new PaletteSwapFilter({
    originalColor: 0x00ffff,
    targetColor: shades.basic,
    tolerance: 0.1,
  }),
  new PaletteSwapFilter({
    originalColor: 0x008888,
    targetColor: shades.dimmed,
    tolerance: 0.1,
  }),
];

export const edgePaletteSwapFilters = (
  room: UnknownRoomState,
  side: "right" | "towards",
) => paletteSwapFilters(hintColours[room.color].edges[side]);

export const mainPaletteSwapFilters = (room: UnknownRoomState) =>
  paletteSwapFilters(hintColours[room.color].main);

export const revertColouriseDim = new RevertColouriseFilter({
  originalColor: 0xffffff,
  targetColor: 0x49605d,
  tolerance: 0.999,
});
