import { Game } from "./game/Game";
import { RoomSelect } from "./game/levelEdit/RoomSelect";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GameApi } from "./game/GameApi.tsx";
import type { Campaign } from "./model/modelTypes.ts";
import { Button } from "./components/ui/button.tsx";
import { Switch } from "./components/ui/switch.tsx";
import { Label } from "./components/ui/label.tsx";
import type {
  RenderOptions,
  ShowBoundingBoxes,
} from "./game/RenderOptions.tsx";
import { isItemType } from "./model/ItemInPlay.ts";

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
    (localStorage.getItem("showBBs") || "none") as ShowBoundingBoxes,
  );

  useEffect(() => {
    localStorage.setItem("showBBs", showBBs);
  }, [showBBs]);

  return [showBBs, setShowBBs];
};

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | undefined>(
    undefined,
  );
  const [showBBs, setShowBBs] = useShowBoundingBoxes();
  useHashSyncedWithRoomId(gameApi);

  const renderOptions = useMemo<RenderOptions<RoomId>>(() => {
    if (gameApi === undefined)
      return {
        showBoundingBoxes: showBBs,
      };

    return {
      showBoundingBoxes: showBBs,
      onItemClick(item) {
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
          "\nitem.positionContainer",
          item.positionContainer,
          "\ncontainer xy",
          `(${item.positionContainer!.x}, ${item.positionContainer!.y})`,
        );
      },
    };
  }, [showBBs, gameApi]);

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      {gameApi !== undefined && (
        <div className="absolute bottom-2 right-2 flex flex-col">
          <RoomSelect gameApi={gameApi} />
          <div className="flex flex-row items-center gap-x-2 justify-center mb-2 mt-2">
            <Switch
              id="airplane-mode"
              checked={showBBs !== "none"}
              onCheckedChange={(checked) =>
                setShowBBs(checked ? "non-wall" : "none")
              }
            />
            <Label htmlFor="airplane-mode">Show BBs</Label>
            <Switch
              id="airplane-mode"
              checked={showBBs === "all"}
              onCheckedChange={(checked) =>
                setShowBBs(checked ? "all" : "non-wall")
              }
            />
            <Label htmlFor="airplane-mode">inc walls</Label>
          </div>
          <Button
            onClick={() => gameApi.changeRoom("blacktooth1head" as RoomId)}
          >
            Start
          </Button>
          <Button onClick={() => gameApi.changeRoom("doorsRoom" as RoomId)}>
            Test room
          </Button>
          <Button onClick={() => gameApi && console.log(gameApi.gameState)}>
            Game state to console
          </Button>
          <Button
            onClick={() =>
              gameApi && console.log(campaign.rooms[gameApi.currentRoom.id])
            }
          >
            Room JSON to console
          </Button>
          <Button onClick={() => gameApi && console.log(gameApi.currentRoom)}>
            Room state to console
          </Button>
          <Button
            onClick={() =>
              gameApi &&
              console.log(
                gameApi.currentRoom.items[
                  gameApi.gameState.currentCharacterName
                ],
              )
            }
          >
            Playable to console
          </Button>
        </div>
      )}
      <CampaignGame
        renderOptions={renderOptions}
        ref={(api) => setGameApi(api ?? undefined)}
      />
    </>
  );
};
