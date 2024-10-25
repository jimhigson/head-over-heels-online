import { RoomJson } from "@/modelTypes";
import { useState, useEffect } from "react";
import { GameApi } from "../gameMain";
import { PlanetName } from "@/sprites/planets";

export const useCurrentRoom = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
) => {
  const [currentRoom, setCurrentRoom] = useState<
    RoomJson<PlanetName, RoomId> | undefined
  >(gameApi?.currentRoom);

  useEffect(() => {
    if (gameApi === undefined) return;

    setCurrentRoom(gameApi.currentRoom);

    const roomChangeHandler = (room: RoomJson<PlanetName, RoomId>) => {
      setCurrentRoom(room);
    };

    gameApi.events.on("roomChange", roomChangeHandler);
    return () => {
      gameApi.events.off("roomChange", roomChangeHandler);
    };
  }, [gameApi]);

  return currentRoom;
};
