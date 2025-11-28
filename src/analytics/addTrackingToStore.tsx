import { isAnyOf } from "@reduxjs/toolkit";
import { useEffect } from "react";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { typedURLSearchParams } from "../options/queryParams";
import { startAppListening } from "../store/listenerMiddleware";
import {
  crownCollected,
  errorCaught,
  gameOver,
  gameStarted,
  lostLife,
  reincarnationAccepted,
} from "../store/slices/gameMenus/gameMenusSlice";
import { HookComponent } from "../utils/react/HookComponent";

const isTrackedEvent = isAnyOf(
  gameOver,
  reincarnationAccepted,
  // roomExplored is almost the same as characterRoomChange, but has less information
  //roomExplored,
  lostLife,
  errorCaught,
  gameStarted,
  crownCollected,

  // burning though the umami.is events allowance too quickly so am disabling this:
  //characterRoomChange,
);

const useAddTrackingToStore = () => {
  const maybeGameApi = useMaybeGameApi();

  useEffect(() => {
    const unsub = startAppListening({
      matcher: isTrackedEvent,
      effect(action, { getState }) {
        const gameState = maybeGameApi?.gameState;

        const [, actionNameWithoutSlice] = action.type.split("/");
        const state = getState();

        const gameTimeSeconds =
          gameState ? Math.round(gameState.gameTime / 1000) : undefined;

        const payloadProperties =
          action.payload === undefined ? {}
          : action.type === "gameMenus/crownCollected" ?
            { crownForPlanet: action.payload }
          : action.type === "gameMenus/gameStarted" ? undefined
          : action.type === "gameMenus/lostLife" ?
            {
              position: action.payload.characterLosingLifeItem.state.position,
            }
          : action.payload;

        const eventProperties = {
          gameTimeSeconds,
          // this makes a lot of properties in umami, which are each counted as one event:
          //...state.gameMenus.gameInPlay,
          cheatsOn: state.gameMenus.cheatsOn,
          ...payloadProperties,
          currentCharacter: gameState?.currentCharacterName,
          inRoom: gameState?.characterRooms[gameState.currentCharacterName],
        };

        if (window.umami) {
          console.debug(
            "🍜 umami event:",
            actionNameWithoutSlice,
            eventProperties,
          );
          window.umami.track(actionNameWithoutSlice, eventProperties);
          // didn't load umami - maybe browser is offline
        } else {
          console.debug(
            "🍜 no umami for event:",
            actionNameWithoutSlice,
            eventProperties,
          );
        }
      },
    });

    return unsub;
  }, [maybeGameApi]);
};

const AddTrackingToStoreInner = HookComponent(useAddTrackingToStore);

const isLocalNetwork = () => {
  const { hostname } = window.location;

  // localhost or .local domains
  if (hostname === "localhost" || hostname.endsWith(".local")) {
    return true;
  }

  // loopback addresses (127.x.x.x)
  if (hostname.startsWith("127.")) {
    return true;
  }

  // private network ranges
  // 192.168.x.x
  if (hostname.startsWith("192.168.")) {
    return true;
  }

  // 10.x.x.x
  if (hostname.startsWith("10.")) {
    return true;
  }

  // 172.16.x.x to 172.31.x.x
  if (hostname.startsWith("172.")) {
    const secondOctet = Number.parseInt(hostname.split(".")[1] as string);
    if (secondOctet >= 16 && secondOctet <= 31) {
      return true;
    }
  }

  return false;
};

export const AddTrackingToStore = () => {
  const searchParams = typedURLSearchParams();
  const noTrackParam = searchParams.get("noTrack");

  if (isLocalNetwork() || noTrackParam === "1") {
    return null;
  }

  return <AddTrackingToStoreInner />;
};
