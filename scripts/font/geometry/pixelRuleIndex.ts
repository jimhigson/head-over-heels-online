import { type PixelKey, pixelKey } from "./glyphOverrides";
import {
  type KernelMatch,
  type KernelRule,
  ruleCouldClaim,
} from "./kernelRules";

export type PixelRules = {
  /** rules that took this cell in the outline as it currently stands */
  applied: string[];
  /**
   * rules whose pattern reaches this cell somewhere, whether or not they took
   * it. A rule here is one whose setting at this cell could change the glyph;
   * everywhere else, a setting would be inert
   */
  couldApply: string[];
};

const emptyRules: PixelRules = { applied: [], couldApply: [] };

/**
 * Which rules bear on each cell of a glyph.
 *
 * Worked out for the whole glyph at once rather than a cell at a time: every
 * rule is tried against every position either way, so doing it once and
 * keeping the answer is what lets the editor outline the cells that are worth
 * touching without re-scanning on each hover.
 */
export const pixelRuleIndex = (
  bitmap: boolean[][],
  rules: readonly KernelRule[],
  matches: readonly KernelMatch[],
): Map<PixelKey, PixelRules> => {
  const index = new Map<PixelKey, PixelRules>();
  const at = (x: number, y: number): PixelRules => {
    const key = pixelKey(x, y);
    const existing = index.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const added: PixelRules = { applied: [], couldApply: [] };
    index.set(key, added);
    return added;
  };

  const [firstRow] = bitmap;
  const width = firstRow?.length ?? 0;
  for (const rule of rules) {
    for (let y = 0; y < bitmap.length; y++) {
      for (let x = 0; x < width; x++) {
        if (ruleCouldClaim(bitmap, rule, x, y)) {
          at(x, y).couldApply.push(rule.name);
        }
      }
    }
  }

  for (const { rule, x, y } of matches) {
    const [[anchorX, anchorY]] = rule.activeSite;
    for (const [siteX, siteY] of rule.activeSite) {
      at(x - anchorX + siteX, y - anchorY + siteY).applied.push(rule.name);
    }
  }

  return index;
};

export const rulesAt = (
  index: Map<PixelKey, PixelRules>,
  cell: PixelKey,
): PixelRules => index.get(cell) ?? emptyRules;
