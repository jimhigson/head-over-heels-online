import persistReducer from "redux-persist/es/persistReducer";
import type { PersistConfig } from "redux-persist/es/types";

import { importSavedGamesMigrations } from "../../persistMigrations/savedGamesMigrations.import";
import { importUserSettingsMigrations } from "../../persistMigrations/userSettingsMigrations.import";
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
import { lazyMigrate } from "./lazyMigrate";
import storage from "./storage";

/**
 * Persist version shared across all per-slice persistConfigs. Tracks the
 * upcoming game release version (not the last-released version in
 * package.json) so a developer working on the v(N) release sees v(N) in
 * their local persist data, not v(N-1).
 *
 * Bump manually the first time the store format changes for a given release.
 *
 * This will not be bumped for version changes inside a release - every non-released
 * version building up to a new release will have the same version, and may break
 * - it only matters if released versions can migrate.
 */
export const persistVersion = 28;

// Migration step 2 of 2: per-slice schema migrations, run by redux-persist
// after rehydration. Step 1 (re-keying the legacy combined blob) runs
// earlier in migrateLegacySavedGames.ts, before the store is created.
const userSettingsPersistConfig: PersistConfig<UserSettingsState> = {
  key: "hohol/userSettings",
  version: persistVersion,
  storage,
  whitelist: ["userSettings"], // assigningInput is transient, not persisted
  migrate: lazyMigrate(importUserSettingsMigrations),
};
export const userSettingsPersistedReducer = persistReducer(
  userSettingsPersistConfig,
  userSettingsSlice.reducer,
);

const savedGamesPersistConfig: PersistConfig<SavedGamesSliceState> = {
  key: savedGamesPersistKey,
  version: persistVersion,
  storage,
  migrate: lazyMigrate(importSavedGamesMigrations),
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
