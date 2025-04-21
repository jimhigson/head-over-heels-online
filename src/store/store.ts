import { configureStore } from "@reduxjs/toolkit";

import type { GameMenusState } from "./slices/gameMenusSlice";
import {
  gameMenusSlice,
  initialGameMenuSliceState,
} from "./slices/gameMenusSlice";
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
import type { OmitDeep } from "type-fest";

/**
 * A non-migration migration - just throws the user's config away and reverts to
 * the original starting state of the store
 */
const revertToInitialStateMigration = (
  state: PersistedState,
): PersistedState => {
  const migrateTo = initialGameMenuSliceState.userSettings;

  console.log(
    "migrating state: persisted is:",
    state,
    "I am not migrating - reverting to initial/default state:",
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
  version: 13,
  migrate: createMigrate(
    {
      1: revertToInitialStateMigration,
      2: revertToInitialStateMigration,
      3: revertToInitialStateMigration,
      4: revertToInitialStateMigration,
      5: revertToInitialStateMigration,
      6: revertToInitialStateMigration,
      7: revertToInitialStateMigration,
      8: revertToInitialStateMigration,
      9: revertToInitialStateMigration,
      10: revertToInitialStateMigration,
      11: revertToInitialStateMigration,
      12: revertToInitialStateMigration,
      13(persistedState: PersistedState) {
        // here we introduced sound settings - simply add them:
        const v12State = persistedState as OmitDeep<
          RootState,
          "gameMenus.userSettings.soundSettings"
        > &
          PersistedState;

        const v13State = structuredClone(persistedState) as RootState &
          PersistedState;

        v13State.gameMenus.userSettings.soundSettings = {};

        console.log(
          "redux-persist migration: migrating state 12->13 by adding `{}` at `gameMenus.userSettings.soundSettings`",
          v12State,
          "->",
          v13State,
        );

        return v13State;
      },
    },
    { debug: true },
  ),
  storage,
  // this really says that userSettings should be its own slice, not tacked onto gameMenus!
  whitelist: [`userSettings`, "currentGame"] satisfies Array<
    keyof GameMenusState
  >,
};

const gameMenusPersistedReducer = persistReducer(
  gameMenusSlicePersistConfig,
  gameMenusSlice.reducer,
);

export const store = configureStore({
  reducer: {
    [gameMenusSlice.reducerPath]: gameMenusPersistedReducer,
  },

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
