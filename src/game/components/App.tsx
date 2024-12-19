import type { Campaign } from "../../model/modelTypes.ts";
import { Route } from "wouter";

import { GameMaybeWithCheatsPage } from "./pages/GameMaybeWithCheatsPage.tsx";
import { SpritePage } from "./pages/SpritePage.tsx";

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  return (
    <>
      <Route path="/">
        <GameMaybeWithCheatsPage campaign={campaign} />
      </Route>
      <Route path="/sprites">
        <SpritePage />
      </Route>
    </>
  );
};
