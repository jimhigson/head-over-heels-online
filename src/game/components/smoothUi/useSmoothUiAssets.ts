import { useEffect, useState } from "preact/hooks";

import spritesSheetUrl from "../../../../gfx/sprites.webp";
import toppySheetUrl from "../../../../gfx/spritesToppy.webp";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsSmoothSprites,
  selectSpritesOption,
} from "../../../store/slices/gameMenus/gameMenusSelectors";
import { errorCaught } from "../../../store/slices/gameMenus/gameMenusSlice";
import { selectTotalUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { persistor } from "../../../store/store";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { maxCleanEdgeBakeFactor } from "../../render/filters/cleanEdge/maxCleanEdgeBakeFactor";
import { ensureUiFontLoaded, uiFontFamilies } from "../../render/text/uiFont";
import { bakeCleanEdgeImageBlob } from "./bakeCleanEdgeImageBlob";

/**
 * css property (on :root) that switches all ui text between the base and
 * smooth fonts - read by the tailwind base font-family
 */
const uiFontProperty = "--ui-font";
/**
 * css properties (on :root) that switch the css sprites over to a
 * cleanEdge-upscaled blob of their sheet - read by the .*-spritesheet
 * classes' fallback chains
 */
const smoothSheetProperties = {
  blockStack: "--smooth-spritesheet-blockstack",
  toppy: "--smooth-spritesheet-toppy",
};

type BakedSheet = { factor: number; objectUrl: string };
const bakedSheets = new Map<keyof typeof smoothSheetProperties, BakedSheet>();

const applySheet = async (
  sheet: keyof typeof smoothSheetProperties,
  sourceUrl: string,
  factor: number,
) => {
  const existing = bakedSheets.get(sheet);
  if (existing?.factor !== factor) {
    const blob = await bakeCleanEdgeImageBlob(sourceUrl, factor);
    if (existing !== undefined) {
      URL.revokeObjectURL(existing.objectUrl);
    }
    const objectUrl = URL.createObjectURL(blob);
    bakedSheets.set(sheet, { factor, objectUrl });
  }
  document.documentElement.style.setProperty(
    smoothSheetProperties[sheet],
    `url("${bakedSheets.get(sheet)!.objectUrl}")`,
  );
};

const clearSheets = () => {
  for (const property of Object.values(smoothSheetProperties)) {
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
 * to the cleanEdge-upscaled font, and the css sprites to runtime
 * cleanEdge-upscaled blobs of their sheets. Everything is loaded dynamically -
 * a player boots straight into whichever variant their persisted settings say,
 * fetching only that one.
 */
export const useSmoothUiAssets = () => {
  const rehydrated = usePersistRehydrated();
  const smoothSprites = useAppSelector(selectIsSmoothSprites);
  const spritesOptionName = useAppSelector(selectSpritesOption).name;
  const totalUpscale = useAppSelector(selectTotalUpscale);
  const dispatch = useAppDispatch();

  // the same factor rule as the game engine's bake, from the same upscale -
  // below 2 there is nothing to smooth:
  const bakeFactor = Math.min(
    Math.floor(totalUpscale),
    maxCleanEdgeBakeFactor(),
  );
  const smoothUi = smoothSprites && bakeFactor >= 2;

  useEffect(() => {
    if (!rehydrated) {
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await ensureUiFontLoaded(smoothUi ? "smooth" : "base");
        if (cancelled) {
          return;
        }
        if (smoothUi) {
          document.documentElement.style.setProperty(
            uiFontProperty,
            `"${uiFontFamilies.smooth}"`,
          );
          // the base font is drawn as whole pixels and wants the hard edges
          // that `body`'s font-smoothing: none gives it. The smoothed one is
          // drawn as curves, so it wants the browser's antialiasing back -
          // the utility layer this class sits in overrides that base rule
          document.body.classList.add("antialiased");
          await applySheet("blockStack", spritesSheetUrl, bakeFactor);
          if (cancelled) {
            return;
          }
          if (spritesOptionName === "Toppy") {
            await applySheet("toppy", toppySheetUrl, bakeFactor);
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
  }, [rehydrated, smoothUi, bakeFactor, spritesOptionName, dispatch]);
};
