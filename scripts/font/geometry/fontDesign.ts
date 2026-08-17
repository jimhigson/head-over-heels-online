import { hudCharTextureSize } from "../../../src/sprites/spritesheet/spritesheetData/textureSizes";
import { size } from "../../../src/utils/iterators/size";
import { type HudGlyph, hudGlyphs } from "../hudGlyphs";
import {
  menuLeaderBackChar,
  menuLeaderFocussedChar,
  menuLeaderUnfocussedChar,
} from "../menuLeaderChars";
import {
  baselineFromTop,
  type Contour,
  descenderPixels,
  px,
  unitsPerEm,
} from "./fontUnits";
import { type DecodedImage, glyphBitmap } from "./glyphBitmap";

const spaceCodePoint = 0x20;
const emSpaceCodePoint = 0x20_03;
// the spritesheet space frame is a full block wide, but that's too wide for
// font-rendered text (BitmapText doesn't render a space sprite at all, spacing
// words with a margin instead). narrow it to 5/8 of a block here. this is applied
// only here, not in hudSritesheetData, so the in-game space sprite (which is drawn
// directly in a few places) keeps its on-sheet width.
const spaceAdvanceWidth = hudCharTextureSize.w * 0.625;
// an explicit wider space, one full block - has no equivalent in the sprite path
const emSpaceAdvanceWidth = hudCharTextureSize.w;

// most multi-codepoint spritesheet names (eg "QUESTMK") are spritesheet-only and
// skipped, but these also become font glyphs, at the given codepoints. "DOT" is
// the original game's 8px fixed-grid full stop: mapping it to U+FF0E FULLWIDTH
// FULL STOP gives text a full-character-width dot (eg game speed "0．75") while
// the ordinary "." keeps its narrow proportional glyph
const namedGlyphCodePoints: { [name: string]: number } = {
  DOT: 0xff_0e,
};

/**
 * the pairs whose spacing is set by the pair rather than by the two advance
 * widths, in design pixels closer than the advances alone would put them.
 *
 * Only one pair needs it: both slashes of "//" lean the same way, so the gap
 * between the foot of one and the head of the next reads as a whole space,
 * and urls come out looking split. Everything else is spaced acceptably by
 * its advance width, so there is no kerning table to speak of - if more pairs
 * ever need one this is where it grows.
 */
const kernPairs = [{ left: "/", right: "/", closerByPixels: 3 }] as const;

/**
 * sequences the font replaces with a single glyph. The menu leaders are
 * double-width art that would otherwise have to be written as a private-use
 * character - unreadable in source, and a blank box anywhere the font is
 * missing. Written as ascii pairs they read as what they draw, and ligate
 * into the same one glyph
 */
const ligatures = [
  { sequence: ">>", becomes: menuLeaderFocussedChar },
  { sequence: "^^", becomes: menuLeaderUnfocussedChar },
  { sequence: "<<", becomes: menuLeaderBackChar },
] as const;

// a single custom variation axis: at its peak (1) every glyph is twice as tall
// at the same width, so "double-height" text is a real font variant selected
// with font-variation-settings. Custom (non-registered) tags must be uppercase.
const heightAxis = {
  tag: "HGHT",
  min: 0,
  default: 0,
  max: 1,
  name: "Height",
} as const;

export type GlyphData = {
  unicode: number;
  advanceWidth: number;
  contours: Contour[];
};

/** the glyphs the font is built from, in spritesheet order */
export const fontGlyphs = (): Array<HudGlyph<string>> =>
  hudGlyphs.filter(
    (hudGlyph) =>
      size(hudGlyph.char) === 1 ||
      namedGlyphCodePoints[hudGlyph.char] !== undefined,
  );

export const buildGlyphs = (
  image: DecodedImage,
  contoursFor: (bitmap: boolean[][], char: string) => Contour[],
): GlyphData[] => {
  const glyphs: GlyphData[] = [];
  for (const hudGlyph of hudGlyphs) {
    // only single-codepoint chars become font glyphs (bar namedGlyphCodePoints);
    // this drops the unused EnterFullscreen/ExitFullscreen pseudo-glyphs and the
    // uppercaseCharReplacement strings (eg "QUESTMK"), so duplicated punctuation
    // resolves to the row1 variant
    const contours = () =>
      contoursFor(glyphBitmap(image, hudGlyph.frame), hudGlyph.char);
    if (size(hudGlyph.char) !== 1) {
      const namedCodePoint = namedGlyphCodePoints[hudGlyph.char];
      if (namedCodePoint !== undefined) {
        glyphs.push({
          unicode: namedCodePoint,
          advanceWidth: hudGlyph.advanceWidth * px,
          contours: contours(),
        });
      }
      continue;
    }
    const codePoint = hudGlyph.char.codePointAt(0)!;
    const advanceWidth =
      codePoint === spaceCodePoint ? spaceAdvanceWidth : hudGlyph.advanceWidth;
    glyphs.push({
      unicode: codePoint,
      advanceWidth: advanceWidth * px,
      contours: contours(),
    });
  }

  // em space exists only in the font (not the spritesheet), as an empty glyph with
  // a full-block advance
  glyphs.push({
    unicode: emSpaceCodePoint,
    advanceWidth: emSpaceAdvanceWidth * px,
    contours: [],
  });

  return glyphs;
};

/**
 * everything about the design that determines the font output - glyph outlines,
 * advances, metrics and the axis. Change-detection compares only this, so an
 * unchanged design skips the rebuild and keeps the committed woff2 bytes.
 * everything but the glyph outlines is shared between the base and smooth
 * fonts - identical metrics make the two interchangeable with no layout shift
 */
export const designFor = (
  designGlyphs: GlyphData[],
  /**
   * the family the built font calls itself. The two variants must not share
   * one: installed in an os they would collide, being identical in family and
   * style. On the web the name is irrelevant - each is registered under
   * whatever family the FontFace api is given
   */
  familyName: string,
) => ({
  // bump whenever buildVariableFont.py changes what it emits for the same
  // glyph data, so the rebuild isn't skipped as "unchanged"
  builderVersion: 6,
  familyName,
  unitsPerEm,
  ascender: baselineFromTop * px,
  descender: -descenderPixels * px,
  notdefAdvance: hudCharTextureSize.w * px,
  // font units per design pixel, so the builder can place pixel-exact features
  // (eg the underline) without re-deriving this from unitsPerEm
  unitsPerPixel: px,
  axis: heightAxis,
  kernPairs: kernPairs.map(({ left, right, closerByPixels }) => ({
    left: left.codePointAt(0)!,
    right: right.codePointAt(0)!,
    adjustment: -closerByPixels * px,
  })),
  ligatures: ligatures.map(({ sequence, becomes }) => ({
    sequence: [...sequence].map((char) => char.codePointAt(0)!),
    becomes: becomes.codePointAt(0)!,
  })),
  glyphs: designGlyphs,
});
