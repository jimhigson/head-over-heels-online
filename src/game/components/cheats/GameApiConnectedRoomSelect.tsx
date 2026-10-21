import { useMemo } from "preact/hooks";

import { roomHues } from "../../../model/roomHues";
import { RoomSelect } from "../../../ui/RoomSelect";
import { useGameApi } from "../GameApiContext";
import { useCurrentlyViewedRoom } from "./useCurrentlyViewedRoom";

export const GameApiConnectedRoomSelect = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  const viewingRoomId = useCurrentlyViewedRoom<RoomId>();
  const { campaign } = gameApi;
  const campaignRoomHues = useMemo(() => roomHues(campaign.rooms), [campaign]);

  return (
    <RoomSelect<RoomId>
      roomHues={campaignRoomHues}
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
