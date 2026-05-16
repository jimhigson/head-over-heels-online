import type { RegisterSWOptions } from "vite-plugin-pwa/types";

import { render } from "preact";

import "./index.css";
import { Suspense } from "react";
import { registerSW } from "virtual:pwa-register";

import { importAppOnce } from "./game/components/App.import";
import { importOnNeedRefreshOnce } from "./onNeedRefresh.import";
import { Dialog } from "./ui/Dialog";
import { LoadingBorder } from "./ui/LoadingBorder";
import { importOnceForReactSuspense } from "./utils/importOnce";

const updateSW = registerSW({
  async onNeedRefresh() {
    (await importOnNeedRefreshOnce()).onNeedRefresh(updateSW);
  },
} satisfies RegisterSWOptions);

if (import.meta.env.TAURI_ENV_PLATFORM) {
  // On macOS, AppKit treats Escape in fullscreen as a request to exit
  // fullscreen. preventDefault on the keydown blocks that without
  // stopping propagation, so the game's own Escape handling still
  // works (opens/closes menus by default).
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    },
    { capture: true },
  );
}

const loadApp = importOnceForReactSuspense(async () => {
  const polyfillNeeded =
    !globalThis.Iterator ||
    typeof globalThis.Iterator.prototype.map !== "function";
  if (polyfillNeeded) {
    console.info("loading iterator helper polyfill (needed on this browser)");
    await import("es-iterator-helpers/auto");
    console.info("iterator helper polyfill loaded");
  } else {
    // iterator helper polyfill not needed on this browser"
  }

  return (await importAppOnce()).App;
});

const AppLoader = () => {
  const App = loadApp();
  return <App />;
};

render(
  <Suspense
    fallback={
      <>
        <LoadingBorder />
        <Dialog className="bg-metallicBlueHalfbrite !max-h-[80%] !w-[80%] !h-[unset] aspect-pal" />
      </>
    }
  >
    <AppLoader />
  </Suspense>,
  document.getElementById("root")!,
);
