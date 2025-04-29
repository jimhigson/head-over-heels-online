import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Dialog } from "./ui/dialog";
import { importAppOnce } from "./game/components/App.import";
import { importOnceForReactSuspense } from "./utils/importOnce";
import { LoadingBorder } from "./ui/LoadingBorder";

import type { RegisterSWOptions } from "vite-plugin-pwa/types";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    // I don't ask the user, I just do it whenever the service worker
    // is updated, since the game should be able to handle reloading at
    // any time.
    // This could be changed to show a dialog instead
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
