import { entries } from "../src/utils/entries";

/**
 * A Tom-Thumb-style 3×5 pixel font - about the smallest legible pixel font -
 * used to write texture ids across the sprites of the debug spritesheet.
 * Uppercase, digits and basic punctuation only.
 *
 * The glyphs are drawn as character art so they can be read and edited as
 * pictures: `█` is a lit pixel and a space an unlit one. Each glyph is a
 * template literal that always starts with a newline, so every row of art
 * sits flush against column 0 of the file.
 */
// prettier-ignore
const glyphArt = {
  A: `
 █ 
█ █
███
█ █
█ █`,
  B: `
██ 
█ █
██ 
█ █
██ `,
  C: `
 ██
█  
█  
█  
 ██`,
  D: `
██ 
█ █
█ █
█ █
██ `,
  E: `
███
█  
██ 
█  
███`,
  F: `
███
█  
██ 
█  
█  `,
  G: `
 ██
█  
█ █
█ █
 ██`,
  H: `
█ █
█ █
███
█ █
█ █`,
  I: `
███
 █ 
 █ 
 █ 
███`,
  J: `
 ██
  █
  █
█ █
 █ `,
  K: `
█ █
█ █
██ 
█ █
█ █`,
  L: `
█  
█  
█  
█  
███`,
  M: `
█ █
███
███
█ █
█ █`,
  N: `
██ 
█ █
█ █
█ █
█ █`,
  O: `
 █ 
█ █
█ █
█ █
 █ `,
  P: `
██ 
█ █
██ 
█  
█  `,
  Q: `
 █ 
█ █
█ █
 █ 
  █`,
  R: `
██ 
█ █
██ 
█ █
█ █`,
  S: `
 ██
█  
 █ 
  █
██ `,
  T: `
███
 █ 
 █ 
 █ 
 █ `,
  U: `
█ █
█ █
█ █
█ █
███`,
  V: `
█ █
█ █
█ █
█ █
 █ `,
  W: `
█ █
█ █
███
███
█ █`,
  X: `
█ █
█ █
 █ 
█ █
█ █`,
  Y: `
█ █
█ █
 █ 
 █ 
 █ `,
  Z: `
███
  █
 █ 
█  
███`,
  "0": `
███
█ █
█ █
█ █
███`,
  "1": `
 █ 
██ 
 █ 
 █ 
███`,
  "2": `
██ 
  █
 █ 
█  
███`,
  "3": `
██ 
  █
 █ 
  █
██ `,
  "4": `
█ █
█ █
███
  █
  █`,
  "5": `
███
█  
██ 
  █
██ `,
  "6": `
 ██
█  
██ 
█ █
 █ `,
  "7": `
███
  █
 █ 
 █ 
 █ `,
  "8": `
 █ 
█ █
 █ 
█ █
 █ `,
  "9": `
 █ 
█ █
 ██
  █
██ `,
  ".": `
   
   
   
   
 █ `,
  "-": `
   
   
███
   
   `,
  "/": `
  █
  █
 █ 
█  
█  `,
} as const satisfies { [character: string]: string };

const litPixel = "█";

/** the size every glyph above is drawn at, in pixels; each glyph is checked against it */
export const debugFontGlyphWidth = 3;
export const debugFontGlyphHeight = 5;

/**
 * one row of art as the bit pattern the sprite labeller scans, most
 * significant bit leftmost. A row's trailing spaces are significant (they are
 * unlit pixels) but editors and tools can strip them, so short rows are
 * right-padded back out rather than rejected.
 */
const rowBits = (character: string, artRow: string): number => {
  if (artRow.length > debugFontGlyphWidth) {
    throw new Error(
      `a row of the glyph for "${character}" is ${artRow.length} pixels wide, but every glyph is ${debugFontGlyphWidth} wide`,
    );
  }
  return [...artRow.padEnd(debugFontGlyphWidth)].reduce(
    (bits, pixel) => (bits << 1) | (pixel === litPixel ? 1 : 0),
    0,
  );
};

/**
 * one glyph's character art as its rows of bit patterns, dropping the leading
 * blank line produced by the template literal always starting with a newline
 */
const glyphBits = (
  character: string,
  /** character art for one glyph, as a template literal starting with a newline */
  art: string,
): Array<number> => {
  const [leadingBlankLine, ...rows] = art.split("\n");
  if (leadingBlankLine !== "") {
    throw new Error(
      `the glyph for "${character}" must start with a newline so every row is flush with column 0, but found "${leadingBlankLine}" before the first newline`,
    );
  }
  if (rows.length !== debugFontGlyphHeight) {
    throw new Error(
      `the glyph for "${character}" is ${rows.length} pixels tall, but every glyph is ${debugFontGlyphHeight} tall`,
    );
  }
  return rows.map((row) => rowBits(character, row));
};

/** each glyph's rows as bit patterns, keyed by the character it draws */
export const debugFontGlyphs = new Map<string, Array<number>>(
  entries(glyphArt).map(([character, art]) => [
    character,
    glyphBits(character, art),
  ]),
);
