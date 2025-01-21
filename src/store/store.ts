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

const gameMenusSlicePersistConfig = {
  key: "hohol/gameMenus/userSettings",
  version: 1,
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

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
