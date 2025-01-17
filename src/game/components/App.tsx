import { Route } from "wouter";

import { SpritePage } from "./pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "./pages/GamePage.tsx";

const AppInner = () => {
  return (
    <>
      <Route path="/">
        <GamePage />
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
