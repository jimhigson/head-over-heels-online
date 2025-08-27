import type { RegisterSWOptions } from "vite-plugin-pwa/types";

import { StrictMode, Suspense } from "react";

import "./index.css";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import { importAppOnce } from "./game/components/App.import";
import { Dialog } from "./ui/dialog";
import { LoadingBorder } from "./ui/LoadingBorder";
import { importOnceForReactSuspense } from "./utils/importOnce";

const updateSW = registerSW({
  onNeedRefresh() {
    // I don't ask the user, I just jump to the new one whenever the service worker
    // is updated, since the game should be able to handle reloading at any time.
    // This could (and maybe should) be changed to show a dialog instead - it could be
    // jarring for the page to suddenly reload without warning
    updateSW(true);
  },
} satisfies RegisterSWOptions);

const loadApp = importOnceForReactSuspense(async () => {
  const polyfillNeeded =
    !globalThis.Iterator ||
    typeof globalThis.Iterator.prototype.map !== "function";
  if (polyfillNeeded) {
    console.info("loading iterator helper polyfill (needed on this browser)");
    await import("es-iterator-helpers/auto");
    console.info("iterator helper polyfill loaded");
  } else {
    console.info("iterator helper polyfill not needed on this browser");
  }

  return (await importAppOnce()).App;
});

const AppLoader = () => {
  const App = loadApp();
  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <>
          <LoadingBorder />
          <Dialog className="bg-metallicBlueHalfbrite !max-h-[80%] !w-[80%] !h-[unset] aspect-pal" />
        </>
      }
    >
      <AppLoader />
    </Suspense>
  </StrictMode>,
);
