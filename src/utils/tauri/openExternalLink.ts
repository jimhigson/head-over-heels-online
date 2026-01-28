import { useCallback } from "react";

import { importTauriOpener } from "./dynamicLoad";

/** add to the onclick of an <a> to open in default browser instead from Tauri */
export const openExternal = async (url: string) => {
  if (import.meta.env.TAURI_ENV_PLATFORM) {
    const { openUrl } = await importTauriOpener();
    return openUrl(url);
  } else {
    window.open(url, "_blank");
  }
};

/** hook version of openExternal, for callbacks given to react-land */
export const useOpenExternalCallback = (url: string) => {
  return useCallback(() => {
    openExternal(url);
  }, [url]);
};

/** add to the onclick of an <a> to open in default browser instead from Tauri */
export const linkOpenExternalClickHandler = async (
  e: React.MouseEvent<HTMLAnchorElement>,
) => {
  if (import.meta.env.TAURI_ENV_PLATFORM) {
    e.preventDefault();
    const url = e.currentTarget.href;
    const { openUrl } = await importTauriOpener();
    return openUrl(url);
  }
  // else do nothing - let the <a> that was clicked on
  // handle things normally
};
