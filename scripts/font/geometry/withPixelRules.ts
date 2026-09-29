import {
  type GlyphOverride,
  type PixelKey,
  type PixelRuleSetting,
} from "./glyphOverrides";

/**
 * a character's override with what one cell says about some rules changed. A
 * setting that says nothing - inheriting, with no option chosen - is removed
 * rather than written out, so the file holds only what was decided
 */
export const withPixelRules = (
  override: GlyphOverride | undefined,
  cell: PixelKey,
  ruleNames: readonly string[],
  change: (was: PixelRuleSetting) => PixelRuleSetting,
): GlyphOverride => {
  const forCell = { ...(override?.pixelRules?.[cell] ?? {}) };
  for (const name of ruleNames) {
    const next = change(forCell[name] ?? {});
    if (next.on === undefined && Object.keys(next.options ?? {}).length === 0) {
      delete forCell[name];
    } else {
      forCell[name] = next;
    }
  }
  const pixelRules = { ...(override?.pixelRules ?? {}) };
  if (Object.keys(forCell).length === 0) {
    delete pixelRules[cell];
  } else {
    pixelRules[cell] = forCell;
  }
  return { ...override, pixelRules };
};
