import { useEffect, useState } from "react";

import { startAppListening } from "../../../store/listenerMiddleware";
import { characterRoomChange } from "../../../store/slices/gameMenus/gameMenusSlice";
import { useGameApi } from "../GameApiContext";

export const useCurrentlyViewedRoom = <RoomId extends string>():
  | RoomId
  | undefined => {
  const gameApi = useGameApi<RoomId>();

  const [currentRoom, setCurrentRoom] = useState<RoomId | undefined>(
    gameApi?.currentRoom?.id,
  );

  useEffect(() => {
    setCurrentRoom(gameApi.currentRoom?.id);

    const stopListening = startAppListening({
      actionCreator: characterRoomChange,
      effect(action) {
        setCurrentRoom(action.payload.roomId as RoomId);
      },
    });

    return stopListening;
  }, [gameApi]);

  return currentRoom;
};
