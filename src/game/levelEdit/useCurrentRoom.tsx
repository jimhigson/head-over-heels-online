import { useState, useEffect } from "react";
import { GameApi } from "../GameApi";

export const useCurrentlyViewedRoom = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
): RoomId | undefined => {
  const [currentRoom, setCurrentRoom] = useState<RoomId | undefined>(
    gameApi?.currentRoom.id,
  );

  useEffect(() => {
    if (gameApi === undefined) return;

    setCurrentRoom(gameApi.currentRoom.id);

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
