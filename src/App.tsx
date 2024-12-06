import { Game } from "./game/components/Game.tsx";
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
import { isItemType } from "./game/physics/itemPredicates.ts";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { CollapsibleTrigger } from "./components/ui/collapsible.tsx";
import { LucideBug, LucideTestTube } from "lucide-react";
import { changeCharacterRoom } from "./game/gameState/mutators/changeCharacterRoom.ts";
import { currentRoom } from "./game/gameState/GameState.ts";

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
      },
    };
  }, [showBBs, gameApi]);

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      {gameApi !== undefined && (
        <Collapsible>
          <CollapsibleTrigger
            className="absolute bottom-2 right-2 flex flex-col z-3"
            onClick={(e) => e.currentTarget.blur()}
          >
            <LucideBug color="hsl(183, 28%,30%)" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="absolute bottom-10 right-2 flex flex-col">
              <RoomSelect gameApi={gameApi} />
              <div className="flex flex-row items-center gap-x-2 justify-center pb-2 pt-2 bg-black">
                <Switch
                  id="airplane-mode"
                  checked={showBBs !== "none"}
                  onCheckedChange={(checked) =>
                    setShowBBs(checked ? "non-wall" : "none")
                  }
                  onClick={(e) => e.currentTarget.blur()}
                />
                <Label htmlFor="airplane-mode">BBs</Label>
                <Switch
                  id="airplane-mode"
                  checked={showBBs === "all"}
                  onCheckedChange={(checked) =>
                    setShowBBs(checked ? "all" : "non-wall")
                  }
                  onClick={(e) => e.currentTarget.blur()}
                />
                <Label htmlFor="airplane-mode">inc walls</Label>
              </div>
              <div className="flex flex-row items-center">
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    gameApi.changeRoom("blacktooth1head" as RoomId);
                    e.currentTarget.blur();
                  }}
                >
                  Room 1
                </Button>
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    gameApi.changeRoom("laboratory" as RoomId);
                    e.currentTarget.blur();
                  }}
                >
                  <LucideTestTube />
                  To the lab!
                </Button>
              </div>
              <div className="flex flex-row items-center">
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    const roomId = currentRoom(gameApi.gameState).id;
                    gameApi.gameState.currentCharacterName = "heels";
                    changeCharacterRoom({
                      gameState: gameApi.gameState,
                      changeType: "level-select",
                      toRoomId: roomId,
                    });
                    e.currentTarget.blur();
                  }}
                >
                  Add heels
                </Button>
                <Button
                  className="flex-1"
                  onClick={(e) => {
                    gameApi.gameState.characterRooms.heels!.room.items.heels!.state.hasBag =
                      true;
                    e.currentTarget.blur();
                  }}
                >
                  give bag
                </Button>
              </div>

              <Button
                onClick={(e) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).gs = gameApi.gameState;
                  if (gameApi) console.log(gameApi.gameState);
                  e.currentTarget.blur();
                }}
              >
                log(gameState); gs=gameState
              </Button>
              <Button
                onClick={(e) => {
                  if (gameApi)
                    console.log(campaign.rooms[gameApi.currentRoom.id]);
                  e.currentTarget.blur();
                }}
              >
                Room JSON to console
              </Button>
              <Button
                onClick={() => gameApi && console.log(gameApi.currentRoom)}
              >
                Room state to console
              </Button>
              <Button
                onClick={(e) => {
                  if (gameApi)
                    console.log(
                      gameApi.currentRoom.items[
                        gameApi.gameState.currentCharacterName
                      ],
                    );
                  e.currentTarget.blur();
                }}
              >
                Playable to console
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      <CampaignGame
        renderOptions={renderOptions}
        ref={(api) => setGameApi(api ?? undefined)}
      />
    </>
  );
};
