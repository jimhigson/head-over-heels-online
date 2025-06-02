import type { UnknownAction, WithSlice } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import type { GameMenusState } from "./slices/gameMenusSlice";
import { gameMenusSlice } from "./slices/gameMenusSlice";
import storage from "redux-persist/lib/storage";
import type { PersistConfig } from "redux-persist";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { gameMenusSliceMigrate } from "./gameMenusSliceMigrate";
import { listenerMiddleware } from "./listenerMiddleware";
import type { LevelEditorSlice } from "../editor/slice/levelEditorSlice";
import { upscaleSlice } from "./slices/upscale/upscaleSlice";
import { listenForUpscaleSlice } from "./slices/upscale/listenForUpscaleSlice";

export const storeLatestVersion = 14;

export const gameMenusSliceWhitelist = [
  `userSettings`,
  "currentGame",
] as const satisfies Array<keyof GameMenusState>;

export type GameMenusSlicePersisted = Pick<
  GameMenusState,
  (typeof gameMenusSliceWhitelist)[number]
>;

const gameMenusSlicePersistConfig: PersistConfig<GameMenusState> = {
  key: "hohol/gameMenus/userSettings",
  version: storeLatestVersion,
  migrate: gameMenusSliceMigrate,
  storage,
  // this really says that userSettings should be its own slice, not tacked onto gameMenus!
  whitelist: gameMenusSliceWhitelist,
};

const gameMenusPersistedReducer = persistReducer(
  gameMenusSlicePersistConfig,
  gameMenusSlice.reducer,
);

const appReducer = combineSlices({
  [gameMenusSlice.reducerPath]: gameMenusPersistedReducer,
  [upscaleSlice.reducerPath]: upscaleSlice.reducer,
}).withLazyLoadedSlices<
  // pre-empting the lazy-loaded slices for the types only (no run-time importing)
  // because it is easier. This could also be done via module augmentation in typescript
  WithSlice<LevelEditorSlice>
>();

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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

listenForUpscaleSlice();

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
