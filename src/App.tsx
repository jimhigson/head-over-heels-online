import { Game } from "./game/Game";
import { RoomSelect } from "./game/levelEdit/RoomSelect";
import { useRef, useState } from "react";
import { GameApi } from "./game/gameMain.tsx";
import { Campaign } from "./modelTypes.ts";
import { Button } from "./components/ui/button.tsx";

export const App = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | undefined>(
    undefined,
  );

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      {gameApi !== undefined && (
        <div className="absolute bottom-2 right-2 flex flex-col">
          <RoomSelect gameApi={gameApi} />
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
      <CampaignGame ref={(api) => setGameApi(api ?? undefined)} />
    </>
  );
};
