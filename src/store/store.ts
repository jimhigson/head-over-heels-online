import { configureStore } from "@reduxjs/toolkit";

import type { GameMenusState } from "./gameMenusSlice";
import { gameMenusSlice, initialGameMenuSliceState } from "./gameMenusSlice";
import storage from "redux-persist/lib/storage";
import type { PersistConfig, PersistedState } from "redux-persist";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  createMigrate,
} from "redux-persist";

/**
 * A non-migration migration - just throws the user's config away and reverts to
 * the original starting state of the store
 */
const revertToOriginalStateMigration = (
  state: PersistedState,
): PersistedState => {
  const migrateTo = initialGameMenuSliceState.userSettings;

  console.log(
    "migrating state: persisted is:",
    state,
    "am reverting to initial/default state:",
    migrateTo,
  );

  // have to hack it to accept this without the _persist key:
  // but docs seem to say it isn't needed. I think redux-persist has its
  // types wrong here.
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  return migrateTo as unknown as PersistedState;
};

const gameMenusSlicePersistConfig: PersistConfig<GameMenusState> = {
  key: "hohol/gameMenus/userSettings",
  version: 10,
  migrate: createMigrate(
    {
      1: revertToOriginalStateMigration,
      2: revertToOriginalStateMigration,
      3: revertToOriginalStateMigration,
      4: revertToOriginalStateMigration,
      5: revertToOriginalStateMigration,
      6: revertToOriginalStateMigration,
      7: revertToOriginalStateMigration,
      8: revertToOriginalStateMigration,
      9: revertToOriginalStateMigration,
      10: revertToOriginalStateMigration,
    },
    { debug: true },
  ),
  storage,
  whitelist: [`userSettings` satisfies keyof GameMenusState],
};

const persistedReducer = persistReducer(
  gameMenusSlicePersistConfig,
  gameMenusSlice.reducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

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
