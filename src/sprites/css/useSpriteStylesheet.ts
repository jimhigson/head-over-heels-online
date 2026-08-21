import { useLayoutEffect } from "preact/hooks";

import { type AppSpritesheetData } from "../spritesheet/AppSpritesheet";
import { spriteCssText } from "./spriteCssText";

type SheetCacheEntry = { sheet: CSSStyleSheet; refCount: number };

/**
 * one constructed stylesheet per spritesheet data object - the component
 * mounting the hook can appear several times in the document (popovers, tips,
 * the editor), and each mount shares the same adopted sheet rather than
 * re-generating and re-parsing the css
 */
const sheetCache = new WeakMap<AppSpritesheetData, SheetCacheEntry>();

const acquireSheet = (spritesheetData: AppSpritesheetData): CSSStyleSheet => {
  let cacheEntry = sheetCache.get(spritesheetData);
  if (cacheEntry === undefined) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(spriteCssText(spritesheetData));
    cacheEntry = { sheet, refCount: 0 };
    sheetCache.set(spritesheetData, cacheEntry);
  }
  if (cacheEntry.refCount === 0) {
    document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      cacheEntry.sheet,
    ];
  }
  cacheEntry.refCount++;
  return cacheEntry.sheet;
};

const releaseSheet = (spritesheetData: AppSpritesheetData) => {
  const cacheEntry = sheetCache.get(spritesheetData)!;
  cacheEntry.refCount--;
  if (cacheEntry.refCount === 0) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
      (adopted) => adopted !== cacheEntry.sheet,
    );
  }
};

/**
 * Adopts the sprite-crop stylesheet for the given spritesheet into the
 * document, swapping it whenever the selected sprites option changes.
 *
 * A layout effect, not an effect: the rules have to be in the document before
 * the sprites needing them are painted, or every sprite flashes as the
 * this-is-a-bug-sprite crop the `.sprite` utility defaults to.
 */
export const useSpriteStylesheet = (spritesheetData: AppSpritesheetData) => {
  useLayoutEffect(() => {
    acquireSheet(spritesheetData);
    return () => releaseSheet(spritesheetData);
  }, [spritesheetData]);
};
