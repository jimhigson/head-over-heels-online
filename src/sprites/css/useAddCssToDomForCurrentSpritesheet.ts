import { useLayoutEffect } from "preact/hooks";

import { type AppSpritesheetData } from "../spritesheet/AppSpritesheet";
import {
  type DrawnSpritesheetData,
  useDrawnSpritesheetData,
} from "../spritesheet/useDrawnSpritesheetData";
import { spriteCssText } from "./spriteCssText";

type SheetCacheEntry = { sheet: CSSStyleSheet; refCount: number };

/**
 * one constructed stylesheet per spritesheet data object - the component
 * mounting the hook can appear several times in the document (popovers, tips,
 * the editor), and each mount shares the same adopted sheet rather than
 * re-generating and re-parsing the css
 */
const sheetCache = new WeakMap<AppSpritesheetData, SheetCacheEntry>();

const addRules = (spritesheetData: AppSpritesheetData): CSSStyleSheet => {
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

const removeRules = (spritesheetData: AppSpritesheetData) => {
  const cacheEntry = sheetCache.get(spritesheetData)!;
  cacheEntry.refCount--;
  if (cacheEntry.refCount === 0) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
      (adopted) => adopted !== cacheEntry.sheet,
    );
  }
};

/**
 * create the .set-spritesheet-vars css rule, so that anything with that class
 * gets the variables for the current spritesheet's art URL and size.
 */
const spritesheetVarsCssText = ({
  meta: { image, size },
}: DrawnSpritesheetData): string =>
  `.set-spritesheet-vars { --spritesheetArtUrl: url('${image}'); --spritesheetW: ${size.w}; --spritesheetH: ${size.h}; }`;

/**
 * Adds all the css the current spritesheet's sprites draw with into the
 * document: the `.texture-*` crop rules, and the image and size variables on
 * `.set-spritesheet-vars`. All come from the one sheet drawn - a smoothed
 * sheet's frames are repacked, so its image and crops are only right together
 */
export const useAddCssToDomForCurrentSpritesheet = (): void => {
  const spritesheetData = useDrawnSpritesheetData();
  const varsCssText = spritesheetVarsCssText(spritesheetData);

  // A layout effect, not an effect: the rules have to be in the document before
  // the sprites needing them are painted, or every sprite flashes as the
  // this-is-a-bug-sprite crop the `.sprite` utility defaults to.
  useLayoutEffect(() => {
    addRules(spritesheetData);
    const varsSheet = new CSSStyleSheet();
    varsSheet.replaceSync(varsCssText);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, varsSheet];
    return () => {
      removeRules(spritesheetData);
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (adopted) => adopted !== varsSheet,
      );
    };
  }, [spritesheetData, varsCssText]);
};
