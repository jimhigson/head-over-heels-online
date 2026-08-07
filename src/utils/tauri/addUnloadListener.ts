import { type ListenForUnload } from "../../store/storeFlow/useSaveGameOnUnload";
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
      // pagehide as well as beforeunload: browsers only fire beforeunload for a
      // page the user has interacted with, so a navigation the page itself
      // starts (or one from automation) can unload without it ever running.
      // pagehide has no such condition, and also covers the page being frozen
      // into the back/forward cache rather than torn down
      window.addEventListener("beforeunload", callback);
      window.addEventListener("pagehide", callback);
      return () => {
        window.removeEventListener("beforeunload", callback);
        window.removeEventListener("pagehide", callback);
      };
    };
