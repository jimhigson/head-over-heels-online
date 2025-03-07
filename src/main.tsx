import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Dialog } from "./ui/dialog";
import { importAppOnce } from "./game/components/App.import";
import { importOnceForReactSuspense } from "./utils/importOnce";
import { LoadingBorder } from "./ui/LoadingBorder";

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
