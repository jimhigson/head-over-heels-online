import { importOnce } from "../importOnce";

/*
 * the PURE annotations let the bundler drop any of these exports that aren't
 * used. In the web build, all the call sites are behind
 * import.meta.env.TAURI_ENV_PLATFORM guards that fold to constants, but
 * without the annotation the unused importOnce() calls look side-effectful so
 * the tauri api would still be pulled into the web bundle
 */

export const importTauriOpener = /*#__PURE__*/ importOnce(
  () => import("@tauri-apps/plugin-opener"),
);

export const importTauriWindow = /*#__PURE__*/ importOnce(
  () => import("@tauri-apps/api/window"),
);

export const importTauriProcess = /*#__PURE__*/ importOnce(
  () => import("@tauri-apps/plugin-process"),
);
