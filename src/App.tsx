import { Game } from "./game/components/Game.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GameApi } from "./game/GameApi.tsx";
import type { Campaign } from "./model/modelTypes.ts";
import type {
  RenderOptions,
  ShowBoundingBoxes,
} from "./game/RenderOptions.tsx";
import { isItemType } from "./game/physics/itemPredicates.ts";

import { Cheats } from "./game/components/Cheats.tsx";

const useHashSyncedWithRoomId = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
): void => {
  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    const parseUrl = (url: Pick<URL, "hash">) => {
      const maybeRoomId = url.hash.substring(1);
      if (maybeRoomId === "") return undefined;
      if (gameApi.campaign.rooms[maybeRoomId as RoomId] === undefined)
        return undefined;
      return url.hash.substring(1) as RoomId;
    };

    if (window.location.hash) {
      const roomIdFromHash = parseUrl(window.location);

      if (
        roomIdFromHash !== undefined &&
        gameApi.currentRoom.id !== roomIdFromHash
      )
        gameApi.changeRoom(roomIdFromHash);
    }

    const onHashChange = (e: HashChangeEvent) => {
      const roomIdFromHash = parseUrl(new URL(e.newURL));

      if (
        roomIdFromHash !== undefined &&
        roomIdFromHash !== gameApi.currentRoom.id
      ) {
        gameApi.changeRoom(roomIdFromHash as RoomId);
      }
    };
    const onRoomChange = (roomId: RoomId) => {
      window.location.hash = roomId;
    };

    window.addEventListener("hashchange", onHashChange);
    gameApi.events.on("roomChange", onRoomChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      gameApi.events.off("roomChange", onRoomChange);
    };
  }, [gameApi]);
};

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
  useHashSyncedWithRoomId(gameApi);

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
      {gameApi !== undefined && (
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
