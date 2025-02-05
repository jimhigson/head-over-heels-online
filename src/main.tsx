import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { importOnce } from "./utils/importOnce";
import "./index.css";

const importEsIteratorPolyfills = importOnce(
  // TODO: this could be made smaller by only importing the methods we need
  () => import("es-iterator-helpers/auto"),
);
const importApp = importOnce(() => import("./game/components/App"));

//import "es-iterator-helpers/auto"; // auto = shim all of the methods
//import { App } from "./game/components/App";

const loadPolyfillIfNeeded = async () => {
  const polyfillNeeded =
    !globalThis.Iterator ||
    typeof globalThis.Iterator.prototype.map !== "function";
  if (polyfillNeeded) {
    console.info("loading iterator helper polyfill (needed on this browser)");
    importEsIteratorPolyfills();
    console.info("polyfill loaded");
  } else {
    console.info("iterator helper polyfill not needed on this browser");
  }
};

loadPolyfillIfNeeded().then(() => {
  // can only load the app once the polyfill is loaded (if it is needed)
  importApp().then(({ App }) => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
});
