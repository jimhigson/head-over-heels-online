import type { Shades } from "@/hintColours";
import { hintColours } from "@/hintColours";
import type { UnknownRoomState } from "@/model/modelTypes";
import { ColorReplaceFilter } from "pixi-filters";

const paletteSwapFilters = (shades: Shades) => [
  // MultiColorReplaceFilter from '@pixi/filter-multi-color-replace' is also an option but its api is not as friendly
  new ColorReplaceFilter({
    originalColor: 0x00ffff,
    targetColor: shades.basic,
    tolerance: 0.1,
  }),
  new ColorReplaceFilter({
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
