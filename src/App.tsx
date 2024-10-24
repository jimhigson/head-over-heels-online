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
  const [gameApi, setGameApi] = useState<GameApi<RoomId> | null>(null);

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      <div className="absolute top-2 right-2 flex flex-col">
        <RoomSelect gameApi={gameApi ?? undefined} />
        <Button onClick={() => gameApi && console.log(gameApi.currentRoom)}>
          Room JSON to console
        </Button>
      </div>
      <CampaignGame ref={(api) => setGameApi(api)} />
    </>
  );
};
