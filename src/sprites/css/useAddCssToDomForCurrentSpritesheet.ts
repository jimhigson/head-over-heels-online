import { useLayoutEffect, useMemo, useRef } from "preact/hooks";

import { useAppSelector } from "../../store/hooks";
import { selectSpritesheetName } from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  type DrawnSpritesheetData,
  useDrawnSpritesheetData,
} from "../spritesheet/useDrawnSpritesheetData";
import { spriteCssText } from "./spriteCssText";

/**
 * create the :root css rule, so that everything in the document gets the
 * variables for the current spritesheet's art URL and size.
 */
const spritesheetVarsCssText = ({
  meta: { image, size },
}: DrawnSpritesheetData): string =>
  `:root { --spritesheetArtUrl: url('${image}'); --spritesheetW: ${size.w}; --spritesheetH: ${size.h}; }`;

/**
 * Adds all the css the current spritesheet's sprites draw with into the
 * document: the `.texture-*` crop rules, and the image and size variables on
 * `:root`. All come from the one sheet drawn - a smoothed sheet's frames are
 * repacked, so its image and crops are only right together.
 *
 * Also marks `<body>` with `toppy-spritesheet` while the toppy sheet is
 * drawn, for tailwind's `toppy:` variants.
 *
 * Call once for the whole page, from its root: the stylesheet is adopted by
 * the document, so it reaches every element, portals and other preact roots
 * included.
 */
export const useAddCssToDomForCurrentSpritesheet = (): void => {
  const spritesheetData = useDrawnSpritesheetData();
  const isToppy = useAppSelector(selectSpritesheetName) === "toppy";
  const cssText = useMemo(
    () =>
      `${spriteCssText(spritesheetData)}\n${spritesheetVarsCssText(spritesheetData)}`,
    [spritesheetData],
  );
  const adoptedSheetForDynamicSpriteRules = useRef<CSSStyleSheet | undefined>(
    undefined,
  );

  // Layout effects, not effects: the rules have to be in the document before
  // the sprites needing them are painted, or every sprite flashes as the
  // this-is-a-bug-sprite crop the `.sprite` utility defaults to.
  useLayoutEffect(() => {
    const sheet = new CSSStyleSheet();
    adoptedSheetForDynamicSpriteRules.current = sheet;
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    return () => {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (adopted) => adopted !== sheet,
      );
      adoptedSheetForDynamicSpriteRules.current = undefined;
    };
  }, []);

  useLayoutEffect(() => {
    adoptedSheetForDynamicSpriteRules.current!.replaceSync(cssText);
  }, [cssText]);

  useLayoutEffect(() => {
    document.body.classList.toggle("toppy-spritesheet", isToppy);
    return () => {
      document.body.classList.remove("toppy-spritesheet");
    };
  }, [isToppy]);
};
