import type { PersistConfig } from "redux-persist/es/types";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import {
  gameMenusSlice,
  type GameMenusState,
} from "../slices/gameMenus/gameMenusSlice";
import { gameMenusSliceMigrate } from "./gameMenusSliceMigrate";
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
  whitelist: gameMenusSliceWhitelist,
};
export const gameMenusPersistedReducer = persistReducer(
  gameMenusSlicePersistConfig,
  gameMenusSlice.reducer,
);
