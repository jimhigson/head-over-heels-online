import { fromAllEntries } from "@/utils/entries";
import spritesheetUrl from "../../gfx/sprites.png";
import { Color } from "pixi.js";

export type palette = [
  // 16 colours
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
];

export const colourPaletteNames = [
  "pureBlack", // 0
  "lightBlack", // 1
  "shadow", // 2
  "midGrey", // 3
  "lightGrey", // 4
  "white", // 5
  "metallicBlue", // 6
  "pink", // 7
  //
  "moss", // 8
  "redShadow", // 9
  "midRed", // 10
  "lightBeige", // 11
  "highlightBeige", // 12
  "alpha", // 13 colour was replaced in conversion with transparent
  // the replacement colours are in the spritesheet to be replaced with room-specific colours (using
  // the room's colour from the zx spectrum original game). These can be any (unique) colour in dpaint,
  // and we will pick them up here:
  "replaceLight", // 14
  "replaceDark", // 15
] as const;
export type ColorPaletteName = (typeof colourPaletteNames)[number];

export type SpritesheetPalette = Record<ColorPaletteName, Color>;

const sampleSpritesheetPalette = () =>
  new Promise<SpritesheetPalette>((resolve, reject) => {
    // Load the image
    const image = new Image();
    image.src = spritesheetUrl;

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx === null) {
        reject(Error("could not get 2d context from canvas"));
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      // Get pixel data from the canvas for the top-left first 16 pixels:
      const imageData = ctx.getImageData(0, 0, 16, 1).data;

      function* pixels(): Generator<[ColorPaletteName, Color]> {
        for (let i = 0; i < 16; i++) {
          const pixelStart = i * 4;
          yield [
            colourPaletteNames[i],
            new Color({
              r: imageData[pixelStart],
              g: imageData[pixelStart + 1],
              b: imageData[pixelStart + 2],
            }),
          ];
        }
      }

      const paletteMap = fromAllEntries(pixels());
      resolve(paletteMap);
    };

    image.onerror = reject;
  });

// note - we are abusing the type system here to avoid a top-level await
let loaded: SpritesheetPalette = undefined as unknown as SpritesheetPalette;
export const load = async () => {
  loaded = await sampleSpritesheetPalette();
};

/**
 * the 16 colours sampled from the spirtesheet, in the order they were originally in d-paint, but
 * after any processing done by the conversion to png.
 * The sprite sheet's first 16 pixels contains the colours in order, for us to sample from
 *
 * WARNING: If this is called before calling load, it will return an incorrectly typed undefined!
 */
export const spritesheetPalette = () => {
  if (loaded === undefined) {
    throw new Error("spritesheetPalette called before load");
  }
  return loaded;
};
