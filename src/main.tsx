import type { FunctionComponent } from "react";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Border, Dialog } from "./ui/dialog";
import { importAppOnce } from "./game/components/App.import";
import { importOnce } from "./utils/importOnce";

const importEsIteratorPolyfillsOnce = importOnce(
  // TODO: this could be made smaller by only importing the methods we need
  () => import("es-iterator-helpers/auto"),
);

const loadPolyfillIfNeeded = async () => {
  const polyfillNeeded =
    !globalThis.Iterator ||
    typeof globalThis.Iterator.prototype.map !== "function";
  if (polyfillNeeded) {
    console.info("loading iterator helper polyfill (needed on this browser)");
    importEsIteratorPolyfillsOnce();
    console.info("polyfill loaded");
  } else {
    console.info("iterator helper polyfill not needed on this browser");
  }
};

const AppLoader = () => {
  const [App, setApp] = useState<FunctionComponent | null>(null);

  useEffect(() => {
    const load = async () => {
      await loadPolyfillIfNeeded();
      const { App } = await importAppOnce();
      setApp(() => App);
    };
    load();
  }, []);

  return App ?
      <App />
    : <>
        <Border className="loading-border" />
        <Dialog className="bg-metallicBlueHalfbrite !max-h-[80%] !w-[80%] !h-[unset] aspect-pal" />
      </>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLoader />
  </StrictMode>,
);
