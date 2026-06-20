import { useEffect } from "preact/hooks";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "wouter";

import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { importLutPage } from "../../pages/LutPage.import.ts";
import { importSpritesPage } from "../../pages/spritesPage/SpritesPage.import.ts";
import { useAppSelector } from "../../store/hooks.ts";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors.ts";
import { selectGlContextGeneration } from "../../store/slices/glContext/glContextSlice.ts";
import { store } from "../../store/store.ts";
import { SpinnerHead } from "../../ui/Spinner.tsx";
import { handleGameBoot } from "../handleGameBoot.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { pixiInputTicker } from "../input/pixiInputTicker.ts";
import { CssVariables } from "./CssVariables.tsx";
import { NotFound404Page } from "./NotFound404Page.tsx";
import { WantedEditor404 } from "./WantedEditor404.tsx";

const LazyLutPage = lazy(importLutPage);
const LazySpritesPage = lazy(importSpritesPage);

handleGameBoot();

const AppInner = () => {
  const spritesOption = useSpritesOption();
  useEffect(() => {
    // note that this isn't done before the first load, since we don't have the store then!
    document.body.classList.toggle("zx", spritesOption.uncolourised);
    document.body.classList.toggle("colourised", !spritesOption.uncolourised);
  }, [spritesOption]);

  // remount the whole game page when the WebGL context is lost: every
  // gpu-resident resource died with the old context, so the cleanest recovery
  // is to rebuild from a fresh canvas rather than patch the lost textures
  const glContextGeneration = useAppSelector(selectGlContextGeneration);

  return (
    // css variables needs the store so has to be in AppInner, not App
    <Switch>
      <Route path="/">
        <CssVariables>
          <InputStateProvider ticker={pixiInputTicker}>
            <GamePage key={glContextGeneration} />
          </InputStateProvider>
        </CssVariables>
      </Route>
      <Route path="/sprites">
        <Suspense fallback={<SpinnerHead loadingBorder />}>
          <LazySpritesPage />
        </Suspense>
      </Route>
      <Route path="/lut">
        <LazyLutPage />
      </Route>
      <Route path="/editor">
        <CssVariables>
          <WantedEditor404 />
        </CssVariables>
      </Route>
      <Route>
        <CssVariables>
          <NotFound404Page />
        </CssVariables>
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
