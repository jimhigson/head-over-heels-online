//# allFunctionsCalledOnLoad

import type { Color } from "pixi.js";

import { Texture } from "pixi.js";

import {
  spritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../../../gfx/spritesheetPalette";
import { blockEncodeRgbBitDepth } from "./blockEncode";
import { lutSize, lutW } from "./lutSize";

const { floor, min } = Math;

type SpritesheetPaletteMappings = {
  [C in SpritesheetPaletteColourName]?: Color | SpritesheetPaletteColourName;
};
type ArbitraryMappings = Map<Color, Color>;

const normaliseInput = (
  inputMap: ArbitraryMappings | SpritesheetPaletteMappings,
): ArbitraryMappings => {
  if (inputMap instanceof Map) {
    return inputMap;
  }

  const result = new Map<Color, Color>();

  const entries = Object.entries(inputMap) as [
    SpritesheetPaletteColourName,
    Color | SpritesheetPaletteColourName,
  ][];
  for (const [key, value] of entries) {
    const srcColor = spritesheetPalette[key];
    const dstColor =
      typeof value === "string" ? spritesheetPalette[value] : value;

    result.set(srcColor, dstColor);
  }

  return result;
};

type SimpleColor = {
  red: number;
  green: number;
  blue: number;
};
const black: SimpleColor = { red: 0, blue: 0, green: 0 };

/* arbitrary amount to try to look ahead to block-fill some pixels */
const lookahead = 9;

export function voronoiLut(map: ArbitraryMappings): Texture;
export function voronoiLut(map: SpritesheetPaletteMappings): Texture;
/**
 * A (very) optimised lut generator in js (not shaders)
 * - js is fast enough after a lot of optimisation that it
 * doesn't make sense to switch
 */
export function voronoiLut(
  inputMap: ArbitraryMappings | SpritesheetPaletteMappings,
) {
  const map = normaliseInput(inputMap);

  // Create RGBA texture data (4 bytes per pixel)
  const data = new Uint8Array(lutSize * 4)
    // fill with 255 for the alpha channel - rgb will be overwritten:
    .fill(255);

  // convert all seed values to 0...255 range once to avoid later calculation:
  const mapKeys = map.keys().toArray();
  const mapValues = map
    .values()
    .map((val) => ({
      red: floor(val.red * 255),
      green: floor(val.green * 255),
      blue: floor(val.blue * 255),
    }))
    .toArray();
  const mapCount = mapKeys.length;

  const chanRes = 2 ** blockEncodeRgbBitDepth;

  const increment01 = 1 / (chanRes - 1);

  // since the distances in b of the seeds to our blue ordinal won't change for this whole plane of 64x64
  // pixels in the colour space * the number of mappings, they can be precomputed:
  const blueSeedDistanceSquared = new Array(mapCount);
  const blueGreenSeedDistanceSquared = new Array(mapCount);

  // precompute green distances for all gi/mi combinations:
  const greenSeedAllDistSquared: number[][] = [];
  let green01 = 0;
  for (let gi = 0; gi < chanRes; gi++) {
    const greenDistances = new Array(mapCount);
    for (let mi = 0; mi < mapCount; mi++) {
      const dg = green01 - mapKeys[mi].green;
      greenDistances[mi] = dg * dg;
    }
    greenSeedAllDistSquared[gi] = greenDistances;
    green01 += increment01;
  }

  // precompute red distances for all ri/mi combinations:
  const redSeedAllDistSquared: number[][] = [];
  let red01 = 0;
  for (let ri = 0; ri < chanRes; ri++) {
    const redDistances = new Array(mapCount);
    for (let mi = 0; mi < mapCount; mi++) {
      const dr = red01 - mapKeys[mi].red;
      redDistances[mi] = dr * dr;
    }
    redSeedAllDistSquared[ri] = redDistances;
    red01 += increment01;
  }

  let blue01 = 0;
  for (let bi = 0; bi < chanRes; bi++) {
    // blockX/Y won't change for the combination or r/g values so compute them eagerly:
    const blockX = (bi % 8) * 64;
    const blockY = floor(bi / 8) * 64;

    for (let mi = 0; mi < mapCount; mi++) {
      const d = blue01 - mapKeys[mi].blue;
      blueSeedDistanceSquared[mi] = d * d;
    }

    for (let gi = 0; gi < chanRes; gi++) {
      const greenSeedDistSquared = greenSeedAllDistSquared[gi];
      const locationY = blockY + gi;
      let byteLocation = (locationY * lutW + blockX) << 2; // `<< 2` === `*4` (4 bytes per pixel)

      // precompute bDist² + gDist² per-seed since this can't change inside the loop over ri
      for (let mi = 0; mi < mapCount; mi++) {
        blueGreenSeedDistanceSquared[mi] =
          blueSeedDistanceSquared[mi] + greenSeedDistSquared[mi];
      }

      for (let ri = 0; ri < chanRes; ) {
        const redSeedDistSquared = redSeedAllDistSquared[ri];
        let riClosestSeedValue: SimpleColor = black;
        let riClosestSeedDistSq = 9999;

        for (let mi = 0; mi < mapCount; mi++) {
          const dSq = blueGreenSeedDistanceSquared[mi] + redSeedDistSquared[mi];
          if (dSq < riClosestSeedDistSq) {
            riClosestSeedValue = mapValues[mi];
            riClosestSeedDistSq = dSq;
          }
        }

        let fillRun = 1;

        const maxLookaheadRi = min(ri + lookahead, chanRes - 1);

        // look ahead some arbitrary number of pixels in case we can do
        // a run of fills without checking again:

        for (let la = maxLookaheadRi; la > ri; la--) {
          let lookaheadClosestSeedValue: SimpleColor = black;
          let lookaheadClosestSeedDistSq = 9999;
          const lookaheadSeedDistSquared = redSeedAllDistSquared[la];
          for (let mi = 0; mi < mapCount; mi++) {
            const dSq =
              blueGreenSeedDistanceSquared[mi] + lookaheadSeedDistSquared[mi];
            if (dSq < lookaheadClosestSeedDistSq) {
              lookaheadClosestSeedValue = mapValues[mi];
              lookaheadClosestSeedDistSq = dSq;
            }
          }

          // looking ahead, we found the same colour so do a fill:
          if (lookaheadClosestSeedValue === riClosestSeedValue) {
            fillRun = la - ri + 1;
            break;
          }
        }

        for (let f = 0; f < fillRun; f++) {
          data[byteLocation++] = riClosestSeedValue.red;
          data[byteLocation++] = riClosestSeedValue.green;
          data[byteLocation] = riClosestSeedValue.blue;
          byteLocation += 2; // inc for blue and skip writing alpha - value of 255 was set with .fill initially
        }
        ri += fillRun;
      }
    }
    blue01 += increment01;
  }

  const texture = Texture.from({
    resource: data,
    width: lutW,
    height: lutW,
    scaleMode: "nearest",
    antialias: false,
  });

  return texture;
}
