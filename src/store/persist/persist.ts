import { createMigrate } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { type PersistConfig } from "redux-persist/es/types";

import {
  savedGamesPersistKey,
  savedGamesSlice,
  type SavedGamesSliceState,
} from "../slices/savedGames/savedGamesSlice";
import { spritesheetOverrideSlice } from "../slices/spritesheetOverrideSlice";
import {
  type PokesEnabled,
  userSettingsSlice,
  type UserSettingsState,
} from "../slices/userSettings/userSettingsSlice";
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
export const persistVersion = 23;

// Migration step 2 of 2: per-slice schema migrations, run by redux-persist
// after rehydration. Step 1 (re-keying the legacy combined blob) runs
// earlier in migrateLegacySavedGames.ts, before the store is created.
const userSettingsMigrations = createMigrate({
  // v23: move poke fields into pokesEnabled and rename
  23(state) {
    if (!state) {
      return state;
    }
    const { userSettings, ...otherSliceState } = state as Record<
      string,
      unknown
    >;
    const us = userSettings as Record<string, unknown> | undefined;
    if (!us) {
      return state;
    }
    // old names:
    const { infiniteLivesPoke, infiniteDoughnutsPoke, ...usRest } = us;
    return {
      ...otherSliceState,
      userSettings: {
        ...usRest,
        pokesEnabled: {
          // new names:
          infiniteLives: infiniteLivesPoke as boolean,
          infiniteDoughnuts: infiniteDoughnutsPoke as boolean,
        } satisfies PokesEnabled,
      },
    } as unknown as typeof state;
  },
});

const userSettingsPersistConfig: PersistConfig<UserSettingsState> = {
  key: "hohol/userSettings",
  version: persistVersion,
  storage,
  whitelist: ["userSettings"], // assigningInput is transient, not persisted
  migrate: userSettingsMigrations,
};
export const userSettingsPersistedReducer = persistReducer(
  userSettingsPersistConfig,
  userSettingsSlice.reducer,
);

const savedGamesMigrations = createMigrate({
  // v23: lift gameInPlay snapshot to root of each save, migrating the legacy
  // store.gameMenus.gameInPlay / store.gameInPlay.gameInPlay nesting
  23(state) {
    if (!state) {
      return state;
    }
    const s = state as Record<string, unknown>;
    const saves = s.saves as
      | Record<string, Record<string, unknown>>
      | undefined;
    if (!saves) {
      return state;
    }
    for (const save of Object.values(saves)) {
      const store = save.store as
        | Record<string, Record<string, unknown>>
        | undefined;
      if (!store) {
        continue;
      }
      const legacyInner =
        store.gameInPlay?.gameInPlay ?? store.gameMenus?.gameInPlay;
      if (legacyInner !== undefined) {
        save.gameInPlay = legacyInner;
        delete save.store;
      }
    }
    return state;
  },
});

const savedGamesPersistConfig: PersistConfig<SavedGamesSliceState> = {
  key: savedGamesPersistKey,
  version: persistVersion,
  storage,
  migrate: savedGamesMigrations,
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
