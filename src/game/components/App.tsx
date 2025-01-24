import { Route } from "wouter";

import { SpritePage } from "./pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "./pages/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";

const AppInner = () => {
  return (
    <>
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
    </>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};
