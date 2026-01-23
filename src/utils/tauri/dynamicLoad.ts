import { importOnce } from "../importOnce";

export const importTauriOpener = importOnce(
  () => import("@tauri-apps/plugin-opener"),
);

export const importTauriWindow = importOnce(
  () => import("@tauri-apps/api/window"),
);

export const importTauriProcess = importOnce(
  () => import("@tauri-apps/plugin-process"),
);
