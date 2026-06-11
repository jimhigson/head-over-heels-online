import { render } from "preact";

import "./index.css";
import { Suspense } from "react";

import { importAppOnce } from "./game/components/App.import";
import junkAssetUrl from "./junkAsset.png";
import { Dialog } from "./ui/Dialog";
import { LoadingBorder } from "./ui/LoadingBorder";
import { importOnceForReactSuspense } from "./utils/importOnce";

// deliberate junk to prove the true-site-size action reports startup weight -
// remove before merging
void fetch(junkAssetUrl);

if (!import.meta.env.TAURI_ENV_PLATFORM) {
  import("./registerAppSW");
}

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

const loadApp = importOnceForReactSuspense(
  async () =>
    // no polyfills: iterator helpers (the newest js feature used) are native
    // since safari 18.4, which is also the floor for opus audio decoding
    (await importAppOnce()).App,
);

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
