import { lazy, Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Provider } from "react-redux";

import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { importLutPage } from "../../pages/LutPage.import.ts";
import { importMapPage } from "../../pages/mapPage/MapPage.import.ts";
import { importSpritesPage } from "../../pages/spritesPage/SpritesPage.import.ts";
import { useAddCssToDomForCurrentSpritesheet } from "../../sprites/css/useAddCssToDomForCurrentSpritesheet";
import { useIsUncolourised } from "../../store/slices/gameMenus/gameMenusSelectors.ts";
import { store } from "../../store/store.ts";
import { SpinnerHead } from "../../ui/Spinner.tsx";
import { handleGameBoot } from "../handleGameBoot.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { CssUpscaleVariables } from "./CssUpscaleVariables";
import { importNotFound404Page } from "./NotFound404Page.import.ts";
import { Route } from "./router/Route.tsx";
import { Switch } from "./router/Switch.tsx";
import { useUiFontForSmoothUpscale } from "./useUiFontForSmoothUpscale.ts";
import { importWantedEditor404 } from "./WantedEditor404.import.ts";

const LazyLutPage = lazy(importLutPage);
const LazyMapPage = lazy(importMapPage);
const LazySpritesPage = lazy(importSpritesPage);
const LazyWantedEditor404 = lazy(importWantedEditor404);
const LazyNotFound404Page = lazy(importNotFound404Page);

// the map page only shows a campaign's map - it starts no game:
if (window.location.pathname !== "/map") {
  handleGameBoot();
}

const AppInner = () => {
  const uncolourised = useIsUncolourised();
  useUiFontForSmoothUpscale();
  useAddCssToDomForCurrentSpritesheet();
  useEffect(() => {
    // note that this isn't done before the first load, since we don't have the store then!
    document.body.classList.toggle("zx", uncolourised);
    document.body.classList.toggle("colourised", !uncolourised);
  }, [uncolourised]);

  return (
    // css variables needs the store so has to be in AppInner, not App
    <Switch>
      <Route path="/">
        <CssUpscaleVariables>
          <InputStateProvider>
            <GamePage />
          </InputStateProvider>
        </CssUpscaleVariables>
      </Route>
      <Route path="/sprites">
        <InputStateProvider>
          <Suspense fallback={<SpinnerHead loadingBorder />}>
            <LazySpritesPage />
          </Suspense>
        </InputStateProvider>
      </Route>
      <Route path="/lut">
        <LazyLutPage />
      </Route>
      <Route path="/map">
        <CssUpscaleVariables>
          <Suspense fallback={<SpinnerHead loadingBorder />}>
            <LazyMapPage />
          </Suspense>
        </CssUpscaleVariables>
      </Route>
      <Route path="/editor">
        <CssUpscaleVariables>
          <Suspense fallback={<SpinnerHead loadingBorder />}>
            <LazyWantedEditor404 />
          </Suspense>
        </CssUpscaleVariables>
      </Route>
      <Route>
        <CssUpscaleVariables>
          <Suspense fallback={<SpinnerHead loadingBorder />}>
            <LazyNotFound404Page />
          </Suspense>
        </CssUpscaleVariables>
      </Route>
    </Switch>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};
