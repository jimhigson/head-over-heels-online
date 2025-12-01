import { isAnyOf } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { typedURLSearchParams } from "../options/queryParams";
import { startAppListening } from "../store/listenerMiddleware";
import {
  characterRoomChange,
  crownCollected,
  errorCaught,
  gameOver,
  gameStarted,
  lostLife,
  reincarnationAccepted,
} from "../store/slices/gameMenus/gameMenusSlice";
import { isLocalNetwork } from "./isLocalNetwork";

const umamiScriptSrc = "https://cloud.umami.is/script.js";
const umamiWebsiteId = "11813495-5844-44e6-acd4-f81e9c955951";

const shouldTrack = () => {
  const searchParams = typedURLSearchParams();
  const trackParam = searchParams.get("track");

  // if track param is explicit, use it directly; otherwise fall back to hostname detection
  if (trackParam !== null) {
    const track = trackParam === "1";
    if (track) {
      console.log("🍜✅ tracking explicitly enabled via query param");
    } else {
      console.log("🍜❌ tracking explicitly disabled via query param");
    }
    return track;
  }

  const isLocal = isLocalNetwork();
  if (isLocal) {
    console.log("🍜❌ not tracking because running on local network");
  } else {
    console.log("🍜✅ tracking enabled based on non-local network hostname");
  }

  return !isLocal;
};

const isTrackedEvent = isAnyOf(
  gameOver,
  reincarnationAccepted,
  // roomExplored is almost the same as characterRoomChange, but has less information
  //roomExplored,
  lostLife,
  errorCaught,
  gameStarted,
  crownCollected,

  // this burns though the event quota quite quickly - disable if running out:
  characterRoomChange,
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
          // didn't load umami - maybe browser is offline or it didn't load yet
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

const loadUmamiScript = () => {
  // check if already added
  if (document.querySelector(`script[src="${umamiScriptSrc}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = umamiScriptSrc;
  script.dataset.websiteId = umamiWebsiteId;
  script.onload = () => console.log("🍜 umami script dynamically loaded");
  document.head.appendChild(script);
};

const AddTrackingToStoreInner = () => {
  useAddTrackingToStore();
  useEffect(loadUmamiScript, []);
  return null;
};

export const AddTrackingToStore = () => {
  const trackingEnabledRef = useRef<boolean | null>(null);
  if (trackingEnabledRef.current === null) {
    trackingEnabledRef.current = shouldTrack();
  }

  if (trackingEnabledRef.current) {
    return <AddTrackingToStoreInner />;
  }
  return null;
};
