import { type EditorGlyph } from "./useGlyphs";

/**
 * The bands the character strip is broken into.
 *
 * Ordered as they are looked for rather than as the font stores them, so
 * finding a character means knowing roughly what it is rather than where it
 * happens to sit on the spritesheet
 */
const bands = [
  { name: "lower case", holds: (char: string) => /^\p{Ll}$/u.test(char) },
  { name: "upper case", holds: (char: string) => /^\p{Lu}$/u.test(char) },
  { name: "digits", holds: (char: string) => /^\p{Nd}$/u.test(char) },
  {
    name: "punctuation",
    holds: (char: string) => /^[.,;:!?'"`_\-–—()[\]{}]$/u.test(char),
  },
  {
    name: "maths and money",
    holds: (char: string) => /^[+\-*/\\=<>%#&$£€¥^~|@]$/u.test(char),
  },
  { name: "arrows", holds: (char: string) => /^[←-⇿⬀-⯿➠-➿⤀-⥿]$/u.test(char) },
  { name: "symbols", holds: () => true },
] as const;

export type CharBand = { name: string; glyphs: EditorGlyph[] };

/** the font's characters in bands, skipping any band nothing landed in */
export const charBands = (glyphs: readonly EditorGlyph[]): CharBand[] => {
  const found = bands.map(({ name }): CharBand => ({ name, glyphs: [] }));
  for (const glyph of glyphs) {
    const band = bands.findIndex(({ holds }) => holds(glyph.char));
    found[band].glyphs.push(glyph);
  }
  return found.filter(({ glyphs: inBand }) => inBand.length > 0);
};
