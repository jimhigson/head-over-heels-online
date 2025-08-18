import { startAppListening } from "../store/listenerMiddleware";
import { isAnyOf } from "@reduxjs/toolkit";
import {
  crownCollected,
  errorCaught,
  gameOver,
  gameStarted,
  lostLife,
  reincarnationAccepted,
} from "../store/slices/gameMenusSlice";
import { useEffect } from "react";
import { useMaybeGameApi } from "../game/components/GameApiContext";
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

        const globalTimeSeconds =
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
          gameTimeSeconds: globalTimeSeconds,
          ...state.gameMenus.gameInPlay,
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

export const AddTrackingToStore = HookComponent(useAddTrackingToStore);
