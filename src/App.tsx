import { Game } from "./game/Game";
import { RoomSelect } from "./game/levelEdit/RoomSelect";
import { useEffect, useRef, useState } from "react";
import { GameApi } from "./game/gameMain.tsx";
import { CampaignRoom, UnknownCampaign } from "./modelTypes.ts";
import { Button } from "./components/ui/button.tsx";

export const App = <C extends UnknownCampaign>({
  campaign,
}: {
  campaign: C;
}) => {
  // this is a local cache of the currentRoom used only to send to the level select - it
  // does not control what is currently being shown in-game
  const [currentRoom, setCurrentRoom] = useState<CampaignRoom<C>>();

  const [gameApi, setGameApi] = useState<GameApi<C> | null>(null);

  useEffect(() => {
    if (gameApi === null) return;

    setCurrentRoom(gameApi.currentRoom);

    const roomChangeHandler = (roomId: CampaignRoom<C>) => {
      setCurrentRoom(roomId);
    };

    gameApi.events.on("roomChange", roomChangeHandler);
    return () => {
      gameApi.events.off("roomChange", roomChangeHandler);
    };
  }, [gameApi]);

  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      <div className="absolute top-2 right-2 flex flex-col">
        <RoomSelect
          room={currentRoom}
          campaign={campaign}
          onRoomSelect={(roomSelected) => {
            gameApi?.goToRoom(roomSelected);
          }}
        />
        <Button
          onClick={() => currentRoom !== undefined && console.log(currentRoom)}
        >
          Room JSON to console
        </Button>
      </div>
      <CampaignGame ref={(api) => setGameApi(api)} />
    </>
  );
};
