import { Game } from "./Game.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GameApi } from "../GameApi.tsx";
import type { Campaign } from "../../model/modelTypes.ts";
import type { RenderOptions, ShowBoundingBoxes } from "../RenderOptions.tsx";
import { isItemType } from "../physics/itemPredicates.ts";

import { Cheats } from "./Cheats.tsx";

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

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | undefined>(
    undefined,
  );
  const [showBoundingBoxes, setShowBoundingBoxes] = useShowBoundingBoxes();
  const [showShadowMasks, setShowShadowMask] = useShowShadowMasks();

  const renderOptions = useMemo<RenderOptions<RoomId>>(() => {
    if (gameApi === undefined)
      return {
        showBoundingBoxes,
        showShadowMasks,
      };

    return {
      showBoundingBoxes,
      showShadowMasks,
      onItemClick(item, container) {
        if (isItemType("teleporter", "doorFrame")(item)) {
          const { toRoom } = item.config;
          gameApi.changeRoom(toRoom);
        }
        if (item.type === "lift") {
          const toRoom = gameApi.currentRoom.roomAbove;
          if (toRoom) gameApi.changeRoom(toRoom);
        }
        if (item.type === "floor") {
          const toRoom = gameApi.currentRoom.roomBelow;
          if (toRoom) gameApi.changeRoom(toRoom);
        }
        console.log(
          "item (live):",
          item,
          "\nstate (shallow copy):",
          {
            ...item.state,
          },
          "\nposition",
          `(${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
          "\ncontainer:",
          container,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).container = container;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).item = item;
      },
    };
  }, [gameApi, showBoundingBoxes, showShadowMasks]);

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      {useCheatsEnabled() && gameApi !== undefined && (
        <Cheats
          gameApi={gameApi}
          showBoundingBoxes={showBoundingBoxes}
          setShowBoundingBoxes={setShowBoundingBoxes}
          showShadowMasks={showShadowMasks}
          setShowShadowMasks={setShowShadowMask}
        />
      )}
      <CampaignGame
        renderOptions={renderOptions}
        ref={(api) => setGameApi(api ?? undefined)}
      />
    </>
  );
};
