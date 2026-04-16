import type { Color } from "pixi.js";

import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";

import { objectEntriesIter } from "../entries";

export type NamedColours<ColourName extends string> = Record<ColourName, Color>;

export type PartialNamedColours<ColourName extends string> = Partial<
  NamedColours<ColourName>
>;

export type NamedSwops<ColourName extends string> = {
  [n in ColourName]?: ColourName;
};

/**
 * Resolve a name-keyed `paletteSwaps` object into a `Map<sourceColor, targetColor>`
 * by looking each source name up in `palette`.
 *
 * `NoInfer` on the swops parameter pins the `Names` generic to the palette's
 * keys, so typos in swop literals are caught as compile errors.
 */
export const resolveSwops = <Names extends string>(
  palette: NamedColours<Names>,
  paletteSwaps: PartialNamedColours<NoInfer<Names>>,
): Map<Color, Color> => {
  const result = new Map<Color, Color>();
  for (const [name, target] of objectEntriesIter(paletteSwaps)) {
    if (target !== undefined) {
      result.set(palette[name], target);
    }
  }
  return result;
};

/**
 * try to get a colour from the swapped palette that is actually being used, according to
 * the ambient swops
 *
 * // NOTE: this doesn't currently support double-swops
 * // NOTE: also doesn't support texture-specific swops
 */
export const getAmbientSwoppedColour = <ColourName extends string>(
  palette: NamedColours<ColourName>,
  colourName: ColourName,
  ambient: PaletteSwopSpec[] | undefined,
): Color => {
  const keyColour = palette[colourName];

  if (ambient === undefined) return keyColour;

  for (const swop of ambient) {
    const swoppedColor = swop.swops.get(keyColour);
    if (swoppedColor !== undefined) {
      return swoppedColor;
    }
  }

  return keyColour;
};

/**
 * Resolves a named mapping:
 *    (colour name → colour name)
 *
 * to a `PaletteSwaps`:
 *    (colour name → `Color`)
 *
 * by looking up target colour names in the spritesheet's own palette.
 */
export const resolveNamedColourSwops = <N extends string>(
  nameMappings: {
    [n in N]?: N;
  },
  palette: {
    [n in N]?: Color;
  },
): {
  [n in N]?: Color;
} => {
  const result: {
    [n in N]?: Color;
  } = {};
  for (const [src, target] of objectEntriesIter(nameMappings)) {
    if (target !== undefined) {
      result[src] = palette[target];
    }
  }
  return result;
};
