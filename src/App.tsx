import { Game } from "./game/Game";
import { RoomSelect } from "./game/levelEdit/RoomSelect";
import { useMemo, useRef, useState } from "react";
import { GameApi } from "./game/gameMain.tsx";
import { Campaign } from "./model/modelTypes.ts";
import { Button } from "./components/ui/button.tsx";
import { Switch } from "./components/ui/switch.tsx";
import { Label } from "./components/ui/label.tsx";
import { RenderOptions } from "./game/RenderOptions.tsx";
import { itemZIndex } from "./game/render/projectToScreen.tsx";

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | undefined>(
    undefined,
  );
  const [showBBs, setShowBBs] = useState<boolean>(false);

  const renderOptions = useMemo<RenderOptions<RoomId>>(() => {
    if (gameApi === undefined)
      return {
        showBoundingBoxes: showBBs,
      };

    return {
      showBoundingBoxes: showBBs,
      onItemClick(item) {
        if (
          item.type === "doorFar" ||
          item.type === "doorNear" ||
          item.type === "teleporter"
        ) {
          const toRoom = item.config.toRoom;
          gameApi.viewRoom(toRoom);
        }
        if (item.type === "lift") {
          const toRoom = gameApi.viewingRoom.roomAbove;
          if (toRoom) gameApi.viewRoom(toRoom);
        }
        if (item.type === "floor") {
          const toRoom = gameApi.viewingRoom.roomBelow;
          if (toRoom) gameApi.viewRoom(toRoom);
        }
        console.log(item, "zIndex:", itemZIndex(item));
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
              checked={showBBs}
              onCheckedChange={(checked) => setShowBBs(checked)}
            />
            <Label htmlFor="airplane-mode">Show BBs</Label>
          </div>
          <Button onClick={() => gameApi.viewRoom("blacktooth1head" as RoomId)}>
            Start
          </Button>
          <Button onClick={() => gameApi.viewRoom("doorsRoom" as RoomId)}>
            Test room
          </Button>
          <Button
            onClick={() =>
              gameApi && console.log(campaign.rooms[gameApi.viewingRoom.id])
            }
          >
            Room JSON to console
          </Button>
          <Button onClick={() => gameApi && console.log(gameApi.viewingRoom)}>
            Room state to console
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
