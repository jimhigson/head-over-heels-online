import { useEffect, useState } from "preact/hooks";

import spritesSheetUrl from "../../../../gfx/sprites.webp";
import toppySheetUrl from "../../../../gfx/spritesToppy.webp";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectSpritesOption } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { errorCaught } from "../../../store/slices/gameMenus/gameMenusSlice";
import { persistor } from "../../../store/store";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { selectSpritesheetUpscale } from "../../render/filters/upscale/selectSpritesheetUpscale";
import { loadHudFont, uiFontFamilies } from "../../render/text/uiFont";
import { importBakeUpscaledSpritesheetBlobOnce } from "./bakeUpscaledSpritesheetBlobForCss.import";

/**
 * css property (on :root) that switches all ui text between the base and
 * smooth fonts - read by the tailwind base font-family
 */
const uiFontProperty = "--ui-font";
/**
 * css properties (on :root) that switch the css sprites over to a
 * upscaled blob of their sheet - read by the .*-spritesheet
 * classes' fallback chains
 */
const upscaledSheetProperties = {
  blockStack: "--upscaled-spritesheet-blockstack",
  toppy: "--upscaled-spritesheet-toppy",
};

type UpscaledSheet = { factor: number; objectUrl: string };
const upscaledSheets = new Map<
  keyof typeof upscaledSheetProperties,
  UpscaledSheet
>();

const applySheet = async (
  sheet: keyof typeof upscaledSheetProperties,
  sourceUrl: string,
  factor: number,
) => {
  const existing = upscaledSheets.get(sheet);
  if (existing?.factor !== factor) {
    const { bakeUpscaledSpritesheetBlobForCss: bakeUpscaledSpritesheetBlob } =
      await importBakeUpscaledSpritesheetBlobOnce();
    const blob = await bakeUpscaledSpritesheetBlob(sourceUrl, factor);
    if (existing !== undefined) {
      URL.revokeObjectURL(existing.objectUrl);
    }
    const objectUrl = URL.createObjectURL(blob);
    upscaledSheets.set(sheet, { factor, objectUrl });
  }
  document.documentElement.style.setProperty(
    upscaledSheetProperties[sheet],
    `url("${upscaledSheets.get(sheet)!.objectUrl}")`,
  );
};

const clearSheets = () => {
  for (const property of Object.values(upscaledSheetProperties)) {
    document.documentElement.style.removeProperty(property);
  }
};

/**
 * true once redux-persist has rehydrated - the ui font choice can't be made
 * before then without risking fetching both variants (the wrong one first,
 * then the persisted one)
 */
const usePersistRehydrated = (): boolean => {
  const [rehydrated, setRehydrated] = useState(
    persistor.getState().bootstrapped,
  );
  useEffect(
    () =>
      persistor.subscribe(() => {
        if (persistor.getState().bootstrapped) {
          setRehydrated(true);
        }
      }),
    [],
  );
  return rehydrated;
};

/**
 * Reproduces the smooth-sprites effect through the html ui: swaps the ui text
 * to the upscaled font, and the css sprites to runtime
 * upscaled blobs of their sheets.
 *
 * Everything is loaded dynamically -
 * a player boots straight into whichever variant their persisted settings say,
 * fetching only that one.
 */
export const useUpscaledSpritesAndSmoothFontInCss = (): void => {
  const rehydrated = usePersistRehydrated();
  const spritesOptionName = useAppSelector(selectSpritesOption).name;
  // the same number the game engine bakes its sheet at - 1 when the setting is
  // off, and at 1 there is nothing to upscale
  const spritesheetUpscale = useAppSelector(selectSpritesheetUpscale);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!rehydrated) {
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await loadHudFont(spritesheetUpscale >= 2 ? "smooth" : "base");
        if (cancelled) {
          return;
        }
        if (spritesheetUpscale > 1) {
          document.documentElement.style.setProperty(
            uiFontProperty,
            `"${uiFontFamilies.smooth}"`,
          );
          // the base font is drawn as whole pixels and wants the hard edges
          // that `body`'s font-smoothing: none gives it. The smoothed one is
          // drawn as curves, so it wants the browser's antialiasing back -
          // the utility layer this class sits in overrides that base rule
          document.body.classList.add("antialiased");
          await applySheet("blockStack", spritesSheetUrl, spritesheetUpscale);
          if (cancelled) {
            return;
          }
          if (spritesOptionName === "Toppy") {
            await applySheet("toppy", toppySheetUrl, spritesheetUpscale);
          }
          // readiness signal for network-cost measurement (true-site-size)
          performance.mark("smooth-ui-ready");
        } else {
          document.documentElement.style.removeProperty(uiFontProperty);
          document.body.classList.remove("antialiased");
          clearSheets();
        }
      } catch (e) {
        dispatch(
          errorCaught(
            createSerialisableErrors(
              new Error("could not build smooth ui assets", { cause: e }),
            ),
          ),
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [rehydrated, spritesheetUpscale, spritesOptionName, dispatch]);
};
