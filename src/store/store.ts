import type { ThunkAction, UnknownAction } from "@reduxjs/toolkit";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { listenerMiddleware } from "./listenerMiddleware";
import { migrateLegacySavedGames } from "./persist/migrateLegacySavedGames";
import {
  savedGamesPersistedReducer,
  spritesheetOverridePersistedReducer,
  userSettingsPersistedReducer,
} from "./persist/persist";
import { campaignsApiSlice } from "./slices/campaigns/campaignsApiSlice";
import { registerClearAllDataListeners } from "./slices/clearAllDataListeners";
import { debugSlice } from "./slices/debug/debugSlice";
import { gameAssetsLoadingSlice } from "./slices/gameAssetsLoading/gameAssetsLoadingSlice";
import {
  debugItemClicked,
  gameInPlaySlice,
} from "./slices/gameInPlay/gameInPlaySlice";
import { registerGameMenusListeners } from "./slices/gameMenus/gameMenusListeners";
import { gameMenusSlice } from "./slices/gameMenus/gameMenusSlice";
import { playMenuSoundsOnStoreChanges } from "./slices/gameMenus/playMenuSoundsOnStoreChanges";
import { githubApiSlice } from "./slices/githubApiSlice";
import { registerSavedGamesListeners } from "./slices/savedGames/savedGamesListeners";
import { savedGamesSlice } from "./slices/savedGames/savedGamesSlice";
import { spritesheetOverrideSlice } from "./slices/spritesheetOverrideSlice";
import { updateUpscaleWhenDisplaySettingsChange } from "./slices/upscale/updateUpscaleOnStoreChanges";
import { upscaleSlice } from "./slices/upscale/upscaleSlice";
import { userSettingsSlice } from "./slices/userSettings/userSettingsSlice";

/**
 * Shape of lazy-loaded slices registered with the store.
 *
 * Extended via TypeScript declaration merging from the module that owns each
 * lazy slice — keeps the store decoupled from any particular lazy slice.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LazyLoadedSlices {}

// Run BEFORE building the store so persistReducer's initial read picks up the
// migrated key.
migrateLegacySavedGames();

const appReducer = combineSlices({
  [gameMenusSlice.reducerPath]: gameMenusSlice.reducer,
  [userSettingsSlice.reducerPath]: userSettingsPersistedReducer,
  [gameInPlaySlice.reducerPath]: gameInPlaySlice.reducer,
  [savedGamesSlice.reducerPath]: savedGamesPersistedReducer,
  [upscaleSlice.reducerPath]: upscaleSlice.reducer,
  [campaignsApiSlice.reducerPath]: campaignsApiSlice.reducer,
  [githubApiSlice.reducerPath]: githubApiSlice.reducer,
  [gameAssetsLoadingSlice.reducerPath]: gameAssetsLoadingSlice.reducer,
  [spritesheetOverrideSlice.reducerPath]: spritesheetOverridePersistedReducer,
  [debugSlice.reducerPath]: debugSlice.reducer,
}).withLazyLoadedSlices<LazyLoadedSlices>();

export const injectSlice = appReducer.inject;

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction,
) => {
  // a special reducer that puts the store back to its initial state
  if (action.type === "@@_RESET_FOR_TESTS") {
    return appReducer(undefined, action); // reset state
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // this action has pixi containers in the payload. It is only for debugging and logging those containers:
          debugItemClicked.type,
        ],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(campaignsApiSlice.middleware)
      .concat(githubApiSlice.middleware),
});

if (typeof window !== "undefined") {
  window._e2e_store = store;
}

updateUpscaleWhenDisplaySettingsChange();
playMenuSoundsOnStoreChanges();
registerSavedGamesListeners();
registerGameMenusListeners();
registerClearAllDataListeners();

export const persistor = persistStore(store);

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = Omit<
  ReturnType<typeof store.getState>,
  // inside the app (ie, in selectors etc), we never actually care about this _persist type
  // and keeping it sometimes makes it hard to pass values to selectors
  "_persist"
>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

/**
 * Reusable thunk type — saves writing `ThunkAction<R, RootState, unknown,
 * UnknownAction>` at every callsite. Per Redux docs convention.
 *
 * https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
