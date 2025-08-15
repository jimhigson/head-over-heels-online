import { initialGameMenuSliceState } from "../slices/gameMenusSlice";
import type { PersistedState, PersistMigrate } from "redux-persist";
import { createMigrate } from "redux-persist";

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

export const gameMenusSliceMigrate: PersistMigrate = createMigrate(
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
    13: revertToInitialStateMigration,
    14: revertToInitialStateMigration,
    15: revertToInitialStateMigration,
    16: revertToInitialStateMigration,
    17: revertToInitialStateMigration,
  },
  { debug: true },
);
