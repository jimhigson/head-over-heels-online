import { Game } from "../Game.tsx";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { GameApi } from "../../GameApi.tsx";
import type { Campaign } from "../../../model/modelTypes.ts";
import type { ShowBoundingBoxes } from "../../RenderOptions.tsx";
import type Cheats from "../cheats/Cheats.tsx";

const LazyCheats = lazy(() => import("../cheats/Cheats.tsx")) as typeof Cheats;

const useShowBoundingBoxes = (): [
  ShowBoundingBoxes,
  (showBoundingBoxes: ShowBoundingBoxes) => void,
] => {
  const [showBBs, setShowBBs] = useState<ShowBoundingBoxes>(
    (localStorage.getItem("showBoundingBoxes") || "none") as ShowBoundingBoxes,
  );

  useEffect(() => {
    localStorage.setItem("showBoundingBoxes", showBBs);
  }, [showBBs]);

  return [showBBs, setShowBBs];
};
const useShowShadowMasks = (): [
  boolean,
  (showShadowMasks: boolean) => void,
] => {
  const [showShadowMasks, setShowShadowMasks] = useState<boolean>(
    (localStorage.getItem("showShadowMasks") === "true") as boolean,
  );

  useEffect(() => {
    localStorage.setItem("showShadowMasks", `${showShadowMasks}`);
  }, [showShadowMasks]);

  return [showShadowMasks, setShowShadowMasks];
};

const useCheatsEnabled = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.has("cheats");
};

export const GameMaybeWithCheatsPage = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | undefined>(
    undefined,
  );
  const [showBoundingBoxes, setShowBoundingBoxes] = useShowBoundingBoxes();
  const [showShadowMasks, setShowShadowMask] = useShowShadowMasks();
  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      {useCheatsEnabled() && gameApi !== undefined && (
        <Suspense fallback={null}>
          <LazyCheats
            gameApi={gameApi}
            showBoundingBoxes={showBoundingBoxes}
            setShowBoundingBoxes={setShowBoundingBoxes}
            showShadowMasks={showShadowMasks}
            setShowShadowMasks={setShowShadowMask}
          />
        </Suspense>
      )}
      <CampaignGame ref={(api) => setGameApi(api ?? undefined)} />
    </>
  );
};
