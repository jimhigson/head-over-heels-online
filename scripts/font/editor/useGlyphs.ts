import { useMemo } from "preact/hooks";

import { fontGlyphs } from "../geometry/fontDesign";
import { type DecodedImage, glyphBitmap } from "../geometry/glyphBitmap";
import { type GlyphOutline, glyphOutline } from "../geometry/glyphOutline";
import { type GlyphOverrides, type PixelKey } from "../geometry/glyphOverrides";
import { kernelRulesForChar } from "../geometry/kernelRules";
import { pixelRuleIndex, type PixelRules } from "../geometry/pixelRuleIndex";
import { type HudGlyph } from "../hudGlyphs";

export type EditorGlyph = {
  char: string;
  frame: HudGlyph<string>["frame"];
  bitmap: boolean[][];
  outline: GlyphOutline;
};

/**
 * which rules bear on which of a character's cells - worked out on demand
 * rather than for every glyph up front, since it is only ever wanted for the
 * one being looked at
 */
export const usePixelRules = (
  glyph: EditorGlyph | undefined,
): Map<PixelKey, PixelRules> =>
  useMemo(
    () =>
      glyph === undefined ?
        new Map()
      : pixelRuleIndex(
          glyph.bitmap,
          kernelRulesForChar(glyph.char),
          glyph.outline.matches,
        ),
    [glyph],
  );

/**
 * every glyph the font is built from, drawn exactly as gen:font would draw it
 * from the same overrides - the editor runs the build's own geometry rather
 * than a preview of its own, so what is on screen is what will be in the woff2
 */
export const useGlyphs = (
  image: DecodedImage | undefined,
  overrides: GlyphOverrides,
): EditorGlyph[] =>
  useMemo(() => {
    if (image === undefined) {
      return [];
    }
    return fontGlyphs().map((hudGlyph) => {
      const bitmap = glyphBitmap(image, hudGlyph.frame);
      return {
        char: hudGlyph.char,
        frame: hudGlyph.frame,
        bitmap,
        outline: glyphOutline(bitmap, hudGlyph.char, overrides[hudGlyph.char]),
      };
    });
  }, [image, overrides]);
