import { RoomSelect } from "../../../ui/RoomSelect";
import { useGameApi } from "../GameApiContext";
import { useCurrentlyViewedRoom } from "./useCurrentRoom";

export const GameApiConnectedRoomSelect = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  const viewingRoomId = useCurrentlyViewedRoom<RoomId>();

  return (
    <RoomSelect<RoomId>
      campaign={gameApi.campaign}
      headRoomId={gameApi.gameState.characterRooms.head?.id}
      heelsRoomId={gameApi.gameState.characterRooms.heels?.id}
      triggerButtonClassName="w-full"
      onSelect={(roomId) => {
        gameApi.changeRoom(roomId);
      }}
      value={viewingRoomId}
    />
  );
};
