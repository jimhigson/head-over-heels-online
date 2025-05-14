import { Route } from "wouter";

import { SpritePage } from "../../pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { useEffect } from "react";
import { useIsUncolourised } from "../../store/selectors.ts";
import { LoadingProvider } from "./LoadingContext.tsx";
import { NotFound404PageLazy } from "./NotFound404Page.lazy.tsx";

const AppInner = () => {
  const uncolourised = useIsUncolourised();
  useEffect(() => {
    // note that this isn't done before the first load, since we don't have the store then!
    document.body.classList.toggle("zx", uncolourised);
    document.body.classList.toggle("colourised", !uncolourised);
  }, [uncolourised]);

  return (
    // css variables needs the store so has to be in AppInner, not App
    <CssVariables>
      <Route path="/">
        <InputStateProvider>
          <LoadingProvider>
            <GamePage />
          </LoadingProvider>
        </InputStateProvider>
      </Route>
      <Route path="/sprites">
        <SpritePage />
      </Route>
      <Route>
        <NotFound404PageLazy />
      </Route>
    </CssVariables>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};
