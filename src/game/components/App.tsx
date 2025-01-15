import type { Campaign } from "../../model/modelTypes.ts";
import { Route } from "wouter";

import { GameMaybeWithCheatsPage } from "./pages/GameMaybeWithCheatsPage.tsx";
import { SpritePage } from "./pages/SpritePage.tsx";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  return (
    <Provider store={store}>
      <Route path="/">
        <GameMaybeWithCheatsPage campaign={campaign} />
      </Route>
      <Route path="/sprites">
        <SpritePage />
      </Route>
    </Provider>
  );
};
