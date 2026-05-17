import { type PersistPartial } from "redux-persist/es/persistReducer";

import { type CampaignLocator } from "../model/modelTypes";
import { typedURLSearchParams } from "../options/queryParams";
import { startAppListening } from "../store/listenerMiddleware";
import { gameStarted } from "../store/slices/gameInPlay/gameInPlaySlice";
import {
  gameStateLocatorKey,
  savedGameLoadedOnAppLoad,
  savedGamesPersistKey,
  type SavedGamesSliceState,
} from "../store/slices/savedGames/savedGamesSlice";
import { store } from "../store/store";
import { isRehydrateFor } from "../utils/redux/isRehydrateFor";

/**
 * Build a complete CampaignLocator from URL params, or `undefined` if the URL
 * doesn't name a campaign. URL-named campaigns always resolve to "latest"
 * (`version: -1`) — the URL only carries userId + campaignName.
 */
const campaignLocatorFromUrl = (): CampaignLocator | undefined => {
  const params = typedURLSearchParams();
  const userId = params.get("campaignAuthorUserId");
  const campaignName = params.get("campaignName");
  if (userId === null || campaignName === null) {
    return undefined;
  }
  return { userId, campaignName, version: -1 };
};

/**
 * Route the URL + (already-rehydrated) savedGames state into a starting
 * gameInPlay. Two branches:
 *
 *   - URL names a campaign → restore the matching save if one exists,
 *     otherwise start a fresh gameInPlay for that locator.
 *   - No URL params → restore the last-saved campaign, if any.
 *
 * Both branches dispatch `savedGameLoadedOnAppLoad`, which gameInPlay and
 * gameMenus react to via `extraReducers`.
 */
const routeFromSavedGames = (
  savedGames: SavedGamesSliceState | undefined,
): void => {
  const paramCampaignLocator = campaignLocatorFromUrl();

  if (paramCampaignLocator !== undefined) {
    const savedForParam =
      savedGames?.saves[gameStateLocatorKey(paramCampaignLocator)];
    if (savedForParam) {
      store.dispatch(savedGameLoadedOnAppLoad(savedForParam.gameInPlay));
    } else {
      // URL names a campaign but no save for it — start a fresh game
      // through `gameStarted` so the crowns intro is shown, matching
      // the in-menu "play this campaign" flow.
      store.dispatch(gameStarted({ campaignLocator: paramCampaignLocator }));
    }
    return;
  }

  const lastSavedCampaignLocator = savedGames?.lastSavedCampaignLocator;
  const inPlaySave =
    lastSavedCampaignLocator &&
    savedGames.saves[gameStateLocatorKey(lastSavedCampaignLocator)];
  if (inPlaySave) {
    store.dispatch(savedGameLoadedOnAppLoad(inPlaySave.gameInPlay));
  }
};

/**
 * One-shot app-boot routing: decide what game (if any) to start based on
 * the URL and the persisted savedGames slice. Three branches:
 *
 *   1. `data:` URL → playtest session encoded in the URL itself. The
 *      decision is fully URL-driven, so it dispatches `gameStarted`
 *      synchronously without waiting for redux-persist rehydrate.
 *   2. Named-campaign URL or no URL params → routes via
 *      {@link routeFromSavedGames}. If savedGames has already rehydrated
 *      by the time we're called, the routing fires immediately;
 *      otherwise a one-shot REHYDRATE listener does the routing once
 *      rehydrate completes (and unsubscribes itself).
 *
 * The dual immediate-or-subscribe shape means callers don't have to know
 * whether they were imported before or after persistor bootstrap — both
 * orderings produce the same behaviour.
 */
export const handleGameBoot = () => {
  const campaignNameParam = typedURLSearchParams().get("campaignName");

  if (campaignNameParam?.startsWith("data:")) {
    // playtest session — start the game directly, skipping crowns intro
    store.dispatch(
      gameStarted({
        campaignLocator: {
          userId:
            typedURLSearchParams().get("campaignAuthorUserId") ?? "editorUser",
          campaignName: campaignNameParam,
          version: -1,
        },
        noShowCrowns: true,
      }),
    );
    return;
  }

  // redux-persist adds `_persist: { rehydrated }` to each persisted slice
  // at runtime; cast to surface it on the typed state.
  const savedGames = store.getState().savedGames as SavedGamesSliceState &
    PersistPartial;
  if (savedGames._persist?.rehydrated) {
    routeFromSavedGames(savedGames);
    return;
  }

  // saved games not rehydrated yet — wait for it, then use it if applicable
  const unsubscribe = startAppListening({
    matcher: isRehydrateFor<typeof savedGamesPersistKey, SavedGamesSliceState>(
      savedGamesPersistKey,
    ),
    effect(action) {
      // one shot-listener: clean up
      unsubscribe();
      routeFromSavedGames(action.payload);
    },
  });
};
