import type { ListenForUnload } from "../../store/storeFlow/useSaveGameOnUnload";

import { importTauriWindow } from "./dynamicLoad";

/**
 * listen to window being unloaded in either:
 *  * tauri, or;
 *  * browser/pwa
 *
 * @returns the unlisten function
 */
export const addUnloadListener: ListenForUnload =
  import.meta.env.TAURI_ENV_PLATFORM ?
    async (callback) => {
      const { getCurrentWindow } = await importTauriWindow();

      return getCurrentWindow().onCloseRequested(async (event) => {
        event.preventDefault();
        await callback();
        getCurrentWindow().destroy();
      });
    }
  : async (callback) => {
      window.addEventListener("beforeunload", callback);
      return () => window.removeEventListener("beforeunload", callback);
    };
