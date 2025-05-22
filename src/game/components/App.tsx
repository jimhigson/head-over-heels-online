import { Route, Switch } from "wouter";

import { SpritePage } from "../../pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { useEffect } from "react";
import { useIsUncolourised } from "../../store/selectors.ts";
import { LoadingProvider } from "./LoadingContext.tsx";
import { LevelEditorLoader } from "../../editor/LevelEditorLoader.tsx";
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
    <Switch>
      <Route path="/">
        <CssVariables>
          <InputStateProvider>
            <LoadingProvider>
              <GamePage />
            </LoadingProvider>
          </InputStateProvider>
        </CssVariables>
      </Route>
      <Route path="/sprites">
        <CssVariables scaleFactor={2}>
          <SpritePage />
        </CssVariables>
      </Route>
      <Route path="/editor">
        <CssVariables>
          <LevelEditorLoader />
        </CssVariables>
      </Route>
      <Route>
        <CssVariables>
          <NotFound404PageLazy />
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
