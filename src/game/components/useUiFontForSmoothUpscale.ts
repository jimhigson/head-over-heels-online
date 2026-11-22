import { useEffect, useState } from "preact/hooks";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { errorCaught } from "../../store/slices/errors/errorsSlice";
import { selectSpritesheetSmoothUpscale } from "../../store/slices/smoothing/selectSpritesheetSmoothUpscale";
import { type AppDispatch, persistor } from "../../store/store";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { appTicker } from "../../utils/ticker/appTickerInstance";
import { loadHudFont, uiFontFamilies } from "../render/text/uiFont";

/**
 * css property (on :root) that switches all ui text between the base and
 * smooth fonts - read by the tailwind base font-family
 */
const uiFontProperty = "--ui-font";

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
 * load the ui font for the upscale and switch the ui text to it - or,
 * unsmoothed, go back to the base font
 */
const applyUiFont = async (
  dispatch: AppDispatch,
  spritesheetSmoothUpscale: number,
  signal: AbortSignal,
): Promise<void> => {
  try {
    await loadHudFont(spritesheetSmoothUpscale >= 2 ? "smooth" : "base");
    if (signal.aborted) {
      return;
    }
    if (spritesheetSmoothUpscale > 1) {
      document.documentElement.style.setProperty(
        uiFontProperty,
        `"${uiFontFamilies.smooth}"`,
      );
      // the base font is drawn as whole pixels and wants the hard edges
      // that `body`'s font-smoothing: none gives it. The smoothed one is
      // drawn as curves, so it wants the browser's antialiasing back -
      // the utility layer this class sits in overrides that base rule
      document.body.classList.add("antialiased");
    } else {
      document.documentElement.style.removeProperty(uiFontProperty);
      document.body.classList.remove("antialiased");
    }
  } catch (e) {
    dispatch(
      errorCaught({
        caughtErrors: createSerialisableErrors(
          new Error("could not build smooth ui assets", { cause: e }),
        ),
        openedAt: appTicker.time,
      }),
    );
  }
};

/**
 * Matches the html ui's text to the game's upscale: the smooth font when the
 * sprites are smoothed, the base font otherwise.
 *
 * The font is loaded dynamically - a player boots straight into whichever
 * variant their persisted settings say, fetching only that one.
 */
export const useUiFontForSmoothUpscale = (): void => {
  const rehydrated = usePersistRehydrated();
  // the same number the game engine smooths its sheet at - 1 when the setting is
  // off, and at 1 there is nothing to upscale
  const spritesheetSmoothUpscale = useAppSelector(
    selectSpritesheetSmoothUpscale,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!rehydrated) {
      return;
    }
    const abortController = new AbortController();
    applyUiFont(dispatch, spritesheetSmoothUpscale, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [rehydrated, spritesheetSmoothUpscale, dispatch]);
};
