import {
  combineSlices,
  configureStore,
  type EnhancedStore,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import {
  editorRoomPreviewSlice,
  type RoomPreviewSliceState,
} from "../editor/roomPreview/editorRoomPreviewSlice";
import {
  type LevelEditorSliceAction,
  type LevelEditorState,
} from "../editor/slice/levelEditorSlice";
import {
  type StoreActionOf,
  type StoreEnhancersOf,
} from "../utils/redux/EnhancedStoreTypeHelpers";
import { listenerMiddleware } from "./listenerMiddleware";
/**
 * note that levelEditorPersistedReducer should be tree-shaken out if VITE_APP === "editor" since it is not listed
 * as having side-effects - if the editor is brought into the game, this is an error.
 */
import { levelEditorPersistedReducer } from "./persist/levelEditorPersist";
import { migrateLegacySavedGames } from "./persist/migrateLegacySavedGames";
import {
  savedGamesPersistedReducer,
  spritesheetOverridePersistedReducer,
  userSettingsPersistedReducer,
} from "./persist/persist";
import { recentActionsMiddleware } from "./recentActions";
import { assetsLoadingSlice } from "./slices/assetsLoading/assetsLoadingSlice";
import { editorCampaignsApiSlice } from "./slices/campaigns/editorCampaignsApiSlice";
import { gameCampaignsApiSlice } from "./slices/campaigns/gameCampaignsApiSlice";
import { debugSlice } from "./slices/debug/debugSlice";
import { gameInPlaySlice } from "./slices/gameInPlay/gameInPlaySlice";
import { registerGameMenusListeners } from "./slices/gameMenus/gameMenusListeners";
import { gameMenusSlice } from "./slices/gameMenus/gameMenusSlice";
import { playMenuSoundsOnStoreChanges } from "./slices/gameMenus/playMenuSoundsOnStoreChanges";
import { githubApiSlice } from "./slices/githubApiSlice";
import { registerRtkQueryClearAllDataListeners } from "./slices/registerRtkQueryClearAllDataListeners";
import { registerSavedGamesListeners } from "./slices/savedGames/savedGamesListeners";
import { savedGamesSlice } from "./slices/savedGames/savedGamesSlice";
import { spritesheetOverrideSlice } from "./slices/spritesheetOverrideSlice";
import { upscaleSlice } from "./slices/upscale/upscaleSlice";
import { userSettingsSlice } from "./slices/userSettings/userSettingsSlice";

// Run BEFORE building the store so persistReducer's initial read picks up the
// migrated key.
migrateLegacySavedGames();

const appReducer = combineSlices({
  [userSettingsSlice.reducerPath]: userSettingsPersistedReducer,

  [upscaleSlice.reducerPath]: upscaleSlice.reducer,

  [assetsLoadingSlice.reducerPath]: assetsLoadingSlice.reducer,

  ...(import.meta.env.VITE_APP === "editor" ?
    {
      // editor-specific, not loaded into the game:
      levelEditor: levelEditorPersistedReducer,
      [editorRoomPreviewSlice.reducerPath]: editorRoomPreviewSlice.reducer,
      [editorCampaignsApiSlice.reducerPath]: editorCampaignsApiSlice.reducer,
    }
  : {
      // game-specific, not loaded into the editors:
      [githubApiSlice.reducerPath]: githubApiSlice.reducer,
      [spritesheetOverrideSlice.reducerPath]:
        spritesheetOverridePersistedReducer,
      [gameInPlaySlice.reducerPath]: gameInPlaySlice.reducer,
      [savedGamesSlice.reducerPath]: savedGamesPersistedReducer,
      [gameMenusSlice.reducerPath]: gameMenusSlice.reducer,
      [gameCampaignsApiSlice.reducerPath]: gameCampaignsApiSlice.reducer,
      [debugSlice.reducerPath]: debugSlice.reducer,
    }),
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
      .concat(
        import.meta.env.VITE_APP === "editor" ?
          editorCampaignsApiSlice.middleware
        : gameCampaignsApiSlice.middleware,
      )
      .concat(githubApiSlice.middleware)
      .concat(import.meta.env.DEV ? [recentActionsMiddleware] : []),
});

if (
  import.meta.env.MODE === "visual-regression" &&
  typeof window !== "undefined"
) {
  window._e2e_store = store;
}

if (import.meta.env.VITE_APP !== "editor") {
  playMenuSoundsOnStoreChanges();
  registerSavedGamesListeners();
  registerGameMenusListeners();
}
registerRtkQueryClearAllDataListeners();

export const persistor = persistStore(store);

export type AppStore = typeof store;

/** game (not editor) state */
export type GameRootState = Omit<
  ReturnType<typeof store.getState>,
  "_persist" | "editorRoomPreview" | "levelEditor"
>;

/** editor state */
export type EditorRootState = GameRootState & {
  levelEditor: LevelEditorState;
  editorRoomPreview: RoomPreviewSliceState;
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
  GameRootState,
  unknown,
  UnknownAction
>;

export type EditorThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  EditorRootState,
  unknown,
  LevelEditorSliceAction
>;

export const editorStore = store as EnhancedStore<
  EditorRootState,
  LevelEditorSliceAction | StoreActionOf<typeof store>,
  StoreEnhancersOf<typeof store>
>;

export const useEditorAppSelector = useSelector.withTypes<EditorRootState>();
