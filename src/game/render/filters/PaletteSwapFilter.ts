import { defaultFilterVert, Filter, GlProgram, Texture } from "pixi.js";

import type { PaletteSwaps } from "./lutTexture/sparseLut";

import { spritesheetPalette } from "../../../sprites/palette/spritesheetPalette";
import { sparseLut } from "./lutTexture/sparseLut";
import { voronoiLut } from "./lutTexture/voronoiLut";
import fragment from "./paletteSwap.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "palette-swop-filter1",
});

// Cache for PaletteSwapFilter instances
const filterCache = new Map<string, PaletteSwapFilter>();

export type LutType = "sparse" | "voronoi";

export type PaletteSwopSpec = { paletteSwaps: PaletteSwaps; lutType: LutType };

/**
 * Filter to emulate palette swopping from the indexed graphics days
 */
export class PaletteSwapFilter extends Filter {
  #lutTexture: Texture;

  /**
   * @param options - Options for the PaletteSwapFilter constructor.
   */
  constructor(
    { paletteSwaps, lutType }: PaletteSwopSpec,
    /**
     * where to mask the effect - white is on, black is off -
     * default to all white to apply everywhere
     */
    private mask: Texture = Texture.WHITE,
  ) {
    const lutTexture = (lutType === "voronoi" ? voronoiLut : sparseLut)(
      paletteSwaps,
    );

    super({
      glProgram,
      resources: {
        colorReplaceUniforms: {},
        uLut: lutTexture.source,
        uMask: mask.source,
      },
    });

    this.#lutTexture = lutTexture;
  }

  /**
   * Destroys this filter and its LUT texture
   * @param destroyOptions - @see Filter.destroy
   */
  destroy(
    /** true to destroy all */
    destroyOptions?:
      | {
          destroyPrograms?: boolean;
          destroyLutTexture?: boolean;
          destroyMask?: boolean;
        }
      | boolean,
  ): void {
    const destroyPrograms =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyPrograms);

    const destroyLutTexture =
      destroyOptions === true ||
      (typeof destroyOptions === "object" && destroyOptions.destroyLutTexture);

    const destroyMask =
      (this.lutTexture !== Texture.WHITE && destroyOptions === true) ||
      (typeof destroyOptions === "object" && destroyOptions.destroyMask);

    // Destroy our LUT texture to free GPU memory
    if (destroyLutTexture) {
      this.#lutTexture?.destroy(true);
    }
    // free our reference regardless of if the texture was destroyed
    this.#lutTexture = null as unknown as Texture;

    if (destroyMask) {
      this.mask?.destroy(true);
    }

    // Call parent destroy
    super.destroy(destroyPrograms);
  }

  /** probably just for debugging */
  get lutTexture(): Texture {
    return this.#lutTexture;
  }
}

/**
 * Generate a hash key for a PaletteSwaps object
 */
const hashSwops = (swops: PaletteSwaps): string => {
  return Object.entries(swops)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, color]) => `${key}:${color.toHex()}`)
    .join("|");
};

/**
 * Factory function to get or create a cached PaletteSwapFilter
 * This prevents creating duplicate filters for the same palette swaps
 */
export const getPaletteSwapFilter = (
  paletteSwaps: PaletteSwaps,
  lutType: "sparse" | "voronoi" = "sparse",
): PaletteSwapFilter => {
  const key = `${lutType}|${hashSwops(paletteSwaps)}`;

  let filter = filterCache.get(key);
  if (!filter) {
    filter = new PaletteSwapFilter({ paletteSwaps, lutType });
    filterCache.set(key, filter);
  }

  return filter;
};

export const swopsToConsoleLog = (
  message: string,
  { lutType, paletteSwaps }: PaletteSwopSpec,
): [string, ...string[]] => {
  const fgForColour = (colour: { red: number; green: number; blue: number }) =>
    (colour.red + colour.green + colour.blue) / 3 > 0.5 ? "black" : "white";

  const formatParts: string[] = [];
  const cssArgs: string[] = [];
  for (const [name, toColour] of Object.entries(paletteSwaps)) {
    const fromColour =
      spritesheetPalette[name as keyof typeof spritesheetPalette];
    const fromHex = fromColour.toHex();
    const toHex = toColour.toHex();
    formatParts.push(`%c ${name.padEnd(16)}%c ➡ %c ${toHex} %c`);
    cssArgs.push(
      `background: ${fromHex}; color: ${fgForColour(fromColour)}; padding: 2px;`,
      "",
      `background: ${toHex}; color: ${fgForColour(toColour)}; padding: 2px;`,
      "",
    );
  }
  const lutTypeColour =
    lutType === "sparse" ?
      spritesheetPalette.pink.toHex()
    : spritesheetPalette.pastelBlue.toHex();

  return [
    `${message}\n%c ${lutType} LUT %c\n${formatParts.join("\n")}`,
    `background: ${lutTypeColour}; color: white; padding: 2px;`,
    "",
    ...cssArgs,
  ];
};
