import type { PersistConfig } from "redux-persist/es/types";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import {
  savedGamesPersistKey,
  savedGamesSlice,
  type SavedGamesSliceState,
} from "../slices/savedGames/savedGamesSlice";
import { spritesheetOverrideSlice } from "../slices/spritesheetOverrideSlice";
import {
  userSettingsSlice,
  type UserSettingsState,
} from "../slices/userSettings/userSettingsSlice";

/**
 * Persist version shared across all per-slice persistConfigs. Tracks the
 * upcoming game release version (not the last-released version in
 * package.json) so a developer working on the v(N) release sees v(N) in
 * their local persist data, not v(N-1).
 *
 * Bump manually at the start of each dev cycle. Not managed by
 * release-please because release-please bumps at release time, which would
 * lag development by one version.
 *
 * redux-persist's default `migrate` is the identity function — bumping this
 * integer without adding a `migrate` entry is safe; persisted data passes
 * through unchanged. Add a `createMigrate({ N: ... })` to the relevant
 * persistConfig only when a release actually changes a slice's schema.
 */
export const persistVersion = 23;

const userSettingsPersistConfig: PersistConfig<UserSettingsState> = {
  key: "hohol/userSettings",
  version: persistVersion,
  storage,
  whitelist: ["userSettings"], // assigningInput is transient, not persisted
};
export const userSettingsPersistedReducer = persistReducer(
  userSettingsPersistConfig,
  userSettingsSlice.reducer,
);

const savedGamesPersistConfig: PersistConfig<SavedGamesSliceState> = {
  key: savedGamesPersistKey,
  version: persistVersion,
  storage,
};
export const savedGamesPersistedReducer = persistReducer(
  savedGamesPersistConfig,
  savedGamesSlice.reducer,
);

const spritesheetOverridePersistConfig: PersistConfig<
  ReturnType<typeof spritesheetOverrideSlice.reducer>
> = {
  key: "hohol/spritesheetOverride",
  version: persistVersion,
  storage,
};
export const spritesheetOverridePersistedReducer = persistReducer(
  spritesheetOverridePersistConfig,
  spritesheetOverrideSlice.reducer,
);
