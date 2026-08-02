import { isAnyOf } from "@reduxjs/toolkit";
import { useEffect, useRef } from "preact/hooks";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { typedURLSearchParams } from "../options/queryParams";
import { startAppListening } from "../store/listenerMiddleware";
import {
  crownCollected,
  gameOver,
  gameStarted,
  lostAllLives,
  lostLife,
  reincarnationAccepted,
  roomExplored,
} from "../store/slices/gameInPlay/gameInPlaySlice";
import { errorCaught } from "../store/slices/gameMenus/gameMenusSlice";
import { entries } from "../utils/entries";
import { type Xyz } from "../utils/vectors/vectors";
import { isLocalNetwork } from "./isLocalNetwork";

const umamiScriptSrc = "https://cloud.umami.is/script.js";
const umamiWebsiteId = "11813495-5844-44e6-acd4-f81e9c955951";

type EventPropertyValue = boolean | number | string;

const isScalarEventProperty = (value: unknown): value is EventPropertyValue =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean";

/**
 * Umami stores each event-data property as its own record, flattening nested
 * objects and arrays into many properties - each of which counts towards the
 * event quota. Keeping only scalar values means no fat object (a whole
 * RoomState, an array of errors with stack traces) can accidentally blow
 * through the quota, however the tracked action payloads change in future.
 * Absent (undefined) values are dropped too.
 */
const scalarEventProperties = (
  properties: Record<string, unknown>,
): Record<string, EventPropertyValue> => {
  const scalars: Record<string, EventPropertyValue> = {};
  for (const [key, value] of entries(properties)) {
    if (isScalarEventProperty(value)) {
      scalars[key] = value;
    }
  }
  return scalars;
};

const positionToString = ({ x, y, z }: Xyz): string =>
  `${Math.round(x)},${Math.round(y)},${Math.round(z)}`;

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
  lostAllLives,
  reincarnationAccepted,
  lostLife,
  errorCaught,
  gameStarted,
  crownCollected,

  // only fires the first time a room is entered this game, via getOriginalState dedup below:
  roomExplored,
);

const useAddTrackingToStore = () => {
  const maybeGameApi = useMaybeGameApi();

  useEffect(() => {
    const unsub = startAppListening({
      matcher: isTrackedEvent,
      effect(action, { getOriginalState }) {
        if (
          roomExplored.match(action) &&
          getOriginalState().gameInPlay.gameInPlay.roomsExplored[action.payload]
        ) {
          // already explored earlier this game - don't re-track re-entering a room
          return;
        }

        const gameState = maybeGameApi?.gameState;

        const [, actionNameWithoutSlice] = action.type.split("/");

        const gameTimeSeconds =
          gameState ? Math.round(gameState.gameTime / 1_000) : undefined;

        const [firstError] = errorCaught.match(action) ? action.payload : [];

        const payloadProperties =
          crownCollected.match(action) ? { crownForPlanet: action.payload }
          : lostLife.match(action) ?
            {
              position: positionToString(
                action.payload.characterLosingLifeItem.state.box,
              ),
            }
          : errorCaught.match(action) ? { errorMessage: firstError?.message }
          : roomExplored.match(action) ? { roomId: action.payload }
          : gameStarted.match(action) ? undefined
          : action.payload;

        const eventProperties = scalarEventProperties({
          gameTimeSeconds,
          ...(typeof payloadProperties === "object" ? payloadProperties : {}),
          inRoom:
            roomExplored.match(action) ? undefined : (
              gameState?.characterRooms[gameState.currentCharacterName]?.id
            ),
        });

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

const AddAnalyticsToStoreInner = () => {
  useAddTrackingToStore();
  useEffect(loadUmamiScript, []);
  return null;
};

export const AddAnalyticsToStore = () => {
  const trackingEnabledRef = useRef<boolean | null>(null);
  if (trackingEnabledRef.current === null) {
    trackingEnabledRef.current = shouldTrack();
  }

  if (trackingEnabledRef.current) {
    return <AddAnalyticsToStoreInner />;
  }
  return null;
};
