import { Route } from "wouter";

import { SpritePage } from "../../pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "../../pages/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { useEffect } from "react";

const AppInner = () => {
  const revertColours = useAppSelector(
    (state) => !state.userSettings.displaySettings.colourise,
  );
  useEffect(() => {
    document.body.classList.toggle("zx", revertColours);
    document.body.classList.toggle("colourised", !revertColours);
  }, [revertColours]);

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
