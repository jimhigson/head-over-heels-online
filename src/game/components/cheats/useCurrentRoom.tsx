import { useState, useEffect } from "react";
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

    const roomChangeHandler = (roomId: RoomId) => {
      setCurrentRoom(roomId);
    };

    gameApi.events.on("roomChange", roomChangeHandler);
    return () => {
      gameApi.events.off("roomChange", roomChangeHandler);
    };
  }, [gameApi]);

  return currentRoom;
};
