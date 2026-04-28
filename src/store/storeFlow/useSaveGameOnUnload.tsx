import { useEffect } from "react";

import { useMaybeGameApi } from "../../game/components/GameApiContext";
import { saveGameThunk } from "../../game/gameState/saving/saveGameThunk";
import { isInPlaytestMode } from "../../game/isInPlaytestMode";
import { addUnloadListener } from "../../utils/tauri/addUnloadListener";
import { useAppDispatch } from "../hooks";
import { persistor } from "../store";

/**
 * Registers a callback to run before the window closes.
 * In Tauri, prevents window close until callback completes.
 * In browser, runs on beforeunload (best effort, won't wait for async).
 * @returns an unlisten function.
 */
export type ListenForUnload = (
  /** callback to run before unload */
  callback: () => Promise<void>,
) => Promise<() => void>;

export const useSaveGameOnUnload = (): void => {
  const dispatch = useAppDispatch();
  const gameApi = useMaybeGameApi();

  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }
    if (isInPlaytestMode()) {
      // play-test mode never saves
      return;
    }

    const saveAndFlush = async () => {
      dispatch(saveGameThunk(gameApi.gameState));
      await persistor.flush();
    };

    let unloadUnsub: (() => void) | undefined;
    let effectUnmounted: boolean = false;

    const addListeners = async () => {
      unloadUnsub = await addUnloadListener(saveAndFlush);
      if (effectUnmounted) {
        unloadUnsub();
      }
    };

    addListeners();

    return () => {
      unloadUnsub?.();
      effectUnmounted = true;
    };
  }, [gameApi, dispatch]);
};
