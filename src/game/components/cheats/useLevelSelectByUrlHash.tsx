import { useEffect } from "react";
import type { GameApi } from "../../GameApi";

export const useLevelSelectByUrlHash = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
): void => {
  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    const parseUrl = (url: Pick<URL, "hash">) => {
      const maybeRoomId = url.hash.substring(1);
      if (maybeRoomId === "") return undefined;
      if (gameApi.campaign.rooms[maybeRoomId as RoomId] === undefined)
        return undefined;
      return url.hash.substring(1) as RoomId;
    };

    if (window.location.hash) {
      const roomIdFromHash = parseUrl(window.location);

      if (
        roomIdFromHash !== undefined &&
        gameApi.currentRoom.id !== roomIdFromHash
      )
        gameApi.changeRoom(roomIdFromHash);
    }

    const onHashChange = (e: HashChangeEvent) => {
      const roomIdFromHash = parseUrl(new URL(e.newURL));

      if (
        roomIdFromHash !== undefined &&
        roomIdFromHash !== gameApi.currentRoom.id
      ) {
        gameApi.changeRoom(roomIdFromHash as RoomId);
      }
    };
    const onRoomChange = (roomId: RoomId) => {
      window.location.hash = roomId;
    };

    window.addEventListener("hashchange", onHashChange);
    gameApi.events.on("roomChange", onRoomChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      gameApi.events.off("roomChange", onRoomChange);
    };
  }, [gameApi]);
};
