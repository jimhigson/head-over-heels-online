import { configureStore } from "@reduxjs/toolkit";

import type { GameMenusState } from "./gameMenusSlice";
import { gameMenusSlice } from "./gameMenusSlice";
import { listenerMiddleware } from "./listener";
import storage from "redux-persist/lib/storage";
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
import { addListeners } from "./storeFlow/addListeners";

const gameMenusSlicePersistConfig = {
  key: "hohol/gameMenus/userSettings",
  version: 2,
  migrations: {
    // migrating to v2 - throw out old config - not enough users yet to
    // be worth writing a migration script
    2: () => ({}),
  },
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
    }).prepend(listenerMiddleware.middleware),
});

addListeners();

export const persistor = persistStore(store);

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
