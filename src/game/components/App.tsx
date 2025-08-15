import { Route, Switch } from "wouter";

import { SpritePage } from "../../pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { CssVariables } from "./CssVariables.tsx";
import { GamePage } from "../../pages/gamePage/GamePage.tsx";
import { store } from "../../store/store.ts";
import { InputStateProvider } from "../input/InputStateProvider.tsx";
import { useEffect } from "react";
import { useIsUncolourised } from "../../store/selectors.ts";
import { WantedEditor404 } from "./WantedEditor404.tsx";
import { NotFound404Page } from "./NotFound404Page.tsx";
import { gameStarted } from "../../store/slices/gameMenusSlice.ts";
import { typedURLSearchParams } from "../../options/queryParams.ts";

const searchParams = typedURLSearchParams();
const campaignName = searchParams.get("campaignName");
// one-off reading of query params
// if the campaignName starts with "data:" this is a playtest session from the editor
// so start the game directly:
// if it has non-data campaignName and campaignAuthorUserId, that's a db level that was shared
if (campaignName !== null) {
  store.dispatch(
    gameStarted({
      campaignLocator: {
        userId: searchParams.get("campaignAuthorUserId") || "editorUser",
        campaignName,
        version: -1,
      },
      // skip the crowns for playtesting
      noShowCrowns: true,
    }),
  );
}

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
            <GamePage />
          </InputStateProvider>
        </CssVariables>
      </Route>
      <Route path="/sprites">
        <SpritePage />
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
