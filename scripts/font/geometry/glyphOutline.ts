import { type Contour } from "./fontUnits";
import {
  artHashOf,
  type GlyphOverride,
  type GlyphOverrides,
} from "./glyphOverrides";
import { type KernelMatch } from "./kernelRules";
import { ruleSettingsFor } from "./ruleEnablement";
import { smoothGlyphContours } from "./smoothGlyphContours";
import { vectorGlyphContours } from "./vectorGlyphContours";

export type GlyphOutline = {
  contours: Contour[];
  /** which kernel rules fired - empty for a hand-drawn outline */
  matches: KernelMatch[];
  drawnBy: "kernel" | "vector";
  /**
   * set when a hand-drawn outline was authored over different pixel art than
   * the sheet now holds, so the outline is stale rather than wrong
   */
  staleAgainstArt: boolean;
};

export const glyphOutline = (
  bitmap: boolean[][],
  char: string,
  override: GlyphOverride | undefined,
): GlyphOutline => {
  const shapes = override?.shapes;
  if (override?.vectorMode === true && shapes !== undefined) {
    return {
      contours: vectorGlyphContours(shapes),
      matches: [],
      drawnBy: "vector",
      staleAgainstArt:
        override.artHash !== undefined &&
        override.artHash !== artHashOf(bitmap),
    };
  }
  const { contours, matches } = smoothGlyphContours(
    bitmap,
    char,
    ruleSettingsFor(override),
  );
  return { contours, matches, drawnBy: "kernel", staleAgainstArt: false };
};

export const outlineContoursFor =
  (overrides: GlyphOverrides) =>
  (bitmap: boolean[][], char: string): Contour[] =>
    glyphOutline(bitmap, char, overrides[char]).contours;
