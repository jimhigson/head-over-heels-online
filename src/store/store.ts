import type {
  EnhancedStore,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import type { EmptyObject } from "type-fest";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import type {
  LevelEditorSliceAction,
  LevelEditorState,
} from "../editor/slice/levelEditorSlice";
import type {
  StoreActionOf,
  StoreEnhancersOf,
} from "../utils/redux/EnhancedStoreTypeHelpers";

import { emptyObject } from "../utils/empty";
import { listenerMiddleware } from "./listenerMiddleware";
import { levelEditorPersistedReducer } from "./persist/levelEditorPersist";
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
import { gameInPlaySlice } from "./slices/gameInPlay/gameInPlaySlice";
import { registerGameMenusListeners } from "./slices/gameMenus/gameMenusListeners";
import { gameMenusSlice } from "./slices/gameMenus/gameMenusSlice";
import { playMenuSoundsOnStoreChanges } from "./slices/gameMenus/playMenuSoundsOnStoreChanges";
import { githubApiSlice } from "./slices/githubApiSlice";
import { registerSavedGamesListeners } from "./slices/savedGames/savedGamesListeners";
import { savedGamesSlice } from "./slices/savedGames/savedGamesSlice";
import { spritesheetOverrideSlice } from "./slices/spritesheetOverrideSlice";
import { upscaleSlice } from "./slices/upscale/upscaleSlice";
import { userSettingsSlice } from "./slices/userSettings/userSettingsSlice";

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
  ...(import.meta.env.VITE_APP === "editor" ?
    { levelEditor: levelEditorPersistedReducer }
  : (emptyObject as EmptyObject)),
});

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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(campaignsApiSlice.middleware)
      .concat(githubApiSlice.middleware),
});

if (typeof window !== "undefined") {
  window._e2e_store = store;
}

playMenuSoundsOnStoreChanges();
registerSavedGamesListeners();
registerGameMenusListeners();
registerClearAllDataListeners();

export const persistor = persistStore(store);

export type AppStore = typeof store;

export type RootState = Omit<ReturnType<typeof store.getState>, "_persist">;

export type EditorRootState = RootState & {
  levelEditor: LevelEditorState;
};

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

export type EditorAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  EditorRootState,
  unknown,
  UnknownAction
>;

export type EditorAppDispatch = typeof store.dispatch;

export const editorStore = store as EnhancedStore<
  EditorRootState,
  LevelEditorSliceAction | StoreActionOf<typeof store>,
  StoreEnhancersOf<typeof store>
>;

export const useEditorAppSelector = useSelector.withTypes<EditorRootState>();

export const useEditorAppDispatch = useDispatch.withTypes<EditorAppDispatch>();
