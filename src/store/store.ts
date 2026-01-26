import type { UnknownAction, WithSlice } from "@reduxjs/toolkit";

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

import type { LevelEditorSlice } from "../editor/slice/levelEditorSlice";

import { listenerMiddleware } from "./listenerMiddleware";
import { gameMenusPersistedReducer } from "./persist/persist";
import { campaignsApiSlice } from "./slices/campaigns/campaignsApiSlice";
import { gameAssetsLoadingSlice } from "./slices/gameAssetsLoadingSlice";
import {
  debugItemClicked,
  gameMenusSlice,
} from "./slices/gameMenus/gameMenusSlice";
import {
  updateUpscaleWhenDisplaySettingsChange,
  updateUpscaleWhenEmulatedResolutionChanges,
} from "./slices/upscale/updateUpscaleOnStoreChanges";
import { upscaleSlice } from "./slices/upscale/upscaleSlice";

const appReducer = combineSlices({
  [gameMenusSlice.reducerPath]: gameMenusPersistedReducer,
  [upscaleSlice.reducerPath]: upscaleSlice.reducer,
  [campaignsApiSlice.reducerPath]: campaignsApiSlice.reducer,
  [gameAssetsLoadingSlice.reducerPath]: gameAssetsLoadingSlice.reducer,
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
      .concat(campaignsApiSlice.middleware),
});

if (typeof window !== "undefined") {
  window._e2e_store = store;
}

updateUpscaleWhenEmulatedResolutionChanges();
updateUpscaleWhenDisplaySettingsChange();

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
