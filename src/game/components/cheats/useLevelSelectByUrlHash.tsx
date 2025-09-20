import { useEffect } from "react";

import type { GameApi } from "../../GameApi";

import { startAppListening } from "../../../store/listenerMiddleware";
import { characterRoomChange } from "../../../store/slices/gameMenus/gameMenusSlice";
import { cheatRoomIdFromUrlHash } from "./cheatRoomIdFromUrlHash";

export const useLevelSelectByUrlHash = <RoomId extends string>(
  gameApi: GameApi<RoomId> | undefined,
): void => {
  useEffect(() => {
    if (gameApi === undefined) {
      return;
    }

    const onHashChange = (e: HashChangeEvent) => {
      const roomIdFromHash = cheatRoomIdFromUrlHash(gameApi.campaign, e.newURL);

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
