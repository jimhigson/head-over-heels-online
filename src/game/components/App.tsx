import { lazy, Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Provider } from "react-redux";

import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { importLutPage } from "../../pages/LutPage.import.ts";
import { importSpritesPage } from "../../pages/spritesPage/SpritesPage.import.ts";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors.ts";
import { store } from "../../store/store.ts";
import { SpinnerHead } from "../../ui/Spinner.tsx";
import { handleGameBoot } from "../handleGameBoot.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { pixiInputTicker } from "../input/pixiInputTicker.ts";
import { CssVariables } from "./CssVariables.tsx";
import { NotFound404Page } from "./NotFound404Page.tsx";
import { Route } from "./router/Route.tsx";
import { Switch } from "./router/Switch.tsx";
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

  return (
    // css variables needs the store so has to be in AppInner, not App
    <Switch>
      <Route path="/">
        <CssVariables>
          <InputStateProvider ticker={pixiInputTicker}>
            <GamePage />
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
