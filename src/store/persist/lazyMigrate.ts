import { type PersistMigrate } from "redux-persist/es/types";

/**
 * a redux-persist migrate that only imports the migrations when the stored
 * state is from an older version - so the up-to-date (usual) case never loads
 * them
 */
export const lazyMigrate =
  (
    /**
     * imports the migrate to run when the stored state is out of date
     */
    importMigrate: () => Promise<PersistMigrate>,
  ): PersistMigrate =>
  async (state, currentVersion) =>
    state === undefined || state._persist.version === currentVersion ?
      state
    : (await importMigrate())(state, currentVersion);
