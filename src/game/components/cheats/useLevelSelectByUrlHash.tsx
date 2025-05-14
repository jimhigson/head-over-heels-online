import { useEffect } from "react";
import type { GameApi } from "../../GameApi";
import { startAppListening } from "../../../store/listenerMiddleware";
import { characterRoomChange } from "../../../store/slices/gameMenusSlice";

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
        gameApi.currentRoom?.id !== roomIdFromHash
      )
        gameApi.changeRoom(roomIdFromHash);
    }

    const onHashChange = (e: HashChangeEvent) => {
      const roomIdFromHash = parseUrl(new URL(e.newURL));

      if (
        roomIdFromHash !== undefined &&
        roomIdFromHash !== gameApi.currentRoom?.id
      ) {
        gameApi.changeRoom(roomIdFromHash as RoomId);
      }
    };
    const onRoomChange = (roomId: RoomId) => {
      window.location.hash = roomId;
    };

    window.addEventListener("hashchange", onHashChange);
    const stopListeningToCharacterRoomChange = startAppListening({
      actionCreator: characterRoomChange,
      effect(action) {
        onRoomChange(action.payload.roomId as RoomId);
      },
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      stopListeningToCharacterRoomChange();
    };
  }, [gameApi]);
};
