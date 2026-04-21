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
    window.addEventListener("hashchange", onHashChange);
    const stopListeningToCharacterRoomChange = startAppListening({
      actionCreator: characterRoomChange,
      effect(action) {
        // only update the hash if the current character changed room.
        // ie, not if they pushed the other through a door.
        // otherwise, this hash change gets picked up by us right away
        // and we change to the other room even though the current
        // character isn't even in there, so it does a level select
        // into there
        const currentCharacterChangedRoom =
          action.payload.characterName ===
          gameApi.gameState.currentCharacterName;

        if (currentCharacterChangedRoom) {
          window.location.hash = action.payload.roomId as RoomId;
        }
      },
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      stopListeningToCharacterRoomChange();
    };
  }, [gameApi]);
};
