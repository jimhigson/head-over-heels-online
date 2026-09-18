import { type HudGlyph } from "../hudGlyphs";

/** rgba pixels, however the host happened to decode them */
export type DecodedImage = {
  width: number;
  height: number;
  data: Uint8ClampedArray;
};

/**
 * the shipped gfx/sprites.webp has every non-frame area (including the HUD
 * char rows) masked to transparent, so the font is generated from the
 * unmasked full sheet iff2png keeps for reference: gfx/sprites.borders.png.
 * There the char ink is pure white on a coloured background and the png
 * carries no useful alpha, so ink is keyed on white
 */
export const isInk = (image: DecodedImage, x: number, y: number): boolean => {
  const i = (y * image.width + x) * 4;
  return (
    image.data[i] === 255 &&
    image.data[i + 1] === 255 &&
    image.data[i + 2] === 255
  );
};

/** one glyph's frame of the sheet as a grid of ink/no-ink */
export const glyphBitmap = (
  image: DecodedImage,
  { x, y, w, h }: HudGlyph<string>["frame"],
): boolean[][] => {
  const bitmap: boolean[][] = [];
  for (let row = 0; row < h; row++) {
    bitmap.push(
      Array.from({ length: w }, (_, col) => isInk(image, x + col, y + row)),
    );
  }
  return bitmap;
};
