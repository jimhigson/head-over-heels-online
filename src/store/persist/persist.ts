import persistReducer from "redux-persist/es/persistReducer";
import type { PersistConfig } from "redux-persist/es/types";
import { gameMenusSliceMigrate } from "./gameMenusSliceMigrate";
import storage from "redux-persist/lib/storage";
import { type GameMenusState, gameMenusSlice } from "../slices/gameMenusSlice";
import { gameMenusSliceWhitelist } from "./gameMenusSliceWhitelist";

export const storeLatestVersion = 17;

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
export const gameMenusPersistedReducer = persistReducer(
  gameMenusSlicePersistConfig,
  gameMenusSlice.reducer,
);
