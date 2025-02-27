import { Route } from "wouter";

import { SpritePage } from "../../pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "../../pages/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { useEffect } from "react";
import { useIsColourised } from "../../store/selectors.ts";

const AppInner = () => {
  const colourised = useIsColourised();
  useEffect(() => {
    document.body.classList.toggle("zx", !colourised);
    document.body.classList.toggle("colourised", colourised);
  }, [colourised]);

  return (
    <CssVariables>
      <Route path="/">
        <InputStateProvider>
          <GamePage />
        </InputStateProvider>
      </Route>
      <Route path="/sprites">
        <CssVariables>
          <SpritePage />
        </CssVariables>
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
